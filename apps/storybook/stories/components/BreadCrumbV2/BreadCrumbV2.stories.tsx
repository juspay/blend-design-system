import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import BreadcrumbV2 from '../../../../../packages/blend/lib/components/BreadcrumbV2/BreadcrumbV2'

const meta: Meta<typeof BreadcrumbV2> = {
    title: 'Components/BreadcrumbV2',
    component: BreadcrumbV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('navigation'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Breadcrumb navigation component with optional overflow/menu handling and skeleton support.
`,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BreadcrumbV2>

const SAMPLE_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Cameras', href: '/products/electronics/cameras' },
]

export const Default: Story = {
    render: (args) => <BreadcrumbV2 {...args} />,
    args: {
        items: SAMPLE_ITEMS,
    },
}

export const WithOverflowMenu: Story = {
    render: (args) => (
        <div style={{ width: 400 }}>
            {/* constrain width to show overflow */}
            <BreadcrumbV2 {...args} />
        </div>
    ),
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Level 1', href: '/1' },
            { label: 'Level 2', href: '/2' },
            { label: 'Level 3', href: '/3' },
            { label: 'Level 4', href: '/4' },
            { label: 'Level 5', href: '/5' },
            { label: 'Level 6', href: '/6' },
        ],
    },
}

export const Skeleton: Story = {
    render: () => (
        <BreadcrumbV2
            items={SAMPLE_ITEMS}
            skeleton={{ show: true, variant: 'text' as any }}
        />
    ),
}
