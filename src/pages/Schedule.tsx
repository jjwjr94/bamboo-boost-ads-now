
import { useEffect } from "react";
import Navigation from "../components/Navigation";

const Schedule = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-bamboo-navy mb-8 text-center">
            Schedule a Consultation
          </h1>
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/jayjeffwong/bamboo-intro?text_color=ffffff&primary_color=00d1a1" 
            style={{ minWidth: "320px", height: "700px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
