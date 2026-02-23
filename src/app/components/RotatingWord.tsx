import { useState, useEffect } from "react";

const words = [
  { text: "Pride", color: "var(--accent-pride)" },
  { text: "Power", color: "var(--accent-power)" },
  { text: "Presence", color: "var(--accent-presence)" },
];

export function RotatingWord() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Rotate every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[8.5rem] text-center">
      {words.map((word, index) => (
        <span
          key={word.text}
          className="absolute left-0 top-0 inline-block w-full font-bold transition-opacity duration-200 ease-out font-[Clancy] text-center"
          style={{
            color: word.color,
            opacity: currentIndex === index ? 1 : 0,
          }}
        >
          {word.text}.
        </span>
      ))}
      {/* Invisible spacer to maintain layout width - using longest word */}
      <span className="invisible inline-block font-bold">Presence.</span>
    </span>
  );
}