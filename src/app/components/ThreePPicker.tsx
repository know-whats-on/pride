import { useState } from "react";
import { Mic, Heart, Zap, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { GoalBannerCard } from "./GoalBannerCard";
import { RotatingGoalWord } from "./RotatingGoalWord";

interface CoachOption {
  id: "pride" | "presence" | "power";
  label: string;
  icon: typeof Mic;
  accent: string;
  accentLight: string;
  purposeLine: string;
  bullets: string[];
  imageUrl: string;
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
}

const coachOptions: CoachOption[] = [
  {
    id: "pride",
    label: "Lead with Pride",
    icon: Heart,
    accent: "var(--accent-pride)",
    accentLight: "var(--accent-pride-light)",
    purposeLine: "Belonging + boundaries to lead without burnout.",
    bullets: [
      "Reduce Pride Tax and emotional labour.",
      "Use respectful scripts for tricky asks.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbW11bml0eSUyMHdhcm0lMjBmcmllbmRseXxlbnwxfHx8fDE3NzE4Mzg5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    subtitle: "Contribute to the community while protecting your energy",
    titleLine1: "Lead with",
    titleLine2: "Pride",
  },
  {
    id: "presence",
    label: "Enhance your Presence",
    icon: Mic,
    accent: "var(--accent-presence)",
    accentLight: "var(--accent-presence-light)",
    purposeLine: "Voice + values for clear, authentic leadership.",
    bullets: [
      "Speak up without over-explaining.",
      "Get meeting + feedback scripts.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1652265540589-46f91535337b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBzcGVha2luZyUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NzE4Mzg5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    subtitle: "Finding a voice that feels like You",
    titleLine1: "Enhance Your",
    titleLine2: "Presence",
  },
  {
    id: "power",
    label: "Build Your Power",
    icon: Zap,
    accent: "var(--accent-power)",
    accentLight: "var(--accent-power-light)",
    purposeLine: "Influence + impact to create ethical change.",
    bullets: [
      "Map stakeholders and decision points.",
      "Make the smallest effective move.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1676276375450-3707e4e624c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbGxhYm9yYXRpb24lMjBzdHJhdGVneSUyMGltcGFjdHxlbnwxfHx8fDE3NzE4Mzg5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    subtitle: "Create impact at any scale",
    titleLine1: "Build Your",
    titleLine2: "Power",
  },
];

interface ThreePPickerProps {
  onSelectCoach: (coach: "pride" | "presence" | "power") => void;
}

export function ThreePPicker({ onSelectCoach }: ThreePPickerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        
        {/* Premium Banner Cards Stack */}
        <div className="flex flex-col gap-4">
          {coachOptions.map((option) => (
            <GoalBannerCard
              key={option.id}
              titleLine1={option.titleLine1}
              titleLine2={option.titleLine2}
              subtitle={option.subtitle}
              imageUrl={option.imageUrl}
              icon={option.icon}
              accentColor={option.accent}
              onClick={() => onSelectCoach(option.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}