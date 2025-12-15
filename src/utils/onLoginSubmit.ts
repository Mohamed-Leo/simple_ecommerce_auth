import { toast } from "sonner";
import { type LoginSchemaType } from "../lib/validations/loginSchema";
import { authClient } from "@/lib/auth-client";

export async function onLoginSubmit(data: LoginSchemaType) {
  const { email, password } = data;

  try {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/profile",
      },
      {
        onSuccess: () => {
          toast.success("Login successful");
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
