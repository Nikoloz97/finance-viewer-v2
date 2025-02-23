"use client";

import { Button } from "@/components/ui/button";
import { UseContextCheck } from "@/usecontextcheck";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { setUser, setIsUserSignedIn } = UseContextCheck();
  const router = useRouter();

  const handleLogOut = () => {
    setUser(undefined);
    setIsUserSignedIn(false);
    router.push("/");
  };
  return (
    <div className="profile-page">
      <div>Profile page</div>
      <Button onClick={handleLogOut}>Sign out</Button>
    </div>
  );
}
