import { useState, useEffect } from "react";

const phrases = [
  { text: "Goal this Year", color: "var(--accent-presence)" },
  { text: "Biggest Challenge", color: "var(--accent-pride)" },
  { text: "North-star Metric", color: "var(--accent-power)" },
  { text: "Annoying Pain-point", color: "var(--accent-warm)" },
  { text: "Fail-proof Plan", color: "var(--accent-presence)" },
];

export function RotatingGoalWord() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Reduced motion: show first phrase, with ? as part of the same line
  if (prefersReducedMotion) {
    return (
      <span className="inline-flex items-baseline justify-center gap-2">
        <span className="inline-block font-bold" style={{ color: phrases[0].color }}>
          {phrases[0].text}
        </span>
        <span className="inline-block font-bold text-white">?</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline justify-center gap-2">
      {/* Fixed-width rotator box to prevent layout shift */}
      <span className="relative inline-block min-w-[13rem] text-center">
        {phrases.map((phrase, index) => (
          <span
            key={phrase.text}
            className="absolute left-0 top-0 inline-block w-full font-bold transition-all duration-300 ease-out"
            style={{
              color: phrase.color,
              opacity: currentIndex === index ? 1 : 0,
              transform: currentIndex === index ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            {/* Put the ? INSIDE the phrase so it moves with the text */}
            {phrase.text}{" "}
            <span className="text-white">?</span>
          </span>
        ))}

        {/* Invisible spacer: include the ? too so width stays consistent */}
        <span className="invisible inline-block font-bold">
          Annoying Pain-point <span>?</span>
        </span>
      </span>
    </span>
  );
}