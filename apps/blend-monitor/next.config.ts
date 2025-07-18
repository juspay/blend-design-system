import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    // Ensure server-only code doesn't leak to client
    experimental: {
        serverComponentsExternalPackages: ['firebase-admin'],
    },
}

export default nextConfig
