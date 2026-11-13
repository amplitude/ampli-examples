import { NextResponse } from "next/server";
import { accountFromCookie, checkOrigin } from "../../../lib/session";
import { createAccount } from "../../../lib/store";

export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({ userId: (await accountFromCookie())?.id ?? null }, {
    headers: { "Cache-Control": "no-store" },
  });
}
export async function POST(request: Request) {
  try { checkOrigin(request); } catch { return new Response("Invalid origin", { status: 403 }); }
  const existing = await accountFromCookie();
  if (existing) return NextResponse.json({ userId: existing.id, created: false });
  const account = createAccount();
  const response = NextResponse.json({ userId: account.id, created: true });
  response.cookies.set("stripe_attribution_demo_session", account.token, {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 86400,
    secure: new URL(process.env.APP_URL!).protocol === "https:",
  });
  return response;
}
