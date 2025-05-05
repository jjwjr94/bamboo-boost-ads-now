
import React from "react";
import { Container } from "./ui/container";
import { Card } from "./ui/card";

const AdsSimplified = () => {
  return (
    <section id="ads-simplified" className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">
              Like if ChatGPT were an ad agency. <span className="underline">Just Chat.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Stop Wasting Time Learning Dozens of Tools.
            </p>
          </div>

          <Card className="overflow-hidden shadow-lg border-0 rounded-xl">
            <img 
              src="/lovable-uploads/5ef09685-f044-495c-bf04-a2fd693c37da.png" 
              alt="Bamboo chat interface showing TikTok campaign report with performance metrics and platform comparison" 
              className="w-full h-auto"
            />
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default AdsSimplified;
