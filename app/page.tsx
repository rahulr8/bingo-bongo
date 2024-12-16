import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select("id, username");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = roomCode.trim() || generateRoomCode();
    router.push(`/bingo/${code}`);
  };

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Collaborative Bingos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter room code (optional)"
          className="px-4 py-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="block w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          {roomCode ? "Join Game" : "Create New Game"}
        </button>
      </form>
    </main>
  );
}
