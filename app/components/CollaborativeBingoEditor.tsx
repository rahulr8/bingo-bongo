"use client";

import React, { useState, useEffect, useCallback } from "react";
import BingoGrid from "./BingoGrid";
import Header from "./Header";
import { getSocket } from "@/utils/socket";
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
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [activeConnections, setActiveConnections] = useState(1);

  useEffect(() => {
    const socket = getSocket();
    setIsSocketReady(true);

    socket.emit("joinRoom", code);

    socket.on("gridUpdate", (updatedGrid: BingoCell[][]) => {
      setGrid(updatedGrid);
    });

    socket.on("activeConnections", (count: number) => {
      setActiveConnections(count);
    });

    return () => {
      socket.off("gridUpdate");
      socket.off("activeConnections");
      socket.emit("leaveRoom", code);
    };
  }, [code]);

  const updateCell = useCallback(
    (rowIndex: number, colIndex: number, text: string) => {
      if (!isSocketReady) return;

      const newGrid = grid.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex ? { ...cell, text } : cell
        )
      );
      setGrid(newGrid);
      getSocket().emit("updateGrid", { code, grid: newGrid });
    },
    [grid, code, isSocketReady]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header code={code} activeConnections={activeConnections} />
      <main className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <BingoGrid grid={grid} updateCell={updateCell} />
        </div>
      </main>
    </div>
  );
};

export default CollaborativeBingoEditor;
