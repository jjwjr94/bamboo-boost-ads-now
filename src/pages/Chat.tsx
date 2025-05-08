
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Send, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import posthog from "posthog-js";
import { supabase } from "@/integrations/supabase/client";

// Define the Calendly interface to fix TypeScript error
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface Message {
  text?: string;
  type: "assistant" | "action" | "user";
  timestamp: Date;
  showCalendly?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const createConversation = async () => {
    try {
      const userAgent = navigator.userAgent;
      const urlChatId = new URLSearchParams(window.location.search).get('id') || 'main';
      
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert([{ user_agent: userAgent, url_chat_id: urlChatId }])
        .select();
      
      if (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
      
      if (data && data.length > 0) {
        return data[0].id;
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
    return null;
  };
  
  const logMessage = async (message: string, sender: string) => {
    try {
      // Ensure we have a conversation ID
      let convId = conversationId;
      if (!convId) {
        convId = await createConversation();
        setConversationId(convId);
      }
      
      if (!convId) {
        console.error("Failed to create conversation");
        return;
      }
      
      // Update last_message_at in conversation
      await supabase
        .from('chat_conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', convId);
      
      // Insert message
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: convId,
          message: message,
          sender: sender
        }]);
      
      if (error) {
        console.error("Error logging message:", error);
      }
    } catch (error) {
      console.error("Error logging message:", error);
    }
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      text: inputValue,
      type: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Log user message to Supabase
    await logMessage(inputValue, "user");
    
    // Clear input
    setInputValue("");
    
    // Simulate AI response after a delay
    setTimeout(async () => {
      const assistantMessage = {
        text: "Thanks for your message! To get started, please book a kickoff call.",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Log assistant message to Supabase
      await logMessage(assistantMessage.text || "", "assistant");
    }, 1000);
  };

  const openCalendly = () => {
    // Track the "Book Meeting" button click
    posthog.capture('book_meeting_clicked', {
      location: 'chat_page',
      source: 'chat_message'
    });
    
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/jayjeffwong/bamboo-intro'
      });
    }
  };

  useEffect(() => {
    // Set up the initial conversation when component mounts
    const initConversation = async () => {
      const convId = await createConversation();
      setConversationId(convId);
    };
    
    initConversation();
    
    // Display first message immediately
    const initialMessage = {
      text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency.",
      type: "assistant" as const,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    
    // Log initial message
    if (conversationId) {
      logMessage(initialMessage.text || "", "assistant");
    }
    
    // Display second message after 1.5 seconds
    const timer1 = setTimeout(async () => {
      const secondMessage = {
        text: "Congrats! 🎉 You've unlocked one month of Bamboo for free. 🤑",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, secondMessage]);
      
      // Log message
      await logMessage(secondMessage.text || "", "assistant");
    }, 1500);
    
    // Display schedule button message after 3 seconds
    const timer2 = setTimeout(async () => {
      const thirdMessage = {
        text: "Even before entering your credit card, please book a 15-minute intro call. It's really important to me to learn about your business so your first campaign is a success.",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, thirdMessage]);
      
      // Log message
      await logMessage(thirdMessage.text || "", "assistant");
    }, 3000);

    // Display schedule button message after 4.5 seconds
    const timer3 = setTimeout(async () => {
      const buttonMessage = {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, buttonMessage]);
    }, 4500);
    
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
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      // Clean up scripts when component unmounts
      document.head.removeChild(link);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="pt-24 pb-24 px-4 flex-grow overflow-y-auto">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}>
                {message.type === "assistant" ? (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-10 w-10 border">
                          <img src="/lovable-uploads/ee7f1b89-e60e-4121-8fb6-dba324f20c21.png" alt="Bamboo AI" />
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(message.timestamp, "MMM d, h:mm a")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="bg-white p-4 rounded-lg rounded-tl-none max-w-[80%] shadow-sm border border-gray-100">
                      {message.text && <p className="text-bamboo-navy">{message.text}</p>}
                      {message.showCalendly && (
                        <Button 
                          onClick={openCalendly}
                          className="mt-2 bg-bamboo-primary hover:bg-bamboo-secondary text-white"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book a Meeting
                        </Button>
                      )}
                    </div>
                  </>
                ) : message.type === "user" ? (
                  <>
                    <div className="bg-white p-4 rounded-lg rounded-tr-none max-w-[80%] shadow-sm border border-gray-100">
                      <p className="text-bamboo-navy">{message.text}</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-10 w-10 bg-bamboo-secondary text-white flex items-center justify-center">
                          <div className="text-lg font-medium">U</div>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(message.timestamp, "MMM d, h:mm a")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Message input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input 
              placeholder="Ask Bamboo..." 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-bamboo-primary hover:bg-bamboo-secondary text-white"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
