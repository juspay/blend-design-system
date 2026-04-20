import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { collectLeafPaths } from './utils'
import { Slider, SliderSize, SliderVariant } from '@juspay/blend-design-system'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
    label: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function isHexColor(val: string): boolean {
    return /^#[0-9A-Fa-f]{3,8}$/.test(val)
}

function isCssColorFn(val: string): boolean {
    return /^(rgb|hsl|rgba|hsla)\s*\(/.test(val)
}

function isColorValue(val: string): boolean {
    return isHexColor(val) || isCssColorFn(val) || val === 'transparent'
}

function isGradient(val: string): boolean {
    return val.includes('linear-gradient') || val.includes('radial-gradient')
}

function isSliderable(val: string): boolean {
    if (isColorValue(val) || isGradient(val) || val === 'none') return false
    const n = parseFloat(val)
    return !isNaN(n) && n >= 0 && /^\d/.test(val)
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

// ---------------------------------------------------------------------------
// Main Component — dispatches to the right editor shape
// ---------------------------------------------------------------------------

export function AnatomyEditor({
    propertyValue,
    overrides,
    basePath,
    onUpdate,
    onRemove,
}: AnatomyEditorProps) {
    if (propertyValue == null) return null

    // Leaf value — single input
    if (isLeafValue(propertyValue)) {
        return (
            <ValueEditor
                resolved={String(propertyValue)}
                overridden={overrides !== undefined ? String(overrides) : null}
                onUpdate={(v) => onUpdate(basePath, v)}
                onRemove={() => onRemove(basePath)}
            />
        )
    }

    if (!isObject(propertyValue)) return null

    // Directional spacing (top/right/bottom/left) — box model view
    const keys = Object.keys(propertyValue)
    const DIRS = new Set(['top', 'right', 'bottom', 'left'])
    if (
        keys.length > 0 &&
        keys.length <= 4 &&
        keys.every((k) => DIRS.has(k) && isLeafValue(propertyValue[k]))
    ) {
        return (
            <SpacingBoxEditor
                directions={propertyValue}
                dirOverrides={isObject(overrides) ? overrides : undefined}
                basePath={basePath}
                onUpdate={onUpdate}
                onRemove={onRemove}
            />
        )
    }

    // Nested object — flat list of leaves
    return (
        <LeafListEditor
            propertyValue={propertyValue}
            overrides={isObject(overrides) ? overrides : undefined}
            basePath={basePath}
            onUpdate={onUpdate}
            onRemove={onRemove}
        />
    )
}

// ---------------------------------------------------------------------------
// Debounced Slider
// ---------------------------------------------------------------------------

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
    const [local, setLocal] = useState(value)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => setLocal(value), [value])
    useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current)
        },
        []
    )

    const handle = useCallback(
        (vals: number[]) => {
            if (!vals.length) return
            setLocal(vals[0])
            if (timer.current) clearTimeout(timer.current)
            timer.current = setTimeout(() => onChange(vals[0]), 150)
        },
        [onChange]
    )

    return (
        <div className="w-20 shrink-0">
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.SMALL}
                value={[local]}
                min={min}
                max={max}
                step={step}
                onValueChange={handle}
            />
        </div>
    )
}

// ---------------------------------------------------------------------------
// Color Swatch (inline)
// ---------------------------------------------------------------------------

function ColorSwatch({ color, isGrad }: { color: string; isGrad?: boolean }) {
    return (
        <div
            className="w-4 h-4 rounded border border-black/10 shrink-0"
            style={isGrad ? { background: color } : { backgroundColor: color }}
        />
    )
}

// ---------------------------------------------------------------------------
// Single Value Editor — color swatch + optional slider + input + reset
// ---------------------------------------------------------------------------

function ValueEditor({
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
    const color = isColorValue(resolved)
    const grad = isGradient(resolved)
    const numVal = parseFloat(resolved)
    const sliderable = isSliderable(resolved)

    return (
        <div className="flex items-center gap-2">
            {(color || grad) && <ColorSwatch color={resolved} isGrad={grad} />}

            {sliderable && (
                <TokenSlider
                    value={
                        overridden != null
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
                    overridden != null
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'border-gray-200 placeholder:text-gray-300'
                }`}
            />

            {overridden != null && (
                <button
                    onClick={onRemove}
                    className="text-[10px] text-blue-400 hover:text-red-500"
                    title="Reset to default"
                >
                    x
                </button>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Directional Spacing (box model)
// ---------------------------------------------------------------------------

function SpacingBoxEditor({
    directions,
    dirOverrides,
    basePath,
    onUpdate,
    onRemove,
}: {
    directions: Record<string, unknown>
    dirOverrides?: Record<string, unknown>
    basePath: string
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const POSITIONS: Record<string, string> = {
        top: 'top-1 left-1/2 -translate-x-1/2',
        right: 'right-1 top-1/2 -translate-y-1/2',
        bottom: 'bottom-1 left-1/2 -translate-x-1/2',
        left: 'left-1 top-1/2 -translate-y-1/2',
    }

    return (
        <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mx-auto max-w-[200px]">
            {(['top', 'right', 'bottom', 'left'] as const).map((dir) => {
                const val = directions[dir]
                if (val === undefined) return null
                const ov = dirOverrides?.[dir]
                const hasOv = ov !== undefined

                return (
                    <div key={dir} className={`absolute ${POSITIONS[dir]}`}>
                        <div className="relative group">
                            <input
                                type="text"
                                value={hasOv ? String(ov) : ''}
                                placeholder={String(val)}
                                onChange={(e) =>
                                    onUpdate(
                                        `${basePath}.${dir}`,
                                        e.target.value
                                    )
                                }
                                className={`w-16 px-1.5 py-0.5 text-[10px] font-mono text-center border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                                    hasOv
                                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                                        : 'bg-white border-gray-200 text-gray-600 placeholder:text-gray-300'
                                }`}
                            />
                            {hasOv && (
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

// ---------------------------------------------------------------------------
// Nested Leaf List — collects all leaves, groups by first key, collapsible
// ---------------------------------------------------------------------------

function LeafListEditor({
    propertyValue,
    overrides,
    basePath,
    onUpdate,
    onRemove,
}: {
    propertyValue: Record<string, unknown>
    overrides?: Record<string, unknown>
    basePath: string
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const [search, setSearch] = useState('')

    const leaves = useMemo(() => {
        return collectLeafPaths(propertyValue)
            .map((path) => {
                const value = resolveLeaf(propertyValue, path)
                if (value == null) return null
                const ov = overrides ? resolveLeaf(overrides, path) : undefined
                return {
                    full: `${basePath}.${path}`,
                    relative: path,
                    value: String(value),
                    overridden: ov !== undefined ? String(ov) : null,
                    isOverridden: ov !== undefined,
                    label:
                        path.split('.').slice(1).join(' > ') ||
                        path.split('.')[0],
                } satisfies Leaf
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

    // Group by first key segment
    const groups = useMemo(() => {
        const map = new Map<string, Leaf[]>()
        for (const leaf of filtered) {
            const key = leaf.relative.split('.')[0] || '(root)'
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
                    placeholder={`Search ${leaves.length} tokens...`}
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

// ---------------------------------------------------------------------------
// Collapsible Leaf Group
// ---------------------------------------------------------------------------

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
    const editedCount = items.filter((i) => i.isOverridden).length

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
                    {editedCount > 0 && (
                        <span className="text-blue-500 ml-1">
                            {editedCount} edited
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

// ---------------------------------------------------------------------------
// Single Leaf Row
// ---------------------------------------------------------------------------

function LeafRow({
    leaf,
    onUpdate,
    onRemove,
}: {
    leaf: Leaf
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const color = isColorValue(leaf.value)
    const grad = isGradient(leaf.value)
    const numVal = parseFloat(leaf.value)
    const sliderable = isSliderable(leaf.value)

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 ${leaf.isOverridden ? 'bg-blue-50/50' : ''}`}
        >
            {(color || grad) && (
                <ColorSwatch color={leaf.value} isGrad={grad} />
            )}

            <span
                className="text-[10px] font-mono text-gray-400 w-28 shrink-0 truncate"
                title={leaf.relative}
            >
                {leaf.label}
            </span>

            {sliderable && (
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
                    grad
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
                    title="Reset"
                >
                    x
                </button>
            )}
        </div>
    )
}
