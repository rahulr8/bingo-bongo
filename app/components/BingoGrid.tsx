import React from "react";
import { BingoGridProps } from "./BingoGridTypes";

const BingoGrid: React.FC<BingoGridProps> = ({ grid, updateCell }) => {
  return (
    <div className="grid grid-cols-5 gap-1.5 aspect-square bg-gray-700 p-2 rounded-md">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={cell.id}
            type="text"
            value={cell.text}
            onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
            className="w-full h-full p-0.5 border border-gray-600 rounded text-center text-xs font-medium bg-gray-800 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            maxLength={20}
          />
        ))
      )}
    </div>
  );
};

export default BingoGrid;
