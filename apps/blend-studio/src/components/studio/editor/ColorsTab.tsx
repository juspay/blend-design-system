/**
 * ColorsTab
 *
 * Editor tab for customizing color palettes. Includes brand presets
 * and expandable color group editors with palette generation.
 */

import { useState } from 'react'
import {
    Tabs,
    TabsVariant,
    type TabItem,
} from '@juspay/blend-design-system/deprecated/tabs'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import { COLOR_GROUPS, type EditorTabProps, type ColorGroupKey } from './types'
import type { BrandConfig } from '@juspay/blend-design-system/tokens'

const COLOR_GROUP_TAB_ITEMS: TabItem[] = COLOR_GROUPS.map((group) => ({
    value: group,
    label: group.charAt(0).toUpperCase() + group.slice(1),
    content: null,
}))

interface ColorsTabProps extends EditorTabProps {
    savedBrand: BrandConfig
    onColorGroupReset: (
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => void
    activeGroup?: ColorGroupKey
    onActiveGroupChange?: (group: ColorGroupKey) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ColorsTab({
    brand,
    savedBrand,
    onChange,
    onColorGroupReset,
    activeGroup,
    onActiveGroupChange,
}: ColorsTabProps) {
    const [localActiveGroup, setLocalActiveGroup] =
        useState<ColorGroupKey>('primary')
    const selectedGroup = activeGroup ?? localActiveGroup

    const handleGroupChange = (value: string) => {
        const nextGroup = value as ColorGroupKey
        setLocalActiveGroup(nextGroup)
        onActiveGroupChange?.(nextGroup)
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <Tabs
                value={selectedGroup}
                onValueChange={handleGroupChange}
                variant={TabsVariant.UNDERLINE}
                items={COLOR_GROUP_TAB_ITEMS}
                className="min-w-0 shrink-0 [&_[data-element=content]]:hidden"
            />

            <div className="flex min-h-0 flex-1 flex-col">
                <ColorGroupEditor
                    group={selectedGroup}
                    brand={brand}
                    savedBrand={savedBrand}
                    onChange={onChange}
                    onColorGroupReset={onColorGroupReset}
                />
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Color Group Editor
// ---------------------------------------------------------------------------

interface ColorGroupEditorProps extends EditorTabProps {
    group: ColorGroupKey
    savedBrand: BrandConfig
    onColorGroupReset: (
        group: ColorGroupKey,
        shades: Record<string, string>
    ) => void
}

function ColorGroupEditor({
    group,
    brand,
    savedBrand,
    onChange,
    onColorGroupReset,
}: ColorGroupEditorProps) {
    const initialValue =
        (savedBrand.colors?.[group] as Record<string, string>) || {}

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <ColorPaletteGenerator
                label={`${group.charAt(0).toUpperCase() + group.slice(1)} Color Scale`}
                value={(brand.colors?.[group] as Record<string, string>) || {}}
                initialValue={initialValue}
                onChange={(shades) =>
                    onChange((prev) => ({
                        ...prev,
                        colors: {
                            ...prev.colors,
                            [group]: shades,
                        },
                    }))
                }
                onReset={(shades) => onColorGroupReset(group, shades)}
            />
        </div>
    )
}
