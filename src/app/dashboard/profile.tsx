import { Avatar, AvatarImage } from "@/components/ui/avatar";
import "./profile.css";

export default function Profile() {
  return (
    <div className="avatar-caption-container">
      <Avatar className="w-full h-full">
        <AvatarImage src="/default_avatar.png" />
      </Avatar>
      {/* <p>{`Welcome, ${user ? user.firstName : "Guest"}`}</p> */}
    </div>
  );
}
