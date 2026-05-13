import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { ProgressBarV2 } from '../../../../../../packages/blend/lib/components/ProgressBarV2'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '../../../../../../packages/blend/lib/components/ProgressBarV2/progressBarV2.types'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const LINEAR_WIDTH_CLASS = 'w-80 max-w-full'

const meta: Meta<typeof ProgressBarV2> = {
    title: 'Components/ProgressBarV2',
    component: ProgressBarV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `

## Usage

\`\`\`tsx
import { ProgressBarV2 } from '../../../../../packages/blend/lib/components/ProgressBarV2';
import {
  ProgressBarV2Variant,
  ProgressBarV2Appearance,
  ProgressBarV2Size,
} from '../../../../../packages/blend/lib/components/ProgressBarV2/progressBarV2.types';

<ProgressBarV2
  value={40}
  variant={ProgressBarV2Variant.LINEAR}
  appearance={ProgressBarV2Appearance.SEGMENTED}
  size={ProgressBarV2Size.MD}
  showLabel
/>
\`\`\`
Progress indicator with linear or circular geometry and solid or segmented **appearance** on the track.

## Model
- **\`variant\`**: \`linear\` | \`circular\` — layout
- **\`appearance\`**: \`solid\` | \`segmented\` — track style (segmented circular uses a dashed track + solid rounded progress arc)

## Accessibility
- \`role="progressbar"\` with \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`
- Default \`aria-label\` when not overridden (\`aria-label\` / \`aria-labelledby\`)
                `,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const variant =
                (context.args.variant as ProgressBarV2Variant | undefined) ??
                ProgressBarV2Variant.LINEAR
            if (variant === ProgressBarV2Variant.CIRCULAR) {
                return <Story />
            }
            return (
                <div className={LINEAR_WIDTH_CLASS}>
                    <Story />
                </div>
            )
        },
    ],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'Current value between min and max',
        },
        min: { control: 'number', description: 'Range minimum (default 0)' },
        max: { control: 'number', description: 'Range maximum (default 100)' },
        size: {
            control: 'select',
            options: Object.values(ProgressBarV2Size),
        },
        variant: {
            control: 'select',
            options: Object.values(ProgressBarV2Variant),
        },
        appearance: {
            control: 'select',
            options: Object.values(ProgressBarV2Appearance),
        },
        showLabel: { control: 'boolean' },
        'aria-label': { control: 'text' },
    },
    args: {
        value: 40,
        min: 0,
        max: 100,
        size: ProgressBarV2Size.MD,
        variant: ProgressBarV2Variant.LINEAR,
        appearance: ProgressBarV2Appearance.SOLID,
        showLabel: false,
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressBarV2>

export const LinearSolid: Story = {
    name: 'Linear · Solid',
    args: {
        variant: ProgressBarV2Variant.LINEAR,
        appearance: ProgressBarV2Appearance.SOLID,
        value: 55,
    },
}

export const LinearSegmented: Story = {
    name: 'Linear · Segmented',
    args: {
        variant: ProgressBarV2Variant.LINEAR,
        appearance: ProgressBarV2Appearance.SEGMENTED,
        value: 55,
    },
}

export const CircularSolid: Story = {
    name: 'Circular · Solid',
    args: {
        variant: ProgressBarV2Variant.CIRCULAR,
        appearance: ProgressBarV2Appearance.SOLID,
        value: 40,
        showLabel: true,
    },
}

export const CircularSegmented: Story = {
    name: 'Circular · Segmented track',
    args: {
        variant: ProgressBarV2Variant.CIRCULAR,
        appearance: ProgressBarV2Appearance.SEGMENTED,
        value: 40,
        showLabel: true,
    },
}

export const WithLabel: Story = {
    args: {
        value: 72,
        showLabel: true,
    },
}

export const SizesLinear: Story = {
    name: 'Sizes (linear)',
    render: () => (
        <div className={`${LINEAR_WIDTH_CLASS} flex flex-col gap-4`}>
            <ProgressBarV2 value={30} size={ProgressBarV2Size.SM} showLabel />
            <ProgressBarV2 value={50} size={ProgressBarV2Size.MD} showLabel />
            <ProgressBarV2 value={70} size={ProgressBarV2Size.LG} showLabel />
        </div>
    ),
}

export const SizesCircular: Story = {
    name: 'Sizes (circular)',
    render: () => (
        <div className="flex gap-6 items-center justify-center flex-wrap">
            <ProgressBarV2
                value={40}
                variant={ProgressBarV2Variant.CIRCULAR}
                size={ProgressBarV2Size.SM}
                showLabel
            />
            <ProgressBarV2
                value={40}
                variant={ProgressBarV2Variant.CIRCULAR}
                size={ProgressBarV2Size.MD}
                showLabel
            />
            <ProgressBarV2
                value={40}
                variant={ProgressBarV2Variant.CIRCULAR}
                size={ProgressBarV2Size.LG}
                showLabel
            />
        </div>
    ),
}

export const CustomRange: Story = {
    args: {
        value: 250,
        min: 0,
        max: 500,
        showLabel: true,
        'aria-label': 'Storage used: 250 of 500 GB',
    },
}

export const Interactive: Story = {
    render: function InteractiveRender() {
        const [value, setValue] = useState(40)
        return (
            <div className={`${LINEAR_WIDTH_CLASS} flex flex-col gap-3`}>
                <label className="flex flex-col gap-2 text-sm">
                    <span>Value: {value}</span>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        aria-label="Adjust progress"
                    />
                </label>
                <ProgressBarV2 value={value} showLabel />
            </div>
        )
    },
}

export const Playground: Story = {
    args: {
        value: 65,
        showLabel: true,
    },
}
