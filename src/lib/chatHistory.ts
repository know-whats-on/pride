export type CoachId = "presence" | "pride" | "power";

export interface ChatMessage {
  id: string;
  role: "user" | "coach";
  content: string;
  createdAt: number;
}

export interface ChatSession {
  id: string;
  coach: CoachId;
  title: string;
  createdAt: number;
  endedAt: number;
  messages: ChatMessage[];
}

const STORAGE_KEY = "ppp_chat_sessions_v1";
const MAX_SESSIONS_PER_COACH = 20;

/**
 * Get all chat sessions sorted by newest first
 */
export function getAllSessions(): ChatSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const sessions = JSON.parse(data) as ChatSession[];
    return sessions.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Failed to load chat sessions:", error);
    return [];
  }
}

/**
 * Get sessions for a specific coach
 */
export function getSessionsByCoach(coach: CoachId): ChatSession[] {
  const allSessions = getAllSessions();
  return allSessions.filter((s) => s.coach === coach);
}

/**
 * Save a new session (prepend to list)
 */
export function saveSession(session: ChatSession): void {
  try {
    const allSessions = getAllSessions();
    
    // Add the new session at the beginning
    const updatedSessions = [session, ...allSessions];
    
    // Trim old sessions per coach to prevent bloating
    const sessionsByCoach: Record<CoachId, ChatSession[]> = {
      presence: [],
      pride: [],
      power: [],
    };
    
    // Group by coach
    updatedSessions.forEach((s) => {
      sessionsByCoach[s.coach].push(s);
    });
    
    // Keep only MAX_SESSIONS_PER_COACH for each coach
    const trimmedSessions: ChatSession[] = [];
    Object.keys(sessionsByCoach).forEach((coach) => {
      const coachSessions = sessionsByCoach[coach as CoachId];
      trimmedSessions.push(...coachSessions.slice(0, MAX_SESSIONS_PER_COACH));
    });
    
    // Sort by newest first
    const finalSessions = trimmedSessions.sort((a, b) => b.createdAt - a.createdAt);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalSessions));
  } catch (error) {
    console.error("Failed to save chat session:", error);
  }
}

/**
 * Get a specific session by ID
 */
export function getSession(id: string): ChatSession | null {
  const allSessions = getAllSessions();
  return allSessions.find((s) => s.id === id) || null;
}

/**
 * Delete a specific session
 */
export function deleteSession(id: string): void {
  try {
    const allSessions = getAllSessions();
    const filteredSessions = allSessions.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions));
  } catch (error) {
    console.error("Failed to delete chat session:", error);
  }
}

/**
 * Clear all sessions
 */
export function clearAllSessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear chat sessions:", error);
  }
}

/**
 * Clear sessions for a specific coach
 */
export function clearCoachSessions(coach: CoachId): void {
  try {
    const allSessions = getAllSessions();
    const filteredSessions = allSessions.filter((s) => s.coach !== coach);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions));
  } catch (error) {
    console.error("Failed to clear coach sessions:", error);
  }
}

/**
 * Export a chat session as a text file
 */
export function exportChatToTxt(session: ChatSession): void {
  const coachName = session.coach.charAt(0).toUpperCase() + session.coach.slice(1);
  
  // Format date/time
  const createdDate = new Date(session.createdAt);
  const endedDate = new Date(session.endedAt);
  
  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  // Build content
  let content = `Pride, Presence & Power — Chat Transcript\n`;
  content += `Coach: ${coachName}\n`;
  content += `Created: ${formatDateTime(createdDate)}\n`;
  content += `Ended: ${formatDateTime(endedDate)}\n`;
  content += `Message count: ${session.messages.length}\n`;
  content += `---\n\n`;
  
  // Add messages
  session.messages.forEach((msg) => {
    const time = formatTime(msg.createdAt);
    const label = msg.role === "user" ? "You" : coachName;
    content += `[${time}] ${label}:\n${msg.content}\n\n`;
  });
  
  content += `---\nEnd of chat\n`;
  
  // Create download
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const filename = `PPP_${session.coach}_${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, "0")}-${String(createdDate.getDate()).padStart(2, "0")}_${session.id.slice(0, 8)}.txt`;
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Create sample chat history for testing (DEV ONLY)
 * Call this from browser console: window.createSampleHistory()
 */
export function createSampleHistory(): void {
  // First clear any existing broken data
  clearAllSessions();
  
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

  const samples: ChatSession[] = [
    {
      id: `sample_${Date.now()}_1`,
      coach: "presence",
      title: "Help me speak up without sounding aggressive.",
      createdAt: oneHourAgo,
      endedAt: oneHourAgo + 10 * 60 * 1000,
      messages: [
        {
          id: `${oneHourAgo}`,
          role: "coach",
          content: "Hi there! I'm here to help you find your authentic voice in leadership moments. Let's start with what's on your mind: What situation brings you here today?",
          createdAt: oneHourAgo,
        },
        {
          id: `${oneHourAgo + 1000}`,
          role: "user",
          content: "Help me speak up without sounding aggressive.",
          createdAt: oneHourAgo + 1000,
        },
        {
          id: `${oneHourAgo + 2000}`,
          role: "coach",
          content: "I understand that balancing assertiveness with approachability can feel tricky. Let's work on that together. Can you share a recent example where you felt this tension?",
          createdAt: oneHourAgo + 2000,
        },
      ],
    },
    {
      id: `sample_${Date.now()}_2`,
      coach: "pride",
      title: "I'm carrying the Pride Tax—help me set boundaries.",
      createdAt: oneDayAgo,
      endedAt: oneDayAgo + 15 * 60 * 1000,
      messages: [
        {
          id: `${oneDayAgo}`,
          role: "coach",
          content: "Welcome! I'm here to help you protect your energy while contributing authentically. Let's explore what's happening: What's the situation that brought you here today?",
          createdAt: oneDayAgo,
        },
        {
          id: `${oneDayAgo + 1000}`,
          role: "user",
          content: "I'm carrying the Pride Tax—help me set boundaries.",
          createdAt: oneDayAgo + 1000,
        },
        {
          id: `${oneDayAgo + 2000}`,
          role: "coach",
          content: "That's a real challenge many people face. Setting boundaries while staying true to yourself is important. Can you tell me more about what this looks like in your day-to-day?",
          createdAt: oneDayAgo + 2000,
        },
      ],
    },
  ];

  // Save each sample
  samples.forEach((sample) => {
    saveSession(sample);
  });

  console.log("✅ Sample chat history created with 2 chats! Reload the page to see it.");
}

// Expose to window for testing (DEV ONLY)
if (typeof window !== "undefined") {
  (window as any).createSampleHistory = createSampleHistory;
  (window as any).clearAllSessions = clearAllSessions;
}