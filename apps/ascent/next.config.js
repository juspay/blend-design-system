const withMDX = require('@next/mdx')

const nextConfig = {
    /* config options here */
}

module.exports = withMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
    },
})(nextConfig)
