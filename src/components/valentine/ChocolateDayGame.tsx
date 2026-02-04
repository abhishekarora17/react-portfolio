import { useState } from "react";

export default function ChocolateDayGame() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <p className="text-rose-700">Collect 3 chocolates 🍫</p>
      <button
        onClick={() => setCount(c => c + 1)}
        className="text-5xl animate-bounce mt-4"
      >
        🍫
      </button>
      <p className="mt-2 text-rose-700">Collected: {count}</p>
      {count >= 3 && <p className="mt-3 text-rose-600">Sweet 💖</p>}
    </div>
  );
}
