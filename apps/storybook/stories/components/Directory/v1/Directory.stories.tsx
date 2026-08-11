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

// Deep tree for the active-path stories — mirrors the Entity Management
// hierarchy (group → network → merchant).
const entityData: DirectoryData[] = [
    {
        label: 'Entities',
        isCollapsible: false,
        defaultOpen: true,
        items: [
            {
                label: 'Acme Commerce Group',
                items: [
                    {
                        label: 'Helix Network',
                        items: [
                            { label: 'Orbit Pharma' },
                            { label: 'Indus Pharma' },
                            { label: 'Orion Pharma' },
                            { label: 'Apollo Pharma' },
                        ],
                    },
                    { label: 'Quanta Network' },
                ],
            },
            { label: 'Nimbus Ventures' },
            { label: 'Polaris Channel' },
        ],
    },
]

const entityExpanded = [
    'Acme Commerce Group',
    'Acme Commerce Group/Helix Network',
]
const entitySelection = 'Acme Commerce Group/Helix Network/Orion Pharma'

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

export const ActivePathHighlight: Story = {
    name: 'Active path highlight',
    args: {
        directoryData: entityData,
        showHierarchyLines: true,
        highlightActivePath: true,
        defaultExpandedItems: entityExpanded,
        defaultActiveItem: entitySelection,
    },
    render: (args) => (
        <div style={{ width: 300, minHeight: 400 }}>
            <Directory {...args} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'With `highlightActivePath`, the selected row keeps the `active` treatment, its ancestors read as `activePath`, and every unrelated branch is `muted`. Click a different merchant to watch the highlighted chain follow the selection. Toggle the prop off in Controls to compare — with it off, all three tiers collapse back to the single active/default pair.',
            },
        },
    },
}

export const ActivePathHighlightDark: Story = {
    name: 'Active path highlight (dark)',
    args: {
        directoryData: entityData,
        showHierarchyLines: true,
        highlightActivePath: true,
        defaultExpandedItems: entityExpanded,
        defaultActiveItem: entitySelection,
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.DARK}>
                <div
                    style={{
                        background: '#0E121B',
                        padding: 16,
                        borderRadius: 8,
                        width: 320,
                        minHeight: 400,
                    }}
                >
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    render: (args) => <Directory {...args} />,
    parameters: {
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}
