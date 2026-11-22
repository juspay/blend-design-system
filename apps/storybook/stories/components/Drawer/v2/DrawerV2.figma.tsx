import React from 'react'
import { figma } from '@figma/code-connect'
import {
    DrawerV2,
    DrawerV2Body,
    DrawerV2Close,
    DrawerV2Content,
    DrawerV2Description,
    DrawerV2Footer,
    DrawerV2Header,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    DrawerV2Trigger,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR DRAWERV2 COMPONENT
 *
 * Two Figma component sets map to DrawerV2 — a Vaul-based *compound*
 * component (Root + Trigger + Portal + Overlay + Content + Header +
 * Title + Description + Body + Footer + Close). Every Figma boolean
 * prop returns the matching rendered sub-element (or undefined);
 * variant props select different body / footer patterns.
 *
 * 1. "Bottom Drawer" (18797:275741) — 13 variants
 *    VARIANT props:
 *      state: [default, stack, slideIn]  → CSS-only (ignored in code)
 *      type: [slot, singleSelect, multiSelect, info, status]
 *                                     → drives <DrawerV2Body> children
 *    BOOLEAN props (hash-suffixed):
 *      hasTitle#15055:3, hasDesciprtion#15091:12 (typo),
 *      hasTitleSlot#15091:9 (decorative, ignored),
 *      hasHeader#15091:15, hasFooter#15055:5
 *    TEXT props (hash-suffixed):
 *      title#15055:4, description#15091:6
 *
 * 2. "Side Drawer" (20355:3870) — 3 variants
 *    VARIANT prop:
 *      footerType: [slot, actionButtons, textArea]
 *                                    → drives <DrawerV2Footer> children
 *    BOOLEAN props (hash-suffixed):
 *      hasHeader, hasHeading, hasSubheading, hasTopSlot, hasBottomSlot,
 *      hasFooter, hasCloseIcon,
 *      hasHeaderSlot1/2/3 (decorative, ignored)
 *    INSTANCE_SWAP props (hash-suffixed):
 *      topSlot#23608:0, bottomSlot#23608:4, footerSlot#20362:4
 */

// ─── 1. Bottom Drawer ──────────────────────────────────────────────

figma.connect(
    DrawerV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-275741',
    {
        props: {
            // Title — gated by hasTitle#15055:3, returns rendered node
            title: figma.boolean('hasTitle', {
                true: <DrawerV2Title>{figma.string('title')}</DrawerV2Title>,
                false: undefined,
            }),

            // Description — Figma Boolean has typo: hasDesciprtion#15091:12
            description: figma.boolean('hasDesciprtion', {
                true: (
                    <DrawerV2Description>
                        {figma.string('description')}
                    </DrawerV2Description>
                ),
                false: undefined,
            }),

            // Body children — driven by `type` VARIANT
            body: figma.enum('type', {
                slot: <div>Body slot content</div>,
                info: <div>Info content</div>,
                singleSelect: <div>Single select content</div>,
                multiSelect: <div>Multi select content</div>,
                status: <div>Status content</div>,
            }),

            // Footer — gated by hasFooter#15055:5, returns rendered node
            footer: figma.boolean('hasFooter', {
                true: (
                    <DrawerV2Footer>
                        <button>Cancel</button>
                        <button>Confirm</button>
                    </DrawerV2Footer>
                ),
                false: undefined,
            }),
        },

        example: ({ title, description, body, footer }) => (
            <DrawerV2 direction="bottom">
                <DrawerV2Trigger asChild>
                    <button>Open Drawer</button>
                </DrawerV2Trigger>
                <DrawerV2Portal>
                    <DrawerV2Overlay />
                    <DrawerV2Content>
                        <DrawerV2Header>
                            {title}
                            {description}
                        </DrawerV2Header>
                        <DrawerV2Body>{body}</DrawerV2Body>
                        {footer}
                    </DrawerV2Content>
                </DrawerV2Portal>
            </DrawerV2>
        ),

        imports: [
            "import { DrawerV2, DrawerV2Body, DrawerV2Content, DrawerV2Description, DrawerV2Footer, DrawerV2Header, DrawerV2Overlay, DrawerV2Portal, DrawerV2Title, DrawerV2Trigger } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/DrawerV2',
            },
        ],
    }
)

// ─── 2. Side Drawer ────────────────────────────────────────────────

figma.connect(
    DrawerV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20355-3870',
    {
        props: {
            // Title — gated by hasHeading#20358:0
            title: figma.boolean('hasHeading', {
                true: <DrawerV2Title>Drawer Title</DrawerV2Title>,
                false: undefined,
            }),

            // Description — gated by hasSubheading#18950:3
            description: figma.boolean('hasSubheading', {
                true: (
                    <DrawerV2Description>
                        Drawer description text
                    </DrawerV2Description>
                ),
                false: undefined,
            }),

            // Close icon — gated by hasCloseIcon#19406:9
            close: figma.boolean('hasCloseIcon', {
                true: (
                    <DrawerV2Close asChild>
                        <button aria-label="Close">×</button>
                    </DrawerV2Close>
                ),
                false: undefined,
            }),

            // Top slot — gated by hasTopSlot#19406:0, instance topSlot#23608:0
            topSlotContent: figma.boolean('hasTopSlot', {
                true: figma.instance('topSlot'),
                false: undefined,
            }),

            // Bottom slot — gated by hasBottomSlot#19406:3
            bottomSlotContent: figma.boolean('hasBottomSlot', {
                true: figma.instance('bottomSlot'),
                false: undefined,
            }),

            // Footer — driven by `footerType` VARIANT × hasFooter#19406:6 gate.
            // Returns undefined when hasFooter=false (all footerType values).
            footer: figma.boolean('hasFooter', {
                true: figma.enum('footerType', {
                    slot: (
                        <DrawerV2Footer>
                            {figma.instance('footerSlot')}
                        </DrawerV2Footer>
                    ),
                    actionButtons: (
                        <DrawerV2Footer>
                            <button>Cancel</button>
                            <button>Confirm</button>
                        </DrawerV2Footer>
                    ),
                    textArea: (
                        <DrawerV2Footer>
                            <textarea placeholder="Enter text" />
                        </DrawerV2Footer>
                    ),
                }),
                false: undefined,
            }),
        },

        example: ({
            title,
            description,
            close,
            topSlotContent,
            bottomSlotContent,
            footer,
        }) => (
            <DrawerV2 direction="right">
                <DrawerV2Trigger asChild>
                    <button>Open Drawer</button>
                </DrawerV2Trigger>
                <DrawerV2Portal>
                    <DrawerV2Overlay />
                    <DrawerV2Content>
                        <DrawerV2Header>
                            {title}
                            {description}
                            {close}
                        </DrawerV2Header>
                        <DrawerV2Body>
                            {topSlotContent}
                            <div>Body content</div>
                            {bottomSlotContent}
                        </DrawerV2Body>
                        {footer}
                    </DrawerV2Content>
                </DrawerV2Portal>
            </DrawerV2>
        ),

        imports: [
            "import { DrawerV2, DrawerV2Body, DrawerV2Close, DrawerV2Content, DrawerV2Description, DrawerV2Footer, DrawerV2Header, DrawerV2Overlay, DrawerV2Portal, DrawerV2Title, DrawerV2Trigger } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/DrawerV2',
            },
        ],
    }
)
