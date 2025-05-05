
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BambooSVG from "./BambooSVG";
import { useEffect, useState } from "react";
import GoogleLogo from "./GoogleLogo";
import TikTokLogo from "./TikTokLogo";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const platforms = ["TikTok", "Google", "Meta", "YouTube"];
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPlatform((prev) => (prev + 1) % platforms.length);
        setIsAnimating(false);
      }, 500); // Half a second for fade out
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const handleGetStarted = () => {
    navigate("/chat"); // Updated to navigate to the new chat page
  };

  // Function to get platform-specific color that's harmonious with site theme
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "TikTok":
        return "text-bamboo-navy"; // Dark navy instead of black
      case "Google":
        return "text-bamboo-tertiary"; // Swapped - Now using bamboo-tertiary for Google
      case "Meta":
        return "text-[#5995ED]"; // Swapped - Now using the gradient blue for Meta
      case "YouTube":
        return "text-[#ea384c]"; // Softer red that matches the theme
      default:
        return "";
    }
  };

  // Function to render the appropriate icon for each platform
  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case "TikTok":
        return <TikTokLogo className="ml-2 inline-block" size={isMobile ? 20 : 28} />;
      case "Google":
        return <GoogleLogo className="ml-2 inline-block" size={isMobile ? 20 : 28} />;
      case "Meta":
        return (
          <span className="inline-flex items-center">
            <Facebook className="ml-2 inline-block" size={isMobile ? 16 : 24} />
            <Instagram className="ml-1 inline-block" size={isMobile ? 16 : 24} />
          </span>
        );
      case "YouTube":
        return <Youtube className="ml-2 inline-block" size={isMobile ? 18 : 28} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative pt-16 md:pt-24 pb-12 md:pb-16 px-4 overflow-hidden">
      
      {/* Background Image with Animation */}
      <div className="absolute inset-0 animate-slide-up">
        <img 
          src="/Hero-banner-4.svg" 
          alt="Decorative bamboo background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Semi-transparent White Box - Full Hero Size */}
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      {/* Foreground Content */}
      <div className="container mx-auto flex flex-col items-center text-center relative z-10 max-w-[800px]">
        {isMobile ? (
          // Mobile layout - more compact
          <h1 className="text-2xl font-bold text-bamboo-navy mb-4">
            <span className="inline">The </span>
            <span className="ai-ad-agency-gradient">Ad Agency</span>
            <span className="inline"> as simple as,</span>
            <div className="flex justify-center items-center my-1 h-8">
              <span className="whitespace-nowrap">"Launch Ads on... </span>
              <span 
                className={`inline-flex items-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${getPlatformColor(platforms[currentPlatform])}`}
              >
                {platforms[currentPlatform]}
                {renderPlatformIcon(platforms[currentPlatform])}
              </span>
              <span>"</span>
            </div>
          </h1>
        ) : (
          // Desktop layout - original
          <h1 className="text-3xl md:text-5xl font-bold text-bamboo-navy mb-6">
            The 
            <span className="relative ml-2">
              <span className="ai-ad-agency-gradient">Ad Agency</span> as simple 
            </span>
            <span className="block font-bold text-bamboo-navy mt-2">
              as, "Launch Ads on..." 
            </span>
            <span className="block py-3"> {/* Added padding above and below */}
              <span 
                className={`inline-flex items-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${getPlatformColor(platforms[currentPlatform])}`}
              >
                {platforms[currentPlatform]}
                {renderPlatformIcon(platforms[currentPlatform])}
              </span>
            </span>
          </h1>
        )}

        <div className="flex justify-center gap-4 mt-2 md:mt-0">
          <Button 
            className="bg-[#4BD0A0] hover:bg-[#3DBB8D] text-white font-medium rounded-md text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-sm flex items-center"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
