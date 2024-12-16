"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinGameForm() {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = roomCode.trim() || generateRoomCode();
    router.push(`/bingo/${code}`);
  };

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
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
  );
}
