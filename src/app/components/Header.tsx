import { Button } from "./ui/button";

interface HeaderProps {
  onOpenCoachPicker: () => void;
  showSecondaryNav?: boolean;
}

export function Header({ onOpenCoachPicker, showSecondaryNav = false }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur supports-[backdrop-filter]:bg-[var(--surface-base)]/60">
      <div className="container mx-auto px-4 md:px-8">
        
        
        {/* Secondary nav row with jump links */}
        {showSecondaryNav && (
          null
        )}
      </div>
    </header>
  );
}