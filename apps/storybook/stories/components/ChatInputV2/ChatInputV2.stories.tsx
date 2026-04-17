import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { AudioLines } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { Theme } from '../../../../../packages/blend/lib/context/theme.enum'
import {
    ChatInputV2,
    type AttachedFile,
    type TopQuery,
} from '../../../../../packages/blend/lib/components/InputsV2/ChatInputV2'
import Block from '../../../../../packages/blend/lib/components/Primitives/Block/Block'
import { FOUNDATION_THEME } from '@juspay/blend-design-system'

const SAMPLE_TOP_QUERIES: TopQuery[] = [
    { id: '1', text: 'Summarize last week’s metrics' },
    { id: '2', text: 'What changed in revenue MoM?' },
    { id: '3', text: 'List open action items' },
]

const noopChange = (_value: string) => {}

const stack = (maxWidth = 720) =>
    ({
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth,
        width: '100%',
    }) as const

const visualGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 24,
    alignItems: 'start',
} as const

const slotIcon = <AudioLines size={18} aria-hidden focusable={false} />

const meta: Meta<typeof ChatInputV2> = {
    title: 'Components/Inputs/ChatInputV2',
    component: ChatInputV2,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <div style={{ maxWidth: 720, width: '100%' }}>
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Chat composer (V2) with optional file chips, **top queries** (focus), attach + secondary slots, and **Enter** to submit (Shift+Enter newline).

Uses \`CHAT_INPUTV2\` / \`CHAT_INPUTV2_MOBILE\` tokens. Below **lg** breakpoint the mobile shell is used.

**Ref** forwards to the outer container \`div\` (same as desktop and mobile layouts).

## Accessibility

- **Textarea**: native \`<textarea>\` with stable \`id\` / \`name\`; \`aria-disabled\` when disabled
- **Attach control**: \`aria-label="Attach files"\` on the paperclip control (desktop); keyboard reachable where enabled
- **Top queries**: region toggles \`aria-hidden\` when collapsed; focus the field to surface suggestions
- **Keyboard**: **Enter** submits via \`onEnter\` (when wired); **Shift+Enter** inserts a newline
- **WCAG target**: 2.1 Level AA (supports 2.2)

**Verification**

- **Storybook a11y addon**: Accessibility panel — expect no A/AA violations for these stories
- **Manual**: Tab order (textarea → actions); screen reader for label/placeholder; disabled state not editable

## Visual regression

Use **VisualStates** (light) and **VisualStatesDark** (dark theme) with Chromatic for layout and token snapshots.
                `,
            },
        },
    },
    argTypes: {
        placeholder: {
            control: { type: 'text' },
            table: { category: 'Content' },
        },
        disabled: {
            control: { type: 'boolean' },
            table: { category: 'State' },
        },
        topQueriesMaxHeight: {
            control: { type: 'number' },
            table: { category: 'Top queries' },
        },
        textareaMaxHeight: {
            control: { type: 'number' },
            description: 'Auto-grow cap in px',
            table: { category: 'Layout' },
        },
        onChange: { action: 'change' },
        onEnter: { action: 'enter' },
        onAttachFiles: { action: 'attachFiles' },
        onFileRemove: { action: 'fileRemove' },
        onTopQuerySelect: { action: 'topQuerySelect' },
        onSlot2Click: { action: 'slot2Click' },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatInputV2>

export const Default: Story = {
    render: function DefaultStory(args) {
        const [value, setValue] = useState('')
        return (
            <ChatInputV2
                placeholder={args.placeholder}
                disabled={args.disabled}
                value={value}
                onChange={setValue}
                slot2={<AudioLines size={18} aria-hidden />}
                onSlot2Click={() => args.onSlot2Click?.()}
            />
        )
    },
    args: {
        placeholder: 'Type a message…',
        disabled: false,
    },
}

export const WithSlots: Story = {
    render: function WithSlotsStory() {
        const [value, setValue] = useState('')
        return (
            <ChatInputV2
                value={value}
                onChange={setValue}
                placeholder="Message with slots…"
                slot1={
                    <Block
                        padding={8}
                        borderRadius={8}
                        backgroundColor={FOUNDATION_THEME.colors.gray[100]}
                        fontSize={12}
                    >
                        Optional slot (e.g. filters)
                    </Block>
                }
                slot2={<AudioLines size={18} />}
                onSlot2Click={() => undefined}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`slot1` renders above the row; `slot2` sits in the secondary control area.',
            },
        },
    },
}

export const WithAttachments: Story = {
    render: function WithAttachmentsStory() {
        const [value, setValue] = useState('')
        const [files, setFiles] = useState<AttachedFile[]>([
            {
                id: 'demo-1',
                name: 'notes.txt',
                type: 'text',
                size: 1200,
            },
        ])

        const handleAttach = (newFiles: File[]) => {
            const mapped: AttachedFile[] = newFiles.map((f, i) => ({
                id: `f-${Date.now()}-${i}`,
                name: f.name,
                type: f.type.startsWith('image/')
                    ? 'image'
                    : f.name.endsWith('.pdf')
                      ? 'pdf'
                      : 'other',
                size: f.size,
            }))
            setFiles((prev) => [...prev, ...mapped])
        }

        return (
            <ChatInputV2
                value={value}
                onChange={setValue}
                placeholder="Add files via attach…"
                attachedFiles={files}
                onAttachFiles={handleAttach}
                onFileRemove={(id) =>
                    setFiles((prev) => prev.filter((f) => f.id !== id))
                }
                slot2={<AudioLines size={18} />}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Starts with one chip; use the paperclip to add more (same as product flow).',
            },
        },
    },
}

export const WithTopQueries: Story = {
    render: function WithTopQueriesStory() {
        const [value, setValue] = useState('')
        return (
            <ChatInputV2
                value={value}
                onChange={setValue}
                placeholder="Focus the field to see suggestions…"
                topQueries={SAMPLE_TOP_QUERIES}
                topQueriesMaxHeight={160}
                onTopQuerySelect={(q) => setValue(q.text)}
                slot2={<AudioLines size={18} />}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Top queries appear when the input is **focused**.',
            },
        },
    },
}

export const Disabled: Story = {
    render: function DisabledStory() {
        const [value, setValue] = useState('Read-only message')
        return (
            <ChatInputV2
                value={value}
                onChange={setValue}
                disabled
                placeholder="Disabled"
                slot2={<AudioLines size={18} />}
            />
        )
    },
}

// —— Visual (Chromatic / static variants) ——————————————————————

const visualCaption = {
    margin: 0,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--color-text-muted, #64748b)',
} as const

/** Representative states for visual regression (controlled, non-interactive handlers). */
export const VisualStates: Story = {
    render: function VisualStatesStory() {
        return (
            <div style={visualGrid}>
                <figure style={{ margin: 0 }}>
                    <figcaption style={visualCaption}>Empty</figcaption>
                    <ChatInputV2
                        value=""
                        onChange={noopChange}
                        placeholder="Message…"
                        slot2={slotIcon}
                    />
                </figure>
                <figure style={{ margin: 0 }}>
                    <figcaption style={visualCaption}>With text</figcaption>
                    <ChatInputV2
                        value="Draft message for review."
                        onChange={noopChange}
                        placeholder="Message…"
                        slot2={slotIcon}
                    />
                </figure>
                <figure style={{ margin: 0 }}>
                    <figcaption style={visualCaption}>
                        With attachments
                    </figcaption>
                    <ChatInputV2
                        value=""
                        onChange={noopChange}
                        placeholder="Add a caption…"
                        attachedFiles={[
                            {
                                id: 'v1',
                                name: 'report.pdf',
                                type: 'pdf',
                                size: 2400,
                            },
                            {
                                id: 'v2',
                                name: 'sheet.csv',
                                type: 'csv',
                                size: 890,
                            },
                        ]}
                        onAttachFiles={() => undefined}
                        onFileRemove={() => undefined}
                        slot2={slotIcon}
                    />
                </figure>
                <figure style={{ margin: 0 }}>
                    <figcaption style={visualCaption}>Disabled</figcaption>
                    <ChatInputV2
                        value="Cannot edit"
                        onChange={noopChange}
                        disabled
                        placeholder="Disabled"
                        slot2={slotIcon}
                    />
                </figure>
                <figure style={{ margin: 0 }}>
                    <figcaption style={visualCaption}>
                        Multiline value
                    </figcaption>
                    <ChatInputV2
                        value={'Line one\nLine two\nLine three'}
                        onChange={noopChange}
                        placeholder="Message…"
                        textareaMaxHeight={120}
                        slot2={slotIcon}
                    />
                </figure>
            </div>
        )
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Static snapshot of common layouts for Chromatic (empty, text, chips, disabled, multiline cap).',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}

/** Same grid as **VisualStates** under dark theme tokens. */
export const VisualStatesDark: Story = {
    ...VisualStates,
    name: 'Visual states (dark)',
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.DARK}>
                <div style={{ maxWidth: 960, width: '100%' }}>
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        ...VisualStates.parameters,
        docs: {
            description: {
                story: 'Dark theme snapshot — nested `ThemeProvider` overrides the default light shell.',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 450 },
    },
}

// —— Variants —————————————————————————————————————————————————————

/** Stacked progressive composition: minimal → full feature set. */
export const Variants: Story = {
    render: function VariantsStory() {
        const [a, setA] = useState('')
        const [b, setB] = useState('')
        const [c, setC] = useState('')
        const [d, setD] = useState('')
        const [files, setFiles] = useState<AttachedFile[]>([
            { id: 'v-a', name: 'doc.txt', type: 'text', size: 400 },
        ])
        return (
            <div style={stack(800)}>
                <section>
                    <h3
                        style={{
                            margin: '0 0 8px',
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        Minimal
                    </h3>
                    <ChatInputV2
                        value={a}
                        onChange={setA}
                        placeholder="Text only…"
                    />
                </section>
                <section>
                    <h3
                        style={{
                            margin: '0 0 8px',
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        + Secondary slot
                    </h3>
                    <ChatInputV2
                        value={b}
                        onChange={setB}
                        placeholder="With action…"
                        slot2={slotIcon}
                        onSlot2Click={() => undefined}
                    />
                </section>
                <section>
                    <h3
                        style={{
                            margin: '0 0 8px',
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        + Top queries (focus field)
                    </h3>
                    <ChatInputV2
                        value={c}
                        onChange={setC}
                        placeholder="Focus for suggestions…"
                        topQueries={SAMPLE_TOP_QUERIES}
                        topQueriesMaxHeight={140}
                        onTopQuerySelect={(q) => setC(q.text)}
                        slot2={slotIcon}
                    />
                </section>
                <section>
                    <h3
                        style={{
                            margin: '0 0 8px',
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        + Attachments + slot1
                    </h3>
                    <ChatInputV2
                        value={d}
                        onChange={setD}
                        placeholder="Full composition…"
                        attachedFiles={files}
                        onAttachFiles={(newFiles) => {
                            const mapped = newFiles.map((f, i) => ({
                                id: `n-${Date.now()}-${i}`,
                                name: f.name,
                                type: 'other' as const,
                                size: f.size,
                            }))
                            setFiles((prev) => [...prev, ...mapped])
                        }}
                        onFileRemove={(id) =>
                            setFiles((prev) => prev.filter((f) => f.id !== id))
                        }
                        slot1={
                            <Block
                                padding={8}
                                borderRadius={8}
                                backgroundColor={
                                    FOUNDATION_THEME.colors.gray[100]
                                }
                                fontSize={12}
                            >
                                Context slot
                            </Block>
                        }
                        slot2={slotIcon}
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Progressive composition: textarea only → secondary slot → top queries → attachments and `slot1`.',
            },
        },
    },
}

// —— Accessibility (reference) —————————————————————————————————————

export const Accessibility: Story = {
    render: function AccessibilityStory() {
        const [message, setMessage] = useState('')
        const [locked] = useState('Disabled input')
        const [withFiles, setWithFiles] = useState('')
        const [files, setFiles] = useState<AttachedFile[]>([
            { id: 'a11y-1', name: 'readme.md', type: 'text', size: 200 },
        ])
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 28,
                    padding: 8,
                    maxWidth: 640,
                }}
            >
                <section aria-labelledby="a11y-primary-heading">
                    <h3
                        id="a11y-primary-heading"
                        style={{
                            marginBottom: 10,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Primary composer
                    </h3>
                    <p
                        style={{
                            margin: '0 0 12px',
                            fontSize: 13,
                            color: 'var(--color-text-muted, #64748b)',
                        }}
                    >
                        Tab to the textarea, then to attach and secondary
                        actions. Enter submits when <code>onEnter</code> is
                        wired; Shift+Enter adds a new line.
                    </p>
                    <ChatInputV2
                        value={message}
                        onChange={setMessage}
                        placeholder="Type a message…"
                        onEnter={() => undefined}
                        slot2={slotIcon}
                        onSlot2Click={() => undefined}
                    />
                </section>

                <section aria-labelledby="a11y-disabled-heading">
                    <h3
                        id="a11y-disabled-heading"
                        style={{
                            marginBottom: 10,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Disabled
                    </h3>
                    <p
                        style={{
                            margin: '0 0 12px',
                            fontSize: 13,
                            color: 'var(--color-text-muted, #64748b)',
                        }}
                    >
                        Field is not editable; verify it is skipped or announced
                        appropriately with your screen reader.
                    </p>
                    <ChatInputV2
                        value={locked}
                        onChange={() => undefined}
                        disabled
                        placeholder="Unavailable"
                        slot2={slotIcon}
                    />
                </section>

                <section aria-labelledby="a11y-files-heading">
                    <h3
                        id="a11y-files-heading"
                        style={{
                            marginBottom: 10,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        With attachment chips
                    </h3>
                    <p
                        style={{
                            margin: '0 0 12px',
                            fontSize: 13,
                            color: 'var(--color-text-muted, #64748b)',
                        }}
                    >
                        Chips expose dismiss controls; test keyboard and SR
                        labels on the attachment row.
                    </p>
                    <ChatInputV2
                        value={withFiles}
                        onChange={setWithFiles}
                        placeholder="Caption…"
                        attachedFiles={files}
                        onAttachFiles={() => undefined}
                        onFileRemove={(id) =>
                            setFiles((prev) => prev.filter((f) => f.id !== id))
                        }
                        slot2={slotIcon}
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Reference layout for accessibility review of **ChatInputV2**:

- **Textarea**: native control; verify focus ring and \`aria-disabled\` when disabled
- **Attach**: \`aria-label="Attach files"\` on the attach control (desktop layout)
- **Chips**: dismiss buttons should be focusable and have discernible names
- **Top queries**: optional region — focus the field to open (see **WithTopQueries**)

**Verification**

1. Open the **Accessibility** addon — no violations for these examples.
2. Navigate with **Tab** only; confirm order and visible focus.
3. Use a screen reader to verify placeholder, value, and disabled state.
`,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}
