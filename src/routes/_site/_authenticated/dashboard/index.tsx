import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/_authenticated/dashboard/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="container mx-auto">Hello "/_authenticated/dashboard/"!</div>
  );
}
