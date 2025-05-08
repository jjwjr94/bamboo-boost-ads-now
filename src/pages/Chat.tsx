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
import { v4 as uuidv4 } from "uuid";

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
  id?: string; // Optional ID from database
  isLogged?: boolean; // Flag to indicate if message has been logged to database
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasResponded, setUserHasResponded] = useState(false);
  
  // Generate or retrieve device ID
  const getDeviceId = () => {
    const storedId = localStorage.getItem('bamboo_device_id');
    if (storedId) {
      return storedId;
    } else {
      const newId = uuidv4();
      localStorage.setItem('bamboo_device_id', newId);
      return newId;
    }
  };
  
  const findOrCreateConversation = async () => {
    try {
      setIsLoading(true);
      const deviceId = getDeviceId();
      const urlChatId = new URLSearchParams(window.location.search).get('id') || 'main';
      
      // Try to find existing conversation for this device + url chat ID
      const { data: existingConversations, error: fetchError } = await supabase
        .from('chat_conversations')
        .select('id, last_message_at')
        .eq('user_agent', deviceId)
        .eq('conversation_id', urlChatId) // Updated from url_chat_id to conversation_id
        .order('last_message_at', { ascending: false })
        .limit(1);
      
      if (fetchError) {
        console.error("Error fetching conversations:", fetchError);
      }
      
      // If conversation exists, use it
      if (existingConversations && existingConversations.length > 0) {
        const existingId = existingConversations[0].id;
        setConversationId(existingId);
        await loadMessagesForConversation(existingId);
        return existingId;
      }
      
      // Otherwise create a new conversation
      const userAgent = deviceId;
      
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert([{ user_agent: userAgent, conversation_id: urlChatId }]) // Updated from url_chat_id to conversation_id
        .select();
      
      if (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
      
      if (data && data.length > 0) {
        setConversationId(data[0].id);
        return data[0].id;
      }
    } catch (error) {
      console.error("Error finding/creating conversation:", error);
    } finally {
      setIsLoading(false);
    }
    return null;
  };
  
  const loadMessagesForConversation = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('timestamp', { ascending: true });
      
      if (error) {
        console.error("Error loading messages:", error);
        initializeConversation();
        return;
      }
      
      if (data && data.length > 0) {
        // User has previously responded if there's at least one user message
        const hasUserMessage = data.some(msg => msg.sender === 'user');
        setUserHasResponded(hasUserMessage);
        
        // Convert database messages to UI messages
        const loadedMessages: Message[] = data.map(msg => ({
          text: msg.message,
          type: msg.sender as "assistant" | "user",
          timestamp: new Date(msg.timestamp || new Date()),
          showCalendly: msg.message.includes('book a kickoff call'),
          id: msg.id,
          isLogged: true // Mark as already logged in database
        }));
        
        // Always show the initial conversation messages first
        initializeConversation(loadedMessages);
      } else {
        // If no messages, start with initial greeting
        initializeConversation();
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      // Fall back to initial conversation
      initializeConversation();
    }
  };
  
  const logMessage = async (message: string, sender: string) => {
    try {
      // Ensure we have a conversation ID
      let convId = conversationId;
      if (!convId) {
        convId = await findOrCreateConversation();
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
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: convId,
          message: message,
          sender: sender
        }])
        .select();
      
      if (error) {
        console.error("Error logging message:", error);
        return null;
      }
      
      return data && data.length > 0 ? data[0].id : null;
    } catch (error) {
      console.error("Error logging message:", error);
      return null;
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
    
    // Set user has responded flag
    setUserHasResponded(true);
    
    // Now log messages to database since user has responded
    // First log the user message
    const userMessageId = await logMessage(inputValue, "user");
    
    // Then log any assistant messages that haven't been logged yet
    const unloggedMessages = messages.filter(m => !m.isLogged && m.type === "assistant" && m.text);
    for (const msg of unloggedMessages) {
      if (msg.text) {
        await logMessage(msg.text, "assistant");
      }
    }
    
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
      
      // Log assistant message to Supabase since user has responded
      const assistantMessageId = await logMessage(assistantMessage.text || "", "assistant");
      
      // Add calendar booking option
      setTimeout(async () => {
        const buttonMessage = {
          text: "",
          type: "assistant" as const,
          showCalendly: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, buttonMessage]);
      }, 1000);
      
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
  
  const initializeConversation = (existingMessages: Message[] = []) => {
    // Initial welcome messages
    const initialMessages = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency.",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded // Only mark as logged if user has already responded
      },
      {
        text: "Congrats! 🎉 You've unlocked one month of Bamboo for free. 🤑",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded // Only mark as logged if user has already responded
      },
      {
        text: "Even before entering your credit card, please book a 15-minute intro call. It's really important to me to learn about your business so your first campaign is a success.",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded // Only mark as logged if user has already responded
      },
      {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date(),
        isLogged: userHasResponded // Only mark as logged if user has already responded
      }
    ];
    
    // Always start with the initial welcome messages, then add existing messages if any
    if (existingMessages.length > 0) {
      // Filter out any welcome messages from the database to avoid duplicates
      const nonWelcomeMessages = existingMessages.filter(msg => {
        return !(
          msg.type === "assistant" && 
          (
            msg.text?.includes("Hey! I'm Jay") ||
            msg.text?.includes("Congrats! 🎉") ||
            msg.text?.includes("book a 15-minute intro call")
          )
        );
      });
      
      // Combine initial messages with filtered existing messages
      setMessages([...initialMessages, ...nonWelcomeMessages]);
    } else {
      // If no existing messages, just use the initial ones
      setMessages(initialMessages);
      
      // Log initial messages to database if the user has already responded in a previous session
      if (userHasResponded && conversationId) {
        initialMessages.forEach(async (message) => {
          if (message.text) {
            await logMessage(message.text, "assistant");
          }
        });
      }
    }
  };

  useEffect(() => {
    // Set up the initial conversation when component mounts
    findOrCreateConversation();
    
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse bg-gray-200 rounded-lg w-16 h-16 flex items-center justify-center">
                <span className="text-gray-400">...</span>
              </div>
            </div>
          ) : (
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
          )}
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
