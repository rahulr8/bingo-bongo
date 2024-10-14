"use client";

import React, { useState, useEffect, useCallback } from "react";
import BingoGrid from "./BingoGrid";
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

  useEffect(() => {
    const socket = getSocket();
    setIsSocketReady(true);

    socket.emit("joinRoom", code);

    socket.on("gridUpdate", (updatedGrid: BingoCell[][]) => {
      setGrid(updatedGrid);
    });

    return () => {
      socket.off("gridUpdate");
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

  return <BingoGrid grid={grid} updateCell={updateCell} />;
};

export default CollaborativeBingoEditor;
