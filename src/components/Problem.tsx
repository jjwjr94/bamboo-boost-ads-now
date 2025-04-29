
import React from "react";

const Problem = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
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
          <h2 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-8">
            Growing Your Small Business is Hard
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Small business owners face countless challenges with limited resources. Marketing effectively, 
            creating professional ads, and reaching the right audience can be overwhelming and expensive.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
