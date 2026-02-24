import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, ChevronDown, ChevronUp, History } from "lucide-react";
import { Button } from "../components/ui/button";
import { sendChatMessage } from "../constants/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { saveSession, type ChatMessage as HistoryMessage, type CoachId } from "../../lib/chatHistory";

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
  const sessionStartTime = useRef<number>(Date.now());
  const hasSavedSession = useRef<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 120); // Cap at ~4 lines
      textarea.style.height = `${newHeight}px`;
    }
  }, [inputValue]);

  // Save session on unmount if user actually chatted
  useEffect(() => {
    return () => {
      // Only save if there are more than 1 message (user sent at least one message)
      // and we haven't already saved this session
      if (messages.length > 1 && !hasSavedSession.current) {
        hasSavedSession.current = true;
        
        // Find first user message for title
        const firstUserMessage = messages.find((m) => m.role === "user");
        const title = firstUserMessage
          ? firstUserMessage.content.slice(0, 48).trim() +
            (firstUserMessage.content.length > 48 ? "..." : "")
          : "Chat";

        // Use session start time as createdAt
        const createdAt = sessionStartTime.current;

        // Convert messages to history format with timestamps
        const historyMessages: HistoryMessage[] = messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          createdAt: parseInt(m.id) || Date.now(),
        }));

        // Create and save session
        const session = {
          id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          coach: type as CoachId,
          title,
          createdAt,
          endedAt: Date.now(),
          messages: historyMessages,
        };

        saveSession(session);
      }
    };
  }, [messages, type]);

  // Check for prefilled message from use case click
  useEffect(() => {
    const prefill = localStorage.getItem("coach_prefill");
    if (prefill) {
      localStorage.removeItem("coach_prefill");
      // Auto-send the prefilled message
      handleSend(prefill);
    }
  }, []); // Run only on mount

  const handleSend = async (text?: string) => {
    const messageText = (text || inputValue).trim();
    if (!messageText) return;

    // 1) Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    // Build the conversation we will send to the API (role mapping)
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");

    try {
      // 2) Call your API
      const replyText = await sendChatMessage({
        coach: type,
        messages: nextMessages.map((m) => ({
          role: m.role === "coach" ? "assistant" : "user",
          content: m.content,
        })),
      });

      // 3) Add coach reply
      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "coach",
        content: replyText,
      };

      const finalMessages = [...nextMessages, coachMessage];
      setMessages(finalMessages);

      // 4) Store on-device (per coach)
      localStorage.setItem(`ppp_${type}_messages`, JSON.stringify(finalMessages));
    } catch (e) {
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

          {/* Message Thread */}
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
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4 md:px-8">
          {/* Quick Replies (show only if no messages sent yet) */}
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

          {/* Input */}
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
                style={{ 
                  "--tw-ring-color": accentColor,
                  maxHeight: "120px",
                } as React.CSSProperties}
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

          {/* Disclaimer */}
          <p className="mt-2 pb-1 text-[12px] text-[var(--ink-tertiary)] md:text-[13px] text-center text-[#656565] font-bold">For learning, not decision-making. Developed by <a
              href="https://www.knowwhatson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--ink-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
            >What's On!</a></p>

          {/* Full Disclaimer */}
          <div className="mt-3 text-[12px] leading-relaxed text-[var(--ink-tertiary)] md:text-[13px]">
            
          </div>
        </div>
      </div>
    </div>
  );
}