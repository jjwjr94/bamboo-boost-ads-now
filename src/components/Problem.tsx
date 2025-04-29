
import React, { useEffect, useState, useRef } from "react";
import { Container } from "./ui/container";
import { Rocket, ChartBarIncreasing, UserRound, Compass, Brush, Settings, Tag } from "lucide-react";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const [currentStep, setCurrentStep] = useState(0);
const Problem = () => {
  const [cost, setCost] = useState(10000);
  const [progress, setProgress] = useState(0);
  const [freelancerMessage, setFreelancerMessage] = useState("Sorry that's out of scope.");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Animation visibility states
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [card3Visible, setCard3Visible] = useState(false);
  
  // Refs for each card
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  
  // Set up intersection observer for sequential animation
  useEffect(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === card1Ref.current && currentStep === 0) {
          setCurrentStep(1);
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  if (card1Ref.current) observer.observe(card1Ref.current);

  return () => {
    if (card1Ref.current) observer.unobserve(card1Ref.current);
  };
}, [currentStep]);
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);
    
    return () => {
      if (card1Ref.current) observer.unobserve(card1Ref.current);
      if (card2Ref.current) observer.unobserve(card2Ref.current);
      if (card3Ref.current) observer.unobserve(card3Ref.current);
    };
  }, []);
useEffect(() => {
  if (currentStep === 1) {
    setCard1Visible(true);
    setTimeout(() => setCurrentStep(2), 1000);
  } else if (currentStep === 2) {
    setCard2Visible(true);
    setTimeout(() => setCurrentStep(3), 1000);
  } else if (currentStep === 3) {
    setCard3Visible(true);
  }
}, [currentStep]);

  // Cost animation effect - only run when card2 is visible
  useEffect(() => {
    if (!card2Visible) return;
    
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
  }, [card2Visible]);

  // Freelancer typing animation - only run when card3 is visible
  useEffect(() => {
    if (!card3Visible) return;
    
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
  }, [freelancerMessage, typingIndex, isTyping, card3Visible]);

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
            <div 
              ref={card1Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-500 ${card1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex justify-center relative h-28 mb-6">
                {/* Icons with juggling animation */}
                <div className={`advertising-icons-container relative w-full h-full ${card1Visible ? 'animate-fade-in' : ''}`}>
                  <div className={`absolute bg-gray-100 p-3 rounded-full advertising-icon advertising-icon-1 ${card1Visible ? 'advertising-icon-active' : ''}`}>
                    <Compass size={24} className="text-gray-500" />
                  </div>
                  <div className={`absolute bg-gray-100 p-3 rounded-full advertising-icon advertising-icon-2 ${card1Visible ? 'advertising-icon-active' : ''}`}>
                    <Brush size={24} className="text-gray-500" />
                  </div>
                  <div className={`absolute bg-gray-100 p-3 rounded-full advertising-icon advertising-icon-3 ${card1Visible ? 'advertising-icon-active' : ''}`}>
                    <Settings size={24} className="text-gray-500" />
                  </div>
                  <div className={`absolute bg-gray-100 p-3 rounded-full advertising-icon advertising-icon-4 ${card1Visible ? 'advertising-icon-active' : ''}`}>
                    <Tag size={24} className="text-gray-500" />
                  </div>
                  <div className={`absolute bg-gray-100 p-3 rounded-full advertising-icon advertising-icon-5 ${card1Visible ? 'advertising-icon-active' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5-5" />
                      <path d="m19 9-5 5" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Advertising is too complicated</h3>
            </div>

            {/* Card 2: Agencies */}
            <div 
              ref={card2Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-500 ${card2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
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
            <div 
              ref={card3Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-500 ${card3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
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
                  width: card3Visible ? `${Math.max(12, Math.min(typingIndex * 0.7, freelancerMessage.length) * 0.7)}rem` : '12rem',
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

      {/* CSS for juggling animation - fixed to use proper JSX syntax */}
      <style>
        {`
        .advertising-icons-container {
          perspective: 1000px;
        }
        
        .advertising-icon {
          position: absolute;
          transform-origin: center;
          top: calc(50% - 24px);
          left: calc(50% - 24px);
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .advertising-icon-active.advertising-icon-1 {
          animation: juggle1 4s infinite ease-in-out;
          opacity: 1;
          transform: scale(1);
        }
        
        .advertising-icon-active.advertising-icon-2 {
          animation: juggle2 4s infinite ease-in-out;
          opacity: 1;
          transform: scale(1);
          animation-delay: 0.2s;
        }
        
        .advertising-icon-active.advertising-icon-3 {
          animation: juggle3 4s infinite ease-in-out;
          opacity: 1;
          transform: scale(1);
          animation-delay: 0.4s;
        }
        
        .advertising-icon-active.advertising-icon-4 {
          animation: juggle4 4s infinite ease-in-out;
          opacity: 1;
          transform: scale(1);
          animation-delay: 0.6s;
        }
        
        .advertising-icon-active.advertising-icon-5 {
          animation: juggle5 4s infinite ease-in-out;
          opacity: 1;
          transform: scale(1);
          animation-delay: 0.8s;
        }
        
        @keyframes juggle1 {
          0%, 100% { transform: translate(-50px, 20px) rotate(0deg); }
          20% { transform: translate(0, -30px) rotate(72deg); }
          40% { transform: translate(50px, 20px) rotate(144deg); }
          60% { transform: translate(30px, 50px) rotate(216deg); }
          80% { transform: translate(-30px, 50px) rotate(288deg); }
        }
        
        @keyframes juggle2 {
          0%, 100% { transform: translate(50px, 20px) rotate(0deg); }
          20% { transform: translate(30px, 50px) rotate(72deg); }
          40% { transform: translate(-30px, 50px) rotate(144deg); }
          60% { transform: translate(-50px, 20px) rotate(216deg); }
          80% { transform: translate(0, -30px) rotate(288deg); }
        }
        
        @keyframes juggle3 {
          0%, 100% { transform: translate(30px, 50px) rotate(0deg); }
          20% { transform: translate(-30px, 50px) rotate(72deg); }
          40% { transform: translate(-50px, 20px) rotate(144deg); }
          60% { transform: translate(0, -30px) rotate(216deg); }
          80% { transform: translate(50px, 20px) rotate(288deg); }
        }
        
        @keyframes juggle4 {
          0%, 100% { transform: translate(-30px, 50px) rotate(0deg); }
          20% { transform: translate(-50px, 20px) rotate(72deg); }
          40% { transform: translate(0, -30px) rotate(144deg); }
          60% { transform: translate(50px, 20px) rotate(216deg); }
          80% { transform: translate(30px, 50px) rotate(288deg); }
        }
        
        @keyframes juggle5 {
          0%, 100% { transform: translate(0, -30px) rotate(0deg); }
          20% { transform: translate(50px, 20px) rotate(72deg); }
          40% { transform: translate(30px, 50px) rotate(144deg); }
          60% { transform: translate(-30px, 50px) rotate(216deg); }
          80% { transform: translate(-50px, 20px) rotate(288deg); }
        }
        `}
      </style>
    </section>
  );
};

export default Problem;
