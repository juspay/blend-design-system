const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// Load the default Metro config for Expo.
const config = getDefaultConfig(__dirname)

// pnpm uses symlinks for workspace dependencies. Metro needs to follow those
// symlinks into the workspace packages so `blend-native` and
// `@juspay/blend-design-system` source is transpiled directly.
config.watchFolders = [
    path.resolve(__dirname, '../../packages/blend-native'),
    path.resolve(__dirname, '../../packages/blend'),
]

// Enable symlink resolution (standard for pnpm + Metro ≥ 0.79).
config.resolver.unstable_enableSymlinks = true

// blend-native publishes raw TS source (no build step). Metro's default
// resolver only transpiles files under the project root, so we add the
// blend-native and blend package roots as source roots.
config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../../packages/blend-native/node_modules'),
    path.resolve(__dirname, '../../packages/blend/node_modules'),
]

module.exports = config
