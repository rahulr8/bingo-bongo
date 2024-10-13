import { BingoEditor } from "../../components/BingoEditor";

export default function BingoPage({ params }: { params: { code: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bingo Collaboration</h1>
      <BingoEditor code={params.code} />
    </div>
  );
}

// Add this function to generate static params
export async function generateStaticParams() {
  // Here, you should return an array of objects with the possible 'code' values
  // For example, if you have predefined codes or want to generate some:
  return [
    { code: "game1" },
    { code: "game2" },
    { code: "game3" },
    // Add more codes as needed
  ];
}
