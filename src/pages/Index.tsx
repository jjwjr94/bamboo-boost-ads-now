
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import CampaignSteps from "../components/CampaignSteps";
import Features from "../components/Features";


import About from "../components/About";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <CampaignSteps />
      <AiTools />
      <About />
    </div>
  );
};

export default Index;
