/**
 * TypographyTab
 *
 * Editor tab for customizing font family and weight.
 * Shows a font family selector grid, custom input, and live preview.
 */

import { FONT_FAMILIES, type EditorTabProps } from './types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TypographyTab({ brand, onChange }: EditorTabProps) {
    const selectedFamily = brand.font?.family

    return (
        <div className="space-y-6">
            {/* Font Family Grid */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Font Family
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {FONT_FAMILIES.map((font) => (
                        <FontFamilyOption
                            key={font}
                            font={font}
                            isSelected={selectedFamily === font}
                            onSelect={() =>
                                onChange((prev) => ({
                                    ...prev,
                                    font: { ...prev.font, family: font },
                                }))
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Custom Font Input */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Custom Font
                </h3>
                <input
                    type="text"
                    value={selectedFamily || ''}
                    onChange={(e) =>
                        onChange((prev) => ({
                            ...prev,
                            font: { ...prev.font, family: e.target.value },
                        }))
                    }
                    placeholder="Enter font family name..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                    Make sure the font is loaded in your app (Google Fonts,
                    etc.)
                </p>
            </div>

            {/* Live Preview */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Preview
                </h3>
                <div
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50"
                    style={{ fontFamily: selectedFamily || 'Inter' }}
                >
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                        The quick brown fox
                    </div>
                    <div className="text-base text-gray-600 mb-1">
                        jumps over the lazy dog
                    </div>
                    <div className="text-sm text-gray-400">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Font Family Option
// ---------------------------------------------------------------------------

interface FontFamilyOptionProps {
    font: string
    isSelected: boolean
    onSelect: () => void
}

function FontFamilyOption({
    font,
    isSelected,
    onSelect,
}: FontFamilyOptionProps) {
    return (
        <button
            onClick={onSelect}
            className={`p-3 rounded-lg border text-left transition-colors ${
                isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
        >
            <div
                className="text-base font-medium text-gray-800"
                style={{ fontFamily: font }}
            >
                Aa
            </div>
            <div className="text-xs text-gray-500 mt-1">{font}</div>
        </button>
    )
}
