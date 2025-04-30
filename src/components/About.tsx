
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Twitter } from "lucide-react";

const About = () => {
  return (
    <div className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/4 flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage
                src="/lovable-uploads/ee7f1b89-e60e-4121-8fb6-dba324f20c21.png"
                alt="Jay, founder of Bamboo"
                className="object-cover"
              />
              <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://www.linkedin.com/in/james-jay-wong-6696567b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-bamboo-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://x.com/jayjeffwong" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-bamboo-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-3/4 space-y-8">
            <h2 className="text-3xl font-bold text-bamboo-navy">
             Story
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Hi, I'm Jay, founder of Bamboo.
                I've spent the past decade in advertising product and operations, responsible for billions in ad spend across channels. Before Bamboo, I was Ad Product Lead at Roku and spent five years at a top agency working with Fortune 100 clients.
              </p>
              <p>
                I built Bamboo to level the playing field — using AI to give small and medium-sized businesses access to the same growth resources that were once out of reach due to cost, complexity, and technical barriers.
              </p>
              <p>
                Bamboo is your AI-powered ad agency, making it incredibly simple to strategize, create, launch, and measure ad campaigns — so any business decision-maker can grow like the best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
