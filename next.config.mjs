/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Setup the bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {

  // trailingSlash: true,

  staticPageGenerationTimeout: 120,

  // Enable build caching
  cacheMaxMemorySize: 0, // Disable in-memory caching, use file system cache
  cacheHandler: undefined, // Use default file system cache

  // Target modern browsers to reduce polyfills
  experimental: {
    optimizeCss: true,
    cssChunking: 'strict', // Better CSS chunking strategy
  },

  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Compiler options for modern output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos"
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "harmonious-thrill-30f0c37241.media.strapiapp.com"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "abundant-car-e287c4d86f.media.strapiapp.com"
      }
    ],
    // Optimize image caching
    minimumCacheTTL: 31536000, // 1 year in seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },

  // async redirects() {
  //   return [
  //     { source: '/blog/:slug(.+)/', destination: '/blog/:slug', permanent: true },
  //   ];
  // },

  // Configure cache headers for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Add webpack configuration for optimizing chunks
  webpack: (config, { isServer, dev }) => {
    // Only apply to client-side bundles in production
    if (!isServer && !dev) {
      // Optimize runtime chunk
      config.optimization.runtimeChunk = 'single';

      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 300000, // Increased from 244000 to prevent warnings
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          // Framework chunks
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
            name: 'framework',
            priority: 40,
            reuseExistingChunk: true,
          },
          // Large libraries get their own chunks
          swiper: {
            test: /[\\/]node_modules[\\/](swiper)[\\/]/,
            name: 'swiper',
            priority: 35,
            reuseExistingChunk: true,
          },
          markdown: {
            test: /[\\/]node_modules[\\/](react-markdown|rehype|remark|unified|micromark)[\\/]/,
            name: 'markdown',
            priority: 35,
            reuseExistingChunk: true,
          },
          icons: {
            test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
            name: 'icons',
            priority: 35,
            reuseExistingChunk: true,
          },
          // Other vendor libraries
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Common components
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          // CSS modules
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
            priority: 50,
          }
        },
      };

      // Minimize JavaScript
      config.optimization.minimize = true;
    }

    return config;
  },
};

// Export the configuration with the bundle analyzer
export default withBundleAnalyzer(nextConfig);
