import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const isLocal = host.includes('localhost');
  const subdomain = host.split('.')[0];

  if (
    (isLocal && host !== 'localhost:3000') ||
    (!isLocal && host.endsWith('yoursite.com') && subdomain !== 'www')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/store/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
