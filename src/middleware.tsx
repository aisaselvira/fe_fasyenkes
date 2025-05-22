import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/user", "/admin"];
    const adminRoutes = ["/admin"];
    const userRoutes = ["/user"];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (userRoutes.some((route) => pathname.startsWith(route))) {
        if (!token || role?.toLowerCase() !== "user") {
            return NextResponse.redirect(new URL("/user/home-page", request.url));
        }
    }

    if (adminRoutes.some((route) => pathname.startsWith(route))) {
        if (!token || role?.toLowerCase() !== "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    if (pathname === "/login" && token) {
        if (role?.toLowerCase() === "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        } else {
            return NextResponse.redirect(new URL("/user/home-page", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/user/:path*",
        "/login",
    ],
};
