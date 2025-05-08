
import { useState, useEffect, useRef } from "react";

export interface Message {
  text?: string;
  type: "assistant" | "action" | "user";
  timestamp: Date;
  showCalendly?: boolean;
  id?: string;
}

interface UseChatOptions {
  skipIntroCallMessage?: boolean;
}

export const useChat = (options: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasResponded, setUserHasResponded] = useState(false);
  const initialized = useRef(false);
  
  // Helper function to add messages with a delay
  const addMessageWithDelay = (message: Message, delay: number) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setMessages(prev => [...prev, message]);
        resolve();
      }, delay);
    });
  };
  
  const initializeConversation = async () => {
    setIsLoading(true);
    
    // Initial welcome messages - this will always be the same 3 messages sequence
    const initialMessages: Message[] = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant" as const,
        timestamp: new Date()
      }
    ];
    
    // Add follow-up messages based on chat type
    const followUpMessages: Message[] = [];
    
    if (!options.skipIntroCallMessage) {
      followUpMessages.push({
        text: "To redeem and get started, let's chat. Just 15-minutes to start on the right foot. It's really important to me to learn about your business so your first campaign is a success.",
        type: "assistant" as const,
        timestamp: new Date()
      },
      {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date()
      });
    } else {
      followUpMessages.push({
        text: "Thanks for sharing! Is there anything else you'd like to tell me about your business?",
        type: "assistant" as const,
        timestamp: new Date()
      },
      {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date()
      });
    }
    
    // Clear any existing messages and start with the initial welcome message
    setMessages([initialMessages[0]]);
    
    // Add each follow-up message with a delay for a staged appearance
    for (let i = 0; i < followUpMessages.length; i++) {
      await addMessageWithDelay(followUpMessages[i], 1500);
    }
    
    setIsLoading(false);
  };
  
  const handleSendMessage = async (inputValue: string) => {
    // Add user message
    const userMessage = {
      text: inputValue,
      type: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Set user has responded flag
    setUserHasResponded(true);
    
    // Sequence assistant responses with delays
    const responseText = options.skipIntroCallMessage ? 
      "Thanks for sharing! Is there anything else you'd like to tell me about your business?" :
      "Thanks for your message! To get started, please book a kickoff call.";
    
    const assistantMessage = {
      text: responseText,
      type: "assistant" as const,
      timestamp: new Date()
    };
    
    // Add first response after delay
    await addMessageWithDelay(assistantMessage, 1500);
    
    // Add calendar booking option for regular chat or if user asks for more info in internal chat
    if (!options.skipIntroCallMessage) {
      // Add calendar button after another delay
      const buttonMessage = {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date()
      };
      
      await addMessageWithDelay(buttonMessage, 1500);
    }
  };
  
  const clearConversation = async () => {
    // Reset the conversation state
    setMessages([]);
    setUserHasResponded(false);
    
    // Reinitialize conversation with welcome messages
    await initializeConversation();
    
    return true;
  };
  
  // Use a ref to ensure initialization only happens once per component mount
  useEffect(() => {
    // Set up the initial conversation when component mounts
    if (!initialized.current) {
      initialized.current = true;
      initializeConversation();
    }
    
    // Add visibility change listener to refresh messages when tab becomes visible
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && !initialized.current) {
        console.log("Tab became visible, refreshing messages");
        // If not initialized or we've somehow lost state, reinitialize
        initialized.current = true;
        initializeConversation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      initialized.current = false;
    };
  }, []);
  
  return {
    messages,
    isLoading,
    handleSendMessage,
    clearConversation
  };
};
