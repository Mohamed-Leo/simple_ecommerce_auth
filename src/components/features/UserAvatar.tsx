import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

const UserAvatar = () => {
  const { data } = authClient.useSession();

  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={data?.user?.image || ""} alt="User avatar" />
      <AvatarFallback>
        {data?.user?.name?.charAt(0).toUpperCase() || "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
