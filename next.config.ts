import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // WebP/AVIF für kleinere Dateien
    formats: ['image/avif', 'image/webp'],

    // Optimierte Device Sizes
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],

    // Längerer Cache = weniger Re-Optimierung
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 Tage
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Schnellere Builds
  experimental: {
    // Parallele Kompilierung
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
  },
};

export default nextConfig;
