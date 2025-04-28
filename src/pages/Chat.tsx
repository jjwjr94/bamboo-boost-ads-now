
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ text: string; type: "assistant" | "action" }>>([]);
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/schedule");
  };

  useEffect(() => {
    // Display first message immediately
    setMessages([{ text: "Welcome to Bamboo, the AI Ad Agency", type: "assistant" }]);
    
    // Display second message after 1.5 seconds
    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "It's really important to me to learn about your business. Please book a one-time 30-minute kickoff meeting to get started.", 
        type: "assistant" 
      }]);
    }, 1500);
    
    // Display get started button after 3 seconds
    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, { type: "action", text: "" }]);
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
              <div key={index} className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
                {message.type === "assistant" ? (
                  <>
                    <Avatar className="h-10 w-10 border">
                      <img src="/lovable-uploads/ee7f1b89-e60e-4121-8fb6-dba324f20c21.png" alt="Bamboo AI" />
                    </Avatar>
                    <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-bamboo-navy">{message.text}</p>
                    </div>
                  </>
                ) : (
                  <div className="ml-14 mt-2">
                    <Button 
                      className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-6 py-5"
                      onClick={handleGetStarted}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
