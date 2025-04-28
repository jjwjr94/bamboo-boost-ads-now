
import { cn } from "@/lib/utils";

interface ToolProps {
  name: string;
  logo: string;
  className?: string;
}

const tools = [
  {
    name: "ArcAds",
    logo: "/lovable-uploads/05db8896-5f4d-4c11-96b8-a51df3f422c0.png",
  },
  {
    name: "Billo",
    logo: "/lovable-uploads/3ec659bd-36d5-4a17-87b4-6c0a6782352b.png",
  },
  {
    name: "Icon",
    logo: "/lovable-uploads/0f7ef381-cd49-4568-b2a9-2e4c76924003.png",
  },
  {
    name: "AdCreative.ai",
    logo: "/lovable-uploads/6d16446a-d0d4-4f1f-8787-f003a1dc57f3.png",
  },
  {
    name: "Foreplay",
    logo: "/lovable-uploads/4e39041b-a8ef-46be-ad5d-d55ef2aae10a.png",
  },
  {
    name: "AdManage.ai",
    logo: "/lovable-uploads/25b82aba-2dcb-4a3a-816f-be13c379451b.png",
  },
  {
    name: "MakeUGC",
    logo: "/lovable-uploads/98dc43a2-a5b8-4cfa-8246-e57f6cd80a3a.png",
  },
];

const ToolLogo = ({ name, logo, className }: ToolProps) => (
  <div className={cn("flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow", className)}>
    <div className="h-16 w-16 flex items-center justify-center">
      <img 
        src={logo} 
        alt={`${name} logo`} 
        className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
      />
    </div>
  </div>
);

const AiTools = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-bamboo-navy mb-12">
          All AI Ads Tools from One Source
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {tools.map((tool) => (
            <ToolLogo key={tool.name} name={tool.name} logo={tool.logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiTools;
