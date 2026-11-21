import React from 'react'
import { figma } from '@figma/code-connect'
import {
    BreadcrumbV2,
    BreadcrumbV2Item,
    BreadcrumbV2Page,
    BreadcrumbV2Icon,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR BREADCRUMBV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * API CHANGE (V1 → V2):
 *   V1 used the prop API `<Breadcrumb items={[...]} />`. V2 is a compound
 *   component: `<BreadcrumbV2>` renders the list and takes
 *   `<BreadcrumbV2.Item>` children. Each item composes its content with
 *   `<BreadcrumbV2.Page>` (the label) and optional `<BreadcrumbV2.Icon>`
 *   wrappers for left/right slots.
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - label (Figma) → BreadcrumbV2Page children (Code)
 *      The Figma text layer `label` becomes the text inside <BreadcrumbV2Page>.
 *
 * 2. BOOLEAN TO SLOT MAPPINGS:
 *    - hasLeftSlot (Figma) → leftSlot via <BreadcrumbV2Icon> (Code)
 *    - hasRightSlot (Figma) → rightSlot via <BreadcrumbV2Icon> (Code)
 *      Figma uses boolean flags that gate instance children; in code the slot
 *      content is wrapped in a <BreadcrumbV2Icon> child of the item.
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - states (default/active): Visual interaction state only. In code, the
 *      current page is marked by passing `isActive` to the last
 *      <BreadcrumbV2.Item>. When using the `items` array API instead of
 *      compound children, the last entry is marked active automatically.
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - maxItems: When the item count exceeds this, the bar collapses to
 *      first crumb + ellipsis + trailing segment(s).
 *    - href: Navigation target for each item (omitted on the active item).
 *    - onClick: Per-item click handler (prevents default navigation for SPA
 *      / client routing).
 *    - items: Alternative to compound children — a flat crumb array.
 *
 * Note: Figma Code Connect cannot mirror the dynamic number of nested item
 * instances, so the example shows a representative 3-item breadcrumb with the
 * configured item as the current (active, last) page. Adjust the count to
 * match your navigation hierarchy.
 */

figma.connect(
    BreadcrumbV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29297-89271&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Direct mapping: label (Figma) → item page text (Code)
            label: figma.string('label'),

            // Slot mappings: Figma boolean flags gate figma.instance children.
            // In code these are wrapped in <BreadcrumbV2Icon> inside the item.
            leftSlot: figma.boolean('hasLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('hasRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),

            // Note: states (default/active) is Figma-only. The current page is
            // marked with `isActive` on the last <BreadcrumbV2.Item> in code.
        },

        example: ({ label, leftSlot, rightSlot }) => (
            <BreadcrumbV2>
                <BreadcrumbV2Item href="/">
                    <BreadcrumbV2Page>Home</BreadcrumbV2Page>
                </BreadcrumbV2Item>
                <BreadcrumbV2Item href="/category">
                    <BreadcrumbV2Page>Category</BreadcrumbV2Page>
                </BreadcrumbV2Item>
                <BreadcrumbV2Item isActive>
                    <BreadcrumbV2Icon>{leftSlot}</BreadcrumbV2Icon>
                    <BreadcrumbV2Page>{label}</BreadcrumbV2Page>
                    <BreadcrumbV2Icon>{rightSlot}</BreadcrumbV2Icon>
                </BreadcrumbV2Item>
            </BreadcrumbV2>
        ),

        imports: [
            "import { BreadcrumbV2, BreadcrumbV2Item, BreadcrumbV2Page, BreadcrumbV2Icon } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/BreadcrumbV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-breadcrumbv2--docs',
            },
        ],
    }
)
