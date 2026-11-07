import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });
  const db = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => req.cookies.getAll(),
      setAll: (list) => { list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req }); list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); } },
  });
  const { data: { user } } = await db.auth.getUser(); // validates the JWT with Supabase
  if (!user && (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin"))) {
    const url = req.nextUrl.clone(); url.pathname = "/login"; return NextResponse.redirect(url);
  }
  return res;
}
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
