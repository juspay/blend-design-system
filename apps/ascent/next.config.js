const withMDX = require('@next/mdx')

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
}

module.exports = withMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
    },
})(nextConfig)
