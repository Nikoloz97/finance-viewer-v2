"use client";
import "./profile.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useContextCheck } from "@/use-context-check";

export default function Profile() {
  const { user } = useContextCheck();

  return (
    <div className="avatar-caption-container text-center">
      <Avatar className="w-full h-full">
        <AvatarImage
          src={
            user?.profileImagePath
              ? user.profileImagePath
              : "/default_avatar.png"
          }
        />
      </Avatar>
      <p>{`Welcome, ${user ? user.firstName : "Guest"}`}</p>
    </div>
  );
}
