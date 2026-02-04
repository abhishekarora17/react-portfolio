import { useState } from "react";

export default function HugDayGame() {
  const [hug, setHug] = useState(false);

  return (
    <div className="text-center">
      <p>Hold for a hug 🤗</p>
      <button
        onMouseDown={() => setTimeout(() => setHug(true), 1500)}
        className="px-6 py-2 bg-rose-400 text-white rounded-full mt-4"
      >
        Hold
      </button>
      {hug && <p className="mt-3 text-rose-600">That felt warm 💖</p>}
    </div>
  );
}
