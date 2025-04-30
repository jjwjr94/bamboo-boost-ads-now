
import React from "react";
import { Container } from "./ui/container";
import { Card } from "./ui/card";

const AdsSimplified = () => {
  return (
    <section id="ads-simplified" className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm mb-4">Simplified Experience</p>
            <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-6">
              Ads Simplified into One Chat
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Manage your ad campaigns with our intuitive chat interface. Get reports, insights, and make data-driven decisions all in one place.
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg border-0 rounded-xl">
            <img 
              src="/lovable-uploads/88056b9c-0bf9-47b7-85f5-ed9218a46862.png" 
              alt="Bamboo chat interface showing TikTok campaign report with performance metrics and insights" 
              className="w-full h-auto"
            />
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-4">
              <h3 className="text-xl font-bold text-bamboo-navy mb-3">Real-time Campaign Reports</h3>
              <p className="text-gray-600">Get detailed performance metrics across all your ad platforms in one unified view.</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-xl font-bold text-bamboo-navy mb-3">Data-Driven Insights</h3>
              <p className="text-gray-600">Automatically analyze campaign performance and receive actionable recommendations.</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-xl font-bold text-bamboo-navy mb-3">Platform Comparison</h3>
              <p className="text-gray-600">Compare performance across TikTok, Meta, Google and optimize your ad spend accordingly.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdsSimplified;
