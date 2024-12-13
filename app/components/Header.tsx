import React from "react";

interface HeaderProps {
  code: string;
}

const Header: React.FC<HeaderProps> = ({ code }) => {
  return (
    <header className="bg-gray-800 text-gray-100 p-6 mb-8 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">Bingo Collaboration</h1>
        <div className="flex justify-between items-center text-sm">
          <p className="bg-gray-700 px-3 py-1 rounded">Room Code: {code}</p>
          <p className="bg-gray-700 px-3 py-1 rounded">Active Players: WIP</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
