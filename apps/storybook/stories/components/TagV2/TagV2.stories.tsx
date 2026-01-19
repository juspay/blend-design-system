import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import {
    TagV2,
    TagV2Type,
    TagV2Color,
    TagV2Size,
    TagV2SubType,
} from '../../../../../packages/blend/lib/components/TagV2'

import {
    X,
    Check,
    AlertCircle,
    Star,
    Heart,
    User,
    Calendar,
    Clock,
    MapPin,
    TrendingUp,
    Shield,
    Award,
    Flag,
} from 'lucide-react'

// Figma Code Connect is configured in TagV2.figma.tsx (if available)

const meta: Meta<typeof TagV2> = {
    title: 'Components/Tags/TagV2',
    component: TagV2,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A modern, accessible tag component (V2) for labeling, categorizing, and displaying metadata with enhanced accessibility features.
## Features
- Multiple types (No Fill, Attentive, Subtle)
- Six color options (Neutral, Primary, Success, Error, Warning, Purple)
- Four size options (XS, SM, MD, LG)
- Two shape options (Rounded, Squarical)
- Left and right slots for icons or custom content
- Click handler support for interactive tags
- Tag group support for connected tags
- Enhanced accessibility with proper ARIA attributes
- Keyboard navigation support (Tab, Enter, Space)
## Accessibility
**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance
**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space for interactive tags)
- Screen reader support (VoiceOver/NVDA)
- Proper semantic HTML structure
- Interactive tags support onClick handlers with keyboard events
- Touch targets meet Level AA requirement (24x24px minimum for interactive tags)
- Color contrast ratios meet WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text)
- Focus indicators visible for keyboard navigation
**Level AAA Compliance**: ⚠️ Partial (3 out of 4 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA)
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions
**Touch Target Sizes**:
- XS tags: ~20-24px (meets AA 24px when interactive)
- SM tags: ~24-28px (meets AA 24px, approaches AAA 44px)
- MD tags: ~28-32px (meets AA 24px)
- LG tags: ~32-36px (meets AA 24px)
**Accessibility Features**:
- Interactive tags support keyboard navigation (Enter/Space to activate)
- Proper role attributes (button role when interactive)
- Decorative icons should have \`aria-hidden="true"\` when used in leftSlot/rightSlot
- Interactive tags announce their state to screen readers
- Focus indicators with proper contrast (2px solid outline with offset)
- Tags support \`aria-pressed\` for toggle states
- Text selection enabled for non-interactive tags
**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Keyboard Testing**: Tab to interactive tags, press Enter/Space to activate
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report
## Usage
\`\`\`tsx
import { TagV2, TagV2Type, TagV2Color, TagV2Size } from '@juspay/blend-design-system';
<TagV2
  text="New Feature"
  type={TagV2Type.SUBTLE}
  color={TagV2Color.SUCCESS}
  size={TagV2Size.SM}
  leftSlot={<Star size={12} />}
  onClick={() => console.log('Tag clicked')}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        text: {
            control: 'text',
            description: 'The text content of the tag',
        },
        type: {
            control: 'select',
            options: Object.values(TagV2Type),
            description: 'The visual type of the tag',
        },
        color: {
            control: 'select',
            options: Object.values(TagV2Color),
            description: 'The color scheme of the tag',
        },
        size: {
            control: 'select',
            options: Object.values(TagV2Size),
            description: 'The size of the tag',
        },
        subType: {
            control: 'select',
            options: Object.values(TagV2SubType),
            description: 'The shape/border radius style of the tag',
        },
        leftSlot: {
            control: false,
            description: 'Content to display on the left side of the tag text',
        },
        rightSlot: {
            control: false,
            description: 'Content to display on the right side of the tag text',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler for interactive tags',
        },
        tagGroupPosition: {
            control: 'select',
            options: [undefined, 'left', 'center', 'right'],
            description:
                'Position for tag group styling (left, center, or right)',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TagV2>

// Default story
export const Default: Story = {
    args: {
        text: 'Default Tag',
        type: TagV2Type.SUBTLE,
        color: TagV2Color.PRIMARY,
        size: TagV2Size.SM,
        subType: TagV2SubType.SQUARICAL,
    },
}

// Tag Types
export const Types: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    No Fill Type
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Neutral"
                        type={TagV2Type.NO_FILL}
                        color={TagV2Color.NEUTRAL}
                    />
                    <TagV2
                        text="Primary"
                        type={TagV2Type.NO_FILL}
                        color={TagV2Color.PRIMARY}
                    />
                    <TagV2
                        text="Success"
                        type={TagV2Type.NO_FILL}
                        color={TagV2Color.SUCCESS}
                    />
                    <TagV2
                        text="Error"
                        type={TagV2Type.NO_FILL}
                        color={TagV2Color.ERROR}
                    />
                    <TagV2
                        text="Warning"
                        type={TagV2Type.NO_FILL}
                        color={TagV2Color.WARNING}
                    />
                    <TagV2
                        text="Purple"
                        type={TagV2Type.NO_FILL}
                        color={TagV2Color.PURPLE}
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
                    Attentive Type
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Neutral"
                        type={TagV2Type.ATTENTIVE}
                        color={TagV2Color.NEUTRAL}
                    />
                    <TagV2
                        text="Primary"
                        type={TagV2Type.ATTENTIVE}
                        color={TagV2Color.PRIMARY}
                    />
                    <TagV2
                        text="Success"
                        type={TagV2Type.ATTENTIVE}
                        color={TagV2Color.SUCCESS}
                    />
                    <TagV2
                        text="Error"
                        type={TagV2Type.ATTENTIVE}
                        color={TagV2Color.ERROR}
                    />
                    <TagV2
                        text="Warning"
                        type={TagV2Type.ATTENTIVE}
                        color={TagV2Color.WARNING}
                    />
                    <TagV2
                        text="Purple"
                        type={TagV2Type.ATTENTIVE}
                        color={TagV2Color.PURPLE}
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
                    Subtle Type
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Neutral"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.NEUTRAL}
                    />
                    <TagV2
                        text="Primary"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.PRIMARY}
                    />
                    <TagV2
                        text="Success"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.SUCCESS}
                    />
                    <TagV2
                        text="Error"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.ERROR}
                    />
                    <TagV2
                        text="Warning"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.WARNING}
                    />
                    <TagV2
                        text="Purple"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.PURPLE}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tag types with all color options.',
            },
        },
    },
}

// Tag Sizes
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
                <TagV2 text="Extra Small" size={TagV2Size.XS} />
                <span style={{ fontSize: '12px', color: '#666' }}>XS</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <TagV2 text="Small" size={TagV2Size.SM} />
                <span style={{ fontSize: '12px', color: '#666' }}>SM</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <TagV2 text="Medium" size={TagV2Size.MD} />
                <span style={{ fontSize: '12px', color: '#666' }}>MD</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <TagV2 text="Large" size={TagV2Size.LG} />
                <span style={{ fontSize: '12px', color: '#666' }}>LG</span>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All available tag sizes from extra small to large.',
            },
        },
    },
}

// Tag Shapes
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
                <div style={{ display: 'flex', gap: '8px' }}>
                    <TagV2
                        text="Squarical XS"
                        subType={TagV2SubType.SQUARICAL}
                        size={TagV2Size.XS}
                    />
                    <TagV2
                        text="Squarical SM"
                        subType={TagV2SubType.SQUARICAL}
                        size={TagV2Size.SM}
                    />
                    <TagV2
                        text="Squarical MD"
                        subType={TagV2SubType.SQUARICAL}
                        size={TagV2Size.MD}
                    />
                    <TagV2
                        text="Squarical LG"
                        subType={TagV2SubType.SQUARICAL}
                        size={TagV2Size.LG}
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
                <div style={{ display: 'flex', gap: '8px' }}>
                    <TagV2
                        text="Rounded XS"
                        subType={TagV2SubType.ROUNDED}
                        size={TagV2Size.XS}
                    />
                    <TagV2
                        text="Rounded SM"
                        subType={TagV2SubType.ROUNDED}
                        size={TagV2Size.SM}
                    />
                    <TagV2
                        text="Rounded MD"
                        subType={TagV2SubType.ROUNDED}
                        size={TagV2Size.MD}
                    />
                    <TagV2
                        text="Rounded LG"
                        subType={TagV2SubType.ROUNDED}
                        size={TagV2Size.LG}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different shape options with various sizes.',
            },
        },
    },
}

// Tags with Icons
export const WithIcons: Story = {
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
                    Left Icons
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="New"
                        color={TagV2Color.SUCCESS}
                        leftSlot={{
                            slot: <Star size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Favorite"
                        color={TagV2Color.ERROR}
                        leftSlot={{
                            slot: <Heart size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="User"
                        color={TagV2Color.PRIMARY}
                        leftSlot={{
                            slot: <User size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Scheduled"
                        color={TagV2Color.WARNING}
                        leftSlot={{
                            slot: <Calendar size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Trending"
                        color={TagV2Color.PURPLE}
                        leftSlot={{
                            slot: <TrendingUp size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
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
                    Right Icons
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Close"
                        rightSlot={{
                            slot: <X size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        onClick={() => console.log('Remove tag')}
                    />
                    <TagV2
                        text="Verified"
                        color={TagV2Color.SUCCESS}
                        rightSlot={{
                            slot: <Check size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Protected"
                        color={TagV2Color.PRIMARY}
                        rightSlot={{
                            slot: <Shield size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Premium"
                        color={TagV2Color.WARNING}
                        rightSlot={{
                            slot: <Award size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
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
                    Both Icons
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Location"
                        leftSlot={{
                            slot: <MapPin size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        rightSlot={{
                            slot: <X size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        onClick={() => console.log('Remove location tag')}
                    />
                    <TagV2
                        text="Priority"
                        color={TagV2Color.ERROR}
                        leftSlot={{
                            slot: <Flag size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        rightSlot={{
                            slot: <AlertCircle size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tags with icons in different positions for enhanced visual communication. Icons should have aria-hidden="true" for accessibility.',
            },
        },
    },
}

// Interactive Tags
export const Interactive: Story = {
    render: () => {
        const InteractiveComponent = () => {
            const [selectedTags, setSelectedTags] = React.useState<string[]>([
                'React',
            ])

            const tags = [
                'React',
                'TypeScript',
                'JavaScript',
                'CSS',
                'HTML',
                'Node.js',
            ]

            const toggleTag = (tag: string) => {
                setSelectedTags((prev) =>
                    prev.includes(tag)
                        ? prev.filter((t) => t !== tag)
                        : [...prev, tag]
                )
            }

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Click to Select Tags
                        </h3>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {tags.map((tag) => (
                                <TagV2
                                    key={tag}
                                    text={tag}
                                    type={
                                        selectedTags.includes(tag)
                                            ? TagV2Type.ATTENTIVE
                                            : TagV2Type.NO_FILL
                                    }
                                    color={
                                        selectedTags.includes(tag)
                                            ? TagV2Color.PRIMARY
                                            : TagV2Color.NEUTRAL
                                    }
                                    leftSlot={
                                        selectedTags.includes(tag)
                                            ? {
                                                  slot: (
                                                      <Check
                                                          size={12}
                                                          aria-hidden="true"
                                                      />
                                                  ),
                                                  maxHeight: '12px',
                                              }
                                            : undefined
                                    }
                                    onClick={() => toggleTag(tag)}
                                    aria-pressed={selectedTags.includes(tag)}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Selected:{' '}
                        {selectedTags.length > 0
                            ? selectedTags.join(', ')
                            : 'None'}
                    </div>
                </div>
            )
        }
        return <InteractiveComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive tags that can be selected/deselected with visual feedback and proper aria-pressed state.',
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating WCAG 2.1 Level A, AA, and AAA compliance
 */
export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                maxWidth: '800px',
            }}
        >
            {/* Basic Accessible Tags */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Basic Accessible Tags
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Tags with proper semantic structure and accessible text
                    content.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2 text="React" color={TagV2Color.PRIMARY} />
                    <TagV2 text="TypeScript" color={TagV2Color.SUCCESS} />
                    <TagV2 text="JavaScript" color={TagV2Color.WARNING} />
                    <TagV2 text="CSS" color={TagV2Color.PURPLE} />
                </div>
            </div>

            {/* Interactive Tags with Keyboard Support */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Interactive Tags (Keyboard Accessible)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Tags with onClick handlers are keyboard accessible. Use Tab
                    to focus, Enter or Space to activate.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Selectable"
                        color={TagV2Color.PRIMARY}
                        type={TagV2Type.SUBTLE}
                        onClick={() => console.log('Tag selected')}
                    />
                    <TagV2
                        text="Removable"
                        color={TagV2Color.ERROR}
                        type={TagV2Type.SUBTLE}
                        rightSlot={{
                            slot: <X size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        onClick={() => console.log('Tag removed')}
                    />
                    <TagV2
                        text="Toggle"
                        color={TagV2Color.SUCCESS}
                        type={TagV2Type.ATTENTIVE}
                        onClick={() => console.log('Tag toggled')}
                        aria-pressed={true}
                    />
                </div>
            </div>

            {/* Tags with Icons (Accessible) */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Tags with Icons (Properly Hidden)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Decorative icons have aria-hidden="true". The tag text
                    provides the accessible name.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="New Feature"
                        color={TagV2Color.SUCCESS}
                        leftSlot={{
                            slot: <Star size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Verified"
                        color={TagV2Color.PRIMARY}
                        rightSlot={{
                            slot: <Check size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Location"
                        color={TagV2Color.WARNING}
                        leftSlot={{
                            slot: <MapPin size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        rightSlot={{
                            slot: <X size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        onClick={() => console.log('Remove location')}
                    />
                </div>
            </div>

            {/* Different Sizes (Touch Target Compliance) */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Size Variants (Touch Target Compliance)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    All interactive tag sizes meet WCAG 2.2 Level AA touch
                    target requirement (24x24px minimum). For AAA compliance,
                    44x44px is required.
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
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                width: '60px',
                            }}
                        >
                            XS:
                        </span>
                        <TagV2
                            text="Extra Small"
                            size={TagV2Size.XS}
                            onClick={() => {}}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                width: '60px',
                            }}
                        >
                            SM:
                        </span>
                        <TagV2
                            text="Small"
                            size={TagV2Size.SM}
                            onClick={() => {}}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                width: '60px',
                            }}
                        >
                            MD:
                        </span>
                        <TagV2
                            text="Medium"
                            size={TagV2Size.MD}
                            onClick={() => {}}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                width: '60px',
                            }}
                        >
                            LG:
                        </span>
                        <TagV2
                            text="Large"
                            size={TagV2Size.LG}
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </div>

            {/* Color Contrast Examples */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Color Contrast (WCAG AA Compliant)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    All tag color combinations meet WCAG 2.1 Level AA contrast
                    requirements (4.5:1 for normal text, 3:1 for large text).
                    For AAA compliance, 7:1 contrast ratio is required.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Neutral"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.NEUTRAL}
                    />
                    <TagV2
                        text="Primary"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.PRIMARY}
                    />
                    <TagV2
                        text="Success"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.SUCCESS}
                    />
                    <TagV2
                        text="Error"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.ERROR}
                    />
                    <TagV2
                        text="Warning"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.WARNING}
                    />
                    <TagV2
                        text="Purple"
                        type={TagV2Type.SUBTLE}
                        color={TagV2Color.PURPLE}
                    />
                </div>
            </div>

            {/* Focus Indicators */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Focus Indicators (Keyboard Navigation)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Interactive tags have visible focus indicators. Use Tab to
                    navigate, Enter or Space to activate.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Focusable Tag 1"
                        color={TagV2Color.PRIMARY}
                        onClick={() => {}}
                    />
                    <TagV2
                        text="Focusable Tag 2"
                        color={TagV2Color.SUCCESS}
                        onClick={() => {}}
                    />
                    <TagV2
                        text="Focusable Tag 3"
                        color={TagV2Color.WARNING}
                        onClick={() => {}}
                    />
                </div>
                <p
                    style={{
                        marginTop: '12px',
                        fontSize: '12px',
                        color: '#666',
                        fontStyle: 'italic',
                    }}
                >
                    Tip: Press Tab to see focus indicators on interactive tags
                </p>
            </div>

            {/* Screen Reader Support */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Screen Reader Support
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Tags provide accessible text content. Interactive tags
                    announce their state and action to screen readers.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Status: Active"
                        color={TagV2Color.SUCCESS}
                        leftSlot={{
                            slot: <Check size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Status: Pending"
                        color={TagV2Color.WARNING}
                        leftSlot={{
                            slot: <Clock size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Status: Error"
                        color={TagV2Color.ERROR}
                        leftSlot={{
                            slot: <AlertCircle size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                    />
                    <TagV2
                        text="Click to Remove"
                        color={TagV2Color.NEUTRAL}
                        rightSlot={{
                            slot: <X size={12} aria-hidden="true" />,
                            maxHeight: '12px',
                        }}
                        onClick={() => console.log('Remove clicked')}
                    />
                </div>
            </div>

            {/* Type Examples */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    All Types (Accessible)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    All tag types maintain accessibility standards across
                    different visual styles.
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
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            No Fill Type
                        </h4>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <TagV2
                                text="Neutral"
                                type={TagV2Type.NO_FILL}
                                color={TagV2Color.NEUTRAL}
                            />
                            <TagV2
                                text="Primary"
                                type={TagV2Type.NO_FILL}
                                color={TagV2Color.PRIMARY}
                            />
                            <TagV2
                                text="Success"
                                type={TagV2Type.NO_FILL}
                                color={TagV2Color.SUCCESS}
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
                            Attentive Type
                        </h4>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <TagV2
                                text="Neutral"
                                type={TagV2Type.ATTENTIVE}
                                color={TagV2Color.NEUTRAL}
                            />
                            <TagV2
                                text="Primary"
                                type={TagV2Type.ATTENTIVE}
                                color={TagV2Color.PRIMARY}
                            />
                            <TagV2
                                text="Success"
                                type={TagV2Type.ATTENTIVE}
                                color={TagV2Color.SUCCESS}
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
                            Subtle Type
                        </h4>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <TagV2
                                text="Neutral"
                                type={TagV2Type.SUBTLE}
                                color={TagV2Color.NEUTRAL}
                            />
                            <TagV2
                                text="Primary"
                                type={TagV2Type.SUBTLE}
                                color={TagV2Color.PRIMARY}
                            />
                            <TagV2
                                text="Success"
                                type={TagV2Type.SUBTLE}
                                color={TagV2Color.SUCCESS}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ARIA Pressed State */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    ARIA Pressed State (Toggle Tags)
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Toggle tags use aria-pressed to communicate their state to
                    assistive technologies.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Not Pressed"
                        color={TagV2Color.NEUTRAL}
                        type={TagV2Type.NO_FILL}
                        onClick={() => {}}
                        aria-pressed={false}
                    />
                    <TagV2
                        text="Pressed"
                        color={TagV2Color.PRIMARY}
                        type={TagV2Type.ATTENTIVE}
                        onClick={() => {}}
                        aria-pressed={true}
                    />
                    <TagV2
                        text="Mixed State"
                        color={TagV2Color.WARNING}
                        type={TagV2Type.SUBTLE}
                        onClick={() => {}}
                        aria-pressed="mixed"
                    />
                </div>
            </div>

            {/* Text Selection */}
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Text Selection
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Non-interactive tags allow text selection, while interactive
                    tags follow default button behavior.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <TagV2
                        text="Non-interactive (Selectable Text)"
                        color={TagV2Color.NEUTRAL}
                    />
                    <TagV2
                        text="Interactive (Button Behavior)"
                        color={TagV2Color.PRIMARY}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
## Accessibility Testing
This story demonstrates WCAG 2.1 Level A, AA, and AAA compliance features of the TagV2 component.
### Testing Checklist
1. **Keyboard Navigation**:
   - Tab through interactive tags
   - Press Enter or Space to activate tags with onClick handlers
   - Verify focus indicators are visible (2px solid outline with offset)
2. **Screen Reader Testing**:
   - Use VoiceOver (macOS) or NVDA (Windows)
   - Verify tag text is announced clearly
   - Verify interactive tags announce their action and role (button)
   - Verify decorative icons are not announced (aria-hidden="true")
   - Verify aria-pressed state is announced for toggle tags
3. **Color Contrast**:
   - Use WebAIM Contrast Checker or similar tool
   - Verify all tag text meets 4.5:1 contrast ratio (AA)
   - For AAA compliance, verify 7:1 contrast ratio
4. **Touch Target Size**:
   - Verify interactive tags meet 24x24px minimum (AA)
   - For AAA compliance, verify 44x44px minimum
5. **Visual Testing**:
   - Verify focus indicators are clearly visible (blue outline with shadow)
   - Verify all types maintain accessibility standards
   - Test at different zoom levels (up to 200%)
### Automated Testing
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression testing for focus states and interactions
- **Manual**: Screen reader and keyboard testing required
### WCAG Compliance Summary
- ✅ **Level A**: Fully Compliant
- ✅ **Level AA**: Fully Compliant
- ⚠️ **Level AAA**: Partial Compliance (3/4 applicable criteria)
  - Compliant: Visual Presentation (1.4.8), Keyboard No Exception (2.1.3), Change on Request (3.2.5)
  - Non-Compliant: Contrast Enhanced (1.4.6) - requires 7:1 ratio
For detailed compliance report, see Accessibility Dashboard.
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
