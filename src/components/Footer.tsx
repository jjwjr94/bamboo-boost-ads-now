
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="border-t py-6">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bamboo AI. All rights reserved.
            </div>
            <Link 
              to="/privacy-policy" 
              className="text-sm text-muted-foreground hover:text-bamboo-navy transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/feedback">
<Button variant="ghost" className="rounded-full p-0 w-20 h-20">
  <HelpCircle
    className="text-bamboo-navy"
    style={{ width: "36px", height: "36px" }} // forces icon size
  />
  <span className="sr-only">Feedback</span>
</Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Provide Feedback</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
