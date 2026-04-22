/**
 * DiffPanel
 *
 * Displays a visual diff between the current brand config and Blend defaults.
 * Groups changes by category and clearly shows:
 *   - What the Blend default was (left, muted)
 *   - What your brand changed it to (right, highlighted)
 *   - Color swatches for hex values
 *   - Human-readable path labels
 */

import { CheckCircle, ArrowRight } from '@phosphor-icons/react'
import type { TokenDiff } from '@juspay/blend-design-system/tokens'
import type { DiffPanelProps } from './types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isHexColor(value: string): boolean {
    return /^#[0-9A-Fa-f]{3,6}$/.test(value)
}

function groupDiffsByCategory(diffs: TokenDiff[]): Record<string, TokenDiff[]> {
    return diffs.reduce<Record<string, TokenDiff[]>>((acc, d) => {
        const group = d.path.split('.')[0]
        if (!acc[group]) acc[group] = []
        acc[group].push(d)
        return acc
    }, {})
}

function formatPath(path: string): string {
    return path
        .split('.')
        .map((seg) =>
            seg.match(/^\d+$/)
                ? `Shade ${seg}`
                : seg.charAt(0).toUpperCase() + seg.slice(1)
        )
        .join(' › ')
}

const GROUP_LABELS: Record<string, string> = {
    colors: 'Colors',
    radius: 'Border Radius',
    shadows: 'Shadows',
    font: 'Font',
}

const GROUP_ICONS: Record<string, string> = {
    colors: '🎨',
    radius: '⬜',
    shadows: '🔲',
    font: '🔤',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DiffPanel({ diffs }: DiffPanelProps) {
    if (diffs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <CheckCircle className="w-12 h-12 text-green-400 mb-3" />
                <p className="font-medium text-gray-700">
                    No changes from default
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Your tokens match the Blend default preset
                </p>
            </div>
        )
    }

    const grouped = groupDiffsByCategory(diffs)

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                    Changes from Default
                </h3>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    {diffs.length} change{diffs.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-3 py-2 bg-gray-50 rounded-lg text-[11px]">
                <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-sm bg-gray-200 border border-gray-300" />
                    <span className="text-gray-500">Blend Default</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-300" />
                <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-sm bg-blue-500 border border-blue-600" />
                    <span className="text-gray-700 font-medium">
                        Your Brand
                    </span>
                </div>
            </div>

            {/* Grouped diffs */}
            {Object.entries(grouped).map(([group, groupDiffs]) => (
                <DiffGroup key={group} group={group} diffs={groupDiffs} />
            ))}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Diff Group
// ---------------------------------------------------------------------------

function DiffGroup({ group, diffs }: { group: string; diffs: TokenDiff[] }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                <span className="text-sm">{GROUP_ICONS[group] ?? '•'}</span>
                <span className="text-xs font-semibold text-gray-700">
                    {GROUP_LABELS[group] ?? group}
                </span>
                <span className="ml-auto text-xs text-gray-400">
                    {diffs.length} change{diffs.length !== 1 ? 's' : ''}
                </span>
            </div>
            <div className="divide-y divide-gray-100">
                {diffs.map((diff, i) => (
                    <DiffRow key={i} diff={diff} />
                ))}
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Diff Row
// ---------------------------------------------------------------------------

function DiffRow({ diff }: { diff: TokenDiff }) {
    const isColorChange = isHexColor(diff.oldValue) || isHexColor(diff.newValue)

    return (
        <div className="px-4 py-3">
            {/* Path label */}
            <div className="text-[11px] font-mono text-gray-400 mb-2">
                {formatPath(diff.path)}
            </div>

            {/* Value comparison */}
            <div className="flex items-center gap-2">
                {/* Old value (Blend Default) */}
                <div className="flex items-center gap-1.5 min-w-0">
                    {isHexColor(diff.oldValue) && (
                        <div
                            className="w-5 h-5 rounded border border-black/10 shrink-0"
                            style={{ backgroundColor: diff.oldValue }}
                        />
                    )}
                    <span className="font-mono text-xs text-gray-400 line-through truncate">
                        {diff.oldValue}
                    </span>
                    <span className="text-[9px] text-gray-300 font-medium shrink-0">
                        DEFAULT
                    </span>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />

                {/* New value (Your Brand) */}
                <div className="flex items-center gap-1.5 min-w-0">
                    {isHexColor(diff.newValue) && (
                        <div
                            className="w-5 h-5 rounded border border-black/10 shrink-0"
                            style={{ backgroundColor: diff.newValue }}
                        />
                    )}
                    <span className="font-mono text-xs text-green-700 font-semibold truncate">
                        {diff.newValue}
                    </span>
                    <span className="text-[9px] text-blue-500 font-medium shrink-0">
                        YOURS
                    </span>
                </div>
            </div>

            {/* Color comparison bar for hex values */}
            {isColorChange &&
                isHexColor(diff.oldValue) &&
                isHexColor(diff.newValue) && (
                    <div className="flex mt-2 rounded overflow-hidden h-2">
                        <div
                            className="flex-1"
                            style={{ backgroundColor: diff.oldValue }}
                            title={`Default: ${diff.oldValue}`}
                        />
                        <div
                            className="flex-1"
                            style={{ backgroundColor: diff.newValue }}
                            title={`Yours: ${diff.newValue}`}
                        />
                    </div>
                )}
        </div>
    )
}
