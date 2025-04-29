
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 items-center">
            <a href="#about" className="inline-block">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">About</Button>
            </a>
            <a href="#solution" className="inline-block">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Features</Button>
            </a>
            <a href="#pricing" className="inline-block">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Pricing</Button>
            </a>
          </div>
          
          {/* Desktop Right Navigation */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link to="/chat">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">App</Button>
            </Link>
            <Link to="/chat">
              <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu (Expanded) */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white flex flex-col w-full py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <a href="#about" className="inline-block" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">About</Button>
              </a>
              <a href="#solution" className="inline-block" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">Features</Button>
              </a>
              <a href="#pricing" className="inline-block" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">Pricing</Button>
              </a>
              <Link to="/chat" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">App</Button>
              </Link>
              <Link to="/chat" onClick={toggleMenu}>
                <Button className="w-full justify-start bg-bamboo-primary hover:bg-bamboo-secondary text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navigation;
