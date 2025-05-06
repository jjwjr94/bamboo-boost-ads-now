
import React from "react";
import { Container } from "./ui/container";

const Solution = () => {
  return (
    <section id="solution" className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm mb-4">The Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">
            <span className="text-bamboo-primary">Bamboo:</span> The Small Team of Expert Marketers Using AI to 10x Our Output and Speed.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't Let Other Agencies Tell You, "You Get What You Pay For".
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Solution;
