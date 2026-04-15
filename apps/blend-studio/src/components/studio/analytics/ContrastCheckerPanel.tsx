/**
 * WCAG Contrast Checker Panel
 *
 * Real-time accessibility validation for brand colors.
 * Checks WCAG 2.1 AA and AAA contrast ratios.
 *
 * UNIQUE FEATURE: No other design token tool has built-in accessibility checking.
 */

import { useMemo } from 'react'
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import type { BrandConfig } from '@blend-design/token-engine'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContrastResult {
    foreground: string
    background: string
    ratio: number
    aaLarge: boolean
    aaNormal: boolean
    aaaLarge: boolean
    aaaNormal: boolean
    fgName: string
    bgName: string
}

interface ContrastCheckerPanelProps {
    brand: BrandConfig
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WCAG_LEVELS = {
    AA_NORMAL: 4.5,
    AA_LARGE: 3,
    AAA_NORMAL: 7,
    AAA_LARGE: 4.5,
}

const STANDARD_BACKGROUNDS = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray 50', value: '#F9FAFB' },
    { name: 'Gray 100', value: '#F3F4F6' },
    { name: 'Gray 900', value: '#111827' },
]

// ---------------------------------------------------------------------------
// Color Utilities
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

function getLuminance(hex: string): number {
    const rgb = hexToRgb(hex)
    if (!rgb) return 0

    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map((c) => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function getContrastRatio(fg: string, bg: string): number {
    const l1 = getLuminance(fg)
    const l2 = getLuminance(bg)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContrastCheckerPanel({ brand }: ContrastCheckerPanelProps) {
    const results = useMemo<ContrastResult[]>(() => {
        const contrastResults: ContrastResult[] = []
        const primaryColors = brand.colors?.primary || {}

        // Test primary colors against standard backgrounds
        for (const [shade, fgColor] of Object.entries(primaryColors)) {
            if (typeof fgColor !== 'string' || !fgColor.startsWith('#'))
                continue

            for (const bg of STANDARD_BACKGROUNDS) {
                const ratio = getContrastRatio(fgColor, bg.value)
                contrastResults.push({
                    foreground: fgColor,
                    background: bg.value,
                    ratio,
                    aaLarge: ratio >= WCAG_LEVELS.AA_LARGE,
                    aaNormal: ratio >= WCAG_LEVELS.AA_NORMAL,
                    aaaLarge: ratio >= WCAG_LEVELS.AAA_LARGE,
                    aaaNormal: ratio >= WCAG_LEVELS.AAA_NORMAL,
                    fgName: `Primary ${shade}`,
                    bgName: bg.name,
                })
            }
        }

        // Test primary 500 on gray backgrounds (most common use case)
        const primary500 = primaryColors['500']
        if (primary500 && typeof primary500 === 'string') {
            const grayColors = brand.colors?.gray || {}
            for (const [shade, bgColor] of Object.entries(grayColors)) {
                if (typeof bgColor !== 'string' || !bgColor.startsWith('#'))
                    continue
                const ratio = getContrastRatio(primary500, bgColor)
                contrastResults.push({
                    foreground: primary500,
                    background: bgColor,
                    ratio,
                    aaLarge: ratio >= WCAG_LEVELS.AA_LARGE,
                    aaNormal: ratio >= WCAG_LEVELS.AA_NORMAL,
                    aaaLarge: ratio >= WCAG_LEVELS.AAA_LARGE,
                    aaaNormal: ratio >= WCAG_LEVELS.AAA_NORMAL,
                    fgName: 'Primary 500',
                    bgName: `Gray ${shade}`,
                })
            }
        }

        return contrastResults
    }, [brand])

    const failingResults = results.filter((r) => !r.aaNormal)
    const warningResults = results.filter((r) => r.aaNormal && !r.aaaNormal)
    const passingResults = results.filter((r) => r.aaaNormal)

    return (
        <div className="p-4 space-y-5">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
                <SummaryCard
                    icon={CheckCircle}
                    label="AAA Pass"
                    count={passingResults.length}
                    color="green"
                />
                <SummaryCard
                    icon={AlertTriangle}
                    label="AA Only"
                    count={warningResults.length}
                    color="yellow"
                />
                <SummaryCard
                    icon={AlertCircle}
                    label="Fails AA"
                    count={failingResults.length}
                    color="red"
                />
            </div>

            {/* Legend */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">
                        WCAG 2.1 Contrast Requirements
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-blue-800">
                    <div>
                        <strong>AA Normal:</strong> 4.5:1
                    </div>
                    <div>
                        <strong>AA Large:</strong> 3:1
                    </div>
                    <div>
                        <strong>AAA Normal:</strong> 7:1
                    </div>
                    <div>
                        <strong>AAA Large:</strong> 4.5:1
                    </div>
                </div>
            </div>

            {/* Failing Results */}
            {failingResults.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-red-700 mb-2">
                        Fails AA Normal Text (Must Fix)
                    </h3>
                    <div className="space-y-2">
                        {failingResults.slice(0, 10).map((r, i) => (
                            <ContrastResultRow key={i} result={r} />
                        ))}
                    </div>
                </div>
            )}

            {/* Warning Results */}
            {warningResults.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-yellow-700 mb-2">
                        Passes AA, Fails AAA
                    </h3>
                    <div className="space-y-2">
                        {warningResults.slice(0, 5).map((r, i) => (
                            <ContrastResultRow key={i} result={r} />
                        ))}
                    </div>
                </div>
            )}

            {/* Passing Results */}
            <details className="group">
                <summary className="text-sm font-semibold text-green-700 cursor-pointer">
                    Passes AAA ({passingResults.length} combinations)
                </summary>
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {passingResults.map((r, i) => (
                        <ContrastResultRow key={i} result={r} />
                    ))}
                </div>
            </details>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SummaryCard({
    icon: Icon,
    label,
    count,
    color,
}: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    count: number
    color: 'green' | 'yellow' | 'red'
}) {
    const colors = {
        green: 'bg-green-50 border-green-200 text-green-700',
        yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        red: 'bg-red-50 border-red-200 text-red-700',
    }

    return (
        <div className={`p-3 rounded-lg border ${colors[color]}`}>
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="text-lg font-bold">{count}</span>
            </div>
            <p className="text-xs mt-0.5">{label}</p>
        </div>
    )
}

function ContrastResultRow({ result }: { result: ContrastResult }) {
    const status = result.aaNormal
        ? result.aaaNormal
            ? 'pass'
            : 'warn'
        : 'fail'
    const statusColors = {
        pass: 'bg-green-50 border-green-200',
        warn: 'bg-yellow-50 border-yellow-200',
        fail: 'bg-red-50 border-red-200',
    }

    return (
        <div
            className={`flex items-center gap-3 p-2 rounded-lg border ${statusColors[status]}`}
        >
            <div className="flex items-center gap-2 shrink-0">
                <div
                    className="w-6 h-6 rounded border border-black/10"
                    style={{ backgroundColor: result.foreground }}
                    title={`Foreground: ${result.foreground}`}
                />
                <span className="text-gray-400">on</span>
                <div
                    className="w-6 h-6 rounded border border-black/10"
                    style={{ backgroundColor: result.background }}
                    title={`Background: ${result.background}`}
                />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700">
                    {result.fgName} / {result.bgName}
                </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono font-bold">
                    {result.ratio.toFixed(1)}:1
                </span>
                <div className="flex gap-0.5">
                    <Badge pass={result.aaNormal}>AA</Badge>
                    <Badge pass={result.aaaNormal}>AAA</Badge>
                </div>
            </div>
        </div>
    )
}

function Badge({
    pass,
    children,
}: {
    pass: boolean
    children: React.ReactNode
}) {
    return (
        <span
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                pass
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
            }`}
        >
            {children}
        </span>
    )
}
