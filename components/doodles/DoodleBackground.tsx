'use client';

import React from 'react';

export const TopoDoodlePattern: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.08,
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="topo-pattern"
            width="280"
            height="280"
            patternUnits="userSpaceOnUse"
          >
            {/* Topographic organic doodle contour curves */}
            <path
              d="M10 40 Q70 10 140 50 T270 30"
              stroke="#000000"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,6"
            />
            <path
              d="M20 90 Q100 60 170 100 T260 90"
              stroke="#000000"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 160 Q80 130 150 170 T280 150"
              stroke="#000000"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 220 Q90 190 180 230 T270 210"
              stroke="#000000"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,6"
            />

            {/* Little doodle stars and sparks */}
            <polygon
              points="60,30 63,36 70,37 65,42 66,48 60,45 54,48 55,42 50,37 57,36"
              fill="#111111"
            />
            <circle cx="210" cy="50" r="4" fill="#111111" />
            <circle cx="215" cy="55" r="2" fill="#111111" />

            <path
              d="M230 180 Q240 170 245 185"
              stroke="#111111"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <polygon
              points="120,240 122,245 127,246 123,250 124,255 120,252 116,255 117,250 113,246 118,245"
              fill="#111111"
            />
            {/* Crosshair doodle */}
            <circle cx="160" cy="80" r="8" stroke="#111111" strokeWidth="2" fill="none" />
            <line x1="160" y1="68" x2="160" y2="92" stroke="#111111" strokeWidth="2" />
            <line x1="148" y1="80" x2="172" y2="80" stroke="#111111" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
    </div>
  );
};

export const DoodleCrowdBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 600 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Layer of background monster outlines */}
        <g fill="#E5E3D8" stroke="#222222" strokeWidth="3">
          {/* Monster 1 */}
          <rect x="20" y="30" width="50" height="90" rx="25" />
          <circle cx="36" cy="55" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="37" cy="55" r="3" fill="#222222" />
          <circle cx="54" cy="55" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="53" cy="55" r="3" fill="#222222" />

          {/* Monster 2 - Cyclops */}
          <rect x="85" y="45" width="45" height="75" rx="22" />
          <circle cx="107" cy="65" r="9" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="107" cy="65" r="4" fill="#222222" />

          {/* Monster 3 - Tall Tentacle */}
          <rect x="145" y="15" width="55" height="105" rx="27" />
          <circle cx="162" cy="40" r="7" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="163" cy="40" r="3" fill="#222222" />
          <circle cx="182" cy="40" r="7" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="181" cy="40" r="3" fill="#222222" />
          <path d="M165 60 Q172 68 180 60" stroke="#222222" strokeWidth="3" fill="none" />

          {/* Monster 4 */}
          <rect x="215" y="40" width="48" height="80" rx="24" />
          <circle cx="230" cy="58" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="231" cy="58" r="3" fill="#222222" />
          <circle cx="248" cy="58" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="247" cy="58" r="3" fill="#222222" />

          {/* Monster 5 - Spiky */}
          <rect x="280" y="25" width="54" height="95" rx="27" />
          <circle cx="297" cy="50" r="8" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="297" cy="50" r="4" fill="#222222" />
          <circle cx="317" cy="50" r="8" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="317" cy="50" r="4" fill="#222222" />

          {/* Monster 6 - Big Tooth */}
          <rect x="350" y="35" width="52" height="85" rx="26" />
          <circle cx="366" cy="55" r="7" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="367" cy="55" r="3" fill="#222222" />
          <circle cx="386" cy="55" r="7" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="385" cy="55" r="3" fill="#222222" />
          <path d="M368 74 Q376 82 384 74" stroke="#222222" strokeWidth="3" fill="none" />

          {/* Monster 7 */}
          <rect x="420" y="20" width="50" height="100" rx="25" />
          <circle cx="436" cy="45" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="437" cy="45" r="3" fill="#222222" />
          <circle cx="454" cy="45" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="453" cy="45" r="3" fill="#222222" />

          {/* Monster 8 */}
          <rect x="485" y="40" width="46" height="80" rx="23" />
          <circle cx="508" cy="60" r="10" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="508" cy="60" r="5" fill="#222222" />

          {/* Monster 9 */}
          <rect x="545" y="30" width="45" height="90" rx="22" />
          <circle cx="560" cy="52" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="560" cy="52" r="3" fill="#222222" />
          <circle cx="576" cy="52" r="6" fill="#FFFFFF" stroke="#222222" strokeWidth="2" />
          <circle cx="576" cy="52" r="3" fill="#222222" />
        </g>
      </svg>
    </div>
  );
};
