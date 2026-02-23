// src/constants/chatApi.ts
import { API_BASE_URL } from "./api";

export type CoachId = "presence" | "pride" | "power";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatApiResponse = {
  reply?: string;         // preferred
  assistant?: string;     // fallback
  message?: string;       // fallback
  error?: string;
};

export async function sendChatMessage(params: {
  coach: CoachId;
  messages: ChatMessage[];
  conversationId?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coach: params.coach,
      conversation_id: params.conversationId ?? null,
      messages: params.messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error (${res.status}): ${text || "Request failed"}`);
  }

  const data = (await res.json()) as ChatApiResponse;

  const reply = data.reply ?? data.assistant ?? data.message;

  if (!reply) {
    throw new Error("API returned no reply text.");
  }

  return reply;
}