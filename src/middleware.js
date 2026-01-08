import { NextResponse } from "next/server";
import { APP_CONFIG } from "@/config/app.config";
import { jwtVerify, base64url } from "jose";
const secretValue = process.env.JWT_REFRESH_TOKEN_SECRET;
console.log(secretValue);
const secret = base64url.decode(secretValue);

export const middleware = async (request) => {
  let refreshToken = request.cookies.get("refresh_token")?.value ?? null;
  console.log({refreshToken});
  let path = request.nextUrl.pathname;
  let { passed, to } = await userValidation(path, refreshToken);
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

async function userValidation(path, refreshToken) {
  if (refreshToken && (path == "/login" || path == "/register"))
    return { passed: false, to: "/auth-reset" };
  else if (!refreshToken && (path == "/login" || path == "/register"))
    return { passed: true, to: "/" };
  if (!refreshToken) return { passed: false, to: `/login?redirect=${path}` };
  const result = await verifyUser(refreshToken);
  if (path.startsWith("/admin")) {
      if (result?.role == "admin") return { passed: true, to: path };
      return { passed: false, to: "/auth-error" };
  }

    if (result.id) return { passed: true, to: path };
    return { passed: false, to: "/auth-reset" };
}
async function verifyUser(refreshToken) {
  try {
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
