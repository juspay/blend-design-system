/**
 * ColorsTab
 *
 * Editor tab for customizing color palettes. Includes brand presets
 * and expandable color group editors with palette generation.
 */

import { useState } from 'react'
import { listPresets, getPreset } from '@blend-design/token-engine'
import { CaretDown, CaretRight } from '@phosphor-icons/react'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import { COLOR_GROUPS, type EditorTabProps, type ColorGroupKey } from './types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ColorsTab({ brand, onChange }: EditorTabProps) {
    const presets = listPresets()
    const [expandedGroup, setExpandedGroup] = useState<string>('primary')

    const applyPreset = (presetName: string) => {
        const presetConfig = getPreset(presetName)
        if (!presetConfig) return

        onChange((prev) => ({
            ...prev,
            colors: { ...prev.colors, ...presetConfig.colors },
            radius: presetConfig.radius
                ? { ...prev.radius, ...presetConfig.radius }
                : prev.radius,
        }))
    }

    return (
        <div className="space-y-5">
            {/* Brand Presets */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Brand Presets
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => applyPreset(preset.name)}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                        >
                            <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0"
                                style={{
                                    backgroundColor:
                                        getPreset(preset.name)?.colors
                                            ?.primary?.['500'] || '#3B82F6',
                                }}
                            />
                            <span className="text-xs font-medium text-gray-700 capitalize">
                                {preset.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Color Groups */}
            {COLOR_GROUPS.map((group) => (
                <ColorGroupEditor
                    key={group}
                    group={group}
                    brand={brand}
                    onChange={onChange}
                    isExpanded={expandedGroup === group}
                    onToggle={() =>
                        setExpandedGroup(expandedGroup === group ? '' : group)
                    }
                />
            ))}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Color Group Editor
// ---------------------------------------------------------------------------

interface ColorGroupEditorProps extends EditorTabProps {
    group: ColorGroupKey
    isExpanded: boolean
    onToggle: () => void
}

function ColorGroupEditor({
    group,
    brand,
    onChange,
    isExpanded,
    onToggle,
}: ColorGroupEditorProps) {
    const currentColor = brand.colors?.[group]?.['500']

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-5 h-5 rounded-md border border-black/10"
                        style={{ backgroundColor: currentColor || '#E5E7EB' }}
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                        {group}
                    </span>
                    {brand.colors?.[group] && (
                        <span className="text-xs text-gray-400 font-mono">
                            {currentColor}
                        </span>
                    )}
                </div>
                {isExpanded ? (
                    <CaretDown className="w-4 h-4 text-gray-400" />
                ) : (
                    <CaretRight className="w-4 h-4 text-gray-400" />
                )}
            </button>

            {isExpanded && (
                <div className="p-3 border-t border-gray-100">
                    <ColorPaletteGenerator
                        label={`${group.charAt(0).toUpperCase() + group.slice(1)} Color Scale`}
                        value={
                            (brand.colors?.[group] as Record<string, string>) ||
                            {}
                        }
                        onChange={(shades) =>
                            onChange((prev) => ({
                                ...prev,
                                colors: {
                                    ...prev.colors,
                                    [group]: shades,
                                },
                            }))
                        }
                    />
                </div>
            )}
        </div>
    )
}
