import type { NextConfig } from 'next';

/**
 * Security headers for production (Vercel + securityheaders.com).
 * CSP is intentionally pragmatic for Next.js App Router, next-themes,
 * Vercel Analytics/Speed Insights, and external avatar/project images.
 */
const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js hydration + next-themes inline bootstrap; Vercel scripts
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  // Tailwind / styled inline attributes
  "style-src 'self' 'unsafe-inline'",
  // Brand assets + remote avatars / covers (GitHub, Unsplash, etc.)
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // Analytics beacons + same-origin navigations/actions
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'browsing-topics=()',
      'interest-cohort=()',
      'payment=()',
      'usb=()',
    ].join(', '),
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
