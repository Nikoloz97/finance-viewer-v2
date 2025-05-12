"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useContextCheck } from "@/use-context-check";

export default function Profile() {
  const { user } = useContextCheck();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center gap-3">
      <Avatar className="w-[6em] h-[6em]">
        <AvatarImage
          src={
            user?.profileImagePath
              ? user.profileImagePath
              : "/default_avatar.png"
          }
        />
      </Avatar>
      <div>
        <h1 className="text-[1.5em] w-full">{`Welcome, ${
          user ? user.firstName : "Guest"
        }`}</h1>
        {user && <p className="text-gray-300">{user.occupation}</p>}
      </div>
    </div>
  );
}
