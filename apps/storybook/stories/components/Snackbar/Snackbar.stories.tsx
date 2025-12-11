import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Snackbar,
    addSnackbar,
    SnackbarVariant,
} from '@juspay/blend-design-system'
import { Button } from '@juspay/blend-design-system'
import {
    Info,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Trash2,
    Download,
    X,
    Layers,
    Save,
    WifiOff,
    Copy,
    Clock,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Snackbar> = {
    title: 'Components/Snackbar',
    component: Snackbar,
    parameters: {
        layout: 'fullscreen',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A toast notification component for displaying temporary messages, alerts, and feedback to users with various styles and optional actions.

## Features
- Multiple variants (Info, Success, Warning, Error)
- Optional action button
- Dismissible with close button
- Auto-dismiss functionality
- Customizable header and description
- Smooth animations
- Stacked notifications support
- Configurable duration

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Proper ARIA roles (role="alert" for error/warning, role="status" for info/success)
- Semantic HTML structure with aria-labelledby and aria-describedby relationships
- Keyboard accessible (Tab, Enter, Space)
- Screen reader support (VoiceOver/NVDA)
- Decorative icons marked with aria-hidden="true"
- Accessible button names (aria-label)
- Good color contrast for text (Level AA)
- Focus visible indicators for keyboard navigation

**Level AAA Compliance**: ⚠️ Partial (6 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Interactive elements (close button, action button) may not meet 44x44px minimum
- ℹ️ **Not Applicable**: 3.3.6 Error Prevention (All) - application-dependent

**Touch Target Sizes**:
- Close button: ~32px (meets AA 24px, does not meet AAA 44px)
- Action button: ~32px (meets AA 24px, does not meet AAA 44px)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Snackbar.accessibility\` (40+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Snackbar, addSnackbar, SnackbarVariant } from '@juspay/blend-design-system';

// First, add the Snackbar component to your app root
<Snackbar />

// Then trigger snackbars from anywhere
addSnackbar({
  header: "Success!",
  description: "Your changes have been saved.",
  variant: SnackbarVariant.SUCCESS,
  actionButton: {
    label: "Undo",
    onClick: () => console.log('Undo clicked'),
    autoDismiss: true
  },
  duration: 5000,
  onClose: () => console.log('Snackbar closed')
});
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        position: {
            control: { type: 'select' },
            options: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'top-center',
                'bottom-center',
            ],
            description: 'Position where snackbars appear on the screen',
            table: {
                type: { summary: 'SnackbarPosition' },
                category: 'Layout',
            },
        },
        dismissOnClickAway: {
            control: { type: 'boolean' },
            description:
                'When true, clicking outside snackbars will dismiss all snackbars. When false, snackbars will not dismiss on click away.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
    },
    decorators: [
        (Story, context) => (
            <>
                <Snackbar
                    position={context.args.position}
                    dismissOnClickAway={context.args.dismissOnClickAway}
                />
                <div
                    style={{
                        height: 'auto',
                        minHeight: '250px',
                        overflow: 'hidden',
                    }}
                >
                    <Story />
                </div>
            </>
        ),
    ],
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Snackbar>

export const Default: Story = {
    render: () => (
        <div style={{ position: 'relative' }}>
            <Button
                text="Show Default Snackbar"
                onClick={() =>
                    addSnackbar({
                        header: 'Default Snackbar',
                        description: 'This is a default snackbar notification.',
                        variant: SnackbarVariant.INFO,
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Basic snackbar notification with default settings.',
            },
        },
    },
}

export const SnackbarVariants: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, min-content)',
                gap: '16px',
                alignContent: 'start',
            }}
        >
            <Button
                text="Show Info Snackbar"
                leadingIcon={<Info />}
                onClick={() =>
                    addSnackbar({
                        header: 'Info Notification',
                        description: 'This is an informational message.',
                        variant: SnackbarVariant.INFO,
                    })
                }
            />
            <Button
                text="Show Success Snackbar"
                leadingIcon={<CheckCircle />}
                onClick={() =>
                    addSnackbar({
                        header: 'Success!',
                        description: 'Your action completed successfully.',
                        variant: SnackbarVariant.SUCCESS,
                    })
                }
            />
            <Button
                text="Show Warning Snackbar"
                leadingIcon={<AlertTriangle />}
                onClick={() =>
                    addSnackbar({
                        header: 'Warning',
                        description:
                            'Please review this important information.',
                        variant: SnackbarVariant.WARNING,
                    })
                }
            />
            <Button
                text="Show Error Snackbar"
                leadingIcon={<XCircle />}
                onClick={() =>
                    addSnackbar({
                        header: 'Error',
                        description: 'Something went wrong. Please try again.',
                        variant: SnackbarVariant.ERROR,
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different snackbar variants for various message types and contexts. Each variant uses appropriate ARIA roles: role="status" for info/success, role="alert" for warning/error.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}
export const WithActionButton: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                alignContent: 'start',
            }}
        >
            <Button
                text="Show Delete with Undo"
                leadingIcon={<Trash2 />}
                onClick={() =>
                    addSnackbar({
                        header: 'File Deleted',
                        description: 'The file has been moved to trash.',
                        variant: SnackbarVariant.INFO,
                        actionButton: {
                            label: 'Undo',
                            onClick: () => {
                                console.log('Undo clicked')
                                addSnackbar({
                                    header: 'Restored',
                                    description: 'File has been restored.',
                                    variant: SnackbarVariant.SUCCESS,
                                })
                            },
                        },
                    })
                }
            />
            <Button
                text="Show Update Notification"
                leadingIcon={<Download />}
                onClick={() =>
                    addSnackbar({
                        header: 'Update Available',
                        description: 'A new version is ready to install.',
                        variant: SnackbarVariant.SUCCESS,
                        actionButton: {
                            label: 'Install Now',
                            onClick: () => {
                                console.log('Install clicked')
                                addSnackbar({
                                    header: 'Installing...',
                                    description:
                                        'The update is being installed.',
                                    variant: SnackbarVariant.INFO,
                                })
                            },
                        },
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Snackbars with action buttons for user interaction. Action buttons are keyboard accessible and have proper aria-label attributes.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// States & Behavior
// ============================================================================

/**
 * Snackbar with custom close callback
 */
export const WithCloseCallback: Story = {
    render: () => (
        <div style={{ position: 'relative' }}>
            <Button
                text="Show with Close Tracking"
                leadingIcon={<X />}
                onClick={() =>
                    addSnackbar({
                        header: 'Tracking Close Event',
                        description:
                            'Check console when closing this snackbar.',
                        variant: SnackbarVariant.INFO,
                        onClose: () => {
                            console.log('Snackbar was closed')
                            // You could track analytics or perform cleanup here
                        },
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Snackbar with custom close callback for tracking or cleanup operations. Close button is keyboard accessible (Tab, Enter, Space).',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Multiple stacked snackbars
 */
export const MultipleSnackbars: Story = {
    render: () => (
        <div style={{ position: 'relative' }}>
            <Button
                text="Show Multiple Stacked"
                leadingIcon={<Layers />}
                onClick={() => {
                    addSnackbar({
                        header: 'First Notification',
                        description: 'This is the first snackbar.',
                        variant: SnackbarVariant.INFO,
                    })
                    setTimeout(() => {
                        addSnackbar({
                            header: 'Second Notification',
                            description: 'This is the second snackbar.',
                            variant: SnackbarVariant.SUCCESS,
                        })
                    }, 500)
                    setTimeout(() => {
                        addSnackbar({
                            header: 'Third Notification',
                            description: 'This is the third snackbar.',
                            variant: SnackbarVariant.WARNING,
                        })
                    }, 1000)
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Multiple snackbars can be stacked and displayed simultaneously. Each snackbar maintains proper ARIA roles and keyboard accessibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Header-only snackbars (without description)
 */
export const HeaderOnly: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                alignContent: 'start',
            }}
        >
            <Button
                text="Show Quick Copy"
                leadingIcon={<Copy />}
                onClick={() =>
                    addSnackbar({
                        header: 'Copied!',
                        variant: SnackbarVariant.SUCCESS,
                    })
                }
            />
            <Button
                text="Show Processing"
                leadingIcon={<Info />}
                onClick={() =>
                    addSnackbar({
                        header: 'Processing...',
                        variant: SnackbarVariant.INFO,
                    })
                }
            />
            <Button
                text="Show Quick Error"
                leadingIcon={<XCircle />}
                onClick={() =>
                    addSnackbar({
                        header: 'Failed to load',
                        variant: SnackbarVariant.ERROR,
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Snackbars can display just a header for brief notifications. Still maintains proper ARIA roles and accessibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Custom duration snackbar
 */
export const CustomDurationToast: Story = {
    render: () => (
        <div style={{ position: 'relative' }}>
            <Button
                text="Show Snackbar with duration 15000"
                onClick={() =>
                    addSnackbar({
                        header: 'Custom duration Snackbar',
                        description:
                            'This snackbar will stay visible for 15 seconds',
                        duration: 15000, // duration in ms, defaults to 4000
                        variant: SnackbarVariant.INFO,
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Snackbar with custom duration - this example shows for 15 seconds instead of the default 4 seconds. Configurable duration supports WCAG 2.2.3 No Timing (AAA).',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Action button autoDismiss behavior
 */
export const ActionButtonBehavior: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                alignContent: 'start',
            }}
        >
            <Button
                text="Action with Auto-Dismiss"
                onClick={() =>
                    addSnackbar({
                        header: 'Auto-Dismiss Action',
                        description:
                            'This snackbar will close when action is clicked',
                        variant: SnackbarVariant.INFO,
                        actionButton: {
                            label: 'Confirm',
                            onClick: () => {
                                console.log(
                                    'Action clicked - snackbar will auto-dismiss'
                                )
                            },
                            autoDismiss: true, // Default behavior
                        },
                    })
                }
            />
            <Button
                text="Action without Auto-Dismiss"
                onClick={() =>
                    addSnackbar({
                        header: 'Persistent Action',
                        description:
                            'This snackbar stays open after action is clicked',
                        variant: SnackbarVariant.WARNING,
                        actionButton: {
                            label: 'Keep Open',
                            onClick: () => {
                                console.log(
                                    'Action clicked - snackbar remains open'
                                )
                                addSnackbar({
                                    header: 'Action Executed',
                                    description:
                                        'Previous snackbar is still visible',
                                    variant: SnackbarVariant.SUCCESS,
                                })
                            },
                            autoDismiss: false, // Prevents auto-dismiss
                        },
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the autoDismiss property of action buttons - controls whether the snackbar closes when the action is clicked. Both buttons are keyboard accessible.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Real-World Examples
// ============================================================================

/**
 * Common real-world use cases
 */
export const RealWorldExamples: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, min-content)',
                gap: '16px',
                alignContent: 'start',
            }}
        >
            <Button
                text="Show Save Success"
                leadingIcon={<Save />}
                onClick={() =>
                    addSnackbar({
                        header: 'Saved',
                        description:
                            'Your changes have been saved successfully.',
                        variant: SnackbarVariant.SUCCESS,
                    })
                }
            />
            <Button
                text="Show Network Error"
                leadingIcon={<WifiOff />}
                onClick={() =>
                    addSnackbar({
                        header: 'Network Error',
                        description:
                            'Unable to connect. Please check your internet connection.',
                        variant: SnackbarVariant.ERROR,
                        actionButton: {
                            label: 'Retry',
                            onClick: () => {
                                addSnackbar({
                                    header: 'Retrying...',
                                    description: 'Attempting to reconnect.',
                                    variant: SnackbarVariant.INFO,
                                })
                            },
                        },
                    })
                }
            />
            <Button
                text="Show Copy Success"
                leadingIcon={<Copy />}
                onClick={() =>
                    addSnackbar({
                        header: 'Copied to Clipboard',
                        variant: SnackbarVariant.SUCCESS,
                    })
                }
            />
            <Button
                text="Show Session Warning"
                leadingIcon={<Clock />}
                onClick={() =>
                    addSnackbar({
                        header: 'Session Expiring',
                        description: 'Your session will expire in 5 minutes.',
                        variant: SnackbarVariant.WARNING,
                        actionButton: {
                            label: 'Extend Session',
                            onClick: () => {
                                addSnackbar({
                                    header: 'Session Extended',
                                    description:
                                        'Your session has been extended by 30 minutes.',
                                    variant: SnackbarVariant.SUCCESS,
                                })
                            },
                        },
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common real-world use cases for snackbar notifications. All examples maintain proper accessibility with ARIA roles and keyboard navigation.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples
 */
export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '24px',
                maxWidth: '800px',
            }}
        >
            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Roles
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                    }}
                >
                    <Button
                        text="Info (role='status')"
                        leadingIcon={<Info />}
                        onClick={() =>
                            addSnackbar({
                                header: 'Info Notification',
                                description:
                                    'Uses role="status" for polite announcements',
                                variant: SnackbarVariant.INFO,
                            })
                        }
                    />
                    <Button
                        text="Error (role='alert')"
                        leadingIcon={<XCircle />}
                        onClick={() =>
                            addSnackbar({
                                header: 'Error Notification',
                                description:
                                    'Uses role="alert" for assertive announcements',
                                variant: SnackbarVariant.ERROR,
                            })
                        }
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                    }}
                >
                    <Button
                        text="Tab to Focus Close"
                        onClick={() =>
                            addSnackbar({
                                header: 'Keyboard Accessible',
                                description:
                                    'Tab to focus close button, press Enter/Space to close',
                                variant: SnackbarVariant.INFO,
                            })
                        }
                    />
                    <Button
                        text="Tab to Focus Action"
                        onClick={() =>
                            addSnackbar({
                                header: 'Action Button',
                                description:
                                    'Tab to focus action button, press Enter/Space',
                                variant: SnackbarVariant.SUCCESS,
                                actionButton: {
                                    label: 'Action',
                                    onClick: () => {
                                        console.log('Action clicked')
                                    },
                                },
                            })
                        }
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Screen Reader Support
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                    }}
                >
                    <Button
                        text="With Description"
                        leadingIcon={<Info />}
                        onClick={() =>
                            addSnackbar({
                                header: 'Header Text',
                                description:
                                    'Description text provides additional context',
                                variant: SnackbarVariant.INFO,
                            })
                        }
                    />
                    <Button
                        text="Header Only"
                        leadingIcon={<Info />}
                        onClick={() =>
                            addSnackbar({
                                header: 'Header Only Notification',
                                variant: SnackbarVariant.SUCCESS,
                            })
                        }
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Decorative Icons
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                    }}
                >
                    <Button
                        text="With Icon (aria-hidden)"
                        leadingIcon={<CheckCircle />}
                        onClick={() =>
                            addSnackbar({
                                header: 'Success with Icon',
                                description:
                                    'Icons are marked with aria-hidden="true"',
                                variant: SnackbarVariant.SUCCESS,
                            })
                        }
                    />
                    <Button
                        text="Error with Icon"
                        leadingIcon={<XCircle />}
                        onClick={() =>
                            addSnackbar({
                                header: 'Error with Icon',
                                description:
                                    'Decorative icons hidden from screen readers',
                                variant: SnackbarVariant.ERROR,
                            })
                        }
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Focus Indicators
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                    }}
                >
                    <Button
                        text="Show & Focus Close"
                        onClick={() =>
                            addSnackbar({
                                header: 'Focus Close Button',
                                description:
                                    'Tab to see visible focus indicator on close button',
                                variant: SnackbarVariant.INFO,
                            })
                        }
                    />
                    <Button
                        text="Show & Focus Action"
                        onClick={() =>
                            addSnackbar({
                                header: 'Focus Action Button',
                                description:
                                    'Tab to see visible focus indicator on action button',
                                variant: SnackbarVariant.SUCCESS,
                                actionButton: {
                                    label: 'Action',
                                    onClick: () => {},
                                },
                            })
                        }
                    />
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating ARIA roles, keyboard navigation, screen reader support, decorative icons, and focus indicators.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0)
   - Review passing tests (12+)
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test Snackbar.accessibility
   \`\`\`
   - 40+ automated tests
   - WCAG compliance verification
   - ARIA attribute validation

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes
   - Responsive behavior

4. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Keyboard navigation (Tab, Enter, Space)
   - Color contrast verification

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.1 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.1 Level AAA**: Partial Compliance (6/9 applicable criteria compliant)

**AAA Compliance Details**:
- ✅ Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3), No Timing (2.2.3), Interruptions (2.2.4), Change on Request (3.2.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio, Target Size (2.5.5) - Interactive elements need 44x44px
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis

**Key Accessibility Features**:
- Proper ARIA roles (role="alert" for error/warning, role="status" for info/success)
- Semantic HTML structure with aria-labelledby and aria-describedby
- Keyboard accessible (Tab, Enter, Space)
- Decorative icons marked with aria-hidden="true"
- Accessible button names (aria-label)
- Focus visible indicators
- Built on Sonner library with additional accessibility features
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
