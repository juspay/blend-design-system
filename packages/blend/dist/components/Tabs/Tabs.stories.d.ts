import { Meta, StoryObj } from '@storybook/react'
import { TabsVariant, TabsSize } from './types'
type TabsStoryArgs = {
    variant: TabsVariant
    size: TabsSize
    expanded: boolean
    showLeftSlot: boolean
    showRightSlot: boolean
}
declare const meta: Meta<TabsStoryArgs>
export default meta
type Story = StoryObj<TabsStoryArgs>
export declare const Default: Story
export declare const Expanded: Story
export declare const ExpandedUnderline: Story
export declare const ExpandedFloating: Story
export declare const Boxed: Story
export declare const Floating: Story
export declare const Large: Story
export declare const WithIcons: Story
export declare const NoIcons: Story
