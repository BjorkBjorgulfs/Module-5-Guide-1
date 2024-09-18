import { Metadata } from "next";
import UserOverview from "@/app/ui/settings/user";
import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: 'Settings'
};

// function to get the user email from the session token
async function getUserEmailFromSession(sessionToken: string): Promise<string | null> {
  try {
    // Parse the session token or use the session data as per your NextAuth configuration
    // In this simplified example, you can assume sessionToken contains the user's email directly
    return sessionToken; // Replace with actual parsing logic
  } catch (error) {
    console.error('Error parsing session token:', error);
    return null;
  }
}

// Main Settings Page component
export default async function SettingsPage() {
  const cookieStore = cookies(); // Access cookies server-side
  const sessionToken = cookieStore.get('authjs.session-token')?.value;

  console.log('Cookies:', cookieStore.getAll());
  // If there's no session token, return an error
  if (!sessionToken) {
    return <p>Please log in to view your settings.</p>;
  }

  console.log('Session Token:', sessionToken);

  // Fetch the user's email from the session token
  const email = await getUserEmailFromSession(sessionToken);
  console.log('User Email:', email);

  if (!email) {
    return <p>No user associated with this session. Please log in.</p>;
  }

  // Fetch the user data from the database using their email
  const user = await getUser(email);
  console.log('User Data:', user);

  if (!user) {
    return <p>User not found. Please log in.</p>;
  }

  // Return the settings page and display the user data using UserOverview
  return (
    <div>
      <h1>Settings Page</h1>
      <UserOverview user={user} />
    </div>
  );
}
