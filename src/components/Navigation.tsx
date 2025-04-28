
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/4983989c-4636-47bd-bab7-f66d5e9199d0.png" 
            alt="Bamboo AI Logo" 
            className="h-12" // Changed from h-8 to h-12 (50% increase)
          />
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">About</Button>
          <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Features</Button>
          <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Pricing</Button>
          <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
