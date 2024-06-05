import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppRoutes } from "../constants/constants";

export function middleware(request: NextRequest) {
  const isAppPage = request.url.includes(AppRoutes.Profile) || request.url.includes(AppRoutes.Cars);

  const key = request.cookies?.get("access");
console.log(request.cookies?.getAll());
  if (request.url.includes(AppRoutes.Login) && key) {
    return NextResponse.redirect(new URL(AppRoutes.Cars, request.url));
  }

  if (isAppPage && !key) {
    return NextResponse.redirect(new URL(AppRoutes.Login, request.url));
  }

  return;
}

export const config = {
  matcher: ["/auth/login","/cars","/details" ,"/profile", "/cars/:path*"],
};
