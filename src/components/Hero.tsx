import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BambooSVG from "@/components/BambooSVG"; // <-- Import your animated SVG as a React component

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        
        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
            The <span className="bg-gradient-to-r from-[#FFB800] to-[#FFB800] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-xl">
            Launch ads and grow your business today. No technical marketing knowledge required. No waiting around for overpriced freelancers.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* SVG SECTION */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-12 md:mb-0">
          <div className="max-w-full h-auto">
            <BambooSVG className="w-full h-auto" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
