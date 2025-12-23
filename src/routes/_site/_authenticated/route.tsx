import { createFileRoute, Outlet } from "@tanstack/react-router";
import RouteError from "@/components/global/RouteError";
import { middleware } from "server/middleware";

export const Route = createFileRoute("/_site/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => {
    await middleware();
  },
  errorComponent: RouteError,
});

function RouteComponent() {
  return <Outlet />;
}
