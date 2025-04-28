
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CampaignSteps from "../components/CampaignSteps";
import About from "../components/About";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <CampaignSteps />
      <About />
    </div>
  );
};

export default Index;

