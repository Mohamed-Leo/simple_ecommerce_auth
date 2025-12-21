import { authClient } from "@/lib/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import RouteError from "@/components/global/RouteError";

export const Route = createFileRoute("/_site/_authenticated")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({
        to: "/login",
        search: {
          // Use a search param to redirect back after login if you want
          // redirect: location.href,
        },
      });
    }
  },
  errorComponent: RouteError,
});

function RouteComponent() {
  return <Outlet />;
}
