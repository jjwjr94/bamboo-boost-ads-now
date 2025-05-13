
import { useState } from "react";

export interface Message {
  text?: string;
  type: "assistant" | "user" | "onboardingForm";
  timestamp: Date;
  showCalendly?: boolean;
}

interface UseChatOptions {
  skipIntroCallMessage?: boolean;
}

export const useChat = (options: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Initialize with the first welcome message immediately
    const initialMessages: Message[] = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant",
        timestamp: new Date()
      }
    ];
    
    return initialMessages;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [userHasResponded, setUserHasResponded] = useState(false);
  
  // Load the follow-up messages immediately after component mounts
  useState(() => {
    // Add a small delay to simulate typing
    const timer1 = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: options.skipIntroCallMessage 
            ? "Thanks for sharing! Is there anything else you'd like to tell me about your business?" 
            : "To redeem and get started, please fill out this form.",
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      
      // Add the onboarding form message after another small delay
      const timer3 = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: "",
            type: "onboardingForm",
            timestamp: new Date()
          }
        ]);
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer3);
    }, 800);
    
    return () => clearTimeout(timer1);
  });
  
  const handleSendMessage = (inputValue: string) => {
    // Add user message immediately
    const userMessage = {
      text: inputValue,
      type: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserHasResponded(true);
    
    // Add assistant response after a short delay
    setTimeout(() => {
      const responseText = options.skipIntroCallMessage ? 
        "Thanks for sharing! Is there anything else you'd like to tell me about your business?" :
        "Thanks for your message! Is there anything else you'd like to tell me about your business?";
      
      setMessages(prev => [
        ...prev,
        {
          text: responseText,
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      
      // Add onboarding form after a delay if not already shown and we're not skipping intro message
      if (!options.skipIntroCallMessage) {
        setTimeout(() => {
          // Check if onboarding form already exists
          const hasOnboardingForm = messages.some(m => m.type === "onboardingForm");
          
          if (!hasOnboardingForm) {
            setMessages(prev => [
              ...prev,
              {
                text: "",
                type: "onboardingForm",
                timestamp: new Date()
              }
            ]);
          }
        }, 800);
      }
    }, 800);
  };
  
  const clearConversation = () => {
    // Reset conversation to initial state
    setMessages([
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant",
        timestamp: new Date()
      }
    ]);
    setUserHasResponded(false);
    
    // Add follow-up messages with slight delays
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: options.skipIntroCallMessage 
            ? "Thanks for sharing! Is there anything else you'd like to tell me about your business?" 
            : "To redeem and get started, please fill out this form.",
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      
      // Add onboarding form after a delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: "",
            type: "onboardingForm",
            timestamp: new Date()
          }
        ]);
      }, 800);
    }, 800);
    
    return true;
  };
  
  return {
    messages,
    isLoading,
    handleSendMessage,
    clearConversation
  };
};
