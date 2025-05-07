
import { useEffect } from "react";
import Navigation from "../components/Navigation";

const Schedule = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Set up Calendly event listener for when an event is scheduled
    window.addEventListener('message', (e) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        if (e.data.event === 'calendly.event_scheduled') {
          // Get the event data and redirect to confirmation page
          const eventData = e.data.payload;
          const startTime = eventData.event.start_time;
          if (startTime) {
            window.location.href = `/meeting-confirmation?event_start_time=${encodeURIComponent(startTime)}`;
          }
        }
      }
    });

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
      window.removeEventListener('message', () => {});
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
