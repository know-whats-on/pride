import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
import { CoachPickerSheet } from "../components/CoachPickerSheet";
import {
  getAllSessions,
  clearAllSessions,
  type CoachId,
} from "../../lib/chatHistory";

// Coach metadata
const coachData: Record<CoachId, { name: string; color: string }> = {
  presence: { name: "Presence", color: "var(--accent-presence)" },
  pride: { name: "Pride", color: "var(--accent-pride)" },
  power: { name: "Power", color: "var(--accent-power)" },
};

export function AllHistory() {
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [activeTab, setActiveTab] = useState<CoachId | "all">("all");
  const [sessions, setSessions] = useState(() => getAllSessions());

  const allSessions = sessions;
  const presenceSessions = sessions.filter((s) => s.coach === "presence");
  const prideSessions = sessions.filter((s) => s.coach === "pride");
  const powerSessions = sessions.filter((s) => s.coach === "power");

  const handleSelectCoach = (coach: CoachId) => {
    navigate(`/coach/${coach}`);
  };

  const handleClearHistory = () => {
    clearAllSessions();
    setSessions([]);
    setShowConfirmClear(false);
  };

  const formatDate = (timestamp: number) => {
    // Handle missing or invalid timestamp
    if (!timestamp || timestamp <= 0) {
      return "Unknown date";
    }
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const renderSessionList = (sessions: typeof allSessions, coach: CoachId) => {
    if (sessions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: coachData[coach].color, opacity: 0.1 }}
          >
            <div
              className="h-8 w-8 rounded-full"
              style={{ backgroundColor: coachData[coach].color }}
            ></div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[var(--ink-primary)]">
            No {coachData[coach].name} chats yet
          </h3>
          <p className="mb-4 text-sm text-[var(--ink-secondary)]">
            Start chatting to see your history here
          </p>
          <Button
            onClick={() => navigate(`/coach/${coach}/chat`)}
            style={{ backgroundColor: coachData[coach].color }}
            className="text-white"
          >
            Start New Chat
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() =>
              navigate(`/coach/${session.coach}/history/${session.id}`)
            }
            className="flex w-full items-start gap-4 rounded-xl border border-[var(--border-subtle)] bg-white p-4 text-left transition-all hover:border-[var(--border)] hover:shadow-sm active:scale-[0.98]"
          >
            <div
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: coachData[session.coach].color }}
            ></div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: coachData[session.coach].color }}
                >
                  {coachData[session.coach].name}
                </span>
              </div>
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
    );
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
              onClick={() => navigate("/")}
              className="mb-2 gap-2 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
            <h1 className="text-2xl font-bold text-[var(--ink-primary)] md:text-3xl">
              Chat history
            </h1>
            <p className="mt-1 text-sm text-[var(--ink-secondary)]">
              All your saved chats across all coaches
            </p>
          </div>
          {allSessions.length > 0 && (
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

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-[var(--ink-primary)] text-white"
                : "border border-[var(--border-subtle)] bg-white text-[var(--ink-secondary)] hover:bg-[var(--surface-muted)]"
            }`}
          >
            All chats
          </button>
          <button
            onClick={() => setActiveTab("presence")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "presence"
                ? "text-white"
                : "border border-[var(--border-subtle)] bg-white hover:bg-[var(--accent-presence)]/10"
            }`}
            style={
              activeTab === "presence"
                ? { backgroundColor: coachData.presence.color }
                : { color: coachData.presence.color }
            }
          >
            Presence
          </button>
          <button
            onClick={() => setActiveTab("pride")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "pride"
                ? "text-white"
                : "border border-[var(--border-subtle)] bg-white hover:bg-[var(--accent-pride)]/10"
            }`}
            style={
              activeTab === "pride"
                ? { backgroundColor: coachData.pride.color }
                : { color: coachData.pride.color }
            }
          >
            Pride
          </button>
          <button
            onClick={() => setActiveTab("power")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "power"
                ? "text-white"
                : "border border-[var(--border-subtle)] bg-white hover:bg-[var(--accent-power)]/10"
            }`}
            style={
              activeTab === "power"
                ? { backgroundColor: coachData.power.color }
                : { color: coachData.power.color }
            }
          >
            Power
          </button>
        </div>

        {/* Session List */}
        {activeTab === "all" && (
          <>
            {allSessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-muted)]">
                  <div className="h-8 w-8 rounded-full bg-[var(--ink-primary)]"></div>
                </div>
                <h2 className="mb-2 text-lg font-semibold text-[var(--ink-primary)]">
                  No saved chats yet
                </h2>
                <p className="mb-6 text-sm text-[var(--ink-secondary)]">
                  Your chats will be saved here automatically.
                </p>
                <Button
                  onClick={() => setPickerOpen(true)}
                  className="bg-[var(--ink-primary)] text-white"
                >
                  Choose a Coach
                </Button>
              </div>
            ) : (
              renderSessionList(allSessions, "presence")
            )}
          </>
        )}
        {activeTab === "presence" && renderSessionList(presenceSessions, "presence")}
        {activeTab === "pride" && renderSessionList(prideSessions, "pride")}
        {activeTab === "power" && renderSessionList(powerSessions, "power")}
      </main>

      {/* Confirm Clear Dialog */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-bold text-[var(--ink-primary)]">
              Clear all history?
            </h2>
            <p className="mb-6 text-sm text-[var(--ink-secondary)]">
              This will permanently delete all saved chats from all coaches on
              this device. This cannot be undone.
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
                Clear All
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