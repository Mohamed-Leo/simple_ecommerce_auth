import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { MyRouterContext } from "@/types/queryTypes";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
