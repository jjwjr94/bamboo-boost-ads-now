
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-16 md:pt-24 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="backdrop-blur-sm w-full h-full">
          <img 
            src="/Hero banner 4.svg" 
            alt="Decorative bamboo background"
            className="hero-bamboo w-full h-full object-cover opacity-50"
          />
        </div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column with text */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
              The <span className="bg-gradient-to-r from-[#FFB800] to-[#FFB800] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Launch ads and grow your business today. No technical marketing knowledge required. No waiting around for overpriced freelancer.
            </p>
            <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Right column with decorative image */}
          <div className="relative hidden md:block">
            <img 
              src={"/lovable-uploads/12ff5732-97a8-4200-b7c4-d5556837d824.png"}
              alt="Decorative geometric shapes and patterns"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
