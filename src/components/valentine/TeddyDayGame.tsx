import { useState } from "react";

export default function TeddyDayGame() {
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = (emoji) => {
    if (emoji === "🧸") {
      setFound(true);
      setMessage("That’s my way of holding you close 🤗");
    } else {
      setFound(false);
      setMessage("Oops! That’s not the teddy 😄");
    }
  };

  return (
    <div className="text-center text-rose-700">
      <p>Find the teddy 🧸</p>

      <div className="flex justify-center gap-6 mt-4">
        {["🐻", "🧸", "🐨"].map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleClick(emoji)}
            className="text-4xl transition-transform active:scale-90"
          >
            {emoji}
          </button>
        ))}
      </div>

      {message && (
        <p className="mt-3 text-rose-600 animate-fadeIn">
          {message}
        </p>
      )}
    </div>
  );
}
