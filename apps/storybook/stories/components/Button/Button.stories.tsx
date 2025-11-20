import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import {
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
    ButtonState,
} from '@juspay/blend-design-system'
import {
    Plus,
    Download,
    Settings,
    Heart,
    Star,
    Search,
    Edit,
    Trash2,
    Check,
} from 'lucide-react'

// Figma Code Connect is now in a separate file: Button.figma.tsx

const meta: Meta<typeof Button> = {
    title: 'Components/Button/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

A modern, enhanced button component with improved styling and token-based design system.

## Features
- Multiple button types (Primary, Secondary, Danger, Success)
- Various sizes (Small, Medium, Large)
- Sub-types (Default, Icon Only, Inline)
- Icon support (leading and trailing)
- Loading and disabled states
- Full width support
- Button group positioning
- Token-based styling system
- Accessibility features built-in

## Usage

\`\`\`tsx
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system';

<Button
  buttonType={ButtonType.PRIMARY}
  size={ButtonSize.MEDIUM}
  text="Click me"
  onClick={() => console.log('Button clicked!')}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        buttonType: {
            control: 'select',
            options: Object.values(ButtonType),
            description:
                'Visual style variant that determines the semantic meaning and appearance of the button',
            table: {
                type: { summary: 'ButtonType' },
                defaultValue: { summary: 'PRIMARY' },
                category: 'Appearance',
            },
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSize),
            description:
                'Size of the button affecting padding, font size, and icon size. Responsive sizing available via design tokens.',
            table: {
                type: { summary: 'ButtonSize' },
                defaultValue: { summary: 'MEDIUM' },
                category: 'Appearance',
            },
        },
        subType: {
            control: 'select',
            options: Object.values(ButtonSubType),
            description:
                'Button variant for specialized use cases. ICON_ONLY for compact icon buttons, INLINE for text-flow buttons.',
            table: {
                type: { summary: 'ButtonSubType' },
                defaultValue: { summary: 'DEFAULT' },
                category: 'Appearance',
            },
        },
        text: {
            control: 'text',
            description:
                'Text label displayed in the button. Required for accessibility unless using aria-label. Hidden when loading=true.',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        leadingIcon: {
            control: 'select',
            options: [
                'none',
                'plus',
                'download',
                'settings',
                'heart',
                'star',
                'search',
                'edit',
            ],
            description:
                'Icon element to display before the button text. Accepts any React element, typically from lucide-react or similar icon libraries.',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Content',
            },
        },
        trailingIcon: {
            control: 'select',
            options: [
                'none',
                'plus',
                'download',
                'settings',
                'heart',
                'star',
                'search',
                'edit',
            ],
            description:
                'Icon element to display after the button text. Useful for dropdown indicators or directional cues.',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Content',
            },
        },
        loading: {
            control: 'boolean',
            description:
                'Shows loading spinner and disables interaction. Text and icons are hidden during loading state.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        disabled: {
            control: 'boolean',
            description:
                'Disables the button, preventing interaction and applying disabled styling. Automatically sets aria-disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        state: {
            control: 'select',
            options: Object.values(ButtonState),
            description:
                'Manual control of visual state. Typically managed automatically by user interaction.',
            table: {
                type: { summary: 'ButtonState' },
                defaultValue: { summary: 'DEFAULT' },
                category: 'State',
            },
        },
        fullWidth: {
            control: 'boolean',
            description:
                'Makes the button take 100% width of its container. Useful for mobile layouts and form actions.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Layout',
            },
        },
        width: {
            control: 'text',
            description:
                'Custom width value (e.g., "200px", "50%"). Overrides fullWidth when set.',
            table: {
                type: { summary: 'string' },
                category: 'Layout',
            },
        },
        justifyContent: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'space-between'],
            description:
                'Horizontal alignment of content within the button. Useful for full-width buttons.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' },
                category: 'Layout',
            },
        },
        buttonGroupPosition: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description:
                'Position in ButtonGroup for border radius adjustment. Automatically set by ButtonGroup component.',
            table: {
                type: { summary: "'left' | 'center' | 'right'" },
                category: 'Layout',
            },
        },
        onClick: {
            action: 'clicked',
            description:
                'Click event handler. Not called when disabled=true or loading=true.',
            table: {
                type: { summary: '(event: MouseEvent) => void' },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

// Helper function to render icons based on control selection
const getIcon = (iconType: string) => {
    switch (iconType) {
        case 'plus':
            return <Plus size={16} />
        case 'download':
            return <Download size={16} />
        case 'settings':
            return <Settings size={16} />
        case 'heart':
            return <Heart size={16} />
        case 'star':
            return <Star size={16} />
        case 'search':
            return <Search size={16} />
        case 'edit':
            return <Edit size={16} />
        case 'none':
        default:
            return undefined
    }
}

// Default story
export const Default: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        subType: ButtonSubType.DEFAULT,
        text: 'Button',
        loading: false,
        disabled: false,
        fullWidth: false,
        state: ButtonState.DEFAULT,
        leadingIcon: 'none',
        trailingIcon: 'none',
    },
    render: (args: any) => (
        <Button
            {...args}
            leadingIcon={getIcon(args.leadingIcon)}
            trailingIcon={getIcon(args.trailingIcon)}
        />
    ),
}

// Button types
export const ButtonTypes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.SECONDARY} text="Secondary" />
            <Button buttonType={ButtonType.DANGER} text="Danger" />
            <Button buttonType={ButtonType.SUCCESS} text="Success" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different button types for various use cases and semantic meanings.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'button-name', enabled: true },
                ],
            },
        },
    },
}

// Button sizes
export const ButtonSizes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button size={ButtonSize.SMALL} text="Small" />
            <Button size={ButtonSize.MEDIUM} text="Medium" />
            <Button size={ButtonSize.LARGE} text="Large" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different button sizes to fit various contexts and layouts.',
            },
        },
    },
}

// Button sub-types
export const ButtonSubTypes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button subType={ButtonSubType.DEFAULT} text="Default" />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Settings size={16} />}
                text="Icon Only"
            />
            <Button subType={ButtonSubType.INLINE} text="Inline" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different button sub-types including default, icon-only, and inline variants.',
            },
        },
    },
}

// With icons
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button
                text="Add Item"
                leadingIcon={<Plus size={16} />}
                buttonType={ButtonType.PRIMARY}
            />
            <Button
                text="Download"
                leadingIcon={<Download size={16} />}
                buttonType={ButtonType.SECONDARY}
            />
            <Button
                text="Settings"
                trailingIcon={<Settings size={16} />}
                buttonType={ButtonType.SECONDARY}
            />
            <Button
                text="Favorite"
                leadingIcon={<Heart size={16} />}
                trailingIcon={<Star size={16} />}
                buttonType={ButtonType.SUCCESS}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Buttons with leading and trailing icons for enhanced visual communication.',
            },
        },
    },
}

// Icon only buttons
export const IconOnly: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Plus size={16} />}
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
            />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Search size={16} />}
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
            />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Edit size={16} />}
                buttonType={ButtonType.SUCCESS}
                size={ButtonSize.LARGE}
            />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Trash2 size={16} />}
                buttonType={ButtonType.DANGER}
                size={ButtonSize.MEDIUM}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Icon-only buttons for compact interfaces. Perfect for toolbars and action bars.',
            },
        },
    },
}

// Inline buttons
export const InlineButtons: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <span>This is some text with </span>
            <Button
                subType={ButtonSubType.INLINE}
                text="inline button"
                buttonType={ButtonType.PRIMARY}
            />
            <span> and </span>
            <Button
                subType={ButtonSubType.INLINE}
                text="another one"
                buttonType={ButtonType.SECONDARY}
            />
            <span> in the flow.</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Inline buttons that blend seamlessly with text content.',
            },
        },
    },
}

// Button states
export const ButtonStates: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button text="Normal" buttonType={ButtonType.PRIMARY} />
            <Button
                text="Loading"
                buttonType={ButtonType.PRIMARY}
                loading={true}
            />
            <Button
                text="Disabled"
                buttonType={ButtonType.PRIMARY}
                disabled={true}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different button states including normal, loading, and disabled.',
            },
        },
    },
}

// Full width buttons
export const FullWidth: Story = {
    render: () => (
        <div
            style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Button
                text="Full Width Primary"
                buttonType={ButtonType.PRIMARY}
                fullWidth={true}
            />
            <Button
                text="Full Width Secondary"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
            />
            <Button
                text="Full Width with Icon"
                buttonType={ButtonType.SUCCESS}
                leadingIcon={<Plus size={16} />}
                fullWidth={true}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Full-width buttons that take up the entire available width of their container.',
            },
        },
    },
}

// Button group positioning
export const ButtonGroupPositioning: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Button Group
                </h4>
                <div style={{ display: 'flex' }}>
                    <Button
                        text="Left"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="left"
                    />
                    <Button
                        text="Center"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="center"
                    />
                    <Button
                        text="Right"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="right"
                    />
                </div>
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Primary Group
                </h4>
                <div style={{ display: 'flex' }}>
                    <Button
                        text="Save"
                        buttonType={ButtonType.PRIMARY}
                        buttonGroupPosition="left"
                    />
                    <Button
                        text="Save & Continue"
                        buttonType={ButtonType.PRIMARY}
                        buttonGroupPosition="right"
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Manual usage of buttonGroupPosition prop on individual buttons. For automatic positioning, use the ButtonGroup component instead.',
            },
        },
    },
}

// Content alignment
export const ContentAlignment: Story = {
    render: () => (
        <div
            style={{
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Button
                text="Left Aligned"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
                justifyContent="flex-start"
            />
            <Button
                text="Center Aligned"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
                justifyContent="center"
            />
            <Button
                text="Right Aligned"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
                justifyContent="flex-end"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different content alignment options within the button.',
            },
        },
    },
}

// Loading state
export const Loading: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        text: 'Loading Button',
        loading: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Button in loading state. Shows a spinner and hides the text and icons.',
            },
        },
    },
}

// Disabled state
export const Disabled: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        text: 'Disabled Button',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Button in disabled state. Click events are prevented and visual styling indicates the disabled state.',
            },
        },
    },
}

// Comprehensive showcase
export const Showcase: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '16px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Button Types
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button buttonType={ButtonType.PRIMARY} text="Primary" />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Secondary"
                    />
                    <Button buttonType={ButtonType.DANGER} text="Danger" />
                    <Button buttonType={ButtonType.SUCCESS} text="Success" />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    With Icons
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Add"
                        leadingIcon={<Plus size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Download"
                        trailingIcon={<Download size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    States
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button text="Normal" buttonType={ButtonType.PRIMARY} />
                    <Button
                        text="Loading"
                        buttonType={ButtonType.PRIMARY}
                        loading={true}
                    />
                    <Button
                        text="Disabled"
                        buttonType={ButtonType.PRIMARY}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive showcase of Button capabilities and variations.',
            },
        },
    },
}

// Interactive playground
export const Interactive: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        subType: ButtonSubType.DEFAULT,
        text: 'Interactive Button',
        loading: false,
        disabled: false,
        fullWidth: false,
        state: ButtonState.DEFAULT,
        leadingIcon: 'plus',
        trailingIcon: 'none',
        justifyContent: 'center',
    },
    render: (args: any) => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Button
                {...args}
                leadingIcon={getIcon(args.leadingIcon)}
                trailingIcon={getIcon(args.trailingIcon)}
            />
            <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                Use the controls below to experiment with different button
                configurations
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Button props using the controls panel.',
            },
        },
    },
}

// Accessibility demonstration
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
                    Use Tab to navigate between buttons, Enter or Space to
                    activate. Disabled buttons are skipped in tab order.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Focusable Button 1"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Focusable Button 2"
                    />
                    <Button
                        buttonType={ButtonType.SUCCESS}
                        text="Focusable Button 3"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Disabled (Skipped)"
                        disabled={true}
                    />
                    <Button
                        buttonType={ButtonType.DANGER}
                        text="Focusable Button 4"
                    />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Color Contrast
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    All button variants meet WCAG 2.1 Level AA contrast
                    requirements (4.5:1 for normal text, 3:1 for large text).
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button buttonType={ButtonType.PRIMARY} text="Primary" />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Secondary"
                    />
                    <Button buttonType={ButtonType.DANGER} text="Danger" />
                    <Button buttonType={ButtonType.SUCCESS} text="Success" />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    State Communication
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Loading and disabled states are communicated via
                    aria-disabled and aria-busy attributes for screen readers.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Normal State"
                    />
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Loading State"
                        loading={true}
                    />
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Disabled State"
                        disabled={true}
                    />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Icon-Only Buttons
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Icon-only buttons include text prop for screen reader
                    accessibility, even though the text is visually hidden.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Plus size={16} />}
                        buttonType={ButtonType.PRIMARY}
                        text="Add Item"
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Search size={16} />}
                        buttonType={ButtonType.SECONDARY}
                        text="Search"
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.SECONDARY}
                        text="Settings"
                    />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Focus Indicators
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    All buttons have visible focus indicators for keyboard
                    navigation. Click a button then press Tab to see the focus
                    ring.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Tab to Focus"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Next Focus"
                    />
                    <Button
                        buttonType={ButtonType.SUCCESS}
                        leadingIcon={<Star size={16} />}
                        text="With Icon"
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility demonstration showing keyboard navigation, color contrast, state communication, and focus indicators. All features comply with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'button-name', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'aria-required-attr', enabled: true },
                    { id: 'focus-order-semantics', enabled: true },
                ],
            },
        },
    },
}
