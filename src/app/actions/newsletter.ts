'use server';

import { PrismaClient } from '@prisma/client';
import { getEmailProvidersStatus, sendEmailCascade, saveProviderKey, EmailProviderConfig } from '@/lib/email/dispatcher';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'stackaitools2026';

let prisma: PrismaClient | null = null;
function getPrisma(): PrismaClient {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

function verifyAuth(passkey: string): boolean {
  return passkey === ADMIN_PASSWORD;
}

export interface SubscriberData {
  id: string;
  email: string;
  status: string;
  source: string | null;
  lastSentAt: string | null;
  lastProviderUsed: string | null;
  emailsSentCount: number;
  createdAt: string;
}

export interface CampaignData {
  id: string;
  subject: string;
  previewText: string | null;
  bodyHtml: string;
  sentAt: string | null;
  status: string;
  totalRecipients: number;
  successfulSent: number;
  failedCount: number;
  providersUsed: string[];
  createdAt: string;
}

export interface DispatchLogData {
  id: string;
  recipient: string;
  provider: string;
  status: string;
  errorMsg: string | null;
  sentAt: string;
}

export interface NewsletterDashboardPayload {
  subscribers: SubscriberData[];
  campaigns: CampaignData[];
  logs: DispatchLogData[];
  providers: EmailProviderConfig[];
  stats: {
    totalSubscribers: number;
    activeSubscribers: number;
    unsubscribedCount: number;
    totalEmailsSent: number;
    freeCapacityPerMonth: number;
  };
}

// 1. Fetch all newsletter data for Admin Panel
export async function getNewsletterDataAction(passkey: string): Promise<{ success: boolean; data?: NewsletterDashboardPayload; error?: string }> {
  if (!verifyAuth(passkey)) {
    return { success: false, error: 'Unauthorized: Invalid Admin Passkey' };
  }

  try {
    const db = getPrisma();
    const [subscribers, campaigns, logs, providers] = await Promise.all([
      db.subscriber.findMany({ orderBy: { createdAt: 'desc' } }),
      db.emailCampaign.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
      db.emailDispatchLog.findMany({ take: 50, orderBy: { sentAt: 'desc' } }),
      getEmailProvidersStatus()
    ]);

    const activeCount = subscribers.filter(s => s.status === 'active').length;
    const unsubCount = subscribers.filter(s => s.status === 'unsubscribed').length;
    const totalSent = subscribers.reduce((acc, s) => acc + (s.emailsSentCount || 0), 0);
    const freeCapacity = providers.reduce((acc, p) => acc + p.freeMonthlyLimit, 0);

    return {
      success: true,
      data: {
        subscribers: subscribers.map(s => ({
          id: s.id,
          email: s.email,
          status: s.status,
          source: s.source,
          lastSentAt: s.lastSentAt ? s.lastSentAt.toISOString() : null,
          lastProviderUsed: s.lastProviderUsed,
          emailsSentCount: s.emailsSentCount,
          createdAt: s.createdAt.toISOString()
        })),
        campaigns: campaigns.map(c => ({
          id: c.id,
          subject: c.subject,
          previewText: c.previewText,
          bodyHtml: c.bodyHtml,
          sentAt: c.sentAt ? c.sentAt.toISOString() : null,
          status: c.status,
          totalRecipients: c.totalRecipients,
          successfulSent: c.successfulSent,
          failedCount: c.failedCount,
          providersUsed: c.providersUsed,
          createdAt: c.createdAt.toISOString()
        })),
        logs: logs.map(l => ({
          id: l.id,
          recipient: l.recipient,
          provider: l.provider,
          status: l.status,
          errorMsg: l.errorMsg,
          sentAt: l.sentAt.toISOString()
        })),
        providers,
        stats: {
          totalSubscribers: subscribers.length,
          activeSubscribers: activeCount,
          unsubscribedCount: unsubCount,
          totalEmailsSent: totalSent,
          freeCapacityPerMonth: freeCapacity
        }
      }
    };
  } catch (err: any) {
    console.error('Failed to get newsletter data:', err);
    return { success: false, error: err.message || 'Database error fetching subscribers' };
  }
}

// 2. Add subscriber manually from Admin Panel
export async function addSubscriberAction(
  passkey: string,
  email: string,
  source: string = 'admin_manual'
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Valid email is required' };
  }

  try {
    const db = getPrisma();
    const cleanEmail = email.trim().toLowerCase();

    await db.subscriber.upsert({
      where: { email: cleanEmail },
      update: { status: 'active', source },
      create: { email: cleanEmail, status: 'active', source }
    });

    return { success: true, message: `Subscriber ${cleanEmail} added successfully!` };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to add subscriber' };
  }
}

// 3. Save provider API key directly from Admin Panel
export async function saveProviderKeyAction(
  passkey: string,
  key: string,
  value: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };

  if (!key || !value) {
    return { success: false, error: 'Key name and value are required' };
  }

  const ok = await saveProviderKey(key, value.trim());
  if (ok) {
    return { success: true, message: `Setting ${key} saved securely in database!` };
  } else {
    return { success: false, error: `Failed to save ${key}` };
  }
}

// 4. Dispatch Broadcast or Test Campaign
export async function sendBroadcastCampaignAction(
  passkey: string,
  payload: {
    subject: string;
    previewText?: string;
    html: string;
    isTest?: boolean;
    testEmail?: string;
    preferredProvider?: 'auto' | 'brevo' | 'resend' | 'mailersend' | 'smtp' | 'simulation';
  }
): Promise<{ success: boolean; message?: string; results?: any; error?: string }> {
  if (!verifyAuth(passkey)) {
    return { success: false, error: 'Unauthorized: Invalid Admin Passkey' };
  }

  const { subject, previewText, html, isTest = false, testEmail, preferredProvider = 'auto' } = payload;
  if (!subject || !html) {
    return { success: false, error: 'Subject and Email Content are required' };
  }

  const db = getPrisma();

  // A. If it's a test send
  if (isTest) {
    const target = testEmail?.trim() || 'arorakaran869@gmail.com';
    const result = await sendEmailCascade({
      to: target,
      subject: `[TEST PREVIEW] ${subject}`,
      html,
      previewText,
      preferredProvider
    });

    return {
      success: result.success,
      message: `Test email sent to ${target} via ${result.providerUsed}`
    };
  }

  // B. Full Broadcast to Active Subscribers
  try {
    const activeSubscribers = await db.subscriber.findMany({
      where: { status: 'active' }
    });

    if (activeSubscribers.length === 0) {
      return { success: false, error: 'No active subscribers found in database' };
    }

    // Create campaign record
    const campaign = await db.emailCampaign.create({
      data: {
        subject,
        previewText: previewText || null,
        bodyHtml: html,
        status: 'sending',
        totalRecipients: activeSubscribers.length,
        createdAt: new Date()
      }
    });

    let successfulSent = 0;
    let failedCount = 0;
    const providersUsedSet = new Set<string>();

    for (const sub of activeSubscribers) {
      try {
        const res = await sendEmailCascade({
          to: sub.email,
          subject,
          html,
          previewText,
          campaignId: campaign.id,
          preferredProvider
        });

        if (res.success) {
          successfulSent++;
          providersUsedSet.add(res.providerUsed);
        } else {
          failedCount++;
        }
      } catch (e) {
        failedCount++;
      }
    }

    // Finalize campaign stats
    await db.emailCampaign.update({
      where: { id: campaign.id },
      data: {
        status: 'sent',
        sentAt: new Date(),
        successfulSent,
        failedCount,
        providersUsed: Array.from(providersUsedSet)
      }
    });

    return {
      success: true,
      message: `Broadcast completed! Sent to ${successfulSent} subscribers via ${Array.from(providersUsedSet).join(', ') || 'dispatcher'}.`
    };
  } catch (err: any) {
    console.error('Broadcast failed:', err);
    return { success: false, error: err.message || 'Failed to dispatch broadcast' };
  }
}

// 5. Toggle subscriber status
export async function toggleSubscriberStatusAction(
  passkey: string,
  subscriberId: string
): Promise<{ success: boolean; error?: string }> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };

  try {
    const db = getPrisma();
    const sub = await db.subscriber.findUnique({ where: { id: subscriberId } });
    if (!sub) return { success: false, error: 'Subscriber not found' };

    await db.subscriber.update({
      where: { id: subscriberId },
      data: {
        status: sub.status === 'active' ? 'unsubscribed' : 'active'
      }
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// 6. Delete subscriber
export async function deleteSubscriberAction(
  passkey: string,
  subscriberId: string
): Promise<{ success: boolean; error?: string }> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };

  try {
    const db = getPrisma();
    await db.subscriber.delete({ where: { id: subscriberId } });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
