import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type ValentineDay = {
  key: string;
  date: string;
  fullDate: string;
  title: string;
  wish: string;
};

const days: ValentineDay[] = [
  {
    key: "rose",
    date: "Feb 7",
    fullDate: "Feb 7",
    title: "🌹 Rose Day",
    wish:
      "Like a rose, you make everything around you more beautiful— and somehow, life smells better when you’re around."
  },
  {
    key: "propose",
    date: "Feb 8",
    fullDate: "Feb 8",
    title: "💍 Propose Day",
    wish:
      "If hearts could code, mine would always compile with yours— no errors, just endless possibilities."
  },
  {
    key: "chocolate",
    date: "Feb 9",
    fullDate: "Feb 9",
    title: "🍫 Chocolate Day",
    wish:
      "Life’s sweeter with you in it. Not because it’s perfect—but because it’s warm and real."
  },
  {
    key: "teddy",
    date: "Feb 10",
    fullDate: "Feb 10",
    title: "🧸 Teddy Day",
    wish:
      "Whenever the world feels heavy, I hope you always find comfort—like a soft hug that never fades."
  },
  {
    key: "promise",
    date: "Feb 11",
    fullDate: "Feb 11",
    title: "🤝 Promise Day",
    wish:
      "I promise to be there—not just on good days, but on the quiet, messy, human ones too."
  },
  {
    key: "hug",
    date: "Feb 12",
    fullDate: "Feb 12",
    title: "🤗 Hug Day",
    wish:
      "Some hugs don’t need arms— they just need understanding. This one’s for you."
  },
  {
    key: "kiss",
    date: "Feb 13",
    fullDate: "Feb 13",
    title: "💋 Kiss Day",
    wish:
      "If emotions could speak, they’d say what a kiss tries to—without words."
  },
  {
    key: "valentine",
    date: "Feb 14",
    fullDate: "Feb 14",
    title: "❤️ Valentine’s Day",
    wish:
      "This isn’t about one day. It’s about every moment that feels warmer just because you exist."
  }
];

const isUnlocked = (dayDate: string): boolean => {
  const today = new Date();
  const year = today.getFullYear();
  const date = new Date(`${dayDate} ${year}`);
  return today >= date;
};

const Valentine = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState<ValentineDay>(days[0]);

  // Read ?day=rose from URL
  useEffect(() => {
    const dayKey = searchParams.get("day");
    if (!dayKey) return;

    const found = days.find(d => d.key === dayKey);
    if (found && isUnlocked(found.fullDate)) {
      setActive(found);
    }
  }, [searchParams]);

  const handleClick = (day: ValentineDay): void => {
    setActive(day);
    setSearchParams({ day: day.key });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 flex flex-col items-center px-4 py-10">

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute bottom-0 animate-float text-pink-400 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              fontSize: `${Math.random() * 20 + 12}px`
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* Heading */}
      <h1 className="relative text-4xl md:text-5xl font-semibold text-rose-700 mb-8 z-10">
        Valentine Days 💕
      </h1>

      {/* Tabs */}
      <div className="relative flex flex-wrap justify-center gap-2 mb-10 z-10">
        {days.map(day => {
          const unlocked = isUnlocked(day.fullDate);

          return (
            <button
              key={day.key}
              disabled={!unlocked}
              onClick={() => unlocked && handleClick(day)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300
                ${
                  active.key === day.key
                    ? "bg-rose-500 text-white shadow-lg scale-105"
                    : unlocked
                    ? "bg-white/70 text-rose-600 hover:bg-white"
                    : "bg-white/40 text-gray-400 cursor-not-allowed"
                }`}
            >
              {day.date} {!unlocked && "🔒"}
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div className="relative max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center animate-fadeIn z-10">
        <h2 className="text-3xl font-medium text-rose-600 mb-4">
          {active.title}
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          {active.wish}
        </p>

        {active.key === "valentine" && (
          <div className="mt-6 text-rose-500 text-xl animate-pulse">
            💓💓💓
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="relative mt-10 text-sm text-rose-700 opacity-80 z-10">
        Made with ❤️ by Abhi
      </p>
    </section>
  );
};

export default Valentine;
