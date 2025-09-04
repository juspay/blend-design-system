import type { Meta, StoryObj } from '@storybook/react'
import {
    Card,
    CardVariant,
    CardAlignment,
    Tag,
    TagColor,
    TagVariant,
    TagSize,
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '@juspay/blend-design-system'
import {
    Star,
    Settings,
    User,
    TrendingUp,
    MoreHorizontal,
    Calendar,
} from 'lucide-react'

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Card Component

The Card component supports three main variants:

## Variants

### Default Card
- **Header Box**: Gray 25 background with headerSlot1, headerTitle, headerTag, headerSlot2
- **Sub Header**: Below header title and tag only
- **Body Content**: bodySlot1, bodyTitle, content, bodySlot2, actionButton
- **All slots available**: Complete flexibility with all slot options

### Aligned Card  
- **CardSlot**: Positioned based on alignment (vertical/horizontal)
- **Center Align**: Optional centering of content
- **Limited slots**: No headerSlot1 or bodySlot2
- **Flexible layout**: Perfect for image cards, profiles, or horizontal layouts

### Custom Card
- **Simple wrapper**: Just 16px padding
- **Complete control**: Pass any React element as children
- **Creative freedom**: Build custom layouts without constraints

## Key Features
- **Responsive design** with token-based styling
- **Hover effects** with smooth transitions  
- **Accessibility support** with proper ARIA attributes
- **Flexible content** with multiple slot options
                `,
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: [
                CardVariant.DEFAULT,
                CardVariant.ALIGNED,
                CardVariant.CUSTOM,
            ],
            description: 'Card variant type',
        },
        alignment: {
            control: { type: 'select' },
            options: [CardAlignment.VERTICAL, CardAlignment.HORIZONTAL],
            description:
                'Alignment for aligned cards (only applies to ALIGNED variant)',
            if: { arg: 'variant', eq: CardVariant.ALIGNED },
        },
        centerAlign: {
            control: { type: 'boolean' },
            description:
                'Center align content (only applies to ALIGNED variant)',
            if: { arg: 'variant', eq: CardVariant.ALIGNED },
        },
        maxWidth: {
            control: { type: 'text' },
            description: 'Maximum width of the card',
        },
        className: {
            control: { type: 'text' },
            description: 'Additional CSS class names',
        },
    },
}

export default meta
type Story = StoryObj<typeof Card>

// Helper components for slots
const iconSlot = (
    <div
        style={{
            width: '28px',
            height: '28px',
            background: '#f0f9ff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0f2fe',
        }}
    >
        <TrendingUp size={16} color="#0ea5e9" />
    </div>
)

const imageSlot = (
    <div
        style={{
            width: '100%',
            height: '120px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '8px',
        }}
    >
        Image Placeholder
    </div>
)

const avatarSlot = (
    <div
        style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
        }}
    >
        JD
    </div>
)

// Default Card Stories
export const DefaultCard: Story = {
    args: {
        headerSlot1: (
            <div
                style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Star size={14} color="white" />
            </div>
        ),
        headerTitle: 'Analytics Dashboard',
        headerTag: (
            <Tag
                text="Pro"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.SUCCESS}
                size={TagSize.SM}
            />
        ),
        headerSlot2: (
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={<Settings size={16} />}
            />
        ),
        subHeader: 'Real-time performance metrics and insights',
        bodySlot1: (
            <div
                style={{
                    padding: '12px',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '8px',
                    border: '1px solid #e0f2fe',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <TrendingUp size={16} color="#0ea5e9" />
                    <span
                        style={{
                            fontSize: '14px',
                            color: '#0ea5e9',
                            fontWeight: '600',
                        }}
                    >
                        Performance is up 23% this month
                    </span>
                </div>
            </div>
        ),
        bodyTitle: 'Monthly Summary',
        content:
            'Track your key metrics and performance indicators with comprehensive analytics and real-time data visualization.',
        bodySlot2: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#10b981',
                        }}
                    >
                        92%
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Success Rate
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#3b82f6',
                        }}
                    >
                        $12.5K
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Revenue
                    </div>
                </div>
            </div>
        ),
        actionButton: {
            text: 'View Full Report',
            buttonType: ButtonType.PRIMARY,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Default card with all available slots: headerSlot1, headerTitle, headerTag, headerSlot2, subHeader, bodySlot1, bodyTitle, content, bodySlot2, and actionButton.',
            },
        },
    },
}

export const DefaultCardMinimal: Story = {
    args: {
        headerTitle: 'Simple Card',
        headerSlot2: (
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={<MoreHorizontal size={16} />}
            />
        ),
        bodyTitle: 'Basic Example',
        content:
            'This shows a minimal default card with just the essential elements.',
        actionButton: {
            text: 'Learn More',
            buttonType: ButtonType.SECONDARY,
            subType: ButtonSubType.INLINE,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Minimal default card showing only essential elements without all the optional slots.',
            },
        },
    },
}

// Aligned Card Stories
export const AlignedCardVerticalCentered: Story = {
    args: {
        variant: CardVariant.ALIGNED,
        alignment: CardAlignment.VERTICAL,
        centerAlign: true,
        cardSlot: avatarSlot,
        headerTitle: 'Profile Card',
        headerTag: (
            <Tag
                text="Premium"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.SUCCESS}
                size={TagSize.SM}
            />
        ),
        subHeader: 'Centered vertical layout',
        bodyTitle: 'John Doe',
        content: 'Senior Developer with expertise in React and Node.js.',
        actionButton: {
            text: 'View Profile',
            buttonType: ButtonType.SECONDARY,
            subType: ButtonSubType.INLINE,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical aligned card with center alignment. CardSlot is centered at the top, content is centered below with proper padding.',
            },
        },
    },
}

export const AlignedCardVertical: Story = {
    args: {
        variant: CardVariant.ALIGNED,
        alignment: CardAlignment.VERTICAL,
        centerAlign: false,
        cardSlot: imageSlot,
        headerTitle: 'Image Card',
        subHeader: 'Standard vertical alignment',
        bodyTitle: 'Beautiful Gradient',
        content:
            'This card showcases vertical alignment without center alignment, perfect for image-heavy content.',
        actionButton: {
            text: 'View Gallery',
            buttonType: ButtonType.SECONDARY,
            subType: ButtonSubType.INLINE,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical aligned card without center alignment. CardSlot at top, content below with left alignment.',
            },
        },
    },
}

export const AlignedCardHorizontal: Story = {
    args: {
        variant: CardVariant.ALIGNED,
        alignment: CardAlignment.HORIZONTAL,
        centerAlign: false,
        cardSlot: (
            <div
                style={{
                    width: '28px',
                    height: '28px',
                    background: '#f0f9ff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e0f2fe',
                }}
            >
                <TrendingUp size={16} color="#0ea5e9" />
            </div>
        ),
        headerTitle: 'New App Launch',
        headerSlot2: (
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                leadingIcon={<MoreHorizontal size={16} />}
            />
        ),
        subHeader: 'Description (max 1-2 lines)',
        content:
            'Lorem ipsum dolor sit amet consectetur. Suscipit at dolor morbi adipiscing.',
        actionButton: {
            text: 'Send Message',
            buttonType: ButtonType.PRIMARY,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Horizontal aligned card with cardSlot on the left and content on the right side-by-side.',
            },
        },
    },
}

export const AlignedCardHorizontalCentered: Story = {
    args: {
        variant: CardVariant.ALIGNED,
        alignment: CardAlignment.HORIZONTAL,
        centerAlign: true,
        cardSlot: (
            <div
                style={{
                    width: '28px',
                    height: '28px',
                    background:
                        'linear-gradient(135deg, #c084fc 0%, #e879f9 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '16px',
                        height: '16px',
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '4px',
                    }}
                />
            </div>
        ),
        headerTitle: 'Customize Board',
        headerTag: (
            <Tag
                text="NEW"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.SUCCESS}
                size={TagSize.SM}
            />
        ),
        subHeader: 'Description (max 1-2 lines)',
        content:
            'Lorem ipsum dolor sit amet consectetur. Suscipit at dolor morbi adipiscing dispiscing...',
        actionButton: {
            text: 'Latest Feature',
            buttonType: ButtonType.SECONDARY,
            subType: ButtonSubType.INLINE,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Horizontal aligned card with center alignment. CardSlot on left, content on right with centered text.',
            },
        },
    },
}

export const AlignedCardNoCardSlot: Story = {
    args: {
        variant: CardVariant.ALIGNED,
        alignment: CardAlignment.VERTICAL,
        centerAlign: false,
        headerTitle: 'No CardSlot',
        headerTag: (
            <Tag
                text="Full Space"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.SM}
            />
        ),
        subHeader: 'Header and body take full card space with 16px padding',
        bodyTitle: 'Full Width Content',
        content:
            'When no cardSlot is provided, the header and body content take the full card space with proper 16px padding throughout.',
        actionButton: {
            text: 'Learn More',
            buttonType: ButtonType.SECONDARY,
            subType: ButtonSubType.INLINE,
            size: ButtonSize.SMALL,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Aligned card without cardSlot. Content takes the full card space with proper padding.',
            },
        },
    },
}

// Custom Card Stories
export const CustomCardDashboard: Story = {
    args: {
        variant: CardVariant.CUSTOM,
        children: (
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        Custom Dashboard
                    </h3>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        leadingIcon={<Calendar size={16} />}
                    />
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '16px',
                            backgroundColor: '#f0f9ff',
                            borderRadius: '8px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#3b82f6',
                            }}
                        >
                            142
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            Total Users
                        </div>
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '16px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '8px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#10b981',
                            }}
                        >
                            89%
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            Success Rate
                        </div>
                    </div>
                </div>
                <Button
                    text="View Analytics"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                />
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Custom card with complete creative control. Shows a dashboard layout with metrics and custom styling.',
            },
        },
    },
}

export const CustomCardForm: Story = {
    args: {
        variant: CardVariant.CUSTOM,
        children: (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    Quick Contact
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Your name"
                        style={{
                            padding: '12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Your email"
                        style={{
                            padding: '12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    />
                    <textarea
                        placeholder="Your message"
                        rows={3}
                        style={{
                            padding: '12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical',
                        }}
                    />
                </div>
                <Button
                    text="Send Message"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                />
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Custom card with a contact form. Demonstrates how to create completely custom layouts within the card wrapper.',
            },
        },
    },
}

export const CustomCardProfile: Story = {
    args: {
        variant: CardVariant.CUSTOM,
        children: (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                    }}
                >
                    <User size={32} color="white" />
                </div>
                <div>
                    <h3
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        Custom Profile
                    </h3>
                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                        This is a custom card where you have complete control
                        over the content. Just 16px padding wrapper!
                    </p>
                </div>
                <Button
                    text="Custom Action"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                />
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Custom card with a profile layout. Shows how to create centered content with custom styling.',
            },
        },
    },
}

// Interactive Playground
export const Playground: Story = {
    args: {
        variant: CardVariant.DEFAULT,
        headerTitle: 'Interactive Card',
        headerTag: (
            <Tag
                text="Demo"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PRIMARY}
                size={TagSize.SM}
            />
        ),
        subHeader:
            'Use the controls to experiment with different configurations',
        bodyTitle: 'Playground',
        content:
            'This is the interactive playground where you can test different card configurations and see how they behave.',
        actionButton: {
            text: 'Test Action',
            buttonType: ButtonType.PRIMARY,
            size: ButtonSize.SMALL,
        },
        maxWidth: '400px',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to test different card configurations. Use the controls panel to experiment with various props and see real-time changes.',
            },
        },
    },
}
