import withMDX from '@next/mdx'

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    transpilePackages: ['@juspay/blend-design-system'],
    images: {
        unoptimized: true,
    },
}

export default withMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
    },
})(nextConfig)
