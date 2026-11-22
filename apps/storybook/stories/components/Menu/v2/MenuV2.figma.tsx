import React from 'react'
import { figma } from '@figma/code-connect'
import {
    MenuV2,
    MenuV2ItemVariant,
    MenuV2ItemActionType,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR MENUV2 COMPONENT
 *
 * Two Figma component sets map to MenuV2 (data-driven, not JSX-composed):
 *
 * 1. "Menu" (18805:632109) — the container with search + items
 * 2. "Menu Item" (18805:631956) — an item in the items data array
 *
 * MenuV2 is data-driven: consumers pass `items` as MenuV2GroupType[] arrays
 * (not JSX children), plus a `trigger` ReactElement. MenuV2Item is an
 * internal renderer — the public API is the MenuV2 wrapper with data props.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * MENU CONTAINER:
 * - hasSearch (BOOLEAN, hash #3595:3) → enableSearch (Code: boolean)
 *   Referenced without hash per Code Connect convention.
 * - type (VARIANT: multiSelect | Context Menu | Default) → selectionMode
 *   (Code: 'multiple' for multiSelect, undefined otherwise) and
 *   selectionStyle (Code: 'checkmark' for multiSelect, undefined otherwise)
 * - trigger (Code: ReactElement) — required but no Figma equivalent;
 *   provided as a static <button> sample in the example.
 * - items (Code: MenuV2GroupType[]) — no Figma equivalent; provided as
 *   static sample data in the example.
 *
 * MENU ITEM:
 * - text (TEXT, hash #2598:10) → items[0].items[0].label.text
 * - state (VARIANT: Default | Hover | Selected | NA) → items[0].items[0].selected
 *   (Selected → true; Hover/Default/NA are interaction states, → false)
 * - hasSlotL (BOOLEAN, hash #2598:7) + slotL (INSTANCE_SWAP, hash #3595:6)
 *   → items[0].items[0].label.leftSlot (boolean-gated instance)
 * - type (VARIANT: multiSelect | Action | Default | Label | Separator):
 *   - Action → items[0].items[0].variant: MenuV2ItemVariant.ACTION
 *   - multiSelect → menu-level selectionMode: 'multiple'
 *   - Default → no extra props
 *   - Label → group label (variant-restricted connection)
 *   - Separator → group showSeparator: true (variant-restricted connection)
 * - action (VARIANT: NA | Danger | Primary) → items[0].items[0].actionType
 *   (MenuV2ItemActionType.PRIMARY | DANGER; NA → undefined)
 *
 * UNMAPPED FIGMA PROPS (no code support):
 * - hasShortcut / shortcutValue — no shortcut prop in MenuV2ItemType
 * - hasSlotR1 / slotR1, hasSlotR2 / slotR2 — no right slots in MenuV2ItemLabel
 * - screen (only 'web') — platform flag, not a code prop
 */

// ─── Menu Container ────────────────────────────────────────────────

figma.connect(
    MenuV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-632109',
    {
        props: {
            // Direct mapping (hash-suffixed in Figma: hasSearch#3595:3)
            enableSearch: figma.boolean('hasSearch'),

            // Compound mapping: type → selectionMode
            selectionMode: figma.enum('type', {
                multiSelect: 'multiple',
                'Context Menu': undefined,
                Default: undefined,
            }),

            // Compound mapping: type → selectionStyle
            selectionStyle: figma.enum('type', {
                multiSelect: 'checkmark',
                'Context Menu': undefined,
                Default: undefined,
            }),
        },

        example: ({ enableSearch, selectionMode, selectionStyle }) => (
            <MenuV2
                trigger={<button>Open menu</button>}
                enableSearch={enableSearch}
                selectionMode={selectionMode}
                selectionStyle={selectionStyle}
                items={[
                    {
                        items: [
                            { label: { text: 'Option 1' }, onClick: () => {} },
                            { label: { text: 'Option 2' }, onClick: () => {} },
                        ],
                    },
                ]}
            />
        ),

        imports: ["import { MenuV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/MenuV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-menuv2--docs',
            },
        ],
    }
)

// ─── Menu Item — General (Default / multiSelect / Action) ──────────

figma.connect(
    MenuV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-631956',
    {
        props: {
            // Direct text mapping (hash-suffixed in Figma: text#2598:10)
            text: figma.string('text'),

            // State mapping: Selected → true; Hover/Default/NA are
            // interaction states handled by CSS, not data props
            selected: figma.enum('state', {
                Default: false,
                Hover: false,
                Selected: true,
                NA: false,
            }),

            // Boolean-gated instance slot (hasSlotL#2598:7 / slotL#3595:6)
            leftSlot: figma.boolean('hasSlotL', {
                true: figma.instance('slotL'),
                false: undefined,
            }),

            // Compound mapping: type → item variant
            itemVariant: figma.enum('type', {
                Default: undefined,
                multiSelect: undefined,
                Action: MenuV2ItemVariant.ACTION,
                Label: undefined,
                Separator: undefined,
            }),

            // Compound mapping: type → menu selectionMode
            selectionMode: figma.enum('type', {
                Default: undefined,
                multiSelect: 'multiple',
                Action: undefined,
                Label: undefined,
                Separator: undefined,
            }),

            // Compound mapping: type → menu selectionStyle
            selectionStyle: figma.enum('type', {
                Default: undefined,
                multiSelect: 'checkmark',
                Action: undefined,
                Label: undefined,
                Separator: undefined,
            }),

            // Action type mapping (NA → no action)
            actionType: figma.enum('action', {
                NA: undefined,
                Danger: MenuV2ItemActionType.DANGER,
                Primary: MenuV2ItemActionType.PRIMARY,
            }),
        },

        example: ({
            text,
            selected,
            leftSlot,
            itemVariant,
            selectionMode,
            selectionStyle,
            actionType,
        }) => (
            <MenuV2
                trigger={<button>Open menu</button>}
                selectionMode={selectionMode}
                selectionStyle={selectionStyle}
                items={[
                    {
                        items: [
                            {
                                label: { text: text, leftSlot: leftSlot },
                                variant: itemVariant,
                                actionType: actionType,
                                selected: selected,
                                onClick: () => {},
                            },
                        ],
                    },
                ]}
            />
        ),

        imports: [
            "import { MenuV2, MenuV2ItemVariant, MenuV2ItemActionType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/MenuV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-menuv2--docs',
            },
        ],
    }
)

// ─── Menu Item — Label Variant (group label) ────────────────────────

figma.connect(
    MenuV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-631956',
    {
        variant: { type: 'Label' },

        props: {
            // The item text becomes the group label
            text: figma.string('text'),
        },

        example: ({ text }) => (
            <MenuV2
                trigger={<button>Open menu</button>}
                items={[
                    {
                        label: text,
                        items: [
                            { label: { text: 'Option 1' }, onClick: () => {} },
                            { label: { text: 'Option 2' }, onClick: () => {} },
                        ],
                    },
                ]}
            />
        ),

        imports: ["import { MenuV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/MenuV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-menuv2--docs',
            },
        ],
    }
)

// ─── Menu Item — Separator Variant ──────────────────────────────────

figma.connect(
    MenuV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-631956',
    {
        variant: { type: 'Separator' },

        example: () => (
            <MenuV2
                trigger={<button>Open menu</button>}
                items={[
                    {
                        items: [
                            { label: { text: 'Option 1' }, onClick: () => {} },
                        ],
                    },
                    {
                        items: [
                            { label: { text: 'Option 2' }, onClick: () => {} },
                        ],
                        showSeparator: true,
                    },
                ]}
            />
        ),

        imports: ["import { MenuV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/MenuV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-menuv2--docs',
            },
        ],
    }
)
