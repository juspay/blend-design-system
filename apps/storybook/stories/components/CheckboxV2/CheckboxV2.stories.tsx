import type { Meta, StoryObj } from '@storybook/react'
import React, { isValidElement, useEffect, useState } from 'react'
import { Hash, Bell } from 'lucide-react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import CheckboxV2 from '../../../../../packages/blend/lib/components/CheckboxV2/CheckboxV2'
import {
    CheckboxV2Size,
    type CheckboxV2Props,
} from '../../../../../packages/blend/lib/components/CheckboxV2/checkboxV2.types'

type CheckboxV2Slot = NonNullable<CheckboxV2Props['slot']>

const getSlotContent = (
    slotValue: string | React.ReactNode | null | undefined
): CheckboxV2Slot | undefined => {
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

    if (isValidElement(slotValue)) {
        return { slot: slotValue, maxHeight: 16 }
    }

    return undefined
}

const meta: Meta<typeof CheckboxV2> = {
    title: 'Components/CheckboxV2',
    component: CheckboxV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A modern checkbox component with improved accessibility, theming, and flexible content.

## Features
- Controlled API with \`checked\` / \`onCheckedChange\`
- Sizes: Small (\`sm\`) and Medium (\`md\`)
- Label and subLabel with truncation + tooltip support via \`maxLength\`
- Optional decorative \`slot\` icon next to the label
- Supports indeterminate state via \`checked='indeterminate'\`
- Required, error and disabled states with proper ARIA attributes

## Usage

\`\`\`tsx
import CheckboxV2, { CheckboxV2Size } from '@juspay/blend-design-system/CheckboxV2';

const [checked, setChecked] = useState(false);

<CheckboxV2
  label="Accept terms"
  subLabel="You must accept terms to continue"
  size={CheckboxV2Size.MD}
  checked={checked}
  onCheckedChange={setChecked}
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
            description: 'Primary label text displayed next to the checkbox',
        },
        subLabel: {
            control: 'text',
            description: 'Secondary description text shown below the label',
        },
        size: {
            control: 'select',
            options: Object.values(CheckboxV2Size),
            description: 'Size variant of the checkbox',
        },
        checked: {
            control: 'boolean',
            description:
                'Controlled checked state of the checkbox (use "indeterminate" via args if needed in stories)',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Marks the field as required and shows an asterisk',
        },
        error: {
            control: 'boolean',
            description: 'Puts the checkbox in an error state',
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
        onCheckedChange: {
            action: 'changed',
            description: 'Callback fired when the checkbox state changes',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CheckboxV2>

export const Default: Story = {
    render: function DefaultCheckboxV2(args: Story['args']) {
        const [checked, setChecked] = useState<boolean | 'indeterminate'>(
            (args?.checked as boolean) ?? false
        )

        useEffect(() => {
            setChecked((args?.checked as boolean) ?? false)
        }, [args?.checked])

        return (
            <CheckboxV2
                {...args}
                checked={checked}
                onCheckedChange={(next: boolean | 'indeterminate') =>
                    setChecked(next)
                }
                slot={getSlotContent(args?.slot as string | React.ReactNode)}
            />
        )
    },
    args: {
        label: 'Accept terms and conditions',
        subLabel: 'You will agree to our terms by checking this box',
        size: CheckboxV2Size.MD,
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
                    <CheckboxV2
                        label="Small checkbox"
                        size={CheckboxV2Size.SM}
                        checked={states.sm}
                        onCheckedChange={(next: boolean | 'indeterminate') =>
                            setStates((prev) => ({
                                ...prev,
                                sm: Boolean(next),
                            }))
                        }
                    />
                    <CheckboxV2
                        label="Medium checkbox"
                        size={CheckboxV2Size.MD}
                        checked={states.md}
                        onCheckedChange={(next: boolean | 'indeterminate') =>
                            setStates((prev) => ({
                                ...prev,
                                md: Boolean(next),
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
            <CheckboxV2 label="Default" />
            <CheckboxV2 label="Checked" checked />
            <CheckboxV2 label="Disabled" disabled />
            <CheckboxV2 label="Checked & Disabled" checked disabled />
            <CheckboxV2 label="Required" required />
            <CheckboxV2 label="Error" error />
            <CheckboxV2 label="Required + Error" required error />
            <CheckboxV2 label="Indeterminate" checked={'indeterminate'} />
        </div>
    ),
}

export const WithSlotAndSubLabel: Story = {
    render: () => {
        const WithSlotAndSubLabelComponent: React.FC = () => {
            const [checked, setChecked] = useState<boolean | 'indeterminate'>(
                false
            )

            return (
                <CheckboxV2
                    label="Subscribe to newsletter"
                    subLabel="Get occasional product updates"
                    checked={checked}
                    onCheckedChange={setChecked}
                    slot={{ slot: <Bell size={16} />, maxHeight: 16 }}
                />
            )
        }

        return <WithSlotAndSubLabelComponent />
    },
}

export const TruncationAndTooltip: Story = {
    render: () => (
        <CheckboxV2
            label="A very long label that will be truncated when it exceeds the configured maxLength"
            subLabel="Similarly, this descriptive subLabel will be truncated and show the full value in a tooltip on hover"
            maxLength={{
                label: 32,
                subLabel: 48,
            }}
        />
    ),
}
