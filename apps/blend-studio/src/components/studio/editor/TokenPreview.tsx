/**
 * TokenPreview
 *
 * Shows resolved component tokens in a readable format with syntax highlighting.
 */

import { useState } from 'react'
import { CaretDown, CaretRight } from '@phosphor-icons/react'
import type { BrandConfig } from '@juspay/blend-design-system/tokens'

interface TokenPreviewProps {
    brand: BrandConfig
    theme: 'light' | 'dark'
}

function TokenTree({ data, depth = 0 }: { data: unknown; depth?: number }) {
    const [expanded, setExpanded] = useState<Set<string>>(new Set())

    if (data === null || data === undefined) {
        return <span className="text-gray-400">null</span>
    }

    if (typeof data === 'string') {
        const isColor =
            data.startsWith('#') ||
            data.startsWith('rgb') ||
            data.startsWith('hsl')
        return (
            <span className={isColor ? 'text-green-600' : 'text-blue-600'}>
                "{data}"
                {isColor && (
                    <span
                        className="inline-block w-3 h-3 ml-1 rounded border border-gray-200 align-middle"
                        style={{ backgroundColor: data }}
                    />
                )}
            </span>
        )
    }

    if (typeof data === 'number')
        return <span className="text-orange-600">{data}</span>
    if (typeof data === 'boolean')
        return <span className="text-purple-600">{data.toString()}</span>

    if (Array.isArray(data)) {
        if (data.length === 0) return <span>[]</span>
        return (
            <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
                <span>[</span>
                {data.map((item, index) => (
                    <div key={index} style={{ marginLeft: 16 }}>
                        <TokenTree data={item} depth={depth + 1} />
                        {index < data.length - 1 && ','}
                    </div>
                ))}
                <span>]</span>
            </div>
        )
    }

    if (typeof data === 'object') {
        const entries = Object.entries(data)
        if (entries.length === 0) return <span>{'{}'}</span>

        return (
            <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
                <span>{'{'}</span>
                {entries.map(([key, value], index) => {
                    const isExpandable =
                        typeof value === 'object' &&
                        value !== null &&
                        Object.keys(value).length > 0
                    const isExpanded = expanded.has(key)

                    return (
                        <div key={key} style={{ marginLeft: 16 }}>
                            <span className="text-gray-700 font-medium">
                                "{key}"
                            </span>
                            <span className="text-gray-400">: </span>
                            {isExpandable ? (
                                <button
                                    onClick={() => {
                                        const newExpanded = new Set(expanded)
                                        if (newExpanded.has(key)) {
                                            newExpanded.delete(key)
                                        } else {
                                            newExpanded.add(key)
                                        }
                                        setExpanded(newExpanded)
                                    }}
                                    className="inline-flex items-center text-[10px] text-gray-400 hover:text-blue-600"
                                >
                                    {isExpanded ? (
                                        <CaretDown className="w-3 h-3" />
                                    ) : (
                                        <CaretRight className="w-3 h-3" />
                                    )}
                                </button>
                            ) : null}
                            {(!isExpandable || isExpanded) && (
                                <TokenTree data={value} depth={depth + 1} />
                            )}
                            {isExpandable && !isExpanded && (
                                <span className="text-gray-400">{'{...}'}</span>
                            )}
                            {index < entries.length - 1 && ','}
                        </div>
                    )
                })}
                <span>{'}'}</span>
            </div>
        )
    }

    return <span>{String(data)}</span>
}

export function TokenPreview({ brand, theme }: TokenPreviewProps) {
    const tokens = {
        theme,
        colors:
            theme === 'dark' && brand.darkModeOverrides?.colors
                ? { ...brand.colors, ...brand.darkModeOverrides.colors }
                : brand.colors,
        font: brand.font,
        radius:
            theme === 'dark' && brand.darkModeOverrides?.radius
                ? { ...brand.radius, ...brand.darkModeOverrides.radius }
                : brand.radius,
        shadows:
            theme === 'dark' && brand.darkModeOverrides?.shadows
                ? { ...brand.shadows, ...brand.darkModeOverrides.shadows }
                : brand.shadows,
        componentOverrides: brand.componentOverrides,
    }

    return (
        <div className="text-xs font-mono">
            <TokenTree data={tokens} />
        </div>
    )
}
