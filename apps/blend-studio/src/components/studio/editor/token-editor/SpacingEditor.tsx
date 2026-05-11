import { useState } from 'react'
import { Slider, SliderSize, SliderVariant } from '@juspay/blend-design-system'

interface SpacingEditorProps {
    tokens: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    onUpdate: (relativePath: string, value: string) => void
    onRemove: (relativePath: string) => void
    breakpoint?: string
}

/**
 * Padding in ButtonV2 tokens has the shape:
 *   padding.{direction}.{size}.{variant}.{subtype}
 * e.g. padding.top.sm.primary.default
 *
 * Since the ComponentTokenEditor already selects a breakpoint,
 * we know the breakpoint. But the resolved tokens still contain
 * all sizes inside each direction. We peel off the correct size.
 *
 * Padding is the SAME across variants — only differs by direction,
 * size, and subtype. So we write to all variants at once.
 */
export function SpacingEditor({
    tokens,
    overrides,
    onUpdate,
    onRemove,
    breakpoint = 'sm',
}: SpacingEditorProps) {
    const padding = tokens.padding as Record<string, unknown> | undefined
    const gap = tokens.gap

    // Detect available subtypes from the first direction > first size > first variant
    const subtypes = detectSubtypes(padding, breakpoint)
    const variants = detectVariants(padding, breakpoint)
    const [selectedSubtype, setSelectedSubtype] = useState(
        subtypes[0] || 'default'
    )

    if (!padding && gap === undefined) {
        return <p className="text-xs text-gray-400">No spacing tokens</p>
    }

    return (
        <div className="space-y-4">
            {/* Subtype selector */}
            {subtypes.length > 1 && (
                <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1 block">
                        Type
                    </label>
                    <div className="flex gap-1">
                        {subtypes.map((st) => (
                            <button
                                key={st}
                                onClick={() => setSelectedSubtype(st)}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                                    selectedSubtype === st
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                {formatSubtype(st)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Padding box model */}
            {padding && (
                <PaddingBoxModel
                    padding={padding}
                    overrides={
                        overrides?.padding as
                            | Record<string, unknown>
                            | undefined
                    }
                    subtype={selectedSubtype}
                    variants={variants}
                    breakpoint={breakpoint}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}

            {/* Gap */}
            {gap !== undefined && (
                <GapEditor
                    gap={gap}
                    overrideGap={overrides?.gap}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Padding Box Model
// ---------------------------------------------------------------------------

function PaddingBoxModel({
    padding,
    overrides,
    subtype,
    variants,
    breakpoint,
    onUpdate,
    onRemove,
}: {
    padding: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    subtype: string
    variants: string[]
    breakpoint: string
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const directions = ['top', 'right', 'bottom', 'left'] as const
    const firstVariant = variants[0] || 'primary'

    const values: Record<
        string,
        { resolved: string; overridden: string | null }
    > = {}
    for (const dir of directions) {
        const resolved = readPaddingValue(
            padding,
            dir,
            breakpoint,
            subtype,
            firstVariant
        )
        const overridden = overrides
            ? readPaddingValue(
                  overrides,
                  dir,
                  breakpoint,
                  subtype,
                  firstVariant
              )
            : null
        values[dir] = {
            resolved: resolved || '0px',
            overridden,
        }
    }

    const updateDir = (dir: string, value: string) => {
        for (const variant of variants) {
            onUpdate(
                `padding.${dir}.${breakpoint}.${variant}.${subtype}`,
                value
            )
        }
    }

    const resetDir = (dir: string) => {
        for (const variant of variants) {
            onRemove(`padding.${dir}.${breakpoint}.${variant}.${subtype}`)
        }
    }

    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Padding
            </label>
            <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mx-auto max-w-[200px]">
                {/* Top */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2">
                    <PaddingInput
                        value={values.top.overridden}
                        placeholder={values.top.resolved}
                        onChange={(v) => updateDir('top', v)}
                        onReset={() => resetDir('top')}
                    />
                </div>
                {/* Right */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <PaddingInput
                        value={values.right.overridden}
                        placeholder={values.right.resolved}
                        onChange={(v) => updateDir('right', v)}
                        onReset={() => resetDir('right')}
                    />
                </div>
                {/* Bottom */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                    <PaddingInput
                        value={values.bottom.overridden}
                        placeholder={values.bottom.resolved}
                        onChange={(v) => updateDir('bottom', v)}
                        onReset={() => resetDir('bottom')}
                    />
                </div>
                {/* Left */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2">
                    <PaddingInput
                        value={values.left.overridden}
                        placeholder={values.left.resolved}
                        onChange={(v) => updateDir('left', v)}
                        onReset={() => resetDir('left')}
                    />
                </div>
                {/* Center indicator */}
                <div className="bg-white border border-gray-200 rounded text-[9px] text-gray-400 text-center py-2 px-1">
                    Content
                </div>
            </div>

            {/* Quick-set */}
            <div className="mt-3 flex items-center gap-2">
                <label className="text-[10px] text-gray-400 font-medium shrink-0">
                    Set all:
                </label>
                <input
                    type="text"
                    placeholder="e.g. 8px"
                    className="w-20 px-2 py-1 text-xs font-mono border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const v = (e.target as HTMLInputElement).value
                            if (v) {
                                for (const dir of directions) updateDir(dir, v)
                            }
                        }
                    }}
                />
                <span className="text-[10px] text-gray-300">press Enter</span>
            </div>
        </div>
    )
}

function PaddingInput({
    value,
    placeholder,
    onChange,
    onReset,
}: {
    value: string | null
    placeholder: string
    onChange: (v: string) => void
    onReset: () => void
}) {
    return (
        <div className="relative group">
            <input
                type="text"
                value={value ?? ''}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={`w-16 px-1.5 py-0.5 text-[10px] font-mono text-center border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    value
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 placeholder:text-gray-300'
                }`}
            />
            {value && (
                <button
                    onClick={onReset}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 text-[8px] leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    x
                </button>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Gap Editor
// ---------------------------------------------------------------------------

function GapEditor({
    gap,
    overrideGap,
    onUpdate,
    onRemove,
}: {
    gap: unknown
    overrideGap: unknown
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const resolvedVal = parsePx(gap)
    const currentVal = overrideGap !== undefined ? parsePx(overrideGap) : null
    const displayVal = currentVal ?? resolvedVal
    const isOverridden = overrideGap !== undefined

    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1 block">
                Gap
            </label>
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <Slider
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.SMALL}
                        value={[displayVal]}
                        min={0}
                        max={32}
                        step={2}
                        onValueChange={(vals) => {
                            if (vals.length > 0) onUpdate('gap', `${vals[0]}px`)
                        }}
                    />
                </div>
                <input
                    type="text"
                    value={isOverridden ? String(overrideGap) : ''}
                    placeholder={`${displayVal}px`}
                    onChange={(e) => {
                        if (e.target.value) onUpdate('gap', e.target.value)
                    }}
                    className="w-16 px-2 py-1 text-xs font-mono border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                {isOverridden && (
                    <button
                        onClick={() => onRemove('gap')}
                        className="text-[10px] text-blue-400 hover:text-red-500"
                    >
                        reset
                    </button>
                )}
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Walk into padding.top.{breakpoint} to find variant keys.
 * padding.top.sm.{primary, secondary, danger, success}
 */
function detectVariants(
    padding: Record<string, unknown> | undefined,
    breakpoint: string
): string[] {
    if (!padding) return []
    const firstDir = Object.values(padding)[0] as
        | Record<string, unknown>
        | undefined
    if (!firstDir) return []
    const sizeObj = firstDir[breakpoint] as Record<string, unknown> | undefined
    if (!sizeObj) {
        // Fallback: try first available size
        const firstSize = Object.values(firstDir)[0] as
            | Record<string, unknown>
            | undefined
        if (!firstSize) return []
        return Object.keys(firstSize)
    }
    return Object.keys(sizeObj)
}

/**
 * Walk into padding.top.{breakpoint}.primary to find subtype keys.
 * padding.top.sm.primary.{default, iconOnly, inline}
 */
function detectSubtypes(
    padding: Record<string, unknown> | undefined,
    breakpoint: string
): string[] {
    if (!padding) return []
    const firstDir = Object.values(padding)[0] as
        | Record<string, unknown>
        | undefined
    if (!firstDir) return []
    const sizeObj = firstDir[breakpoint] as Record<string, unknown> | undefined
    if (!sizeObj) {
        const firstSize = Object.values(firstDir)[0] as
            | Record<string, unknown>
            | undefined
        if (!firstSize) return []
        const firstVariant = Object.values(firstSize)[0] as
            | Record<string, unknown>
            | undefined
        if (!firstVariant) return []
        return Object.keys(firstVariant)
    }
    const firstVariant = Object.values(sizeObj)[0] as
        | Record<string, unknown>
        | undefined
    if (!firstVariant) return []
    return Object.keys(firstVariant)
}

/**
 * Read padding.{dir}.{breakpoint}.{variant}.{subtype}
 */
function readPaddingValue(
    padding: Record<string, unknown>,
    dir: string,
    breakpoint: string,
    subtype: string,
    variant: string
): string {
    const dirObj = padding[dir] as Record<string, unknown> | undefined
    if (!dirObj) return ''
    const sizeObj = dirObj[breakpoint] as Record<string, unknown> | undefined
    if (!sizeObj) return ''
    const variantObj = sizeObj[variant] as Record<string, unknown> | undefined
    if (!variantObj) return ''
    return String(variantObj[subtype] ?? '')
}

function parsePx(val: unknown): number {
    if (typeof val === 'number') return val
    const s = String(val ?? '0')
    const n = parseFloat(s)
    return isNaN(n) ? 0 : n
}

function formatSubtype(st: string): string {
    if (st === 'default') return 'Default'
    if (st === 'iconOnly') return 'Icon Only'
    if (st === 'inline') return 'Inline'
    return st.charAt(0).toUpperCase() + st.slice(1)
}
