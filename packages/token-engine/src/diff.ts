/**
 * Brand Config Diff
 *
 * Computes the differences between two brand configs.
 * Used by the CLI `diff` command and the dashboard diff view.
 */

import type { BrandConfig, TokenDiff } from './types'

/**
 * Diff two brand configs and return a list of changes.
 *
 * Compares each override section (colors, radius, shadows, font)
 * and reports what was added, removed, or changed.
 */
export function diffBrandConfigs(
    configA: BrandConfig,
    configB: BrandConfig
): TokenDiff[] {
    const diffs: TokenDiff[] = []

    diffColors(configA, configB, diffs)
    diffSimpleObject(
        'radius',
        configA.radius as Record<string, string> | undefined,
        configB.radius as Record<string, string> | undefined,
        diffs
    )
    diffSimpleObject(
        'shadows',
        configA.shadows as Record<string, string> | undefined,
        configB.shadows as Record<string, string> | undefined,
        diffs
    )
    diffFont(configA, configB, diffs)

    return diffs
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function diffColors(a: BrandConfig, b: BrandConfig, diffs: TokenDiff[]): void {
    const groups = new Set([
        ...Object.keys(a.colors ?? {}),
        ...Object.keys(b.colors ?? {}),
    ])

    for (const group of groups) {
        const aShades =
            (a.colors as Record<string, Record<string, string>> | undefined)?.[
                group
            ] ?? {}
        const bShades =
            (b.colors as Record<string, Record<string, string>> | undefined)?.[
                group
            ] ?? {}
        const allShades = new Set([
            ...Object.keys(aShades),
            ...Object.keys(bShades),
        ])

        for (const shade of allShades) {
            const oldVal = aShades[shade]
            const newVal = bShades[shade]

            if (oldVal !== newVal) {
                diffs.push({
                    path: `colors.${group}.${shade}`,
                    oldValue: oldVal ?? '(default)',
                    newValue: newVal ?? '(default)',
                })
            }
        }
    }
}

function diffSimpleObject(
    prefix: string,
    a: Record<string, string> | undefined,
    b: Record<string, string> | undefined,
    diffs: TokenDiff[]
): void {
    const aObj = a ?? {}
    const bObj = b ?? {}
    const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)])

    for (const key of allKeys) {
        const oldVal = aObj[key]
        const newVal = bObj[key]

        if (oldVal !== newVal) {
            diffs.push({
                path: `${prefix}.${key}`,
                oldValue: oldVal ?? '(default)',
                newValue: newVal ?? '(default)',
            })
        }
    }
}

function diffFont(a: BrandConfig, b: BrandConfig, diffs: TokenDiff[]): void {
    const aFont = a.font
    const bFont = b.font

    if (aFont?.family !== bFont?.family) {
        diffs.push({
            path: 'font.family',
            oldValue: aFont?.family ?? '(default)',
            newValue: bFont?.family ?? '(default)',
        })
    }

    const aWeights = aFont?.weight ?? {}
    const bWeights = bFont?.weight ?? {}
    const allWeights = new Set([
        ...Object.keys(aWeights),
        ...Object.keys(bWeights),
    ])

    for (const key of allWeights) {
        const oldVal = aWeights[key]
        const newVal = bWeights[key]

        if (oldVal !== newVal) {
            diffs.push({
                path: `font.weight.${key}`,
                oldValue: oldVal?.toString() ?? '(default)',
                newValue: newVal?.toString() ?? '(default)',
            })
        }
    }
}
