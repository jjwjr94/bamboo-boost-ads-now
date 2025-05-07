
import React from "react";
import { Container } from "./ui/container";
import { Card } from "./ui/card";

const AffordableGrowth = () => {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-bamboo-navy mb-6">
              There's no affordable way for startups and small businesses to grow through advertising
            </h2>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              Marketers are convinced you just "get what you pay for".
            </p>
          </div>

          <Card className="overflow-hidden border-0 rounded-xl">
            <img 
              src="/lovable-uploads/20005810-1787-4152-90d5-7ef6f5e45a50.png" 
              alt="Social media discussion showing 'you get what you pay for' comments about marketing agencies and freelancers" 
              className="w-full h-auto"
            />
          </Card>

        </div>
      </Container>
    </section>
  );
};

export default AffordableGrowth;
