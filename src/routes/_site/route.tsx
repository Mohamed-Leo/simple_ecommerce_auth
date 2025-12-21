import { Outlet, createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/layout/NavBar";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <>
      <header className="container mx-auto py-6">
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
