/**
 * E2E tests for CLI generators — tokens, config, provider, ReScript.
 *
 * These tests verify the full code generation pipeline:
 *   BrandConfig → generator function → valid output string
 */
import { describe, it, expect } from 'vitest'
import {
    generateDefaultTokensCode,
    generateBrandTokensCode,
} from '../generators/tokens-generator'
import { generateBrandTokensRescriptCode } from '../generators/tokens-rescript-generator'
import { generateProviderCode } from '../generators/provider-generator'
import {
    generateConfig,
    generateConfigCode,
    parseConfig,
    validateConfig,
} from '../generators/config-generator'
import type { BrandConfig } from '@blend-design/token-engine'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TEST_CONFIG: BrandConfig = {
    brandId: 'test/brand',
    name: 'Test Brand',
    version: '1.0.0',
    colors: { primary: { '500': '#3B82F6' } },
}

const LIGHT_TOKENS = {
    BUTTONV2: { sm: { gap: '4px', padding: { top: '8px' } } },
    ALERTV2: { sm: { gap: '8px' } },
}

const DARK_TOKENS = {
    BUTTONV2: { sm: { gap: '4px', padding: { top: '8px' } } },
    ALERTV2: { sm: { gap: '8px' } },
}

// ---------------------------------------------------------------------------
// TypeScript Generator
// ---------------------------------------------------------------------------

describe('tokens-generator', () => {
    it('generates default tokens code with correct imports', () => {
        const code = generateDefaultTokensCode()
        expect(code).toContain('ComponentTokenType')
        expect(code).toContain('componentTokens')
        expect(code).toContain('darkComponentTokens')
        expect(code).toContain('Blend Default')
    })

    it('generates brand tokens with light and dark exports', () => {
        const code = generateBrandTokensCode(
            TEST_CONFIG,
            LIGHT_TOKENS,
            DARK_TOKENS
        )
        expect(code).toContain('Test Brand')
        expect(code).toContain('componentTokens')
        expect(code).toContain('darkComponentTokens')
        expect(code).toContain('ComponentTokenType')
        expect(code).toContain('@ts-nocheck')
    })

    it('embeds JSON tokens in the output', () => {
        const code = generateBrandTokensCode(
            TEST_CONFIG,
            LIGHT_TOKENS,
            DARK_TOKENS
        )
        expect(code).toContain('"BUTTONV2"')
        expect(code).toContain('"gap"')
        expect(code).toContain('"4px"')
    })

    it('includes generation timestamp', () => {
        const code = generateBrandTokensCode(
            TEST_CONFIG,
            LIGHT_TOKENS,
            DARK_TOKENS
        )
        // Should contain an ISO date string
        expect(code).toMatch(/\d{4}-\d{2}-\d{2}T/)
    })
})

// ---------------------------------------------------------------------------
// ReScript Generator
// ---------------------------------------------------------------------------

describe('tokens-rescript-generator', () => {
    it('generates valid ReScript code', () => {
        const code = generateBrandTokensRescriptCode(
            TEST_CONFIG,
            LIGHT_TOKENS,
            DARK_TOKENS
        )
        expect(code).toContain('let componentTokens: JSON.t')
        expect(code).toContain('let darkComponentTokens: JSON.t')
        expect(code).toContain('%raw(')
    })

    it('includes brand metadata in comment', () => {
        const code = generateBrandTokensRescriptCode(
            TEST_CONFIG,
            LIGHT_TOKENS,
            DARK_TOKENS
        )
        expect(code).toContain('Test Brand')
        expect(code).toContain('test/brand')
    })

    it('embeds JSON data in raw blocks', () => {
        const code = generateBrandTokensRescriptCode(
            TEST_CONFIG,
            LIGHT_TOKENS,
            DARK_TOKENS
        )
        expect(code).toContain('BUTTONV2')
    })
})

// ---------------------------------------------------------------------------
// Provider Generator
// ---------------------------------------------------------------------------

describe('provider-generator', () => {
    it('generates provider component for non-Next.js', () => {
        const code = generateProviderCode(false)
        expect(code).toContain('BlendProvider')
        expect(code).toContain('ThemeProvider')
        expect(code).toContain('componentTokens')
        expect(code).not.toContain("'use client'")
    })

    it('adds use client directive for Next.js', () => {
        const code = generateProviderCode(true)
        expect(code).toContain("'use client'")
    })

    it('imports tokens from ./tokens', () => {
        const code = generateProviderCode(false)
        expect(code).toContain("from './tokens'")
    })
})

// ---------------------------------------------------------------------------
// Config Generator
// ---------------------------------------------------------------------------

describe('config-generator', () => {
    it('generates a config with defaults', () => {
        const config = generateConfig()
        expect(config.brand).toBe('blend/default')
        expect(config.theme).toBe('light')
        expect(config.output).toBe('src/blend')
        expect(config.$schema).toBeTruthy()
    })

    it('accepts custom options', () => {
        const config = generateConfig({
            brand: 'my-brand/retail',
            theme: 'dark',
            output: 'lib/blend',
        })
        expect(config.brand).toBe('my-brand/retail')
        expect(config.theme).toBe('dark')
        expect(config.output).toBe('lib/blend')
    })

    it('generates valid JSON', () => {
        const config = generateConfig()
        const json = generateConfigCode(config)
        const parsed = JSON.parse(json)
        expect(parsed.brand).toBe('blend/default')
    })

    it('parseConfig round-trips correctly', () => {
        const config = generateConfig({ brand: 'test/rt' })
        const json = generateConfigCode(config)
        const parsed = parseConfig(json)
        expect(parsed).toBeTruthy()
        expect(parsed!.brand).toBe('test/rt')
    })

    it('parseConfig returns null for invalid JSON', () => {
        expect(parseConfig('not json')).toBeNull()
    })

    it('validateConfig accepts valid config', () => {
        const result = validateConfig({
            brand: 'test/valid',
            theme: 'light',
            output: 'src/blend',
        })
        expect(result.valid).toBe(true)
    })

    it('validateConfig rejects invalid theme', () => {
        const result = validateConfig({ theme: 'neon' })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.includes('theme'))).toBe(true)
    })
})
