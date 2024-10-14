"use client";

import CollaborativeBingoEditor from "@/app/components/CollaborativeBingoEditor";

export default function BingoPage({ params }: { params: { code: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <CollaborativeBingoEditor code={params.code} />
    </main>
  );
}
