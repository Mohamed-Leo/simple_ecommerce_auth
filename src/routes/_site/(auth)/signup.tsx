import { SignUpForm } from "@/components/global/SignUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto h-[calc(100vh-90px)] flex items-center justify-center">
      <SignUpForm />
    </div>
  );
}
