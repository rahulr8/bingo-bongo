"use client";

import { CollaborativeBingoEditor } from "./CollaborativeBingoEditor";

export function BingoEditor({ code }: { code: string }) {
  return <CollaborativeBingoEditor code={code} />;
}
