import { useState } from "react";
import { useNavigate } from "react-router";
import { CoachChat } from "../components/CoachChat";
import { CoachPickerSheet } from "../components/CoachPickerSheet";

export function CoachPrideChat() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  return (
    <>
      <CoachChat
        type="pride"
        coachName="Pride Coach"
        accentColor="var(--accent-pride)"
        welcomeMessage="Welcome! I'm here to help you protect your energy while contributing authentically. Let's explore what's happening: What's the situation that brought you here today?"
        quickReplies={[
          "I'm carrying the Pride Tax—help me set boundaries.",
          "How do I respond to identity questions at work?",
          "I want belonging without over-sharing—help me decide.",
        ]}
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