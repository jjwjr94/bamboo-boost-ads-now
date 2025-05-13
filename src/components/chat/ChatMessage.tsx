
import React from "react";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import OnboardingFormMessage from "./OnboardingFormMessage";
import posthog from "posthog-js";

export interface Message {
  text?: string;
  type: "assistant" | "action" | "user" | "onboardingForm";
  timestamp: Date;
  showCalendly?: boolean;
  id?: string;
  isLogged?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const openCalendly = () => {
    // Track the "Book Meeting" button click
    posthog.capture('book_meeting_clicked', {
      location: 'chat_page',
      source: 'chat_message'
    });
    
    // Get the current URL to use as return URL
    const returnUrl = encodeURIComponent(window.location.href);
    
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: `https://calendly.com/jayjeffwong/bamboo-intro?hide_gdpr_banner=1&return_url=${returnUrl}`
      });
    }
  };

  // For onboarding form message type
  if (message.type === "onboardingForm") {
    return (
      <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 justify-start">
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
        
        <OnboardingFormMessage />
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 ${
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
  );
};

export default ChatMessage;
