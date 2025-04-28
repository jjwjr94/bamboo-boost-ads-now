
import { DollarSign, Users, ChartBar, Youtube, Facebook } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Multi-Platform Advertising",
      description: "Launch ads where your audience is.",
      icon: () => (
        <div className="flex gap-4 items-center">
          <Youtube className="h-8 w-8 text-bamboo-primary" />
          <Facebook className="h-8 w-8 text-bamboo-primary" />
          <svg
            className="h-8 w-8 text-bamboo-primary"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12.18v0c0-4 1.558-8.18 6.18-8.18v0c4.622 0 6.18 4.18 6.18 8.18v0c0 4-1.558 8.18-6.18 8.18v0c-4.622 0-6.18-4.18-6.18-8.18z" />
            <path d="M12 12l4 4.5" />
            <path d="M12 12l-4 4.5" />
            <path d="M12 8v4" />
          </svg>
        </div>
      ),
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
      icon: Users,
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {typeof feature.icon === 'function' ? 
                feature.icon() : 
                <feature.icon className="h-12 w-12 text-bamboo-primary mb-4" />
              }
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
