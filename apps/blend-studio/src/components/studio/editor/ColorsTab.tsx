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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ColorsTab({ brand, onChange }: EditorTabProps) {
    const [activeGroup, setActiveGroup] = useState<ColorGroupKey>('primary')

    return (
        <div className="space-y-5">
            <TabsV2
                value={activeGroup}
                onValueChange={(value) =>
                    setActiveGroup(value as ColorGroupKey)
                }
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

            <ColorGroupEditor
                group={activeGroup}
                brand={brand}
                onChange={onChange}
            />
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
    )
}
