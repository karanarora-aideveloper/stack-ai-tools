import { NextRequest, NextResponse } from 'next/server';
import { recordServerEvent, getAnalyticsSummary, AnalyticsEventPayload } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let payload: AnalyticsEventPayload;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json') || contentType.includes('text/plain')) {
      const text = await req.text();
      payload = JSON.parse(text);
    } else {
      payload = await req.json();
    }

    if (!payload.eventType || !payload.path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const recorded = await recordServerEvent(payload);
    return NextResponse.json({ success: true, eventId: recorded.id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch analytics summary' }, { status: 500 });
  }
}
