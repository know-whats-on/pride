import { useState } from "react";
import { CoachPage } from "../components/CoachPage";
import { CoachPickerSheet } from "../components/CoachPickerSheet";
import { useNavigate } from "react-router";

export function CoachPride() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectCoach = (coach: "presence" | "pride" | "power") => {
    navigate(`/coach/${coach}`);
  };

  return (
    <>
      <CoachPage
        type="pride"
        title="Pride Coach"
        description="Belonging + Boundaries coaching to protect energy and belonging."
        useCases={[
          "Pride Tax: defer extra requests",
          "Respond to intrusive questions",
          "Decide what to disclose",
          "Protect energy + avoid burnout",
          "Handle microaggressions safely",
          "Build belonging on my terms",
        ]}
        takeaways={[
          "A belonging + boundaries snapshot",
          "2 workplace scripts to defer, redirect, reclaim time",
          "One relational move + one boundary move for the quarter",
          "A simple Halt → Pivot → Protect blueprint",
        ]}
        accentColor="var(--accent-pride)"
        imageUrl="https://images.unsplash.com/photo-1629019324504-2e1fdf96e5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaW5jbHVzaXZlJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MTgzOTQ0NXww&ixlib=rb-4.1.0&q=80&w=1080"
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