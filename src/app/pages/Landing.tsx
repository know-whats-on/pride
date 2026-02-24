const heroImage = "/assets/hero.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowUp, ChevronDown, History } from "lucide-react";
import { Header } from "../components/Header";
import { ThreePPicker } from "../components/ThreePPicker";
import { CoachPickerSheet } from "../components/CoachPickerSheet";
import { PWASpecNotes } from "../components/PWASpecNotes";
import { RotatingWord } from "../components/RotatingWord";
import { RotatingGoalWord } from "../components/RotatingGoalWord";
import { OfflineBanner } from "../components/OfflineBanner";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";

const faqs = [
  {
    question: "What should I share?",
    answer:
      "This WebApp runs offline on your device which means, NOTHING is uploaded to the cloud by this app Share what’s needed to coach the scenario: what happened, the setting (meeting/1:1/email), and what outcome you want. If you’re unsure, start with 2–3 sentences and keep it generic.",
  },
  {
    question: "Is this confidential?",
    answer:
      "Please don't share confidential info. Treat it like any digital tool.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most people get a useful plan in 5–10 minutes.",
  },
  {
    question: "Can I switch coaches?",
    answer:
      "Yes—switch anytime from 'Open a Coach'.",
  },
];

export function Landing() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPicker = () => {
    pickerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <OfflineBanner />
      <Header onOpenCoachPicker={() => setPickerOpen(true)} showSecondaryNav={true} />

      <main className="-mt-16">
        {/* Full-Screen Edge-to-Edge Hero */}
        <section className="relative h-screen overflow-hidden pt-16 pb-12">
          {/* Hero Background Image with overlay */}
          <div className="absolute inset-0 h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1573165706511-3ffde6ef1fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRpdmVyc2UlMjBwcm9mZXNzaW9uYWwlMjBsZWFkZXIlMjB3b3JrcGxhY2UlMjBpbmNsdXNpdmUlMjBlbXBvd2VyZWR8ZW58MXx8fHwxNzcxODM1NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Empowered professional leader"
              className="h-full w-full object-cover"
            />
            {/* Bottom gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
          </div>

          {/* Hero Content Overlay - Centered Vertically & Horizontally */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 bg-[#00000091]">
            {/* Text Content Block */}
            <div className="w-full max-w-[340px] text-center md:max-w-[480px]">
              {/* Hero Headline - White text, rotating word in color */}
              <h1 className="mb-2 text-[2.75rem] leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl md:mb-3">
                Transforming<br />
                leaders with<br />
                <RotatingWord />
              </h1>
              
              {/* Subline */}
              

              {/* Attribution Stack - UNSW Lockup */}
              <div className="flex flex-col items-center gap-4 mt-6">
                <p className="text-[13px] leading-relaxed text-white/85 drop-shadow-sm">
                  Designed and created for
                </p>
                {/* Partner Logo - UNSW Alumni Engagement */}
                <div className="flex h-[80px] items-center justify-center md:h-[88px]">
                  <img
                    src={heroImage}
                    alt="UNSW Alumni Engagement"
                    className="h-full w-auto opacity-100 drop-shadow-lg brightness-110"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fade/Dissolve Overlay - Inside Hero Only */}
          <div 
            className="absolute left-0 right-0 bottom-0 h-[18svh] md:h-[14vh] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(255,255,255,0.75) 78%, rgba(255,255,255,1) 100%)',
            }}
          >
            {/* Subtle noise texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />
          </div>

          {/* "What's your..." Teaser - positioned above scroll indicator */}
          <div className="absolute bottom-[88px] md:bottom-[96px] left-0 right-0 z-20 pointer-events-none">
            <div className="text-center px-4">
              <h2 className="text-xl font-bold text-[var(--ink-primary)] md:text-2xl">
                <div className="mb-1 text-[#ffffff]">What's your</div>
                <div className="flex items-baseline justify-center">
                  <RotatingGoalWord />
                </div>
              </h2>
            </div>
          </div>

          {/* Scroll Indicator - persistent, black, lower position */}
          <button
            onClick={scrollToPicker}
            className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group transition-opacity hover:opacity-70"
            aria-label="Scroll to coach selection"
          >
            <p className="text-xs font-medium text-white">Scroll</p>
            <ChevronDown 
              className="h-5 w-5 text-[var(--ink-primary)] motion-safe:animate-[bounce_2s_ease-in-out_infinite]" 
            />
          </button>
        </section>

        {/* 3P Picker - Normal flow after hero */}
        <div className="relative z-20" ref={pickerRef}>
          <ThreePPicker onSelectCoach={handleSelectCoach} />
        </div>

        {/* Chat History Section */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm md:p-8">
              {/* Section Header */}
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-xl font-bold text-[var(--ink-primary)] md:text-2xl">
                  Chat history
                </h2>
                <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
                  Chats are stored locally on your device. Past chats can't be continued, but you can export them anytime.
                </p>
              </div>

              {/* Primary CTA */}
              <Button
                onClick={() => navigate("/history")}
                size="lg"
                className="w-full gap-2 rounded-full bg-[var(--ink-primary)] text-white hover:bg-[var(--ink-secondary)]"
              >
                <History className="h-5 w-5" />
                View Chat History
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        

        {/* Footer */}
        <footer className="border-t border-[var(--border-subtle)] py-8 md:py-12">
          <PWASpecNotes />
          
          <div className="mx-auto mt-8 max-w-4xl px-4 text-center md:px-8">
            <p className="mb-4 text-xs leading-relaxed text-[var(--ink-secondary)]">
              Workplace coaching support only. Not therapy, diagnosis, legal
              advice, or HR instruction. If you're in distress or danger, contact
              local emergency services or professional support.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectCoach("presence")}
                className="text-[var(--accent-presence)]"
              >
                Presence
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectCoach("pride")}
                className="text-[var(--accent-pride)]"
              >
                Pride
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectCoach("power")}
                className="text-[var(--accent-power)]"
              >
                Power
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-[var(--ink-secondary)]"
              >
                <ArrowUp className="mr-1 h-4 w-4" />
                Back to top
              </Button>
            </div>
          </div>

          {/* Pride, Presence & Power Footer Disclaimer */}
          <div className="mx-auto mt-8 max-w-4xl px-4 md:px-8">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-5 md:p-6">
              
              <p className="text-[13px] leading-relaxed text-[var(--ink-secondary)] md:text-[14px]">
                Disclaimer: The system prompts, agent designs, and interaction logic are developed by and proprietary to{" "}
                <a
                  href="https://www.linkedin.com/in/therushivyas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 break-words"
                >
                  Rushi Vyas
                </a>{" "}
                and{" "}
                <a
                  href="https://www.knowwhatson.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 break-words"
                >
                  What's On! Campus Pty Ltd
                </a>
                . The coaching frameworks referenced within the system prompts were sourced and provided by{" "}
                <a
                  href="https://drkelseyburton.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 break-words"
                >
                  Dr. Kelsey Burton
                </a>
                . This tool was developed as part of{" "}
                <a
                  href="https://www.eventbrite.com.au/e/pride-presence-power-human-centred-leadership-in-the-age-of-ai-tickets-1982400654723"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 break-words"
                >
                  UNSW AGSM's "Pride, Presence & Power: Human-Centred Leadership in the Age of AI"
                </a>{" "}
                event. Chatbot outputs are for general workplace learning and reflection only and should be applied with professional judgement; this tool does not provide therapy, diagnosis, legal advice, or HR directives.
              </p>
            </div>
          </div>
        </footer>
      </main>

      <CoachPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelectCoach={handleSelectCoach}
      />
    </div>
  );
}