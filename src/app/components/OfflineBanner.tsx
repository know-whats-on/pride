import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="sticky top-16 z-40 border-b border-[var(--feedback-warning)]/20 bg-amber-50 px-4 py-3">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm text-[var(--feedback-warning)]">
        <WifiOff className="h-4 w-4 shrink-0" />
        <span>Offline mode: You can still read prompts and templates.</span>
      </div>
    </div>
  );
}
