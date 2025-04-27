
import { Youtube, Facebook, TiktokIcon } from "lucide-react";

const Platforms = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-bamboo-navy mb-12">
          Launch ads on major platforms today. No waiting.
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
            <TiktokIcon className="h-16 w-16 text-bamboo-primary" />
            <span className="mt-2 text-lg font-medium">TikTok</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
