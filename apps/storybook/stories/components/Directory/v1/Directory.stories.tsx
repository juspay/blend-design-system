import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Directory, ThemeProvider } from '@juspay/blend-design-system'
import { Theme } from '../../../../../../packages/blend/lib/context/theme.enum'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import type { DirectoryData } from '../../../../../../packages/blend/lib/components/Directory/types'

const directoryData: DirectoryData[] = [
    {
        label: 'Workspace',
        isCollapsible: true,
        defaultOpen: true,
        items: [
            {
                label: 'Projects',
                items: [
                    { label: 'Blend Design System' },
                    { label: 'Payments Console' },
                ],
            },
            {
                label: 'Settings',
                items: [{ label: 'Members' }, { label: 'Billing' }],
            },
        ],
    },
    {
        label: 'Resources',
        isCollapsible: true,
        defaultOpen: true,
        items: [{ label: 'Docs' }, { label: 'Changelog' }],
    },
]

const meta: Meta<typeof Directory> = {
    title: 'Components/Directory',
    component: Directory,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Nav directory with section headers, nested items, and hierarchy lines.',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Directory>

export const Default: Story = {
    args: {
        directoryData,
        showHierarchyLines: true,
        defaultActiveItem: 'Blend Design System',
    },
    render: (args) => (
        <div style={{ width: 280, minHeight: 360 }}>
            <Directory {...args} />
        </div>
    ),
}

export const Dark: Story = {
    name: 'Dark theme',
    args: {
        directoryData,
        showHierarchyLines: true,
        defaultActiveItem: 'Blend Design System',
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.DARK}>
                <div
                    style={{
                        background: '#181B25',
                        padding: 16,
                        borderRadius: 8,
                        width: 300,
                        minHeight: 360,
                    }}
                >
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    render: (args) => <Directory {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Dark tokens for section headers, item default/hover/active, nested connectors, and icons.',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}
