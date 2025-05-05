
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

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
  {
    name: "Runway",
    logo: "/lovable-uploads/28534fde-35f0-461e-bde6-42e6789351df.png",
  },
  {
    name: "Midjourney",
    logo: "/lovable-uploads/e01fe29b-4535-4385-bb3f-5e31b214483d.png",
  },
  {
    name: "Pencil AI",
    logo: "/lovable-uploads/a93c1ba3-8974-40e9-a3f0-1905227adadd.png",
  },
  {
    name: "Copy AI",
    logo: "/lovable-uploads/d0cfa4e0-b9a7-4626-8567-86ff12dc685d.png",
  },
  {
    name: "Postless",
    logo: "/lovable-uploads/c2dbb6dc-6dcd-40b0-a681-c1316675666c.png",
  },
  {
    name: "Hunch",
    logo: "/lovable-uploads/4ad46b9d-5907-4244-96a3-9d97583d897c.png",
  },
  {
    name: "Kular",
    logo: "/lovable-uploads/f1216895-a44b-462b-ada3-3ccfb4c98d31.png",
  },
  {
    name: "Rehook",
    logo: "/lovable-uploads/e1f84740-a400-49ee-baab-d7a897b01593.png",
  },
  {
    name: "Syllaby",
    logo: "/lovable-uploads/dffbff21-21c9-4b5f-9f06-8aa5a8eaa3d4.png",
  },
];

const ToolLogo = ({ name, logo, className }: ToolProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "flex items-center justify-center p-2 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow", 
          className
        )}>
          <div className={cn(
            "flex items-center justify-center",
            isMobile ? "h-10 w-10" : "h-16 w-16"
          )}>
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="font-medium">{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const AiTools = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-bamboo-navy mb-12">
          All the Best AI Tools, Unified
        </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Stop paying for dozens of tools. Get the best from one place.
            </p>
        <TooltipProvider>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 sm:gap-4">
            {tools.map((tool) => (
              <ToolLogo key={tool.name} name={tool.name} logo={tool.logo} />
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default AiTools;
