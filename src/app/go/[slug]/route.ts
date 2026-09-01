import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/tools';
import { recordServerEvent } from '@/lib/analytics';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool || !tool.link) {
    // Redirect to home if tool is unknown
    return NextResponse.redirect(new URL('/', request.url), 302);
  }

  // Outbound affiliate link tracking header
  const destinationUrl = tool.link;

  try {
    recordServerEvent({
      eventType: 'outbound_click',
      path: `/go/${slug}`,
      toolSlug: slug,
      toolName: tool.name,
      destinationUrl,
      category: tool.category,
      referrer: request.headers.get('referer') || 'direct'
    });
  } catch {
    // Non-blocking telemetry
  }

  return NextResponse.redirect(destinationUrl, {
    status: 307,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
}
