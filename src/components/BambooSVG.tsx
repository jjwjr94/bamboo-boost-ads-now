
import React from 'react';

interface BambooSVGProps {
  className?: string;
  position?: 'left' | 'right';
}

const BambooSVG: React.FC<BambooSVGProps> = ({ className, position = 'left' }) => {
  return (
    <div className={className}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox={position === 'left' ? "0 0 300 1200" : "500 0 300 1200"} 
        preserveAspectRatio="xMinYMin meet"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`overflow-visible bamboo-${position}`}
      >
        <style>
          {`
          @keyframes slideUp {
            0% {
              transform: translateY(1200px);
              opacity: 0;
            }
            100% {
              transform: translateY(0px);
              opacity: 1;
            }
          }

          @keyframes sway {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(1deg); }
            100% { transform: rotate(0deg); }
          }

          .bamboo-left #bambooGroup {
            animation:
              slideUp 2.0s ease-out forwards,
              sway 6s ease-in-out infinite 2.0s;
            transform-origin: left bottom;
          }

          .bamboo-right #bambooGroup {
            animation:
              slideUp 2.0s ease-out forwards,
              sway 6s ease-in-out infinite 2.0s;
            transform-origin: right bottom;
          }
          `}
        </style>
        <g>
          <g id="bambooGroup">
            {position === 'left' ? (
              // Left side bamboo
              <>
                <path fillRule="evenodd" clipRule="evenodd" d="M158.155 179.993C157.037 174.837 162.161 170.54 167.048 172.536L194 183.545C206.093 186.414 219.797 195.305 231.088 208.752C250.445 231.808 255.38 259.52 242.111 270.647C228.842 281.774 202.393 272.105 183.036 249.049C172.643 236.67 166.409 222.95 164.917 211.174L158.155 179.993ZM180.015 200.235L223.761 252.339L228.2 248.616L184.454 196.512L180.015 200.235Z" fill="#00C39C"/>
                <path d="M256.726 120.001H343.65V321.258H256.726V120.001Z" fill="#00C39C"/>
                <path d="M343.973 335.149L256.752 345.693V237.381H343.973V335.149Z" fill="#00C39C"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M158.155 642.993C157.037 637.837 162.161 633.54 167.048 635.536L194 646.545C206.093 649.414 219.797 658.305 231.088 671.752C250.445 694.808 255.38 722.52 242.111 733.647C228.842 744.774 202.393 735.105 183.036 712.049C172.643 699.67 166.409 685.95 164.917 674.174L158.155 642.993ZM180.015 663.235L223.761 715.339L228.2 711.616L184.454 659.512L180.015 663.235Z" fill="#00C39C"/>
                <path d="M256.726 583.001H343.65V784.258H256.726V583.001Z" fill="#00C39C"/>
                <path d="M343.973 798.149L256.752 808.693V700.381H343.973V798.149Z" fill="#00C39C"/>
              </>
            ) : (
              // Right side bamboo
              <>
                <path fillRule="evenodd" clipRule="evenodd" d="M742.403 -56.0434C743.521 -61.1995 738.397 -65.4966 733.511 -63.5008L706.558 -52.4917C694.465 -49.6226 680.761 -40.7318 669.47 -27.2842C650.113 -4.22855 645.178 23.4831 658.447 34.6107C671.717 45.7378 698.165 36.0681 717.522 13.0127C727.915 0.634045 734.149 -13.0868 735.642 -24.8623L742.403 -56.0434ZM720.544 -35.8016L676.798 16.3026L672.358 12.5798L716.104 -39.5244L720.544 -35.8016Z" fill="#00C39C"/>
                <path d="M644.247 108.608H557.323V-92.6498H644.247V108.608Z" fill="#00C39C"/>
                <path d="M557 -106.541L644.221 -117.084V-8.77226H557V-106.541Z" fill="#00C39C"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M742.403 406.957C743.521 401.8 738.397 397.503 733.511 399.499L706.558 410.508C694.465 413.377 680.761 422.268 669.47 435.716C650.113 458.771 645.178 486.483 658.447 497.611C671.717 508.738 698.165 499.068 717.522 476.013C727.915 463.634 734.149 449.913 735.642 438.138L742.403 406.957ZM720.544 427.198L676.798 479.303L672.358 475.58L716.104 423.476L720.544 427.198Z" fill="#00C39C"/>
                <path d="M644.247 571.608H557.323V370.35H644.247V571.608Z" fill="#00C39C"/>
                <path d="M557 356.459L644.221 345.916V454.228H557V356.459Z" fill="#00C39C"/>
              </>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BambooSVG;
