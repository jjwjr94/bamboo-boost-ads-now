
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero2 = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/chat");
  };

  return (
    <div className="relative pt-24 pb-16 px-4 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Hero-banner-6.svg" 
          alt="Decorative background pattern" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Content Box */}
        <div className="bg-white bg-opacity-95 p-10 rounded-2xl shadow-xl max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
            Your <span className="relative">
              <span className="bg-gradient-to-r from-bamboo-primary to-[#5995ED] text-transparent bg-clip-text">Marketing Partner</span>
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
            </span> in AI Advertising
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            <span className="text-bamboo-primary">Simple, effective, and automated</span> marketing campaigns designed for businesses of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-bamboo-primary text-bamboo-primary hover:bg-bamboo-primary hover:text-white text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 bg-white bg-opacity-90 p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-bamboo-primary">94%</div>
            <div className="text-bamboo-navy mt-2">Increase in Conversion</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-bamboo-primary">2.5x</div>
            <div className="text-bamboo-navy mt-2">ROI Improvement</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-bamboo-primary">30+</div>
            <div className="text-bamboo-navy mt-2">Ad Platforms Supported</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
