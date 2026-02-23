import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Trash2, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
import { CoachPickerSheet } from "../components/CoachPickerSheet";
import {
  getSessionsByCoach,
  clearCoachSessions,
  exportChatToTxt,
  type CoachId,
  type ChatSession,
} from "../../lib/chatHistory";

// Coach metadata
const coachData: Record<CoachId, { name: string; color: string }> = {
  presence: { name: "Presence", color: "var(--accent-presence)" },
  pride: { name: "Pride", color: "var(--accent-pride)" },
  power: { name: "Power", color: "var(--accent-power)" },
};

export function CoachHistory() {
  const navigate = useNavigate();
  const { coach } = useParams<{ coach: CoachId }>();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Validate coach parameter
  useEffect(() => {
    if (!coach || !coachData[coach]) {
      navigate("/");
    }
  }, [coach, navigate]);

  // Early return if invalid coach (but don't navigate during render)
  if (!coach || !coachData[coach]) {
    return null;
  }

  const sessions = getSessionsByCoach(coach);
  const { name: coachName, color: accentColor } = coachData[coach];

  const handleSelectCoach = (selectedCoach: CoachId) => {
    navigate(`/coach/${selectedCoach}`);
  };

  const handleClearHistory = () => {
    clearCoachSessions(coach);
    setShowConfirmClear(false);
    // Force re-render by navigating to self
    navigate(`/coach/${coach}/history`, { replace: true });
    window.location.reload();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-AU", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <Header
        onOpenCoachPicker={() => setPickerOpen(true)}
        showSecondaryNav={false}
      />

      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/coach/${coach}`)}
              className="mb-2 gap-2 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {coachName}
            </Button>
            <h1 className="text-2xl font-bold text-[var(--ink-primary)] md:text-3xl">
              Chat history
            </h1>
            <p className="mt-1 text-sm text-[var(--ink-secondary)]">
              Saved on this device only
            </p>
          </div>
          {sessions.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmClear(true)}
              className="text-[var(--feedback-danger)]"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: accentColor, opacity: 0.1 }}
            >
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-[var(--ink-primary)]">
              No saved chats yet
            </h2>
            <p className="mb-6 text-sm text-[var(--ink-secondary)]">
              Your chats will be saved here automatically
            </p>
            <Button
              onClick={() => navigate(`/coach/${coach}/chat`)}
              style={{ backgroundColor: accentColor }}
              className="text-white"
            >
              Start New Chat
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => navigate(`/coach/${coach}/history/${session.id}`)}
                className="flex w-full items-start gap-4 rounded-xl border border-[var(--border-subtle)] bg-white p-4 text-left transition-all hover:border-[var(--border)] hover:shadow-sm active:scale-[0.98]"
              >
                <div
                  className="mt-1 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 truncate font-semibold text-[var(--ink-primary)]">
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--ink-secondary)]">
                    <span>{formatDate(session.createdAt)}</span>
                    <span>•</span>
                    <span>{session.messages.length} messages</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Export latest (optional) */}
        {sessions.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportChatToTxt(sessions[0])}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export latest chat
            </Button>
          </div>
        )}
      </main>

      {/* Confirm Clear Dialog */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-bold text-[var(--ink-primary)]">
              Clear all history?
            </h2>
            <p className="mb-6 text-sm text-[var(--ink-secondary)]">
              This will permanently delete all saved {coachName} chats from this
              device. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmClear(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClearHistory}
                className="flex-1 bg-[var(--feedback-danger)] text-white hover:bg-[var(--feedback-danger)]/90"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      <CoachPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelectCoach={handleSelectCoach}
      />
    </div>
  );
}