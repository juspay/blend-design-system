import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Alert,
    AlertVariant,
    AlertStyle,
    AlertActionPlacement,
} from '@juspay/blend-design-system'
import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    Info,
    Settings,
    Keyboard,
    Eye,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `

A versatile alert component for displaying important messages, notifications, and status updates with various styles and action buttons.

## Features
- Multiple variants (Primary, Success, Warning, Error, Purple, Orange, Neutral)
- Two visual styles (Subtle, No-fill)
- Primary and secondary action buttons
- Closable alerts with onClose callback
- Custom icon support
- Flexible action placement (bottom, right)
- Responsive design
- Full accessibility support

## Accessibility

**WCAG Compliance**: 2.0, 2.1, 2.2 Level AA Compliant

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Proper ARIA roles: role="alert" for error/warning (assertive), role="status" for others (polite)
- Semantic HTML structure with h3 for heading and p for description
- Comprehensive ARIA relationships via aria-labelledby and aria-describedby
- Complete keyboard navigation support (Tab, Enter, Space)
- Visible focus indicators on all interactive elements
- Decorative content properly hidden from screen readers
- Close button has descriptive aria-label
- Unique ID generation for ARIA relationships
- Error and warning alerts announced immediately via role="alert"
- Non-error alerts announced politely via role="status"

**Key Accessibility Features**:
- ✅ ARIA Roles: role="alert" for error/warning (assertive), role="status" for others (polite)
- ✅ Semantic HTML: Uses h3 for heading and p for description
- ✅ ARIA Relationships: aria-labelledby links heading, aria-describedby links description
- ✅ Keyboard Navigation: Full keyboard support with logical tab order
- ✅ Focus Management: Visible focus indicators on all buttons
- ✅ Screen Reader Support: Proper announcements, decorative content hidden
- ✅ Status Messages: Error/warning alerts announced assertively, others politely

**Note on Level AAA**:
- Touch target sizes (44x44px for WCAG 2.5.5) are planned for future implementation
- Currently meets Level A and Level AA requirements

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Alert.accessibility\` (comprehensive tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify ARIA announcements
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Alert, AlertVariant, AlertStyle } from '@juspay/blend-design-system';

<Alert
  heading="Success!"
  description="Your changes have been saved successfully."
  variant={AlertVariant.SUCCESS}
  primaryAction={{
    label: "View Changes",
    onClick: () => console.log('View changes clicked!')
  }}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        heading: {
            control: 'text',
            description: 'The main heading text of the alert',
        },
        description: {
            control: 'text',
            description:
                'The description text providing more details about the alert',
        },
        variant: {
            control: 'select',
            options: Object.values(AlertVariant),
            description:
                'The visual variant of the alert determining its color scheme',
        },
        style: {
            control: 'select',
            options: Object.values(AlertStyle),
            description: 'The visual style of the alert',
        },
        actionPlacement: {
            control: 'select',
            options: Object.values(AlertActionPlacement),
            description: 'Placement of action buttons within the alert',
        },
        onClose: {
            action: 'closed',
            description: 'Callback function called when the alert is closed',
        },
        icon: {
            control: 'select',
            options: [
                'none',
                'checkCircle',
                'alertTriangle',
                'xCircle',
                'info',
                'settings',
            ],
            description: 'Icon to display alongside the alert heading',
        },
        primaryAction: {
            control: 'object',
            description: 'Primary action button configuration',
        },
        secondaryAction: {
            control: 'object',
            description: 'Secondary action button configuration',
        },
        maxWidth: {
            control: 'text',
            description:
                'Optional CSS max-width value to control the maximum width of the alert component. Accepts any valid CSS width value (e.g., "600px", "50%", "80ch"). Defaults to component token value if not provided.',
        },
        minWidth: {
            control: 'text',
            description:
                'Optional CSS min-width value to control the minimum width of the alert component. Accepts any valid CSS width value (e.g., "300px", "50%", "20ch"). Useful for ensuring the alert maintains a minimum readable width. Defaults to component token value if not provided.',
        },
        width: {
            control: 'text',
            description:
                'Optional CSS width value to set a fixed or specific width for the alert component. Accepts any valid CSS width value (e.g., "500px", "100%", "80ch", "fit-content"). When provided, this overrides the default width behavior. Defaults to component token value if not provided.',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Alert>

// Helper function to render icons based on control selection
const getIcon = (iconType: string) => {
    switch (iconType) {
        case 'checkCircle':
            return <CheckCircle size={16} />
        case 'alertTriangle':
            return <AlertTriangle size={16} />
        case 'xCircle':
            return <XCircle size={16} />
        case 'info':
            return <Info size={16} />
        case 'settings':
            return <Settings size={16} />
        case 'none':
        default:
            return undefined
    }
}

// Default story with interactive controls
export const Default: Story = {
    args: {
        heading: 'Alert Heading',
        description:
            'This is the alert description providing more context about the notification.',
        variant: AlertVariant.PRIMARY,
        style: AlertStyle.SUBTLE,
        actionPlacement: AlertActionPlacement.RIGHT,
        icon: 'info',
        maxWidth: '600px',
        primaryAction: {
            label: 'Primary Action',
            onClick: () => console.log('Primary action clicked'),
        },
        secondaryAction: {
            label: 'Secondary Action',
            onClick: () => console.log('Secondary action clicked'),
        },
    },
    render: (args: any) => (
        <Alert {...args} icon={getIcon(args.icon)} onClose={args.onClose} />
    ),
}

// Interactive playground
export const Interactive: Story = {
    args: {
        heading: 'Interactive Alert',
        description:
            'Use the controls below to customize this alert and see how different props affect its appearance and behavior.',
        variant: AlertVariant.SUCCESS,
        style: AlertStyle.SUBTLE,
        actionPlacement: AlertActionPlacement.RIGHT,
        icon: 'checkCircle',
        maxWidth: '600px',
        primaryAction: {
            label: 'Confirm',
            onClick: () => alert('Primary action clicked!'),
        },
        secondaryAction: {
            label: 'Cancel',
            onClick: () => alert('Secondary action clicked!'),
        },
    },
    render: (args: any) => (
        <Alert
            {...args}
            icon={getIcon(args.icon)}
            onClose={args.onClose ? () => alert('Alert closed!') : undefined}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Alert props using the controls panel.',
            },
        },
    },
}

// Alert variants
export const AlertVariants: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '600px',
            }}
        >
            <Alert
                heading="Primary Alert"
                description="This is a primary alert for general information."
                variant={AlertVariant.PRIMARY}
            />
            <Alert
                heading="Success Alert"
                description="Your action completed successfully."
                variant={AlertVariant.SUCCESS}
            />
            <Alert
                heading="Warning Alert"
                description="Please review this important information."
                variant={AlertVariant.WARNING}
            />
            <Alert
                heading="Error Alert"
                description="Something went wrong. Please try again."
                variant={AlertVariant.ERROR}
            />
            <Alert
                heading="Purple Alert"
                description="This is a purple variant alert."
                variant={AlertVariant.PURPLE}
            />
            <Alert
                heading="Orange Alert"
                description="This is an orange variant alert."
                variant={AlertVariant.ORANGE}
            />
            <Alert
                heading="Neutral Alert"
                description="This is a neutral alert for general information."
                variant={AlertVariant.NEUTRAL}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different alert variants for various message types and contexts. Error and warning variants use role="alert" for assertive announcements, while others use role="status" for polite announcements. All variants are keyboard accessible and meet WCAG 2.4.7 focus visibility requirements.',
            },
        },
    },
}

// Alert styles
export const AlertStyles: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '600px',
            }}
        >
            <Alert
                heading="Subtle Style"
                description="Alert with subtle background coloring."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.SUBTLE}
            />
            <Alert
                heading="No Fill Style"
                description="Alert with no background fill, border only."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.NO_FILL}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different visual styles: subtle background vs no-fill with border only. Both styles maintain proper color contrast ratios and accessibility features. Icons are marked with aria-hidden="true" to prevent screen reader announcements.',
            },
        },
    },
}

// With icons
export const WithIcons: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '600px',
            }}
        >
            <Alert
                heading="Success with Icon"
                description="Operation completed successfully."
                variant={AlertVariant.SUCCESS}
                icon={<CheckCircle size={16} />}
            />
            <Alert
                heading="Warning with Icon"
                description="Please review this important information."
                variant={AlertVariant.WARNING}
                icon={<AlertTriangle size={16} />}
            />
            <Alert
                heading="Error with Icon"
                description="Something went wrong. Please try again."
                variant={AlertVariant.ERROR}
                icon={<XCircle size={16} />}
            />
            <Alert
                heading="Info with Icon"
                description="Here's some additional information for you."
                variant={AlertVariant.PRIMARY}
                icon={<Info size={16} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Alerts with custom icons to enhance visual communication. Icons are marked with aria-hidden="true" to prevent screen reader announcements, as the text labels provide all necessary information. All alerts maintain proper ARIA roles and keyboard accessibility.',
            },
        },
    },
}

// With actions
export const WithActions: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '600px',
            }}
        >
            <Alert
                heading="Confirmation Required"
                description="Are you sure you want to delete this item?"
                variant={AlertVariant.WARNING}
                primaryAction={{
                    label: 'Delete',
                    onClick: () => console.log('Delete clicked'),
                }}
                secondaryAction={{
                    label: 'Cancel',
                    onClick: () => console.log('Cancel clicked'),
                }}
            />
            <Alert
                heading="Update Available"
                description="A new version is available. Would you like to update now?"
                variant={AlertVariant.SUCCESS}
                icon={<Settings size={16} />}
                primaryAction={{
                    label: 'Update Now',
                    onClick: () => console.log('Update clicked'),
                }}
                secondaryAction={{
                    label: 'Later',
                    onClick: () => console.log('Later clicked'),
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Alerts with primary and secondary action buttons for user interaction. All buttons are keyboard accessible (Tab, Enter, Space) and have visible focus indicators. Button labels provide clear purpose and context.',
            },
        },
    },
}

// Action placement
export const ActionPlacement: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '600px',
            }}
        >
            <Alert
                heading="Actions on Right"
                description="Actions are placed on the right side of the alert content."
                variant={AlertVariant.PRIMARY}
                actionPlacement={AlertActionPlacement.RIGHT}
                primaryAction={{
                    label: 'Primary',
                    onClick: () => console.log('Primary clicked'),
                }}
                secondaryAction={{
                    label: 'Secondary',
                    onClick: () => console.log('Secondary clicked'),
                }}
            />
            <Alert
                heading="Actions at Bottom"
                description="Actions are placed at the bottom of the alert content for better mobile experience."
                variant={AlertVariant.SUCCESS}
                actionPlacement={AlertActionPlacement.BOTTOM}
                primaryAction={{
                    label: 'Primary Action',
                    onClick: () => console.log('Primary clicked'),
                }}
                secondaryAction={{
                    label: 'Secondary Action',
                    onClick: () => console.log('Secondary clicked'),
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different action button placements: right-aligned or bottom-stacked. Both placements maintain keyboard accessibility and logical tab order. The bottom placement is particularly useful for mobile experiences and maintains accessibility compliance.',
            },
        },
    },
}

// Closable alerts
export const ClosableAlerts: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '600px',
            }}
        >
            <Alert
                heading="Closable Alert"
                description="This alert can be dismissed by clicking the close button."
                variant={AlertVariant.PRIMARY}
                onClose={() => console.log('Alert closed')}
            />
            <Alert
                heading="Closable with Actions"
                description="This alert has both actions and a close button."
                variant={AlertVariant.WARNING}
                primaryAction={{
                    label: 'Action',
                    onClick: () => console.log('Action clicked'),
                }}
                onClose={() => console.log('Alert closed')}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Alerts that can be dismissed by users with close functionality. The close button has aria-label="Close" for screen reader support and is keyboard accessible.',
            },
        },
    },
}

// Accessibility-focused examples
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* ARIA Roles */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    <Eye size={18} color="#3b82f6" />
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#1e40af',
                        }}
                    >
                        1. ARIA Roles (WCAG 4.1.2, 4.1.3)
                    </h3>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        maxWidth: '600px',
                    }}
                >
                    <div>
                        <h4
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Error Alert (role="alert" - Assertive)
                        </h4>
                        <Alert
                            heading="Error Alert"
                            description="This alert uses role='alert' for immediate attention. Screen readers will announce this assertively."
                            variant={AlertVariant.ERROR}
                            icon={<AlertTriangle size={16} />}
                        />
                    </div>
                    <div>
                        <h4
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Warning Alert (role="alert" - Assertive)
                        </h4>
                        <Alert
                            heading="Warning Alert"
                            description="This alert uses role='alert' for immediate attention."
                            variant={AlertVariant.WARNING}
                            icon={<AlertTriangle size={16} />}
                        />
                    </div>
                    <div>
                        <h4
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Success Alert (role="status" - Polite)
                        </h4>
                        <Alert
                            heading="Success Alert"
                            description="This alert uses role='status' for polite announcements. Screen readers will announce this when they finish current announcements."
                            variant={AlertVariant.SUCCESS}
                            icon={<CheckCircle size={16} />}
                        />
                    </div>
                    <div>
                        <h4
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Info Alert (role="status" - Polite)
                        </h4>
                        <Alert
                            heading="Info Alert"
                            description="This alert uses role='status' for polite announcements."
                            variant={AlertVariant.PRIMARY}
                            icon={<Info size={16} />}
                        />
                    </div>
                </div>
                <div
                    style={{
                        padding: '12px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#1e40af',
                        marginTop: '12px',
                        maxWidth: '600px',
                    }}
                >
                    <strong>ARIA roles:</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li>
                            Error and warning alerts use role="alert" for
                            immediate (assertive) announcements
                        </li>
                        <li>
                            Other alerts use role="status" for polite
                            announcements
                        </li>
                        <li>
                            Screen readers announce alerts without requiring
                            focus
                        </li>
                    </ul>
                </div>
            </section>

            {/* Semantic HTML */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    <Eye size={18} color="#10b981" />
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#059669',
                        }}
                    >
                        2. Semantic HTML Structure (WCAG 1.3.1)
                    </h3>
                </div>
                <div style={{ maxWidth: '600px' }}>
                    <Alert
                        heading="Semantic Structure"
                        description="This alert uses semantic HTML: h3 for heading and p for description. The structure is programmatically determinable."
                        variant={AlertVariant.PRIMARY}
                    />
                </div>
                <div
                    style={{
                        padding: '12px',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#059669',
                        marginTop: '12px',
                        maxWidth: '600px',
                    }}
                >
                    <strong>Semantic HTML:</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li>Heading uses h3 element for proper hierarchy</li>
                        <li>
                            Description uses p element for paragraph structure
                        </li>
                        <li>Structure is programmatically determinable</li>
                    </ul>
                </div>
            </section>

            {/* ARIA Relationships */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    <Eye size={18} color="#8b5cf6" />
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#7c3aed',
                        }}
                    >
                        3. ARIA Relationships (WCAG 4.1.2)
                    </h3>
                </div>
                <div style={{ maxWidth: '600px' }}>
                    <Alert
                        heading="ARIA Relationships"
                        description="This alert uses aria-labelledby to link the heading and aria-describedby to link the description. Screen readers can properly associate the heading and description with the alert container."
                        variant={AlertVariant.PRIMARY}
                    />
                </div>
                <div
                    style={{
                        padding: '12px',
                        backgroundColor: '#faf5ff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#7c3aed',
                        marginTop: '12px',
                        maxWidth: '600px',
                    }}
                >
                    <strong>ARIA relationships:</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li>
                            aria-labelledby links alert container to heading
                        </li>
                        <li>
                            aria-describedby links alert container to
                            description
                        </li>
                        <li>
                            Unique IDs generated using useId() for proper
                            relationships
                        </li>
                    </ul>
                </div>
            </section>

            {/* Keyboard Navigation */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    <Keyboard size={18} color="#10b981" />
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#059669',
                        }}
                    >
                        4. Keyboard Navigation (WCAG 2.1.1)
                    </h3>
                </div>
                <div style={{ maxWidth: '600px' }}>
                    <Alert
                        heading="Keyboard Accessible"
                        description="All buttons in this alert are keyboard accessible. Press Tab to navigate, Enter or Space to activate."
                        variant={AlertVariant.PRIMARY}
                        primaryAction={{
                            label: 'Primary Action',
                            onClick: () => alert('Primary action clicked'),
                        }}
                        secondaryAction={{
                            label: 'Secondary Action',
                            onClick: () => alert('Secondary action clicked'),
                        }}
                        onClose={() => alert('Close clicked')}
                    />
                </div>
                <div
                    style={{
                        padding: '12px',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#059669',
                        marginTop: '12px',
                        maxWidth: '600px',
                    }}
                >
                    <strong>Keyboard support:</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li>
                            <strong>Tab:</strong> Navigate through buttons in
                            logical order
                        </li>
                        <li>
                            <strong>Enter:</strong> Activate focused button
                        </li>
                        <li>
                            <strong>Space:</strong> Activate focused button
                        </li>
                        <li>
                            <strong>Shift+Tab:</strong> Navigate backwards
                        </li>
                    </ul>
                    <p style={{ margin: '12px 0 0 0', fontStyle: 'italic' }}>
                        Try it: Press Tab to navigate through the buttons above.
                    </p>
                </div>
            </section>

            {/* Focus Indicators */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    <Eye size={18} color="#f59e0b" />
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#d97706',
                        }}
                    >
                        5. Focus Visible Indicators (WCAG 2.4.7)
                    </h3>
                </div>
                <div style={{ maxWidth: '600px' }}>
                    <Alert
                        heading="Focus Indicators"
                        description="All interactive elements have visible focus indicators. Tab through the buttons to see the focus outlines."
                        variant={AlertVariant.PRIMARY}
                        primaryAction={{
                            label: 'Focus Me',
                            onClick: () => {},
                        }}
                        onClose={() => {}}
                    />
                </div>
                <div
                    style={{
                        padding: '12px',
                        backgroundColor: '#fffbeb',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#d97706',
                        marginTop: '12px',
                        maxWidth: '600px',
                    }}
                >
                    <strong>Focus indicators:</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li>
                            All interactive elements have visible focus
                            indicators
                        </li>
                        <li>
                            Close button uses custom focus style with variant
                            color
                        </li>
                        <li>
                            Focus indicators meet WCAG 2.4.7 Level AA
                            requirements
                        </li>
                    </ul>
                    <p style={{ margin: '12px 0 0 0', fontStyle: 'italic' }}>
                        Try it: Tab through the buttons to see the focus
                        indicators.
                    </p>
                </div>
            </section>

            {/* Decorative Content */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    <Eye size={18} color="#ef4444" />
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#dc2626',
                        }}
                    >
                        6. Decorative Content Handling (WCAG 1.1.1)
                    </h3>
                </div>
                <div style={{ maxWidth: '600px' }}>
                    <Alert
                        heading="Decorative Icons"
                        description="Icons in alerts are marked with aria-hidden='true' to prevent screen reader announcements. The text provides all necessary information."
                        variant={AlertVariant.PRIMARY}
                        icon={<Info size={16} />}
                        onClose={() => {}}
                    />
                </div>
                <div
                    style={{
                        padding: '12px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#dc2626',
                        marginTop: '12px',
                        maxWidth: '600px',
                    }}
                >
                    <strong>Decorative content:</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li>
                            Icons are marked with aria-hidden="true" to prevent
                            screen reader announcements
                        </li>
                        <li>
                            Close icon (X) is marked with aria-hidden="true"
                        </li>
                        <li>
                            Separator between actions and close button is marked
                            with aria-hidden="true" and role="separator"
                        </li>
                        <li>
                            Text labels provide all necessary information for
                            screen reader users
                        </li>
                    </ul>
                    <p style={{ margin: '12px 0 0 0', fontStyle: 'italic' }}>
                        Test with screen reader: Use VoiceOver (macOS) or NVDA
                        (Windows) to verify icons are not announced.
                    </p>
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility demonstrations showing ARIA roles, semantic HTML, keyboard navigation, focus indicators, and decorative content handling. All examples meet WCAG 2.0, 2.1, 2.2 Level AA requirements.',
            },
        },
    },
}
