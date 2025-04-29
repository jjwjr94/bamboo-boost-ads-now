
import React, { useEffect, useState } from "react";
import { Container } from "./ui/container";
import { Rocket, ChartBarIncreasing } from "lucide-react";
import { Progress } from "./ui/progress";

const Problem = () => {
  const [cost, setCost] = useState(10000);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCost(prevCost => {
        if (prevCost >= 20000) {
          clearInterval(interval);
          setTimeout(() => {
            setCost(10000);
            setProgress(0);
          }, 2000);
          return 20000;
        }
        return prevCost + 500;
      });
      
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 5;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm">The Problem</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-8">
              Growing Your Small Business is Hard
            </h2>
          </div>
          
          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Advertising */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {/* Icons for complex advertising - updated to match Launch Ads Today section */}
                <div className="bg-green-50 p-3 rounded-full">
                  <Rocket size={24} className="text-bamboo-primary" />
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" x2="4" y1="22" y2="15"></line>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M7 7h.01"></path>
                    <path d="M12 7h.01"></path>
                    <path d="m7 12 .01-.011"></path>
                    <path d="M12 12h.01"></path>
                    <path d="M17 12h.01"></path>
                    <path d="M7 17h.01"></path>
                    <path d="M12 17h.01"></path>
                    <path d="M17 17h.01"></path>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Advertising is too complicated</h3>
            </div>

            {/* Card 2: Agencies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <ChartBarIncreasing size={28} className="text-bamboo-primary mr-2" />
                  <span className="text-2xl font-bold text-bamboo-primary">${cost.toLocaleString()}</span>
                </div>
                <div className="w-full max-w-xs mt-2">
                  <Progress value={progress} className="h-3 bg-gray-200" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Agency Monthly Retainer</p>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Agencies are too expensive</h3>
            </div>

            {/* Card 3: Freelancers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="bg-green-50 p-4 rounded-lg inline-flex items-center justify-center">
                  <div className="text-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary mx-auto">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-bamboo-navy text-center">Freelancers are too limited</h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Problem;
