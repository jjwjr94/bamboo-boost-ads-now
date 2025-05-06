
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
          <Card className="overflow-hidden shadow-lg border-0 rounded-xl mb-12">
            <img 
              src="/lovable-uploads/5ef09685-f044-495c-bf04-a2fd693c37da.png" 
              alt="Bamboo chat interface showing TikTok campaign report with performance metrics and platform comparison" 
              className="w-full h-auto"
            />
          </Card>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl text-white italic font-normal">
              Like if ChatGPT Were a Full-Service Ad Agency, Priced Less Than a Freelancer.
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdsSimplified;
