'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Routes where advertisements are strictly prohibited:
 * - Active gameplay routes
 * - Real-time rooms & matchmaking
 * - Interactive game screens (practice, local, room, matchmaking)
 */
const GAMEPLAY_ROUTE_PATTERNS = [
  /^\/room\/.+/,
  /^\/color-clash\/room\/.+/,
  /^\/matchmaking(\/.*)?$/,
];

export function isMonetizableRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return !GAMEPLAY_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
}

function AdSenseScriptInner() {
  const pathname = usePathname();
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const scriptInjected = useRef(false);

  // Strictly respect disabling and publisher ID requirement
  const canLoad =
    adsEnabled &&
    publisherId &&
    publisherId !== 'ca-pub-YOUR_PUBLISHER_ID' &&
    isMonetizableRoute(pathname);

  useEffect(() => {
    if (canLoad && !scriptInjected.current) {
      scriptInjected.current = true;
    }
  }, [canLoad]);

  if (!canLoad) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}

export const AdSenseScript: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <AdSenseScriptInner />
    </Suspense>
  );
};
