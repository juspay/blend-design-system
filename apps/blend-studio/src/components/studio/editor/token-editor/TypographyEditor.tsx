interface TypographyEditorProps {
    tokens: Record<string, unknown>
    overrides: Record<string, unknown> | undefined
    onUpdate: (relativePath: string, value: string) => void
    onRemove: (relativePath: string) => void
}

const FONT_WEIGHTS = [
    { value: '300', label: 'Light (300)' },
    { value: '400', label: 'Regular (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: '600', label: 'SemiBold (600)' },
    { value: '700', label: 'Bold (700)' },
    { value: '800', label: 'ExtraBold (800)' },
]

export function TypographyEditor({
    tokens,
    overrides,
    onUpdate,
    onRemove,
}: TypographyEditorProps) {
    const text = tokens.text as Record<string, unknown> | undefined
    const topContainer = tokens.topContainer as
        | Record<string, unknown>
        | undefined

    if (!text && !topContainer) {
        return <p className="text-xs text-gray-400">No typography tokens</p>
    }

    return (
        <div className="space-y-4">
            {text && (
                <TextSection
                    label="Text"
                    textTokens={text}
                    textOverrides={
                        overrides?.text as Record<string, unknown> | undefined
                    }
                    basePath="text"
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
            {topContainer && 'label' in (topContainer as object) && (
                <TextSection
                    label="Label"
                    textTokens={
                        (topContainer as Record<string, unknown>)
                            .label as Record<string, unknown>
                    }
                    textOverrides={
                        (
                            overrides?.topContainer as
                                | Record<string, unknown>
                                | undefined
                        )?.label as Record<string, unknown> | undefined
                    }
                    basePath="topContainer.label"
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
            {topContainer && 'subLabel' in (topContainer as object) && (
                <TextSection
                    label="Sub Label"
                    textTokens={
                        (topContainer as Record<string, unknown>)
                            .subLabel as Record<string, unknown>
                    }
                    textOverrides={
                        (
                            overrides?.topContainer as
                                | Record<string, unknown>
                                | undefined
                        )?.subLabel as Record<string, unknown> | undefined
                    }
                    basePath="topContainer.subLabel"
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
        </div>
    )
}

function TextSection({
    label,
    textTokens,
    textOverrides,
    basePath,
    onUpdate,
    onRemove,
}: {
    label: string
    textTokens: Record<string, unknown>
    textOverrides: Record<string, unknown> | undefined
    basePath: string
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                {label}
            </label>
            <div className="space-y-2">
                {textTokens.fontSize !== undefined && (
                    <FontPropEditor
                        propLabel="Font Size"
                        propPath="fontSize"
                        resolved={textTokens.fontSize}
                        overridden={textOverrides?.fontSize}
                        basePath={basePath}
                        isSelect={false}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                )}
                {textTokens.fontWeight !== undefined && (
                    <FontPropEditor
                        propLabel="Font Weight"
                        propPath="fontWeight"
                        resolved={textTokens.fontWeight}
                        overridden={textOverrides?.fontWeight}
                        basePath={basePath}
                        isSelect={true}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                )}
                {textTokens.lineHeight !== undefined && (
                    <FontPropEditor
                        propLabel="Line Height"
                        propPath="lineHeight"
                        resolved={textTokens.lineHeight}
                        overridden={textOverrides?.lineHeight}
                        basePath={basePath}
                        isSelect={false}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                )}
            </div>
        </div>
    )
}

function FontPropEditor({
    propLabel,
    propPath,
    resolved,
    overridden,
    basePath,
    isSelect,
    onUpdate,
    onRemove,
}: {
    propLabel: string
    propPath: string
    resolved: unknown
    overridden: unknown
    basePath: string
    isSelect: boolean
    onUpdate: (path: string, value: string) => void
    onRemove: (path: string) => void
}) {
    // Some font props are per-size (e.g. { sm: "14px", md: "14px", lg: "14px" })
    // Some are flat values
    const isPerSize =
        resolved && typeof resolved === 'object' && !Array.isArray(resolved)

    if (isPerSize) {
        return (
            <div>
                <span className="text-[10px] font-mono text-gray-500 mr-2">
                    {propLabel}
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(resolved as Record<string, unknown>).map(
                        ([sizeKey, sizeVal]) => {
                            const overrideVal = overridden
                                ? (overridden as Record<string, unknown>)[
                                      sizeKey
                                  ]
                                : undefined
                            const hasOverride = overrideVal !== undefined
                            const fullPath = `${basePath}.${propPath}.${sizeKey}`

                            return (
                                <div
                                    key={sizeKey}
                                    className="flex items-center gap-1"
                                >
                                    <span className="text-[9px] font-mono text-gray-400">
                                        {sizeKey}
                                    </span>
                                    {isSelect ? (
                                        <select
                                            value={
                                                hasOverride
                                                    ? String(overrideVal)
                                                    : String(sizeVal)
                                            }
                                            onChange={(e) =>
                                                onUpdate(
                                                    fullPath,
                                                    e.target.value
                                                )
                                            }
                                            className="px-1 py-0.5 text-[10px] border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        >
                                            {FONT_WEIGHTS.map((fw) => (
                                                <option
                                                    key={fw.value}
                                                    value={fw.value}
                                                >
                                                    {fw.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={
                                                hasOverride
                                                    ? String(overrideVal)
                                                    : ''
                                            }
                                            placeholder={String(sizeVal)}
                                            onChange={(e) =>
                                                onUpdate(
                                                    fullPath,
                                                    e.target.value
                                                )
                                            }
                                            className={`w-16 px-1.5 py-0.5 text-[10px] font-mono border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                                                hasOverride
                                                    ? 'bg-blue-50 border-blue-300'
                                                    : 'border-gray-200'
                                            }`}
                                        />
                                    )}
                                    {hasOverride && (
                                        <button
                                            onClick={() => onRemove(fullPath)}
                                            className="text-[9px] text-blue-400 hover:text-red-500"
                                        >
                                            x
                                        </button>
                                    )}
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }

    // Flat value
    const hasOverride = overridden !== undefined
    const fullPath = `${basePath}.${propPath}`

    return (
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500 w-20">
                {propLabel}
            </span>
            {isSelect ? (
                <select
                    value={hasOverride ? String(overridden) : String(resolved)}
                    onChange={(e) => onUpdate(fullPath, e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                    {FONT_WEIGHTS.map((fw) => (
                        <option key={fw.value} value={fw.value}>
                            {fw.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    value={hasOverride ? String(overridden) : ''}
                    placeholder={String(resolved)}
                    onChange={(e) => onUpdate(fullPath, e.target.value)}
                    className={`w-20 px-2 py-1 text-xs font-mono border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                        hasOverride
                            ? 'bg-blue-50 border-blue-300'
                            : 'border-gray-200'
                    }`}
                />
            )}
            {hasOverride && (
                <button
                    onClick={() => onRemove(fullPath)}
                    className="text-[10px] text-blue-400 hover:text-red-500"
                >
                    reset
                </button>
            )}
        </div>
    )
}
