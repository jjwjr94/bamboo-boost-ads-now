
import React from "react";
import { Brain, ChartBar, Youtube, Facebook, DollarSign } from "lucide-react";

type FeatureIcon = 
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | (() => JSX.Element);

interface Feature {
  title: string;
  description: string;
  icon: FeatureIcon;
}

const features: Feature[] = [
  {
    title: "Zero Technical Knowledge Required",
    description: "No learning UIs, jargon or handholding freelancers.",
    icon: Brain,
  },
  {
    title: "Cross Channel",
    description: "Launch ads across Google, YouTube, Meta, TikTok and more.",
    icon: () => (
      <div className="flex gap-4 items-center">
        <Youtube className="h-8 w-8 text-bamboo-primary" />
        <Facebook className="h-8 w-8 text-bamboo-primary" />
        <img 
          src="/lovable-uploads/057375d3-5b67-4b7d-9870-406f3d8b07e2.png" 
          alt="TikTok"
          className="h-8 w-8"
        />
      </div>
    ),
  },
  {
    title: "Drive Conversions",
    description: "Ads that lead to real business outcomes. Minimize wasted ad spend.",
    icon: ChartBar,
  },
  {
    title: "Affordable Pricing",
    description: "Pricing designed for Small and Medium Business.",
    icon: DollarSign,
  },
];

const Features = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {React.isValidElement(feature.icon) ? (
                // It's already a React element
                feature.icon
              ) : typeof feature.icon === 'function' ? (
                // It's a function that returns JSX or a Lucide icon component
                typeof feature.icon.prototype?.isReactComponent !== 'undefined' ? (
                  <feature.icon className="h-12 w-12 text-bamboo-primary mb-4" />
                ) : (
                  feature.icon()
                )
              ) : (
                <div>Icon Error</div>
              )}
              <h3 className="text-xl font-semibold text-bamboo-navy mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
