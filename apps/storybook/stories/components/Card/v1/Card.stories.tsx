import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
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
    Theme,
    ThemeProvider,
} from '@juspay/blend-design-system'
import {
    Star,
    Settings,
    TrendingUp,
    MoreHorizontal,
    Calendar,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A flexible container component that supports three distinct variants, each optimized for different use cases and content types.',
        docs: {
            description: {
                component: `
## Usage 
\`\`\`tsx
import { Card, ButtonType, ButtonSize } from '@juspay/blend-design-system';

<Card
  headerTitle="Analytics Dashboard"
  headerTag={<Tag text="Pro" color="success" />}
  subHeader="Real-time performance metrics and insights"
  bodyTitle="Monthly Summary"
  content="Track your key metrics and performance indicators with comprehensive analytics."
  actionButton={{
    text: "View Full Report",
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.SMALL
  }}
/>
\`\`\`

## Features

- **Three distinct variants**  Default, Aligned, and Custom for maximum flexibility
- **Responsive design** with token-based styling system
- **Hover effects** with smooth transitions and visual feedback
- **Accessibility support** with proper ARIA attributes and keyboard navigation
- **Flexible content slots** for complex layouts and content organization
- **Automatic spacing** and consistent visual hierarchy
- **Built-in action support** with integrated button handling


## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible interactive elements (buttons, links)
- Screen reader support (VoiceOver/NVDA)
- Proper semantic structure and heading hierarchy
- Focus indicators visible on all interactive elements
- Touch targets meet Level AA requirement (24x24px minimum)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker

## Variants

### Default Card (\`variant?: CardVariant.DEFAULT\`)

The Default Card provides a structured layout with distinct header and body sections, perfect for data displays, dashboards, and content cards.

**Structure:**
- **Header Section**: Gray background container with flexible slot system
- **Sub Header**: Descriptive text positioned below header title and tag
- **Body Section**: Main content area with multiple customizable slots
- **Action Area**: Dedicated space for primary actions

**Available Slots:**
- \`headerSlot1\` - Leading content in header (icons, avatars, status indicators)
- \`headerTitle\` - Main header text/title
- \`headerTag\` - Status tags, badges, or category labels
- \`headerSlot2\` - Trailing content in header (buttons, menu actions)
- \`subHeader\` - Descriptive text below header title and tag
- \`bodySlot1\` - Custom content above body title (alerts, notifications)
- \`bodyTitle\` - Main body heading
- \`content\` - Primary body content (descriptions, details)
- \`bodySlot2\` - Custom content below main content (metrics, statistics)
- \`actionButton\` - Primary action button with full ButtonProps support

### Aligned Card (\`variant: CardVariant.ALIGNED\`)

The Aligned Card offers flexible positioning of content with a dedicated card slot, ideal for image cards, profiles, and media-rich content.

**Layout Options:**
- **Vertical Alignment** (\`CardAlignment.VERTICAL\`): Content flows vertically with card slot above text
- **Horizontal Alignment** (\`CardAlignment.HORIZONTAL\`): Card slot and content positioned side-by-side
- **Center Alignment** (\`centerAlign: boolean\`): Optional content centering for both layouts

**Available Props:**
- \`cardSlot\` - Flexible content area (images, icons, avatars, graphics)
- \`alignment\` - VERTICAL or HORIZONTAL layout direction
- \`centerAlign\` - Boolean for content centering
- \`headerTitle\`, \`headerTag\`, \`headerSlot2\` - Header content (no headerSlot1)
- \`subHeader\` - Descriptive text
- \`bodySlot1\`, \`bodyTitle\`, \`content\` - Body content (no bodySlot2)
- \`actionButton\` - Primary action button

### Custom Card (\`variant: CardVariant.CUSTOM\`)

The Custom Card provides complete creative control with minimal constraints - just a 16px padding wrapper and card styling.

**Use Cases:**
- Dashboard metrics and KPIs with custom layouts
- Forms and interactive content with unique arrangements
- Complex content that doesn't fit standard patterns
- Creative layouts requiring full design control

**Available Props:**
- \`children\` - Complete custom content with full React element support


### Aligned Card with Profile Layout
\`\`\`tsx
import { Card, CardVariant, CardAlignment } from '@juspay/blend-design-system';

<Card
  variant={CardVariant.ALIGNED}
  alignment={CardAlignment.VERTICAL}
  centerAlign={true}
  cardSlot={<Avatar src="/profile.jpg" alt="Profile" size="large" />}
  headerTitle="John Doe"
  headerTag={<Tag text="Premium" color="success" />}
  content="Senior Developer with expertise in React and Node.js."
  actionButton={{
    text: "View Profile",
    buttonType: ButtonType.SECONDARY,
    size: ButtonSize.SMALL
  }}
/>
\`\`\`

### Custom Dashboard Card
\`\`\`tsx
import { Card, CardVariant, Button } from '@juspay/blend-design-system';

<Card variant={CardVariant.CUSTOM}>
  <div className="flex flex-col gap-4">
    <h3>Custom Dashboard</h3>
    <div className="grid grid-cols-2 gap-3">
      <MetricCard value="142" label="Total Users" />
      <MetricCard value="89%" label="Success Rate" />
    </div>
    <Button text="View Analytics" buttonType={ButtonType.PRIMARY} />
  </div>
</Card>
\`\`\`

## Design Guidelines

### When to Use Each Variant

**Default Card:**
- Standard content layouts with clear header/body structure
- Data displays, dashboards, and informational content
- When you need multiple organized content slots
- Content that follows consistent information hierarchy

**Aligned Card:**
- Profile cards and user information displays
- Image-heavy content and media cards
- Side-by-side layouts and compact arrangements
- When visual content (images, icons) is primary

**Custom Card:**
- Unique layouts that don't fit standard patterns
- Complex dashboard components with custom metrics
- Forms and interactive content requiring specific arrangements
- When you need complete creative control over layout

### Content Organization Best Practices

1. **Information Hierarchy**: Use headerTitle → subHeader → bodyTitle → content flow for clarity
2. **Visual Balance**: Distribute content across slots to avoid visual clustering
3. **Action Placement**: Use actionButton for primary actions to maintain consistency
4. **Slot Usage**: Leverage appropriate slots based on content type and importance
5. **Responsive Considerations**: Ensure content adapts gracefully across screen sizes


## Technical Specifications

### Props Interface
\`\`\`typescript
type CardProps = {
  className?: string
  maxWidth?: string
} & (DefaultCardProps | AlignedCardProps | CustomCardProps)

// Default Card Props
type DefaultCardProps = {
  variant?: CardVariant.DEFAULT
  headerSlot1?: ReactNode
  headerTitle?: string
  headerTag?: ReactNode
  headerSlot2?: ReactNode
  subHeader?: string
  bodySlot1?: ReactNode
  bodyTitle?: string
  content?: ReactNode
  bodySlot2?: ReactNode
  actionButton?: ButtonProps
}

// Aligned Card Props  
type AlignedCardProps = {
  variant: CardVariant.ALIGNED
  alignment: CardAlignment
  centerAlign?: boolean
  cardSlot?: ReactNode
  headerTitle?: string
  headerTag?: ReactNode
  headerSlot2?: ReactNode
  subHeader?: string
  bodySlot1?: ReactNode
  bodyTitle?: string
  content?: ReactNode
  actionButton?: ButtonProps
}

// Custom Card Props
type CustomCardProps = {
  variant: CardVariant.CUSTOM
  children: ReactNode
}
\`\`\`

### Enums
\`\`\`typescript
enum CardVariant {
  DEFAULT = 'default',
  ALIGNED = 'aligned', 
  CUSTOM = 'custom'
}

enum CardAlignment {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}
\`\`\`
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
        maxHeight: {
            control: { type: 'text' },
            description: 'Maximum height of the card',
        },
        minHeight: {
            control: { type: 'text' },
            description: 'Minimum height of the card',
        },
        className: {
            control: { type: 'text' },
            description: 'Additional CSS class names',
        },
        headerSlot1: {
            control: false,
            description:
                'Leading content in header (icons, avatars, status indicators). Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Header Slots',
            },
        },
        headerTitle: {
            control: { type: 'text' },
            description: 'Main header text/title',
        },
        headerTag: {
            control: false,
            description:
                'Status tags, badges, or category labels in header. Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Header Slots',
            },
        },
        headerSlot2: {
            control: false,
            description:
                'Trailing content in header (buttons, menu actions). Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Header Slots',
            },
        },
        subHeader: {
            control: { type: 'text' },
            description:
                'Descriptive text positioned below header title and tag',
        },
        bodySlot1: {
            control: false,
            description:
                'Custom content above body title (alerts, notifications). Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Body Slots',
            },
        },
        bodyTitle: {
            control: { type: 'text' },
            description: 'Main body heading',
        },
        content: {
            control: { type: 'text' },
            description: 'Primary body content (descriptions, details)',
        },
        bodySlot2: {
            control: false,
            description:
                'Custom content below main content (metrics, statistics). Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Body Slots',
            },
        },
        actionButton: {
            control: { type: 'object' },
            description:
                'Primary action button configuration with full ButtonProps support',
            table: {
                type: {
                    summary: 'ButtonProps',
                    detail: `{
  text: string;
  buttonType?: ButtonType;
  size?: ButtonSize;
  subType?: ButtonSubType;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}`,
                },
                category: 'Actions',
            },
        },
        cardSlot: {
            control: false,
            description:
                'Flexible content area for images, icons, avatars, graphics (ALIGNED variant only). Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Aligned Card',
            },
            if: { arg: 'variant', eq: CardVariant.ALIGNED },
        },
        skeleton: {
            control: { type: 'object' },
            description:
                'Skeleton loading state configuration with show and variant properties',
            table: {
                type: {
                    summary: 'SkeletonConfig',
                    detail: `{
  show: boolean;           // Whether to show skeleton loading state
  variant?: 'pulse' | 'wave';  // Animation style (default: 'pulse')
}`,
                },
                category: 'State',
            },
        },
        children: {
            control: false,
            description:
                'Complete custom content with full React element support (CUSTOM variant only). Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Custom Card',
            },
            if: { arg: 'variant', eq: CardVariant.CUSTOM },
        },
    },
    tags: ['autodocs'],
} as Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

// Helper components for slots
const iconSlot = (
    <div className="w-7 h-7 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100">
        <TrendingUp size={16} className="text-sky-500" />
    </div>
)

const imageSlot = (
    <div className="w-full h-30 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold rounded-lg">
        Image Placeholder
    </div>
)

const avatarSlot = (
    <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
        JD
    </div>
)

// Default Card Stories
export const DefaultCard: Story = {
    args: {
        headerSlot1: (
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <Star size={14} className="text-white" />
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
            <div className="p-3 bg-sky-50 rounded-lg border border-sky-100">
                <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-sky-500" />
                    <span className="text-sm text-sky-500 font-semibold font-manrope">
                        Performance is up 23% this month
                    </span>
                </div>
            </div>
        ),
        bodyTitle: 'Monthly Summary',
        content:
            'Track your key metrics and performance indicators with comprehensive analytics and real-time data visualization.',
        bodySlot2: (
            <div className="flex justify-between gap-4">
                <div className="text-center">
                    <div className="text-xl font-bold text-emerald-500">
                        92%
                    </div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold text-blue-500">
                        $12.5K
                    </div>
                    <div className="text-xs text-gray-500">Revenue</div>
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
            <div className="w-7 h-7 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100">
                <TrendingUp size={16} className="text-sky-500" />
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
            <div className="w-7 h-7 bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 rounded flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M12 5l7 7-7 7"
                        />
                    </svg>
                </div>
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
            <div className="flex flex-col gap-4 p-5">
                <div className="flex justify-between items-center">
                    <h3 className="m-0 text-lg font-semibold">
                        Custom Dashboard
                    </h3>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        leadingIcon={<Calendar size={16} />}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-4 bg-sky-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">
                            142
                        </div>
                        <div className="text-xs text-gray-500">Total Users</div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-500">
                            89%
                        </div>
                        <div className="text-xs text-gray-500">
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

// Skeleton Loading State
export const SkeletonState: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 p-6">
            <div>
                <h4 className="text-base font-semibold mb-3">
                    Default Card - Pulse Variant
                </h4>
                <Card
                    headerTitle="Loading..."
                    subHeader="Skeleton loading state"
                    bodyTitle="Content"
                    content="This card is in a loading state with pulse animation."
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            </div>

            <div>
                <h4 className="text-base font-semibold mb-3">
                    Default Card - Wave Variant
                </h4>
                <Card
                    headerTitle="Loading..."
                    subHeader="Skeleton loading state"
                    bodyTitle="Content"
                    content="This card is in a loading state with wave animation."
                    skeleton={{ show: true, variant: 'wave' }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates skeleton loading states for all Card variants. Shows pulse and wave animations for Default, Aligned, and Custom card types.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

export const DarkTheme: Story = {
    render: () => (
        <ThemeProvider theme={Theme.DARK}>
            <div
                style={{
                    padding: 32,
                    backgroundColor: '#171a1f',
                    minWidth: 420,
                }}
            >
                <Card
                    headerSlot1={<Star size={18} color="#cbd5e1" />}
                    headerTitle="Dark theme card"
                    headerTag={
                        <Tag
                            text="NEW"
                            color={TagColor.PRIMARY}
                            variant={TagVariant.SUBTLE}
                            size={TagSize.SM}
                        />
                    }
                    headerSlot2={
                        <span style={{ color: '#94a3b8', fontSize: 12 }}>
                            Updated now
                        </span>
                    }
                    subHeader="Header and content slots use dark surface tokens"
                    bodyTitle="Monthly summary"
                    content="The container, borders, header, body title, and content remain readable on the dark surface."
                    bodySlot2={
                        <div style={{ color: '#94a3b8', fontSize: 13 }}>
                            142 active users
                        </div>
                    }
                />
            </div>
        </ThemeProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Card surface and content slots rendered with the dark theme token set.',
            },
        },
    },
}
