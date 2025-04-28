
import { Youtube, Facebook } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Platforms = () => {
  const [api, setApi] = useState<any>();
  const platforms = ["YouTube", "Meta", "TikTok"];

  useEffect(() => {
    if (!api) return;

    // Auto-rotate every 2 seconds
    const autoRotate = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(autoRotate);
  }, [api]);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-12">
          Launch ads on{" "}
          <span className="inline-block w-32">
            <Carousel setApi={setApi} opts={{ loop: true }}>
              <CarouselContent>
                {platforms.map((platform) => (
                  <CarouselItem key={platform} className="flex justify-center">
                    <span className="text-bamboo-primary">{platform}</span>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </span>
        </h2>
        <div className="flex flex-wrap justify-center gap-12 items-center">
          <div className="flex flex-col items-center">
            <Youtube className="h-16 w-16 text-bamboo-primary" />
            <span className="mt-2 text-lg font-medium">YouTube</span>
          </div>
          <div className="flex flex-col items-center">
            <Facebook className="h-16 w-16 text-bamboo-primary" />
            <span className="mt-2 text-lg font-medium">Meta</span>
          </div>
          <div className="flex flex-col items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-bamboo-primary"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
            <span className="mt-2 text-lg font-medium">TikTok</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
