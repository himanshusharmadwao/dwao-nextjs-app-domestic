import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = new URL(req.url);
  const isPreview = url.searchParams.get('preview') === 'true';

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-preview', isPreview ? '1' : '0'); // default false

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ['/((?!_next|.*\\..*).*)'] };
