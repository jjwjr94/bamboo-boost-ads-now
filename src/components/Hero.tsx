import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <svg width="1500" height="855" viewBox="0 0 1500 855" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <g clip-path="url(#clip0_381_93)">
            <g clip-path="url(#clip1_381_93)" className="bamboo-section-1">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1552 312.992C28.0372 307.836 33.1611 303.539 38.0477 305.535L65.0003 316.544C77.0935 319.413 90.7975 328.304 102.088 341.751C121.445 364.807 126.38 392.519 113.111 403.646C99.8417 414.773 73.3931 405.104 54.0361 382.048C43.6432 369.67 37.4094 355.949 35.9165 344.173L29.1552 312.992ZM51.0146 333.234L94.7606 385.338L99.1998 381.615L55.4538 329.511L51.0146 333.234Z" fill="#00C39C"/>
              <path d="M127.726 253H214.65V454.257H127.726V253Z" fill="#00C39C"/>
              <path d="M214.973 468.148L127.752 478.692V370.38H214.973V468.148Z" fill="#00C39C"/>
            </g>
            <g clip-path="url(#clip2_381_93)" className="bamboo-section-2">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M424.892 234.498C424.046 229.29 429.387 225.267 434.163 227.516L460.502 239.921C472.429 243.419 485.649 253.015 496.22 267.035C514.344 291.072 517.821 319.004 503.988 329.422C490.155 339.839 464.249 328.799 446.125 304.762C436.394 291.856 430.887 277.828 430.012 265.99L424.892 234.498ZM445.662 255.856L486.621 310.178L491.249 306.693L450.29 252.371L445.662 255.856Z" fill="#00C39C"/>
              <path d="M526.468 179.747L613.273 184.296L602.74 385.278L515.935 380.729L526.468 179.747Z" fill="#00C39C"/>
              <path d="M602.335 399.167L514.681 405.131L520.35 296.967L607.452 301.532L602.335 399.167Z" fill="#00C39C"/>
            </g>
            <g clip-path="url(#clip3_381_93)" className="bamboo-section-3">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M788.184 313.842C786.887 308.728 791.858 304.254 796.811 306.079L824.132 316.14C836.317 318.586 850.323 326.993 862.076 340.038C882.226 362.404 888.125 389.927 875.253 401.511C862.38 413.094 835.61 404.353 815.46 381.987C804.641 369.979 797.933 356.484 796.03 344.768L788.184 313.842ZM810.737 333.308L856.275 383.854L860.581 379.979L815.043 329.433L810.737 333.308Z" fill="#00C39C"/>
              <path d="M884.601 250.446L971.473 247.413L978.496 448.547L891.625 451.581L884.601 250.446Z" fill="#00C39C"/>
              <path d="M979.304 462.418L892.503 476L888.723 367.754L975.892 364.71L979.304 462.418Z" fill="#00C39C"/>
            </g>
            <g clip-path="url(#clip4_381_93)" className="bamboo-section-4">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1170.16 312.993C1169.04 307.837 1174.16 303.54 1179.05 305.536L1206 316.545C1218.09 319.414 1231.8 328.305 1243.09 341.752C1262.45 364.808 1267.38 392.52 1254.11 403.647C1240.84 414.774 1214.39 405.105 1195.04 382.049C1184.64 369.67 1178.41 355.95 1176.92 344.174L1170.16 312.993ZM1192.01 333.235L1235.76 385.339L1240.2 381.616L1196.45 329.512L1192.01 333.235Z" fill="#00C39C"/>
              <path d="M1268.73 253.001H1355.65V454.258H1268.73V253.001Z" fill="#00C39C"/>
              <path d="M1355.97 468.149L1268.75 478.693V370.381H1355.97V468.149Z" fill="#00C39C"/>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_381_93">
              <rect width="1500" height="855" fill="white"/>
            </clipPath>
            <clipPath id="clip1_381_93">
              <rect width="375" height="855" fill="white"/>
            </clipPath>
            <clipPath id="clip2_381_93">
              <rect width="375" height="855" fill="white" transform="translate(375)"/>
            </clipPath>
            <clipPath id="clip3_381_93">
              <rect width="375" height="855" fill="white" transform="translate(750 -2)"/>
            </clipPath>
            <clipPath id="clip4_381_93">
              <rect width="375" height="853" fill="white" transform="translate(1125)"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
          The <span className="bg-gradient-to-r from-[#00D1A1] to-[#00B086] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Launch ads and grow your business today. No technical marketing knowledge required. No waiting around for overpriced freelancer.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-bamboo-primary hover:bg-bamboo-secondary text-white text-lg px-8 py-6">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
