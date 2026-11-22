import React from 'react'
import { figma } from '@figma/code-connect'
import { ChatInputV2 } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CHATINPUTV2 COMPONENT
 *
 * Figma frame "Genius Input Box" (`30073:1916`) contains 10 variant
 * instances across two device types (web / mweb) and six visual states
 * (default, hover, filled, disable, active, multiLine).
 *
 * ChatInputV2 handles web vs. mobile rendering internally via
 * `innerWidth < BREAKPOINTS.lg` (1024), so `device` is not a code prop.
 *
 * PROP MAPPING SUMMARY:
 *
 * 1. DIRECT:
 *    - content   (TEXT)    → placeholder (string)
 *    - type=disable        → disabled=true
 *
 * 2. COMPOSITE (boolean gates → JSX / objects):
 *    - hasSlot + slot instance   → topContent  (ReactNode)
 *    - hasAttachmentBar / hasAttachments → attachedFiles (array)
 *    - hasAttachment             → onAttachFiles (callback)
 *    - hasTopQueries             → topQueries (array)
 *
 * 3. CSS-ONLY STATES (no code prop):
 *    - type=hover / filled / active / multiLine — visual states
 *      handled automatically by ChatInputV2
 *
 * 4. CODE-ONLY (not in Figma):
 *    - value, onChange — required controlled-state pair
 *    - onSecondaryActionClick, onEnter, onFileRemove, onFileClick
 *    - textareaMaxHeight, topQueriesMaxHeight
 */

const FIGMA_URL =
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=30073-1916'

figma.connect(ChatInputV2, FIGMA_URL, {
    props: {
        // Direct rename: content (Figma) → placeholder (Code)
        placeholder: figma.string('content'),

        // type=disable maps to disabled=true; all other types map to false
        disabled: figma.enum('type', {
            default: false,
            hover: false,
            filled: false,
            disable: true,
            active: false,
            multiLine: false,
        }),

        // Top content slot — gated by hasSlot boolean. No exposed
        // INSTANCE_SWAP property on this component, so we render a
        // placeholder node consumers replace with their own content.
        topContent: figma.boolean('hasSlot', {
            true: <div>Top content slot</div>,
            false: undefined,
        }),

        // Attached files — shown when hasAttachmentBar is true.
        // Inlined as a literal array so the snippet doesn't reference
        // an out-of-scope symbol.
        attachedFiles: figma.boolean('hasAttachmentBar', {
            true: [
                { id: '1', name: 'report.pdf', type: 'pdf' },
                { id: '2', name: 'screenshot.png', type: 'image' },
            ],
            false: [],
        }),

        // Top queries list — shown when hasTopQueries is true (active state)
        topQueries: figma.boolean('hasTopQueries', {
            true: [
                {
                    id: '1',
                    text: 'Show me the trend of last month success rate',
                },
                { id: '2', text: 'What is the success rate for Razorpay?' },
                { id: '3', text: 'Show recent failed transactions' },
            ],
            false: [],
        }),
        // Attachment callback — present when hasAttachment is true
        onAttachFiles: figma.boolean('hasAttachment', {
            true: (_files: File[]) => {},
            false: undefined,
        }),
    },

    example: ({
        placeholder,
        disabled,
        topContent,
        attachedFiles,
        topQueries,
        onAttachFiles,
    }) => (
        <ChatInputV2
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            topContent={topContent}
            attachedFiles={attachedFiles}
            topQueries={topQueries}
            onTopQuerySelect={() => {}}
            onAttachFiles={onAttachFiles}
        />
    ),

    imports: ["import { ChatInputV2 } from '@juspay/blend-design-system'"],

    links: [
        {
            name: 'GitHub',
            url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/ChatInputV2',
        },
    ],
})
