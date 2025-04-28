import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/Hero banner 4.svg" 
          alt="Decorative bamboo background"
          className="hero-bamboo w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
          The <span className="bg-gradient-to-r from-[#C3A200] to-[#C3A200] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Launch ads and grow your business today. No technical marketing knowledge required. No waiting around for overpriced freelancer.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
