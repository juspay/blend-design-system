/**
 * ColorsTab
 *
 * Editor tab for customizing color palettes. Includes brand presets
 * and expandable color group editors with palette generation.
 */

import { useState } from 'react'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Variant,
} from '@juspay/blend-design-system'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import { COLOR_GROUPS, type EditorTabProps, type ColorGroupKey } from './types'

interface ColorsTabProps extends EditorTabProps {
    activeGroup?: ColorGroupKey
    onActiveGroupChange?: (group: ColorGroupKey) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ColorsTab({
    brand,
    onChange,
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
            <TabsV2
                value={selectedGroup}
                onValueChange={handleGroupChange}
                variant={TabsV2Variant.UNDERLINE}
            >
                <TabsV2List>
                    {COLOR_GROUPS.map((group) => (
                        <TabsV2Trigger key={group} value={group}>
                            {group.charAt(0).toUpperCase() + group.slice(1)}
                        </TabsV2Trigger>
                    ))}
                </TabsV2List>
            </TabsV2>

            <div className="flex min-h-0 flex-1 flex-col">
                <ColorGroupEditor
                    group={selectedGroup}
                    brand={brand}
                    onChange={onChange}
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
}

function ColorGroupEditor({ group, brand, onChange }: ColorGroupEditorProps) {
    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <ColorPaletteGenerator
                label={`${group.charAt(0).toUpperCase() + group.slice(1)} Color Scale`}
                value={(brand.colors?.[group] as Record<string, string>) || {}}
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
    )
}
