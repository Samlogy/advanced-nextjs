// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // conditioning statement
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/blog")) {
    // keeps same url '/blog' but show url content '/'
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

// matcher path
export const config = {
  matcher: ["/about", "/blog"],
};

// run code before request completed --> authentication, A/B testing, localized pages, bot protection, and more. Regarding localized pages
