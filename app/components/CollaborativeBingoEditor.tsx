"use client";

import { useState, useCallback } from "react";
import { BingoCell } from "./BingoGridTypes";
import BingoGrid from "./BingoGrid";

export function CollaborativeBingoEditor({ code }: { code: string }) {
  const [grid, setGrid] = useState<BingoCell[][]>(
    Array(5)
      .fill(null)
      .map(() =>
        Array(5)
          .fill(null)
          .map(() => ({
            id: Math.random().toString(36).substr(2, 9),
            text: "",
          }))
      )
  );

  const updateCell = useCallback((row: number, col: number, text: string) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = { ...newGrid[row][col], text };
      return newGrid;
    });
  }, []);

  return (
    <div className="space-y-6 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-100">
        Collaborative Bingo
      </h2>
      <p className="text-center text-sm text-gray-300">
        Room Code: <span className="font-semibold text-blue-400">{code}</span>
      </p>
      <BingoGrid grid={grid} updateCell={updateCell} />
    </div>
  );
}
