import { createMDX } from 'fumadocs-mdx/next'

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
}

export default createMDX()(nextConfig)
