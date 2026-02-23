import { useState } from "react";
import { CoachPage } from "../components/CoachPage";
import { CoachPickerSheet } from "../components/CoachPickerSheet";
import { useNavigate } from "react-router";

export function CoachPower() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  return (
    <>
      <CoachPage
        type="power"
        title="Power Coach"
        description="Influence + Impact coaching to create ethical change."
        useCases={[
          "Influence without title",
          "Pitch a change to leaders",
          "Map stakeholders + allies",
          "Shift a team norm",
          "Handle pushback strategically",
          "Turn an idea into a system change",
        ]}
        takeaways={[
          "Your dominant power base + an underused lever",
          "A stakeholder map + first influence move",
          "3 DO / 3 DON'T behaviours for influence",
          "A 3-step plan through quarter end",
        ]}
        accentColor="var(--accent-power)"
        imageUrl="https://images.unsplash.com/photo-1769739576456-0aefcff3f4b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwY29sbGFib3JhdGlvbiUyMHRlYW13b3JrfGVufDF8fHx8MTc3MTgzOTQ0NXww&ixlib=rb-4.1.0&q=80&w=1080"
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