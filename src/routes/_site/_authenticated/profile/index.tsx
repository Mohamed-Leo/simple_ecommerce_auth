import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Mail, User } from "lucide-react";
import { handleSignOut } from "@/utils/handleSignOut";

export const Route = createFileRoute("/_site/_authenticated/profile/")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { data: session } = authClient.useSession();
  console.log(session);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-card">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              <AvatarImage
                src={session?.user.image || ""}
                alt={session?.user.name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {session?.user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">
              {session?.user.name || "User"}
            </CardTitle>
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Member since{" "}
              {session?.session.createdAt
                ? new Date(session.session.createdAt).toLocaleDateString()
                : "N/A"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <User size={16} />
              Display Name
            </Label>
            <Input
              id="name"
              readOnly
              value={session?.user.name || ""}
              className="bg-muted/50 font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Mail size={16} />
              Email Address
            </Label>
            <Input
              id="email"
              readOnly
              value={session?.user.email || ""}
              className="bg-muted/50 font-medium"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all active:scale-[0.98]"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
