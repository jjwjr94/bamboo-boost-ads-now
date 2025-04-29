
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <Container bordered>
        <div className="py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/4983989c-4636-47bd-bab7-f66d5e9199d0.png" 
              alt="Bamboo AI Logo" 
              className="h-12" 
            />
          </Link>

          {/* Center Navigation */}
          <div className="flex gap-4 items-center">
            <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">About</Button>
            <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Features</Button>
            <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Pricing</Button>
          </div>
          
          {/* Right Navigation */}
          <div className="flex gap-4 items-center">
            <Link to="/chat">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">App</Button>
            </Link>
            <Link to="/chat">
              <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
