import { redirect } from "@tanstack/react-router";

// AUTH ROUTE HANDLER
export async function authRouteBeforeLoad(context: any) {
  const auth = context.auth;
  if (!auth) {
    throw redirect({ to: "/login" });
  }
  const user = await auth.getLoggedInUser();
  if (!user) {
    throw redirect({ to: "/login" });
  }
}
