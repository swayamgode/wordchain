'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { isMonetizableRoute } from './AdSenseScript';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style,
}) => {
  const pathname = usePathname();
  const adPushed = useRef(false);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  const isEligible =
    adsEnabled &&
    publisherId &&
    publisherId !== 'ca-pub-YOUR_PUBLISHER_ID' &&
    isMonetizableRoute(pathname);

  useEffect(() => {
    if (!isEligible || adPushed.current) return;

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushed.current = true;
      }
    } catch {
      // Gracefully catch duplicate or uninitialized AdSense errors
    }
  }, [isEligible, pathname]);

  if (!isEligible) {
    return null;
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...(style || {}) }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

