
import { useState, useCallback } from "react";
import { Message } from "./chat/types";
import { MessageManager } from "./chat/messageManager";
import { v4 as uuidv4 } from "uuid";

interface UseInternalChatOptions {
  skipIntroCallMessage?: boolean;
}

export const useInternalChat = (options: UseInternalChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Initialize with the first welcome message immediately
    const initialMessages: Message[] = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant",
        timestamp: new Date(),
        id: uuidv4()
      }
    ];
    
    return initialMessages;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [userHasResponded, setUserHasResponded] = useState(false);
  const [messageManager, setMessageManager] = useState<MessageManager | null>(null);
  const [showingOnboardingForm, setShowingOnboardingForm] = useState(false);

  // Initialize the message manager
  useState(() => {
    const manager = new MessageManager(messages, null, userHasResponded);
    setMessageManager(manager);
    
    // Add a small delay to simulate typing
    const timer1 = setTimeout(() => {
      const nextMsg = {
        text: options.skipIntroCallMessage 
          ? "Thanks for sharing! Is there anything else you'd like to tell me about your business?" 
          : "To redeem and get started, let's chat. Just 15-minutes to start on the right foot. It's really important to me to learn about your business so your first campaign is a success.",
        type: "assistant" as const,
        timestamp: new Date(),
        id: uuidv4()
      };
      
      setMessages(prev => [...prev, nextMsg]);
      
      // Add the third message (calendly button) after another small delay
      const timer2 = setTimeout(() => {
        const calendlyMsg = {
          text: "",
          type: "assistant" as const,
          showCalendly: true,
          timestamp: new Date(),
          id: uuidv4()
        };
        
        setMessages(prev => [...prev, calendlyMsg]);
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer2);
    }, 800);
    
    return () => clearTimeout(timer1);
  }, []);
  
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
      timestamp: new Date(),
      id: uuidv4()
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
            timestamp: new Date(),
            id: uuidv4()
          }
        ]);
        
        // Add onboarding form after a short delay
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              type: "onboarding-form",
              timestamp: new Date(),
              id: uuidv4()
            }
          ]);
          setShowingOnboardingForm(true);
        }, 500);
      }, 800);
      return;
    }
    
    // Regular message flow - we can use parts of the message manager logic for consistency
    setTimeout(() => {
      const responseText = options.skipIntroCallMessage ? 
        "Thanks for sharing! Is there anything else you'd like to tell me about your business?" :
        "Thanks for your message! To get started, please book a kickoff call.";
      
      const responseMessage = {
        text: responseText,
        type: "assistant" as const,
        timestamp: new Date(),
        id: uuidv4()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Add calendly button after another short delay
      if (!options.skipIntroCallMessage) {
        setTimeout(() => {
          const calendlyMessage = {
            text: "",
            type: "assistant" as const,
            showCalendly: true,
            timestamp: new Date(),
            id: uuidv4()
          };
          
          setMessages(prev => [...prev, calendlyMessage]);
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
          timestamp: new Date(),
          id: uuidv4()
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
          timestamp: new Date(),
          id: uuidv4()
        },
        {
          type: "onboarding-form",
          timestamp: new Date(),
          id: uuidv4()
        }
      ]);
      setShowingOnboardingForm(true);
    }
  }, [showingOnboardingForm]);
  
  const clearConversation = async () => {
    try {
      // Reset conversation to initial state
      setMessages([
        {
          text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
          type: "assistant",
          timestamp: new Date(),
          id: uuidv4()
        }
      ]);
      setUserHasResponded(false);
      setShowingOnboardingForm(false);
      
      // Create a new message manager
      const manager = new MessageManager([], null, false);
      setMessageManager(manager);
      
      // Add follow-up messages with slight delays
      setTimeout(() => {
        const secondMessage = {
          text: options.skipIntroCallMessage 
            ? "Thanks for sharing! Is there anything else you'd like to tell me about your business?" 
            : "To redeem and get started, let's chat. Just 15-minutes to start on the right foot. It's really important to me to learn about your business so your first campaign is a success.",
          type: "assistant" as const,
          timestamp: new Date(),
          id: uuidv4()
        };
        
        setMessages(prev => [...prev, secondMessage]);
        
        setTimeout(() => {
          const calendlyMessage = {
            text: "",
            type: "assistant" as const,
            showCalendly: true,
            timestamp: new Date(),
            id: uuidv4()
          };
          
          setMessages(prev => [...prev, calendlyMessage]);
        }, 800);
      }, 800);
      
      return true;
    } catch (error) {
      console.error("Failed to clear conversation:", error);
      return false;
    }
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
