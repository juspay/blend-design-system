/**
 * ShadowsTab
 *
 * Editor tab for customizing box-shadow values.
 * Shows visual preview of each shadow level with editable CSS input.
 */

import { SHADOW_KEYS, SHADOW_DEFAULTS, type EditorTabProps } from './types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ShadowsTab({ brand, onChange }: EditorTabProps) {
    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-500">
                Customize shadow values used across all components. Uses CSS
                box-shadow syntax.
            </p>

            {SHADOW_KEYS.map((key) => (
                <ShadowRow
                    key={key}
                    shadowKey={key}
                    value={brand.shadows?.[key] || ''}
                    defaultValue={SHADOW_DEFAULTS[key]}
                    onReset={() =>
                        onChange((prev) => ({
                            ...prev,
                            shadows: {
                                ...prev.shadows,
                                [key]: SHADOW_DEFAULTS[key],
                            },
                        }))
                    }
                    onChange={(value) =>
                        onChange((prev) => ({
                            ...prev,
                            shadows: { ...prev.shadows, [key]: value },
                        }))
                    }
                />
            ))}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Shadow Row
// ---------------------------------------------------------------------------

interface ShadowRowProps {
    shadowKey: string
    value: string
    defaultValue: string
    onReset: () => void
    onChange: (value: string) => void
}

function ShadowRow({
    shadowKey,
    value,
    defaultValue,
    onReset,
    onChange,
}: ShadowRowProps) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-medium text-gray-600">
                    {shadowKey}
                </label>
                <button
                    onClick={onReset}
                    className="text-xs text-gray-400 hover:text-gray-600"
                >
                    Reset
                </button>
            </div>
            <div
                className="w-full h-10 bg-white rounded-lg mb-1"
                style={{ boxShadow: value || defaultValue }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={defaultValue}
                className="w-full px-2 py-1.5 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
