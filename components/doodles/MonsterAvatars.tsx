'use client';

import React from 'react';

export interface MonsterProps {
  id?: string;
  className?: string;
  size?: number | string;
  mood?: 'happy' | 'worried' | 'dizzy' | 'celebrate' | 'focused';
}

/**
 * MONTY: Iconic yellow three-toothed happy horned monster from design reference
 */
export const MontyMonster: React.FC<MonsterProps> = ({
  className = '',
  size = 64,
  mood = 'happy',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-200 ${className}`}
    >
      {/* Body */}
      <rect
        x="24"
        y="30"
        width="72"
        height="68"
        rx="28"
        fill="#FFC928"
        stroke="#111111"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Horns / Ears */}
      <path
        d="M28 32 C18 16 10 24 16 38"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="#FFC928"
      />
      <path
        d="M92 32 C102 16 110 24 104 38"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="#FFC928"
      />

      {/* Eyes depending on mood */}
      {mood === 'dizzy' ? (
        <g stroke="#111111" strokeWidth="4" strokeLinecap="round">
          <line x1="38" y1="46" x2="50" y2="58" />
          <line x1="50" y1="46" x2="38" y2="58" />
          <line x1="70" y1="46" x2="82" y2="58" />
          <line x1="82" y1="46" x2="70" y2="58" />
        </g>
      ) : mood === 'worried' ? (
        <g>
          <ellipse cx="44" cy="50" rx="8" ry="10" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
          <circle cx="44" cy="53" r="4" fill="#111111" />
          <ellipse cx="76" cy="50" rx="8" ry="10" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
          <circle cx="76" cy="53" r="4" fill="#111111" />
          {/* Sweat drop */}
          <path d="M96 44 C96 48 93 51 90 51 C87 51 86 48 88 44 C89 42 95 38 96 44 Z" fill="#48CAE4" />
        </g>
      ) : (
        <g>
          {/* Big Cartoon Eyes */}
          <ellipse cx="44" cy="50" rx="9" ry="11" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
          <circle cx="46" cy="50" r="4.5" fill="#111111" />
          <circle cx="48" cy="48" r="1.5" fill="#FFFFFF" />

          <ellipse cx="76" cy="50" rx="9" ry="11" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
          <circle cx="74" cy="50" r="4.5" fill="#111111" />
          <circle cx="72" cy="48" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* Mouth */}
      {mood === 'worried' ? (
        <path
          d="M44 78 Q60 68 76 78"
          stroke="#111111"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      ) : mood === 'dizzy' ? (
        <path
          d="M46 76 Q60 84 74 76"
          stroke="#111111"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <g>
          {/* Jagged / Toothy Mouth */}
          <path
            d="M40 70 C40 85 80 85 80 70 Z"
            fill="#111111"
            stroke="#111111"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Teeth */}
          <polygon points="46,70 51,76 56,70" fill="#FFFFFF" />
          <polygon points="57,70 62,77 67,70" fill="#FFFFFF" />
          <polygon points="68,70 73,76 78,70" fill="#FFFFFF" />
        </g>
      )}

      {/* Raised Arms */}
      <path
        d="M24 64 C14 62 10 52 14 42"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M96 64 C106 62 110 52 106 42"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Feet */}
      <rect x="36" y="96" width="16" height="12" rx="6" fill="#FFC928" stroke="#111111" strokeWidth="5" />
      <rect x="68" y="96" width="16" height="12" rx="6" fill="#FFC928" stroke="#111111" strokeWidth="5" />
    </svg>
  );
};

/**
 * GLOOP: Quirky tentacle monster with multiple cartoon eyes
 */
export const GloopMonster: React.FC<MonsterProps> = ({
  className = '',
  size = 64,
  mood = 'happy',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-200 ${className}`}
    >
      {/* Tentacle Body */}
      <path
        d="M26 88 C20 44 34 22 60 22 C86 22 100 44 94 88 C90 98 80 100 74 90 C68 80 62 80 60 92 C58 80 52 80 46 90 C40 100 30 98 26 88 Z"
        fill="#80ED99"
        stroke="#111111"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Multiple Eyes */}
      <circle cx="42" cy="46" r="9" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
      <circle cx="44" cy="46" r="4" fill="#111111" />

      <circle cx="78" cy="46" r="9" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
      <circle cx="76" cy="46" r="4" fill="#111111" />

      <circle cx="60" cy="36" r="11" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
      <circle cx="60" cy="37" r="5" fill="#111111" />
      <circle cx="62" cy="35" r="1.5" fill="#FFFFFF" />

      {/* Mouth */}
      {mood === 'dizzy' ? (
        <path d="M48 68 Q60 60 72 68" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
      ) : (
        <ellipse cx="60" cy="66" rx="10" ry="7" fill="#111111" />
      )}
    </svg>
  );
};

/**
 * FANG: Giant single-eyed cyclops with cute vampire tooth
 */
export const FangMonster: React.FC<MonsterProps> = ({
  className = '',
  size = 64,
  mood = 'happy',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-200 ${className}`}
    >
      {/* Body */}
      <path
        d="M30 40 C30 20 90 20 90 40 C95 75 92 94 84 96 C70 96 50 96 36 96 C28 94 25 75 30 40 Z"
        fill="#FF9F1C"
        stroke="#111111"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Top Antenna */}
      <line x1="60" y1="20" x2="60" y2="8" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="6" r="5" fill="#FFC928" stroke="#111111" strokeWidth="4" />

      {/* One Giant Cyclops Eye */}
      <circle cx="60" cy="48" r="18" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
      {mood === 'dizzy' ? (
        <g stroke="#111111" strokeWidth="4" strokeLinecap="round">
          <line x1="53" y1="41" x2="67" y2="55" />
          <line x1="67" y1="41" x2="53" y2="55" />
        </g>
      ) : (
        <>
          <circle cx="60" cy="48" r="9" fill="#111111" />
          <circle cx="63" cy="45" r="3" fill="#FFFFFF" />
        </>
      )}

      {/* Mouth with cute fangs */}
      <path
        d="M44 76 Q60 88 76 76"
        stroke="#111111"
        strokeWidth="5"
        strokeLinecap="round"
        fill="#111111"
      />
      <polygon points="50,76 53,83 56,76" fill="#FFFFFF" />
      <polygon points="64,76 67,83 70,76" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * CYCLOPS: Violet friendly round monster
 */
export const CyclopsMonster: React.FC<MonsterProps> = ({
  className = '',
  size = 64,
  mood = 'happy',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-200 ${className}`}
    >
      <circle cx="60" cy="60" r="38" fill="#9D4EDD" stroke="#111111" strokeWidth="6" />
      {/* Horns */}
      <polygon points="40,26 46,14 52,26" fill="#FFD166" stroke="#111111" strokeWidth="4" />
      <polygon points="68,26 74,14 80,26" fill="#FFD166" stroke="#111111" strokeWidth="4" />

      {/* Eyes */}
      <circle cx="48" cy="54" r="8" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
      <circle cx="50" cy="54" r="4" fill="#111111" />
      <circle cx="72" cy="54" r="8" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
      <circle cx="70" cy="54" r="4" fill="#111111" />

      {/* Smile */}
      <path
        d="M46 72 Q60 84 74 72"
        stroke="#111111"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * CHOMP: Pink wide smiling toothy creature
 */
export const ChompMonster: React.FC<MonsterProps> = ({
  className = '',
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-200 ${className}`}
    >
      <rect x="25" y="25" width="70" height="70" rx="35" fill="#FF5D8F" stroke="#111111" strokeWidth="6" />
      {/* Big Eyes */}
      <circle cx="45" cy="46" r="10" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
      <circle cx="47" cy="46" r="4" fill="#111111" />
      <circle cx="75" cy="46" r="10" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
      <circle cx="73" cy="46" r="4" fill="#111111" />

      {/* Huge Toothy Smile */}
      <rect x="40" y="65" width="40" height="18" rx="9" fill="#111111" />
      <polygon points="45,65 48,72 51,65" fill="#FFFFFF" />
      <polygon points="54,65 57,72 60,65" fill="#FFFFFF" />
      <polygon points="63,65 66,72 69,65" fill="#FFFFFF" />
      <polygon points="72,65 75,72 78,65" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * ZIPPY: Electric bright cyan monster with lightning bolt
 */
export const ZippyMonster: React.FC<MonsterProps> = ({
  className = '',
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-200 ${className}`}
    >
      <path
        d="M32 30 C32 20 88 20 88 30 L94 85 C94 95 26 95 26 85 Z"
        fill="#00F5D4"
        stroke="#111111"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Lightning bolt hair */}
      <path
        d="M60 20 L66 8 L58 10 L64 2"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <circle cx="46" cy="48" r="8" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
      <circle cx="48" cy="48" r="4" fill="#111111" />
      <circle cx="74" cy="48" r="8" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
      <circle cx="72" cy="48" r="4" fill="#111111" />

      {/* Cute tongue */}
      <path d="M48 68 Q60 80 72 68" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M56 73 C56 81 64 81 64 73 Z" fill="#FF6B6B" stroke="#111111" strokeWidth="3" />
    </svg>
  );
};

export const MONSTER_LIST = [
  { id: 'monty', name: 'Monty', Component: MontyMonster, color: '#FFC928' },
  { id: 'gloop', name: 'Gloop', Component: GloopMonster, color: '#80ED99' },
  { id: 'fang', name: 'Fang', Component: FangMonster, color: '#FF9F1C' },
  { id: 'cyclops', name: 'Cyclops', Component: CyclopsMonster, color: '#9D4EDD' },
  { id: 'chomp', name: 'Chomp', Component: ChompMonster, color: '#FF5D8F' },
  { id: 'zippy', name: 'Zippy', Component: ZippyMonster, color: '#00F5D4' },
];

export const MonsterAvatar: React.FC<MonsterProps> = ({
  id = 'monty',
  size = 56,
  className = '',
  mood = 'happy',
}) => {
  switch (id) {
    case 'gloop':
      return <GloopMonster size={size} className={className} mood={mood} />;
    case 'fang':
      return <FangMonster size={size} className={className} mood={mood} />;
    case 'cyclops':
      return <CyclopsMonster size={size} className={className} mood={mood} />;
    case 'chomp':
      return <ChompMonster size={size} className={className} mood={mood} />;
    case 'zippy':
      return <ZippyMonster size={size} className={className} mood={mood} />;
    case 'monty':
    default:
      return <MontyMonster size={size} className={className} mood={mood} />;
  }
};
