import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RoseDayGame from "../components/valentine/RoseDayGame";
import ProposeDayGame from "../components/valentine/ProposeDayGame";
import ChocolateDayGame from "../components/valentine/ChocolateDayGame";
import TeddyDayGame from "../components/valentine/TeddyDayGame";
import PromiseDayGame from "../components/valentine/PromiseDayGame";
import HugDayGame from "../components/valentine/HugDayGame";
import KissDayGame from "../components/valentine/KissDayGame";
import ValentineFinal from "../components/valentine/ValentineFinal";
import FloatingHearts from "../components/valentine/FloatingHearts";

type ValentineDay = {
  key: string;
  date: string;
  fullDate: string;
  title: string;
  quote: string;
};

const days: ValentineDay[] = [
  {
    key: "rose",
    date: "Feb 7",
    fullDate: "Feb 7",
    title: "🌹 Rose Day",
    quote:
      "Like a rose, you make everything around you more beautiful— and somehow, life smells better when you’re around."
  },
  {
    key: "propose",
    date: "Feb 8",
    fullDate: "Feb 8",
    title: "💍 Propose Day",
    quote:
      "If hearts could code, mine would always compile with yours— no errors, just endless possibilities."
  },
  {
    key: "chocolate",
    date: "Feb 9",
    fullDate: "Feb 9",
    title: "🍫 Chocolate Day",
    quote:
      "Life’s sweeter with you in it. Not because it’s perfect—but because it’s warm and real."
  },
  {
    key: "teddy",
    date: "Feb 10",
    fullDate: "Feb 10",
    title: "🧸 Teddy Day",
    quote:
      "Whenever the world feels heavy, I hope you always find comfort—like a soft hug that never fades."
  },
  {
    key: "promise",
    date: "Feb 11",
    fullDate: "Feb 11",
    title: "🤝 Promise Day",
    quote:
      "I promise to be there—not just on good days, but on the quiet, messy, human ones too."
  },
  {
    key: "hug",
    date: "Feb 12",
    fullDate: "Feb 12",
    title: "🤗 Hug Day",
    quote:
      "Some hugs don’t need arms— they just need understanding. This one’s for you."
  },
  {
    key: "kiss",
    date: "Feb 13",
    fullDate: "Feb 13",
    title: "💋 Kiss Day",
    quote:
      "If emotions could speak, they’d say what a kiss tries to—without words."
  },
  {
    key: "valentine",
    date: "Feb 14",
    fullDate: "Feb 14",
    title: "❤️ Valentine’s Day",
    quote:
      "This isn’t about one day. It’s about every moment that feels warmer just because you exist."
  }
];

const isUnlocked = (d: string) => {
  const today = new Date();
  const year = today.getFullYear();
  return today >= new Date(`${d} ${year}`);
};

export default function Valentine() {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState(days[0]);

  useEffect(() => {
    const k = params.get("day");
    const found = days.find(d => d.key === k);
    if (found && isUnlocked(found.fullDate)) setActive(found);
  }, [params]);

  const renderGame = () => {
    switch (active.key) {
      case "rose": return <RoseDayGame />;
      case "propose": return <ProposeDayGame />;
      case "chocolate": return <ChocolateDayGame />;
      case "teddy": return <TeddyDayGame />;
      case "promise": return <PromiseDayGame />;
      case "hug": return <HugDayGame />;
      case "kiss": return <KissDayGame />;
      case "valentine": return <ValentineFinal />;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 flex flex-col items-center py-10 px-4">

      <FloatingHearts />
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {days.map(d => {
          const ok = isUnlocked(d.fullDate);
          return (
            <button
              key={d.key}
              disabled={!ok}
              onClick={() => {
                setActive(d);
                setParams({ day: d.key });
              }}
              className={`px-4 py-2 rounded-full ${
                active.key === d.key
                  ? "bg-rose-500 text-white"
                  : ok
                  ? "bg-white text-rose-600"
                  : "bg-white/40 text-gray-400"
              }`}
            >
              {d.date} {!ok && "🔒"}
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl max-w-xl w-full p-8 space-y-6 text-center animate-fadeIn">
        <h2 className="text-3xl text-rose-600">{active.title}</h2>
        <p className="italic text-rose-700">“{active.quote}”</p>
        <div className="pt-4">{renderGame()}</div>
      </div>

      <p className="mt-10 text-sm text-rose-700">
        Made with ❤️ by Someone who cares about you.
      </p>
    </section>
  );
}
