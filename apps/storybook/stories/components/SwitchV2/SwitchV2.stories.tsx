import type { Meta, StoryObj } from '@storybook/react'
import React, { isValidElement, useState } from 'react'
import { Hash, Bell } from 'lucide-react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import { SwitchV2 } from '../../../../../packages/blend/lib/components/SwitchV2'
import {
    SwitchV2Size,
    type SwitchV2Props,
} from '../../../../../packages/blend/lib/components/SwitchV2/switchV2.types'

type SwitchV2Slot = NonNullable<SwitchV2Props['slot']>

const getSlotContent = (
    slotValue: string | React.ReactNode | null | undefined
): SwitchV2Slot | undefined => {
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

const meta: Meta<typeof SwitchV2> = {
    title: 'Components/SwitchV2',
    component: SwitchV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A next-generation toggle switch component with improved accessibility, theming, and content handling.

## Features
- Controlled API with \`checked\` and \`onChange\`
- Sizes: Small (\`sm\`) and Medium (\`md\`)
- Label and subLabel with truncation + tooltip support via \`maxLength\`
- Optional decorative \`slot\` icon next to the label
- Required and error states with ARIA attributes
- Disabled state with proper \`aria-disabled\` and native \`disabled\`
- Uses responsive design tokens via \`useResponsiveTokens('SWITCHV2')\`

## Usage

\`\`\`tsx
import SwitchV2, { SwitchV2Size } from '@juspay/blend-design-system/SwitchV2';

const [enabled, setEnabled] = useState(false);

<SwitchV2
  label="Enable notifications"
  subLabel="Get alerts about new messages"
  size={SwitchV2Size.MD}
  checked={enabled}
  onChange={setEnabled}
  slot={<Hash size={16} />}
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
            description: 'Primary label text displayed next to the switch',
        },
        subLabel: {
            control: 'text',
            description: 'Secondary description text shown below the label',
        },
        size: {
            control: 'select',
            options: Object.values(SwitchV2Size),
            description: 'Size variant of the switch',
        },
        checked: {
            control: 'boolean',
            description: 'Controlled checked state of the switch',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Marks the field as required and shows an asterisk',
        },
        error: {
            control: 'boolean',
            description: 'Puts the switch in an error state',
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
            description: 'Callback fired when the switch toggles',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SwitchV2>

export const Default: Story = {
    render: function DefaultSwitchV2(args: Story['args']) {
        const [checked, setChecked] = useState<boolean>(args?.checked ?? false)

        return (
            <SwitchV2
                {...args}
                checked={checked}
                onChange={(next: boolean) => setChecked(next)}
                slot={getSlotContent(args?.slot as string | React.ReactNode)}
            />
        )
    },
    args: {
        label: 'Enable notifications',
        subLabel: 'Get alerts about new activity',
        size: SwitchV2Size.MD,
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
                    <SwitchV2
                        label="Small switch"
                        size={SwitchV2Size.SM}
                        checked={states.sm}
                        onChange={(next: boolean) =>
                            setStates((prev) => ({ ...prev, sm: next }))
                        }
                    />
                    <SwitchV2
                        label="Medium switch"
                        size={SwitchV2Size.MD}
                        checked={states.md}
                        onChange={(next: boolean) =>
                            setStates((prev) => ({ ...prev, md: next }))
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
            <SwitchV2 label="Default" />
            <SwitchV2 label="Checked" checked />
            <SwitchV2 label="Disabled" disabled />
            <SwitchV2 label="Checked & Disabled" checked disabled />
            <SwitchV2 label="Required" required />
            <SwitchV2 label="Error" error />
            <SwitchV2 label="Required + Error" required error />
        </div>
    ),
}

export const WithSlotAndSubLabel: Story = {
    render: () => {
        const WithSlotAndSubLabelComponent: React.FC = () => {
            const [checked, setChecked] = useState(false)

            return (
                <SwitchV2
                    label="Marketing emails"
                    subLabel="Receive product updates and announcements"
                    checked={checked}
                    onChange={setChecked}
                    slot={{ slot: <Bell size={16} />, maxHeight: 16 }}
                />
            )
        }

        return <WithSlotAndSubLabelComponent />
    },
}

export const TruncationAndTooltip: Story = {
    render: () => (
        <SwitchV2
            label="A very long label that will be truncated when it exceeds the configured maxLength"
            subLabel="Similarly, this descriptive subLabel will be truncated and show the full value in a tooltip on hover"
            maxLength={{
                label: 32,
                subLabel: 48,
            }}
        />
    ),
}
