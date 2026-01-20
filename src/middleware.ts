import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host");

  if (!host) {
    return NextResponse.next();
  }

  // Remove port number (e.g., "parlet.localhost:3000" → "parlet.localhost")
  const hostname = host.split(":")[0];

  // Split hostname into parts (e.g., ["parlet", "localhost"] or ["parlet-app", "vercel", "app"])
  const parts = hostname.split(".");

  if (parts.length < 2) {
    return NextResponse.next();
  }

  let tenant = null;

  // Case 1: Vercel preview deployment with prefix
  // Example: parlet-app.vercel.app → tenant = "parlet"
  if (hostname.includes(".vercel.app")) {
    const [prefix] = parts;
    // Extract tenant from prefix (e.g., "parlet-app" → "parlet")
    if (prefix && prefix.includes("-")) {
      tenant = prefix.split("-")[0];
    }
  }
  // Case 2: True subdomains (localhost or custom domain)
  // Example: parlet.localhost or parlet.biscuit.com → tenant = "parlet"
  else if (parts.length >= 2) {
    const subdomain = parts[0];
    // Skip common cases
    if (subdomain !== "www" && subdomain !== "localhost") {
      tenant = subdomain;
    }
  }

  // If we found a tenant, rewrite internally
  if (tenant) {
    const url = req.nextUrl.clone();
    console.log(`[Middleware] Rewriting ${host} (tenant=${tenant}) to /sites/${tenant}${url.pathname}`);
    url.pathname = `/sites/${tenant}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  console.log(`[Middleware] No tenant found for ${host}`);
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
