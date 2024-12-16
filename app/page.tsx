import { createClient } from "@/utils/supabase/server";
import JoinGameForm from "./components/JoinGameForm";

export default async function Home() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select("id, username");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Collaborative Bingos</h1>
      <JoinGameForm />
    </main>
  );
}
