/**
 * ReScript tokens generator
 *
 * Emits a small .res module that embeds resolved tokenizer output via %raw.
 * Used to verify the same resolved token maps work outside React/TS consumers.
 */

import type { BrandConfig } from '@juspay/blend-design-system/tokens/server'

function compactJson(value: unknown): string {
    return JSON.stringify(value)
}

/** Escape a JS expression embedded inside ReScript %raw(`...`) if it ever contains backticks. */
function escapeForRaw(jsExpr: string): string {
    return jsExpr.includes('`') ? jsExpr.replace(/`/g, '\\`') : jsExpr
}

/**
 * Generate BlendTokens.res — resolved light/dark maps as JSON.t via %raw.
 * Expects ReScript ≥ 11 with JSON in scope (default in new projects).
 */
export function generateBrandTokensRescriptCode(
    brandConfig: BrandConfig,
    lightTokens: Record<string, unknown>,
    darkTokens: Record<string, unknown>
): string {
    const timestamp = new Date().toISOString()
    const light = escapeForRaw(`(${compactJson(lightTokens)})`)
    const dark = escapeForRaw(`(${compactJson(darkTokens)})`)

    return `/**
 * Blend Token Studio — resolved component tokens (ReScript)
 *
 * Auto-generated. DO NOT EDIT — re-run:
 *   npx blend-token-studio generate <brand.json> --language rescript
 *
 * Generated: ${timestamp}
 * Brand: ${brandConfig.name} (${brandConfig.brandId})
 *
 * Opaque JSON.t values — decode or narrow in your app as needed.
 */

/** Light theme — same structure as tokenizer output for TypeScript tokens.ts. */
let componentTokens: JSON.t = %raw(\`${light}\`)

/** Dark theme */
let darkComponentTokens: JSON.t = %raw(\`${dark}\`)
`
}
