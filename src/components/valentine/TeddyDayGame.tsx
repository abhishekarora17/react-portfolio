import { useState } from "react";

export default function TeddyDayGame() {
  const [found, setFound] = useState(false);

  return (
    <div className="text-center text-rose-700">
      <p>Find the teddy 🧸</p>
      <div className="flex justify-center gap-6 mt-4">
        {["🐻", "🧸", "🪆"].map(i => (
          <button
            key={i}
            onClick={() => setFound(i === "🧸")}
            className="text-4xl"
          >
            {i}
          </button>
        ))}
      </div>
      {found && <p className="mt-3 text-rose-600">You found comfort 💖</p>}
    </div>
  );
}
