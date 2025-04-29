
import React from "react";
import { Container } from "./ui/container";

const Problem = () => {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-bamboo-primary"
              >
                <path 
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="currentColor" 
                />
              </svg>
              <p className="text-bamboo-primary font-medium uppercase tracking-wider text-sm">The Problem</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-bamboo-navy mb-8">
              Growing Your Small Business is Hard
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Small business owners face countless challenges with limited resources. Marketing effectively, 
              creating professional ads, and reaching the right audience can be overwhelming and expensive.
            </p>
          </div>
          
          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Advertising */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-bamboo-navy mb-4">Advertising is too complicated</h3>
              <div className="flex flex-wrap justify-center gap-3 my-6">
                {/* Icons for complex advertising */}
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <path d="M2 2v20h20"></path>
                    <path d="m6 16 6-8 6 8"></path>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <path d="M12 2H2v10h10V2Z"></path>
                    <path d="M5 5h4"></path>
                    <path d="M5 8h4"></path>
                    <path d="M8 11h4"></path>
                    <path d="M17 17v.01"></path>
                    <path d="M13 15h8v8h-8v-8Z"></path>
                    <path d="M17 15v-2a5 5 0 0 0-10 0v2"></path>
                  </svg>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">Multiple platforms, complex targeting options, and confusing analytics make advertising feel like rocket science.</p>
            </div>

            {/* Card 2: Agencies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-bamboo-navy mb-4">Agencies are too expensive</h3>
              <div className="flex justify-center my-6">
                <div className="relative flex flex-col items-center">
                  <div className="text-bamboo-primary text-4xl font-bold">$$$</div>
                  <div className="flex items-end mt-2">
                    <div className="h-16 w-4 bg-bamboo-primary rounded-t-md mx-1"></div>
                    <div className="h-20 w-4 bg-bamboo-primary rounded-t-md mx-1"></div>
                    <div className="h-24 w-4 bg-bamboo-primary rounded-t-md mx-1"></div>
                    <div className="h-28 w-4 bg-bamboo-primary rounded-t-md mx-1"></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Hiring marketing agencies often requires significant budgets that small businesses simply can't afford.</p>
            </div>

            {/* Card 3: Freelancers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-bamboo-navy mb-4">Freelancers are too limited</h3>
              <div className="flex justify-center my-6">
                <div className="bg-green-50 p-4 rounded-lg inline-flex items-center justify-center">
                  <div className="text-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bamboo-primary mx-auto mb-2">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span className="text-bamboo-navy font-medium block">Google Ads Only</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Most freelancers specialize in just one or two platforms, leaving your business with limited reach and opportunities.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Problem;
