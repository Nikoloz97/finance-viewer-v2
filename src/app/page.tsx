import { UserProvider } from "@/usercontext";
import Dashboard from "./dashboard/page";

export default async function Home() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}
