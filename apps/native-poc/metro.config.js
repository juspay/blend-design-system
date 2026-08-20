const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Enable pnpm symlink resolution
config.resolver.unstable_enableSymlinks = true

// Ensure .native.tsx files are handled
if (!config.resolver.sourceExts.includes('native.tsx')) {
    config.resolver.sourceExts.push('native.tsx')
}

// Watch workspace packages so Metro picks up edits without restart
config.watchFolders = [path.resolve(__dirname, '../../packages/blend')]

// Web: alias react-native → react-native-web. Only applied for the web target.
const nativeConfig = config.resolver.resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web' && moduleName === 'react-native') {
        return context.resolveRequest(context, 'react-native-web', platform)
    }
    if (nativeConfig) return nativeConfig(context, moduleName, platform)
    return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
