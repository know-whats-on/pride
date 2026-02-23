import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[var(--surface-base)] via-[var(--surface-muted)]/30 to-[var(--surface-base)] px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-[var(--ink-primary)]">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-[var(--ink-primary)]">
          Page not found
        </h2>
        <p className="mb-8 text-[var(--ink-secondary)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2 rounded-full"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="gap-2 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
