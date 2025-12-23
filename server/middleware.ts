import type { UserWithRole } from "@/types/authTypes";
import { authClient } from "./auth-client";
import { redirect } from "@tanstack/react-router";

export const middleware = async (options?: { role?: "admin" | "user" }) => {
  const session = await authClient.getSession();

  if (!session.data) {
    throw redirect({
      to: "/login",
    });
  }

  const user = session.data.user as typeof session.data.user & UserWithRole;

  // If the user doesn't have the required role, redirect to the home page or an unauthorized page.
  if (options?.role && user.role !== options.role) {
    throw redirect({
      to: "/",
    });
  }

  return { session: session.data };
};
