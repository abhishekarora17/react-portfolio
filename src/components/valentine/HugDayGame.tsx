import { useState, useRef } from "react";

export default function HugDayGame() {
  const [hug, setHug] = useState(false);
  const timerRef = useRef(null);

  const startHold = () => {
    timerRef.current = setTimeout(() => {
      setHug(true);
    }, 1500);
  };

  const endHold = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div className="text-center text-rose-700">
      <p className="text-lg">Hold for a hug 🤗</p>

      <button
        onMouseDown={startHold}     // desktop
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}   // mobile
        onTouchEnd={endHold}
        className="px-6 py-3 bg-rose-400 text-white rounded-full mt-4 active:scale-95 transition"
      >
        Hold
      </button>

      {hug && (
        <p className="mt-3 text-rose-600 animate-fadeIn">
          That felt warm 💖
        </p>
      )}
    </div>
  );
}
