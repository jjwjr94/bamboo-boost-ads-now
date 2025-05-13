
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import posthog from "posthog-js";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle hash navigation scrolling
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the # character and find the element
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      
      if (element) {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/') {
      // If we're on the home page without a hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  // Helper function to create section links
  const getSectionLink = (section: string) => {
    // If we're on the home page, use hash links; otherwise navigate to home with hash
    return location.pathname === '/' ? `#${section}` : `/#${section}`;
  };

  const handleGetStartedClick = () => {
    // Track the "Get Started" button click
    posthog.capture('get_started_clicked', { 
      location: location.pathname,
      source: 'navigation' 
    });
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <Container bordered={false}>
        <div className="py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/4983989c-4636-47bd-bab7-f66d5e9199d0.png" 
              alt="Bamboo AI Logo" 
              className="h-12" 
            />
          </Link>

          {/* Mobile Navigation Elements */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/chat" onClick={handleGetStartedClick}>
              <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white">Get Started</Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link to={getSectionLink("about")} className="inline-block">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">About</Button>
            </Link>
            <Link to={getSectionLink("solution")} className="inline-block">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Features</Button>
            </Link>
            <Link to={getSectionLink("pricing")} className="inline-block">
              <Button variant="ghost" className="text-bamboo-navy hover:text-bamboo-primary">Pricing</Button>
            </Link>
          </div>
          
          {/* Desktop Right Navigation - Removed Feedback and Onboarding links */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link to="/chat" onClick={handleGetStartedClick}>
              <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu (Expanded) - Removed Feedback and Onboarding links */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white flex flex-col w-full py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link to={getSectionLink("about")} onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">About</Button>
              </Link>
              <Link to={getSectionLink("solution")} onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">Features</Button>
              </Link>
              <Link to={getSectionLink("pricing")} onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-bamboo-navy hover:text-bamboo-primary">Pricing</Button>
              </Link>
              <Link to="/chat" onClick={() => { toggleMenu(); handleGetStartedClick(); }}>
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
