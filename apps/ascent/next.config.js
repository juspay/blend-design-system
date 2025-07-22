import withMDX from '@next/mdx'

const nextConfig = {
    output: 'export',
    trailingSlash: true,
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
