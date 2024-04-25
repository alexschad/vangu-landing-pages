import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log("XXXX", request);
//   return NextResponse.redirect(request.url);
//   // return NextResponse.redirect(new URL('/home', request.url))
// }

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|public|_next/image|.*\\.png$).*)"],
};
