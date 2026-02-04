import { useState } from "react";

export default function KissDayGame() {
  const [sent, setSent] = useState(false);

  return (
    <div className="text-center">
      <button onClick={() => setSent(true)} className="text-5xl">
        💋
      </button>
      {sent && <p className="mt-3 text-rose-700">Kiss delivered 😘</p>}
    </div>
  );
}
