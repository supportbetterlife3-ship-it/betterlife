import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/admin/dashboard') && !req.auth) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/dashboard', '/admin/dashboard/:path*'],
};
