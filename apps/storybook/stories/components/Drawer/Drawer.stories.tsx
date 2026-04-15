import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { X, AlertTriangle, CheckCircle, Info, Trash2 } from 'lucide-react'
import {
    StatusDrawer,
    MultiSelectDrawer,
    SingleSelectDrawer,
    NestedMultiSelectDrawer,
    NestedSingleSelectDrawer,
} from '@juspay/blend-design-system'

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A versatile drawer component that slides in from any direction (top, bottom, left, right) with support for modal overlays, snap points, and comprehensive accessibility features.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose } from '@juspay/blend-design-system';

function MyDrawer() {
  const [open, setOpen] = useState(false);
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button text="Open Drawer" />
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>Drawer description text</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <p>Drawer content goes here</p>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button buttonType={ButtonType.SECONDARY} text="Cancel" />
            </DrawerClose>
            <Button 
              buttonType={ButtonType.PRIMARY} 
              text="Confirm"
              onClick={() => setOpen(false)}
            />
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
\`\`\`

## Features
- **Multiple Directions**: Slide in from top, bottom, left, or right
- **Modal Support**: Optional overlay with backdrop
- **Snap Points**: Support for multiple snap positions (bottom/top drawers)
- **Drag Interaction**: Swipe to dismiss or navigate snap points
- **Keyboard Accessible**: Full keyboard navigation and focus management
- **Accessible**: Built on Radix UI primitives with proper ARIA attributes
- **Responsive**: Mobile-optimized with custom offsets

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Escape, Enter, Space)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (role="dialog", aria-modal, aria-labelledby, aria-describedby)
- Focus management (focus trap, focus return)
- Visible focus indicators
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: 2.5.5 Target Size - interactive elements need 44x44px minimum for AAA

**Key Accessibility Features**:
- Focus trap when drawer is open
- Focus returns to trigger when drawer closes
- Proper dialog role and aria-modal attribute
- Accessible title and description via aria-labelledby and aria-describedby
- Keyboard shortcuts (Escape to close)
- Screen reader announcements for state changes
- Decorative icons marked with aria-hidden="true"

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Custom Close Icon and CTA

You can add custom close icons and primary CTAs by using \`DrawerClose\` component and managing state yourself:

\`\`\`tsx
import { DrawerClose } from '@juspay/blend-design-system';
import { X } from 'lucide-react';

function CustomDrawer() {
  const [open, setOpen] = useState(false);
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button text="Open Drawer" />
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent fullScreen={true}>
          {/* Custom close icon */}
          <DrawerClose>
            <button
              className="absolute top-4 right-4 p-2 rounded bg-transparent border-none cursor-pointer"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>Full Screen Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>Content goes here</p>
          </DrawerBody>
          <DrawerFooter>
            <Button
              buttonType={ButtonType.PRIMARY}
              text="Save & Close"
              fullWidth
              onClick={() => {
                // Your save logic
                setOpen(false);
              }}
            />
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
            description: 'Whether the drawer is open',
        },
        onOpenChange: {
            action: 'onOpenChange',
            description: 'Callback when the drawer open state changes',
        },
        direction: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'The direction from which the drawer slides in',
        },
        modal: {
            control: 'boolean',
            description: 'Whether the drawer should be modal (with overlay)',
        },
        dismissible: {
            control: 'boolean',
            description:
                'Whether the drawer can be dismissed by clicking outside',
        },
        showHandle: {
            control: 'boolean',
            description:
                'Whether to show the drag handle (only for bottom/top drawers)',
        },
        nested: {
            control: 'boolean',
            description:
                'Whether the drawer should be nested (for stacking effect)',
        },
        snapPoints: {
            control: 'object',
            description:
                'Custom snap points for the drawer (only for bottom/top drawers)',
            table: {
                type: {
                    summary: '(string | number)[]',
                    detail: `Array of snap points for the drawer to snap to.
Examples: [0.25, 0.5, 0.75] for percentage values
Or: [100, 300, 500] for pixel values
First value is initial position, last value is fully open.`,
                },
                category: 'Snap Points',
            },
        },
        activeSnapPoint: {
            control: 'text',
            description:
                'Active snap point (can be index or the snap point value itself)',
        },
        onSnapPointChange: {
            action: 'onSnapPointChange',
            description: 'Callback when snap point changes',
        },
        fadeFromIndex: {
            control: 'number',
            description:
                'The snap point index from which the drawer should fade',
        },
        snapToSequentialPoint: {
            control: 'boolean',
            description:
                'Disable velocity-based snapping for sequential snap point navigation',
        },
        disableDrag: {
            control: 'boolean',
            description: 'Disable drag functionality',
        },
        mobileOffset: {
            control: 'object',
            description:
                'Custom mobile offset values (overrides token defaults)',
            table: {
                type: {
                    summary: 'MobileOffset',
                    detail: `{
  top?: string;     // Top offset (e.g., '56px', '4rem')
  bottom?: string;  // Bottom offset
  left?: string;    // Left offset
  right?: string;   // Right offset
}`,
                },
                category: 'Layout',
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof Drawer>

// ============================================================================
// Default Examples
// ============================================================================

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Default Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This is a default drawer example with
                                    header, body, and footer sections.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p className="mb-4">
                                    Drawer content can include any React
                                    components or HTML elements. This drawer
                                    demonstrates the basic structure with
                                    header, body, and footer.
                                </p>
                                <p>
                                    The drawer can be closed by clicking the
                                    overlay, pressing Escape, or using the close
                                    button.
                                </p>
                            </DrawerBody>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Cancel"
                                    />
                                </DrawerClose>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    text="Confirm"
                                />
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
}

export const BottomDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Drawer open={open} onOpenChange={setOpen} direction="bottom">
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Bottom Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="bottom">
                            <DrawerHeader>
                                <DrawerTitle>Bottom Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This drawer slides in from the bottom.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>Content for bottom drawer</p>
                            </DrawerBody>
                            <DrawerFooter direction="bottom">
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Close"
                                    />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
}

export const RightDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Drawer open={open} onOpenChange={setOpen} direction="right">
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Right Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="right" width={400}>
                            <DrawerHeader>
                                <DrawerTitle>Right Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This drawer slides in from the right side.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>Content for right drawer</p>
                            </DrawerBody>
                            <DrawerFooter direction="right">
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Close"
                                    />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
}

// ============================================================================
// Direction Variants
// ============================================================================

export const TopDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Drawer open={open} onOpenChange={setOpen} direction="top">
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Top Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="top">
                            <DrawerHeader>
                                <DrawerTitle>Top Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This drawer slides in from the top.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>Content for top drawer</p>
                            </DrawerBody>
                            <DrawerFooter direction="top">
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Close"
                                    />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
}

export const LeftDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Drawer open={open} onOpenChange={setOpen} direction="left">
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Left Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="left" width={350}>
                            <DrawerHeader>
                                <DrawerTitle>Left Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This drawer slides in from the left side.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>Content for left drawer</p>
                            </DrawerBody>
                            <DrawerFooter direction="left">
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Close"
                                    />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
}

export const FullscreenDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Drawer open={open} onOpenChange={setOpen} direction="bottom">
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Fullscreen Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="bottom" fullScreen>
                            <DrawerClose asChild>
                                <button
                                    className="absolute top-4 right-4 p-2 rounded bg-transparent border-none cursor-pointer"
                                    aria-label="Close drawer"
                                >
                                    <X size={20} />
                                </button>
                            </DrawerClose>
                            <DrawerHeader>
                                <DrawerTitle>Fullscreen Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This drawer takes up the full screen.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>
                                    Fullscreen content goes here. The drawer has
                                    no border radius and covers the entire
                                    viewport.
                                </p>
                            </DrawerBody>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Cancel"
                                    />
                                </DrawerClose>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    text="Confirm"
                                    onClick={() => setOpen(false)}
                                />
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
}

// ============================================================================
// Status Drawer
// ============================================================================

export const StatusDrawerSuccess: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Open Success Status"
                    onClick={() => setOpen(true)}
                />
                <StatusDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Payment Successful"
                    description="Your payment has been processed successfully. You will receive a confirmation email shortly."
                    slot={<CheckCircle size={32} color="#22c55e" />}
                    primaryButtonProps={{
                        text: 'Continue',
                        buttonType: ButtonType.PRIMARY,
                        onClick: () => setOpen(false),
                    }}
                />
            </div>
        )
    },
}

export const StatusDrawerWarning: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Open Warning Status"
                    onClick={() => setOpen(true)}
                />
                <StatusDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Unsaved Changes"
                    description="You have unsaved changes. Are you sure you want to leave this page?"
                    slot={<AlertTriangle size={32} color="#f59e0b" />}
                    primaryButtonProps={{
                        text: 'Leave Page',
                        buttonType: ButtonType.PRIMARY,
                        onClick: () => setOpen(false),
                    }}
                    secondaryButtonProps={{
                        text: 'Stay',
                        buttonType: ButtonType.SECONDARY,
                        onClick: () => setOpen(false),
                    }}
                />
            </div>
        )
    },
}

export const StatusDrawerDestructive: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.DANGER}
                    text="Open Delete Confirmation"
                    onClick={() => setOpen(true)}
                />
                <StatusDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Delete Account"
                    description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
                    slot={<Trash2 size={32} color="#dc2626" />}
                    primaryButtonProps={{
                        text: 'Delete Account',
                        buttonType: ButtonType.DANGER,
                        onClick: () => setOpen(false),
                    }}
                    secondaryButtonProps={{
                        text: 'Cancel',
                        buttonType: ButtonType.SECONDARY,
                        onClick: () => setOpen(false),
                    }}
                />
            </div>
        )
    },
}

export const StatusDrawerInfo: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Open Info Status"
                    onClick={() => setOpen(true)}
                />
                <StatusDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="System Maintenance"
                    description="Our system will undergo maintenance on Saturday at 2 AM UTC. Expected downtime is 30 minutes."
                    slot={<Info size={32} color="#3b82f6" />}
                    primaryButtonProps={{
                        text: 'Got it',
                        buttonType: ButtonType.PRIMARY,
                        onClick: () => setOpen(false),
                    }}
                />
            </div>
        )
    },
}

// ============================================================================
// Select Drawers
// ============================================================================

const selectItems = [
    {
        groupLabel: 'Fruits',
        items: [
            { value: 'apple', label: 'Apple', subLabel: 'Fresh red apples' },
            { value: 'banana', label: 'Banana', subLabel: 'Organic bananas' },
            {
                value: 'orange',
                label: 'Orange',
                subLabel: 'California oranges',
            },
        ],
        showSeparator: true,
    },
    {
        groupLabel: 'Vegetables',
        items: [
            { value: 'carrot', label: 'Carrot' },
            { value: 'broccoli', label: 'Broccoli' },
            { value: 'spinach', label: 'Spinach' },
        ],
    },
]

export const SingleSelectDrawerStory: Story = {
    name: 'Single Select Drawer',
    render: () => {
        const [open, setOpen] = useState(false)
        const [selectedValue, setSelectedValue] = useState<string>('')

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text={
                        selectedValue
                            ? `Selected: ${selectedValue}`
                            : 'Open Single Select'
                    }
                    onClick={() => setOpen(true)}
                />
                <SingleSelectDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Select a fruit"
                    description="Choose your favorite item from the list"
                    items={selectItems}
                    selectedValue={selectedValue}
                    onValueChange={setSelectedValue}
                    onConfirm={() => setOpen(false)}
                    enableSearch={true}
                    searchPlaceholder="Search items..."
                />
            </div>
        )
    },
}

export const MultiSelectDrawerStory: Story = {
    name: 'Multi Select Drawer',
    render: () => {
        const [open, setOpen] = useState(false)
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text={
                        selectedValues.length > 0
                            ? `Selected: ${selectedValues.length} items`
                            : 'Open Multi Select'
                    }
                    onClick={() => setOpen(true)}
                />
                <MultiSelectDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Select fruits"
                    description="Choose multiple items from the list"
                    items={selectItems}
                    selectedValues={selectedValues}
                    onSelectionChange={setSelectedValues}
                    onConfirm={() => setOpen(false)}
                    onCancel={() => setSelectedValues([])}
                    enableSearch={true}
                    searchPlaceholder="Search items..."
                />
            </div>
        )
    },
}

// ============================================================================
// Nested Select Drawers
// ============================================================================

const nestedItems = [
    {
        groupLabel: 'Electronics',
        items: [
            {
                value: 'phones',
                label: 'Phones',
                nestedItems: [
                    {
                        items: [
                            { value: 'iphone', label: 'iPhone' },
                            { value: 'samsung', label: 'Samsung Galaxy' },
                            { value: 'pixel', label: 'Google Pixel' },
                        ],
                    },
                ],
            },
            {
                value: 'laptops',
                label: 'Laptops',
                nestedItems: [
                    {
                        items: [
                            { value: 'macbook', label: 'MacBook' },
                            { value: 'thinkpad', label: 'ThinkPad' },
                            { value: 'dell', label: 'Dell XPS' },
                        ],
                    },
                ],
            },
            { value: 'tablets', label: 'Tablets' },
        ],
        showSeparator: true,
    },
    {
        groupLabel: 'Accessories',
        items: [
            { value: 'cases', label: 'Cases' },
            { value: 'chargers', label: 'Chargers' },
            { value: 'cables', label: 'Cables' },
        ],
    },
]

export const NestedSingleSelectDrawerStory: Story = {
    name: 'Nested Single Select Drawer',
    render: () => {
        const [open, setOpen] = useState(false)
        const [selectedValue, setSelectedValue] = useState<string>('')

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text={
                        selectedValue
                            ? `Selected: ${selectedValue}`
                            : 'Open Nested Single Select'
                    }
                    onClick={() => setOpen(true)}
                />
                <NestedSingleSelectDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Categories"
                    description="Select a category or navigate to subcategories"
                    items={nestedItems}
                    selectedValue={selectedValue}
                    onValueChange={setSelectedValue}
                    onConfirm={() => setOpen(false)}
                    enableSearch={true}
                />
            </div>
        )
    },
}

export const NestedMultiSelectDrawerStory: Story = {
    name: 'Nested Multi Select Drawer',
    render: () => {
        const [open, setOpen] = useState(false)
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="p-5">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text={
                        selectedValues.length > 0
                            ? `Selected: ${selectedValues.length} items`
                            : 'Open Nested Multi Select'
                    }
                    onClick={() => setOpen(true)}
                />
                <NestedMultiSelectDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Categories"
                    description="Select multiple categories"
                    items={nestedItems}
                    selectedValues={selectedValues}
                    onSelectionChange={setSelectedValues}
                    onConfirm={() => setOpen(false)}
                    onCancel={() => setSelectedValues([])}
                    enableSearch={true}
                />
            </div>
        )
    },
}
