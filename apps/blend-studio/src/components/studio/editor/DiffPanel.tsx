/**
 * DiffPanel
 *
 * Displays a visual diff between the current brand config and Blend defaults.
 * Groups changes by category (colors, radius, shadows) and shows old/new values
 * with color swatches for hex values.
 */

import { CheckCircle } from 'lucide-react'
import type { TokenDiff } from '@blend-design/token-engine'
import type { DiffPanelProps } from './types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if a string looks like a hex color. */
function isHexColor(value: string): boolean {
    return /^#[0-9A-Fa-f]{3,6}$/.test(value)
}

/** Group diffs by the first segment of their path (e.g., "colors", "radius"). */
function groupDiffsByCategory(diffs: TokenDiff[]): Record<string, TokenDiff[]> {
    return diffs.reduce<Record<string, TokenDiff[]>>((acc, d) => {
        const group = d.path.split('.')[0]
        if (!acc[group]) acc[group] = []
        acc[group].push(d)
        return acc
    }, {})
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
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    {diffs.length} change{diffs.length !== 1 ? 's' : ''}
                </span>
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
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-600 capitalize">
                    {group}
                </span>
                <span className="ml-2 text-xs text-gray-400">
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
    return (
        <div className="px-4 py-2.5 text-xs">
            <div className="font-mono text-gray-500 mb-1.5">{diff.path}</div>
            <div className="flex items-center gap-2">
                <DiffValue value={diff.oldValue} type="old" />
                <span className="text-gray-400">-&gt;</span>
                <DiffValue value={diff.newValue} type="new" />
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Diff Value
// ---------------------------------------------------------------------------

function DiffValue({ value, type }: { value: string; type: 'old' | 'new' }) {
    const colorClass =
        type === 'old' ? 'line-through text-red-500' : 'text-green-600'

    return (
        <div className="flex items-center gap-1.5">
            {isHexColor(value) && (
                <div
                    className="w-3.5 h-3.5 rounded border border-black/10"
                    style={{ backgroundColor: value }}
                />
            )}
            <span className={`font-mono ${colorClass}`}>{value}</span>
        </div>
    )
}
