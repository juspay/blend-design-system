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
    ButtonSize,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { X } from 'lucide-react'

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A versatile drawer component that slides in from any direction (top, bottom, left, right) with support for modal overlays, snap points, and comprehensive accessibility features.

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
            <Button buttonType={ButtonType.PRIMARY} text="Confirm" />
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
            <div style={{ padding: '20px' }}>
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
                                <p style={{ marginBottom: '16px' }}>
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
            <div style={{ padding: '20px' }}>
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
            <div style={{ padding: '20px' }}>
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
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating keyboard navigation, screen reader support,
 * focus management, and proper ARIA attributes across various drawer configurations.
 */
export const Accessibility: Story = {
    render: () => {
        const AccessibilityComponent = () => {
            const [open1, setOpen1] = useState(false)
            const [open2, setOpen2] = useState(false)
            const [open3, setOpen3] = useState(false)

            return (
                <div style={{ padding: '32px', maxWidth: '1200px' }}>
                    <h1
                        style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: '#1e293b',
                            marginBottom: '24px',
                        }}
                    >
                        Drawer Component Accessibility Showcase
                    </h1>
                    <p
                        style={{
                            fontSize: '16px',
                            color: '#475569',
                            lineHeight: '1.6',
                            marginBottom: '32px',
                        }}
                    >
                        Interactive examples demonstrating the Drawer
                        component's accessibility features including keyboard
                        navigation, screen reader support, proper ARIA
                        attributes, and focus management across various
                        configurations.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '24px',
                            marginBottom: '32px',
                        }}
                    >
                        {/* Example 1: Basic Drawer */}
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                }}
                            >
                                Basic Drawer
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#475569',
                                    marginBottom: '16px',
                                }}
                            >
                                Demonstrates standard drawer with header, body,
                                and footer sections.
                            </p>
                            <Drawer open={open1} onOpenChange={setOpen1}>
                                <DrawerTrigger>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Basic Drawer"
                                    />
                                </DrawerTrigger>
                                <DrawerPortal>
                                    <DrawerOverlay />
                                    <DrawerContent aria-label="Basic drawer example">
                                        <DrawerHeader>
                                            <DrawerTitle id="drawer-title-1">
                                                Basic Drawer Example
                                            </DrawerTitle>
                                            <DrawerDescription id="drawer-desc-1">
                                                This drawer demonstrates basic
                                                accessibility features including
                                                proper ARIA attributes and
                                                keyboard navigation.
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <p style={{ marginBottom: '16px' }}>
                                                <strong>
                                                    Keyboard Navigation:
                                                </strong>
                                            </p>
                                            <ul
                                                style={{
                                                    marginLeft: '20px',
                                                    marginBottom: '16px',
                                                }}
                                            >
                                                <li>
                                                    <strong>Tab</strong>:
                                                    Navigate between interactive
                                                    elements
                                                </li>
                                                <li>
                                                    <strong>Escape</strong>:
                                                    Close the drawer
                                                </li>
                                                <li>
                                                    <strong>Enter/Space</strong>
                                                    : Activate buttons
                                                </li>
                                            </ul>
                                            <p>
                                                Focus is trapped within the
                                                drawer when open and returns to
                                                the trigger when closed.
                                            </p>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            <DrawerClose asChild>
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
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

                        {/* Example 2: Right Drawer */}
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                }}
                            >
                                Right Drawer
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#475569',
                                    marginBottom: '16px',
                                }}
                            >
                                Demonstrates drawer sliding in from the right
                                side.
                            </p>
                            <Drawer
                                open={open2}
                                onOpenChange={setOpen2}
                                direction="right"
                            >
                                <DrawerTrigger>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Right Drawer"
                                    />
                                </DrawerTrigger>
                                <DrawerPortal>
                                    <DrawerOverlay />
                                    <DrawerContent
                                        direction="right"
                                        width={400}
                                        aria-label="Right drawer example"
                                    >
                                        <DrawerHeader>
                                            <DrawerTitle id="drawer-title-2">
                                                Right Drawer Example
                                            </DrawerTitle>
                                            <DrawerDescription id="drawer-desc-2">
                                                This drawer slides in from the
                                                right side and maintains all
                                                accessibility features.
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <p>
                                                Right drawers are commonly used
                                                for side panels, filters, or
                                                additional content.
                                            </p>
                                        </DrawerBody>
                                        <DrawerFooter direction="right">
                                            <DrawerClose asChild>
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    text="Close"
                                                />
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </DrawerPortal>
                            </Drawer>
                        </div>

                        {/* Example 3: Drawer with Custom Close Button */}
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                }}
                            >
                                Custom Close Button
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#475569',
                                    marginBottom: '16px',
                                }}
                            >
                                Demonstrates drawer with custom close button in
                                header.
                            </p>
                            <Drawer open={open3} onOpenChange={setOpen3}>
                                <DrawerTrigger>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open with Custom Close"
                                    />
                                </DrawerTrigger>
                                <DrawerPortal>
                                    <DrawerOverlay />
                                    <DrawerContent aria-label="Drawer with custom close button">
                                        <DrawerHeader>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'flex-start',
                                                }}
                                            >
                                                <div>
                                                    <DrawerTitle id="drawer-title-3">
                                                        Custom Close Button
                                                    </DrawerTitle>
                                                    <DrawerDescription id="drawer-desc-3">
                                                        This drawer includes a
                                                        custom close button in
                                                        the header.
                                                    </DrawerDescription>
                                                </div>
                                                <DrawerClose asChild>
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                        leadingIcon={
                                                            <X
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        }
                                                        aria-label="Close drawer"
                                                    />
                                                </DrawerClose>
                                            </div>
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <p>
                                                The close button is properly
                                                labeled with aria-label for
                                                screen readers.
                                            </p>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            <Button
                                                buttonType={ButtonType.PRIMARY}
                                                text="Save"
                                            />
                                        </DrawerFooter>
                                    </DrawerContent>
                                </DrawerPortal>
                            </Drawer>
                        </div>
                    </div>

                    {/* Accessibility Features Documentation */}
                    <section
                        style={{
                            marginTop: '48px',
                            padding: '24px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#f9fafb',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '20px',
                                fontWeight: 600,
                                marginBottom: '20px',
                                color: '#1e293b',
                            }}
                        >
                            Accessibility Features
                        </h2>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '24px',
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Keyboard Navigation
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>2.1.1 Keyboard (Level A)</strong>:
                                    All functionality is keyboard accessible.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        <strong>Tab</strong>: Navigate between
                                        interactive elements
                                    </li>
                                    <li>
                                        <strong>Shift+Tab</strong>: Navigate
                                        backwards
                                    </li>
                                    <li>
                                        <strong>Escape</strong>: Close the
                                        drawer
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Activate
                                        buttons
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Focus Management
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>
                                        2.4.7 Focus Visible (Level AA)
                                    </strong>
                                    : Focus indicators are visible and properly
                                    managed.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>Focus trap when drawer is open</li>
                                    <li>
                                        Focus returns to trigger when drawer
                                        closes
                                    </li>
                                    <li>
                                        Visible focus rings on all interactive
                                        elements
                                    </li>
                                    <li>Logical tab order maintained</li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Screen Reader Support
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>
                                        4.1.2 Name, Role, Value (Level A)
                                    </strong>
                                    : All elements have programmatically
                                    determinable names, roles, and values.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        Dialog role with aria-modal attribute
                                    </li>
                                    <li>
                                        Accessible title via aria-labelledby
                                    </li>
                                    <li>
                                        Accessible description via
                                        aria-describedby
                                    </li>
                                    <li>
                                        State changes announced to screen
                                        readers
                                    </li>
                                    <li>
                                        Decorative icons marked with
                                        aria-hidden="true"
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Semantic Structure
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>
                                        1.3.1 Info and Relationships (Level A)
                                    </strong>
                                    : Information structure is programmatically
                                    determinable.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        Proper heading hierarchy (h2 for title)
                                    </li>
                                    <li>
                                        Semantic HTML structure (header, body,
                                        footer)
                                    </li>
                                    <li>
                                        ARIA landmarks and regions properly
                                        labeled
                                    </li>
                                    <li>
                                        Logical content structure maintained
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Verification Steps */}
                    <section
                        style={{
                            marginTop: '32px',
                            padding: '24px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '20px',
                                fontWeight: 600,
                                marginBottom: '16px',
                                color: '#1e293b',
                            }}
                        >
                            Accessibility Verification
                        </h2>
                        <p
                            style={{
                                color: '#6b7280',
                                fontSize: '14px',
                                marginBottom: '16px',
                            }}
                        >
                            To verify the accessibility of the Drawer component,
                            follow these steps:
                        </p>
                        <ol
                            style={{
                                margin: 0,
                                paddingLeft: '20px',
                                color: '#475569',
                                fontSize: '14px',
                            }}
                        >
                            <li style={{ marginBottom: '12px' }}>
                                <strong>Storybook a11y addon</strong>:
                                <ul
                                    style={{
                                        margin: '4px 0 0 0',
                                        paddingLeft: '20px',
                                        listStyleType: 'disc',
                                    }}
                                >
                                    <li>
                                        Open the Accessibility panel in
                                        Storybook and verify there are no
                                        violations for these scenarios.
                                    </li>
                                    <li>
                                        Pay special attention to dialog roles,
                                        ARIA labels, and keyboard accessibility.
                                    </li>
                                </ul>
                            </li>
                            <li style={{ marginBottom: '12px' }}>
                                <strong>Chromatic visual tests</strong>:
                                <ul
                                    style={{
                                        margin: '4px 0 0 0',
                                        paddingLeft: '20px',
                                        listStyleType: 'disc',
                                    }}
                                >
                                    <li>
                                        Run Chromatic visual tests to ensure
                                        focus ring visibility on interactive
                                        elements.
                                    </li>
                                    <li>
                                        Verify hover/active states and
                                        responsive behavior.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Manual testing</strong>:
                                <ul
                                    style={{
                                        margin: '4px 0 0 0',
                                        paddingLeft: '20px',
                                        listStyleType: 'disc',
                                    }}
                                >
                                    <li>
                                        Navigate using keyboard only (
                                        <code>Tab</code> to focus,{' '}
                                        <code>Enter</code> to activate,{' '}
                                        <code>Escape</code> to close)
                                    </li>
                                    <li>
                                        Test with screen reader (VoiceOver on
                                        macOS or NVDA on Windows)
                                    </li>
                                    <li>
                                        Verify focus trap when drawer is open
                                    </li>
                                    <li>
                                        Verify focus returns to trigger when
                                        drawer closes
                                    </li>
                                    <li>
                                        Check color contrast ratios using WebAIM
                                        Contrast Checker
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                </div>
            )
        }

        return <AccessibilityComponent />
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive examples demonstrating the Drawer component's accessibility features including keyboard navigation, screen reader support, proper ARIA attributes, and focus management across various configurations.
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('interactive'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
