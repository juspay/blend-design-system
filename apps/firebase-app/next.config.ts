import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://fractal-567047894553.asia-south1.run.app/:path*',
      },
    ]
  },
}

export default nextConfig 