
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BambooSVG from "./BambooSVG";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/chat"); // Updated to navigate to the new chat page
  };

  return (
    <div className="relative pt-24 pb-16 px-4 overflow-hidden">
      
      {/* Background Image with Animation */}
      <div className="absolute inset-0 animate-slide-up">
        <img 
          src="/Hero-banner-4.svg" 
          alt="Decorative bamboo background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Semi-transparent White Box - Full Hero Size */}
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      {/* Foreground Content */}
      <div className="container mx-auto flex flex-col items-center text-center relative z-10 max-w-[800px]">
        <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
          As simple as, "Launch Ads on..." 
 <span className="relative">
            <span className="ai-ad-agency-gradient">Ad Agency</span>
            <svg className="absolute w-full h-3 left-0 -bottom-1 text-shimmer-stroke" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path 
                d="M0,2 Q25,6 50,2 T100,2"
                fill="none"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D1A1" />
                  <stop offset="100%" stopColor="#5995ED" />
                </linearGradient>
              </defs>
            </svg>
          </span>.
        </h1>
        <p className="text-xl md:text-2xl text-bamboo-navy mb-8">
          Simple, fast, and built for small business and startups.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            className="bg-[#4BD0A0] hover:bg-[#3DBB8D] text-white font-medium rounded-md text-lg px-8 py-6 shadow-sm flex items-center"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
