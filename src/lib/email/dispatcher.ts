import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
function getPrisma(): PrismaClient {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

export interface EmailProviderConfig {
  id: string;
  name: string;
  freeMonthlyLimit: number;
  freeDailyLimit: number;
  isConfigured: boolean;
  notes: string;
  dashboardUrl: string;
  keyEnvName: string;
  instructions: string;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  previewText?: string;
  campaignId?: string;
  preferredProvider?: 'auto' | 'brevo' | 'resend' | 'mailersend' | 'smtp' | 'simulation';
}

export interface DispatchResult {
  success: boolean;
  providerUsed: string;
  messageId?: string;
  error?: string;
  isSimulation?: boolean;
}

// Helper to get key from either Database SystemSetting or process.env
export async function getSettingOrEnv(key: string): Promise<string | undefined> {
  try {
    const db = getPrisma();
    const setting = await db.systemSetting.findUnique({ where: { key } });
    if (setting && setting.value && setting.value.trim().length > 0) {
      return setting.value.trim();
    }
  } catch (e) {
    // Database fallback
  }
  return process.env[key]?.trim();
}

// Helper to save key directly from Admin UI
export async function saveProviderKey(key: string, value: string): Promise<boolean> {
  try {
    const db = getPrisma();
    await db.systemSetting.upsert({
      where: { key },
      update: { value: value.trim() },
      create: { key, value: value.trim() }
    });
    return true;
  } catch (e) {
    console.error('Failed to save provider key:', e);
    return false;
  }
}

// Get live status of all free email provider integrations
export async function getEmailProvidersStatus(): Promise<EmailProviderConfig[]> {
  const [brevoKey, resendKey, mailersendKey, smtpHost, smtpUser, smtpPass] = await Promise.all([
    getSettingOrEnv('BREVO_API_KEY'),
    getSettingOrEnv('RESEND_API_KEY'),
    getSettingOrEnv('MAILERSEND_API_KEY'),
    getSettingOrEnv('SMTP_HOST'),
    getSettingOrEnv('SMTP_USER'),
    getSettingOrEnv('SMTP_PASS')
  ]);

  const hasSmtp = Boolean(smtpHost && smtpUser && smtpPass);

  return [
    {
      id: 'brevo',
      name: 'Brevo (formerly Sendinblue)',
      freeMonthlyLimit: 9000,
      freeDailyLimit: 300,
      isConfigured: Boolean(brevoKey),
      keyEnvName: 'BREVO_API_KEY',
      dashboardUrl: 'https://app.brevo.com/settings/keys/api',
      instructions: '1. Create free Brevo account. 2. Go to Settings > SMTP & API > API Keys. 3. Click "Generate a new API key". 4. Paste it below and click Save.',
      notes: '300 emails/day completely free forever (9,000/mo). Unlimited contacts, DKIM custom domain verification.'
    },
    {
      id: 'resend',
      name: 'Resend',
      freeMonthlyLimit: 3000,
      freeDailyLimit: 100,
      isConfigured: Boolean(resendKey),
      keyEnvName: 'RESEND_API_KEY',
      dashboardUrl: 'https://resend.com/api-keys',
      instructions: '1. Sign up on resend.com. 2. Go to API Keys > Create API Key. 3. Verify custom domain (stackaitools.com) under Domains. 4. Paste key below.',
      notes: '3,000 emails/month (100/day). Premier developer DX, custom domain support.'
    },
    {
      id: 'mailersend',
      name: 'MailerSend',
      freeMonthlyLimit: 3000,
      freeDailyLimit: 100,
      isConfigured: Boolean(mailersendKey),
      keyEnvName: 'MAILERSEND_API_KEY',
      dashboardUrl: 'https://app.mailersend.com/api-tokens',
      instructions: '1. Create free MailerSend account. 2. Go to Email > API Tokens > Create token. 3. Paste key below.',
      notes: '3,000 free emails/month. High inbox deliverability.'
    },
    {
      id: 'smtp',
      name: 'Direct Custom Domain / Gmail SMTP Relay',
      freeMonthlyLimit: 15000,
      freeDailyLimit: 500,
      isConfigured: hasSmtp,
      keyEnvName: 'SMTP_HOST',
      dashboardUrl: 'https://myaccount.google.com/apppasswords',
      instructions: 'Use Gmail SMTP (smtp.gmail.com with 16-char App Password) or custom domain SMTP server on port 587.',
      notes: 'Up to 500 free emails/day (15,000/mo) via Gmail SMTP or custom server.'
    }
  ];
}

// Live Connection Tester for any provider
export async function testProviderConnection(providerId: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (providerId === 'brevo') {
      const apiKey = await getSettingOrEnv('BREVO_API_KEY');
      if (!apiKey) return { success: false, error: 'BREVO_API_KEY is not configured yet. Enter key first.' };

      const res = await fetch('https://api.brevo.com/v3/account', {
        headers: { 'api-key': apiKey, 'accept': 'application/json' }
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { success: false, error: err.message || `Brevo authentication failed with HTTP status ${res.status}` };
      }

      const account = await res.json();
      return { 
        success: true, 
        message: `✅ Successfully connected to Brevo! Account: ${account.email} (Plan: ${account.plan?.[0]?.type || 'Free Tier'})` 
      };
    }

    if (providerId === 'resend') {
      const apiKey = await getSettingOrEnv('RESEND_API_KEY');
      if (!apiKey) return { success: false, error: 'RESEND_API_KEY is not configured yet. Enter key first.' };

      const res = await fetch('https://api.resend.com/api-keys', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { success: false, error: err.message || `Resend authentication failed with HTTP status ${res.status}` };
      }

      return { success: true, message: '✅ Successfully connected to Resend! API key verified and active.' };
    }

    if (providerId === 'mailersend') {
      const apiKey = await getSettingOrEnv('MAILERSEND_API_KEY');
      if (!apiKey) return { success: false, error: 'MAILERSEND_API_KEY is not configured yet.' };

      const res = await fetch('https://api.mailersend.com/v1/api-tokens', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { success: false, error: err.message || `MailerSend token check returned ${res.status}` };
      }

      return { success: true, message: '✅ Successfully connected to MailerSend! Token verified.' };
    }

    if (providerId === 'smtp') {
      const host = await getSettingOrEnv('SMTP_HOST');
      const user = await getSettingOrEnv('SMTP_USER');
      const pass = await getSettingOrEnv('SMTP_PASS');
      if (!host || !user || !pass) {
        return { success: false, error: 'SMTP requires SMTP_HOST, SMTP_USER, and SMTP_PASS to be configured.' };
      }

      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host,
        port: Number((await getSettingOrEnv('SMTP_PORT')) || 587),
        secure: (await getSettingOrEnv('SMTP_SECURE')) === 'true',
        auth: { user, pass }
      });

      await transporter.verify();
      return { success: true, message: `✅ Successfully connected to SMTP relay server (${host})!` };
    }

    return { success: false, error: `Unknown provider: ${providerId}` };
  } catch (err: any) {
    return { success: false, error: `Connection test failed: ${err.message}` };
  }
}

// 1. Send via Brevo Free API
async function sendViaBrevo(options: SendEmailOptions): Promise<DispatchResult> {
  const apiKey = await getSettingOrEnv('BREVO_API_KEY');
  if (!apiKey) throw new Error('BREVO_API_KEY is not configured');

  const senderEmail = (await getSettingOrEnv('EMAIL_FROM')) || 'karan@stackaitools.com';
  const senderName = (await getSettingOrEnv('EMAIL_FROM_NAME')) || 'Karan Arora | Stack AI Tools';

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: options.to }],
      subject: options.subject,
      htmlContent: options.html
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Brevo HTTP error ${res.status}`);
  }

  const data = await res.json();
  return { success: true, providerUsed: 'brevo', messageId: data.messageId };
}

// 2. Send via Resend Free API
async function sendViaResend(options: SendEmailOptions): Promise<DispatchResult> {
  const apiKey = await getSettingOrEnv('RESEND_API_KEY');
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');

  const senderEmail = (await getSettingOrEnv('EMAIL_FROM')) || 'karan@stackaitools.com';
  const senderName = (await getSettingOrEnv('EMAIL_FROM_NAME')) || 'Karan Arora | Stack AI Tools';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `${senderName} <${senderEmail}>`,
      to: [options.to],
      subject: options.subject,
      html: options.html
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Resend HTTP error ${res.status}`);
  }

  const data = await res.json();
  return { success: true, providerUsed: 'resend', messageId: data.id };
}

// 3. Send via MailerSend Free API
async function sendViaMailerSend(options: SendEmailOptions): Promise<DispatchResult> {
  const apiKey = await getSettingOrEnv('MAILERSEND_API_KEY');
  if (!apiKey) throw new Error('MAILERSEND_API_KEY is not configured');

  const senderEmail = (await getSettingOrEnv('EMAIL_FROM')) || 'karan@stackaitools.com';
  const senderName = (await getSettingOrEnv('EMAIL_FROM_NAME')) || 'Karan Arora | Stack AI Tools';

  const res = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: { email: senderEmail, name: senderName },
      to: [{ email: options.to }],
      subject: options.subject,
      html: options.html
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `MailerSend HTTP error ${res.status}`);
  }

  return { success: true, providerUsed: 'mailersend' };
}

// 4. Send via direct SMTP
async function sendViaSMTP(options: SendEmailOptions): Promise<DispatchResult> {
  const host = await getSettingOrEnv('SMTP_HOST');
  const user = await getSettingOrEnv('SMTP_USER');
  const pass = await getSettingOrEnv('SMTP_PASS');
  if (!host || !user || !pass) throw new Error('SMTP credentials not configured');

  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host,
    port: Number((await getSettingOrEnv('SMTP_PORT')) || 587),
    secure: (await getSettingOrEnv('SMTP_SECURE')) === 'true',
    auth: { user, pass }
  });

  const senderName = (await getSettingOrEnv('EMAIL_FROM_NAME')) || 'Karan Arora | Stack AI Tools';
  const senderEmail = (await getSettingOrEnv('EMAIL_FROM')) || 'karan@stackaitools.com';

  const info = await transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: options.to,
    subject: options.subject,
    html: options.html
  });

  return { success: true, providerUsed: 'smtp', messageId: info.messageId };
}

// 5. Cascading Dispatch Engine with STRICT Real-World Delivery Rules
export async function sendEmailCascade(options: SendEmailOptions): Promise<DispatchResult> {
  const db = getPrisma();
  const errors: string[] = [];
  const preferred = options.preferredProvider || 'auto';

  // Explicit Dry-Run Simulation Requested
  if (preferred === 'simulation') {
    return {
      success: true,
      providerUsed: 'simulation (dry-run)',
      isSimulation: true,
      messageId: `dryrun_${Date.now()}`
    };
  }

  // Force single provider if requested
  if (preferred === 'brevo') {
    try {
      const res = await sendViaBrevo(options);
      await logSuccess(options, res, db);
      return res;
    } catch (err: any) {
      return { success: false, providerUsed: 'brevo', error: `Brevo error: ${err.message}` };
    }
  }

  if (preferred === 'resend') {
    try {
      const res = await sendViaResend(options);
      await logSuccess(options, res, db);
      return res;
    } catch (err: any) {
      return { success: false, providerUsed: 'resend', error: `Resend error: ${err.message}` };
    }
  }

  if (preferred === 'mailersend') {
    try {
      const res = await sendViaMailerSend(options);
      await logSuccess(options, res, db);
      return res;
    } catch (err: any) {
      return { success: false, providerUsed: 'mailersend', error: `MailerSend error: ${err.message}` };
    }
  }

  if (preferred === 'smtp') {
    try {
      const res = await sendViaSMTP(options);
      await logSuccess(options, res, db);
      return res;
    } catch (err: any) {
      return { success: false, providerUsed: 'smtp', error: `SMTP error: ${err.message}` };
    }
  }

  // AUTO CASCADING: Only tries providers that actually have configured credentials
  const providers = [
    { id: 'brevo', fn: sendViaBrevo, key: 'BREVO_API_KEY' },
    { id: 'resend', fn: sendViaResend, key: 'RESEND_API_KEY' },
    { id: 'mailersend', fn: sendViaMailerSend, key: 'MAILERSEND_API_KEY' },
    { id: 'smtp', fn: sendViaSMTP, key: 'SMTP_HOST' }
  ];

  let anyProviderConfigured = false;

  for (const provider of providers) {
    const hasKey = await getSettingOrEnv(provider.key);
    if (hasKey) {
      anyProviderConfigured = true;
      try {
        const result = await provider.fn(options);
        await logSuccess(options, result, db);
        return result;
      } catch (err: any) {
        errors.push(`${provider.id}: ${err.message}`);
        console.warn(`[Dispatcher] Provider ${provider.id} failed, cascading... Error: ${err.message}`);
      }
    }
  }

  // IF NO PROVIDER IS CONFIGURED: STRICTLY FAIL WITH CLEAR ERROR
  if (!anyProviderConfigured) {
    return {
      success: false,
      providerUsed: 'none',
      error: 'Cannot dispatch: No email providers are activated! Please paste your free Brevo API key, Resend key, or SMTP credentials in the setup panel above.'
    };
  }

  // If providers were configured but all failed
  return {
    success: false,
    providerUsed: 'cascade_failed',
    error: `All active providers failed: ${errors.join(' | ')}`
  };
}

async function logSuccess(options: SendEmailOptions, result: DispatchResult, db: PrismaClient) {
  await db.emailDispatchLog.create({
    data: {
      campaignId: options.campaignId || null,
      recipient: options.to,
      provider: result.providerUsed,
      status: 'delivered',
      sentAt: new Date()
    }
  }).catch(() => {});

  await db.subscriber.updateMany({
    where: { email: options.to.toLowerCase() },
    data: {
      lastSentAt: new Date(),
      lastProviderUsed: result.providerUsed,
      emailsSentCount: { increment: 1 }
    }
  }).catch(() => {});
}
