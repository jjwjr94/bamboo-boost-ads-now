
import React, { useEffect, useState, useRef } from "react";
import { Container } from "./ui/container";
import { Rocket, UserRound, Compass, Brush, Settings, Tag } from "lucide-react";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const Problem = () => {
  const [cost, setCost] = useState(10000);
  const [progress, setProgress] = useState(0);
  const [freelancerMessage, setFreelancerMessage] = useState("Sorry that's out of scope.");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Step-based animation control
  const [currentStep, setCurrentStep] = useState(0);

  // Visibility flags
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [card3Visible, setCard3Visible] = useState(false);

  // Refs for all cards
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Animation state for card 1
  const [card1AnimationComplete, setCard1AnimationComplete] = useState(false);
  const [card2AnimationComplete, setCard2AnimationComplete] = useState(false);

  // Intersection Observer for card 1 (first in sequence)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && currentStep === 0) {
            setCurrentStep(1);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (card1Ref.current) observer.observe(card1Ref.current);

    return () => {
      if (card1Ref.current) observer.unobserve(card1Ref.current);
    };
  }, [currentStep]);

  // Sequential animation control
  useEffect(() => {
    if (currentStep === 1) {
      setCard1Visible(true);
      
      // Mark card 1 animation as complete after animation duration
      const timer = setTimeout(() => {
        setCard1AnimationComplete(true);
        setCurrentStep(2);
      }, 2000); // Duration for card 1 animation + a little extra time
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Card 2 animation starts after card 1 completes
  useEffect(() => {
    if (card1AnimationComplete && currentStep === 2) {
      setCard2Visible(true);
      
      // Mark card 2 animation as complete after its animation duration
      const timer = setTimeout(() => {
        setCard2AnimationComplete(true);
        setCurrentStep(3);
      }, 2000); // Duration for card 2 animation + a little extra time
      
      return () => clearTimeout(timer);
    }
  }, [card1AnimationComplete, currentStep]);

  // Card 3 animation starts after card 2 completes
  useEffect(() => {
    if (card2AnimationComplete && currentStep === 3) {
      setCard3Visible(true);
    }
  }, [card2AnimationComplete, currentStep]);

  // Cost counter animation - Modified to loop continuously
  useEffect(() => {
    if (!card2Visible) return;

    const runAnimation = () => {
      let currentCost = 10000;
      let currentProgress = 0;
      
      const interval = setInterval(() => {
        currentCost += 500;
        currentProgress += 5;
        
        setCost(currentCost);
        setProgress(currentProgress);
        
        if (currentCost >= 20000) {
          clearInterval(interval);
          setTimeout(() => {
            setCost(10000);
            setProgress(0);
            runAnimation(); // Restart the animation
          }, 500); // Short pause before restarting
        }
      }, 200);
      
      return interval;
    };
    
    const interval = runAnimation();
    
    return () => clearInterval(interval);
  }, [card2Visible]);

  // Freelancer typing animation
  useEffect(() => {
    if (!card3Visible) return;

    const fullMessage = freelancerMessage;

    if (isTyping && typingIndex < fullMessage.length) {
      const typingTimer = setTimeout(() => setTypingIndex(prev => prev + 1), 70);
      return () => clearTimeout(typingTimer);
    }

    if (isTyping && typingIndex >= fullMessage.length) {
      const pauseTimer = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(pauseTimer);
    }

    if (!isTyping) {
      const resetTimer = setTimeout(() => {
        setFreelancerMessage(prev => 
          prev === "Sorry that's out of scope." 
            ? "I can't until next month." 
            : "Sorry that's out of scope."
        );
        setTypingIndex(0);
        setIsTyping(true);
      }, 800);
      return () => clearTimeout(resetTimer);
    }
  }, [freelancerMessage, typingIndex, isTyping, card3Visible]);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm mb-4">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-8">
              Growing Your Business Shouldn't Be So Hard
            </h2>
          </div>

          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div 
              ref={card1Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-700 ease-out transform flex flex-col justify-between h-64 ${
                card1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex justify-center items-center relative flex-grow">
                {/* Icons */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {[Compass, Brush, Settings, Tag, Rocket].map((Icon, i) => (
                    <div key={i} className={`absolute bg-gray-100 p-3 rounded-full transition-all ${card1Visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                      style={{
                        top: `calc(50% - 24px)`,
                        left: `calc(50% - 24px)`,
                        animation: card1Visible ? `juggle${i+1} 4s infinite ease-in-out ${i*0.2}s` : undefined
                      }}
                    >
                      <Icon size={24} className="text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mt-4">Advertising is <span className="text-bamboo-primary">too complicated</span> to juggle alone</h3>
            </div>

            {/* Card 2 - Removed ChartBarIncreasing icon */}
            <div 
              ref={card2Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-700 ease-out transform flex flex-col justify-between h-64 ${
                card2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex flex-col items-center justify-center flex-grow">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-gray-700">${cost.toLocaleString()}</span>
                </div>
                <div className="w-full max-w-xs mt-2">
                  <Progress value={progress} className="h-3 bg-gray-200" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Agency Fees</p>
              </div>
              <h3 className="text-xl font-semibold text-center mt-4">Agencies are <span className="text-bamboo-primary">too expensive</span></h3>
            </div>

            {/* Card 3 */}
            <div 
              ref={card3Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-700 ease-out transform flex flex-col justify-between h-64 ${
                card3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-center flex-grow">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10 bg-gray-200 filter grayscale">
                      <AvatarImage src="/lovable-uploads/7bf5741a-95ba-4ff0-b819-4dd682543c16.png" alt="Freelancer" />
                      <AvatarFallback className="bg-gray-300">
                        <UserRound size={20} className="text-gray-500" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
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
              </div>
              <h3 className="text-xl font-semibold text-center mt-4">Freelancers are <span className="text-bamboo-primary">too limited</span></h3>
            </div>
          </div>
          
          {/* AffordableGrowth content moved here */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-bamboo-navy mb-6">
                There's no affordable way for startups and small businesses to grow through advertising
              </h2>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700">
                Marketers are convinced you just "get what you pay for".
              </p>
            </div>

            <Card className="overflow-hidden border-0 rounded-xl mt-8 bg-transparent shadow-none">
              <img 
                src="/lovable-uploads/20005810-1787-4152-90d5-7ef6f5e45a50.png" 
                alt="Social media discussion showing 'you get what you pay for' comments about marketing agencies and freelancers" 
                className="w-full h-auto"
              />
            </Card>
          </div>
        </div>
      </Container>

      {/* CSS for juggling animations */}
      <style>
        {`
          @keyframes juggle1 {
            0%, 100% { transform: translate(-50px, 20px) rotate(0deg); }
            20% { transform: translate(0, -30px) rotate(72deg); }
            40% { transform: translate(50px, 20px) rotate(144deg); }
            60% { transform: translate(30px, 50px) rotate(216deg); }
            80% { transform: translate(-30px, 50px) rotate(288deg); }
          }
          @keyframes juggle2 {
            0%, 100% { transform: translate(50px, 20px) rotate(0deg); }
            20% { transform: translate(-30px, 50px) rotate(72deg); }
            40% { transform: translate(-50px, 20px) rotate(144deg); }
            60% { transform: translate(0, -30px) rotate(216deg); }
            80% { transform: translate(50px, 20px) rotate(288deg); }
          }
          @keyframes juggle3 {
            0%, 100% { transform: translate(30px, 50px) rotate(0deg); }
            20% { transform: translate(50px, 20px) rotate(72deg); }
            40% { transform: translate(0, -30px) rotate(144deg); }
            60% { transform: translate(-50px, 20px) rotate(216deg); }
            80% { transform: translate(-30px, 50px) rotate(288deg); }
          }
          @keyframes juggle4 {
            0%, 100% { transform: translate(-30px, 50px) rotate(0deg); }
            20% { transform: translate(30px, 50px) rotate(72deg); }
            40% { transform: translate(50px, 20px) rotate(144deg); }
            60% { transform: translate(0, -30px) rotate(216deg); }
            80% { transform: translate(-50px, 20px) rotate(288deg); }
          }
          @keyframes juggle5 {
            0%, 100% { transform: translate(0, -30px) rotate(0deg); }
            20% { transform: translate(-50px, 20px) rotate(72deg); }
            40% { transform: translate(-30px, 50px) rotate(144deg); }
            60% { transform: translate(50px, 20px) rotate(216deg); }
            80% { transform: translate(30px, 50px) rotate(288deg); }
          }
        `}
      </style>
    </section>
  );
};

export default Problem;
