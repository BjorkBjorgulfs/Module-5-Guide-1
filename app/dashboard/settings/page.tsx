import { Metadata } from "next";
import { auth } from "@/auth";
import { getUser } from "@/app/lib/data";
import UserOverview from "@/app/ui/settings/user";
import { lusitana } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: 'Settings'
};

// Main Settings Page component
export default async function SettingsPage() {
   const session = await auth();

  // Check if the user is authenticated
  if (!session || !session.user?.email) {
    return <p>Please log in to view your settings.</p>;
  }

  // Fetch the user from the database
  const user = await getUser(session.user.email);

  if (!user) {
    return <p>User not found. Please log in.</p>;
  }

  return (
    <div>
      <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      <UserOverview user={user} />
    </div>
  );
}