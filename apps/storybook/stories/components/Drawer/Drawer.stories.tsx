import type { Meta, StoryObj } from '@storybook/react-vite'
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
    StatusDrawer,
    MultiSelectDrawer,
    SingleSelectDrawer,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import { X, AlertTriangle, Check } from 'lucide-react'

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile drawer component built on Vaul for modal/non-modal sidebars and bottom sheets.

## Features
- Four directions (top, bottom, left, right)
- Modal and non-modal modes
- Drag to dismiss with snap points
- Multiple variants (base, status, select)
- Nested drawers support
- Customizable header, body, and footer
- Token-based styling system
- Full accessibility support

## Variants
- **Base Drawer**: Flexible drawer with custom content
- **Status Drawer**: Pre-styled for confirmations/alerts with icon and actions
- **Select Drawer**: Search and select from a list (single or multi-select)
- **Nested Select Drawer**: Hierarchical selection with categories

## Usage

\`\`\`tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter
} from '@juspay/blend-design-system';

<Drawer>
  <DrawerTrigger>
    <Button text="Open Drawer" />
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        Your content here
      </DrawerBody>
      <DrawerFooter>
        <Button text="Close" />
      </DrawerFooter>
    </DrawerContent>
  </DrawerPortal>
</Drawer>
\`\`\`

## Accessibility
- Proper ARIA labels and descriptions
- Focus management when opening/closing
- Escape key to dismiss
- Focus trap within drawer
- Screen reader announcements
        `,
            },
        },
    },
    argTypes: {
        direction: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Direction from which the drawer slides in.',
            table: {
                type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
                defaultValue: { summary: 'bottom' },
                category: 'Layout',
            },
        },
        modal: {
            control: 'boolean',
            description:
                'Whether the drawer is modal (with overlay blocking interaction).',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Behavior',
            },
        },
        dismissible: {
            control: 'boolean',
            description:
                'Whether the drawer can be dismissed by clicking outside or dragging.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Behavior',
            },
        },
        showHandle: {
            control: 'boolean',
            description:
                'Show drag handle for bottom/top drawers. Useful visual indicator for swipe-to-dismiss.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Appearance',
            },
        },
        open: {
            control: 'boolean',
            description: 'Controlled open state.',
            table: {
                type: { summary: 'boolean' },
                category: 'State',
            },
        },
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback when open state changes.',
            table: {
                type: { summary: '(open: boolean) => void' },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

// Bottom Drawer (Default)
export const BottomDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <Drawer open={open} onOpenChange={setOpen} direction="bottom">
                <DrawerTrigger>
                    <Button
                        text="Open Bottom Drawer"
                        buttonType={ButtonType.PRIMARY}
                    />
                </DrawerTrigger>
                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Bottom Drawer</DrawerTitle>
                            <DrawerDescription>
                                This drawer slides up from the bottom. Common on
                                mobile interfaces.
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <p style={{ padding: '16px 0', lineHeight: '1.6' }}>
                                Bottom drawers are ideal for mobile-first
                                designs, options menus, and forms. They can be
                                dismissed by dragging down or tapping outside.
                            </p>
                        </DrawerBody>
                        <DrawerFooter direction="bottom">
                            <DrawerClose>
                                <Button
                                    text="Close"
                                    buttonType={ButtonType.SECONDARY}
                                    fullWidth
                                />
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Drawer that slides up from the bottom. Perfect for mobile interfaces and quick actions.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                ],
            },
        },
    },
}

// Directions
export const Directions: Story = {
    render: () => {
        const [bottomOpen, setBottomOpen] = useState(false)
        const [topOpen, setTopOpen] = useState(false)
        const [leftOpen, setLeftOpen] = useState(false)
        const [rightOpen, setRightOpen] = useState(false)

        return (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Drawer
                    open={bottomOpen}
                    onOpenChange={setBottomOpen}
                    direction="bottom"
                >
                    <DrawerTrigger>
                        <Button
                            text="Bottom"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Bottom Drawer</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                                <p style={{ padding: '16px 0' }}>
                                    Slides from bottom
                                </p>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>

                <Drawer
                    open={topOpen}
                    onOpenChange={setTopOpen}
                    direction="top"
                >
                    <DrawerTrigger>
                        <Button text="Top" buttonType={ButtonType.SECONDARY} />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Top Drawer</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                                <p style={{ padding: '16px 0' }}>
                                    Slides from top
                                </p>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>

                <Drawer
                    open={leftOpen}
                    onOpenChange={setLeftOpen}
                    direction="left"
                >
                    <DrawerTrigger>
                        <Button text="Left" buttonType={ButtonType.SECONDARY} />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Left Drawer</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                                <p style={{ padding: '16px 0' }}>
                                    Slides from left
                                </p>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>

                <Drawer
                    open={rightOpen}
                    onOpenChange={setRightOpen}
                    direction="right"
                >
                    <DrawerTrigger>
                        <Button
                            text="Right"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Right Drawer</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                                <p style={{ padding: '16px 0' }}>
                                    Slides from right
                                </p>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Drawers can slide in from any of the four directions: bottom, top, left, or right.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Status Drawer
export const StatusDrawerExample: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Delete Account"
                description="Are you sure you want to delete your account? This action cannot be undone."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                            background: '#fee',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AlertTriangle size={32} color="#dc2626" />
                    </div>
                }
                primaryButtonProps={{
                    text: 'Delete Account',
                    buttonType: ButtonType.DANGER,
                    onClick: () => {
                        console.log('Account deleted')
                        setOpen(false)
                    },
                }}
                secondaryButtonProps={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                    onClick: () => setOpen(false),
                }}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Pre-styled drawer for confirmations, alerts, and status messages. Includes icon slot, heading, description, and action buttons.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Single Select Drawer
export const SingleSelectDrawerExample: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        const [selected, setSelected] = useState('option1')

        return (
            <>
                <Button
                    text="Open Single Select"
                    buttonType={ButtonType.PRIMARY}
                    onClick={() => setOpen(true)}
                />
                <SingleSelectDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Choose an option"
                    description="Select one item from the list"
                    items={[
                        {
                            items: [
                                { value: 'option1', label: 'Option 1' },
                                { value: 'option2', label: 'Option 2' },
                                { value: 'option3', label: 'Option 3' },
                            ],
                        },
                    ]}
                    selectedValue={selected}
                    onValueChange={(value) => {
                        setSelected(value)
                        setOpen(false)
                    }}
                    enableSearch
                />
            </>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Drawer with single-select list. Includes search functionality and automatic close on selection.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Multi Select Drawer
export const MultiSelectDrawerExample: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        const [selected, setSelected] = useState<string[]>([
            'option1',
            'option3',
        ])

        return (
            <>
                <Button
                    text={`Open Multi Select (${selected.length} selected)`}
                    buttonType={ButtonType.PRIMARY}
                    onClick={() => setOpen(true)}
                />
                <MultiSelectDrawer
                    open={open}
                    onOpenChange={setOpen}
                    heading="Choose multiple options"
                    description="Select one or more items"
                    items={[
                        {
                            groupLabel: 'Group 1',
                            items: [
                                { value: 'option1', label: 'Option 1' },
                                { value: 'option2', label: 'Option 2' },
                            ],
                        },
                        {
                            groupLabel: 'Group 2',
                            items: [
                                { value: 'option3', label: 'Option 3' },
                                { value: 'option4', label: 'Option 4' },
                            ],
                        },
                    ]}
                    selectedValues={selected}
                    onSelectionChange={setSelected}
                    onConfirm={() => setOpen(false)}
                    onCancel={() => {
                        setSelected([])
                        setOpen(false)
                    }}
                    enableSearch
                />
            </>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Drawer with multi-select checkboxes. Includes grouping, search, clear all, and confirm actions.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Non-Modal Drawer
export const NonModalDrawer: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <Drawer
                open={open}
                onOpenChange={setOpen}
                direction="right"
                modal={false}
            >
                <DrawerTrigger>
                    <Button
                        text="Open Non-Modal Drawer"
                        buttonType={ButtonType.SECONDARY}
                    />
                </DrawerTrigger>
                <DrawerPortal>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Non-Modal Drawer</DrawerTitle>
                            <DrawerDescription>
                                You can still interact with the page behind this
                                drawer.
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <p style={{ padding: '16px 0', lineHeight: '1.6' }}>
                                Non-modal drawers don't block interaction with
                                the rest of the page. They're useful for
                                persistent side panels, help content, or
                                reference information.
                            </p>
                        </DrawerBody>
                        <DrawerFooter direction="right">
                            <DrawerClose>
                                <Button
                                    text="Close"
                                    buttonType={ButtonType.SECONDARY}
                                />
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Non-modal drawer without overlay. Allows interaction with the page content behind it.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <div>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Keyboard Navigation
                    </h4>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        - <strong>Escape:</strong> Close the drawer
                        <br />- <strong>Tab:</strong> Navigate between
                        interactive elements
                        <br />- Focus is trapped within the drawer when open
                    </p>
                </div>

                <div>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        ARIA Labels
                    </h4>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Drawers include proper ARIA labels via DrawerTitle and
                        DrawerDescription components for screen reader support.
                    </p>
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                text="Open Accessible Drawer"
                                buttonType={ButtonType.PRIMARY}
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Accessible Drawer</DrawerTitle>
                                    <DrawerDescription>
                                        This drawer has proper ARIA labeling for
                                        screen readers
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p style={{ padding: '16px 0' }}>
                                        Screen readers will announce the title
                                        and description when the drawer opens.
                                    </p>
                                </DrawerBody>
                                <DrawerFooter direction="bottom">
                                    <DrawerClose>
                                        <Button
                                            text="Close"
                                            buttonType={ButtonType.SECONDARY}
                                            fullWidth
                                        />
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features including keyboard navigation, focus management, and ARIA labels. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'aria-required-attr', enabled: true },
                    { id: 'focus-order-semantics', enabled: true },
                ],
            },
        },
    },
}
