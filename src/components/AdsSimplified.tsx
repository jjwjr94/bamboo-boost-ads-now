
import React from "react";
import { Container } from "./ui/container";
import { Card } from "./ui/card";

const AdsSimplified = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Advertising Made Truly Turnkey. <span className="underline">Just Chat.</span>
          </h2>
          
          <Card className="overflow-hidden shadow-lg border-0 rounded-xl mb-12">
            <img 
              src="/lovable-uploads/5ef09685-f044-495c-bf04-a2fd693c37da.png" 
              alt="Bamboo chat interface showing TikTok campaign report with performance metrics and platform comparison" 
              className="w-full h-auto"
            />
          </Card>

          <div className="text-center">
            <h3 className="text-xl md:text-2xl text-white italic font-normal">
              Like if ChatGPT Were a Full-Service Ad Agency, Priced Less Than a Freelancer.
            </h3>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdsSimplified;
