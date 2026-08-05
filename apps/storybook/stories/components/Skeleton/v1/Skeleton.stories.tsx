import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Skeleton,
    ThemeProvider,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import { Theme } from '../../../../../../packages/blend/lib/context/theme.enum'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const meta: Meta = {
    title: 'Components/Skeleton',
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Loading placeholders with pulse, wave, and shimmer animations. Host components reuse these base/highlight/shimmer colors.',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Skeleton width={240} height={16} variant="pulse" loading />
            <Skeleton width={180} height={16} variant="wave" loading />
            <Skeleton width={200} height={16} variant="shimmer" loading />
            <Skeleton shape="circle" width={40} height={40} loading />
        </div>
    ),
}

/** Skeleton tokens under dark theme, including a Button host skeleton. */
export const Dark: Story = {
    name: 'Dark theme',
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.DARK}>
                <div
                    style={{
                        background: '#181B25',
                        padding: 24,
                        minHeight: 200,
                        borderRadius: 8,
                    }}
                >
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Skeleton width={240} height={16} variant="pulse" loading />
            <Skeleton width={180} height={16} variant="wave" loading />
            <Skeleton width={200} height={16} variant="shimmer" loading />
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Skeleton shape="circle" width={40} height={40} loading />
                <Skeleton width={120} height={14} loading />
            </div>
            <Button
                text="Loading action"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                showSkeleton
                skeletonVariant="shimmer"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Dark theme skeleton colors (base/highlight/shimmer) plus a Button host that consumes Skeleton tokens.',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}
