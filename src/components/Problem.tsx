
import React, { useEffect, useState } from "react";
import { Container } from "./ui/container";
import { Rocket, ChartBarIncreasing, UserRound } from "lucide-react";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Problem = () => {
  const [cost, setCost] = useState(10000);
  const [progress, setProgress] = useState(0);
  const [freelancerMessage, setFreelancerMessage] = useState("Sorry that's out of scope.");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCost(prevCost => {
        if (prevCost >= 20000) {
          clearInterval(interval);
          setTimeout(() => {
            setCost(10000);
            setProgress(0);
          }, 2000);
          return 20000;
        }
        return prevCost + 500;
      });
      
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 5;
      });
    }, 200);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Typing animation logic with increased speed
    const fullMessage = freelancerMessage;
    
    if (isTyping && typingIndex < fullMessage.length) {
      const typingTimer = setTimeout(() => {
        setTypingIndex(prev => prev + 1);
      }, 70); // Increased speed (reduced from 100ms to 70ms)
      
      return () => clearTimeout(typingTimer);
    } 
    
    if (isTyping && typingIndex >= fullMessage.length) {
      const pauseTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1500); // Reduce pause time from 2000ms to 1500ms
      
      return () => clearTimeout(pauseTimer);
    }
    
    if (!isTyping) {
      const resetTimer = setTimeout(() => {
        setFreelancerMessage(prevMessage => 
          prevMessage === "Sorry that's out of scope." 
            ? "I can have that ready in a week." 
            : "Sorry that's out of scope."
        );
        setTypingIndex(0);
        setIsTyping(true);
      }, 800); // Reduce waiting time from 1000ms to 800ms
      
      return () => clearTimeout(resetTimer);
    }
  }, [freelancerMessage, typingIndex, isTyping]);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm">The Problem</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-8">
              Growing Your Small Business is Hard
            </h2>
          </div>
          
          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Advertising */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {/* Icons for complex advertising - updated to match Launch Ads Today section */}
                <div className="bg-gray-100 p-3 rounded-full">
                  <Rocket size={24} className="text-gray-500" />
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" x2="4" y1="22" y2="15"></line>
                  </svg>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M7 7h.01"></path>
                    <path d="M12 7h.01"></path>
                    <path d="m7 12 .01-.011"></path>
                    <path d="M12 12h.01"></path>
                    <path d="M17 12h.01"></path>
                    <path d="M7 17h.01"></path>
                    <path d="M12 17h.01"></path>
                    <path d="M17 17h.01"></path>
                  </svg>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                  </svg>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Advertising is too complicated</h3>
            </div>

            {/* Card 2: Agencies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <ChartBarIncreasing size={28} className="text-gray-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-700">${cost.toLocaleString()}</span>
                </div>
                <div className="w-full max-w-xs mt-2">
                  <Progress value={progress} className="h-3 bg-gray-200" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Agency Fees</p>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Agencies are too expensive</h3>
            </div>

            {/* Card 3: Freelancers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start mb-6">
                {/* Avatar Profile Picture - Fixed on the left */}
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10 bg-gray-200 filter grayscale">
                    <AvatarImage src="/lovable-uploads/7bf5741a-95ba-4ff0-b819-4dd682543c16.png" alt="Freelancer" />
                    <AvatarFallback className="bg-gray-300">
                      <UserRound size={20} className="text-gray-500" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Chat Bubble - Expands to the right */}
                <div className="ml-2 bg-gray-100 p-3 rounded-lg min-h-[2.5rem]" style={{
                  width: `${Math.max(12, Math.min(typingIndex * 0.7, freelancerMessage.length) * 0.7)}rem`,
                  transition: 'width 70ms linear'
                }}>
                  <p className="text-gray-600 text-sm text-left">
                    {freelancerMessage.substring(0, typingIndex)}
                    <span className="inline-block w-1 h-4 bg-gray-400 ml-0.5 animate-pulse">
                      {typingIndex < freelancerMessage.length ? "|" : ""}
                    </span>
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Freelancers are too limited</h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Problem;
