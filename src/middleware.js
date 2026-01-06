import { NextResponse } from "next/server";
import { APP_CONFIG } from "@/config/app.config";

export const middleware = async (request) => {
  let cookie = request.cookies.get("access_token")?.value;
  let path = request.nextUrl.pathname;
  let { passed, to } = await userValidation(path, cookie);
  let response = NextResponse.next();

  if (passed) return response;

  if (!passed) return Response.redirect("http://localhost:3000" + to);
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

async function userValidation(path, cookie) {
  if (cookie && (path == "/login" || path == "/register"))
    return { passed: false, to: "/auth-reset" };
  else if (!cookie && (path == "/login" || path == "/register"))
    return { passed: true, to: "/" };
  if (!cookie) return { passed: false, to: `/login?redirect=${path}` };
  if (path.startsWith("/admin")) {
    try {
      let res = await fetchUser(cookie);
      const result = await res.json();
      if (result.data?.role == "admin") return { passed: true, to: path };
      return { passed: false, to: "/auth-error" };
    } catch (error) {
      return { passed: false, to: "/auth-error" };
    }
  }

  try {
    let res = await fetchUser(cookie);
    const result = await res.json();
    if (result.data?.email) return { passed: true, to: path };

    return { passed: false, to: "/auth-reset" };
  } catch (error) {
    return { passed: false, to: "/auth-error" };
  }
}
async function fetchUser(cookie) {
  return await fetch(APP_CONFIG.apiUrl + "/auth/login_with_token", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: cookie }),
  });
}
