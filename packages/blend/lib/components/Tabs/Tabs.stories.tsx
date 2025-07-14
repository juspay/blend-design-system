import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './index'
import { User, Settings, Lock } from 'lucide-react'
import { TabsVariant, TabsSize } from './types'

// Define the story args type explicitly
type TabsStoryArgs = {
    variant: TabsVariant
    size: TabsSize
    expanded: boolean
    showLeftSlot: boolean
    showRightSlot: boolean
}

const meta: Meta<TabsStoryArgs> = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: Object.values(TabsVariant),
            description: 'The visual style of the tabs',
            table: {
                defaultValue: { summary: TabsVariant.UNDERLINE },
            },
        },
        size: {
            control: 'select',
            options: Object.values(TabsSize),
            description: 'The size of the tabs',
            table: {
                defaultValue: { summary: TabsSize.MD },
            },
        },
        expanded: {
            control: 'boolean',
            description:
                'Whether tabs should expand to fill the container width',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        showLeftSlot: {
            control: 'boolean',
            description: 'Show left slot icon',
            table: { category: 'Icons' },
        },
        showRightSlot: {
            control: 'boolean',
            description: 'Show right slot icon',
            table: { category: 'Icons' },
        },
    },
}

export default meta
type Story = StoryObj<TabsStoryArgs>

export const Default: Story = {
    render: (args: TabsStoryArgs) => {
        const {
            expanded,
            showLeftSlot,
            showRightSlot,
            variant,
            size,
            ...tabsProps
        } = args as TabsStoryArgs & typeof args

        return (
            <Tabs defaultValue="tab1" style={{ width: '500px' }} {...tabsProps}>
                <TabsList variant={variant} size={size} expanded={expanded}>
                    <TabsTrigger
                        value="tab1"
                        variant={variant}
                        size={size}
                        leftSlot={showLeftSlot ? <User size={16} /> : undefined}
                        rightSlot={
                            showRightSlot ? <Settings size={16} /> : undefined
                        }
                    >
                        Account
                    </TabsTrigger>
                    <TabsTrigger
                        value="tab2"
                        variant={variant}
                        size={size}
                        leftSlot={showLeftSlot ? <Lock size={16} /> : undefined}
                        rightSlot={
                            showRightSlot ? <Settings size={16} /> : undefined
                        }
                    >
                        Password
                    </TabsTrigger>
                    <TabsTrigger
                        value="tab3"
                        variant={variant}
                        size={size}
                        leftSlot={
                            showLeftSlot ? <Settings size={16} /> : undefined
                        }
                        rightSlot={
                            showRightSlot ? <Settings size={16} /> : undefined
                        }
                    >
                        Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                    <div
                        style={{
                            padding: '16px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            marginTop: '16px',
                        }}
                    >
                        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>
                            Account Settings
                        </h3>
                        <p style={{ color: '#4b5563', marginTop: '8px' }}>
                            Manage your account preferences here.
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="tab2">
                    <div
                        style={{
                            padding: '16px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            marginTop: '16px',
                        }}
                    >
                        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>
                            Password Settings
                        </h3>
                        <p style={{ color: '#4b5563', marginTop: '8px' }}>
                            Change your password and security settings.
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="tab3">
                    <div
                        style={{
                            padding: '16px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            marginTop: '16px',
                        }}
                    >
                        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>
                            General Settings
                        </h3>
                        <p style={{ color: '#4b5563', marginTop: '8px' }}>
                            Configure your application preferences.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        )
    },
    args: {
        variant: TabsVariant.UNDERLINE,
        size: TabsSize.MD,
        expanded: false,
        showLeftSlot: true,
        showRightSlot: false,
    },
}

export const Expanded: Story = {
    ...Default,
    args: {
        ...Default.args,
        expanded: true,
        variant: TabsVariant.BOXED,
    },
}

export const ExpandedUnderline: Story = {
    ...Default,
    args: {
        ...Default.args,
        expanded: true,
        variant: TabsVariant.UNDERLINE,
    },
}

export const ExpandedFloating: Story = {
    ...Default,
    args: {
        ...Default.args,
        expanded: true,
        variant: TabsVariant.FLOATING,
    },
}

export const Boxed: Story = {
    ...Default,
    args: {
        ...Default.args,
        variant: TabsVariant.BOXED,
    },
}

export const Floating: Story = {
    ...Default,
    args: {
        ...Default.args,
        variant: TabsVariant.FLOATING,
    },
}

export const Large: Story = {
    ...Default,
    args: {
        ...Default.args,
        variant: TabsVariant.UNDERLINE,
        size: TabsSize.LG,
    },
}

export const WithIcons: Story = {
    ...Default,
    args: {
        ...Default.args,
        showLeftSlot: true,
        showRightSlot: true,
    },
}

export const NoIcons: Story = {
    ...Default,
    args: {
        ...Default.args,
        showLeftSlot: false,
        showRightSlot: false,
    },
}
