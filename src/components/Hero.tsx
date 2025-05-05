
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BambooSVG from "./BambooSVG";
import { useEffect, useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
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
        return <Twitter className="ml-2 inline-block h-10 w-10" />; // Using TikTok icon
      case "Google":
        return <Instagram className="ml-2 inline-block h-10 w-10" />; // Using Instagram as Google substitute
      case "Meta":
        return <Facebook className="ml-2 inline-block h-10 w-10" />;
      case "YouTube":
        return <Youtube className="ml-2 inline-block h-10 w-10" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative pt-24 pb-16 px-4 overflow-hidden">
      
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
        <h1 className="text-3xl md:text-5xl font-bold text-bamboo-navy mb-6">
          The 
          <span className="relative ml-2">
            <span className="ai-ad-agency-gradient">Ad Agency</span> as simple 
          </span>
          <span className="block font-bold text-bamboo-navy mt-2">
            as, "Launch Ads on..." 
          </span>
          <span className="block">
            <span 
              className={`inline-block min-w-24 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${getPlatformColor(platforms[currentPlatform])}`}
            >
              {platforms[currentPlatform]}
              {renderPlatformIcon(platforms[currentPlatform])}
            </span>
          </span>
        </h1>

        <div className="flex justify-center gap-4">
          <Button 
            className="bg-[#4BD0A0] hover:bg-[#3DBB8D] text-white font-medium rounded-md text-lg px-8 py-6 shadow-sm flex items-center"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
