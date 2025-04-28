
import { DollarSign, Users, ChartBar, MousePointer } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "XX",
      description: "Launch ads where your audience is.",
      icon: MousePointer,
    },
    {
      title: "Drive Conversions",
      description: "Grow your business with AI-powered targeting and optimization",
      icon: ChartBar,
    },
    {
      title: "Zero Upfront Costs",
      description: "Start advertising with no initial investment required",
      icon: DollarSign,
    },
    {
      title: "No Technical Knowledge",
      description: "Launch effective ad campaigns without any marketing expertise",
      icon: MousePointer,
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="h-12 w-12 text-bamboo-primary mb-4" />
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
