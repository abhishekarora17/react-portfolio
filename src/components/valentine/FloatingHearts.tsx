export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-float text-pink-400 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 18 + 14}px`,
            animationDuration: `${Math.random() * 6 + 6}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          💖
        </span>
      ))}
    </div>
  );
}
