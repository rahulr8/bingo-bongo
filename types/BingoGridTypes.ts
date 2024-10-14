export interface BingoCell {
  id: string;
  text: string;
}

export interface BingoGridProps {
  grid: BingoCell[][];
  updateCell: (row: number, col: number, text: string) => void;
}
