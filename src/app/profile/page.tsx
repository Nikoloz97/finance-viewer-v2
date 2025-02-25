"use client";

import { Button } from "@/components/ui/button";
import { useContextCheck } from "@/use-context-check";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Profile() {
  const { setUser, setIsUserSignedIn } = useContextCheck();
  const router = useRouter();

  const handleSignOut = () => {
    setUser(undefined);
    setIsUserSignedIn(false);
    router.push("/");
    toast.success("Sign out successful");
  };
  return (
    <div className="profile-page">
      <div>Profile page</div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
