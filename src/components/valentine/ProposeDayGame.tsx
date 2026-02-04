import { useState } from "react";

export default function ProposeDayGame() {
  const [pick, setPick] = useState<number | null>(null);
  const correct = 1;

  return (
    <div className="text-center">
      <p className="mb-4 text-rose-700">Choose the ring 💍</p>
      <div className="flex justify-center gap-6">
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={() => setPick(i)}
            className="text-4xl hover:scale-110"
          >
            💍
          </button>
        ))}
      </div>

      {pick !== null && (
        <p className="mt-4 text-rose-700">
          {pick === correct
            ? "Perfect 💖 Will you be mine?"
            : "Oops… wrong one 😅"}
        </p>
      )}
    </div>
  );
}
