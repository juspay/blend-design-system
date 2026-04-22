/**
 * TokenAnalyticsPanel
 *
 * Shows which tokens from the brand config are actually used by each
 * of the 26 V2 components. Helps identify unused tokens and missing
 * coverage. Key white-label feature for enterprise audits.
 */

import { useMemo } from 'react'
import { ChartBar, CheckCircle, Warning, Package } from '@phosphor-icons/react'
import type { BrandConfig } from '@juspay/blend-design-system/tokens'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TokenAnalyticsPanelProps {
    brand: BrandConfig
}

interface TokenUsage {
    token: string
    value: string
    usedByComponents: string[]
    isCustom: boolean
}

interface ComponentCoverage {
    component: string
    tokensUsed: number
    customTokens: number
}

// ---------------------------------------------------------------------------
// Token Impact Map
//
// Maps which foundation tokens each V2 component uses.
// This is the intelligence that makes analytics possible.
// ---------------------------------------------------------------------------

const TOKEN_IMPACT_MAP: Record<
    string,
    Array<{
        component: string
        paths: string[]
    }>
> = {
    'colors.primary': [
        { component: 'ButtonV2', paths: ['backgroundColor.primary'] },
        {
            component: 'AlertV2',
            paths: ['borderColor.primary', 'backgroundColor.primary'],
        },
        {
            component: 'CheckboxV2',
            paths: ['borderColor.checked', 'backgroundColor.checked'],
        },
        {
            component: 'RadioV2',
            paths: ['borderColor.checked', 'backgroundColor.checked'],
        },
        { component: 'SwitchV2', paths: ['backgroundColor.active'] },
        { component: 'TextInputV2', paths: ['borderColor.focus'] },
        { component: 'SingleSelectV2', paths: ['borderColor.focus'] },
        {
            component: 'MultiSelectV2',
            paths: ['borderColor.focus', 'tag.backgroundColor'],
        },
        { component: 'MenuV2', paths: ['backgroundColor.hover'] },
        { component: 'TabsV2', paths: ['borderColor.active'] },
        { component: 'TagV2', paths: ['backgroundColor.primary'] },
        { component: 'ProgressBarV2', paths: ['backgroundColor.fill'] },
        { component: 'TopbarV2', paths: ['backgroundColor.primary'] },
        { component: 'SidebarV2', paths: ['backgroundColor.active'] },
        { component: 'BreadcrumbV2', paths: ['color.active'] },
        { component: 'PopoverV2', paths: ['borderColor.default'] },
        { component: 'CodeEditorV2', paths: ['borderColor.focus'] },
    ],
    'colors.gray': [
        {
            component: 'ButtonV2',
            paths: ['backgroundColor.secondary', 'borderColor.default'],
        },
        {
            component: 'TextInputV2',
            paths: ['backgroundColor.default', 'borderColor.default'],
        },
        { component: 'AlertV2', paths: ['borderColor.default'] },
        {
            component: 'AccordionV2',
            paths: ['borderColor.default', 'backgroundColor.header'],
        },
        { component: 'AvatarV2', paths: ['backgroundColor.fallback'] },
        { component: 'BreadcrumbV2', paths: ['color.default'] },
        { component: 'TagV2', paths: ['backgroundColor.default'] },
        { component: 'TooltipV2', paths: ['backgroundColor.default'] },
        { component: 'SnackbarV2', paths: ['backgroundColor.default'] },
    ],
    'colors.red': [
        { component: 'ButtonV2', paths: ['backgroundColor.danger'] },
        {
            component: 'AlertV2',
            paths: ['borderColor.error', 'backgroundColor.error'],
        },
        { component: 'TextInputV2', paths: ['borderColor.error'] },
        { component: 'TagV2', paths: ['backgroundColor.error'] },
        { component: 'CheckboxV2', paths: ['borderColor.error'] },
        { component: 'Timeline', paths: ['dotColor.error'] },
    ],
    'colors.green': [
        { component: 'ButtonV2', paths: ['backgroundColor.success'] },
        { component: 'AlertV2', paths: ['borderColor.success'] },
        { component: 'TagV2', paths: ['backgroundColor.success'] },
        { component: 'StatCardV2', paths: ['changeColor.positive'] },
        { component: 'AvatarV2', paths: ['statusColor.online'] },
    ],
    'colors.purple': [
        { component: 'AlertV2', paths: ['backgroundColor.info'] },
        { component: 'TagV2', paths: ['backgroundColor.purple'] },
    ],
    'colors.orange': [
        { component: 'AlertV2', paths: ['backgroundColor.warning'] },
        { component: 'TagV2', paths: ['backgroundColor.orange'] },
    ],
    radius: [
        { component: 'ButtonV2', paths: ['borderRadius'] },
        { component: 'TextInputV2', paths: ['borderRadius'] },
        { component: 'AlertV2', paths: ['borderRadius'] },
        { component: 'TagV2', paths: ['borderRadius'] },
        { component: 'AvatarV2', paths: ['borderRadius'] },
        { component: 'Card', paths: ['borderRadius'] },
        { component: 'MenuV2', paths: ['borderRadius'] },
        { component: 'PopoverV2', paths: ['borderRadius'] },
    ],
    shadows: [
        { component: 'PopoverV2', paths: ['boxShadow'] },
        { component: 'MenuV2', paths: ['boxShadow'] },
        { component: 'TooltipV2', paths: ['boxShadow'] },
        { component: 'TopbarV2', paths: ['boxShadow'] },
    ],
    font: [
        { component: 'ButtonV2', paths: ['fontFamily'] },
        { component: 'TextInputV2', paths: ['fontFamily'] },
        { component: 'All Components', paths: ['fontFamily (inherited)'] },
    ],
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TokenAnalyticsPanel({ brand }: TokenAnalyticsPanelProps) {
    const analysis = useMemo(() => analyzeTokens(brand), [brand])

    return (
        <div className="p-4 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                    Token Usage Analytics
                </h3>
                <div className="flex items-center gap-1.5">
                    <ChartBar className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">
                        {analysis.customTokenCount} custom
                    </span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
                <SummaryCard
                    icon={Package}
                    label="Token Groups"
                    value={String(analysis.totalGroups)}
                />
                <SummaryCard
                    icon={CheckCircle}
                    label="Components Affected"
                    value={String(analysis.affectedComponents)}
                />
                <SummaryCard
                    icon={Warning}
                    label="Unused Tokens"
                    value={String(analysis.unusedTokens.length)}
                />
            </div>

            {/* Token Impact */}
            <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Token Impact Map
                </h4>
                <div className="space-y-2">
                    {analysis.tokenUsages.map((usage) => (
                        <TokenUsageRow key={usage.token} usage={usage} />
                    ))}
                </div>
            </div>

            {/* Unused Tokens Warning */}
            {analysis.unusedTokens.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Warning className="w-4 h-4 text-amber-600" />
                        <h4 className="text-sm font-semibold text-amber-900">
                            Unused Custom Tokens
                        </h4>
                    </div>
                    <p className="text-xs text-amber-700 mb-2">
                        These tokens are set but not referenced by any V2
                        component:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {analysis.unusedTokens.map((token) => (
                            <span
                                key={token}
                                className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-mono rounded"
                            >
                                {token}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Component Coverage */}
            <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Component Coverage
                </h4>
                <div className="space-y-1.5">
                    {analysis.componentCoverage.slice(0, 10).map((coverage) => (
                        <CoverageBar
                            key={coverage.component}
                            coverage={coverage}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Analysis Logic
// ---------------------------------------------------------------------------

function analyzeTokens(brand: BrandConfig) {
    const tokenUsages: TokenUsage[] = []
    const allComponents = new Set<string>()
    const customTokenCount: number[] = []
    const unusedTokens: string[] = []

    // Analyze color groups
    for (const [group, shades] of Object.entries(brand.colors || {})) {
        if (!shades || typeof shades !== 'object') continue

        const impactKey = `colors.${group}`
        const impact = TOKEN_IMPACT_MAP[impactKey]
        const hasCustomValues = Object.keys(shades).length > 0

        if (hasCustomValues) {
            customTokenCount.push(1)
        }

        if (impact) {
            const components = impact.map((i) => i.component)
            components.forEach((c) => allComponents.add(c))

            tokenUsages.push({
                token: impactKey,
                value: (shades as Record<string, string>)['500'] || 'various',
                usedByComponents: components,
                isCustom: hasCustomValues,
            })
        } else if (hasCustomValues) {
            // Custom color not in impact map = unused
            unusedTokens.push(impactKey)
            tokenUsages.push({
                token: impactKey,
                value: (shades as Record<string, string>)['500'] || 'various',
                usedByComponents: [],
                isCustom: true,
            })
        }
    }

    // Analyze radius
    if (brand.radius && Object.keys(brand.radius).length > 0) {
        const impact = TOKEN_IMPACT_MAP['radius']
        if (impact) {
            const components = impact.map((i) => i.component)
            components.forEach((c) => allComponents.add(c))
            customTokenCount.push(1)
            tokenUsages.push({
                token: 'radius',
                value: brand.radius['8'] || 'various',
                usedByComponents: components,
                isCustom: true,
            })
        }
    }

    // Analyze shadows
    if (brand.shadows && Object.keys(brand.shadows).length > 0) {
        const impact = TOKEN_IMPACT_MAP['shadows']
        if (impact) {
            const components = impact.map((i) => i.component)
            components.forEach((c) => allComponents.add(c))
            customTokenCount.push(1)
            tokenUsages.push({
                token: 'shadows',
                value: Object.values(brand.shadows)[0] || '',
                usedByComponents: components,
                isCustom: true,
            })
        }
    }

    // Analyze font
    if (brand.font?.family) {
        const impact = TOKEN_IMPACT_MAP['font']
        if (impact) {
            const components = impact.map((i) => i.component)
            components.forEach((c) => allComponents.add(c))
            customTokenCount.push(1)
            tokenUsages.push({
                token: 'font',
                value: brand.font.family,
                usedByComponents: components,
                isCustom: true,
            })
        }
    }

    // Build component coverage
    const componentCoverage: ComponentCoverage[] = []
    for (const [token, impacts] of Object.entries(TOKEN_IMPACT_MAP)) {
        for (const impact of impacts) {
            const existing = componentCoverage.find(
                (c) => c.component === impact.component
            )
            if (existing) {
                existing.tokensUsed += 1
                const isCustom = tokenUsages.find(
                    (t) => t.token === token
                )?.isCustom
                if (isCustom) existing.customTokens += 1
            } else {
                const isCustom = tokenUsages.find(
                    (t) => t.token === token
                )?.isCustom
                componentCoverage.push({
                    component: impact.component,
                    tokensUsed: 1,
                    customTokens: isCustom ? 1 : 0,
                })
            }
        }
    }

    componentCoverage.sort((a, b) => b.customTokens - a.customTokens)

    return {
        tokenUsages,
        totalGroups: tokenUsages.length,
        affectedComponents: allComponents.size,
        customTokenCount: customTokenCount.length,
        unusedTokens,
        componentCoverage,
    }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SummaryCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
}) {
    return (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{label}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{value}</div>
        </div>
    )
}

function TokenUsageRow({ usage }: { usage: TokenUsage }) {
    return (
        <div
            className={`p-3 rounded-lg border ${
                usage.isCustom
                    ? 'border-purple-200 bg-purple-50'
                    : 'border-gray-200 bg-white'
            }`}
        >
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    {usage.value?.startsWith('#') && (
                        <div
                            className="w-4 h-4 rounded border border-black/10"
                            style={{ backgroundColor: usage.value }}
                        />
                    )}
                    <span className="text-sm font-mono font-medium text-gray-800">
                        {usage.token}
                    </span>
                    {usage.isCustom && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-purple-200 text-purple-700 rounded">
                            custom
                        </span>
                    )}
                </div>
                <span className="text-xs text-gray-500">
                    {usage.usedByComponents.length} components
                </span>
            </div>
            {usage.usedByComponents.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {usage.usedByComponents.slice(0, 5).map((comp) => (
                        <span
                            key={comp}
                            className="px-1.5 py-0.5 text-[10px] bg-white border border-gray-200 rounded text-gray-600"
                        >
                            {comp}
                        </span>
                    ))}
                    {usage.usedByComponents.length > 5 && (
                        <span className="text-[10px] text-gray-400">
                            +{usage.usedByComponents.length - 5} more
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

function CoverageBar({ coverage }: { coverage: ComponentCoverage }) {
    const percentage =
        coverage.tokensUsed > 0
            ? Math.round((coverage.customTokens / coverage.tokensUsed) * 100)
            : 0

    return (
        <div className="flex items-center gap-3">
            <span className="w-28 text-xs text-gray-700 truncate">
                {coverage.component}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-[10px] text-gray-400 w-8 text-right">
                {coverage.customTokens}/{coverage.tokensUsed}
            </span>
        </div>
    )
}
