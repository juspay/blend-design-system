import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { fn } from '@storybook/test'
import { EmptyState } from '../../../../../packages/blend/lib/components/EmptyState'
import {
    ButtonV2,
    ButtonV2Type,
} from '../../../../../packages/blend/lib/components/ButtonV2'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const illustration = (
    <div
        aria-hidden="true"
        style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: '#EFF6FF',
            color: '#0561E2',
            fontSize: 28,
        }}
    >
        ∅
    </div>
)

const meta: Meta<typeof EmptyState> = {
    title: 'Components/EmptyState',
    component: EmptyState,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
## Usage

Use EmptyState for a generic empty, error, or no-access composition. Consumers provide the copy, illustration, and actions for their context.

## Features
- Token-backed sm, md, and lg compositions
- Optional illustration and rich description content
- Object actions become Blend buttons; React nodes are rendered as slots
- No domain-specific variants

## Accessibility
- The composition is a labeled section
- The required title is rendered as an h2
- Illustrations can be marked decorative by the consumer when appropriate

## Verification
- Check the Accessibility panel for zero violations
- Verify both object actions and consumer-provided action slots
                `,
            },
        },
    },
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        illustration: { control: false },
        primaryAction: { control: false },
        secondaryAction: { control: false },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
    args: {
        title: 'No results found',
        description: 'Try adjusting your filters or create a new item.',
        illustration,
        size: 'md',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {}

export const WithObjectActions: Story = {
    args: {
        primaryAction: { label: 'Create item', onClick: fn() },
        secondaryAction: { label: 'Clear filters', onClick: fn() },
    },
}

export const WithActionSlots: Story = {
    args: {
        primaryAction: (
            <ButtonV2
                text="Create item"
                onClick={fn()}
                aria-label="Create item"
            />
        ),
        secondaryAction: (
            <ButtonV2
                buttonType={ButtonV2Type.SECONDARY}
                text="Learn more"
                onClick={fn()}
                aria-label="Learn more"
            />
        ),
    },
}

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <EmptyState size="sm" title="Small empty state" />
            <EmptyState size="md" title="Medium empty state" />
            <EmptyState size="lg" title="Large empty state" />
        </div>
    ),
}

export const DescriptionAsRichContent: Story = {
    args: {
        description: (
            <>
                There are no saved items. <a href="#help">Learn more</a>.
            </>
        ),
    },
}
