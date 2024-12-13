"use client";

import React, { useState, useCallback } from "react";
import BingoGrid from "./BingoGrid";
import Header from "./Header";
import { BingoCell } from "@/types/BingoGridTypes";

interface CollaborativeBingoEditorProps {
  code: string;
}

const CollaborativeBingoEditor: React.FC<CollaborativeBingoEditorProps> = ({
  code,
}) => {
  const [grid, setGrid] = useState<BingoCell[][]>(() =>
    Array(5)
      .fill(null)
      .map((_, rowIndex) =>
        Array(5)
          .fill(null)
          .map((_, colIndex) => ({
            id: `${rowIndex}-${colIndex}`,
            text: "",
          }))
      )
  );

  const updateCell = useCallback(
    (rowIndex: number, colIndex: number, text: string) => {
      const newGrid = grid.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex ? { ...cell, text } : cell
        )
      );
      setGrid(newGrid);
    },
    [grid]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header code={code} />
      <main className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <BingoGrid grid={grid} updateCell={updateCell} />
        </div>
      </main>
    </div>
  );
};

export default CollaborativeBingoEditor;
