
import { Compass, Brush, Settings, Tag, ChartLine } from "lucide-react";

const steps = [
  {
    title: "Strategy & Planning",
    description: "A 24/7 on-call CMO at your fingertips.",
    icon: Compass,
  },
  {
    title: "Creative Production",
    description: "Generate hundreds of creative variations in minutes. Like having dozens of creative agencies compete for your business.",
    icon: Brush,
  },
  {
    title: "Campaign Setup",
    description: "Agent-led campaign creation. Marketing expert quality assured.",
    icon: Settings,
  },
  {
    title: "Website Tagging",
    description: "Automated pixel placement to measure and optimize to outcomes across channels.",
    icon: Tag,
  },
  {
    title: "Reporting & Optimization",
    description: "Talk directly to your data. Simple weekly reports directly in your inbox.",
    icon: ChartLine,
  }
];

const CampaignSteps = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-bamboo-navy mb-12">
          Launch Ads Today. <span className="underline">No Waiting.</span>
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

