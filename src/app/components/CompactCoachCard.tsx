import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface CompactCoachCardProps {
  title: string;
  oneLiner: string;
  microOutcomes: string[];
  accent: "presence" | "pride" | "power";
  icon: LucideIcon;
  onStart: () => void;
  isPressed?: boolean;
}

const accentColors = {
  presence: {
    bg: "bg-[var(--accent-presence-light)]",
    text: "text-[var(--accent-presence-dark)]",
    border: "border-[var(--accent-presence)]",
    icon: "text-[var(--accent-presence)]",
    button: "bg-[var(--accent-presence)] hover:bg-[var(--accent-presence-dark)]",
  },
  pride: {
    bg: "bg-[var(--accent-pride-light)]",
    text: "text-[var(--accent-pride-dark)]",
    border: "border-[var(--accent-pride)]",
    icon: "text-[var(--accent-pride)]",
    button: "bg-[var(--accent-pride)] hover:bg-[var(--accent-pride-dark)]",
  },
  power: {
    bg: "bg-[var(--accent-power-light)]",
    text: "text-[var(--accent-power-dark)]",
    border: "border-[var(--accent-power)]",
    icon: "text-[var(--accent-power)]",
    button: "bg-[var(--accent-power)] hover:bg-[var(--accent-power-dark)]",
  },
};

export function CompactCoachCard({
  title,
  oneLiner,
  microOutcomes,
  accent,
  icon: Icon,
  onStart,
  isPressed = false,
}: CompactCoachCardProps) {
  const colors = accentColors[accent];

  return (
    <div
      className={`group rounded-2xl border-l-4 ${colors.border} bg-white p-6 shadow-sm transition-all hover:shadow-lg active:scale-[0.98] md:p-8 ${
        isPressed ? "scale-[0.98]" : ""
      }`}
      style={{ minHeight: "240px" }}
    >
      {/* Header with Icon */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}
        >
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${colors.text} leading-tight`}>
            {title}
          </h3>
        </div>
      </div>

      {/* One-liner */}
      <p className="mb-4 text-sm leading-relaxed text-[var(--ink-secondary)]">
        {oneLiner}
      </p>

      {/* Micro outcomes as chips/badges */}
      <div className="mb-5 flex flex-wrap gap-2">
        {microOutcomes.map((outcome, i) => (
          <Badge
            key={i}
            variant="secondary"
            className={`${colors.bg} ${colors.text} rounded-full px-3 py-1.5 text-xs font-medium`}
          >
            {outcome}
          </Badge>
        ))}
      </div>

      {/* CTA Button - Better tap target */}
      <Button
        onClick={onStart}
        className={`w-full touch-target rounded-full font-semibold text-white ${colors.button}`}
        size="lg"
        aria-label={`Start ${title} - ${oneLiner}`}
        style={{ minHeight: "48px" }}
      >
        Start {title}
      </Button>
    </div>
  );
}