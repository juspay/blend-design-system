import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Spinner } from '../../../../../packages/blend/lib/components/Spinner'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
## Usage

Spinner communicates indeterminate progress. Use the overlay prop inside a relatively positioned parent when loading should temporarily cover that region.

## Features
- Three token-backed sizes: sm, md, and lg
- Semantic colors: default, primary, and inverse
- Visually hidden status label, defaulting to Loading
- Reduced-motion support renders a static ring

## Accessibility
- Uses role="status" with a polite live region
- The visual indicator is hidden from assistive technology
- Pass a specific label when the loading context is not obvious

## Verification
- Check the Accessibility panel for zero violations
- Test overlay stories with a relatively positioned parent
                `,
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        color: {
            control: 'select',
            options: ['default', 'primary', 'inverse'],
        },
        label: { control: 'text' },
        overlay: { control: 'boolean' },
    },
    args: {
        size: 'md',
        color: 'primary',
        label: 'Loading',
        overlay: false,
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Spinner size="sm" label="Small loading indicator" />
            <Spinner size="md" label="Medium loading indicator" />
            <Spinner size="lg" label="Large loading indicator" />
        </div>
    ),
}

export const SemanticColors: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Spinner color="default" label="Default loading indicator" />
            <Spinner color="primary" label="Primary loading indicator" />
            <div style={{ padding: 16, background: '#181B25' }}>
                <Spinner color="inverse" label="Inverse loading indicator" />
            </div>
        </div>
    ),
}

export const Overlay: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                width: 320,
                height: 180,
                border: '1px solid #E1E4EA',
                borderRadius: 8,
            }}
        >
            <p style={{ padding: 24 }}>
                Content remains in place below the scrim.
            </p>
            <Spinner overlay color="inverse" label="Loading content" />
        </div>
    ),
}

export const CustomLabel: Story = {
    args: {
        label: 'Loading search results',
    },
}
