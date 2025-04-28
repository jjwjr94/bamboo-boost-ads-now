import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    // Reduced vertical padding (pt-24 pb-16) to decrease overall height
    <div className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Changed items-center to items-start to align content towards the top */}
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        
        {/* Left Column (Text Content - 70% width) */}
        <div className="w-full md:w-[70%] md:pr-8 text-center md:text-left mb-10 md:mb-0">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
            The <span className="bg-gradient-to-r from-[#00D1A1] to-[#5995ED] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
          </h1>
          {/* Paragraph */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto md:mx-0">
            Launch ads and <span className="text-bamboo-primary">grow</span> your business today. No technical marketing knowledge required. No waiting around for <span className="text-bamboo-primary">overpriced</span> freelancer.
          </p>
          {/* Button */}
          <div className="flex justify-center md:justify-start gap-4">
            <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right Column (Bamboo SVG - 30% width) */}
        <div className="w-full md:w-[30%] flex justify-center md:justify-end">
          {/* Removed fixed height, using w-full to scale within column, added max-h */}
          <img 
            src="/simplified-bamboo.svg" 
            alt="Animated bamboo stalks"
            className="w-full max-h-[600px] object-contain" // Adjust max-h as needed
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;
