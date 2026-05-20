/**
 * ImportWizard
 *
 * Import brand tokens from external sources:
 * - CSS Custom Properties (:root variables)
 * - Tailwind config
 * - Figma Variables JSON
 * - Raw JSON paste
 *
 * This is a white-label key feature — migrate from any design system
 * to Blend Token Studio in seconds.
 */

import { useState } from 'react'
import {
    Upload,
    FileCode,
    Palette,
    BracketsCurly,
    ArrowRight,
    Check,
    WarningCircle,
    X,
} from '@phosphor-icons/react'
import type { BrandConfig } from '@juspay/blend-design-system/tokens'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ImportWizardProps {
    onImport: (config: Partial<BrandConfig>) => void
    onClose: () => void
}

type ImportSource = 'css-vars' | 'tailwind' | 'figma' | 'json'

interface SourceOption {
    id: ImportSource
    label: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    placeholder: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SOURCE_OPTIONS: SourceOption[] = [
    {
        id: 'css-vars',
        label: 'CSS Custom Properties',
        description: ':root { --color-primary-500: #E31837; ... }',
        icon: FileCode,
        placeholder: `:root {
  --color-primary-50: #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-900: #1E3A8A;
  --color-gray-500: #6B7280;
  --radius-8: 8px;
  --font-family: Inter;
}`,
    },
    {
        id: 'tailwind',
        label: 'Tailwind Config',
        description: 'colors: { primary: { 500: "#3B82F6" } }',
        icon: FileCode,
        placeholder: `{
  "colors": {
    "primary": {
      "50": "#EFF6FF",
      "500": "#3B82F6",
      "900": "#1E3A8A"
    },
    "gray": {
      "500": "#6B7280"
    }
  },
  "borderRadius": {
    "8": "8px"
  }
}`,
    },
    {
        id: 'figma',
        label: 'Figma Variables',
        description: 'JSON export from Figma Variables API',
        icon: Palette,
        placeholder: `{
  "collections": [{
    "name": "Brand Colors",
    "variables": [{
      "name": "primary/500",
      "type": "COLOR",
      "valuesByMode": { "light": "#3B82F6" }
    }]
  }]
}`,
    },
    {
        id: 'json',
        label: 'Raw JSON',
        description: 'Paste any brand.json or BrandConfig',
        icon: BracketsCurly,
        placeholder: `{
  "colors": {
    "primary": {
      "500": "#3B82F6"
    }
  },
  "radius": {
    "8": "8px"
  }
}`,
    },
]

// ---------------------------------------------------------------------------
// Parsers
// ---------------------------------------------------------------------------

function parseCssVars(input: string): Partial<BrandConfig> {
    const colors: Record<string, Record<string, string>> = {}
    const radius: Record<string, string> = {}
    let fontFamily: string | undefined

    const lines = input.split('\n')
    for (const line of lines) {
        const match = line.match(/--([\w-]+):\s*([^;]+);?/)
        if (!match) continue

        const [, prop, value] = match
        const trimmed = value.trim()

        // Color variables: --color-primary-500, --primary-500, --brand-primary-500
        const colorMatch = prop.match(
            /(?:color-|brand-)?(?:primary|gray|red|green|yellow|orange|purple)-(\d+)/
        )
        if (colorMatch) {
            const group = prop.match(
                /(?:color-|brand-)?(primary|gray|red|green|yellow|orange|purple)/
            )?.[1]
            const shade = colorMatch[1]
            if (group && /^#[0-9A-Fa-f]{3,6}$/.test(trimmed)) {
                if (!colors[group]) colors[group] = {}
                colors[group][shade] = trimmed
            }
        }

        // Radius variables: --radius-8, --border-radius-8
        const radiusMatch = prop.match(/(?:border-)?radius-(\d+)/)
        if (radiusMatch) {
            radius[radiusMatch[1]] = trimmed
        }

        // Font family
        if (prop === 'font-family' || prop === 'font-family-sans') {
            fontFamily = trimmed.replace(/['"]/g, '')
        }
    }

    const result: Partial<BrandConfig> = {}
    if (Object.keys(colors).length > 0)
        result.colors = colors as BrandConfig['colors']
    if (Object.keys(radius).length > 0) result.radius = radius
    if (fontFamily) result.font = { family: fontFamily }

    return result
}

function parseTailwind(input: string): Partial<BrandConfig> {
    try {
        const config = JSON.parse(input)
        const result: Partial<BrandConfig> = {}

        if (config.colors) {
            result.colors = {}
            for (const [group, shades] of Object.entries(config.colors)) {
                if (shades && typeof shades === 'object') {
                    ;(result.colors as Record<string, unknown>)[group] = shades
                }
            }
        }

        if (config.borderRadius) {
            result.radius = config.borderRadius
        }

        if (config.fontFamily?.sans) {
            const family = Array.isArray(config.fontFamily.sans)
                ? config.fontFamily.sans[0]
                : config.fontFamily.sans
            result.font = {
                family: family?.replace(/['"]/g, ''),
            }
        }

        return result
    } catch {
        return {}
    }
}

function parseFigma(input: string): Partial<BrandConfig> {
    try {
        const data = JSON.parse(input)
        const colors: Record<string, Record<string, string>> = {}

        if (data.collections && Array.isArray(data.collections)) {
            for (const collection of data.collections) {
                if (!collection.variables) continue
                for (const variable of collection.variables) {
                    if (variable.type !== 'COLOR') continue
                    const parts = variable.name.split('/')
                    if (parts.length >= 2) {
                        const group = parts[0]
                        const shade = parts[1]
                        const value =
                            variable.valuesByMode?.light ||
                            variable.valuesByMode?.[
                                Object.keys(variable.valuesByMode)[0]
                            ]
                        if (value && group && shade) {
                            if (!colors[group]) colors[group] = {}
                            colors[group][shade] = String(value)
                        }
                    }
                }
            }
        }

        const result: Partial<BrandConfig> = {}
        if (Object.keys(colors).length > 0) {
            result.colors = colors as BrandConfig['colors']
        }
        return result
    } catch {
        return {}
    }
}

function parseJson(input: string): Partial<BrandConfig> {
    try {
        return JSON.parse(input) as Partial<BrandConfig>
    } catch {
        return {}
    }
}

const PARSERS: Record<ImportSource, (input: string) => Partial<BrandConfig>> = {
    'css-vars': parseCssVars,
    tailwind: parseTailwind,
    figma: parseFigma,
    json: parseJson,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ImportWizard({ onImport, onClose }: ImportWizardProps) {
    const [source, setSource] = useState<ImportSource>('css-vars')
    const [input, setInput] = useState('')
    const [preview, setPreview] = useState<Partial<BrandConfig> | null>(null)
    const [error, setError] = useState<string | null>(null)

    const currentSource = SOURCE_OPTIONS.find((s) => s.id === source)!

    const handleParse = () => {
        setError(null)
        setPreview(null)

        if (!input.trim()) {
            setError('Please paste your tokens')
            return
        }

        try {
            const parsed = PARSERS[source](input)
            const hasData =
                Object.keys(parsed.colors || {}).length > 0 ||
                Object.keys(parsed.radius || {}).length > 0 ||
                Object.keys(parsed.shadows || {}).length > 0 ||
                !!parsed.font

            if (!hasData) {
                setError(
                    'No recognizable tokens found. Check the format and try again.'
                )
                return
            }

            setPreview(parsed)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to parse input'
            )
        }
    }

    const handleImport = () => {
        if (preview) {
            onImport(preview)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Upload className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Import Brand Tokens
                            </h2>
                            <p className="text-sm text-gray-500">
                                Migrate from any design system to Blend
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* Source Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Import Source
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {SOURCE_OPTIONS.map((opt) => {
                                const Icon = opt.icon
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setSource(opt.id)
                                            setPreview(null)
                                            setError(null)
                                        }}
                                        className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-colors ${
                                            source === opt.id
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 ${
                                                source === opt.id
                                                    ? 'text-purple-600'
                                                    : 'text-gray-400'
                                            }`}
                                        />
                                        <div>
                                            <div className="text-xs font-medium text-gray-800">
                                                {opt.label}
                                            </div>
                                            <div className="text-[10px] text-gray-500">
                                                {opt.description}
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Paste your tokens
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value)
                                setPreview(null)
                                setError(null)
                            }}
                            placeholder={currentSource.placeholder}
                            rows={10}
                            className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                    </div>

                    {/* Parse Button */}
                    <button
                        onClick={handleParse}
                        disabled={!input.trim()}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-40 transition-colors"
                    >
                        Parse Tokens
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <WarningCircle className="w-4 h-4 text-red-500 shrink-0" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Preview */}
                    {preview && (
                        <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Check className="w-5 h-5 text-green-600" />
                                <h4 className="text-sm font-semibold text-green-900">
                                    Parsed Successfully
                                </h4>
                            </div>

                            <div className="space-y-2">
                                {preview.colors &&
                                    Object.keys(preview.colors).length > 0 && (
                                        <ParsedGroup
                                            label="Colors"
                                            items={Object.entries(
                                                preview.colors as Record<
                                                    string,
                                                    Record<string, string>
                                                >
                                            ).flatMap(([group, shades]) =>
                                                Object.entries(shades).map(
                                                    ([shade, value]) => ({
                                                        key: `${group}.${shade}`,
                                                        value,
                                                        isColor: true,
                                                    })
                                                )
                                            )}
                                        />
                                    )}
                                {preview.radius &&
                                    Object.keys(preview.radius).length > 0 && (
                                        <ParsedGroup
                                            label="Border Radius"
                                            items={Object.entries(
                                                preview.radius
                                            ).map(([k, v]) => ({
                                                key: k,
                                                value: v || '',
                                                isColor: false,
                                            }))}
                                        />
                                    )}
                                {preview.font?.family && (
                                    <ParsedGroup
                                        label="Font"
                                        items={[
                                            {
                                                key: 'family',
                                                value: preview.font.family,
                                                isColor: false,
                                            },
                                        ]}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={!preview}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-40"
                    >
                        <Upload className="w-4 h-4" />
                        Import to Branch
                    </button>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ParsedGroup({
    label,
    items,
}: {
    label: string
    items: Array<{ key: string; value: string; isColor: boolean }>
}) {
    return (
        <div>
            <h5 className="text-xs font-medium text-green-800 mb-1">{label}</h5>
            <div className="flex flex-wrap gap-1.5">
                {items.slice(0, 12).map((item) => (
                    <div
                        key={item.key}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-green-200 rounded text-xs"
                    >
                        {item.isColor && (
                            <div
                                className="w-3 h-3 rounded-sm border border-black/10"
                                style={{ backgroundColor: item.value }}
                            />
                        )}
                        <span className="text-gray-600 font-mono">
                            {item.key}
                        </span>
                    </div>
                ))}
                {items.length > 12 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                        +{items.length - 12} more
                    </span>
                )}
            </div>
        </div>
    )
}
