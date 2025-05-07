import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";
import { useLocation } from "react-router-dom";

interface Message {
  text: string;
  type: "assistant";
  timestamp: Date;
}

const MeetingConfirmation = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawTime = params.get("event_start_time");
    const parsedDate = rawTime ? parseISO(decodeURIComponent(rawTime)) : null;

    const formatted = parsedDate
      ? format(parsedDate, "MMMM d, yyyy 'at' h:mm a")
      : null;

    const timer = setTimeout(() => {
      const confirmation: Message = {
        text: formatted
          ? `Thanks for booking your meeting on ${formatted}. You'll receive an email shortly in prep for that meeting. Talk soon!`
          : `Thanks for booking your meeting. You'll receive an email shortly. Talk soon!`,
        type: "assistant",
        timestamp: new Date(),
      };

      setMessages([confirmation]);
    }, 500); // Slight delay to simulate AI reply

    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="pt-24 pb-24 px-4 flex-grow overflow-y-auto">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className="flex items-start gap-4 justify-start animate-in fade-in slide-in-from-bottom-3 duration-500"
              >
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
                  <p className="text-bamboo-navy">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingConfirmation;
