
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BambooSVG from "./BambooSVG";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/chat");
  };

  return (
    <div className="relative pt-24 pb-16 px-4 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Hero-banner-4.svg" 
          alt="Decorative bamboo background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto flex flex-col items-center text-center relative z-10 max-w-[800px]">
        
        {/* Fully Transparent Box */}
        <div className="bg-transparent backdrop-blur-sm p-8 rounded-lg w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
            The <span className="relative">
              <span className="bg-gradient-to-r from-[#00D1A1] to-[#5995ED] text-transparent bg-clip-text">AI Ad Agency</span>
              <svg className="absolute w-full h-3 left-0 -bottom-1" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path 
                  d="M0,2 Q25,6 50,2 T100,2"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D1A1" />
                    <stop offset="100%" stopColor="#5995ED" />
                  </linearGradient>
                </defs>
              </svg>
            </span> built for Small and Medium Size Business
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-8">
            <span className="text-bamboo-primary">Launch ads</span> and <span className="text-bamboo-primary">grow</span> your business today. No technical marketing knowledge required.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
