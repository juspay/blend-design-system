import { Slider, SliderSize, SliderVariant } from '@juspay/blend-design-system'

interface SizingEditorProps {
    tokens: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    onUpdate: (relativePath: string, value: string) => void
    onRemove: (relativePath: string) => void
    breakpoint?: string
}

export function SizingEditor({
    tokens,
    overrides,
    onUpdate,
    onRemove,
    breakpoint = 'sm',
}: SizingEditorProps) {
    const borderRadius = tokens.borderRadius as
        | Record<string, unknown>
        | undefined
    const height = tokens.height as Record<string, unknown> | undefined
    const width = tokens.width as Record<string, unknown> | undefined

    if (!borderRadius && !height && !width) {
        return <p className="text-xs text-gray-400">No sizing tokens</p>
    }

    return (
        <div className="space-y-4">
            {borderRadius && (
                <BorderRadiusEditor
                    borderRadius={borderRadius}
                    overrides={
                        overrides?.borderRadius as
                            | Record<string, unknown>
                            | undefined
                    }
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    breakpoint={breakpoint}
                />
            )}
            {height && (
                <SimpleSizeEditor
                    label="Height"
                    path="height"
                    values={height}
                    overrides={
                        overrides?.height as Record<string, unknown> | undefined
                    }
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
            {width && typeof width !== 'object' && (
                <SingleValueEditor
                    label="Width"
                    path="width"
                    resolved={String(width)}
                    overridden={
                        overrides?.width !== undefined
                            ? String(overrides.width)
                            : null
                    }
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

function BorderRadiusEditor({
    borderRadius,
    overrides,
    onUpdate,
    onRemove,
    breakpoint,
}: {
    borderRadius: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
    breakpoint: string
}) {
    // borderRadius shape varies:
    // ButtonV2: { sm: { primary: { default: "10px", iconOnly: "10px" }, ... }, ... }
    // AlertV2: flat string "8px"
    // TagV2: { sm: { default: "8px", iconOnly: "6px" }, ... }

    if (typeof borderRadius === 'string' || typeof borderRadius === 'number') {
        return (
            <SingleValueEditor
                label="Border Radius"
                path="borderRadius"
                resolved={String(borderRadius)}
                overridden={overrides !== undefined ? String(overrides) : null}
                onUpdate={onUpdate}
                onRemove={onRemove}
            />
        )
    }

    // Detect subtypes and variants from structure, navigating through breakpoint first
    // borderRadius.{breakpoint}.{variant}.{subtype}
    const bpRadius = (borderRadius[breakpoint] ?? borderRadius) as Record<
        string,
        unknown
    >
    const bpOverrides = overrides
        ? ((overrides[breakpoint] ?? overrides) as Record<string, unknown>)
        : undefined
    const radiusVariants = Object.keys(bpRadius)
    const subtypes = detectRadiusSubtypes(bpRadius)
    const firstSubtype = subtypes[0] || 'default'

    const updateRadiusForAllVariants = (subtype: string, value: string) => {
        for (const variant of radiusVariants) {
            onUpdate(`borderRadius.${breakpoint}.${variant}.${subtype}`, value)
        }
    }

    const removeRadiusForAllVariants = (subtype: string) => {
        for (const variant of radiusVariants) {
            onRemove(`borderRadius.${breakpoint}.${variant}.${subtype}`)
        }
    }

    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                Border Radius
            </label>

            {subtypes.length > 1 && (
                <div className="flex gap-1 mb-2">
                    {subtypes.map((st) => {
                        const resolved = readRadiusValue(bpRadius, st)
                        const overridden = bpOverrides
                            ? readRadiusValue(bpOverrides, st)
                            : null
                        const isActive = overridden !== null
                        return (
                            <div key={st} className="flex items-center gap-1.5">
                                <div
                                    className="w-5 h-5 bg-blue-100 border border-blue-200"
                                    style={{
                                        borderRadius:
                                            overridden ?? resolved ?? '0px',
                                    }}
                                    title={`${st}: ${overridden ?? resolved}`}
                                />
                                <input
                                    type="text"
                                    value={overridden ?? ''}
                                    placeholder={resolved ?? ''}
                                    onChange={(e) => {
                                        updateRadiusForAllVariants(
                                            st,
                                            e.target.value
                                        )
                                    }}
                                    className="w-16 px-1.5 py-0.5 text-[10px] font-mono border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                                {isActive && (
                                    <button
                                        onClick={() =>
                                            removeRadiusForAllVariants(st)
                                        }
                                        className="text-[9px] text-blue-400 hover:text-red-500"
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {subtypes.length <= 1 && (
                <SingleValueEditor
                    label="Radius"
                    path="borderRadius"
                    resolved={readRadiusValue(bpRadius, firstSubtype) ?? '0px'}
                    overridden={
                        bpOverrides
                            ? readRadiusValue(bpOverrides, firstSubtype)
                            : null
                    }
                    onUpdate={(_p, v) => {
                        updateRadiusForAllVariants(firstSubtype, v)
                    }}
                    onRemove={(_p) => {
                        removeRadiusForAllVariants(firstSubtype)
                    }}
                />
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Height/Width per key
// ---------------------------------------------------------------------------

function SimpleSizeEditor({
    label,
    path,
    values,
    overrides,
    onUpdate,
    onRemove,
}: {
    label: string
    path: string
    values: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    onUpdate: (relativePath: string, value: string) => void
    onRemove: (relativePath: string) => void
}) {
    if (typeof values !== 'object') return null

    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1 block">
                {label}
            </label>
            <div className="flex flex-wrap gap-2">
                {Object.entries(values).map(([key, val]) => {
                    const overridden = overrides?.[key] !== undefined
                    return (
                        <div key={key} className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-gray-400 w-8">
                                {key}
                            </span>
                            <input
                                type="text"
                                value={
                                    overridden ? String(overrides![key]) : ''
                                }
                                placeholder={String(val)}
                                onChange={(e) =>
                                    onUpdate(`${path}.${key}`, e.target.value)
                                }
                                className={`w-16 px-1.5 py-0.5 text-[10px] font-mono border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                                    overridden
                                        ? 'bg-blue-50 border-blue-300'
                                        : 'border-gray-200'
                                }`}
                            />
                            {overridden && (
                                <button
                                    onClick={() => onRemove(`${path}.${key}`)}
                                    className="text-[9px] text-blue-400 hover:text-red-500"
                                >
                                    x
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Single Value (string/number) editor
// ---------------------------------------------------------------------------

function SingleValueEditor({
    label,
    path,
    resolved,
    overridden,
    onUpdate,
    onRemove,
}: {
    label: string
    path: string
    resolved: string
    overridden: string | null
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    const numVal = parseFloat(resolved)
    const isSlider = !isNaN(numVal) && numVal >= 0 && numVal <= 50

    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1 block">
                {label}
            </label>
            <div className="flex items-center gap-3">
                {isSlider && (
                    <div className="flex-1">
                        <Slider
                            variant={SliderVariant.PRIMARY}
                            size={SliderSize.SMALL}
                            value={[
                                overridden ? parseFloat(overridden) : numVal,
                            ]}
                            min={0}
                            max={50}
                            step={1}
                            onValueChange={(vals) => {
                                if (vals.length > 0)
                                    onUpdate(path, `${vals[0]}px`)
                            }}
                        />
                    </div>
                )}
                <input
                    type="text"
                    value={overridden ?? ''}
                    placeholder={resolved}
                    onChange={(e) => onUpdate(path, e.target.value)}
                    className={`w-20 px-2 py-1 text-xs font-mono border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                        overridden
                            ? 'bg-blue-50 border-blue-300'
                            : 'border-gray-200'
                    }`}
                />
                {overridden !== null && (
                    <button
                        onClick={() => onRemove(path)}
                        className="text-[10px] text-blue-400 hover:text-red-500"
                    >
                        reset
                    </button>
                )}
                {/* Visual preview for border radius */}
                {path.includes('borderRadius') || path.includes('Radius') ? (
                    <div
                        className="w-6 h-6 bg-blue-200 border border-blue-300 shrink-0"
                        style={{
                            borderRadius: overridden ?? resolved,
                        }}
                    />
                ) : null}
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function detectRadiusSubtypes(br: Record<string, unknown>): string[] {
    const firstVal = Object.values(br)[0]
    if (!firstVal || typeof firstVal !== 'object') return []
    return Object.keys(firstVal as Record<string, unknown>)
}

function readRadiusValue(
    br: Record<string, unknown>,
    subtype: string
): string | null {
    const firstVal = Object.values(br)[0]
    if (!firstVal || typeof firstVal !== 'object') {
        return String(firstVal ?? '')
    }
    const subObj = (firstVal as Record<string, unknown>)[subtype]
    if (typeof subObj === 'object' && subObj !== null) {
        const firstKey = Object.values(subObj as Record<string, unknown>)[0]
        return String(firstKey ?? '')
    }
    return String(subObj ?? '')
}
