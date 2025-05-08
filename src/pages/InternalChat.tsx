
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { useInternalChat } from "@/hooks/useInternalChat";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
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

const InternalChat = () => {
  const location = useLocation();
  // Use the internal chat hook
  const { messages, isLoading, handleSendMessage, clearConversation } = useInternalChat();
  
  useEffect(() => {
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

  const handleRestartChat = async () => {
    const success = await clearConversation();
    if (success) {
      toast({
        title: "Chat restarted",
        description: "All messages have been cleared.",
      });
      // Refresh the page to reset the UI state completely
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: "Failed to restart chat. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="pt-24 pb-24 px-4 flex-grow overflow-y-auto">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-amber-100 p-4 mb-6 rounded-md border border-amber-300 flex justify-between items-center">
            <div>
              <p className="text-amber-700 font-medium">Internal Testing Chat</p>
              <p className="text-amber-600 text-sm">This is a copy of the production chat for testing purposes.</p>
            </div>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-700 hover:bg-amber-200"
              onClick={handleRestartChat}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart Chat
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse bg-gray-200 rounded-lg w-16 h-16 flex items-center justify-center">
                <span className="text-gray-400">...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {messages.map((message, index) => (
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

export default InternalChat;
