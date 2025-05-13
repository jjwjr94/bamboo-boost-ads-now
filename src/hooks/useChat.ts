
import { useState, useCallback } from "react";

export interface Message {
  text?: string;
  type: "assistant" | "user" | "onboarding-form";
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
  const [showingOnboardingForm, setShowingOnboardingForm] = useState(false);
  
  // Load the follow-up messages immediately after component mounts
  useState(() => {
    // Add a small delay to simulate typing
    const timer1 = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: options.skipIntroCallMessage 
            ? "Thanks for sharing! Is there anything else you'd like to tell me about your business?" 
            : "To redeem and get started, let's chat. Just 15-minutes to start on the right foot. It's really important to me to learn about your business so your first campaign is a success.",
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      
      // Add the third message (calendly button) after another small delay
      const timer2 = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: "",
            type: "assistant",
            showCalendly: true,
            timestamp: new Date()
          }
        ]);
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer2);
    }, 800);
    
    return () => clearTimeout(timer1);
  });
  
  const handleSendMessage = (inputValue: string) => {
    // Check for onboarding trigger words
    const onboardingTriggers = ['onboarding', 'sign up', 'register', 'signup', 'onboard'];
    const shouldShowOnboardingForm = onboardingTriggers.some(trigger => 
      inputValue.toLowerCase().includes(trigger)
    );
    
    // Add user message immediately
    const userMessage = {
      text: inputValue,
      type: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserHasResponded(true);
    
    // If trigger word detected, show onboarding form
    if (shouldShowOnboardingForm && !showingOnboardingForm) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: "Great! Let's get you onboarded with Bamboo AI. Please fill out this quick form:",
            type: "assistant",
            timestamp: new Date()
          }
        ]);
        
        // Add onboarding form after a short delay
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              type: "onboarding-form",
              timestamp: new Date()
            }
          ]);
          setShowingOnboardingForm(true);
        }, 500);
      }, 800);
      return;
    }
    
    // Regular message flow
    setTimeout(() => {
      const responseText = options.skipIntroCallMessage ? 
        "Thanks for sharing! Is there anything else you'd like to tell me about your business?" :
        "Thanks for your message! To get started, please book a kickoff call.";
      
      setMessages(prev => [
        ...prev,
        {
          text: responseText,
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      
      // Add calendly button after another short delay
      if (!options.skipIntroCallMessage) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              text: "",
              type: "assistant",
              showCalendly: true,
              timestamp: new Date()
            }
          ]);
        }, 800);
      }
    }, 800);
  };
  
  // Function to handle successful form submission
  const handleFormSubmitSuccess = useCallback(() => {
    // Add a follow-up message after form submission
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "Thank you for completing the onboarding form! Our team will review your information and get back to you soon. In the meantime, feel free to ask any questions about our services.",
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      setShowingOnboardingForm(false);
    }, 1000);
  }, []);
  
  // Function to manually trigger showing the onboarding form
  const showOnboardingForm = useCallback(() => {
    if (!showingOnboardingForm) {
      setMessages(prev => [
        ...prev,
        {
          text: "Here's our onboarding form. Please fill it out to get started with Bamboo AI:",
          type: "assistant",
          timestamp: new Date()
        },
        {
          type: "onboarding-form",
          timestamp: new Date()
        }
      ]);
      setShowingOnboardingForm(true);
    }
  }, [showingOnboardingForm]);
  
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
    setShowingOnboardingForm(false);
    
    // Add follow-up messages with slight delays
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: options.skipIntroCallMessage 
            ? "Thanks for sharing! Is there anything else you'd like to tell me about your business?" 
            : "To redeem and get started, let's chat. Just 15-minutes to start on the right foot. It's really important to me to learn about your business so your first campaign is a success.",
          type: "assistant",
          timestamp: new Date()
        }
      ]);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: "",
            type: "assistant",
            showCalendly: true,
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
    clearConversation,
    showOnboardingForm,
    handleFormSubmitSuccess
  };
};
