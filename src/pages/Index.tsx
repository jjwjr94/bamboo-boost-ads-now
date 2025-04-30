
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import AdsSimplified from "../components/AdsSimplified";
import AiTools from "../components/AiTools";
import CampaignSteps from "../components/CampaignSteps";
import Features from "../components/Features";
import About from "../components/About";
import Pricing from "../components/Pricing";
import { Container } from "../components/ui/container";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Container bordered>
          <Hero />
          <Problem />
          <div id="solution">
            <Solution />
            <AdsSimplified />
            <AiTools />
            <CampaignSteps />
            <Features />
          </div>
          <div id="pricing">
            <Pricing />
          </div>
          <div id="about">
            <About />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Index;

