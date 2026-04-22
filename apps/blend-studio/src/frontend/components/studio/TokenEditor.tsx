import React, { useState, useCallback } from 'react'
import {
    PaintBrush,
    CircleDashed,
    TextAa,
    FloppyDisk,
    ArrowCounterClockwise,
} from '@phosphor-icons/react'
import type { BrandConfig } from '@juspay/blend-design-system/tokens'
import { generateColorScale } from '@juspay/blend-design-system/tokens'

interface TokenEditorProps {
    brandConfig: BrandConfig
    onChange: (config: BrandConfig) => void
    onSave: () => void
    onReset: () => void
    saving?: boolean
}

export function TokenEditor({
    brandConfig,
    onChange,
    onSave,
    onReset,
    saving = false,
}: TokenEditorProps) {
    const [activeSection, setActiveSection] = useState<
        'colors' | 'radius' | 'font'
    >('colors')

    const handleColorChange = useCallback(
        (group: string, shade: string, value: string) => {
            onChange({
                ...brandConfig,
                colors: {
                    ...brandConfig.colors,
                    [group]: {
                        ...brandConfig.colors?.[
                            group as keyof typeof brandConfig.colors
                        ],
                        [shade]: value,
                    },
                },
            })
        },
        [brandConfig, onChange]
    )

    const handleRadiusChange = useCallback(
        (key: string, value: string) => {
            onChange({
                ...brandConfig,
                radius: {
                    ...brandConfig.radius,
                    [key]: value,
                },
            })
        },
        [brandConfig, onChange]
    )

    const handlePrimaryColorGenerate = useCallback(
        (hex: string) => {
            const scale = generateColorScale(hex)
            onChange({
                ...brandConfig,
                colors: {
                    ...brandConfig.colors,
                    primary: scale,
                },
            })
        },
        [brandConfig, onChange]
    )

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {brandConfig.name}
                    </h2>
                    <span className="text-sm text-gray-500 font-mono">
                        {brandConfig.brandId}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
                    >
                        <ArrowCounterClockwise className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        <FloppyDisk className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveSection('colors')}
                    className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                        activeSection === 'colors'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <PaintBrush className="w-4 h-4" />
                    Colors
                </button>
                <button
                    onClick={() => setActiveSection('radius')}
                    className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                        activeSection === 'radius'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <CircleDashed className="w-4 h-4" />
                    Radius
                </button>
                <button
                    onClick={() => setActiveSection('font')}
                    className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                        activeSection === 'font'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <TextAa className="w-4 h-4" />
                    Font
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {activeSection === 'colors' && (
                    <ColorEditor
                        colors={brandConfig.colors}
                        onColorChange={handleColorChange}
                        onPrimaryGenerate={handlePrimaryColorGenerate}
                    />
                )}
                {activeSection === 'radius' && (
                    <RadiusEditor
                        radius={brandConfig.radius}
                        onRadiusChange={handleRadiusChange}
                    />
                )}
                {activeSection === 'font' && (
                    <FontEditor
                        font={brandConfig.font}
                        onFontChange={(font) =>
                            onChange({
                                ...brandConfig,
                                font,
                            })
                        }
                    />
                )}
            </div>
        </div>
    )
}

function ColorEditor({
    colors,
    onColorChange,
    onPrimaryGenerate,
}: {
    colors: BrandConfig['colors']
    onColorChange: (group: string, shade: string, value: string) => void
    onPrimaryGenerate: (hex: string) => void
}) {
    const [primaryInput, setPrimaryInput] = useState('')

    const handleGenerateFromHex = () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(primaryInput)) {
            onPrimaryGenerate(primaryInput)
        }
    }

    const colorGroups = [
        'primary',
        'gray',
        'red',
        'green',
        'yellow',
        'orange',
        'purple',
    ] as const
    const shades = [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '950',
    ]

    return (
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Generate from Primary Color
                </h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={primaryInput}
                        onChange={(e) => setPrimaryInput(e.target.value)}
                        placeholder="#E31837"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md font-mono"
                    />
                    <button
                        onClick={handleGenerateFromHex}
                        disabled={!/^#[0-9A-Fa-f]{6}$/.test(primaryInput)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        Generate
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Enter a single hex color to generate the full 50-950 shade
                    scale
                </p>
            </div>

            {colorGroups.map((group) => (
                <div key={group}>
                    <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                        {group}
                    </h3>
                    <div className="space-y-1">
                        {shades.map((shade) => {
                            const value = colors?.[group]?.[shade] || ''
                            return (
                                <ColorRow
                                    key={`${group}-${shade}`}
                                    group={group}
                                    shade={shade}
                                    value={value}
                                    onChange={onColorChange}
                                />
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

function ColorRow({
    group,
    shade,
    value,
    onChange,
}: {
    group: string
    shade: string
    value: string
    onChange: (group: string, shade: string, value: string) => void
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="w-12 text-xs text-gray-500 font-mono">
                {shade}
            </span>
            <div
                className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: value || '#ffffff' }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(group, shade, e.target.value)}
                placeholder="#000000"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded font-mono"
            />
            <input
                type="color"
                value={value || '#ffffff'}
                onChange={(e) => onChange(group, shade, e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
            />
        </div>
    )
}

function RadiusEditor({
    radius,
    onRadiusChange,
}: {
    radius: BrandConfig['radius']
    onRadiusChange: (key: string, value: string) => void
}) {
    const radiusKeys = ['6', '8', '10', '12', '16', '20', '24', '32']

    const presets = [
        {
            name: 'Sharp',
            values: {
                6: '2px',
                8: '4px',
                10: '4px',
                12: '6px',
                16: '8px',
                20: '10px',
            },
        },
        { name: 'Default', values: {} },
        {
            name: 'Rounded',
            values: {
                6: '12px',
                8: '16px',
                10: '20px',
                12: '24px',
                16: '28px',
                20: '32px',
            },
        },
        {
            name: 'Pill',
            values: {
                6: '9999px',
                8: '9999px',
                10: '9999px',
                12: '9999px',
                16: '9999px',
                20: '9999px',
            },
        },
    ]

    const applyPreset = (preset: (typeof presets)[0]) => {
        Object.entries(preset.values).forEach(([key, value]) => {
            onRadiusChange(key, value)
        })
    }

    return (
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Radius Presets
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => applyPreset(preset)}
                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:border-blue-500"
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Custom Radius Values
                </h3>
                <div className="space-y-2">
                    {radiusKeys.map((key) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="w-16 text-sm text-gray-500">
                                radius.{key}
                            </span>
                            <input
                                type="text"
                                value={radius?.[key] || ''}
                                onChange={(e) =>
                                    onRadiusChange(key, e.target.value)
                                }
                                placeholder={`${key}px`}
                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded font-mono"
                            />
                            <div
                                className="w-8 h-8 bg-blue-100 border border-blue-300 flex-shrink-0"
                                style={{
                                    borderRadius: radius?.[key] || `${key}px`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function FontEditor({
    font,
    onFontChange,
}: {
    font: BrandConfig['font']
    onFontChange: (font: BrandConfig['font']) => void
}) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family
                </label>
                <input
                    type="text"
                    value={font?.family || ''}
                    onChange={(e) =>
                        onFontChange({
                            ...font,
                            family: e.target.value,
                        })
                    }
                    placeholder="Inter, system-ui, sans-serif"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
        </div>
    )
}
