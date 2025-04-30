
import { CheckCircle } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      title: "AI-Powered Ad Creation",
      description: "Generate compelling ad copy and visuals tailored to your business using advanced AI algorithms."
    },
    {
      title: "Campaign Automation",
      description: "Set up and manage your advertising campaigns with minimal effort through smart automation."
    },
    {
      title: "Performance Analytics",
      description: "Track and analyze your ad performance with easy-to-understand metrics and insights."
    },
    {
      title: "Multi-Platform Support",
      description: "Launch campaigns across multiple social media and advertising platforms from a single dashboard."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-4">
            Why Choose <span className="text-bamboo-primary">Bamboo AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with intuitive design to make advertising simple and effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="text-bamboo-primary mr-2" />
                <h3 className="font-bold text-xl text-bamboo-navy">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
