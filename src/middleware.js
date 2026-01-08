import { NextResponse } from "next/server";
import { APP_CONFIG } from "@/config/app.config";
import { jwtVerify, base64url } from "jose";

const secret = base64url.decode(process.env.JWT_REFRESH_TOKEN_SECRET);

export const middleware = async (request) => {

  let accessToken = request.cookies.get("access_token")?.value;
  let refreshToken = request.cookies.get("refresh_token")?.value;
  let path = request.nextUrl.pathname;
  let { passed, to } = await userValidation(path, accessToken, refreshToken);
  let response = NextResponse.next();

  if (passed) return response;

  if (!passed) return Response.redirect(APP_CONFIG.webUrl + to);
};

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/dashboard/:path*",
    "/register",
    "/login",
  ],
};

async function userValidation(path, accessToken, refreshToken) {
  let cookie = accessToken || refreshToken;
  if (cookie && (path == "/login" || path == "/register"))
    return { passed: false, to: "/auth-reset" };
  else if (!cookie && (path == "/login" || path == "/register"))
    return { passed: true, to: "/" };
  if (!cookie) return { passed: false, to: `/login?redirect=${path}` };
  if (path.startsWith("/admin")) {
    try {
      let result = await verifyUser(refreshToken);
      if (result?.role == "admin") return { passed: true, to: path };
      return { passed: false, to: "/auth-error" };
    } catch (error) {
      return { passed: false, to: "/auth-error" };
    }
  }

  try {
    let result = await verifyUser(refreshToken);
    if (result.id) return { passed: true, to: path };

    return { passed: false, to: "/auth-reset" };
  } catch (error) {
    return { passed: false, to: "/auth-error" };
  }
}
async function verifyUser(refreshToken) {
  try {
    if(!refreshToken) return {};
    let token = refreshToken?.replace("bearer ", "");
    const result = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return result.payload;
  } catch (error) {
    console.log("middlewere error", error);
    return {};
  }
}
