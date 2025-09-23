// src/lib/routeGuards.ts
import { useAuth } from "./AuthContext";
import { redirect } from "@tanstack/react-router";

export async function requireAuthBeforeLoad() {
  const { isAuthenticated, refresh } = useAuth();

  // Refresh user data if necessary
  await refresh();

  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }
  return null;
}
