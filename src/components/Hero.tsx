
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-16 md:pt-24 pb-20 px-4">
      <div className="container mx-auto">
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
          
          {/* Right column with SVG */}
          <div className="relative hidden md:block">
            <img 
              src="/Hero banner 4.svg" 
              alt="Decorative bamboo background"
              className="hero-bamboo w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
