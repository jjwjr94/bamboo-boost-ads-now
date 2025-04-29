
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import CampaignSteps from "../components/CampaignSteps";
import Features from "../components/Features";
import About from "../components/About";
import { Container } from "../components/ui/container";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Container bordered>
        <Hero />
        <AiTools />
        <CampaignSteps />
        <Features />
        <About />
      </Container>
    </div>
  );
};

export default Index;
