import React from 'react'
import { figma } from '@figma/code-connect'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
    TabsV2Variant,
    TabsV2Size,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TABSV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * This file contains two connections on the same Figma node, mirroring the V1
 * structure: one for an individual TabsV2Trigger and one for a full TabsV2List
 * (rendered inside a complete TabsV2 compound tree).
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - type (Figma) → variant (Code)
 *      Figma values boxed/floating/underline/pill map to TabsV2Variant.
 *      NOTE: the Figma variant value is `pill` (singular), which maps to
 *      TabsV2Variant.PILLS. V2 adds this pills variant that V1 lacked.
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (sm/md/lg → TabsV2Size). V2 adds `sm` (V1 only had md/lg).
 *    - expanded → expanded (boolean)
 *
 * 3. FIXED PROPS (not available in Figma, set as static defaults):
 *    - value: Tab identifier ('tab-1') — used on TabsV2Trigger.
 *    - children: Trigger label text ('Tab Label') — used on TabsV2Trigger.
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - display: Platform target (always "web"), handled by the library.
 *    - count: Number of tabs (2–8) in the Figma component set. Code Connect
 *      cannot generate a dynamic tab count, so the list example renders a
 *      static 4-tab tree — copy/remove TabsV2Trigger + TabsV2Content pairs to
 *      match your needs.
 *    - state: Interaction state (default/hover/active/disabled), handled
 *      automatically by Radix state + token styling.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value / defaultValue / onValueChange: Controlled tab selection.
 *    - fitContent, disabled, showSkeleton, skeletonVariant, stickyHeader,
 *      offsetTop: Layout, loading and accessibility behaviours.
 *    - leftSlot, rightSlot: ReactNode slots on TabsV2Trigger.
 *    - closable, onClose: Removable ("new/temporary") tab affordance.
 *    - isActive, isOverlay, tabsGroupId: Internal trigger wiring.
 */

/**
 * Connection 1 — individual TabsV2Trigger.
 * Connects to the trigger sub-component so inspecting a single tab button
 * yields the correct <TabsV2Trigger> snippet.
 */
figma.connect(
    TabsV2Trigger,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-733044&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Renamed mapping: type (Figma) → variant (Code)
            variant: figma.enum('type', {
                boxed: TabsV2Variant.BOXED,
                floating: TabsV2Variant.FLOATING,
                underline: TabsV2Variant.UNDERLINE,
                pill: TabsV2Variant.PILLS,
            }),

            // Direct mapping: size
            size: figma.enum('size', {
                sm: TabsV2Size.SM,
                md: TabsV2Size.MD,
                lg: TabsV2Size.LG,
            }),

            // Fixed props for Code Connect (not exposed in Figma)
            value: 'tab-1', // Tab identifier
            children: 'Tab Label', // Tab text content

            // Note: state is Figma-only (interaction state). leftSlot/rightSlot,
            // closable, disabled etc. are code-only and not surfaced here.
        },

        example: ({ variant, size, value, children }) => (
            <TabsV2Trigger variant={variant} size={size} value={value}>
                {children}
            </TabsV2Trigger>
        ),

        imports: [
            "import { TabsV2Trigger, TabsV2Variant, TabsV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/TabsV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-tabsv2--docs',
            },
        ],
    }
)

/**
 * Connection 2 — full TabsV2 compound tree.
 * Connects to the TabSets component (a TabsV2List containing multiple
 * TabsV2Trigger instances) and renders a complete TabsV2 > TabsV2List >
 * TabsV2Trigger ×4 + TabsV2Content ×4 example.
 *
 * NOTE: Figma Code Connect cannot mirror the dynamic `count` property, so this
 * is a static 4-tab example. Add or remove TabsV2Trigger / TabsV2Content
 * pairs (keeping their `value` props in sync) to match your tab count.
 */
figma.connect(
    TabsV2List,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-733044&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Renamed mapping: type (Figma) → variant (Code)
            variant: figma.enum('type', {
                boxed: TabsV2Variant.BOXED,
                floating: TabsV2Variant.FLOATING,
                underline: TabsV2Variant.UNDERLINE,
                pill: TabsV2Variant.PILLS,
            }),

            // Direct mapping: size
            size: figma.enum('size', {
                sm: TabsV2Size.SM,
                md: TabsV2Size.MD,
                lg: TabsV2Size.LG,
            }),

            // Direct mapping: expanded
            expanded: figma.boolean('expanded'),
        },

        example: ({ variant, size, expanded }) => (
            <TabsV2 defaultValue="tab1">
                <TabsV2List variant={variant} size={size} expanded={expanded}>
                    <TabsV2Trigger value="tab1" variant={variant} size={size}>
                        Tab 1
                    </TabsV2Trigger>
                    <TabsV2Trigger value="tab2" variant={variant} size={size}>
                        Tab 2
                    </TabsV2Trigger>
                    <TabsV2Trigger value="tab3" variant={variant} size={size}>
                        Tab 3
                    </TabsV2Trigger>
                    <TabsV2Trigger value="tab4" variant={variant} size={size}>
                        Tab 4
                    </TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">Content for Tab 1</TabsV2Content>
                <TabsV2Content value="tab2">Content for Tab 2</TabsV2Content>
                <TabsV2Content value="tab3">Content for Tab 3</TabsV2Content>
                <TabsV2Content value="tab4">Content for Tab 4</TabsV2Content>
            </TabsV2>
        ),

        imports: [
            "import { TabsV2, TabsV2List, TabsV2Trigger, TabsV2Content, TabsV2Variant, TabsV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/TabsV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-tabsv2--docs',
            },
        ],
    }
)
