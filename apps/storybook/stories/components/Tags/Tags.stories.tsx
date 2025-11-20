import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import {
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    TagShape,
} from '@juspay/blend-design-system'
import {
    X,
    Check,
    AlertCircle,
    Info,
    Star,
    Heart,
    User,
    Calendar,
    Clock,
    MapPin,
    Zap,
    TrendingUp,
    Shield,
    Award,
    Flag,
    Bookmark,
    Hash,
    AtSign,
    DollarSign,
    Percent,
    Plus,
    Server,
    Database,
    Activity,
    Smartphone,
} from 'lucide-react'

// Figma Code Connect is configured in Tags.figma.tsx

const meta: Meta<typeof Tag> = {
    title: 'Components/Tags/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

A versatile tag component for labeling, categorizing, and displaying metadata with various styles, colors, and sizes.

## Features
- Multiple variants (No Fill, Attentive, Subtle)
- Six color options (Neutral, Primary, Success, Error, Warning, Purple)
- Four size options (XS, SM, MD, LG)
- Two shape options (Rounded, Squarical)
- Left and right slots for icons or custom content
- Click handler support for interactive tags
- Split tag support for grouped tags
- Responsive and accessible design

## Usage

\`\`\`tsx
import { Tag, TagVariant, TagColor, TagSize } from '@juspay/blend-design-system';

<Tag
  text="New Feature"
  variant={TagVariant.SUBTLE}
  color={TagColor.SUCCESS}
  size={TagSize.SM}
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
        variant: {
            control: 'select',
            options: Object.values(TagVariant),
            description: 'The visual variant of the tag',
        },
        color: {
            control: 'select',
            options: Object.values(TagColor),
            description: 'The color scheme of the tag',
        },
        size: {
            control: 'select',
            options: Object.values(TagSize),
            description: 'The size of the tag',
        },
        shape: {
            control: 'select',
            options: Object.values(TagShape),
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
        splitTagPosition: {
            control: 'select',
            options: [undefined, 'left', 'right'],
            description: 'Position for split tag styling (left or right)',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tag>

// Default story
export const Default: Story = {
    args: {
        text: 'Default Tag',
        variant: TagVariant.SUBTLE,
        color: TagColor.PRIMARY,
        size: TagSize.SM,
        shape: TagShape.SQUARICAL,
    },
}

// Tag Variants
export const Variants: Story = {
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
                    No Fill Variant
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="Neutral"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="Primary"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.PRIMARY}
                    />
                    <Tag
                        text="Success"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.SUCCESS}
                    />
                    <Tag
                        text="Error"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.ERROR}
                    />
                    <Tag
                        text="Warning"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Purple"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.PURPLE}
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
                    Attentive Variant
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="Neutral"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="Primary"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.PRIMARY}
                    />
                    <Tag
                        text="Success"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.SUCCESS}
                    />
                    <Tag
                        text="Error"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.ERROR}
                    />
                    <Tag
                        text="Warning"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Purple"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.PURPLE}
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
                    Subtle Variant
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="Neutral"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="Primary"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PRIMARY}
                    />
                    <Tag
                        text="Success"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.SUCCESS}
                    />
                    <Tag
                        text="Error"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.ERROR}
                    />
                    <Tag
                        text="Warning"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Purple"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PURPLE}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tag variants with all color options.',
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
                <Tag text="Extra Small" size={TagSize.XS} />
                <span style={{ fontSize: '12px', color: '#666' }}>XS</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tag text="Small" size={TagSize.SM} />
                <span style={{ fontSize: '12px', color: '#666' }}>SM</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tag text="Medium" size={TagSize.MD} />
                <span style={{ fontSize: '12px', color: '#666' }}>MD</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tag text="Large" size={TagSize.LG} />
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
                    <Tag
                        text="Squarical XS"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.XS}
                    />
                    <Tag
                        text="Squarical SM"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.SM}
                    />
                    <Tag
                        text="Squarical MD"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.MD}
                    />
                    <Tag
                        text="Squarical LG"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.LG}
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
                    <Tag
                        text="Rounded XS"
                        shape={TagShape.ROUNDED}
                        size={TagSize.XS}
                    />
                    <Tag
                        text="Rounded SM"
                        shape={TagShape.ROUNDED}
                        size={TagSize.SM}
                    />
                    <Tag
                        text="Rounded MD"
                        shape={TagShape.ROUNDED}
                        size={TagSize.MD}
                    />
                    <Tag
                        text="Rounded LG"
                        shape={TagShape.ROUNDED}
                        size={TagSize.LG}
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
                    <Tag
                        text="New"
                        color={TagColor.SUCCESS}
                        leftSlot={<Star size={12} />}
                    />
                    <Tag
                        text="Favorite"
                        color={TagColor.ERROR}
                        leftSlot={<Heart size={12} />}
                    />
                    <Tag
                        text="User"
                        color={TagColor.PRIMARY}
                        leftSlot={<User size={12} />}
                    />
                    <Tag
                        text="Scheduled"
                        color={TagColor.WARNING}
                        leftSlot={<Calendar size={12} />}
                    />
                    <Tag
                        text="Trending"
                        color={TagColor.PURPLE}
                        leftSlot={<TrendingUp size={12} />}
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
                    <Tag
                        text="Close"
                        rightSlot={<X size={12} />}
                        onClick={() => console.log('Remove tag')}
                    />
                    <Tag
                        text="Verified"
                        color={TagColor.SUCCESS}
                        rightSlot={<Check size={12} />}
                    />
                    <Tag
                        text="Protected"
                        color={TagColor.PRIMARY}
                        rightSlot={<Shield size={12} />}
                    />
                    <Tag
                        text="Premium"
                        color={TagColor.WARNING}
                        rightSlot={<Award size={12} />}
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
                    <Tag
                        text="Location"
                        leftSlot={<MapPin size={12} />}
                        rightSlot={<X size={12} />}
                        onClick={() => console.log('Remove location tag')}
                    />
                    <Tag
                        text="Priority"
                        color={TagColor.ERROR}
                        leftSlot={<Flag size={12} />}
                        rightSlot={<AlertCircle size={12} />}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tags with icons in different positions for enhanced visual communication.',
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
                                <Tag
                                    key={tag}
                                    text={tag}
                                    variant={
                                        selectedTags.includes(tag)
                                            ? TagVariant.ATTENTIVE
                                            : TagVariant.NO_FILL
                                    }
                                    color={
                                        selectedTags.includes(tag)
                                            ? TagColor.PRIMARY
                                            : TagColor.NEUTRAL
                                    }
                                    leftSlot={
                                        selectedTags.includes(tag) ? (
                                            <Check size={12} />
                                        ) : null
                                    }
                                    onClick={() => toggleTag(tag)}
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
                story: 'Interactive tags that can be selected/deselected with visual feedback.',
            },
        },
    },
}

// Split Tags
export const SplitTags: Story = {
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
                    Split Tag Groups
                </h3>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex' }}>
                        <Tag
                            text="Version"
                            color={TagColor.NEUTRAL}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="2.0.0"
                            color={TagColor.PRIMARY}
                            splitTagPosition="right"
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Tag
                            text="Status"
                            color={TagColor.NEUTRAL}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="Active"
                            color={TagColor.SUCCESS}
                            splitTagPosition="right"
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Tag
                            text="Priority"
                            color={TagColor.NEUTRAL}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="High"
                            color={TagColor.ERROR}
                            splitTagPosition="right"
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Split tags for displaying key-value pairs or related information.',
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
                    E-commerce Product Tags
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="New Arrival"
                        color={TagColor.SUCCESS}
                        leftSlot={<Zap size={12} />}
                    />
                    <Tag
                        text="Best Seller"
                        color={TagColor.WARNING}
                        leftSlot={<Star size={12} />}
                    />
                    <Tag
                        text="Limited Edition"
                        color={TagColor.PURPLE}
                        leftSlot={<Award size={12} />}
                    />
                    <Tag
                        text="50% OFF"
                        color={TagColor.ERROR}
                        variant={TagVariant.ATTENTIVE}
                        leftSlot={<Percent size={12} />}
                    />
                    <Tag
                        text="Free Shipping"
                        color={TagColor.PRIMARY}
                        leftSlot={<DollarSign size={12} />}
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
                    Blog Post Tags
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="Tutorial"
                        size={TagSize.SM}
                        leftSlot={<Bookmark size={12} />}
                    />
                    <Tag
                        text="5 min read"
                        size={TagSize.SM}
                        leftSlot={<Clock size={12} />}
                    />
                    <Tag
                        text="JavaScript"
                        size={TagSize.SM}
                        leftSlot={<Hash size={12} />}
                    />
                    <Tag
                        text="Web Development"
                        size={TagSize.SM}
                        leftSlot={<Hash size={12} />}
                    />
                    <Tag
                        text="@john_doe"
                        size={TagSize.SM}
                        color={TagColor.PRIMARY}
                        leftSlot={<AtSign size={12} />}
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
                    Task Management
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="To Do"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="In Progress"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Review"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PURPLE}
                    />
                    <Tag
                        text="Done"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.SUCCESS}
                        leftSlot={<Check size={12} />}
                    />
                    <Tag
                        text="Blocked"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.ERROR}
                        leftSlot={<X size={12} />}
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
                    User Roles & Permissions
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="Admin"
                        color={TagColor.ERROR}
                        leftSlot={<Shield size={12} />}
                    />
                    <Tag
                        text="Moderator"
                        color={TagColor.WARNING}
                        leftSlot={<User size={12} />}
                    />
                    <Tag
                        text="Editor"
                        color={TagColor.PRIMARY}
                        leftSlot={<User size={12} />}
                    />
                    <Tag
                        text="Viewer"
                        color={TagColor.NEUTRAL}
                        leftSlot={<User size={12} />}
                    />
                    <Tag
                        text="Guest"
                        variant={TagVariant.NO_FILL}
                        leftSlot={<User size={12} />}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common tag usage patterns in real-world applications.',
            },
        },
    },
}

// Size and Icon Combinations
export const SizeAndIconCombinations: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.values(TagSize).map((size) => (
                <div
                    key={size}
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
                            width: '30px',
                        }}
                    >
                        {size.toUpperCase()}
                    </span>
                    <Tag text="Default" size={size} />
                    <Tag
                        text="With Icon"
                        size={size}
                        leftSlot={
                            <Star
                                size={
                                    size === TagSize.XS
                                        ? 10
                                        : size === TagSize.SM
                                          ? 12
                                          : size === TagSize.MD
                                            ? 14
                                            : 16
                                }
                            />
                        }
                    />
                    <Tag
                        text="Both Icons"
                        size={size}
                        leftSlot={
                            <Info
                                size={
                                    size === TagSize.XS
                                        ? 10
                                        : size === TagSize.SM
                                          ? 12
                                          : size === TagSize.MD
                                            ? 14
                                            : 16
                                }
                            />
                        }
                        rightSlot={
                            <X
                                size={
                                    size === TagSize.XS
                                        ? 10
                                        : size === TagSize.SM
                                          ? 12
                                          : size === TagSize.MD
                                            ? 14
                                            : 16
                                }
                            />
                        }
                    />
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tag sizes with appropriately sized icons.',
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
                    Tag Component Showcase
                </h3>
                <p style={{ marginBottom: '24px', color: '#666' }}>
                    A comprehensive display of all tag variations, sizes, and
                    use cases.
                </p>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                }}
            >
                {/* Variant Grid */}
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
                        Variants × Colors
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        {Object.values(TagVariant).map((variant) => (
                            <div
                                key={variant}
                                style={{
                                    display: 'flex',
                                    gap: '4px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {Object.values(TagColor).map((color) => (
                                    <Tag
                                        key={`${variant}-${color}`}
                                        text={
                                            color.charAt(0).toUpperCase() +
                                            color.slice(1).toLowerCase()
                                        }
                                        variant={variant}
                                        color={color}
                                        size={TagSize.SM}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Example */}
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
                        Interactive Filter Tags
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            gap: '6px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Tag
                            text="All"
                            variant={TagVariant.ATTENTIVE}
                            color={TagColor.PRIMARY}
                            onClick={() => {}}
                        />
                        <Tag
                            text="Active"
                            leftSlot={<Check size={12} />}
                            onClick={() => {}}
                        />
                        <Tag text="Pending" onClick={() => {}} />
                        <Tag text="Archived" onClick={() => {}} />
                        <Tag
                            text="Clear Filters"
                            variant={TagVariant.NO_FILL}
                            color={TagColor.NEUTRAL}
                            rightSlot={<X size={12} />}
                            onClick={() => {}}
                        />
                    </div>
                </div>

                {/* Status Tags */}
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
                        <Tag
                            text="Online"
                            color={TagColor.SUCCESS}
                            leftSlot={
                                <div
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: '#10b981',
                                    }}
                                />
                            }
                        />
                        <Tag
                            text="Away"
                            color={TagColor.WARNING}
                            leftSlot={
                                <div
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: '#f59e0b',
                                    }}
                                />
                            }
                        />
                        <Tag
                            text="Do Not Disturb"
                            color={TagColor.ERROR}
                            leftSlot={
                                <div
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: '#ef4444',
                                    }}
                                />
                            }
                        />
                        <Tag
                            text="Offline"
                            color={TagColor.NEUTRAL}
                            leftSlot={
                                <div
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: '#6b7280',
                                    }}
                                />
                            }
                        />
                    </div>
                </div>

                {/* Metadata Tags */}
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
                        Metadata Display
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <Tag
                                text="v2.1.0"
                                size={TagSize.XS}
                                variant={TagVariant.NO_FILL}
                            />
                            <Tag
                                text="MIT License"
                                size={TagSize.XS}
                                variant={TagVariant.NO_FILL}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <Tag
                                text="2.3MB"
                                size={TagSize.XS}
                                leftSlot={<DollarSign size={10} />}
                            />
                            <Tag
                                text="Updated 2d ago"
                                size={TagSize.XS}
                                leftSlot={<Clock size={10} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive showcase demonstrating the versatility and various use cases of the Tag component.',
            },
        },
    },
}

// Edge Cases and Accessibility
export const EdgeCases: Story = {
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
                    Text Length Variations
                </h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}
                >
                    <Tag text="A" size={TagSize.SM} />
                    <Tag text="Short" size={TagSize.SM} />
                    <Tag text="Medium length tag" size={TagSize.SM} />
                    <Tag
                        text="Very long tag that demonstrates text wrapping behavior and layout considerations"
                        size={TagSize.SM}
                        style={{ maxWidth: '200px' }}
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
                    Special Characters and Unicode
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag text="🎉 Celebration" leftSlot={<Star size={12} />} />
                    <Tag text="Café & Résumé" color={TagColor.PURPLE} />
                    <Tag text="数据分析" color={TagColor.PRIMARY} />
                    <Tag text="α/β Testing" color={TagColor.SUCCESS} />
                    <Tag text="<script/> Safe" color={TagColor.ERROR} />
                    <Tag text="100% Success" leftSlot={<Percent size={12} />} />
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
                    High Contrast & Accessibility
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        text="High Contrast"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.NEUTRAL}
                        size={TagSize.MD}
                    />
                    <Tag
                        text="Screen Reader"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.ERROR}
                        size={TagSize.MD}
                        aria-label="Important error tag for screen readers"
                    />
                    <Tag
                        text="Focus Visible"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PRIMARY}
                        size={TagSize.MD}
                        onClick={() => {}}
                        style={{
                            outline: '2px solid #3b82f6',
                            outlineOffset: '2px',
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
                    Dense Layout Performance
                </h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '4px',
                        flexWrap: 'wrap',
                        maxWidth: '600px',
                    }}
                >
                    {Array.from({ length: 50 }, (_, i) => (
                        <Tag
                            key={i}
                            text={`Tag ${i + 1}`}
                            size={TagSize.XS}
                            color={
                                [
                                    TagColor.PRIMARY,
                                    TagColor.SUCCESS,
                                    TagColor.WARNING,
                                    TagColor.ERROR,
                                    TagColor.PURPLE,
                                    TagColor.NEUTRAL,
                                ][i % 6]
                            }
                            variant={
                                [
                                    TagVariant.SUBTLE,
                                    TagVariant.NO_FILL,
                                    TagVariant.ATTENTIVE,
                                ][i % 3]
                            }
                        />
                    ))}
                </div>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginTop: '8px',
                    }}
                >
                    50 tags to test performance and layout with dense content
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Edge cases including text length variations, special characters, accessibility features, and performance with many tags.',
            },
        },
    },
}

// Advanced Interactive Patterns
export const AdvancedInteractivePatterns: Story = {
    render: () => {
        const AdvancedInteractiveComponent = () => {
            const [selectedCategories, setSelectedCategories] = React.useState([
                'frontend',
            ])
            const [searchTags, setSearchTags] = React.useState([
                'react',
                'javascript',
            ])
            const [filterMode, setFilterMode] = React.useState<
                'inclusive' | 'exclusive'
            >('inclusive')

            const categories = [
                {
                    id: 'frontend',
                    label: 'Frontend',
                    color: TagColor.PRIMARY,
                    icon: <User size={12} />,
                },
                {
                    id: 'backend',
                    label: 'Backend',
                    color: TagColor.SUCCESS,
                    icon: <Server size={12} />,
                },
                {
                    id: 'database',
                    label: 'Database',
                    color: TagColor.WARNING,
                    icon: <Database size={12} />,
                },
                {
                    id: 'devops',
                    label: 'DevOps',
                    color: TagColor.ERROR,
                    icon: <Activity size={12} />,
                },
                {
                    id: 'mobile',
                    label: 'Mobile',
                    color: TagColor.PURPLE,
                    icon: <Smartphone size={12} />,
                },
            ]

            const availableTags = [
                'react',
                'vue',
                'angular',
                'javascript',
                'typescript',
                'python',
                'java',
                'docker',
                'kubernetes',
            ]

            const toggleCategory = (categoryId: string) => {
                setSelectedCategories((prev) =>
                    prev.includes(categoryId)
                        ? prev.filter((id) => id !== categoryId)
                        : [...prev, categoryId]
                )
            }

            const removeSearchTag = (tag: string) => {
                setSearchTags((prev) => prev.filter((t) => t !== tag))
            }

            const addSearchTag = (tag: string) => {
                if (!searchTags.includes(tag)) {
                    setSearchTags((prev) => [...prev, tag])
                }
            }

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxWidth: '800px',
                    }}
                >
                    {/* Category Selection */}
                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            Select Categories (Multi-select)
                        </h4>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {categories.map((category) => (
                                <Tag
                                    key={category.id}
                                    text={category.label}
                                    color={category.color}
                                    variant={
                                        selectedCategories.includes(category.id)
                                            ? TagVariant.ATTENTIVE
                                            : TagVariant.NO_FILL
                                    }
                                    leftSlot={category.icon}
                                    rightSlot={
                                        selectedCategories.includes(
                                            category.id
                                        ) ? (
                                            <Check size={12} />
                                        ) : null
                                    }
                                    onClick={() => toggleCategory(category.id)}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        transform: selectedCategories.includes(
                                            category.id
                                        )
                                            ? 'scale(1.05)'
                                            : 'scale(1)',
                                    }}
                                />
                            ))}
                        </div>
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                margin: '8px 0 0 0',
                            }}
                        >
                            Selected:{' '}
                            {selectedCategories.length > 0
                                ? selectedCategories.join(', ')
                                : 'None'}
                        </p>
                    </div>

                    {/* Search Tags with Add/Remove */}
                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            Search Tags (Removable)
                        </h4>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                                marginBottom: '12px',
                            }}
                        >
                            {searchTags.map((tag) => (
                                <Tag
                                    key={tag}
                                    text={tag}
                                    color={TagColor.PRIMARY}
                                    variant={TagVariant.SUBTLE}
                                    leftSlot={<Hash size={12} />}
                                    rightSlot={<X size={12} />}
                                    onClick={() => removeSearchTag(tag)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                            {searchTags.length === 0 && (
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: '#666',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    No search tags active
                                </span>
                            )}
                        </div>

                        <div>
                            <h5
                                style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '12px',
                                    color: '#666',
                                }}
                            >
                                Add Tags:
                            </h5>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '6px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {availableTags
                                    .filter((tag) => !searchTags.includes(tag))
                                    .map((tag) => (
                                        <Tag
                                            key={tag}
                                            text={tag}
                                            size={TagSize.XS}
                                            variant={TagVariant.NO_FILL}
                                            color={TagColor.NEUTRAL}
                                            rightSlot={<Plus size={10} />}
                                            onClick={() => addSearchTag(tag)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Filter Mode Toggle */}
                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            Filter Mode
                        </h4>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Tag
                                text="Inclusive (OR)"
                                color={TagColor.SUCCESS}
                                variant={
                                    filterMode === 'inclusive'
                                        ? TagVariant.ATTENTIVE
                                        : TagVariant.NO_FILL
                                }
                                leftSlot={<Check size={12} />}
                                onClick={() => setFilterMode('inclusive')}
                                style={{ cursor: 'pointer' }}
                            />
                            <Tag
                                text="Exclusive (AND)"
                                color={TagColor.ERROR}
                                variant={
                                    filterMode === 'exclusive'
                                        ? TagVariant.ATTENTIVE
                                        : TagVariant.NO_FILL
                                }
                                leftSlot={<X size={12} />}
                                onClick={() => setFilterMode('exclusive')}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                        }}
                    >
                        <h4
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            Current Filters Summary
                        </h4>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            <div>
                                Categories:{' '}
                                {selectedCategories.length > 0
                                    ? selectedCategories.join(', ')
                                    : 'All'}
                            </div>
                            <div>
                                Tags:{' '}
                                {searchTags.length > 0
                                    ? searchTags.join(', ')
                                    : 'None'}
                            </div>
                            <div>
                                Mode:{' '}
                                {filterMode === 'inclusive'
                                    ? 'Show items matching ANY tag'
                                    : 'Show items matching ALL tags'}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return <AdvancedInteractiveComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Advanced interactive patterns including multi-select categories, removable search tags, and filter mode toggles.',
            },
        },
    },
}
