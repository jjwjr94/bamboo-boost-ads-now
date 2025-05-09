
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleGetStarted = () => {
    navigate("/chat"); // Navigate to the chat page
  };

  return (
    <div className="relative pt-12 md:pt-24 pb-16 md:pb-28 px-0 md:px-4 overflow-hidden">
      
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
      <div className="container mx-auto flex flex-col items-center text-center relative z-10 max-w-4xl px-2 md:px-4">
        {/* New heading above the title - now with smaller text */}
        
        <h1 className="text-3xl md:text-5xl font-bold text-bamboo-navy mb-4 md:mb-6">
          The <span className="ai-ad-agency-gradient">Ad Agency</span> Built for Startups and Small Business.
        </h1>
        
        {/* Body text */}
        <p className="text-lg md:text-xl text-bamboo-navy mb-4 md:mb-6 font-medium">
        A Team of World Class Marketers Supercharged by AI.
        </p>

        <div className="flex justify-center gap-4 mt-2 md:mt-0">
          <Button 
            className="bg-[#4BD0A0] hover:bg-[#3DBB8D] text-white font-medium rounded-md text-base md:text-lg px-6 md:px-8 py-3 md:py-6 shadow-sm flex items-center"
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
