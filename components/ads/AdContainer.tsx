'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { isMonetizableRoute } from './AdSenseScript';

interface AdContainerProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  minHeight?: string | number;
}

/**
 * AdContainer provides stable layout reservations to avoid Cumulative Layout Shift (CLS)
 * and labels the advertisement block clearly in accordance with Google AdSense policy.
 */
export const AdContainer: React.FC<AdContainerProps> = ({
  children,
  className = '',
  label = 'Advertisement',
  minHeight = '120px',
}) => {
  const pathname = usePathname();
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  const isEligible =
    adsEnabled &&
    publisherId &&
    publisherId !== 'ca-pub-YOUR_PUBLISHER_ID' &&
    isMonetizableRoute(pathname);

  // When ads are disabled or route is ineligible, render nothing (no empty placeholder boxes)
  if (!isEligible) {
    return null;
  }

  return (
    <aside
      aria-label={label}
      className={`w-full my-6 flex flex-col items-center justify-center transition-all ${className}`}
      style={{ minHeight }}
    >
      <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1">
        {label}
      </span>
      <div className="w-full flex justify-center overflow-hidden">{children}</div>
    </aside>
  );
};

