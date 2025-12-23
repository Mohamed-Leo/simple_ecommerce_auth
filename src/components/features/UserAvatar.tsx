import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({
  userData,
}: {
  userData: { image: string; name: string };
}) => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={userData?.image || ""} alt="User avatar" />
      <AvatarFallback>
        {userData?.name?.charAt(0).toUpperCase() || "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
