/**
 * MultiExportPanel
 *
 * Exports brand tokens to multiple design system formats:
 * - Tailwind CSS config
 * - Material UI theme
 * - Chakra UI theme
 * - CSS Custom Properties
 * - Style Dictionary
 * - Figma Variables JSON
 *
 * This is the key white-label differentiator — one brand config
 * produces tokens for ANY design system.
 */

import { useState, useMemo } from 'react'
import { Copy, Check, Download, Code, PaintBrush } from '@phosphor-icons/react'
import type { BrandConfig } from '@blend-design/token-engine'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MultiExportPanelProps {
    brand: BrandConfig
    branchId: string
}

type ExportFormat =
    | 'tailwind'
    | 'material-ui'
    | 'chakra'
    | 'css-vars'
    | 'style-dictionary'
    | 'figma'

interface FormatOption {
    id: ExportFormat
    label: string
    description: string
    filename: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FORMAT_OPTIONS: FormatOption[] = [
    {
        id: 'tailwind',
        label: 'Tailwind CSS',
        description: 'tailwind.config.js colors + borderRadius + boxShadow',
        filename: 'tailwind.config.ts',
    },
    {
        id: 'material-ui',
        label: 'Material UI',
        description: 'createTheme() with palette, shape, shadows',
        filename: 'mui-theme.ts',
    },
    {
        id: 'chakra',
        label: 'Chakra UI',
        description: 'extendTheme() with colors, radii, shadows',
        filename: 'chakra-theme.ts',
    },
    {
        id: 'css-vars',
        label: 'CSS Custom Properties',
        description: ':root { --color-primary-500: ... } etc.',
        filename: 'tokens.css',
    },
    {
        id: 'style-dictionary',
        label: 'Style Dictionary',
        description: 'W3C Design Tokens Community Group format',
        filename: 'tokens.json',
    },
    {
        id: 'figma',
        label: 'Figma Variables',
        description: 'Importable JSON for Figma Variables API',
        filename: 'figma-variables.json',
    },
]

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

function generateTailwind(brand: BrandConfig): string {
    const colors: Record<string, Record<string, string>> = {}
    for (const [group, shades] of Object.entries(brand.colors || {})) {
        if (shades && typeof shades === 'object') {
            colors[group] = shades as Record<string, string>
        }
    }

    const radius: Record<string, string> = {}
    for (const [key, value] of Object.entries(brand.radius || {})) {
        if (value !== undefined) radius[key] = String(value)
    }

    const shadows: Record<string, string> = {}
    for (const [key, value] of Object.entries(brand.shadows || {})) {
        if (value !== undefined) shadows[key] = String(value)
    }

    return `import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8)},
      borderRadius: ${JSON.stringify(radius, null, 8)},
      boxShadow: ${JSON.stringify(shadows, null, 8)},
      fontFamily: ${
          brand.font?.family
              ? `{ sans: ['${brand.font.family}', 'system-ui', 'sans-serif'] }`
              : '{}'
      },
    },
  },
}

export default config`
}

function generateMaterialUI(brand: BrandConfig): string {
    const primary = brand.colors?.primary || {}
    const gray = brand.colors?.gray || {}
    const error = brand.colors?.red || {}
    const success = brand.colors?.green || {}

    return `import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '${primary['500'] || '#3B82F6'}',
      light: '${primary['300'] || '#93C5FD'}',
      dark: '${primary['700'] || '#1D4ED8'}',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '${primary['100'] || '#DBEAFE'}',
    },
    error: {
      main: '${error['500'] || '#EF4444'}',
    },
    success: {
      main: '${success['500'] || '#10B981'}',
    },
    text: {
      primary: '${gray['900'] || '#111827'}',
      secondary: '${gray['600'] || '#4B5563'}',
      disabled: '${gray['400'] || '#9CA3AF'}',
    },
  },
  shape: {
    borderRadius: ${parseInt(brand.radius?.['8'] || '8')},
  },
  shadows: ${JSON.stringify(Object.values(brand.shadows || {}), null, 4)},
  typography: {
    fontFamily: '${brand.font?.family || 'Inter'}',
  },
})

export default theme`
}

function generateChakra(brand: BrandConfig): string {
    const colors: Record<string, Record<string, string>> = {}
    for (const [group, shades] of Object.entries(brand.colors || {})) {
        if (shades && typeof shades === 'object') {
            colors[group] = shades as Record<string, string>
        }
    }

    return `import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: ${JSON.stringify(colors, null, 4)},
  radii: ${JSON.stringify(brand.radius || {}, null, 4)},
  shadows: ${JSON.stringify(brand.shadows || {}, null, 4)},
  fonts: {
    heading: '${brand.font?.family || 'Inter'}',
    body: '${brand.font?.family || 'Inter'}',
  },
})

export default theme`
}

function generateCssVars(brand: BrandConfig): string {
    const lines: string[] = [':root {']

    for (const [group, shades] of Object.entries(brand.colors || {})) {
        if (shades && typeof shades === 'object') {
            for (const [shade, value] of Object.entries(shades)) {
                lines.push(`  --color-${group}-${shade}: ${value};`)
            }
        }
    }

    for (const [key, value] of Object.entries(brand.radius || {})) {
        lines.push(`  --radius-${key}: ${value};`)
    }

    for (const [key, value] of Object.entries(brand.shadows || {})) {
        lines.push(`  --shadow-${key}: ${value};`)
    }

    if (brand.font?.family) {
        lines.push(`  --font-family: ${brand.font.family};`)
    }

    lines.push('}')
    return lines.join('\n')
}

function generateStyleDictionary(brand: BrandConfig): string {
    const tokens: Record<string, unknown> = {
        color: {},
        borderRadius: {},
        shadow: {},
        fontFamily: {},
    }

    for (const [group, shades] of Object.entries(brand.colors || {})) {
        if (shades && typeof shades === 'object') {
            const groupTokens: Record<string, unknown> = {}
            for (const [shade, value] of Object.entries(shades)) {
                groupTokens[shade] = {
                    $value: value,
                    $type: 'color',
                    $description: `${group} ${shade} from ${brand.name}`,
                }
            }
            ;(tokens.color as Record<string, unknown>)[group] = groupTokens
        }
    }

    for (const [key, value] of Object.entries(brand.radius || {})) {
        ;(tokens.borderRadius as Record<string, unknown>)[key] = {
            $value: value,
            $type: 'dimension',
            $description: `Border radius ${key}`,
        }
    }

    for (const [key, value] of Object.entries(brand.shadows || {})) {
        ;(tokens.shadow as Record<string, unknown>)[key] = {
            $value: value,
            $type: 'shadow',
            $description: `Shadow ${key}`,
        }
    }

    if (brand.font?.family) {
        tokens.fontFamily = {
            base: {
                $value: brand.font.family,
                $type: 'fontFamily',
                $description: 'Base font family',
            },
        }
    }

    return JSON.stringify(
        {
            $schema: 'https://design-tokens.github.io/community-group/format/',
            [brand.brandId || 'brand']: tokens,
        },
        null,
        2
    )
}

function generateFigma(brand: BrandConfig): string {
    const collections: unknown[] = [
        {
            name: `Brand Colors - ${brand.name}`,
            modes: [{ name: 'Light', modeId: 'light' }],
            variables: Object.entries(brand.colors || {}).flatMap(
                ([group, shades]) => {
                    if (!shades || typeof shades !== 'object') return []
                    return Object.entries(shades).map(([shade, value]) => ({
                        name: `${group}/${shade}`,
                        type: 'COLOR',
                        valuesByMode: { light: value },
                    }))
                }
            ),
        },
    ]

    if (Object.keys(brand.radius || {}).length > 0) {
        collections.push({
            name: `Brand Radius - ${brand.name}`,
            modes: [{ name: 'Light', modeId: 'light' }],
            variables: Object.entries(brand.radius || {}).map(
                ([key, value]) => ({
                    name: `radius/${key}`,
                    type: 'FLOAT',
                    valuesByMode: {
                        light: parseFloat(String(value || '0')),
                    },
                })
            ),
        })
    }

    return JSON.stringify(
        {
            version: '1.0',
            metadata: {
                generator: 'Blend Token Studio',
                branchId: brand.brandId,
                exportedAt: new Date().toISOString(),
            },
            collections,
        },
        null,
        2
    )
}

// ---------------------------------------------------------------------------
// Generator Map
// ---------------------------------------------------------------------------

const GENERATORS: Record<ExportFormat, (brand: BrandConfig) => string> = {
    tailwind: generateTailwind,
    'material-ui': generateMaterialUI,
    chakra: generateChakra,
    'css-vars': generateCssVars,
    'style-dictionary': generateStyleDictionary,
    figma: generateFigma,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MultiExportPanel({ brand }: MultiExportPanelProps) {
    const [selectedFormat, setSelectedFormat] =
        useState<ExportFormat>('tailwind')
    const [copied, setCopied] = useState(false)

    const generatedCode = useMemo(
        () => GENERATORS[selectedFormat](brand),
        [brand, selectedFormat]
    )

    const currentFormat = FORMAT_OPTIONS.find((f) => f.id === selectedFormat)!

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([generatedCode], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = currentFormat.filename
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Multi-Framework Export
                </h3>
                <p className="text-xs text-gray-500">
                    One brand config → tokens for any design system. No other
                    tool does this.
                </p>
            </div>

            {/* Format Selector */}
            <div className="grid grid-cols-2 gap-2">
                {FORMAT_OPTIONS.map((format) => (
                    <button
                        key={format.id}
                        onClick={() => setSelectedFormat(format.id)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                            selectedFormat === format.id
                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-0.5">
                            <FormatIcon formatId={format.id} />
                            <span
                                className={`text-xs font-medium ${
                                    selectedFormat === format.id
                                        ? 'text-blue-700'
                                        : 'text-gray-800'
                                }`}
                            >
                                {format.label}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500 line-clamp-2">
                            {format.description}
                        </p>
                    </button>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleCopy}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                    onClick={handleDownload}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    {currentFormat.filename}
                </button>
            </div>

            {/* Preview */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <FormatIcon formatId={selectedFormat} light />
                        <span className="text-xs text-gray-400 font-mono">
                            {currentFormat.filename}
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-500">
                        {generatedCode.split('\n').length} lines
                    </span>
                </div>
                <pre className="p-4 text-xs font-mono text-gray-800 bg-white max-h-[400px] overflow-auto">
                    {generatedCode}
                </pre>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Format Icon
// ---------------------------------------------------------------------------

function FormatIcon({
    formatId,
    light = false,
}: {
    formatId: ExportFormat
    light?: boolean
}) {
    const color = light ? 'text-gray-400' : 'text-gray-500'
    switch (formatId) {
        case 'tailwind':
            return <Code className={`w-3.5 h-3.5 ${color}`} />
        case 'material-ui':
            return <PaintBrush className={`w-3.5 h-3.5 ${color}`} />
        case 'chakra':
            return <Code className={`w-3.5 h-3.5 ${color}`} />
        case 'css-vars':
            return <Code className={`w-3.5 h-3.5 ${color}`} />
        case 'style-dictionary':
            return <Code className={`w-3.5 h-3.5 ${color}`} />
        case 'figma':
            return <PaintBrush className={`w-3.5 h-3.5 ${color}`} />
    }
}
