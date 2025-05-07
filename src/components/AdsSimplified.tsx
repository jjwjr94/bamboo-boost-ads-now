
import React, { useEffect, useState } from "react";
import { Container } from "./ui/container";
import { Card } from "./ui/card";

const AdsSimplified = () => {
  const phrases = [
    "Launch TikTok Ads",  
    "Improve My ROAS",
    "Add Meta Pixel to Site",
    "Last Week's Sales", 
    "Funny Video Ad Ideas"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Half a second for fade out
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="ads-simplified" 
      className="py-16"
      style={{
        background: "linear-gradient(90deg, #00D1A1 0%, #5995ED 100%)"
      }}
    >
      <Container>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Advertising Made Truly Turnkey. <span className="underline">Just Chat.</span>
          </h2>
          
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl text-white">
              <span 
                className={`inline-flex items-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                "{phrases[currentPhrase]}"
              </span>
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg border-0 rounded-xl mb-12">
            <img 
              src="/lovable-uploads/5ef09685-f044-495c-bf04-a2fd693c37da.png" 
              alt="Bamboo chat interface showing TikTok campaign report with performance metrics and platform comparison" 
              className="w-full h-auto"
            />
          </Card>

          <div className="text-center">
            <h3 className="text-xl md:text-2xl text-white italic font-normal">
              Like if ChatGPT Were the Best Full-Service Ad Agency.
            </h3>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdsSimplified;
