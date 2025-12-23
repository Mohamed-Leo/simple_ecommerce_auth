import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "@/components/features/UserAvatar";
import { Link } from "@tanstack/react-router";
import { handleSignOut } from "@/utils/handleSignOut";
import { authClient } from "server/auth-client"; // import { useSession } from "next-auth/react";
import type { UserType } from "@/types/authTypes";

export function UserAvatarMenu() {
  const { data } = authClient.useSession() as {
    data: { user: UserType } | null;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar
          userData={{
            image: data?.user?.image || "",
            name: data?.user?.name || "",
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Link to="/profile" className="w-full h-full p-2">
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {data?.user?.role === "admin" && (
          <>
            <DropdownMenuLabel>Control System</DropdownMenuLabel>
            <DropdownMenuItem className="p-0">
              <Link to="/admin" className="w-full h-full p-2">
                Admin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
