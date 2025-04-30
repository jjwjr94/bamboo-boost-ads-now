
import React from "react";
import { Container } from "./ui/container";

const Solution = () => {
  return (
    <section id="solution" className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm mb-4">The Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">
            Bamboo: The Full-Service Ad Agency for the Cost of a Freelancer. Completely Powered by AI.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a look at how Bamboo can help grow your business.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Solution;
