import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host");

  // Get hostname without port
  let hostname = host.split(':')[0];

  // Remove 'www.' prefix if present
  if (hostname.startsWith('www.')) {
    hostname = hostname.replace('www.', '');
  }

  // Split hostname into parts
  const parts = hostname.split('.');

  // Determine if we have a subdomain
  // In localhost: 'blogs.localhost' -> ['blogs', 'localhost']
  // In production: 'blogs.domain.com' -> ['blogs', 'domain', 'com']
  const isLocalhost = hostname === 'localhost' || hostname.endsWith('.localhost');

  let subdomain = '';
  if (isLocalhost) {
    if (parts.length > 1 && parts[0] !== 'localhost') {
      subdomain = parts[0];
    }
  } else {
    // For production (e.g., blogs.yashgoswami.com), parts should be > 2
    // parts[0] would be 'blogs'
    if (parts.length > 2) {
      subdomain = parts[0];
    }
  }

  // If subdomain is found and it's not 'www', rewrite to the tenant route
  if (subdomain && subdomain !== 'www') {
    // The folder is src/app/sites/[tenant], so rewrite to /sites/[tenant]
    url.pathname = `/sites/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
