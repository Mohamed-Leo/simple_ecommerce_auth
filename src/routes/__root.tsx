import { Outlet, createRootRoute } from "@tanstack/react-router";

import NavBar from "@/components/layout/NavBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <header className="container mx-auto py-6">
        <NavBar />
      </header>
      <Outlet />
    </>
  );
}
