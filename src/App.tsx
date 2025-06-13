import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import Chat from "./pages/Chat";
import Chat2 from "./pages/Chat2";
import InternalChat from "./pages/InternalChat";
import Feedback from "./pages/Feedback";
import Onboarding from "./pages/Onboarding";
import MeetingConfirmation from "./pages/MeetingConfirmation";
import OAuth2Callback from "./pages/OAuth2Callback";
import FacebookCallback from "./pages/FacebookCallback";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat2" element={<Chat2 />} />
          <Route path="/internal-chat" element={<InternalChat />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/meeting-confirmation" element={<MeetingConfirmation />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          <Route path="/auth/facebook/callback" element={<FacebookCallback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
