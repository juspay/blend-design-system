import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    SplitTag,
    TagColor,
    TagSize,
    TagShape,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

// Figma Code Connect is configured in SplitTag.figma.tsx
import {
    Star,
    Check,
    X,
    AlertCircle,
    Info,
    User,
    Calendar,
    Clock,
    DollarSign,
    TrendingUp,
    Shield,
    Award,
    Percent,
    Package,
    GitBranch,
    Database,
    Server,
    Cpu,
    Activity,
} from 'lucide-react'

const meta: Meta<typeof SplitTag> = {
    title: 'Components/Tags/SplitTag',
    component: SplitTag,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `

A specialized tag component that combines two tags to display key-value pairs or related information with distinct visual separation.

## Features
- Combines primary and secondary tags seamlessly
- Automatic styling (primary: no-fill, secondary: attentive)
- Supports all tag sizes and shapes
- Left and right slots for icons in both tags
- Click handlers for interactive behavior
- Perfect for displaying metadata, statuses, and categorized information

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible interactive elements (when onClick is provided)
- Screen reader support (VoiceOver/NVDA)
- Proper semantic structure and ARIA attributes
- Focus indicators visible on all interactive elements
- Touch targets meet Level AA requirement (24x24px minimum)
- Text content is accessible and properly labeled

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 1.3.4 Orientation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: Color contrast ratios should be verified using actual color values from theme tokens

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker

## Usage

\`\`\`tsx
import { SplitTag, TagColor, TagSize } from '@juspay/blend-design-system';

<SplitTag
  primaryTag={{
    text: "Status",
    color: TagColor.NEUTRAL
  }}
  secondaryTag={{
    text: "Active",
    color: TagColor.SUCCESS,
    leftSlot: <Check size={12} />
  }}
  size={TagSize.SM}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        primaryTag: {
            control: 'object',
            description: 'Configuration for the primary (left) tag',
        },
        secondaryTag: {
            control: 'object',
            description: 'Configuration for the secondary (right) tag',
        },
        size: {
            control: 'select',
            options: Object.values(TagSize),
            description: 'Size applied to both tags',
        },
        shape: {
            control: 'select',
            options: Object.values(TagShape),
            description: 'Shape applied to both tags',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SplitTag>

// Default story
export const Default: Story = {
    args: {
        primaryTag: {
            text: 'Label',
            color: TagColor.NEUTRAL,
        },
        secondaryTag: {
            text: 'Value',
            color: TagColor.PRIMARY,
        },
        size: TagSize.SM,
        shape: TagShape.SQUARICAL,
    },
}

// Basic Examples
export const BasicExamples: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SplitTag
                primaryTag={{ text: 'Version', color: TagColor.NEUTRAL }}
                secondaryTag={{ text: '2.0.0', color: TagColor.PRIMARY }}
            />
            <SplitTag
                primaryTag={{ text: 'Status', color: TagColor.NEUTRAL }}
                secondaryTag={{ text: 'Active', color: TagColor.SUCCESS }}
            />
            <SplitTag
                primaryTag={{ text: 'Priority', color: TagColor.NEUTRAL }}
                secondaryTag={{ text: 'High', color: TagColor.ERROR }}
            />
            <SplitTag
                primaryTag={{ text: 'Environment', color: TagColor.NEUTRAL }}
                secondaryTag={{ text: 'Production', color: TagColor.WARNING }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Basic split tag examples showing common key-value pairs.',
            },
        },
    },
}

// With Icons
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SplitTag
                primaryTag={{
                    text: 'Status',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Info size={12} />,
                }}
                secondaryTag={{
                    text: 'Online',
                    color: TagColor.SUCCESS,
                    leftSlot: <Check size={12} />,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Build',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Package size={12} />,
                }}
                secondaryTag={{
                    text: 'Failed',
                    color: TagColor.ERROR,
                    leftSlot: <X size={12} />,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Branch',
                    color: TagColor.NEUTRAL,
                    leftSlot: <GitBranch size={12} />,
                }}
                secondaryTag={{
                    text: 'main',
                    color: TagColor.PRIMARY,
                    rightSlot: <Shield size={12} />,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Performance',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Activity size={12} />,
                }}
                secondaryTag={{
                    text: '98%',
                    color: TagColor.SUCCESS,
                    leftSlot: <TrendingUp size={12} />,
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Split tags with icons for enhanced visual communication.',
            },
        },
    },
}

// Different Sizes
export const Sizes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
            }}
        >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <SplitTag
                    primaryTag={{ text: 'Size', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'XS', color: TagColor.PRIMARY }}
                    size={TagSize.XS}
                />
                <span style={{ fontSize: '12px', color: '#666' }}>
                    Extra Small
                </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <SplitTag
                    primaryTag={{ text: 'Size', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'SM', color: TagColor.PRIMARY }}
                    size={TagSize.SM}
                />
                <span style={{ fontSize: '12px', color: '#666' }}>Small</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <SplitTag
                    primaryTag={{ text: 'Size', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'MD', color: TagColor.PRIMARY }}
                    size={TagSize.MD}
                />
                <span style={{ fontSize: '12px', color: '#666' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <SplitTag
                    primaryTag={{ text: 'Size', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'LG', color: TagColor.PRIMARY }}
                    size={TagSize.LG}
                />
                <span style={{ fontSize: '12px', color: '#666' }}>Large</span>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Split tags in all available sizes.',
            },
        },
    },
}

// Different Shapes
export const Shapes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Squarical Shape
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{ text: 'Shape', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: 'Squarical',
                            color: TagColor.PRIMARY,
                        }}
                        shape={TagShape.SQUARICAL}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{ text: 'Type', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: 'Default',
                            color: TagColor.SUCCESS,
                        }}
                        shape={TagShape.SQUARICAL}
                        size={TagSize.MD}
                    />
                </div>
            </div>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Rounded Shape
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{ text: 'Shape', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: 'Rounded',
                            color: TagColor.PRIMARY,
                        }}
                        shape={TagShape.ROUNDED}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{ text: 'Style', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: 'Smooth',
                            color: TagColor.PURPLE,
                        }}
                        shape={TagShape.ROUNDED}
                        size={TagSize.MD}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Split tags with different shape options.',
            },
        },
    },
}

// Interactive Split Tags
export const Interactive: Story = {
    render: () => {
        const [selectedEnv, setSelectedEnv] = React.useState('production')
        const environments = ['development', 'staging', 'production']

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <h3 style={{ fontSize: '14px', color: '#666' }}>
                    Click to Select Environment
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {environments.map((env) => (
                        <SplitTag
                            key={env}
                            primaryTag={{
                                text: 'ENV',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Server size={12} />,
                            }}
                            secondaryTag={{
                                text: env,
                                color:
                                    selectedEnv === env
                                        ? TagColor.SUCCESS
                                        : TagColor.NEUTRAL,
                                leftSlot:
                                    selectedEnv === env ? (
                                        <Check size={12} />
                                    ) : null,
                                onClick: () => setSelectedEnv(env),
                            }}
                        />
                    ))}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                    Selected: {selectedEnv}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive split tags with click handlers on secondary tags.',
            },
        },
    },
}

// Real-world Examples
export const RealWorldExamples: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Software Version Info
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'Version',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'v3.2.1',
                            color: TagColor.PRIMARY,
                        }}
                    />
                    <SplitTag
                        primaryTag={{ text: 'Build', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: '#1234',
                            color: TagColor.SUCCESS,
                        }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Release',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Stable',
                            color: TagColor.SUCCESS,
                            leftSlot: <Check size={12} />,
                        }}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Server Monitoring
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'CPU',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Cpu size={12} />,
                        }}
                        secondaryTag={{ text: '45%', color: TagColor.SUCCESS }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Memory',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Database size={12} />,
                        }}
                        secondaryTag={{ text: '78%', color: TagColor.WARNING }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Disk',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Server size={12} />,
                        }}
                        secondaryTag={{ text: '92%', color: TagColor.ERROR }}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    E-commerce Order Status
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{ text: 'Order', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: '#12345',
                            color: TagColor.PRIMARY,
                        }}
                    />
                    <SplitTag
                        primaryTag={{ text: 'Status', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: 'Shipped',
                            color: TagColor.SUCCESS,
                            leftSlot: <Package size={12} />,
                        }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Payment',
                            color: TagColor.NEUTRAL,
                            leftSlot: <DollarSign size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Paid',
                            color: TagColor.SUCCESS,
                            leftSlot: <Check size={12} />,
                        }}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Project Management
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'Sprint',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Calendar size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Week 3',
                            color: TagColor.PRIMARY,
                        }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Progress',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Activity size={12} />,
                        }}
                        secondaryTag={{ text: '75%', color: TagColor.WARNING }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Due',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Clock size={12} />,
                        }}
                        secondaryTag={{ text: '2 days', color: TagColor.ERROR }}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common split tag usage patterns in real-world applications.',
            },
        },
    },
}

// Color Combinations
export const ColorCombinations: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3
                style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}
            >
                Various Color Combinations
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <SplitTag
                    primaryTag={{ text: 'Type', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'Primary', color: TagColor.PRIMARY }}
                />
                <SplitTag
                    primaryTag={{ text: 'Status', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'Success', color: TagColor.SUCCESS }}
                />
                <SplitTag
                    primaryTag={{ text: 'Alert', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'Error', color: TagColor.ERROR }}
                />
                <SplitTag
                    primaryTag={{ text: 'Level', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'Warning', color: TagColor.WARNING }}
                />
                <SplitTag
                    primaryTag={{ text: 'Tag', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'Purple', color: TagColor.PURPLE }}
                />
                <SplitTag
                    primaryTag={{ text: 'Mode', color: TagColor.NEUTRAL }}
                    secondaryTag={{ text: 'Neutral', color: TagColor.NEUTRAL }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different color combinations for secondary tags while keeping primary tag neutral.',
            },
        },
    },
}

// Comprehensive Showcase
export const ComprehensiveShowcase: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                    }}
                >
                    SplitTag Component Showcase
                </h3>
                <p style={{ marginBottom: '24px', color: '#666' }}>
                    A comprehensive display of split tag variations and use
                    cases for displaying key-value information.
                </p>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                }}
            >
                {/* Status Indicators */}
                <div
                    style={{
                        padding: '20px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                    }}
                >
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        Status Indicators
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <SplitTag
                            primaryTag={{
                                text: 'API',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Operational',
                                color: TagColor.SUCCESS,
                                leftSlot: <Check size={12} />,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Database',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Degraded',
                                color: TagColor.WARNING,
                                leftSlot: <AlertCircle size={12} />,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'CDN',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Offline',
                                color: TagColor.ERROR,
                                leftSlot: <X size={12} />,
                            }}
                            size={TagSize.SM}
                        />
                    </div>
                </div>

                {/* Metrics Display */}
                <div
                    style={{
                        padding: '20px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                    }}
                >
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        Performance Metrics
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <SplitTag
                            primaryTag={{
                                text: 'Score',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Award size={12} />,
                            }}
                            secondaryTag={{
                                text: 'A+',
                                color: TagColor.SUCCESS,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Speed',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Activity size={12} />,
                            }}
                            secondaryTag={{
                                text: '1.2s',
                                color: TagColor.PRIMARY,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Uptime',
                                color: TagColor.NEUTRAL,
                                leftSlot: <TrendingUp size={12} />,
                            }}
                            secondaryTag={{
                                text: '99.9%',
                                color: TagColor.SUCCESS,
                            }}
                            size={TagSize.SM}
                        />
                    </div>
                </div>

                {/* User Info */}
                <div
                    style={{
                        padding: '20px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                    }}
                >
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        User Information
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <SplitTag
                            primaryTag={{
                                text: 'Role',
                                color: TagColor.NEUTRAL,
                                leftSlot: <User size={12} />,
                            }}
                            secondaryTag={{
                                text: 'Admin',
                                color: TagColor.ERROR,
                                leftSlot: <Shield size={12} />,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Plan',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Star size={12} />,
                            }}
                            secondaryTag={{
                                text: 'Premium',
                                color: TagColor.WARNING,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Since',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Calendar size={12} />,
                            }}
                            secondaryTag={{
                                text: '2021',
                                color: TagColor.PRIMARY,
                            }}
                            size={TagSize.SM}
                        />
                    </div>
                </div>

                {/* Pricing Tiers */}
                <div
                    style={{
                        padding: '20px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                    }}
                >
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        Pricing Information
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <SplitTag
                            primaryTag={{
                                text: 'Price',
                                color: TagColor.NEUTRAL,
                                leftSlot: <DollarSign size={12} />,
                            }}
                            secondaryTag={{
                                text: '$99/mo',
                                color: TagColor.PRIMARY,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Discount',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Percent size={12} />,
                            }}
                            secondaryTag={{
                                text: '20% OFF',
                                color: TagColor.ERROR,
                            }}
                            size={TagSize.SM}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Billing',
                                color: TagColor.NEUTRAL,
                                leftSlot: <Calendar size={12} />,
                            }}
                            secondaryTag={{
                                text: 'Annual',
                                color: TagColor.SUCCESS,
                            }}
                            size={TagSize.SM}
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive showcase demonstrating the versatility of the SplitTag component for various data display needs.',
            },
        },
    },
}

// Advanced SplitTag Patterns
export const AdvancedPatterns: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Multi-level Information Hierarchy
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'API',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Server size={12} />,
                        }}
                        secondaryTag={{
                            text: 'v3.2.1-stable',
                            color: TagColor.SUCCESS,
                        }}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Database',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Database size={12} />,
                        }}
                        secondaryTag={{
                            text: 'MongoDB 6.0.4',
                            color: TagColor.PRIMARY,
                        }}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Cache',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Activity size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Redis 7.0.8',
                            color: TagColor.WARNING,
                        }}
                        size={TagSize.SM}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Complex Key-Value Relationships
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'Memory Usage',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: '2.4GB / 8.0GB',
                            color: TagColor.SUCCESS,
                            leftSlot: <TrendingUp size={12} />,
                        }}
                        size={TagSize.MD}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Response Time',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: '~145ms avg',
                            color: TagColor.WARNING,
                            leftSlot: <Clock size={12} />,
                        }}
                        size={TagSize.MD}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Error Rate',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: '0.003%',
                            color: TagColor.SUCCESS,
                            leftSlot: <Check size={12} />,
                        }}
                        size={TagSize.MD}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Conditional State Display
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'Deployment',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Package size={12} />,
                        }}
                        secondaryTag={{
                            text: 'In Progress',
                            color: TagColor.WARNING,
                            leftSlot: <Activity size={12} />,
                        }}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Health Check',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Activity size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Passing',
                            color: TagColor.SUCCESS,
                            leftSlot: <Check size={12} />,
                        }}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Backup',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Database size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Failed',
                            color: TagColor.ERROR,
                            leftSlot: <X size={12} />,
                        }}
                        size={TagSize.SM}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Financial & E-commerce Data
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'Revenue',
                            color: TagColor.NEUTRAL,
                            leftSlot: <DollarSign size={12} />,
                        }}
                        secondaryTag={{
                            text: '$847.2K',
                            color: TagColor.SUCCESS,
                        }}
                        size={TagSize.MD}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Growth',
                            color: TagColor.NEUTRAL,
                            leftSlot: <TrendingUp size={12} />,
                        }}
                        secondaryTag={{
                            text: '+23.4%',
                            color: TagColor.SUCCESS,
                        }}
                        size={TagSize.MD}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Conversion',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Percent size={12} />,
                        }}
                        secondaryTag={{
                            text: '3.47%',
                            color: TagColor.WARNING,
                        }}
                        size={TagSize.MD}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Team & Resource Allocation
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <SplitTag
                        primaryTag={{
                            text: 'Assigned',
                            color: TagColor.NEUTRAL,
                            leftSlot: <User size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Sarah Chen',
                            color: TagColor.PRIMARY,
                        }}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Team',
                            color: TagColor.NEUTRAL,
                            leftSlot: <User size={12} />,
                        }}
                        secondaryTag={{
                            text: 'Frontend (5)',
                            color: TagColor.SUCCESS,
                        }}
                        size={TagSize.SM}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Workload',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Activity size={12} />,
                        }}
                        secondaryTag={{
                            text: '85% Capacity',
                            color: TagColor.WARNING,
                        }}
                        size={TagSize.SM}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Advanced SplitTag patterns for complex data relationships, conditional states, and multi-level information hierarchies.',
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating WCAG 2.1 Level AA compliance
 */
export const Accessibility: Story = {
    render: () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                }}
            >
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        marginBottom: '16px',
                        color: '#1e293b',
                    }}
                >
                    SplitTag Component Accessibility Showcase
                </h2>
                <p
                    style={{
                        fontSize: '16px',
                        color: '#475569',
                        lineHeight: '1.6',
                        marginBottom: '24px',
                    }}
                >
                    Interactive examples demonstrating the SplitTag component's
                    accessibility features including keyboard navigation, screen
                    reader support, proper ARIA attributes, and semantic
                    structure across all variants and sizes.
                </p>

                {/* WCAG Principle 1: Perceivable */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Perceivable Content & Text Alternatives
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        SplitTags have descriptive text content. Icons are
                        properly labeled or hidden from screen readers when
                        decorative.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Status',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Active',
                                    color: TagColor.SUCCESS,
                                    leftSlot: <Check size={12} />,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Version',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: '2.0.0',
                                    color: TagColor.PRIMARY,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Priority',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'High',
                                    color: TagColor.ERROR,
                                    leftSlot: <AlertCircle size={12} />,
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>
                </section>

                {/* WCAG Principle 2: Operable */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Keyboard Navigation & Interactive Elements
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        When SplitTags have onClick handlers, they are keyboard
                        accessible. Use Tab to navigate and Enter/Space to
                        activate.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Environment',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <Server size={12} />,
                                }}
                                secondaryTag={{
                                    text: 'Production',
                                    color: TagColor.SUCCESS,
                                    leftSlot: <Check size={12} />,
                                    onClick: () => {
                                        console.log('Environment clicked')
                                    },
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Build',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <Package size={12} />,
                                }}
                                secondaryTag={{
                                    text: 'v3.2.1',
                                    color: TagColor.PRIMARY,
                                    onClick: () => {
                                        console.log('Build clicked')
                                    },
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>
                </section>

                {/* WCAG Principle 3: Understandable */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Predictable Behavior & Consistent Patterns
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        SplitTags follow consistent patterns. Primary tag
                        displays the label/category, secondary tag displays the
                        value/status.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Status',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Online',
                                    color: TagColor.SUCCESS,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Status',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Offline',
                                    color: TagColor.ERROR,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Status',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Degraded',
                                    color: TagColor.WARNING,
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>
                </section>

                {/* WCAG Principle 4: Robust */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Semantic Structure & ARIA Attributes
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        SplitTags use proper semantic structure. Text content is
                        accessible to assistive technologies.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'API',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Operational',
                                    color: TagColor.SUCCESS,
                                    leftSlot: <Check size={12} />,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Database',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Degraded',
                                    color: TagColor.WARNING,
                                    leftSlot: <AlertCircle size={12} />,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'CDN',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'Offline',
                                    color: TagColor.ERROR,
                                    leftSlot: <X size={12} />,
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>
                </section>

                {/* All Sizes */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        All Sizes - Touch Target Compliance
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        All SplitTag sizes meet WCAG 2.5.8 Target Size
                        requirements (minimum 24x24px for Level AA).
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Size',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'XS',
                                    color: TagColor.PRIMARY,
                                }}
                                size={TagSize.XS}
                            />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                Extra Small
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Size',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'SM',
                                    color: TagColor.PRIMARY,
                                }}
                                size={TagSize.SM}
                            />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                Small
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Size',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'MD',
                                    color: TagColor.PRIMARY,
                                }}
                                size={TagSize.MD}
                            />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                Medium
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            <SplitTag
                                primaryTag={{
                                    text: 'Size',
                                    color: TagColor.NEUTRAL,
                                }}
                                secondaryTag={{
                                    text: 'LG',
                                    color: TagColor.PRIMARY,
                                }}
                                size={TagSize.LG}
                            />
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                Large
                            </span>
                        </div>
                    </div>
                </section>

                {/* All Shapes */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        All Shapes - Consistent Accessibility
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        Both shape variants maintain the same accessibility
                        standards.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div>
                            <h4
                                style={{
                                    marginBottom: '12px',
                                    fontSize: '14px',
                                    color: '#666',
                                }}
                            >
                                Squarical Shape
                            </h4>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <SplitTag
                                    primaryTag={{
                                        text: 'Shape',
                                        color: TagColor.NEUTRAL,
                                    }}
                                    secondaryTag={{
                                        text: 'Squarical',
                                        color: TagColor.PRIMARY,
                                    }}
                                    shape={TagShape.SQUARICAL}
                                    size={TagSize.SM}
                                />
                                <SplitTag
                                    primaryTag={{
                                        text: 'Type',
                                        color: TagColor.NEUTRAL,
                                    }}
                                    secondaryTag={{
                                        text: 'Default',
                                        color: TagColor.SUCCESS,
                                    }}
                                    shape={TagShape.SQUARICAL}
                                    size={TagSize.MD}
                                />
                            </div>
                        </div>
                        <div>
                            <h4
                                style={{
                                    marginBottom: '12px',
                                    fontSize: '14px',
                                    color: '#666',
                                }}
                            >
                                Rounded Shape
                            </h4>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <SplitTag
                                    primaryTag={{
                                        text: 'Shape',
                                        color: TagColor.NEUTRAL,
                                    }}
                                    secondaryTag={{
                                        text: 'Rounded',
                                        color: TagColor.PRIMARY,
                                    }}
                                    shape={TagShape.ROUNDED}
                                    size={TagSize.SM}
                                />
                                <SplitTag
                                    primaryTag={{
                                        text: 'Style',
                                        color: TagColor.NEUTRAL,
                                    }}
                                    secondaryTag={{
                                        text: 'Smooth',
                                        color: TagColor.PURPLE,
                                    }}
                                    shape={TagShape.ROUNDED}
                                    size={TagSize.MD}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    style={{
                        marginTop: '32px',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontWeight: 600,
                            marginBottom: '8px',
                        }}
                    >
                        Accessibility notes:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>
                            SplitTags have descriptive text content that is
                            accessible to screen readers.
                        </li>
                        <li>
                            Icons in leftSlot and rightSlot are handled by the
                            underlying Tag component with proper accessibility
                            attributes.
                        </li>
                        <li>
                            When onClick handlers are provided, SplitTags are
                            keyboard accessible (Tab to focus, Enter/Space to
                            activate).
                        </li>
                        <li>
                            All sizes meet WCAG 2.5.8 Target Size requirements
                            (minimum 24x24px for Level AA).
                        </li>
                        <li>
                            Color contrast ratios should be verified using
                            contrast checker tools.
                        </li>
                        <li>
                            SplitTags use semantic HTML structure for proper
                            screen reader support.
                        </li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive examples demonstrating the SplitTag component's accessibility features including keyboard navigation, screen reader support, proper ARIA attributes, and semantic structure across all variants, sizes, and shapes.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to text content accessibility, color contrast, and interactive element labeling.

2. **Chromatic visual tests**:
   - Focus ring visibility on interactive elements (when onClick is provided)
   - Hover/active states
   - Responsive behavior

3. **Manual testing**:
   - Navigate using keyboard only (Tab to focus on interactive SplitTags, Enter/Space to activate).
   - Use a screen reader (VoiceOver/NVDA) to confirm all text content is announced correctly.
   - Verify color contrast of text and background colors using contrast tools.
   - Test interactive SplitTags with keyboard (Tab, Enter/Space).
   - Verify all sizes meet minimum touch target requirements (24x24px).
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
