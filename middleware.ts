import { createServerClient } from "@/lib/supabase"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Protect /account routes – redirect to /pricing if not logged in
  if (request.nextUrl.pathname.startsWith("/account")) {
    // TODO: check supabase session here
    // const supabase = createServerClient(...)
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) return NextResponse.redirect(new URL("/pricing", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*"],
}
