import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { signUpSchemaType } from "@/lib/validations/signUpSchema";

export async function onSignUpSubmit(data: signUpSchemaType) {
  const { email, password, name } = data;

  await authClient.signUp.email(
    {
      email,
      name,
      password,
      callbackURL: "/profile",
    },
    {
      onSuccess: () => {
        toast.success("Sign up successful");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message, {
          className: "bg-destructive text-white",
        });
      },
    }
  );
}
