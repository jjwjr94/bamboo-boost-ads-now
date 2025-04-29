import React, { useEffect, useState, useRef } from "react";
import { Container } from "./ui/container";
import { Rocket, ChartBarIncreasing, UserRound, Compass, Brush, Settings, Tag } from "lucide-react";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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

  // Refs
  const card1Ref = useRef<HTMLDivElement>(null);

  // Intersection Observer (only watch card1 to trigger the chain)
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

  // Control the card reveals step-by-step
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

  // Cost counter animation
  useEffect(() => {
    if (!card2Visible) return;

    const interval = setInterval(() => {
      setCost(prev => {
        if (prev >= 20000) {
          clearInterval(interval);
          setTimeout(() => {
            setCost(10000);
            setProgress(0);
          }, 2000);
          return 20000;
        }
        return prev + 500;
      });

      setProgress(prev => (prev >= 100 ? 0 : prev + 5));
    }, 200);

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
            ? "I can have that ready in a week." 
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
              Growing Your Small Business is Hard
            </h2>
          </div>

          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div 
              ref={card1Ref}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-700 ease-out transform ${
                card1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex justify-center relative h-28 mb-6">
                {/* Icons */}
                <div className="relative w-full h-full">
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
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Advertising is too complicated</h3>
            </div>

            {/* Card 2 */}
            <div 
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-700 ease-out transform ${
                card2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
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

            {/* Card 3 */}
            <div 
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-700 ease-out transform ${
                card3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start mb-6">
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
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Freelancers are too limited</h3>
            </div>
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
          @keyframes juggle2 { ... }
          @keyframes juggle3 { ... }
          @keyframes juggle4 { ... }
          @keyframes juggle5 { ... }
        `}
      </style>
    </section>
  );
};

export default Problem;
