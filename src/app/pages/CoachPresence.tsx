import { useState } from "react";
import { CoachPage } from "../components/CoachPage";
import { CoachPickerSheet } from "../components/CoachPickerSheet";
import { useNavigate } from "react-router";

export function CoachPresence() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  return (
    <>
      <CoachPage
        type="presence"
        title="Presence Coach"
        description="Voice + Values coaching for clear, authentic leadership."
        useCases={[
          "Speak with confidence in meetings",
          "Set boundaries without backlash",
          "Give clear feedback",
          "Stop masking / over-editing",
          "Handle tense moments calmly",
          "Ask for what you need",
        ]}
        takeaways={[
          "A clearer voice snapshot (what's edited vs authentic)",
          "3 scripts for real moments (meetings, feedback, boundaries)",
          "2 micro-actions for next week (low-risk, high impact)",
          "A Micro-Bravery move matched to your context",
        ]}
        accentColor="var(--accent-presence)"
        imageUrl="https://images.unsplash.com/photo-1652265540589-46f91535337b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBwcmVzZW50YXRpb24lMjBzcGVha2luZ3xlbnwxfHx8fDE3NzE4Mzk0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        onOpenCoachPicker={() => setPickerOpen(true)}
      />
      <CoachPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelectCoach={handleSelectCoach}
      />
    </>
  );
}