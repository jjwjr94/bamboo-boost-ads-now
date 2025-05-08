
import React, { useMemo } from "react";
import Navigation from "../components/Navigation";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { toast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

// Define the Calendly interface to fix TypeScript error
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const Chat = () => {
  const { messages, isLoading, handleSendMessage } = useChat();
  const location = useLocation();
  
  // Deduplicate messages to handle potential issues when returning to the tab
  const uniqueMessages = useMemo(() => {
    // Create a map to store unique messages by their content or timestamp
    const uniqueMap = new Map();
    
    messages.forEach((message) => {
      // Use message text+timestamp as a unique key since id doesn't exist in Message type
      const key = `${message.type}-${message.text || ''}-${message.timestamp.getTime()}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, message);
      }
    });
    
    // Convert the map back to an array and ensure it's sorted by timestamp
    return Array.from(uniqueMap.values())
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }, [messages]);
  
  React.useEffect(() => {
    // Check if this is a return from Calendly
    const params = new URLSearchParams(window.location.search);
    const fromCalendly = params.get('calendly_scheduled') === 'true';
    
    if (fromCalendly) {
      // Clean URL by removing the calendly_scheduled parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('calendly_scheduled');
      window.history.replaceState({}, document.title, url.toString());
      
      // Show a toast notification
      toast({
        title: "Meeting scheduled",
        description: "Your meeting has been scheduled successfully. We'll send you an email confirmation shortly.",
      });
    }
    
    // Load Calendly widget
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up scripts when component unmounts
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="pt-24 pb-24 px-4 flex-grow overflow-y-auto">
        <div className="container mx-auto max-w-3xl">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse bg-gray-200 rounded-lg w-16 h-16 flex items-center justify-center">
                <span className="text-gray-400">...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {uniqueMessages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Message input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto max-w-3xl">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
