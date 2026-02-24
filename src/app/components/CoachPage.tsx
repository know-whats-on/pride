import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { CoachHeroBanner } from "../components/CoachHeroBanner";

interface CoachPageProps {
  type: "presence" | "pride" | "power";
  title: string;
  description: string;
  useCases: string[];
  takeaways: string[];
  accentColor: string;
  imageUrl: string;
  onOpenCoachPicker: () => void;
}

export function CoachPage({
  type,
  title,
  description,
  useCases,
  takeaways,
  accentColor,
  imageUrl,
  onOpenCoachPicker,
}: CoachPageProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate loading state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleStartChat = () => {
    navigate(`/coach/${type}/chat`);
  };

  const handleUseCaseClick = (useCase: string) => {
    // Store the use case text to prefill in chat
    localStorage.setItem("coach_prefill", useCase);
    // Navigate to chat
    navigate(`/coach/${type}/chat`);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-base)]/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCoachPicker}
            className="rounded-full"
          >
            Switch coach
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
        {loading ? (
          /* Loading skeleton */
          <>
            <Skeleton className="mb-6 h-[130px] rounded-3xl" />
            <Skeleton className="mb-3 h-12 rounded-full" />
            <Skeleton className="mb-8 h-48 rounded-2xl" />
          </>
        ) : (
          <>
            {/* Hero Banner */}
            <div className="mb-6">
              <CoachHeroBanner
                coachName={title}
                descriptor={description}
                imageUrl={imageUrl}
                accentColor={accentColor}
              />
            </div>

            {/* Primary CTA */}
            <div className="mb-8">
              <Button
                size="lg"
                className="w-full rounded-full text-white"
                style={{ backgroundColor: accentColor }}
                onClick={handleStartChat}
              >
                Start chat
              </Button>
              
            </div>

            {/* Use Cases */}
            <div className="mb-8">
              <h2 className="mb-2 font-semibold text-[var(--ink-primary)]">
                Use cases
              </h2>
              <p className="mb-4 text-xs text-[var(--ink-secondary)]">
                Pick one to start. You can switch anytime.
              </p>
              <div className="flex flex-wrap gap-2">
                {useCases.map((useCase, i) => (
                  <button
                    key={i}
                    onClick={() => handleUseCaseClick(useCase)}
                    className="rounded-full border border-[var(--border-subtle)] bg-white px-4 py-2.5 text-sm text-[var(--ink-secondary)] transition-all hover:border-[var(--border-default)] hover:bg-[var(--surface-muted)] active:scale-[0.98]"
                  >
                    {useCase}
                  </button>
                ))}
              </div>
            </div>

            {/* Takeaways */}
            <div className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
              <h2 className="mb-2 font-semibold text-[var(--ink-primary)]">
                Takeaways
              </h2>
              <p className="mb-4 text-xs text-[var(--ink-secondary)]">
                What you'll leave with from this coach.
              </p>
              <ul className="space-y-3">
                {takeaways.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink-secondary)]"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Note */}
            <div className="rounded-xl bg-[var(--surface-muted)] p-4 text-center">
              <p className="text-xs leading-relaxed text-[var(--ink-secondary)]">
                Not therapy or legal advice. For learning and reflection.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}