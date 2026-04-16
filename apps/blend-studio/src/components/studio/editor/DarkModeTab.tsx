/**
 * DarkModeTab
 *
 * Editor tab for customizing dark mode token overrides.
 * When a user switches to dark mode in the editor, they can
 * set independent color/radius/shadow values that differ from light mode.
 *
 * If no darkModeOverrides are set, the token engine auto-generates
 * dark variants from the light palette.
 */

import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { type EditorTabProps, type ColorGroupKey, COLOR_GROUPS } from './types'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'

export function DarkModeTab({ brand, onChange }: EditorTabProps) {
    const [expandedGroup, setExpandedGroup] = useState<string>('primary')
    const darkOverrides = brand.darkModeOverrides

    const hasDarkOverrides =
        darkOverrides !== undefined &&
        Object.keys(darkOverrides.colors ?? {}).length > 0

    const enableDarkOverrides = () => {
        onChange((prev) => ({
            ...prev,
            darkModeOverrides: {
                colors: {},
            },
        }))
    }

    const removeDarkOverrides = () => {
        onChange((prev) => {
            const next = { ...prev }
            delete next.darkModeOverrides
            return next
        })
    }

    const updateDarkColor = (
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => {
        onChange((prev) => ({
            ...prev,
            darkModeOverrides: {
                ...prev.darkModeOverrides,
                colors: {
                    ...prev.darkModeOverrides?.colors,
                    [group]: shades,
                },
            },
        }))
    }

    if (!hasDarkOverrides && !darkOverrides) {
        return (
            <div className="space-y-5">
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Dark Mode Overrides
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                        By default, dark mode auto-generates from your light
                        palette. Enable overrides to customize dark mode
                        independently.
                    </p>
                </div>

                <div className="p-6 text-center bg-gray-900 rounded-xl border border-gray-700">
                    <Moon className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-300 font-medium mb-1">
                        Using auto-generated dark mode
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                        Dark colors are derived from your light palette
                        automatically
                    </p>
                    <button
                        onClick={enableDarkOverrides}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Sun className="w-4 h-4" />
                        Customize Dark Mode
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Dark Mode Overrides
                    </h3>
                    <p className="text-xs text-gray-400">
                        These values override the light palette when dark mode
                        is active.
                    </p>
                </div>
                <button
                    onClick={removeDarkOverrides}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                    Reset to auto
                </button>
            </div>

            <div className="p-3 bg-gray-900 rounded-lg border border-gray-700 flex items-center gap-2">
                <Moon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-300">
                    Previewing dark mode? Use the theme toggle in the editor
                    header to switch between light and dark.
                </span>
            </div>

            <div className="h-px bg-gray-100" />

            {COLOR_GROUPS.map((group) => {
                const lightColor = brand.colors?.[group]?.['500']
                const darkColor = darkOverrides?.colors?.[group]?.['500']
                const currentDarkShades =
                    (darkOverrides?.colors?.[group] as Record<
                        string,
                        string
                    >) ?? {}
                const lightShades =
                    (brand.colors?.[group] as Record<string, string>) ?? {}
                const isExpanded = expandedGroup === group

                return (
                    <div
                        key={group}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() =>
                                setExpandedGroup(isExpanded ? '' : group)
                            }
                            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className="w-5 h-5 rounded-md border border-black/10"
                                        style={{
                                            backgroundColor:
                                                lightColor || '#E5E7EB',
                                        }}
                                        title="Light mode"
                                    />
                                    <span className="text-[10px] text-gray-400">
                                        →
                                    </span>
                                    <div
                                        className="w-5 h-5 rounded-md border border-white/20"
                                        style={{
                                            backgroundColor:
                                                darkColor ||
                                                lightColor ||
                                                '#E5E7EB',
                                        }}
                                        title="Dark mode override"
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                    {group}
                                </span>
                                {darkColor && (
                                    <span className="text-xs text-blue-500 font-mono">
                                        {darkColor}
                                    </span>
                                )}
                                {!darkColor && lightColor && (
                                    <span className="text-xs text-gray-300 font-mono">
                                        auto: {lightColor}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-400">
                                {isExpanded ? '▲' : '▼'}
                            </span>
                        </button>

                        {isExpanded && (
                            <div className="p-3 border-t border-gray-100">
                                <p className="text-xs text-gray-400 mb-2">
                                    Set dark mode colors for this group. Leave
                                    empty to use auto-derived values.
                                </p>
                                <ColorPaletteGenerator
                                    label=""
                                    value={
                                        Object.keys(currentDarkShades).length >
                                        0
                                            ? currentDarkShades
                                            : lightShades
                                    }
                                    onChange={(shades) =>
                                        updateDarkColor(group, shades)
                                    }
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
