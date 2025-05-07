
import React from "react";
import { Container } from "./ui/container";
import { Card } from "./ui/card";

const AffordableGrowth = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">
              There's no affordable way for startups and small businesses to grow through advertising
            </h2>
          </div>

          <Card className="overflow-hidden shadow-lg border-0 rounded-xl">
            <img 
              src="/lovable-uploads/e402c208-b5ba-4c25-a01e-7fed9891396c.png" 
              alt="Social media discussion showing 'you get what you pay for' comments about marketing agencies and freelancers" 
              className="w-full h-auto"
            />
          </Card>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              Whether it's hiring expensive agencies, unreliable freelancers, or trying to do it yourself - 
              the options for small businesses are limited and often disappointing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AffordableGrowth;
