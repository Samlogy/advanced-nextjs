// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/blog")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/about", "/blog"],
};

// run code before request completed --> authentication, A/B testing, localized pages, bot protection, and more. Regarding localized pages
