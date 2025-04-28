
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Send, MessageSquare, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ 
    text: string; 
    type: "assistant" | "action" | "user"; 
    timestamp: Date;
    showCalendly?: boolean;
  }>>([]);
  const [inputValue, setInputValue] = useState("");
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { 
      text: inputValue, 
      type: "user",
      timestamp: new Date()
    }]);
    
    // Clear input
    setInputValue("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! To help you better, please book a kickoff call.", 
        type: "assistant",
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/jayjeffwong/bamboo-intro'
      });
    }
  };

  useEffect(() => {
    // Display first message immediately
    setMessages([{ 
      text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency.", 
      type: "assistant",
      timestamp: new Date() 
    }]);
    
    // Display second message after 1.5 seconds
    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "It's really important to me to learn about your business to ensure your ad campaign is a success. Please book a 30-minute kickoff meeting to get started.", 
        type: "assistant",
        timestamp: new Date() 
      }]);
    }, 1500);
    
    // Display schedule button message after 3 seconds
    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "assistant", 
        showCalendly: true,
        timestamp: new Date()
      }]);
    }, 3000);
    
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
      // Clean up scripts when component unmounts
      document.head.removeChild(link);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <div className="pt-24 pb-24 px-4 flex-grow overflow-y-auto">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 ${
                message.type === "user" ? "flex-row-reverse" : ""
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
                    <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-bamboo-navy">{message.text}</p>
                      {message.showCalendly && (
                        <Button 
                          onClick={openCalendly}
                          className="mt-2 bg-[#00d1a1] hover:bg-[#00b38a] text-white"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book a Meeting
                        </Button>
                      )}
                    </div>
                  </>
                ) : message.type === "user" ? (
                  <>
                    <div className="bg-bamboo-primary p-4 rounded-lg rounded-tr-none max-w-[80%]">
                      <p className="text-white">{message.text}</p>
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
              placeholder="Type your message..." 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-bamboo-primary hover:bg-bamboo-secondary text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
