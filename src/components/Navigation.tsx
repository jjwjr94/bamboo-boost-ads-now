
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/f48ca43c-3069-4913-abbf-01123a4b8ca1.png" alt="Bamboo AI Logo" className="h-8" />
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
