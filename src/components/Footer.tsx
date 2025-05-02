
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
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bamboo AI. All rights reserved.
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/feedback">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <HelpCircle className="h-15 w-15" />
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
