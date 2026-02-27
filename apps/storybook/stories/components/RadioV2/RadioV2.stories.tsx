import type { Meta, StoryObj } from '@storybook/react'
import React, { isValidElement, useState, useEffect } from 'react'
import { Hash, Bell } from 'lucide-react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import RadioV2 from '../../../../../packages/blend/lib/components/SelectorV2/RadioV2/RadioV2'
import { type RadioV2Props } from '../../../../../packages/blend/lib/components/SelectorV2/RadioV2/radioV2.types'
import { SelectorV2Size } from '../../../../../packages/blend/lib/components/SelectorV2/selectorV2.types'

type RadioV2Slot = NonNullable<RadioV2Props['slot']>

const getSlotContent = (
    slotValue: string | React.ReactNode | null | undefined
): RadioV2Slot | undefined => {
    if (typeof slotValue === 'string') {
        if (!slotValue || slotValue === 'none') {
            return undefined
        }

        switch (slotValue) {
            case 'hash':
                return { slot: <Hash size={16} />, maxHeight: 16 }
            case 'bell':
                return { slot: <Bell size={16} />, maxHeight: 16 }
            default:
                return undefined
        }
    }

    // If a React element was passed directly, use it as-is
    if (isValidElement(slotValue)) {
        return { slot: slotValue, maxHeight: 16 }
    }

    return undefined
}

const meta: Meta<typeof RadioV2> = {
    title: 'Components/RadioV2',
    component: RadioV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A next-generation radio control with improved accessibility, theming, and content handling.

## Features
- Controlled API with \`checked\` and \`onChange\`
- Sizes: Small (\`sm\`) and Medium (\`md\`)
- Label and subLabel with truncation + tooltip support via \`maxLength\`
- Optional decorative \`slot\` icon next to the label
- Required and error states with ARIA attributes
- Disabled state with proper \`aria-disabled\` and native \`disabled\`
- Uses responsive design tokens via \`useResponsiveTokens('RADIOV2')\`

## Usage

\`\`\`tsx
import RadioV2, { SelectorV2Size } from '@juspay/blend-design-system/RadioV2';

const [checked, setChecked] = useState(false);

<RadioV2
  label="Option A"
  size={SelectorV2Size.MD}
  checked={checked}
  onChange={() => setChecked(!checked)}
  slot={<Hash size={16} /> }
  maxLength={{ label: 40, subLabel: 80 }}
/>;
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Primary label text displayed next to the radio',
        },
        subLabel: {
            control: 'text',
            description: 'Secondary description text shown below the label',
        },
        size: {
            control: 'select',
            options: Object.values(SelectorV2Size),
            description: 'Size variant of the radio',
        },
        checked: {
            control: 'boolean',
            description: 'Controlled checked state of the radio',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the radio is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Marks the field as required and shows an asterisk',
        },
        error: {
            control: 'boolean',
            description: 'Puts the radio in an error state',
        },
        slot: {
            control: 'select',
            options: ['none', 'hash', 'bell'],
            description:
                'Optional decorative icon displayed next to the label (rendered as a React node)',
        },
        maxLength: {
            control: 'object',
            description:
                'Maximum lengths for label and subLabel before truncation + tooltip',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the radio value changes',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioV2>

export const Default: Story = {
    render: function DefaultRadioV2(args: Story['args']) {
        const [checkedState, setCheckedState] = useState<boolean>(
            args?.checked ?? false
        )

        useEffect(() => {
            setCheckedState(args?.checked ?? false)
        }, [args?.checked])

        return (
            <RadioV2
                {...args}
                checked={checkedState}
                onChange={() => setCheckedState((prev: boolean) => !prev)}
                slot={getSlotContent(args?.slot as string | React.ReactNode)}
            />
        )
    },
    args: {
        label: 'Option A',
        subLabel: undefined,
        size: SelectorV2Size.MD,
        checked: false,
        disabled: false,
        required: false,
        error: false,
        slot: undefined,
        maxLength: {
            label: 40,
            subLabel: 80,
        },
    },
}

export const Sizes: Story = {
    render: () => {
        const SizesComponent: React.FC = () => {
            const [states, setStates] = useState<{ sm: boolean; md: boolean }>({
                sm: false,
                md: true,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                    }}
                >
                    <RadioV2
                        label="Small radio"
                        size={SelectorV2Size.SM}
                        checked={states.sm}
                        onChange={() =>
                            setStates((prev: { sm: boolean; md: boolean }) => ({
                                ...prev,
                                sm: !prev.sm,
                            }))
                        }
                    />
                    <RadioV2
                        label="Medium radio"
                        size={SelectorV2Size.MD}
                        checked={states.md}
                        onChange={() =>
                            setStates((prev: { sm: boolean; md: boolean }) => ({
                                ...prev,
                                md: !prev.md,
                            }))
                        }
                    />
                </div>
            )
        }

        return <SizesComponent />
    },
}

export const States: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
            }}
        >
            <RadioV2 label="Default" />
            <RadioV2 label="Checked" checked />
            <RadioV2 label="Disabled" disabled />
            <RadioV2 label="Checked & Disabled" checked disabled />
            <RadioV2 label="Required" required />
            <RadioV2 label="Error" error />
            <RadioV2 label="Required + Error" required error />
        </div>
    ),
}

export const WithSlotAndSubLabel: Story = {
    render: () => {
        const WithSlotAndSubLabelComponent: React.FC = () => {
            const [checked, setChecked] = useState(false)

            return (
                <RadioV2
                    label="Option with slot"
                    subLabel="Has a decorative icon"
                    checked={checked}
                    onChange={() => setChecked((prev: boolean) => !prev)}
                    slot={{ slot: <Bell size={16} />, maxHeight: 16 }}
                />
            )
        }

        return <WithSlotAndSubLabelComponent />
    },
}

export const TruncationAndTooltip: Story = {
    render: () => (
        <RadioV2
            label="A very long label that will be truncated when it exceeds the configured maxLength"
            subLabel="Similarly, this descriptive subLabel will be truncated and show the full value in a tooltip on hover"
            maxLength={{
                label: 32,
                subLabel: 48,
            }}
        />
    ),
}
