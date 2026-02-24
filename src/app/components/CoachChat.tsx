import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, History, Send, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { sendChatMessage } from "../constants/chatApi";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  updateSession,
  type ChatMessage as HistoryMessage,
  type CoachId,
} from "../../lib/chatHistory";

interface Message {
  id: string;
  role: "coach" | "user";
  content: string;
}

interface CoachChatProps {
  type: "presence" | "pride" | "power";
  coachName: string;
  accentColor: string;
  welcomeMessage: string;
  quickReplies: string[];
  onOpenCoachPicker: () => void;
}

/**
 * Enforce:
 * Heading -> on its own line, with extra spacing
 * Body -> each line becomes its own paragraph (blank line after)
 *
 * We convert headings into real markdown headings (###) to guarantee layout.
 */
function formatCoachOutput(text: string) {
  const headingSet = new Set([
    "Your Presence Snapshot (Voice + Values)",
    "Your Pride Leadership Snapshot (Belonging + Boundaries)",
    "Power Profile",
    "Voice Audit",
    "Values Snapshot",
    "Pattern",
    "DO",
    "DON'T",
    "DON’T",
    "TRY NEXT WEEK",
    "Micro-Bravery",
    "AI Disclaimer",
    "Belonging Insight",
    "Boundary Pattern",
    "THIS QUARTER",
    "Boundary Blueprint",
    "Scripts",
    "Impact Map",
    "3-step plan",
    "Reflection",
    "Disclaimer",
    "One Reflective Prompt",
  ]);

  const normalized = text.replace(/\r\n/g, "\n").trim();
  const lines = normalized.split("\n");

  const out: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const isHeading =
      headingSet.has(line) ||
      (line.length <= 42 &&
        /^[A-Z][A-Za-z0-9 &'\/()+–—-]+$/.test(line) &&
        !/^(\d+\.|[-*])\s/.test(line));

    if (isHeading) {
      // Real block heading + blank line above & below
      out.push(`\n### ${line}\n`);
    } else {
      // Every body line becomes its own paragraph
      out.push(`${line}\n`);
    }
  }

  // Keep spacing readable (avoid huge gaps)
  return out.join("\n").replace(/\n{4,}/g, "\n\n\n");
}

export function CoachChat({
  type,
  coachName,
  accentColor,
  welcomeMessage,
  quickReplies,
  onOpenCoachPicker,
}: CoachChatProps) {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "coach",
      content: welcomeMessage,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [safetyExpanded, setSafetyExpanded] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sessionStartTime = useRef<number>(Date.now());
  const sessionId = useRef<string>(
    `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea (cap ~4 lines)
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${newHeight}px`;
  }, [inputValue]);

  // Auto-send a stored prefill (from Use-cases chips)
  useEffect(() => {
    const prefill = localStorage.getItem("coach_prefill");
    if (!prefill) return;
    localStorage.removeItem("coach_prefill");
    handleSend(prefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save/update chat history immediately
  const saveOrUpdateChatHistory = (currentMessages: Message[]) => {
    if (currentMessages.length <= 1) return; // only welcome message

    const firstUserMessage = currentMessages.find((m) => m.role === "user");
    const title = firstUserMessage
      ? firstUserMessage.content.slice(0, 48).trim() +
        (firstUserMessage.content.length > 48 ? "..." : "")
      : "Chat";

    const historyMessages: HistoryMessage[] = currentMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: Number.isFinite(parseInt(m.id, 10))
        ? parseInt(m.id, 10)
        : Date.now(),
    }));

    updateSession({
      id: sessionId.current,
      coach: type as CoachId,
      title,
      createdAt: sessionStartTime.current,
      endedAt: Date.now(),
      messages: historyMessages,
    });
  };

  const handleSend = async (text?: string) => {
    const messageText = (text ?? inputValue).trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");

    try {
      const replyText = await sendChatMessage({
        coach: type,
        messages: nextMessages.map((m) => ({
          role: m.role === "coach" ? "assistant" : "user",
          content: m.content,
        })),
      });

      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "coach",
        content: replyText,
      };

      const finalMessages = [...nextMessages, coachMessage];
      setMessages(finalMessages);

      localStorage.setItem(`ppp_${type}_messages`, JSON.stringify(finalMessages));
      saveOrUpdateChatHistory(finalMessages);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "coach",
        content: "Sorry — I couldn't reach the coach right now. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[var(--surface-base)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-base)]/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/coach/${type}`)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-base font-semibold text-[var(--ink-primary)]">
            {coachName}
          </h1>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/history")}
              className="gap-2"
            >
              <History className="h-4 w-4" />
              <span className="hidden md:inline">History</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCoachPicker}
              className="rounded-full"
            >
              Switch coach
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-8">
          {/* Safety Chip */}
          {safetyExpanded && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="flex-1 text-xs leading-relaxed text-amber-900">
                  <strong>Workplace coaching only.</strong> Avoid names or
                  confidential details.
                </p>
                <button
                  onClick={() => setSafetyExpanded(false)}
                  className="shrink-0 text-amber-700 hover:text-amber-900"
                  aria-label="Dismiss safety notice"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Thread */}
          <div className="space-y-4">
            {messages.map((message) => (
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
                    message.role === "user" ? { backgroundColor: accentColor } : {}
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
                      prose-a:text-[var(--ink-tertiary)]
                      prose-a:underline
                      prose-a:italic
                    "
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.role === "coach"
                        ? formatCoachOutput(message.content)
                        : message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4 md:px-8">
          {/* Quick Replies (only before user sends anything) */}
          {messages.length === 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply)}
                  className="rounded-full border border-[var(--border-subtle)] bg-white px-4 py-2 text-xs text-[var(--ink-secondary)] transition-colors hover:bg-[var(--surface-muted)]"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input + Send */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                className="w-full resize-none overflow-y-auto rounded-3xl border border-[var(--border-subtle)] bg-white px-4 py-3 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-tertiary)] focus:outline-none focus:ring-2"
                style={
                  {
                    "--tw-ring-color": accentColor,
                    maxHeight: "120px",
                  } as React.CSSProperties
                }
              />
            </div>

            <Button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              size="icon"
              className="h-12 w-12 shrink-0 rounded-full text-white"
              style={{ backgroundColor: accentColor }}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>

          {/* Inline disclaimer under composer (grey, links grey + underlined + italic) */}
          <div className="mt-2 pb-1 text-center text-[12px] leading-relaxed text-[var(--ink-tertiary)] md:text-[13px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-[var(--ink-tertiary)] underline italic"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
            >
              {`For learning, not decision-making. Developed by [*What’s On!*](https://www.knowwhatson.com)`}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}