
import { Compass, Brush, Settings, Tag, ChartLine } from "lucide-react";

const steps = [
  {
    title: "Strategy & Planning",
    description: "Define your target audience, objectives, and campaign strategy",
    icon: Compass,
  },
  {
    title: "Creative Production",
    description: "Create engaging ads and content that resonate with your audience",
    icon: Brush,
  },
  {
    title: "Campaign Setup",
    description: "Configure and launch your campaigns across multiple platforms",
    icon: Settings,
  },
  {
    title: "Website Tagging",
    description: "Implement tracking to measure campaign performance accurately",
    icon: Tag,
  },
  {
    title: "Reporting & Optimization",
    description: "Monitor results and optimize for better performance",
    icon: ChartLine,
  }
];

const CampaignSteps = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-bamboo-navy mb-12">
          Launch a Campaign Today
        </h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-bamboo-primary/20 hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="flex flex-col md:flex-row gap-6 items-start relative"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-bamboo-primary/10 flex items-center justify-center relative z-10">
                  <step.icon className="w-8 h-8 text-bamboo-primary" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-bamboo-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSteps;

