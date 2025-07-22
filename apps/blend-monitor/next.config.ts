import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true,
    },
    eslint: {
        // Skip ESLint during production builds
        ignoreDuringBuilds: true,
    },
    // Skip static generation for dynamic routes
    generateBuildId: async () => {
        return 'build'
    },
    trailingSlash: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'net', 'tls', 'fs' modules on the client side
            config.resolve.fallback = {
                ...config.resolve.fallback,
                net: false,
                tls: false,
                fs: false,
                dns: false,
                child_process: false,
                http2: false,
            }
        }
        return config
    },
    // Server external packages (moved from experimental)
    serverExternalPackages: ['firebase-admin'],
    // For development, proxy API calls to Cloud Functions emulator
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/api/:path*',
                    destination:
                        'http://localhost:5001/storybook-452807/us-central1/api/api/:path*',
                },
            ]
        }
        return []
    },
}

export default nextConfig
