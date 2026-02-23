import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Download, Trash2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  getSession,
  deleteSession,
  exportChatToTxt,
  type CoachId,
} from "../../lib/chatHistory";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Coach metadata
const coachData: Record<CoachId, { name: string; color: string }> = {
  presence: { name: "Presence", color: "var(--accent-presence)" },
  pride: { name: "Pride", color: "var(--accent-pride)" },
  power: { name: "Power", color: "var(--accent-power)" },
};

export function ChatTranscript() {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Extract coach from pathname (e.g., /coach/presence/history/123 -> presence)
  const pathname = window.location.pathname;
  const coachMatch = pathname.match(/\/coach\/(presence|pride|power)\//);
  const coach = coachMatch ? (coachMatch[1] as CoachId) : null;

  // Validate parameters and session
  useEffect(() => {
    if (!coach || !sessionId || !coachData[coach]) {
      navigate("/history");
      return;
    }

    const session = getSession(sessionId);
    if (!session) {
      navigate("/history");
    }
  }, [coach, sessionId, navigate]);

  // Early return if invalid (but don't navigate during render)
  if (!coach || !sessionId || !coachData[coach]) {
    return null;
  }

  const session = getSession(sessionId);

  if (!session) {
    return null;
  }

  const { name: coachName, color: accentColor } = coachData[coach];

  const handleDelete = () => {
    deleteSession(sessionId);
    navigate("/history");
  };

  const handleStartNewChat = () => {
    navigate(`/coach/${coach}/chat`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-base)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-base)]/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/history")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            History
          </Button>
          <h1 className="truncate text-base font-semibold text-[var(--ink-primary)] max-w-[200px] md:max-w-none">
            {session.title}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportChatToTxt(session)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Export</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmDelete(true)}
              className="text-[var(--feedback-danger)]"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Ended Banner */}
      <div
        className="border-b border-[var(--border-subtle)] bg-gradient-to-r from-amber-50 to-orange-50"
        role="region"
        aria-label="Chat status notice"
      >
        <div className="mx-auto max-w-3xl px-4 py-4 md:px-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h2 className="mb-1 font-semibold text-[var(--ink-primary)]">
                This chat has ended
              </h2>
              <p className="mb-3 text-sm text-[var(--ink-secondary)]">
                Chats can't be continued. You can export this transcript or start a new chat.
              </p>
              <Button
                onClick={handleStartNewChat}
                size="sm"
                style={{ backgroundColor: accentColor }}
                className="text-white"
              >
                Start New Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-8">
          {/* Metadata */}
          <div className="mb-6 rounded-xl border border-[var(--border-subtle)] bg-white p-4">
            <div className="flex items-center justify-between text-xs text-[var(--ink-secondary)]">
              <div>
                <span className="font-semibold">Coach:</span> {coachName}
              </div>
              <div>
                <span className="font-semibold">Messages:</span> {session.messages.length}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-[var(--ink-secondary)]">
              <div>
                {new Date(session.createdAt).toLocaleDateString("en-AU", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Message Thread */}
          <div className="space-y-4">
            {session.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "text-white"
                      : "border border-[var(--border-subtle)] bg-white text-[var(--ink-primary)]"
                  }`}
                  style={
                    message.role === "user"
                      ? { backgroundColor: accentColor }
                      : {}
                  }
                >
                  <div
                    className="
                      prose prose-sm max-w-none
                      prose-headings:mt-3 prose-headings:mb-2
                      prose-p:my-2
                      prose-ul:my-2 prose-ul:pl-5
                      prose-ol:my-2 prose-ol:pl-5
                      prose-li:my-1
                      prose-hr:my-4
                      prose-strong:text-inherit
                    "
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content
                        // ensure a blank line before markdown headings like ### Title
                        .replace(/\n(?=#{1,6}\s)/g, "\n\n\n")
                        // ensure a blank line before bold "heading" lines like **Power Profile**
                        .replace(/\n(?=\*\*[^*\n]{2,60}\*\*\s*$)/gm, "\n\n\n")
                      }
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End of chat footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[var(--ink-secondary)]">End of chat</p>
          </div>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-bold text-[var(--ink-primary)]">
              Delete this chat?
            </h2>
            <p className="mb-6 text-sm text-[var(--ink-secondary)]">
              This will permanently delete this chat transcript from this device.
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 bg-[var(--feedback-danger)] text-white hover:bg-[var(--feedback-danger)]/90"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}