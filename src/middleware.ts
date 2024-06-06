import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppRoutes } from "./constants/constants";

export async function middleware(request: NextRequest) {
  const isAppPage = request.url.includes(AppRoutes.Profile) || request.url.includes(AppRoutes.Cars);

  const key = request.cookies?.get("key");

  if (request.url.includes(AppRoutes.Login) && key) {
    return NextResponse.redirect(new URL(AppRoutes.Home, request.url));
  }

  if (isAppPage && !key) {
    return NextResponse.redirect(new URL(AppRoutes.Login, request.url));
  }

 
}

export const config = {
  matcher: ["/auth/login", "/cars", "/cars/:path*", "/profile", "/profile/:path*"],
};
