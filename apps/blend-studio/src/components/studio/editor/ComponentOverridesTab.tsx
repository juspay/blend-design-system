import { useState, useMemo } from 'react'
import { Plus, Trash, CaretDown, CaretRight } from '@phosphor-icons/react'
import { type EditorTabProps, type ColorGroupKey, COLOR_GROUPS } from './types'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import {
    resolveBrandTokens,
    type ComponentOverrides,
} from '@juspay/blend-design-system/tokens'
import { ComponentTokenEditor } from './token-editor'
import {
    removeNestedValue,
    setNestedValueForAllVariants,
} from './token-editor/utils'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Variant,
} from '@juspay/blend-design-system'

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

type SectionTab = 'colors' | 'tokens'

export function ComponentOverridesTab({
    brand,
    onChange,
    onSelectComponent,
    resolvedTokens: externalTokens,
}: EditorTabProps & {
    onSelectComponent?: (componentKey: string | null) => void
    resolvedTokens?: Record<string, unknown> | null
}) {
    const overrides: ComponentOverrides = brand.componentOverrides ?? {}
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        Object.keys(overrides)[0] ?? null
    )
    const [showAddMenu, setShowAddMenu] = useState(false)

    // Use external resolved tokens if provided; only resolve locally as fallback
    const resolvedTokens = useMemo(() => {
        if (externalTokens) return externalTokens
        try {
            return resolveBrandTokens(brand, 'light')
        } catch {
            return null
        }
    }, [brand, externalTokens])

    const addOverride = (key: string) => {
        onChange((prev) => ({
            ...prev,
            componentOverrides: {
                ...prev.componentOverrides,
                [key]: {},
            },
        }))
        setSelectedComponent(key)
        onSelectComponent?.(key)
        setShowAddMenu(false)
    }

    const removeOverride = (key: string) => {
        onChange((prev) => {
            const next = { ...prev.componentOverrides }
            delete next[key]
            return {
                ...prev,
                componentOverrides:
                    Object.keys(next).length > 0 ? next : undefined,
            }
        })
        if (selectedComponent === key) {
            const remaining = Object.keys(overrides).filter((k) => k !== key)
            setSelectedComponent(remaining[0] ?? null)
        }
    }

    const updateColor = (
        key: string,
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => {
        onChange((prev) => ({
            ...prev,
            componentOverrides: {
                ...prev.componentOverrides,
                [key]: {
                    ...prev.componentOverrides?.[key],
                    colors: {
                        ...prev.componentOverrides?.[key]?.colors,
                        [group]: shades,
                    },
                },
            },
        }))
    }

    const updateTokenOverride = (
        componentKey: string,
        path: string,
        value: string
    ) => {
        onChange((prev) => {
            const existing =
                prev.componentOverrides?.[componentKey]?.tokenOverrides ?? {}
            const resolvedCompTokens = resolvedTokens?.[componentKey] as
                | Record<string, unknown>
                | undefined
            const updated = setNestedValueForAllVariants(
                existing,
                path,
                value,
                resolvedCompTokens ?? {}
            )
            return {
                ...prev,
                componentOverrides: {
                    ...prev.componentOverrides,
                    [componentKey]: {
                        ...prev.componentOverrides?.[componentKey],
                        tokenOverrides: updated,
                    },
                },
            }
        })
    }

    const removeTokenOverride = (componentKey: string, path: string) => {
        onChange((prev) => {
            const existing =
                prev.componentOverrides?.[componentKey]?.tokenOverrides ?? {}
            const updated = removeNestedValue(existing, path)
            return {
                ...prev,
                componentOverrides: {
                    ...prev.componentOverrides,
                    [componentKey]: {
                        ...prev.componentOverrides?.[componentKey],
                        tokenOverrides:
                            Object.keys(updated).length > 0
                                ? updated
                                : undefined,
                    },
                },
            }
        })
    }

    const availableComponents = V2_COMPONENTS.filter((c) => !overrides[c])
    const overrideEntries = Object.entries(overrides)

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Component Overrides
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                    Override tokens for specific components — edit colors,
                    padding, gap, borderRadius, fontSize, and more per
                    component.
                </p>
            </div>

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

            {overrideEntries.map(([compKey, compConfig]) => (
                <ComponentCard
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
                    globalColors={brand.colors}
                    resolvedTokens={resolvedTokens?.[compKey]}
                    onUpdateColor={(group, shades) =>
                        updateColor(compKey, group, shades)
                    }
                    onUpdateToken={(path, value) =>
                        updateTokenOverride(compKey, path, value)
                    }
                    onRemoveToken={(path) => removeTokenOverride(compKey, path)}
                />
            ))}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Component Card
// ---------------------------------------------------------------------------

function ComponentCard({
    componentKey,
    label,
    config,
    isExpanded,
    onToggle,
    onRemove,
    globalColors,
    resolvedTokens,
    onUpdateColor,
    onUpdateToken,
    onRemoveToken,
}: {
    componentKey: string
    label: string
    config: NonNullable<ComponentOverrides[string]>
    isExpanded: boolean
    onToggle: () => void
    onRemove: () => void
    globalColors?: Record<string, any>
    resolvedTokens?: unknown
    onUpdateColor: (
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => void
    onUpdateToken: (path: string, value: string) => void
    onRemoveToken: (path: string) => void
}) {
    const [activeTab, setActiveTab] = useState<SectionTab>('tokens')
    const hasColors = config.colors && Object.keys(config.colors).length > 0
    const hasTokenOverrides =
        config.tokenOverrides && Object.keys(config.tokenOverrides).length > 0
    const badge = [hasColors && 'colors', hasTokenOverrides && 'tokens']
        .filter(Boolean)
        .join(' + ')

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <button
                    onClick={onToggle}
                    className="flex-1 flex items-center gap-2.5 text-left"
                >
                    {isExpanded ? (
                        <CaretDown className="w-4 h-4 text-gray-400" />
                    ) : (
                        <CaretRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                        {label}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                        {componentKey}
                    </span>
                    {badge && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                            {badge}
                        </span>
                    )}
                </button>
                <button
                    onClick={onRemove}
                    className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors ml-2"
                    title="Remove override"
                >
                    <Trash className="w-3.5 h-3.5" />
                </button>
            </div>

            {isExpanded && (
                <div className="border-t border-gray-100">
                    <TabsV2
                        value={activeTab}
                        onValueChange={(v) => setActiveTab(v as SectionTab)}
                        variant={TabsV2Variant.BOXED}
                    >
                        <TabsV2List>
                            <TabsV2Trigger value="tokens">Tokens</TabsV2Trigger>
                            <TabsV2Trigger value="colors">Colors</TabsV2Trigger>
                        </TabsV2List>
                    </TabsV2>
                    <div className="p-3">
                        {activeTab === 'tokens' && (
                            <ComponentTokenEditor
                                componentKey={componentKey}
                                resolvedTokens={resolvedTokens}
                                tokenOverrides={config.tokenOverrides}
                                onUpdate={onUpdateToken}
                                onRemove={onRemoveToken}
                            />
                        )}
                        {activeTab === 'colors' && (
                            <ColorOverridesSection
                                config={config}
                                globalColors={globalColors}
                                onUpdateColor={onUpdateColor}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Color Overrides Section
// ---------------------------------------------------------------------------

function ColorOverridesSection({
    config,
    globalColors,
    onUpdateColor,
}: {
    config: NonNullable<ComponentOverrides[string]>
    globalColors?: Record<string, any>
    onUpdateColor: (
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => void
}) {
    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-400">
                Override color groups for this component. Only the groups you
                set will differ from the global brand.
            </p>
            {COLOR_GROUPS.map((group) => {
                const currentShades =
                    (config.colors?.[group] as Record<string, string>) ?? {}
                const globalShades =
                    (globalColors?.[group] as Record<string, string>) ?? {}
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
                            {!currentShades['500'] && globalShades['500'] && (
                                <span className="text-[10px] text-gray-300 font-mono ml-auto">
                                    Global: {globalShades['500']}
                                </span>
                            )}
                        </div>
                        <div className="p-2">
                            <ColorPaletteGenerator
                                label=""
                                value={
                                    Object.keys(currentShades).length > 0
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
    )
}
