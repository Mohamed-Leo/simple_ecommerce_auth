import { authClient } from "server/auth-client";
import { router } from "@/router";
import { toast } from "sonner";

export const handleSignOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success("Sign out successful");
        router.navigate({ to: "/login" });
      },
      onError: () => {
        toast.error("Failed to sign out. Please try again.");
      },
    },
  });
};
