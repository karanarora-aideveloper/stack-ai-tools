'use server';

import { PrismaClient } from '@prisma/client';
import { 
  getEmailProvidersStatus, 
  sendEmailCascade, 
  saveProviderKey, 
  testProviderConnection, 
  EmailProviderConfig 
} from '@/lib/email/dispatcher';

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
    activeProvidersCount: number;
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
    const activeProviders = providers.filter(p => p.isConfigured);
    const freeCapacity = activeProviders.reduce((acc, p) => acc + p.freeMonthlyLimit, 0);

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
          freeCapacityPerMonth: freeCapacity,
          activeProvidersCount: activeProviders.length
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

// 4. Save SMTP Configuration
export async function saveSmtpConfigAction(
  passkey: string,
  config: { host: string; port: string; user: string; pass: string; emailFrom?: string }
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };

  try {
    const db = getPrisma();
    await Promise.all([
      db.systemSetting.upsert({ where: { key: 'SMTP_HOST' }, update: { value: config.host.trim() }, create: { key: 'SMTP_HOST', value: config.host.trim() } }),
      db.systemSetting.upsert({ where: { key: 'SMTP_PORT' }, update: { value: config.port.trim() }, create: { key: 'SMTP_PORT', value: config.port.trim() } }),
      db.systemSetting.upsert({ where: { key: 'SMTP_USER' }, update: { value: config.user.trim() }, create: { key: 'SMTP_USER', value: config.user.trim() } }),
      db.systemSetting.upsert({ where: { key: 'SMTP_PASS' }, update: { value: config.pass.trim() }, create: { key: 'SMTP_PASS', value: config.pass.trim() } }),
      config.emailFrom ? db.systemSetting.upsert({ where: { key: 'EMAIL_FROM' }, update: { value: config.emailFrom.trim() }, create: { key: 'EMAIL_FROM', value: config.emailFrom.trim() } }) : Promise.resolve()
    ]);
    return { success: true, message: 'SMTP settings saved securely!' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save SMTP settings' };
  }
}

// 5. Test Live Provider Connection
export async function testProviderConnectionAction(
  passkey: string,
  providerId: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };
  return await testProviderConnection(providerId);
}

// 6. Dispatch Broadcast or Test Campaign with STRICT Real-World Execution
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

    if (!result.success) {
      return {
        success: false,
        error: result.error || `Failed to dispatch test email via ${result.providerUsed}`
      };
    }

    if (result.isSimulation) {
      return {
        success: true,
        message: '🧪 [DRY RUN TEST]: Dry run passed. No actual email was sent across the internet because no providers are connected.'
      };
    }

    return {
      success: true,
      message: `✅ Test email successfully sent across the internet to ${target} via ${result.providerUsed.toUpperCase()}!`
    };
  }

  // B. Full Broadcast to Active Subscribers
  try {
    const db = getPrisma();
    const activeSubscribers = await db.subscriber.findMany({
      where: { status: 'active' }
    });

    if (activeSubscribers.length === 0) {
      return { success: false, error: 'No active subscribers found in database' };
    }

    // Attempt test send on first subscriber to verify provider before creating campaign
    const probe = await sendEmailCascade({
      to: activeSubscribers[0].email,
      subject,
      html,
      previewText,
      preferredProvider
    });

    if (!probe.success) {
      return {
        success: false,
        error: probe.error || 'Cannot broadcast: No active providers could send the email. Please verify credentials.'
      };
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

    let successfulSent = 1; // probe succeeded
    let failedCount = 0;
    const providersUsedSet = new Set<string>([probe.providerUsed]);

    // Send to the rest
    for (let i = 1; i < activeSubscribers.length; i++) {
      const sub = activeSubscribers[i];
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
      message: `Broadcast completed! Dispatched to ${successfulSent} subscribers via ${Array.from(providersUsedSet).join(', ')}.`
    };
  } catch (err: any) {
    console.error('Broadcast failed:', err);
    return { success: false, error: err.message || 'Failed to dispatch broadcast' };
  }
}

// 7. Toggle subscriber status
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

// 8. Delete subscriber
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

// 9. Check Brevo domain DNS verification status for stackaitools.com
export async function checkDomainDnsAction(passkey: string): Promise<{
  success: boolean;
  authenticated?: boolean;
  dnsRecords?: any;
  error?: string;
}> {
  if (!verifyAuth(passkey)) return { success: false, error: 'Unauthorized' };

  try {
    const db = getPrisma();
    const setting = await db.systemSetting.findUnique({ where: { key: 'BREVO_API_KEY' } });
    const apiKey = setting?.value || process.env.BREVO_API_KEY;
    if (!apiKey) return { success: false, error: 'BREVO_API_KEY not configured' };

    // Attempt to trigger authenticate probe first so Brevo queries current DNS
    await fetch('https://api.brevo.com/v3/senders/domains/stackaitools.com/authenticate', {
      method: 'PUT',
      headers: { 'api-key': apiKey, 'accept': 'application/json' }
    }).catch(() => {});

    const res = await fetch('https://api.brevo.com/v3/senders/domains/stackaitools.com', {
      headers: { 'api-key': apiKey, 'accept': 'application/json' }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || 'Failed to check domain DNS' };
    }

    const data = await res.json();
    return {
      success: true,
      authenticated: Boolean(data.authenticated),
      dnsRecords: data.dns_records
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
