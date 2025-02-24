"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import "./profile.css";
import { UseContextCheck } from "@/use-context-check";

export default function Profile() {
  const { user } = UseContextCheck();

  return (
    <div className="avatar-caption-container text-center">
      <Avatar className="w-full h-full">
        <AvatarImage src="/default_avatar.png" />
      </Avatar>
      <p>{`Welcome, ${user ? user.firstName : "Guest"}`}</p>
    </div>
  );
}
