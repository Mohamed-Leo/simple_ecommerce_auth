import { LoginForm } from "@/components/global/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto h-[calc(100vh-90px)] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
