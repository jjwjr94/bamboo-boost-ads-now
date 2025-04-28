
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Platforms from "../components/Platforms";
import About from "../components/About";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Platforms />
      <About />
    </div>
  );
};

export default Index;

