import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect /admin to /admin/login
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Only protect admin routes, but allow login page
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Check for authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
        },
      });
    }
    
    // Parse basic auth
    const [scheme, credentials] = authHeader.split(' ');
    
    if (scheme !== 'Basic' || !credentials) {
      return new NextResponse('Invalid authentication', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
        },
      });
    }
    
    const [username, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');
    
    // Check credentials
    if (username !== 'admin' || password !== adminPassword) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};