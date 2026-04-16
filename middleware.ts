import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/account")) {
    // TODO: check supabase session here
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*"],
}    