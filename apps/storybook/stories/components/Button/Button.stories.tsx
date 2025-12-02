import type { Meta, StoryObj } from '@storybook/react'
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
} from 'lucide-react'

// Figma Code Connect is now in a separate file: Button.figma.tsx

const meta: Meta<typeof Button> = {
    title: 'Components/Button/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: true,
                    },
                    {
                        id: 'button-name',
                        enabled: true,
                    },
                    {
                        id: 'keyboard-navigation',
                        enabled: true,
                    },
                ],
            },
        },
        chromatic: {
            viewports: [375, 768, 1200],
            delay: 300,
        },
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

## Accessibility

This component follows WCAG 2.1 Level AAA standards:
- ✅ Keyboard navigable (Tab, Enter, Space)
- ✅ Proper ARIA attributes
- ✅ Color contrast ratios meet WCAG AAA standards
- ✅ Screen reader compatible
- ✅ Focus indicators visible

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
            description: 'The visual style of the button',
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSize),
            description: 'The size of the button',
        },
        subType: {
            control: 'select',
            options: Object.values(ButtonSubType),
            description: 'Button subtype for special variants',
        },
        text: {
            control: 'text',
            description: 'The text content of the button',
        },
        loading: {
            control: 'boolean',
            description: 'Shows loading state',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Makes the button take full width',
        },
        buttonGroupPosition: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description:
                'Position in button group for border radius adjustment',
        },
        justifyContent: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'space-between'],
            description: 'Content alignment within the button',
        },
        state: {
            control: 'select',
            options: Object.values(ButtonState),
            description: 'Visual state of the button',
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
            description: 'Icon to display before the button text',
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
            description: 'Icon to display after the button text',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler function',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

// Helper function to render icons based on control selection
const getIcon = (iconType: string): React.ReactNode => {
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
            return null
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
    render: (args: any) => {
        const { leadingIcon, trailingIcon, ...restArgs } = args
        return (
            <Button
                {...restArgs}
                leadingIcon={getIcon(leadingIcon)}
                trailingIcon={getIcon(trailingIcon)}
            />
        )
    },
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
    render: (args: any) => {
        const { leadingIcon, trailingIcon, ...restArgs } = args
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Button
                    {...restArgs}
                    leadingIcon={getIcon(leadingIcon)}
                    trailingIcon={getIcon(trailingIcon)}
                />
                <div
                    style={{
                        marginTop: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Use the controls below to experiment with different button
                    configurations
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Button props using the controls panel.',
            },
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
                maxWidth: '600px',
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
                    Keyboard Navigation
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    All buttons are keyboard accessible. Use Tab to navigate,
                    Enter or Space to activate.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Tab to focus"
                        buttonType={ButtonType.PRIMARY}
                        onClick={() => alert('Button activated via keyboard!')}
                    />
                    <Button
                        text="Press Enter"
                        buttonType={ButtonType.SECONDARY}
                        onClick={() => alert('Button activated!')}
                    />
                    <Button
                        text="Press Space"
                        buttonType={ButtonType.SUCCESS}
                        onClick={() => alert('Button activated!')}
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
                    Icon-Only Buttons with Accessible Labels
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Icon-only buttons include proper ARIA labels for screen
                    readers.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.PRIMARY}
                        aria-label="Settings"
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Search size={16} />}
                        buttonType={ButtonType.SECONDARY}
                        aria-label="Search"
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Edit size={16} />}
                        buttonType={ButtonType.SUCCESS}
                        aria-label="Edit"
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
                    Disabled State Accessibility
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Disabled buttons are properly announced to screen readers
                    and cannot be activated via keyboard.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Disabled Button"
                        buttonType={ButtonType.PRIMARY}
                        disabled={true}
                    />
                    <Button
                        text="Disabled Secondary"
                        buttonType={ButtonType.SECONDARY}
                        disabled={true}
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
                    Focus Indicators
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    All buttons have visible focus indicators that meet WCAG AAA
                    contrast requirements.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button text="Focus me" buttonType={ButtonType.PRIMARY} />
                    <Button text="Focus me" buttonType={ButtonType.SECONDARY} />
                    <Button text="Focus me" buttonType={ButtonType.DANGER} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accessibility testing examples demonstrating keyboard navigation, ARIA labels, disabled states, and focus indicators. Use the Accessibility panel in Storybook to run automated a11y checks.',
            },
        },
        // Enhanced accessibility testing for this story
        a11y: {
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: true,
                    },
                    {
                        id: 'button-name',
                        enabled: true,
                    },
                    {
                        id: 'keyboard-navigation',
                        enabled: true,
                    },
                    {
                        id: 'aria-required-attributes',
                        enabled: true,
                    },
                    {
                        id: 'aria-hidden-focus',
                        enabled: true,
                    },
                ],
            },
        },
        chromatic: {
            viewports: [375, 768, 1200],
            delay: 500,
        },
    },
}
