
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BambooSVG from "./BambooSVG";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const phrases = [
    "Launch TikTok Ads", 
    "Last Week's Conversions", 
    "Funny Video Ad Ideas", 
    "Improve My ROAS",
    "Add Meta Pixel to Site"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Half a second for fade out
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const handleGetStarted = () => {
    navigate("/chat"); // Navigate to the chat page
  };

  return (
    <div className="relative pt-16 md:pt-24 pb-24 md:pb-28 px-4 overflow-hidden">
      
      {/* Background Image with Animation - Dynamic based on screen size */}
      <div className="absolute inset-0 animate-slide-up">
        {isMobile ? (
          <img 
            src="/mobile-hero-banner.svg" 
            alt="Decorative bamboo background for mobile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src="/Hero-banner-4.svg" 
            alt="Decorative bamboo background" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Semi-transparent White Box - Full Hero Size */}
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      {/* Foreground Content */}
      <div className="container mx-auto flex flex-col items-center text-center relative z-10 max-w-4xl">
        {/* New heading above the title - now with smaller text */}
        
        <h1 className="text-3xl md:text-5xl font-bold text-bamboo-navy mb-6">
          The <span className="ai-ad-agency-gradient">AI Ad Agency</span>
          <span className="relative ml-2">
             as simple as: 
          </span>
          <span className="block py-3 min-h-[60px] md:min-h-[80px] flex items-center justify-center">
            <span 
              className={`inline-flex items-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'} text-bamboo-navy`}
            >
              "{phrases[currentPhrase]}"
            </span>
          </span>
        </h1>
        
        {/* Body text */}
        <p className="text-lg md:text-xl text-bamboo-navy mb-6 font-medium">
          Grow Your Startup or Small Business With <span className="text-bamboo-primary">Bamboo</span>.
        </p>

        <div className="flex justify-center gap-4 mt-2 md:mt-0">
          <Button 
            className="bg-[#4BD0A0] hover:bg-[#3DBB8D] text-white font-medium rounded-md text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-sm flex items-center"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
