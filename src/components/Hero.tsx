import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
          The <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          No technical marketing knowledge required. Grow your business from little to big.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <p className="text-bamboo-navy mt-4">No upfront payment required</p>
      </div>
    </div>
  );
};

export default Hero;
