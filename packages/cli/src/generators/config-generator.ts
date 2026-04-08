/**
 * Config Generator
 *
 * Generates the blend.config.json project configuration file.
 */

export interface BlendConfig {
    $schema: string
    brand: string
    theme: string
    output: string
}

export function generateConfig(brand: string = 'blend/default'): BlendConfig {
    return {
        $schema: 'https://studio.blend.juspay.design/schema.json',
        brand,
        theme: 'light',
        output: 'src/blend',
    }
}

export function generateConfigCode(config: BlendConfig): string {
    return JSON.stringify(config, null, 4) + '\n'
}
