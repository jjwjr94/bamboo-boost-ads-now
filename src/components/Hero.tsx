
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <svg className="hero-bamboo w-full h-auto" width="1500" height="855" viewBox="0 0 1500 855" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_381_93)">
            <g clip-path="url(#clip1_381_93)">
              <image href="/Hero banner (3).svg#clip1_381_93" width="375" height="855" />
            </g>
            <g clip-path="url(#clip2_381_93)">
              <image href="/Hero banner (3).svg#clip2_381_93" width="375" height="855" x="375" />
            </g>
            <g clip-path="url(#clip3_381_93)">
              <image href="/Hero banner (3).svg#clip3_381_93" width="375" height="855" x="750" />
            </g>
            <g clip-path="url(#clip4_381_93)">
              <image href="/Hero banner (3).svg#clip4_381_93" width="375" height="853" x="1110" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_381_93">
              <rect width="1500" height="855" fill="white"/>
            </clipPath>
            <clipPath id="clip1_381_93">
              <rect width="375" height="855" fill="white"/>
            </clipPath>
            <clipPath id="clip2_381_93">
              <rect width="375" height="855" fill="white" transform="translate(375)"/>
            </clipPath>
            <clipPath id="clip3_381_93">
              <rect width="375" height="855" fill="white" transform="translate(750)"/>
            </clipPath>
            <clipPath id="clip4_381_93">
              <rect width="375" height="853" fill="white" transform="translate(1110)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
          The <span className="bg-gradient-to-r from-[#00D1A1] to-[#00B086] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
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
