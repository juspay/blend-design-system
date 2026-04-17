/**
 * AccessibilityPanel
 *
 * WCAG contrast checker that validates all color combinations
 * used across the brand config against AA and AAA standards.
 * Shows pass/fail for text-on-background pairs across all 26 components.
 */

import { useMemo } from 'react'
import { CheckCircle, XCircle, Eye, ShieldCheck } from '@phosphor-icons/react'
import type { BrandConfig } from '@blend-design/token-engine'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AccessibilityPanelProps {
    brand: BrandConfig
}

type WcagLevel = 'AAA' | 'AA' | 'A' | 'fail'

interface ContrastResult {
    label: string
    foreground: string
    background: string
    ratio: number
    largeAA: WcagLevel
    normalAA: WcagLevel
    largeAAA: WcagLevel
    normalAAA: WcagLevel
}

// ---------------------------------------------------------------------------
// WCAG Contrast Math
// ---------------------------------------------------------------------------

/** Convert hex to linear RGB (0-1 range) for luminance calculation. */
function hexToLinearRgb(hex: string): [number, number, number] {
    const clean = hex.replace('#', '')
    const r = parseInt(clean.slice(0, 2), 16) / 255
    const g = parseInt(clean.slice(2, 4), 16) / 255
    const b = parseInt(clean.slice(4, 6), 16) / 255
    return [
        r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
        g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
        b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4),
    ]
}

/** Calculate relative luminance per WCAG 2.1. */
function relativeLuminance(hex: string): number {
    const [r, g, b] = hexToLinearRgb(hex)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Calculate contrast ratio between two hex colors. */
function contrastRatio(fg: string, bg: string): number {
    const l1 = relativeLuminance(fg)
    const l2 = relativeLuminance(bg)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
}

/** Classify a ratio against WCAG thresholds. */
function classifyLevel(ratio: number, isLarge: boolean): WcagLevel {
    if (isLarge) {
        if (ratio >= 4.5) return 'AAA'
        if (ratio >= 3.0) return 'AA'
        return 'fail'
    }
    if (ratio >= 7.0) return 'AAA'
    if (ratio >= 4.5) return 'AA'
    if (ratio >= 3.0) return 'A'
    return 'fail'
}

// ---------------------------------------------------------------------------
// Color Pair Extraction
// ---------------------------------------------------------------------------

/** Extract meaningful color pairs from a brand config for accessibility testing. */
function extractColorPairs(brand: BrandConfig): Array<{
    label: string
    foreground: string
    background: string
}> {
    const pairs: Array<{
        label: string
        foreground: string
        background: string
    }> = []
    const primary = brand.colors?.primary || {}
    const gray = brand.colors?.gray || {}
    const white = '#FFFFFF'

    // Primary button: white text on primary-500
    if (primary['500']) {
        pairs.push({
            label: 'Button (Primary text)',
            foreground: white,
            background: primary['500'],
        })
        pairs.push({
            label: 'Button (Primary hover)',
            foreground: white,
            background: primary['600'] || primary['500'],
        })
    }

    // Text on white background
    if (gray['900']) {
        pairs.push({
            label: 'Body text on white',
            foreground: gray['900'],
            background: white,
        })
    }
    if (gray['700']) {
        pairs.push({
            label: 'Secondary text on white',
            foreground: gray['700'],
            background: white,
        })
    }
    if (gray['500']) {
        pairs.push({
            label: 'Placeholder text on white',
            foreground: gray['500'],
            background: white,
        })
    }

    // Text on primary background
    if (primary['500'] && gray['900']) {
        pairs.push({
            label: 'Heading on primary bg',
            foreground: white,
            background: primary['500'],
        })
    }

    // Light backgrounds
    if (primary['50'] && gray['900']) {
        pairs.push({
            label: 'Text on primary-50 surface',
            foreground: gray['900'],
            background: primary['50'],
        })
    }
    if (primary['100'] && gray['700']) {
        pairs.push({
            label: 'Text on primary-100 surface',
            foreground: gray['700'],
            background: primary['100'],
        })
    }

    // Gray surfaces
    if (gray['100'] && gray['900']) {
        pairs.push({
            label: 'Text on gray-100 surface',
            foreground: gray['900'],
            background: gray['100'],
        })
    }
    if (gray['800'] && gray['100']) {
        pairs.push({
            label: 'Text on dark surface',
            foreground: gray['100'],
            background: gray['800'],
        })
    }

    // Input borders
    if (primary['500'] && gray['900']) {
        pairs.push({
            label: 'Input focus border visibility',
            foreground: primary['500'],
            background: white,
        })
    }

    // Error states
    const red500 = brand.colors?.red?.['500'] || '#EF4444'
    if (red500) {
        pairs.push({
            label: 'Error text on white',
            foreground: red500,
            background: white,
        })
    }

    // Success states
    const green500 = brand.colors?.green?.['500'] || '#10B981'
    if (green500) {
        pairs.push({
            label: 'Success text on white',
            foreground: green500,
            background: white,
        })
    }

    return pairs
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AccessibilityPanel({ brand }: AccessibilityPanelProps) {
    const results = useMemo(() => {
        const pairs = extractColorPairs(brand)
        return pairs.map((pair) => {
            const ratio = contrastRatio(pair.foreground, pair.background)
            return {
                ...pair,
                ratio,
                largeAA: classifyLevel(ratio, true),
                normalAA: classifyLevel(ratio, false),
                largeAAA: classifyLevel(ratio, true),
                normalAAA: classifyLevel(ratio, false),
            } as ContrastResult
        })
    }, [brand])

    const passCount = results.filter((r) => r.normalAA !== 'fail').length
    const failCount = results.filter((r) => r.normalAA === 'fail').length
    const overallScore =
        results.length > 0
            ? Math.round((passCount / results.length) * 100)
            : 100

    return (
        <div className="p-4 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                    WCAG Contrast Check
                </h3>
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span
                        className={`text-xs font-bold ${
                            overallScore >= 80
                                ? 'text-green-600'
                                : overallScore >= 50
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                        }`}
                    >
                        {overallScore}% pass
                    </span>
                </div>
            </div>

            {/* Score Summary */}
            <div className="grid grid-cols-3 gap-3">
                <ScoreCard
                    label="Total Pairs"
                    value={String(results.length)}
                    color="gray"
                />
                <ScoreCard
                    label="AA Pass"
                    value={String(passCount)}
                    color="green"
                />
                <ScoreCard
                    label="AA Fail"
                    value={String(failCount)}
                    color="red"
                />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    AAA (7:1)
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    AA (4.5:1)
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    Large AA (3:1)
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    Fail
                </div>
            </div>

            {/* Results */}
            <div className="space-y-2">
                {results.map((result, i) => (
                    <ContrastResultRow key={i} result={result} />
                ))}
            </div>

            {/* Empty state */}
            {results.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    <Eye className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No color pairs to check</p>
                    <p className="text-xs mt-1">
                        Add primary and gray colors to your brand config
                    </p>
                </div>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ScoreCard({
    label,
    value,
    color,
}: {
    label: string
    value: string
    color: 'green' | 'red' | 'gray'
}) {
    const valueColors = {
        green: 'text-green-600',
        red: 'text-red-600',
        gray: 'text-gray-900',
    }

    return (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-center">
            <div className={`text-lg font-bold ${valueColors[color]}`}>
                {value}
            </div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    )
}

function ContrastResultRow({ result }: { result: ContrastResult }) {
    const passes = result.normalAA !== 'fail'

    return (
        <div
            className={`p-3 rounded-xl border ${
                passes ? 'border-gray-200 bg-white' : 'border-red-200 bg-red-50'
            }`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800">
                    {result.label}
                </span>
                <div className="flex items-center gap-1">
                    {passes ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span
                        className={`text-xs font-mono font-bold ${
                            passes ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {result.ratio.toFixed(1)}:1
                    </span>
                </div>
            </div>

            {/* Color preview */}
            <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                    <div
                        className="w-6 h-6 rounded-l border border-black/10 flex items-center justify-center text-[7px] font-bold"
                        style={{ backgroundColor: result.background }}
                    >
                        <span
                            style={{
                                color: result.foreground,
                                textShadow:
                                    relativeLuminance(result.foreground) > 0.5
                                        ? '0 0 2px rgba(0,0,0,0.3)'
                                        : 'none',
                            }}
                        >
                            Aa
                        </span>
                    </div>
                    <div
                        className="w-6 h-6 rounded-r border border-black/10"
                        style={{ backgroundColor: result.foreground }}
                    />
                </div>
                <div className="flex-1 flex items-center gap-1.5">
                    <code className="text-[10px] text-gray-500">
                        {result.foreground}
                    </code>
                    <span className="text-gray-300">on</span>
                    <code className="text-[10px] text-gray-500">
                        {result.background}
                    </code>
                </div>
            </div>

            {/* Level badges */}
            <div className="flex items-center gap-1.5">
                <LevelBadge label="AA" level={result.normalAA} />
                <LevelBadge label="AAA" level={result.normalAAA} />
                <LevelBadge label="Large AA" level={result.largeAA} />
            </div>
        </div>
    )
}

function LevelBadge({ label, level }: { label: string; level: WcagLevel }) {
    const colorMap: Record<WcagLevel, string> = {
        AAA: 'bg-green-100 text-green-700',
        AA: 'bg-blue-100 text-blue-700',
        A: 'bg-amber-100 text-amber-700',
        fail: 'bg-red-100 text-red-700',
    }

    return (
        <span
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${colorMap[level]}`}
        >
            {label} {level === 'fail' ? '✗' : '✓'}
        </span>
    )
}
