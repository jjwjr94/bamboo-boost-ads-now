import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        <div className="w-full md:w-[75%] md:pr-8 text-center md:text-left mb-10 md:mb-0">
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
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto md:mx-0">
            <span className="text-bamboo-primary">Launch ads</span> and <span className="text-bamboo-primary">grow</span> your business today. No technical marketing knowledge required.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-[25%] flex justify-center md:justify-end">
          <img 
            src="/Hero banner 4.svg" 
            alt="Animated bamboo stalks"
            className="w-full max-h-[800px] object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
