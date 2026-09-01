import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/tools';

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
