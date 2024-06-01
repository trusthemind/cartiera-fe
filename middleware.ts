import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppRoutes } from "./src/constants/constants";

export async function middleware(request: NextRequest) {
  const isAppPage = request.url.includes(AppRoutes.Profile) || request.url.includes(AppRoutes.Cars);

  const key = request.cookies?.get("key");
  console.log("middleware key ", key);
  //   const tenancy_complete = request.cookies?.get("tenancy_complete");
  //   const session2FA = request.cookies?.get("2fa");

  if (request.url.includes(AppRoutes.Login) && key) {
    return NextResponse.redirect(new URL(AppRoutes.Home, request.url));
  }

  if (isAppPage && !key) {
    return NextResponse.redirect(new URL(AppRoutes.Login, request.url));
  }

  //   if (isAppPage && !key) {
  //     return NextResponse.redirect(new URL(AppRoutes.Login, request.url));
  //   }
}

export const config = {
  matcher: ["/auth/login", "/profile", "/cars/:path*"],
};
