import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface CoachCardProps {
  title: string;
  descriptor: string;
  bullets: string[];
  accent: "presence" | "pride" | "power";
  icon: LucideIcon;
  onStart: () => void;
  expanded?: boolean;
  expandedContent?: {
    whatItHelps: string[];
    bestFor: string[];
    examplePrompts: string[];
  };
}

const accentColors = {
  presence: {
    bg: "bg-[var(--accent-presence-light)]",
    text: "text-[var(--accent-presence-dark)]",
    border: "border-[var(--accent-presence)]",
    icon: "text-[var(--accent-presence)]",
  },
  pride: {
    bg: "bg-[var(--accent-pride-light)]",
    text: "text-[var(--accent-pride-dark)]",
    border: "border-[var(--accent-pride)]",
    icon: "text-[var(--accent-pride)]",
  },
  power: {
    bg: "bg-[var(--accent-power-light)]",
    text: "text-[var(--accent-power-dark)]",
    border: "border-[var(--accent-power)]",
    icon: "text-[var(--accent-power)]",
  },
};

export function CoachCard({
  title,
  descriptor,
  bullets,
  accent,
  icon: Icon,
  onStart,
  expanded = false,
  expandedContent,
}: CoachCardProps) {
  const colors = accentColors[accent];

  return (
    <div
      className={`group rounded-3xl border-2 ${colors.border} ${colors.bg} p-6 transition-all hover:shadow-lg md:p-8`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white`}
        >
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div className="flex-1">
          <h3
            className={`mb-1 text-xl font-semibold leading-snug ${colors.text}`}
          >
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
            {descriptor}
          </p>
        </div>
      </div>

      {/* Main bullets */}
      <ul className="mb-6 space-y-2">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-[var(--ink-primary)]"
          >
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${colors.icon}`}></span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Expanded content */}
      {expanded && expandedContent && (
        <div className="mb-6 space-y-5 border-t border-[var(--border-subtle)] pt-6">
          {/* What it helps with - max 3 bullets */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--ink-primary)]">
              What it helps with
            </h4>
            <ul className="space-y-2">
              {expandedContent.whatItHelps.slice(0, 3).map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-[var(--ink-secondary)]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--ink-secondary)]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best for - max 3 bullets */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--ink-primary)]">
              Best for
            </h4>
            <ul className="space-y-2">
              {expandedContent.bestFor.slice(0, 3).map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-[var(--ink-secondary)]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--ink-secondary)]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Example prompts - exactly 3 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--ink-primary)]">
              Example prompts you can ask
            </h4>
            <ul className="space-y-2">
              {expandedContent.examplePrompts.slice(0, 3).map((item, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-white/60 p-3 text-sm leading-relaxed text-[var(--ink-primary)]"
                >
                  "{item}"
                </li>
              ))}
            </ul>
          </div>

          {/* Safety note */}
          <div className="rounded-xl bg-white/60 p-4">
            <p className="text-xs leading-relaxed text-[var(--ink-secondary)]">
              <strong className="font-semibold text-[var(--ink-primary)]">
                Safety note:
              </strong>{" "}
              Not therapy or legal advice. For learning and reflection.
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <Button
        onClick={onStart}
        className={`w-full h-12 rounded-full font-semibold ${colors.icon}`}
        size="lg"
        aria-label={`Start ${title} Coach - ${descriptor}`}
      >
        Start {title} Coach
      </Button>
    </div>
  );
}