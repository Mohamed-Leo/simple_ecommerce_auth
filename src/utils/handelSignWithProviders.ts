import { authClient } from "server/auth-client";
import { toast } from "sonner";

export const handleSignWithProvider = async (
  provider: "google" | "facebook" | "github"
) => {
  try {
    await authClient.signIn.social({
      provider,
      callbackURL: `${window.location.origin}/profile`,
    });
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to login", {
      className: "bg-destructive text-white",
    });
  }
};
