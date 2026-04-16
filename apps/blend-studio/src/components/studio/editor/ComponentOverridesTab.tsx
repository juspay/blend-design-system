/**
 * ComponentOverridesTab
 *
 * Editor tab for per-component token overrides. When a user wants a
 * specific component to use different colors/radius than the global brand,
 * they can add overrides here.
 *
 * Example: A "destructive" Button variant that uses red instead of the
 * global primary blue.
 */

import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { type EditorTabProps, type ColorGroupKey, COLOR_GROUPS } from './types'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import type { ComponentOverrides } from '@blend-design/token-engine'

const V2_COMPONENTS = [
    'BUTTONV2',
    'ACCORDIONV2',
    'ALERTV2',
    'AVATARV2',
    'BREADCRUMBV2',
    'CHECKBOXV2',
    'KEYVALUEPAIRV2',
    'MENU_V2',
    'MULTI_SELECT_V2',
    'POPOVERV2',
    'PROGRESS_BARV2',
    'RADIOV2',
    'SINGLE_SELECT_V2',
    'SWITCHV2',
    'SNACKBARV2',
    'STATCARDV2',
    'TABSV2',
    'TAGV2',
    'TEXT_INPUTV2',
    'TIMELINE',
    'TOOLTIPV2',
    'TOPBARV2',
    'SIDEBARV2',
] as const

const COMPONENT_LABELS: Record<string, string> = {
    BUTTONV2: 'Button',
    ACCORDIONV2: 'Accordion',
    ALERTV2: 'Alert',
    AVATARV2: 'Avatar',
    BREADCRUMBV2: 'Breadcrumb',
    CHECKBOXV2: 'Checkbox',
    KEYVALUEPAIRV2: 'Key Value Pair',
    MENU_V2: 'Menu',
    MULTI_SELECT_V2: 'Multi Select',
    POPOVERV2: 'Popover',
    PROGRESS_BARV2: 'Progress Bar',
    RADIOV2: 'Radio',
    SINGLE_SELECT_V2: 'Single Select',
    SWITCHV2: 'Switch',
    SNACKBARV2: 'Snackbar',
    STATCARDV2: 'Stat Card',
    TABSV2: 'Tabs',
    TAGV2: 'Tag',
    TEXT_INPUTV2: 'Text Input',
    TIMELINE: 'Timeline',
    TOOLTIPV2: 'Tooltip',
    TOPBARV2: 'Topbar',
    SIDEBARV2: 'Sidebar',
}

export function ComponentOverridesTab({
    brand,
    onChange,
    onSelectComponent,
}: EditorTabProps & {
    onSelectComponent?: (componentKey: string | null) => void
}) {
    const overrides: ComponentOverrides = brand.componentOverrides ?? {}
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        Object.keys(overrides)[0] ?? null
    )
    const [showAddMenu, setShowAddMenu] = useState(false)

    const handleSelectComponent = (componentKey: string | null) => {
        setSelectedComponent(componentKey)
        onSelectComponent?.(componentKey)
    }

    const addOverride = (componentKey: string) => {
        onChange((prev) => ({
            ...prev,
            componentOverrides: {
                ...prev.componentOverrides,
                [componentKey]: { colors: {} },
            },
        }))
        handleSelectComponent(componentKey)
        setShowAddMenu(false)
    }

    const removeOverride = (componentKey: string) => {
        onChange((prev) => {
            const next = { ...prev.componentOverrides }
            delete next[componentKey]
            return {
                ...prev,
                componentOverrides:
                    Object.keys(next).length > 0 ? next : undefined,
            }
        })
        if (selectedComponent === componentKey) {
            const remaining = Object.keys(overrides).filter(
                (k) => k !== componentKey
            )
            handleSelectComponent(remaining[0] ?? null)
        }
    }

    const updateComponentColor = (
        componentKey: string,
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => {
        onChange((prev) => ({
            ...prev,
            componentOverrides: {
                ...prev.componentOverrides,
                [componentKey]: {
                    ...prev.componentOverrides?.[componentKey],
                    colors: {
                        ...prev.componentOverrides?.[componentKey]?.colors,
                        [group]: shades,
                    },
                },
            },
        }))
    }

    const overrideEntries = Object.entries(overrides)
    const availableComponents = V2_COMPONENTS.filter((c) => !overrides[c])

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Component Overrides
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                    Override tokens for specific components. E.g., make a Button
                    red while the global primary is blue.
                </p>
            </div>

            {/* Add Component Override */}
            <div className="relative">
                <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors w-full justify-center"
                >
                    <Plus className="w-4 h-4" />
                    Add Component Override
                </button>

                {showAddMenu && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {availableComponents.length === 0 ? (
                            <div className="p-3 text-xs text-gray-400 text-center">
                                All components have overrides
                            </div>
                        ) : (
                            availableComponents.map((comp) => (
                                <button
                                    key={comp}
                                    onClick={() => addOverride(comp)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                >
                                    {COMPONENT_LABELS[comp] ?? comp}
                                    <span className="text-xs text-gray-400 ml-2 font-mono">
                                        {comp}
                                    </span>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            {overrideEntries.length === 0 && (
                <div className="p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-sm text-gray-500">
                        No component overrides yet
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Add one to customize a specific component independently
                    </p>
                </div>
            )}

            {/* Override List */}
            {overrideEntries.map(([compKey, compConfig]) => (
                <ComponentOverrideCard
                    key={compKey}
                    componentKey={compKey}
                    label={COMPONENT_LABELS[compKey] ?? compKey}
                    config={compConfig}
                    isExpanded={selectedComponent === compKey}
                    onToggle={() =>
                        setSelectedComponent(
                            selectedComponent === compKey ? null : compKey
                        )
                    }
                    onRemove={() => removeOverride(compKey)}
                    onUpdateColor={(group, shades) =>
                        updateComponentColor(compKey, group, shades)
                    }
                    globalColors={brand.colors}
                />
            ))}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ComponentOverrideCard({
    componentKey,
    label,
    config,
    isExpanded,
    onToggle,
    onRemove,
    onUpdateColor,
    globalColors,
}: {
    componentKey: string
    label: string
    config: NonNullable<ComponentOverrides[string]>
    isExpanded: boolean
    onToggle: () => void
    onRemove: () => void
    onUpdateColor: (
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => void
    globalColors?: Record<string, any>
}) {
    const hasOverrides = config.colors && Object.keys(config.colors).length > 0

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <button
                    onClick={onToggle}
                    className="flex-1 flex items-center gap-2.5 text-left"
                >
                    {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                        {label}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                        {componentKey}
                    </span>
                    {hasOverrides && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                            Custom
                        </span>
                    )}
                </button>
                <button
                    onClick={onRemove}
                    className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors ml-2"
                    title="Remove override"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            {isExpanded && (
                <div className="p-3 border-t border-gray-100 space-y-3">
                    <p className="text-xs text-gray-400">
                        Override colors for this component. Only the groups you
                        set here will differ from the global brand.
                    </p>

                    {COLOR_GROUPS.map((group) => {
                        const currentShades =
                            (config.colors?.[group] as Record<
                                string,
                                string
                            >) ?? {}
                        const globalShades =
                            (globalColors?.[group] as Record<string, string>) ??
                            {}

                        return (
                            <div
                                key={group}
                                className="border border-gray-100 rounded-lg overflow-hidden"
                            >
                                <div className="flex items-center gap-2 p-2 bg-gray-50">
                                    <div
                                        className="w-4 h-4 rounded border border-black/10"
                                        style={{
                                            backgroundColor:
                                                currentShades['500'] ??
                                                globalShades['500'] ??
                                                '#E5E7EB',
                                        }}
                                    />
                                    <span className="text-xs font-medium text-gray-600 capitalize">
                                        {group}
                                    </span>
                                    {currentShades['500'] && (
                                        <span className="text-[10px] text-gray-400 font-mono ml-auto">
                                            Override: {currentShades['500']}
                                        </span>
                                    )}
                                    {!currentShades['500'] &&
                                        globalShades['500'] && (
                                            <span className="text-[10px] text-gray-300 font-mono ml-auto">
                                                Using global:{' '}
                                                {globalShades['500']}
                                            </span>
                                        )}
                                </div>
                                <div className="p-2">
                                    <ColorPaletteGenerator
                                        label=""
                                        value={
                                            Object.keys(currentShades).length >
                                            0
                                                ? currentShades
                                                : globalShades
                                        }
                                        onChange={(shades) =>
                                            onUpdateColor(group, shades)
                                        }
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
