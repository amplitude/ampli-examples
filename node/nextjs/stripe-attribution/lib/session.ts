import { cookies } from "next/headers";
import { findAccount } from "./store";

export async function accountFromCookie() {
  return findAccount((await cookies()).get("stripe_attribution_demo_session")?.value);
}
export function checkOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(process.env.APP_URL!).origin) {
    throw new Error("Unexpected request origin");
  }
}

export async function getCurrentUser() { return (await accountFromCookie()) ?? null; }
