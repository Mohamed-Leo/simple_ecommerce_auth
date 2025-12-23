import { toast } from "sonner";
import { type LoginSchemaType } from "../lib/validations/loginSchema";
import { authClient } from "server/auth-client";
import { router } from "@/router";
import type { UserWithRole } from "@/types/authTypes";

export async function onLoginSubmit(data: LoginSchemaType) {
  const { email, password } = data;

  try {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (ctx) => {
          toast.success("Login successful");
          const user = ctx.data.user as typeof ctx.data.user & UserWithRole;

          if (user.role === "admin") router.navigate({ to: "/admin" });
          else router.navigate({ to: "/profile" });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, {
            className: "bg-destructive text-white",
          });
        },
      }
    );
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to login", {
      className: "bg-destructive text-white",
    });
  }
}
