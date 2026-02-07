import { useState } from "react";

const promises = [
  "I promise care 🤍",
  "I promise respect 🌸",
  "I promise support 🤝"
];

export default function PromiseDayGame() {
  const [done, setDone] = useState<boolean[]>(
    Array(promises.length).fill(false)
  );

  const toggle = (i: number) => {
    setDone(d => {
      const copy = [...d];
      copy[i] = !copy[i];
      return copy;
    });
  };

  const allDone = done.every(Boolean);

  return (
    <div className="max-w-xs mx-auto text-center">
      <p className="text-rose-700 mb-3 text-lg">
        Choose the promises you mean 💍
      </p>

      <div className="space-y-3">
        {promises.map((p, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full px-4 py-2 rounded-full border transition
              ${
                done[i]
                  ? "bg-rose-400 text-white border-rose-400"
                  : "bg-white text-rose-700 border-rose-300"
              }`}
          >
            {done[i] ? "✓ " : ""}{p}
          </button>
        ))}
      </div>

      {allDone && (
        <p className="mt-4 text-rose-600 animate-fadeIn">
          Promises sealed with my heart 💖
        </p>
      )}
    </div>
  );
}
