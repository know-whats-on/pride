import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { CoachPresence } from "./pages/CoachPresence";
import { CoachPride } from "./pages/CoachPride";
import { CoachPower } from "./pages/CoachPower";
import { CoachPresenceChat } from "./pages/CoachPresenceChat";
import { CoachPrideChat } from "./pages/CoachPrideChat";
import { CoachPowerChat } from "./pages/CoachPowerChat";
import { CoachHistory } from "./pages/CoachHistory";
import { ChatTranscript } from "./pages/ChatTranscript";
import { AllHistory } from "./pages/AllHistory";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/history",
    Component: AllHistory,
  },
  {
    path: "/coach/presence",
    Component: CoachPresence,
  },
  {
    path: "/coach/presence/chat",
    Component: CoachPresenceChat,
  },
  {
    path: "/coach/presence/history",
    Component: CoachHistory,
  },
  {
    path: "/coach/presence/history/:sessionId",
    Component: ChatTranscript,
  },
  {
    path: "/coach/pride",
    Component: CoachPride,
  },
  {
    path: "/coach/pride/chat",
    Component: CoachPrideChat,
  },
  {
    path: "/coach/pride/history",
    Component: CoachHistory,
  },
  {
    path: "/coach/pride/history/:sessionId",
    Component: ChatTranscript,
  },
  {
    path: "/coach/power",
    Component: CoachPower,
  },
  {
    path: "/coach/power/chat",
    Component: CoachPowerChat,
  },
  {
    path: "/coach/power/history",
    Component: CoachHistory,
  },
  {
    path: "/coach/power/history/:sessionId",
    Component: ChatTranscript,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);