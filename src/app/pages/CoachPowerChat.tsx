import { useState } from "react";
import { useNavigate } from "react-router";
import { CoachChat } from "../components/CoachChat";
import { CoachPickerSheet } from "../components/CoachPickerSheet";

export function CoachPowerChat() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  return (
    <>
      <CoachChat
        type="power"
        coachName="Power Coach"
        accentColor="var(--accent-power)"
        welcomeMessage="Hello! I'm here to help you create meaningful, ethical change. Let's map your path to impact. What's the change you want to create, and what's your current role or position?"
        quickReplies={[
          "Help me influence without authority.",
          "I want to shift a team norm—where do I start?",
          "Map stakeholders and give me a first move.",
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