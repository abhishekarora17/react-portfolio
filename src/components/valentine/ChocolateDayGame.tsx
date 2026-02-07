import { useState } from "react";

export default function ChocolateDayGame() {
  const [count, setCount] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const moveChocolate = () => {
    const maxX = 120;
    const maxY = 80;

    setPos({
      x: Math.random() * maxX * 2 - maxX,
      y: Math.random() * maxY * 2 - maxY
    });
  };

  const collect = () => {
    setCount(c => c + 1);
    moveChocolate();
  };

  return (
    <div className="text-center text-rose-700">
      <p>Catch 3 chocolates 🍫</p>

      <div className="relative h-40 flex justify-center items-center">
        <button
          onClick={collect}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          className="text-5xl transition-transform duration-300"
        >
          🍫
        </button>
      </div>

      <p className="mt-2">Collected: {count}</p>

      {count >= 3 && (
        <p className="mt-3 text-rose-600 animate-bounce">
          Sweet moments are better with you 💖
        </p>
      )}
    </div>
  );
}
