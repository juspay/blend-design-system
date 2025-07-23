import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
    stories: [
        '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
        '../stories/**/*.mdx',
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-docs',
        '@storybook/addon-controls',
        '@storybook/addon-viewport',
        '@storybook/addon-backgrounds',
        '@storybook/addon-mdx-gfm',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop: any) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
    docs: {
        autodocs: 'tag',
    },
    viteFinal: async (config) => {
        // Ensure proper resolution of the @juspay/blend-design-system package
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@juspay/blend-design-system': path.resolve(
                    __dirname,
                    '../../../packages/blend/lib/main.ts'
                ),
            }
        }
        return config
    },
}

export default config
