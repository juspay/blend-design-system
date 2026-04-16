/**
 * JsonTab
 *
 * Raw JSON editor for the brand configuration with light/dark token preview.
 */

import { useState, useEffect } from 'react'
import { Copy, Check, FileJson, Sun, Moon } from 'lucide-react'
import type { EditorTabProps } from './types'

// Simple token tree component for displaying tokens
function TokenTree({
    data,
    depth = 0,
    isDark = false,
}: {
    data: unknown
    depth?: number
    isDark?: boolean
}) {
    if (data === null || data === undefined) {
        return (
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                null
            </span>
        )
    }

    if (typeof data === 'string') {
        const isColor =
            data.startsWith('#') ||
            data.startsWith('rgb') ||
            data.startsWith('hsl')
        return (
            <span
                className={
                    isColor
                        ? 'text-green-500'
                        : isDark
                          ? 'text-blue-400'
                          : 'text-blue-600'
                }
            >
                "{data}"
                {isColor && (
                    <span
                        className="inline-block w-3 h-3 ml-1 rounded border border-gray-500 align-middle"
                        style={{ backgroundColor: data }}
                    />
                )}
            </span>
        )
    }

    if (typeof data === 'number')
        return (
            <span className={isDark ? 'text-orange-400' : 'text-orange-600'}>
                {data}
            </span>
        )
    if (typeof data === 'boolean')
        return (
            <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>
                {data.toString()}
            </span>
        )

    if (Array.isArray(data)) {
        if (data.length === 0)
            return (
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    []
                </span>
            )
        return (
            <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    [
                </span>
                {data.map((item, index) => (
                    <div key={index} style={{ marginLeft: 16 }}>
                        <TokenTree
                            data={item}
                            depth={depth + 1}
                            isDark={isDark}
                        />
                        {index < data.length - 1 && (
                            <span
                                className={
                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                }
                            >
                                ,
                            </span>
                        )}
                    </div>
                ))}
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    ]
                </span>
            </div>
        )
    }

    if (typeof data === 'object') {
        const entries = Object.entries(data)
        if (entries.length === 0)
            return (
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {'{}'}
                </span>
            )

        return (
            <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {'{'}
                </span>
                {entries.map(([key, value], index) => (
                    <div key={key} style={{ marginLeft: 16 }}>
                        <span
                            className={
                                isDark
                                    ? 'text-gray-200 font-medium'
                                    : 'text-gray-700 font-medium'
                            }
                        >
                            "{key}"
                        </span>
                        <span
                            className={
                                isDark ? 'text-gray-500' : 'text-gray-400'
                            }
                        >
                            :{' '}
                        </span>
                        <TokenTree
                            data={value}
                            depth={depth + 1}
                            isDark={isDark}
                        />
                        {index < entries.length - 1 && (
                            <span
                                className={
                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                }
                            >
                                ,
                            </span>
                        )}
                    </div>
                ))}
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {'}'}
                </span>
            </div>
        )
    }

    return (
        <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>
            {String(data)}
        </span>
    )
}

export function JsonTab({ brand, onChange }: EditorTabProps) {
    const [text, setText] = useState(() => JSON.stringify(brand, null, 2))
    const [isValid, setIsValid] = useState(true)
    const [copied, setCopied] = useState(false)

    // Sync text when brand config changes from other tabs
    useEffect(() => {
        setText(JSON.stringify(brand, null, 2))
    }, [brand])

    const handleChange = (value: string) => {
        setText(value)
        try {
            const parsed = JSON.parse(value)
            onChange(() => parsed)
            setIsValid(true)
        } catch {
            setIsValid(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getLightTokens = () => ({
        theme: 'light',
        colors: brand.colors,
        font: brand.font,
        radius: brand.radius,
        shadows: brand.shadows,
        componentOverrides: brand.componentOverrides,
    })

    const getDarkTokens = () => ({
        theme: 'dark',
        colors: brand.darkModeOverrides?.colors || brand.colors,
        font: brand.font,
        radius: brand.darkModeOverrides?.radius || brand.radius,
        shadows: brand.darkModeOverrides?.shadows || brand.shadows,
        componentOverrides: brand.componentOverrides,
    })

    return (
        <div className="h-full flex flex-col space-y-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-gray-500" />
                    <span
                        className={`text-xs font-medium ${
                            isValid ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {isValid ? 'Valid JSON' : 'Invalid JSON'}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                >
                    {copied ? (
                        <Check className="w-3 h-3 text-green-600" />
                    ) : (
                        <Copy className="w-3 h-3" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>

            {/* Raw JSON Editor */}
            <textarea
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                spellCheck={false}
                className={`w-full flex-1 min-h-[200px] px-3 py-2 text-xs font-mono border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    isValid
                        ? 'border-gray-200 focus:ring-blue-500'
                        : 'border-red-300 focus:ring-red-400'
                }`}
            />

            {/* Split Token Preview */}
            <div className="h-[300px] border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <div className="grid grid-cols-2 divide-x divide-gray-200 h-full">
                    {/* Light Tokens */}
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 shrink-0">
                            <Sun className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs font-semibold text-gray-700">
                                Light Tokens
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-scroll p-3 bg-gray-50 hide-scrollbar">
                            <pre className="text-[10px] font-mono whitespace-pre-wrap break-all">
                                <TokenTree
                                    data={getLightTokens()}
                                    isDark={false}
                                />
                            </pre>
                        </div>
                    </div>

                    {/* Dark Tokens */}
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700 shrink-0">
                            <Moon className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-semibold text-gray-300">
                                Dark Tokens
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-scroll p-3 bg-gray-900 hide-scrollbar">
                            <pre className="text-[10px] font-mono whitespace-pre-wrap break-all">
                                <TokenTree
                                    data={getDarkTokens()}
                                    isDark={true}
                                />
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
