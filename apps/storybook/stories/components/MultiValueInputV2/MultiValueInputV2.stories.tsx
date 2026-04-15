import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Mail, Search, Hash } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { MultiValueInputV2 } from '../../../../../packages/blend/lib/components/InputsV2/MultiValueInputV2'
import { InputSizeV2 } from '../../../../../packages/blend/lib/components/InputsV2/inputV2.types'
import {
    TagSize,
    TagShape,
    TagVariant,
} from '../../../../../packages/blend/lib/components/Tags'

const defaultTagConfig = {
    size: TagSize.XS,
    shape: TagShape.ROUNDED,
    variant: TagVariant.SUBTLE,
} as const

const meta: Meta<typeof MultiValueInputV2> = {
    title: 'Components/Inputs/MultiValueInputV2',
    component: MultiValueInputV2,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
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
A multi-value input (V2) for entering tags: type and press **Enter** to add, **Backspace** on an empty field removes the last tag.

## Features
- Three sizes: \`sm\`, \`md\`, \`lg\`
- Label, sublabel, hint text, and optional help hint on the label
- Error state with \`error\` and \`errorMessage\`
- Optional left/right slot content (plain \`ReactNode\`)
- Disabled state
- Tags configured via \`tags\`: \`value\` (strings), \`size\` / \`shape\` / \`variant\`; use top-level \`onTagAdd\` / \`onTagRemove\` for changes

## Accessibility
- Native \`<input>\` with label association via \`id\`
- Error and hint linked with \`aria-describedby\` when applicable
- Remove buttons expose \`aria-label\` per tag

## Usage

\`\`\`tsx
import { MultiValueInputV2, InputSizeV2 } from '@juspay/blend-design-system/...';
import { TagSize, TagShape, TagVariant } from '...';

const [value, setValue] = useState('');
const [tagValues, setTagValues] = useState<string[]>([]);

<MultiValueInputV2
  label="Tags"
  placeholder="Add a tag and press Enter"
  value={value}
  onChange={setValue}
  tags={{
    value: tagValues,
    size: TagSize.XS,
    shape: TagShape.ROUNDED,
    variant: TagVariant.SUBTLE,
  }}
  onTagAdd={(tag) => { setTagValues((t) => [...t, tag]); setValue(''); }}
  onTagRemove={(tag) => setTagValues((t) => t.filter((x) => x !== tag))}
  size={InputSizeV2.MD}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current text in the input (before committing a tag)',
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        tags: {
            control: false,
            description:
                'Tag config: `{ value, size, shape, variant }`; `onTagAdd` / `onTagRemove` are separate props',
            table: { type: { summary: 'object' }, category: 'Core' },
        },
        label: {
            control: { type: 'text' },
            description: 'Label above the field',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Input placeholder',
            table: { type: { summary: 'string' }, category: 'Content' },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(InputSizeV2),
            description: 'Size variant',
            table: {
                type: { summary: 'InputSizeV2' },
                defaultValue: { summary: 'md' },
                category: 'Appearance',
            },
        },
        required: {
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Error state',
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Shown when error is true',
            table: { type: { summary: 'string' }, category: 'Validation' },
        },
        hintText: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        helpIconHintText: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        leftSlot: {
            control: false,
            table: { type: { summary: 'ReactNode' }, category: 'Slots' },
        },
        rightSlot: {
            control: false,
            table: { type: { summary: 'ReactNode' }, category: 'Slots' },
        },
        onChange: {
            action: 'change',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Events',
            },
        },
        onFocus: {
            action: 'focused',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onTagAdd: {
            action: 'tagAdd',
            table: {
                type: { summary: '(tag: string) => void' },
                category: 'Events',
            },
        },
        onTagRemove: {
            action: 'tagRemove',
            table: {
                type: { summary: '(tag: string) => void' },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MultiValueInputV2>

export const Default: Story = {
    render: function DefaultMultiValueInputV2(args) {
        const [value, setValue] = useState('')
        const [tagValues, setTagValues] = useState<string[]>([
            'React',
            'TypeScript',
        ])
        return (
            <MultiValueInputV2
                {...args}
                value={value}
                onChange={(v) => {
                    setValue(v)
                    args.onChange?.(v)
                }}
                tags={{
                    ...defaultTagConfig,
                    value: tagValues,
                }}
                onTagAdd={(tag: string) => {
                    setTagValues((t) => [...t, tag])
                    setValue('')
                }}
                onTagRemove={(tag: string) => {
                    setTagValues((t) => t.filter((x) => x !== tag))
                }}
            />
        )
    },
    args: {
        label: 'Tags',
        placeholder: 'Type a value and press Enter',
        size: InputSizeV2.MD,
        disabled: false,
        required: false,
        error: false,
        hintText:
            'Press Enter to add a tag. Backspace removes the last tag when empty.',
    },
}

export const Sizes: Story = {
    render: function SizesStory() {
        const [sm, setSm] = useState({
            value: '',
            tagValues: ['Small'] as string[],
        })
        const [md, setMd] = useState({
            value: '',
            tagValues: ['Medium'] as string[],
        })
        const [lg, setLg] = useState({
            value: '',
            tagValues: ['Large'] as string[],
        })

        const bind = (
            state: { value: string; tagValues: string[] },
            set: React.Dispatch<
                React.SetStateAction<{
                    value: string
                    tagValues: string[]
                }>
            >,
            inputSize: InputSizeV2
        ) => (
            <MultiValueInputV2
                label={`Size: ${inputSize}`}
                placeholder="Add tag"
                size={inputSize}
                value={state.value}
                onChange={(v) => set((s) => ({ ...s, value: v }))}
                tags={{
                    ...defaultTagConfig,
                    value: state.tagValues,
                }}
                onTagAdd={(tag) =>
                    set((s) => ({
                        tagValues: [...s.tagValues, tag],
                        value: '',
                    }))
                }
                onTagRemove={(tag) =>
                    set((s) => ({
                        ...s,
                        tagValues: s.tagValues.filter((t) => t !== tag),
                    }))
                }
            />
        )

        return (
            <div className="flex flex-col gap-5 max-w-[480px]">
                {bind(sm, setSm, InputSizeV2.SM)}
                {bind(md, setMd, InputSizeV2.MD)}
                {bind(lg, setLg, InputSizeV2.LG)}
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Small, medium, and large size variants.',
            },
        },
    },
}

export const WithError: Story = {
    render: function WithErrorStory() {
        const [value, setValue] = useState('')
        const [tagValues] = useState<string[]>(['invalid@'])
        return (
            <MultiValueInputV2
                label="Email tags"
                placeholder="name@example.com"
                value={value}
                onChange={setValue}
                tags={{
                    ...defaultTagConfig,
                    value: tagValues,
                }}
                error
                errorMessage="One or more values are not valid email addresses."
                hintText="Use Enter to add each email."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Error state with `error`, `errorMessage`, and hint.',
            },
        },
    },
}

export const Disabled: Story = {
    render: function DisabledStory() {
        const [value, setValue] = useState('')
        return (
            <MultiValueInputV2
                label="Disabled"
                placeholder="Cannot edit"
                value={value}
                onChange={setValue}
                tags={{
                    ...defaultTagConfig,
                    value: ['Read-only', 'Tag'],
                }}
                disabled
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled input; tags are shown but not removable via the field when disabled.',
            },
        },
    },
}

export const WithSlots: Story = {
    render: function WithSlotsStory() {
        const [a, setA] = useState({
            value: '',
            tagValues: ['frontend', 'design'] as string[],
        })
        const [b, setB] = useState({
            value: '',
            tagValues: ['updates'] as string[],
        })
        return (
            <div className="flex flex-col gap-6 max-w-[480px]">
                <MultiValueInputV2
                    label="With left slot"
                    placeholder="Keywords"
                    value={a.value}
                    onChange={(v) => setA((s) => ({ ...s, value: v }))}
                    tags={{
                        ...defaultTagConfig,
                        value: a.tagValues,
                    }}
                    onTagAdd={(tag) =>
                        setA((s) => ({
                            tagValues: [...s.tagValues, tag],
                            value: '',
                        }))
                    }
                    onTagRemove={(tag) =>
                        setA((s) => ({
                            ...s,
                            tagValues: s.tagValues.filter((x) => x !== tag),
                        }))
                    }
                    leftSlot={<Search size={16} aria-hidden />}
                />
                <MultiValueInputV2
                    label="With left and right slots"
                    placeholder="Add channel"
                    value={b.value}
                    onChange={(v) => setB((s) => ({ ...s, value: v }))}
                    tags={{
                        ...defaultTagConfig,
                        value: b.tagValues,
                    }}
                    onTagAdd={(tag) =>
                        setB((s) => ({
                            tagValues: [...s.tagValues, tag],
                            value: '',
                        }))
                    }
                    onTagRemove={(tag) =>
                        setB((s) => ({
                            ...s,
                            tagValues: b.tagValues.filter((x) => x !== tag),
                        }))
                    }
                    leftSlot={<Mail size={16} aria-hidden />}
                    rightSlot={<Hash size={16} aria-hidden />}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Optional `leftSlot` and `rightSlot` for icons or actions.',
            },
        },
    },
}
