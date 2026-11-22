import React from 'react'
import { figma } from '@figma/code-connect'
import {
    BreadcrumbV2,
    BreadcrumbV2Item,
    BreadcrumbV2Page,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR BREADCRUMBV2 COMPONENT
 *
 * The Figma component set (node 29297-89271) exposes a single `count`
 * variant (1 / 2 / 3 / 4 / multiple). Text labels, icons, and slot content
 * live in nested layers that are not exposed as component properties, so
 * there are no props to map and the example below is fully static.
 *
 * API CHANGE (V1 → V2):
 *   V1 used the prop API `<Breadcrumb items={[...]} />`. V2 is a compound
 *   component: `<BreadcrumbV2>` renders the list and takes
 *   `<BreadcrumbV2.Item>` children. Each item composes its content with
 *   `<BreadcrumbV2.Page>` (the label) and optional `<BreadcrumbV2.Icon>`
 *   wrappers for left/right slots.
 *
 * CODE-ONLY PROPERTIES (not in Figma):
 *   - maxItems: When the item count exceeds this, the bar collapses to
 *     first crumb + ellipsis + trailing segment(s).
 *   - href: Navigation target for each item (omitted on the active item).
 *   - onClick: Per-item click handler (prevents default navigation for SPA
 *     / client routing).
 *   - isActive: Marks the current (active, last) page.
 *   - items: Alternative to compound children — a flat crumb array.
 *
 * Note: Figma Code Connect cannot mirror the dynamic number of nested item
 * instances, so the example shows a representative 3-item breadcrumb with
 * hardcoded labels. Adjust the crumbs to match your navigation hierarchy.
 */

figma.connect(
    BreadcrumbV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29297-89271&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // The Figma Breadcrumb component only exposes a `count` variant
            // (1/2/3/4/multiple). Text labels, icons, and slot content live
            // inside nested layers that are not exposed as component properties,
            // so they are provided as sensible defaults in the example below.
        },

        example: () => (
            <BreadcrumbV2>
                <BreadcrumbV2Item href="/">
                    <BreadcrumbV2Page>Home</BreadcrumbV2Page>
                </BreadcrumbV2Item>
                <BreadcrumbV2Item href="/category">
                    <BreadcrumbV2Page>Category</BreadcrumbV2Page>
                </BreadcrumbV2Item>
                <BreadcrumbV2Item isActive>
                    <BreadcrumbV2Page>Current Page</BreadcrumbV2Page>
                </BreadcrumbV2Item>
            </BreadcrumbV2>
        ),

        imports: [
            "import { BreadcrumbV2, BreadcrumbV2Item, BreadcrumbV2Page } from '@juspay/blend-design-system'",
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
