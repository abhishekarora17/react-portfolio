import { useState } from "react";

const items = ["Care", "Respect", "Support"];

export default function PromiseDayGame() {
  const [done, setDone] = useState<boolean[]>([false, false, false]);

  return (
    <div>
      {items.map((p, i) => (
        <label key={i} className="block text-rose-700">
          <input
            type="checkbox"
            onChange={() => {
              const d = [...done];
              d[i] = !d[i];
              setDone(d);
            }}
          />{" "}
          {p}
        </label>
      ))}
      {done.every(Boolean) && (
        <p className="mt-3 text-center text-rose-600">
          Promises sealed 💖
        </p>
      )}
    </div>
  );
}
