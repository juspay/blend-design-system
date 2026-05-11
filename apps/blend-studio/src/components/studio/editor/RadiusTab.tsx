/**
 * RadiusTab
 *
 * Editor tab for customizing border radius values.
 * Includes preset buttons and individual radius fine-tuning.
 */

import { RADIUS_KEYS, RADIUS_PRESETS, type EditorTabProps } from './types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RadiusTab({ brand, onChange }: EditorTabProps) {
    const applyPreset = (preset: (typeof RADIUS_PRESETS)[number]) => {
        onChange((prev) => ({
            ...prev,
            radius: { ...prev.radius, ...preset.values },
        }))
    }

    const current8 = brand.radius?.['8'] || '8px'

    return (
        <div className="space-y-5">
            {/* Presets */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Presets
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {RADIUS_PRESETS.map((preset) => {
                        const previewRadius = preset.values['8']
                        const isActive = current8 === previewRadius

                        return (
                            <button
                                key={preset.name}
                                onClick={() => applyPreset(preset)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-xs font-medium transition-colors ${
                                    isActive
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div
                                    className="w-8 h-8 bg-blue-400"
                                    style={{ borderRadius: previewRadius }}
                                />
                                {preset.name}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Fine-tune */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Fine-tune
                </h3>
                <div className="space-y-2">
                    {RADIUS_KEYS.map((key) => (
                        <RadiusRow
                            key={key}
                            radiusKey={key}
                            value={brand.radius?.[key] || ''}
                            onChange={(value) =>
                                onChange((prev) => ({
                                    ...prev,
                                    radius: { ...prev.radius, [key]: value },
                                }))
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Radius Row
// ---------------------------------------------------------------------------

interface RadiusRowProps {
    radiusKey: string
    value: string
    onChange: (value: string) => void
}

function RadiusRow({ radiusKey, value, onChange }: RadiusRowProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 text-xs font-mono text-gray-500 text-right">
                {radiusKey}
            </div>
            <div
                className="w-8 h-8 bg-blue-400 shrink-0"
                style={{ borderRadius: value || '0px' }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`${radiusKey}px`}
                className="flex-1 px-2 py-1.5 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
