import { useState, useMemo } from 'react'
import { collectLeafPaths } from './utils'
import { AnatomyEditor } from './AnatomyEditor'
import { TokenSection } from './TokenSection'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Variant,
} from '@juspay/blend-design-system'

type OnUpdate = (path: string, value: string) => void
type OnRemove = (path: string) => void

interface ComponentTokenEditorProps {
    componentKey: string
    resolvedTokens: unknown
    tokenOverrides: Record<string, unknown> | undefined
    onUpdate: OnUpdate
    onRemove: OnRemove
}

function isLeafValue(val: unknown): boolean {
    return (
        val === null ||
        val === undefined ||
        typeof val === 'string' ||
        typeof val === 'number' ||
        typeof val === 'boolean'
    )
}

function isObject(val: unknown): val is Record<string, unknown> {
    return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export function ComponentTokenEditor({
    componentKey,
    resolvedTokens,
    tokenOverrides = {},
    onUpdate,
    onRemove,
}: ComponentTokenEditorProps) {
    const tokens = resolvedTokens as Record<string, unknown> | null
    const [selectedSize, setSelectedSize] = useState<string>('sm')

    const overriddenPaths = useMemo(
        () => new Set(collectLeafPaths(tokenOverrides)),
        [tokenOverrides]
    )

    if (!tokens || typeof tokens !== 'object') {
        return (
            <div className="p-4 text-center text-xs text-gray-400">
                No resolved tokens for {componentKey}
            </div>
        )
    }

    const breakpointKeys = Object.keys(tokens)
    const activeSize = selectedSize || breakpointKeys[0] || 'sm'
    const sizeTokens = tokens[activeSize] as Record<string, unknown> | undefined
    const sizeOverrides = tokenOverrides[activeSize] as
        | Record<string, unknown>
        | undefined

    if (!sizeTokens) return null

    const sections = buildSections(sizeTokens)

    const handleUpdate = (relativePath: string, value: string) => {
        onUpdate(`${activeSize}.${relativePath}`, value)
    }

    const handleRemove = (relativePath: string) => {
        onRemove(`${activeSize}.${relativePath}`)
    }

    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-400">
                Edit any token for this component. Changes apply across all
                variants and reflect in preview instantly. Save &rarr; Publish
                &rarr; CLI pull to use in your app.
            </p>

            {overriddenPaths.size > 0 && (
                <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-lg text-xs">
                    <span className="text-blue-700 font-medium">
                        {overriddenPaths.size} token
                        {overriddenPaths.size !== 1 ? 's' : ''} overridden
                    </span>
                    <button
                        onClick={() => {
                            for (const p of overriddenPaths) onRemove(p)
                        }}
                        className="text-blue-500 hover:text-red-600 font-medium"
                    >
                        Reset all
                    </button>
                </div>
            )}

            <TabsV2
                value={activeSize}
                onValueChange={setSelectedSize}
                variant={TabsV2Variant.BOXED}
            >
                <TabsV2List>
                    {breakpointKeys.map((bp) => (
                        <TabsV2Trigger key={bp} value={bp}>
                            {bp.toUpperCase()}
                        </TabsV2Trigger>
                    ))}
                </TabsV2List>
            </TabsV2>

            <div className="space-y-2">
                {sections.map((section) => (
                    <TokenSection
                        key={section.key}
                        title={formatSectionTitle(section.key)}
                        defaultOpen={section.defaultOpen}
                    >
                        <AnatomyEditor
                            propertyValue={sizeTokens[section.key]}
                            overrides={
                                sizeOverrides?.[section.key] as
                                    | Record<string, unknown>
                                    | undefined
                            }
                            basePath={section.key}
                            breakpoint={activeSize}
                            onUpdate={handleUpdate}
                            onRemove={handleRemove}
                        />
                    </TokenSection>
                ))}
            </div>
        </div>
    )
}

interface Section {
    key: string
    defaultOpen: boolean
}

function buildSections(sizeTokens: Record<string, unknown>): Section[] {
    const PRIORITY_KEYS = new Set([
        'gap',
        'padding',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'borderRadius',
        'height',
        'width',
        'maxWidth',
        'minWidth',
        'maxHeight',
        'minHeight',
    ])

    const DEFAULT_OPEN_KEYS = new Set([
        'backgroundColor',
        'border',
        'boxShadow',
        'shadow',
        'gap',
        'padding',
        'borderRadius',
        'text',
    ])

    const entries = Object.entries(sizeTokens)

    const primitives: Section[] = []
    const containers: Section[] = []
    const rest: Section[] = []

    for (const [key, value] of entries) {
        if (isLeafValue(value)) {
            primitives.push({
                key,
                defaultOpen: DEFAULT_OPEN_KEYS.has(key),
            })
        } else if (isObject(value)) {
            if (PRIORITY_KEYS.has(key)) {
                containers.push({
                    key,
                    defaultOpen: true,
                })
            } else {
                rest.push({
                    key,
                    defaultOpen: DEFAULT_OPEN_KEYS.has(key),
                })
            }
        }
    }

    return [...containers, ...primitives, ...rest]
}

function formatSectionTitle(key: string): string {
    const titles: Record<string, string> = {
        gap: 'Gap',
        padding: 'Padding',
        paddingTop: 'Padding Top',
        paddingRight: 'Padding Right',
        paddingBottom: 'Padding Bottom',
        paddingLeft: 'Padding Left',
        margin: 'Margin',
        marginTop: 'Margin Top',
        marginRight: 'Margin Right',
        marginBottom: 'Margin Bottom',
        marginLeft: 'Margin Left',
        borderRadius: 'Border Radius',
        height: 'Height',
        width: 'Width',
        maxWidth: 'Max Width',
        minWidth: 'Min Width',
        maxHeight: 'Max Height',
        minHeight: 'Min Height',
        backgroundColor: 'Background',
        border: 'Border',
        boxShadow: 'Box Shadow',
        shadow: 'Shadow',
        outline: 'Outline',
        zIndex: 'Z-Index',
        text: 'Text',
        color: 'Color',
        fontSize: 'Font Size',
        fontWeight: 'Font Weight',
        lineHeight: 'Line Height',
        slot: 'Slot',
        container: 'Container',
        content: 'Content',
        mainContainer: 'Main Container',
        topContainer: 'Top Container',
        bottomContainer: 'Bottom Container',
        leftContainer: 'Left Container',
        rightContainer: 'Right Container',
        inputContainer: 'Input Container',
        tabList: 'Tab List',
        trigger: 'Trigger',
        closeButton: 'Close Button',
        iconContainer: 'Icon Container',
        divider: 'Divider',
        separator: 'Separator',
        indicator: 'Indicator',
        badge: 'Badge',
        avatarGroup: 'Avatar Group',
        leftSlot: 'Left Slot',
        rightSlot: 'Right Slot',
        chevron: 'Chevron',
        group: 'Group',
        item: 'Item',
        label: 'Label',
        subLabel: 'Sub Label',
        hintText: 'Hint Text',
        errorMessage: 'Error Message',
        required: 'Required',
        menu: 'Menu',
        subMenu: 'Sub Menu',
        drawer: 'Drawer',
        mobilePanel: 'Mobile Panel',
        searchIcon: 'Search Icon',
        ellipsis: 'Ellipsis',
        header: 'Header',
        body: 'Body',
        footer: 'Footer',
        linear: 'Linear',
        circular: 'Circular',
        transition: 'Transition',
        progress: 'Progress',
        stepper: 'Stepper',
        track: 'Track',
        background: 'Background',
        theme: 'Theme',
        legends: 'Legends',
        chart: 'Chart',
        accordion: 'Accordion',
        radio: 'Radio',
        checkbox: 'Checkbox',
        switch: 'Switch',
        option: 'Option',
        dialog: 'Dialog',
        tooltip: 'Tooltip',
        toast: 'Toast',
        calendar: 'Calendar',
        table: 'Table',
    }
    return titles[key] ?? key.charAt(0).toUpperCase() + key.slice(1)
}
