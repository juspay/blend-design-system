import { useState, useMemo } from 'react'
import { collectLeafPaths } from './utils'
import { Slider, SliderSize, SliderVariant } from '@juspay/blend-design-system'

interface AnatomyEditorProps {
    propertyValue: unknown
    overrides: Record<string, unknown> | undefined
    basePath: string
    breakpoint: string
    onUpdate: (relativePath: string, value: string) => void
    onRemove: (relativePath: string) => void
}

interface Leaf {
    full: string
    relative: string
    value: string
    overridden: string | null
    isOverridden: boolean
    breadcrumb: string[]
}

function isObject(val: unknown): val is Record<string, unknown> {
    return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function isLeafValue(val: unknown): boolean {
    return (
        val === null ||
        val === undefined ||
        typeof val === 'string' ||
        typeof val === 'number' ||
        typeof val === 'boolean'
    )
}

function isSliderable(val: string): boolean {
    if (isHexColor(val) || isCssColorFn(val) || val === 'transparent')
        return false
    if (val.includes('linear-gradient') || val.includes('radial-gradient'))
        return false
    if (val === 'none') return false
    const n = parseFloat(val)
    return !isNaN(n) && n >= 0 && /^\d/.test(val)
}

export function AnatomyEditor({
    propertyValue,
    overrides,
    basePath,
    onUpdate,
    onRemove,
}: AnatomyEditorProps) {
    if (propertyValue == null) return null

    if (isLeafValue(propertyValue)) {
        return (
            <SingleValueEditor
                resolved={String(propertyValue)}
                overridden={overrides !== undefined ? String(overrides) : null}
                onUpdate={(v) => onUpdate(basePath, v)}
                onRemove={() => onRemove(basePath)}
            />
        )
    }

    if (!isObject(propertyValue)) return null

    const DIRECTION_KEYS = new Set(['top', 'right', 'bottom', 'left'])
    const keys = Object.keys(propertyValue)

    const isDirectionalSpacing =
        keys.length > 0 &&
        keys.length <= 4 &&
        keys.every((k) => DIRECTION_KEYS.has(k)) &&
        keys.every((k) => isLeafValue(propertyValue[k]))

    if (isDirectionalSpacing) {
        return (
            <DirectionalSpacingEditor
                directions={propertyValue}
                directionOverrides={isObject(overrides) ? overrides : undefined}
                basePath={basePath}
                onUpdate={onUpdate}
                onRemove={onRemove}
            />
        )
    }

    return (
        <NestedAnatomyEditor
            propertyValue={propertyValue}
            overrides={isObject(overrides) ? overrides : undefined}
            basePath={basePath}
            onUpdate={onUpdate}
            onRemove={onRemove}
        />
    )
}

function TokenSlider({
    value,
    min,
    max,
    step,
    onChange,
}: {
    value: number
    min: number
    max: number
    step: number
    onChange: (value: number) => void
}) {
    return (
        <div className="w-20 shrink-0">
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.SMALL}
                value={[value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(vals) => {
                    if (vals.length > 0) onChange(vals[0])
                }}
            />
        </div>
    )
}

function SingleValueEditor({
    resolved,
    overridden,
    onUpdate,
    onRemove,
}: {
    resolved: string
    overridden: string | null
    onUpdate: (value: string) => void
    onRemove: () => void
}) {
    const isColor =
        isHexColor(resolved) ||
        isCssColorFn(resolved) ||
        resolved === 'transparent'
    const isGradient =
        resolved.includes('linear-gradient') ||
        resolved.includes('radial-gradient')
    const numVal = parseFloat(resolved)
    const showSlider = isSliderable(resolved)

    return (
        <div className="flex items-center gap-2">
            {isColor && !isGradient && (
                <div
                    className="w-5 h-5 rounded border border-black/10 shrink-0"
                    style={{ backgroundColor: resolved }}
                />
            )}
            {isGradient && (
                <div
                    className="w-5 h-5 rounded border border-black/10 shrink-0"
                    style={{ background: resolved }}
                />
            )}
            {showSlider && (
                <TokenSlider
                    value={
                        overridden !== null
                            ? parseFloat(overridden) || 0
                            : numVal
                    }
                    min={0}
                    max={Math.max(numVal * 2, 50)}
                    step={1}
                    onChange={(v) => onUpdate(`${v}px`)}
                />
            )}
            <input
                type="text"
                value={overridden ?? ''}
                placeholder={
                    resolved.length > 40
                        ? resolved.slice(0, 38) + '...'
                        : resolved
                }
                onChange={(e) => onUpdate(e.target.value)}
                className={`flex-1 min-w-0 px-2 py-1 text-[11px] font-mono border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    overridden !== null
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'border-gray-200 placeholder:text-gray-300'
                }`}
            />
            {overridden !== null && (
                <button
                    onClick={onRemove}
                    className="text-[10px] text-blue-400 hover:text-red-500"
                >
                    x
                </button>
            )}
        </div>
    )
}

function DirectionalSpacingEditor({
    directions,
    directionOverrides,
    basePath,
    onUpdate,
    onRemove,
}: {
    directions: Record<string, unknown>
    directionOverrides: Record<string, unknown> | undefined
    basePath: string
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const dirKeys = ['top', 'right', 'bottom', 'left'] as const

    return (
        <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mx-auto max-w-[200px]">
            {dirKeys.map((dir) => {
                const val = directions[dir]
                if (val === undefined) return null
                const overrideVal = directionOverrides?.[dir]
                const hasOverride = overrideVal !== undefined
                const resolved = String(val)
                const current = hasOverride ? String(overrideVal) : null

                return (
                    <div
                        key={dir}
                        className={`absolute ${
                            dir === 'top'
                                ? 'top-1 left-1/2 -translate-x-1/2'
                                : dir === 'right'
                                  ? 'right-1 top-1/2 -translate-y-1/2'
                                  : dir === 'bottom'
                                    ? 'bottom-1 left-1/2 -translate-x-1/2'
                                    : 'left-1 top-1/2 -translate-y-1/2'
                        }`}
                    >
                        <div className="relative group">
                            <input
                                type="text"
                                value={current ?? ''}
                                placeholder={resolved}
                                onChange={(e) =>
                                    onUpdate(
                                        `${basePath}.${dir}`,
                                        e.target.value
                                    )
                                }
                                className={`w-16 px-1.5 py-0.5 text-[10px] font-mono text-center border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                                    hasOverride
                                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                                        : 'bg-white border-gray-200 text-gray-600 placeholder:text-gray-300'
                                }`}
                            />
                            {hasOverride && (
                                <button
                                    onClick={() =>
                                        onRemove(`${basePath}.${dir}`)
                                    }
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 text-[8px] leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    x
                                </button>
                            )}
                        </div>
                    </div>
                )
            })}
            <div className="bg-white border border-gray-200 rounded text-[9px] text-gray-400 text-center py-2 px-1">
                Content
            </div>
        </div>
    )
}

function NestedAnatomyEditor({
    propertyValue,
    overrides,
    basePath,
    onUpdate,
    onRemove,
}: {
    propertyValue: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    basePath: string
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const [search, setSearch] = useState('')

    const leaves = useMemo(() => {
        const allPaths = collectLeafPaths(propertyValue)
        return allPaths
            .map((path) => {
                const value = resolveLeaf(propertyValue, path)
                if (value === undefined || value === null) return null
                const isOverridden = overrides
                    ? resolveLeaf(overrides, path) !== undefined
                    : false
                const overridden =
                    isOverridden && overrides
                        ? String(resolveLeaf(overrides, path) ?? '')
                        : null
                const breadcrumb = path.split('.')

                return {
                    full: `${basePath}.${path}`,
                    relative: path,
                    value: String(value),
                    overridden,
                    isOverridden,
                    breadcrumb,
                }
            })
            .filter((l): l is Leaf => l !== null)
    }, [propertyValue, overrides, basePath])

    const filtered = useMemo(() => {
        if (!search) return leaves
        const q = search.toLowerCase()
        return leaves.filter(
            (l) =>
                l.relative.toLowerCase().includes(q) ||
                l.value.toLowerCase().includes(q)
        )
    }, [leaves, search])

    const groups = useMemo(() => {
        const map = new Map<string, Leaf[]>()
        for (const leaf of filtered) {
            const key = leaf.breadcrumb[0] || '(root)'
            if (!map.has(key)) map.set(key, [])
            map.get(key)!.push(leaf)
        }
        return map
    }, [filtered])

    if (leaves.length === 0) return null

    return (
        <div className="space-y-2">
            {leaves.length > 6 && (
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${leaves.length} values...`}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
            )}

            {Array.from(groups.entries()).map(([groupKey, items]) => (
                <LeafGroup
                    key={groupKey}
                    groupKey={groupKey}
                    items={items}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}

function LeafGroup({
    groupKey,
    items,
    onUpdate,
    onRemove,
}: {
    groupKey: string
    items: Leaf[]
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const [open, setOpen] = useState(items.length <= 16)
    const overriddenCount = items.filter((i) => i.isOverridden).length

    return (
        <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
            >
                <span className="text-[11px] font-semibold text-gray-600 capitalize">
                    {groupKey}
                </span>
                <span className="text-[10px] text-gray-400 ml-auto">
                    {items.length}
                    {overriddenCount > 0 && (
                        <span className="text-blue-500 ml-1">
                            {overriddenCount} edited
                        </span>
                    )}
                </span>
            </button>

            {open && (
                <div className="divide-y divide-gray-50">
                    {items.map((leaf) => (
                        <LeafRow
                            key={leaf.full}
                            leaf={leaf}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function LeafRow({
    leaf,
    onUpdate,
    onRemove,
}: {
    leaf: Leaf
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const isColor =
        isHexColor(leaf.value) ||
        isCssColorFn(leaf.value) ||
        leaf.value === 'transparent'
    const isGradient =
        leaf.value.includes('linear-gradient') ||
        leaf.value.includes('radial-gradient')
    const numVal = parseFloat(leaf.value)
    const showSlider = isSliderable(leaf.value)

    const labelParts = leaf.breadcrumb.slice(1)
    const label =
        labelParts.length > 0 ? labelParts.join(' › ') : leaf.breadcrumb[0]

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 ${
                leaf.isOverridden ? 'bg-blue-50/50' : ''
            }`}
        >
            {isColor && !isGradient && (
                <div
                    className="w-4 h-4 rounded border border-black/10 shrink-0"
                    style={{ backgroundColor: leaf.value }}
                />
            )}
            {isGradient && (
                <div
                    className="w-4 h-4 rounded border border-black/10 shrink-0"
                    style={{ background: leaf.value }}
                />
            )}

            <span
                className="text-[10px] font-mono text-gray-400 w-28 shrink-0 truncate"
                title={leaf.relative}
            >
                {label}
            </span>

            {showSlider && (
                <TokenSlider
                    value={
                        leaf.isOverridden
                            ? parseFloat(leaf.overridden || '0') || 0
                            : numVal
                    }
                    min={0}
                    max={Math.max(numVal * 2, 50)}
                    step={1}
                    onChange={(v) => onUpdate(leaf.full, `${v}px`)}
                />
            )}

            <input
                type="text"
                value={leaf.isOverridden ? (leaf.overridden ?? '') : ''}
                placeholder={
                    isGradient
                        ? 'gradient...'
                        : leaf.value.length > 30
                          ? leaf.value.slice(0, 28) + '...'
                          : leaf.value
                }
                onChange={(e) => onUpdate(leaf.full, e.target.value)}
                className={`flex-1 min-w-0 px-2 py-1 text-[11px] font-mono border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    leaf.isOverridden
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'border-gray-200 placeholder:text-gray-300'
                }`}
            />

            {leaf.isOverridden && (
                <button
                    onClick={() => onRemove(leaf.full)}
                    className="text-[9px] text-blue-400 hover:text-red-500 shrink-0"
                >
                    x
                </button>
            )}
        </div>
    )
}

function resolveLeaf(obj: unknown, path: string): unknown {
    const parts = path.split('.')
    let current: unknown = obj
    for (const part of parts) {
        if (current && typeof current === 'object') {
            current = (current as Record<string, unknown>)[part]
        } else {
            return undefined
        }
    }
    return current
}

function isHexColor(val: string): boolean {
    return /^#[0-9A-Fa-f]{3,8}$/.test(val)
}

function isCssColorFn(val: string): boolean {
    return /^(rgb|hsl|rgba|hsla)\s*\(/.test(val)
}
