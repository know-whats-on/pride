import { Mic, Heart, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { GoalBannerCard } from "./GoalBannerCard";

interface CoachPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCoach: (coach: "presence" | "pride" | "power") => void;
}

const coaches = [
  {
    id: "pride" as const,
    titleLine1: "Lead with",
    titleLine2: "Pride",
    subtitle: "Contribute to the community while protecting your energy",
    icon: Heart,
    accentColor: "var(--accent-pride)",
    imageUrl: "https://images.unsplash.com/photo-1629019324504-2e1fdf96e5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaW5jbHVzaXZlJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MTgzOTQ0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "presence" as const,
    titleLine1: "Enhance Your",
    titleLine2: "Presence",
    subtitle: "Finding a voice that feels like You",
    icon: Mic,
    accentColor: "var(--accent-presence)",
    imageUrl: "https://images.unsplash.com/photo-1652265540589-46f91535337b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBwcmVzZW50YXRpb24lMjBzcGVha2luZ3xlbnwxfHx8fDE3NzE4Mzk0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "power" as const,
    titleLine1: "Build Your",
    titleLine2: "Power",
    subtitle: "Create impact at any scale",
    icon: Zap,
    accentColor: "var(--accent-power)",
    imageUrl: "https://images.unsplash.com/photo-1769739576456-0aefcff3f4b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwY29sbGFib3JhdGlvbiUyMHRlYW13b3JrfGVufDF8fHx8MTc3MTgzOTQ0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function CoachPickerSheet({
  open,
  onOpenChange,
  onSelectCoach,
}: CoachPickerSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-8 pt-4">
        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-[var(--border-subtle)]"></div>
        
        <SheetHeader className="mb-4">
          <SheetTitle className="text-center text-base font-normal text-[var(--ink-secondary)]">
            Pick one to start. You can switch anytime.
          </SheetTitle>
          <SheetDescription className="sr-only">
            Choose from Pride, Presence, or Power coach to begin your coaching session
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          {coaches.map((coach) => (
            <GoalBannerCard
              key={coach.id}
              titleLine1={coach.titleLine1}
              titleLine2={coach.titleLine2}
              subtitle={coach.subtitle}
              imageUrl={coach.imageUrl}
              icon={coach.icon}
              accentColor={coach.accentColor}
              onClick={() => {
                onSelectCoach(coach.id);
                onOpenChange(false);
              }}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}