
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import About from "../components/About";
import AiTools from "../components/AiTools";
import AdsSimplified from "../components/AdsSimplified";
import CampaignSteps from "../components/CampaignSteps";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import { Container } from "../components/ui/container";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="pt-16 flex-1">
        <Container bordered>
          <Hero />
          <Problem />
          <div id="solution">
            <Solution />
            <div id="about">
              <About />
            </div>
            <AiTools />
            <AdsSimplified />
            <CampaignSteps />
            <Features />
          </div>
          <div id="pricing">
            <Pricing />
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
