import { useState } from "react";

export default function RoseDayGame() {
  const [yes, setYes] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const moveNo = () => {
    setPos({
      x: Math.random() * 200 - 100,
      y: Math.random() * 120 - 60
    });
  };

  if (yes) {
    return (
      <div className="text-center animate-fadeIn">
        <div className="text-6xl animate-bounce">🌹</div>
        <p className="mt-4 text-rose-600">
          A rose for you 💖
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xl mb-6 text-rose-700">Will you take this rose?</p>
      <div className="relative flex justify-center gap-6">
        <button
          onClick={() => setYes(true)}
          className="px-6 py-2 bg-rose-500 text-white rounded-full"
        >
          YES 💖
        </button>
        <button
          onMouseEnter={moveNo}
          onClick={moveNo}
          onTouchStart={moveNo}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          className="px-6 py-2 bg-gray-200 rounded-full transition-all"
        >
          NO 🙈
        </button>
      </div>
    </div>
  );
}
