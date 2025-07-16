import React from 'react'
import { figma } from '@figma/code-connect'
import { TabsTrigger, TabsVariant, TabsSize } from 'blend-v1'

/**
 * FIGMA CODE CONNECT FOR TABS COMPONENT (TabsTrigger)
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - variant → variant
 *    - size → size
 *    - value → value (tab identifier)
 *
 * 2. SPECIAL MAPPINGS:
 *    - slot1 (Figma) → leftSlot (Code)
 *    - slot2 (Figma) → rightSlot (Code)
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction state, handled automatically
 *    - hasSlot1: Visibility control, handled by slot1 mapping
 *    - hasSlot2: Visibility control, handled by slot2 mapping
 *
 * Note: This connects to the TabsTrigger component which represents
 * individual tab buttons. The full Tabs implementation requires
 * Tabs, TabsList, TabsTrigger, and TabsContent components.
 */

figma.connect(
    TabsTrigger,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2466-2989&t=GtwfY3QEmeFbCAjz-11',
    {
        props: {
            // Direct enum mappings
            variant: figma.enum('variant', {
                boxed: TabsVariant.BOXED,
                floating: TabsVariant.FLOATING,
                underline: TabsVariant.UNDERLINE,
            }),

            size: figma.enum('size', {
                md: TabsSize.MD,
                lg: TabsSize.LG,
            }),

            // Tab value/identifier
            value: figma.string('value'),

            // Slot mappings
            leftSlot: figma.boolean('hasSlot1', {
                true: figma.instance('slot1'),
                false: undefined,
            }),

            rightSlot: figma.boolean('hasSlot2', {
                true: figma.instance('slot2'),
                false: undefined,
            }),

            // Tab label - using a default text
            children: 'Tab Label',

            // Note: state prop from Figma is not mapped as it's an interaction state
        },

        example: ({ variant, size, value, leftSlot, rightSlot, children }) => (
            <TabsTrigger
                variant={variant}
                size={size}
                value={value}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
            >
                {children}
            </TabsTrigger>
        ),

        imports: ["import { TabsTrigger } from 'blend-v1'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Tabs',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-tabs--docs',
            },
        ],
    }
)

/**
 * Example of full Tabs usage:
 *
 * <Tabs defaultValue="tab1">
 *   <TabsList variant={TabsVariant.BOXED} size={TabsSize.MD}>
 *     <TabsTrigger value="tab1" leftSlot={<Icon />}>
 *       Tab 1
 *     </TabsTrigger>
 *     <TabsTrigger value="tab2">
 *       Tab 2
 *     </TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">
 *     Content for Tab 1
 *   </TabsContent>
 *   <TabsContent value="tab2">
 *     Content for Tab 2
 *   </TabsContent>
 * </Tabs>
 */

/**
 * FIGMA CODE CONNECT FOR TABSETS (TabsList with multiple TabsTrigger)
 *
 * This connects to the TabSets component in Figma which represents
 * a TabsList containing multiple TabsTrigger components.
 *
 * Note: Since Figma Code Connect doesn't support dynamic generation based on
 * the count property, this example shows a typical 4-tab implementation.
 * Developers should adjust the number of tabs based on their needs.
 */

import { Tabs, TabsList, TabsContent } from 'blend-v1'

// TabSets - connection for TabsList component
figma.connect(
    TabsList,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2463-814&t=GtwfY3QEmeFbCAjz-11',
    {
        props: {
            variant: figma.enum('variant', {
                boxed: TabsVariant.BOXED,
                floating: TabsVariant.FLOATING,
                underline: TabsVariant.UNDERLINE,
            }),
            size: figma.enum('size', {
                md: TabsSize.MD,
                lg: TabsSize.LG,
            }),
            expanded: figma.boolean('expanded'),
        },
        example: ({ variant, size, expanded }) => {
            return (
                <Tabs defaultValue="tab1">
                    <TabsList variant={variant} size={size} expanded={expanded}>
                        {/*
                         * NOTE: This is a static example with 4 tabs.
                         * You can add or remove tabs based on your needs:
                         * - Simply copy/paste TabsTrigger components to add more tabs
                         * - Remove TabsTrigger components to have fewer tabs
                         * - Remember to add/remove corresponding TabsContent components
                         */}
                        <TabsTrigger value="tab1" variant={variant} size={size}>
                            Tab 1
                        </TabsTrigger>
                        <TabsTrigger value="tab2" variant={variant} size={size}>
                            Tab 2
                        </TabsTrigger>
                        <TabsTrigger value="tab3" variant={variant} size={size}>
                            Tab 3
                        </TabsTrigger>
                        <TabsTrigger value="tab4" variant={variant} size={size}>
                            Tab 4
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content for Tab 1</TabsContent>
                    <TabsContent value="tab2">Content for Tab 2</TabsContent>
                    <TabsContent value="tab3">Content for Tab 3</TabsContent>
                    <TabsContent value="tab4">Content for Tab 4</TabsContent>
                </Tabs>
            )
        },
        imports: [
            "import { Tabs, TabsList, TabsTrigger, TabsContent } from 'blend-v1'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Tabs',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-tabs--docs',
            },
        ],
    }
)
