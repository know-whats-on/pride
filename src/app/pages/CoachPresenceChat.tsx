import { useState } from "react";
import { useNavigate } from "react-router";
import { CoachChat } from "../components/CoachChat";
import { CoachPickerSheet } from "../components/CoachPickerSheet";

export function CoachPresenceChat() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  return (
    <>
      <CoachChat
        type="presence"
        coachName="Presence Coach"
        accentColor="var(--accent-presence)"
        welcomeMessage="Hi there! I'm here to help you find your authentic voice in leadership moments. Let's start with what's on your mind: What situation brings you here today?"
        quickReplies={[
          "Help me speak up without sounding aggressive.",
          "I'm over-explaining in meetings—help me be concise.",
          "Give me a script for feedback that matches my values.",
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