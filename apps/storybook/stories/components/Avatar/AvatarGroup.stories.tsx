import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    AvatarGroup,
    AvatarSize,
    AvatarShape,
} from '@juspay/blend-design-system'
import { User, Star, Crown, Shield, Heart, Zap } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof AvatarGroup> = {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A flexible avatar group component for displaying multiple user avatars with overflow handling, selection support, and search functionality.

## Features
- Display multiple avatars in a compact group
- Configurable maximum visible avatars with overflow counter
- Interactive selection support with callbacks
- Search functionality in overflow menu
- Multiple sizes (Small, Regular, Medium, Large, Extra Large)
- Two shape variants (Circular, Rounded)
- Automatic fallback to initials when images fail
- Accessible design with keyboard navigation
- Smooth animations and hover effects
- WCAG 2.0, 2.1, 2.2 Level AA compliant

## Accessibility

**WCAG Compliance**: 2.0, 2.1, 2.2 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Enter/Space for selection)
- Proper ARIA attributes (role="group", role="button", aria-pressed, aria-label, aria-describedby)
- Focus order and visibility
- Status messages via aria-live regions
- Selection state communicated programmatically
- Overflow menu accessible with proper ARIA attributes
- Screen reader support (VoiceOver/NVDA)

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 3.2.5 Change on Request, 4.1.3 Status Messages
- ❌ **Non-Compliant**: 2.5.5 Target Size - Small and Regular sizes need 44x44px minimum interactive area for AAA compliance
- ℹ️ **Not Applicable**: Some timing and motion criteria don't apply to AvatarGroup

**Accessibility Features**:
- **Keyboard Navigation**: All avatars are keyboard accessible with Enter/Space for selection
- **ARIA Attributes**: Proper roles and states (role="group", role="button", aria-pressed, aria-label)
- **Focus Management**: Logical focus order, visible focus indicators
- **Status Updates**: Selection changes announced via aria-live="polite"
- **Overflow Menu**: Accessible menu with search functionality and proper ARIA attributes
- **Screen Readers**: Descriptive labels and state announcements for all interactions

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Avatar.accessibility\` (18 AvatarGroup tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify keyboard navigation, verify selection announcements
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { AvatarGroup, AvatarSize, AvatarShape } from '@juspay/blend-design-system';

const avatars = [
  { id: 1, src: "/user1.jpg", alt: "John Doe" },
  { id: 2, src: "/user2.jpg", alt: "Jane Smith" },
  // ... more avatars
];

<AvatarGroup 
  avatars={avatars}
  maxCount={5}
  size={AvatarSize.MD}
  shape={AvatarShape.CIRCULAR}
  onSelectionChange={(selectedIds) => console.log(selectedIds)}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        avatars: {
            control: 'object',
            description:
                'Array of avatar data objects with id, src, alt, and optional fallback',
        },
        maxCount: {
            control: { type: 'number', min: 1, max: 10 },
            description:
                'Maximum number of avatars to display before showing overflow',
        },
        size: {
            control: 'select',
            options: Object.values(AvatarSize),
            description: 'Size variant for all avatars in the group',
        },
        shape: {
            control: 'select',
            options: Object.values(AvatarShape),
            description: 'Shape variant for all avatars in the group',
        },
        selectedAvatarIds: {
            control: 'object',
            description:
                'Array of selected avatar IDs for controlled selection',
        },
        onSelectionChange: {
            action: 'selectionChanged',
            description: 'Callback fired when avatar selection changes',
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '50px',
                }}
            >
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

// Sample avatar data
const sampleAvatars = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        alt: 'John Doe',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        alt: 'Jane Smith',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        alt: 'Mike Johnson',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=32&h=32&fit=crop&crop=face',
        alt: 'Sarah Wilson',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
        alt: 'David Brown',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
        alt: 'Emma Davis',
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face',
        alt: 'Lisa Chen',
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face',
        alt: 'Robert Taylor',
    },
]

// Default story with interactive controls
export const Default: Story = {
    args: {
        avatars: sampleAvatars.slice(0, 5),
        maxCount: 3,
        size: AvatarSize.MD,
        shape: AvatarShape.CIRCULAR,
        selectedAvatarIds: [],
    },
    render: (args: any) => (
        <AvatarGroup {...args} onSelectionChange={args.onSelectionChange} />
    ),
}

// Different sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Small (24px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.SM}
                />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Regular (28px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.REGULAR}
                />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Medium (32px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.MD}
                />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Large (40px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Extra Large (48px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.XL}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatar groups in different sizes: Small (24px), Regular (28px), Medium (32px), Large (40px), and Extra Large (48px). All sizes support keyboard navigation and selection.',
            },
        },
    },
}

// Different shapes
export const Shapes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Circular
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                    shape={AvatarShape.CIRCULAR}
                />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Rounded
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                    shape={AvatarShape.ROUNDED}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatar groups with different shape variants.',
            },
        },
    },
}

// Different max counts
export const MaxCountVariations: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Max Count: 1
                </h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={1} />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Max Count: 3
                </h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={3} />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Max Count: 5
                </h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={5} />
            </div>
            <div>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Max Count: 10 (All visible)
                </h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={10} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different maximum visible avatar counts with overflow handling.',
            },
        },
    },
}

// With selection
export const WithSelection: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = useState<(string | number)[]>([
            1, 3,
        ])

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                    selectedAvatarIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                />
                <div style={{ fontSize: '14px', color: '#666' }}>
                    Selected IDs:{' '}
                    {selectedIds.length > 0 ? selectedIds.join(', ') : 'None'}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar group with selection support. Click avatars to select/deselect them.',
            },
        },
    },
}

// With fallback avatars
export const WithFallbacks: Story = {
    render: () => {
        const avatarsWithFallbacks = [
            { id: 1, alt: 'John Doe' },
            { id: 2, alt: 'Jane Smith' },
            { id: 3, alt: 'Mike Johnson', fallback: <User size={20} /> },
            { id: 4, alt: 'Sarah Wilson', fallback: 'SW' },
            { id: 5, alt: 'David Brown', fallback: <Star size={20} /> },
            { id: 6, alt: 'Emma Davis' },
            { id: 7, alt: 'Lisa Chen', fallback: <Crown size={20} /> },
            { id: 8, alt: 'Robert Taylor' },
        ]

        return (
            <AvatarGroup
                avatars={avatarsWithFallbacks}
                maxCount={5}
                size={AvatarSize.LG}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar group with various fallback options including initials and custom icons.',
            },
        },
    },
}

// Large group with overflow
export const LargeGroup: Story = {
    render: () => {
        const largeAvatarList = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            src:
                i % 3 === 0
                    ? undefined
                    : `https://i.pravatar.cc/150?img=${i + 1}`,
            alt: `User ${i + 1}`,
        }))

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        20 users, showing 5
                    </h4>
                    <AvatarGroup
                        avatars={largeAvatarList}
                        maxCount={5}
                        size={AvatarSize.MD}
                    />
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                    Click the +15 counter to see all users and search
                    functionality
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Large avatar group demonstrating overflow menu with search functionality.',
            },
        },
    },
}

// Mixed content with icons
export const MixedContent: Story = {
    render: () => {
        const mixedAvatars = [
            {
                id: 1,
                src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
                alt: 'John Doe',
            },
            { id: 2, alt: 'System User', fallback: <Shield size={20} /> },
            {
                id: 3,
                src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
                alt: 'Jane Smith',
            },
            { id: 4, alt: 'Bot User', fallback: <Zap size={20} /> },
            { id: 5, alt: 'Guest User', fallback: '?' },
            {
                id: 6,
                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                alt: 'Mike Johnson',
            },
            { id: 7, alt: 'Premium User', fallback: <Crown size={20} /> },
            { id: 8, alt: 'Support', fallback: <Heart size={20} /> },
        ]

        return (
            <AvatarGroup
                avatars={mixedAvatars}
                maxCount={5}
                size={AvatarSize.LG}
                shape={AvatarShape.ROUNDED}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar group mixing real user images with system icons and special users.',
            },
        },
    },
}

// Interactive example
export const InteractiveExample: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
        const [maxCount, setMaxCount] = useState(5)
        const [size, setSize] = useState(AvatarSize.MD)
        const [shape, setShape] = useState(AvatarShape.CIRCULAR)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>
                            Max Count:
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={maxCount}
                                onChange={(e) =>
                                    setMaxCount(Number(e.target.value))
                                }
                                style={{
                                    marginLeft: '8px',
                                    width: '60px',
                                    padding: '4px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>
                            Size:
                            <select
                                value={size}
                                onChange={(e) =>
                                    setSize(e.target.value as AvatarSize)
                                }
                                style={{
                                    marginLeft: '8px',
                                    padding: '4px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            >
                                {Object.values(AvatarSize).map((s) => (
                                    <option key={s} value={s}>
                                        {s.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', color: '#666' }}>
                            Shape:
                            <select
                                value={shape}
                                onChange={(e) =>
                                    setShape(e.target.value as AvatarShape)
                                }
                                style={{
                                    marginLeft: '8px',
                                    padding: '4px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            >
                                {Object.values(AvatarShape).map((s) => (
                                    <option key={s} value={s}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={maxCount}
                    size={size}
                    shape={shape}
                    selectedAvatarIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                />

                <div style={{ fontSize: '14px', color: '#666' }}>
                    <div>
                        Selected:{' '}
                        {selectedIds.length > 0
                            ? selectedIds.join(', ')
                            : 'None'}
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '12px' }}>
                        Try clicking avatars to select them, or click the
                        overflow counter to see all users
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive example allowing you to experiment with different configurations.',
            },
        },
    },
}

// Empty state
export const EmptyState: Story = {
    args: {
        avatars: [],
        maxCount: 5,
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar group with no avatars showing empty state handling.',
            },
        },
    },
}

// Single avatar
export const SingleAvatar: Story = {
    args: {
        avatars: [sampleAvatars[0]],
        maxCount: 5,
        size: AvatarSize.LG,
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar group with only one avatar, no overflow counter shown.',
            },
        },
    },
}

// Accessibility Testing
// ============================================================================
// Accessibility examples demonstrating WCAG compliance features
// ============================================================================

export const Accessibility: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = useState<(string | number)[]>([
            1, 3,
        ])

        return (
            <div
                style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}
            >
                <div style={{ marginBottom: '32px' }}>
                    <h2
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginBottom: '16px',
                        }}
                    >
                        Accessibility Examples
                    </h2>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                        }}
                    >
                        These examples demonstrate WCAG 2.0, 2.1, 2.2 Level AA
                        compliance features of the AvatarGroup component.
                    </p>
                </div>

                {/* WCAG 2.1.1 Keyboard (Level A) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        2.1.1 Keyboard (Level A)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        All avatars are keyboard accessible. Use Tab to
                        navigate, Enter or Space to select/deselect.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 5)}
                        maxCount={5}
                        size={AvatarSize.MD}
                        selectedAvatarIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Selected IDs:{' '}
                        {selectedIds.length > 0
                            ? selectedIds.join(', ')
                            : 'None'}
                    </div>
                </div>

                {/* WCAG 1.3.1 Info and Relationships (Level A) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        1.3.1 Info and Relationships (Level A)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Proper semantic structure with role="group" and
                        role="button". Selection state communicated via
                        aria-pressed.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 4)}
                        maxCount={3}
                        size={AvatarSize.LG}
                        selectedAvatarIds={[1, 2]}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Group has role="group" with aria-label. Buttons have
                        role="button" with aria-pressed state.
                    </div>
                </div>

                {/* WCAG 4.1.2 Name, Role, Value (Level A) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        4.1.2 Name, Role, Value (Level A)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Each avatar button has an accessible name via
                        aria-label, proper role="button", and aria-pressed value
                        indicating selection state.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 3)}
                        maxCount={3}
                        size={AvatarSize.MD}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Each button has aria-label="[Name]" or
                        aria-label="[Name], selected". aria-describedby links to
                        visually hidden description.
                    </div>
                </div>

                {/* WCAG 4.1.3 Status Messages (Level AA) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        4.1.3 Status Messages (Level AA)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Selection changes are announced via aria-live="polite"
                        region. Group aria-label updates to reflect selection
                        count.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 5)}
                        maxCount={5}
                        size={AvatarSize.MD}
                        selectedAvatarIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Group has aria-live="polite" and aria-atomic="true" for
                        status updates. Group aria-label includes selection
                        count.
                    </div>
                </div>

                {/* WCAG 2.4.3 Focus Order (Level A) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        2.4.3 Focus Order (Level A)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Logical focus order: avatars from left to right, then
                        overflow button if present.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars}
                        maxCount={5}
                        size={AvatarSize.MD}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Tab through avatars to verify logical order. Overflow
                        button receives focus after visible avatars.
                    </div>
                </div>

                {/* WCAG 2.4.7 Focus Visible (Level AA) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        2.4.7 Focus Visible (Level AA)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Focus indicators are clearly visible with sufficient
                        contrast.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 4)}
                        maxCount={4}
                        size={AvatarSize.LG}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Tab to focus avatars and verify visible focus outline
                        with sufficient contrast.
                    </div>
                </div>

                {/* WCAG 1.4.1 Use of Color (Level A) */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        1.4.1 Use of Color (Level A)
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Selection state is communicated via aria-pressed
                        attribute, not solely by color.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 4)}
                        maxCount={4}
                        size={AvatarSize.MD}
                        selectedAvatarIds={[1, 3]}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Selected avatars have aria-pressed="true" and visual
                        indication. Screen readers announce selection state.
                    </div>
                </div>

                {/* Overflow Menu Accessibility */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        Overflow Menu Accessibility
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        Overflow button has proper ARIA attributes
                        (aria-haspopup, aria-expanded) and descriptive label.
                    </p>
                    <AvatarGroup
                        avatars={sampleAvatars}
                        maxCount={3}
                        size={AvatarSize.MD}
                    />
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '12px',
                        }}
                    >
                        Overflow button has aria-label with count,
                        aria-haspopup="menu", and aria-expanded state. Menu is
                        keyboard accessible.
                    </div>
                </div>

                {/* All Sizes for Accessibility */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                        }}
                    >
                        All Sizes with Keyboard Accessibility
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px',
                        }}
                    >
                        All avatar group sizes support keyboard navigation and
                        selection.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '8px',
                                }}
                            >
                                Small (SM)
                            </div>
                            <AvatarGroup
                                avatars={sampleAvatars.slice(0, 4)}
                                maxCount={4}
                                size={AvatarSize.SM}
                            />
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '8px',
                                }}
                            >
                                Medium (MD)
                            </div>
                            <AvatarGroup
                                avatars={sampleAvatars.slice(0, 4)}
                                maxCount={4}
                                size={AvatarSize.MD}
                            />
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '8px',
                                }}
                            >
                                Large (LG)
                            </div>
                            <AvatarGroup
                                avatars={sampleAvatars.slice(0, 4)}
                                maxCount={4}
                                size={AvatarSize.LG}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating WCAG 2.0, 2.1, 2.2 Level AA compliance features including keyboard navigation, ARIA attributes, focus management, and status announcements.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Open the Accessibility panel in Storybook
   - Check for violations (should be 0 for AA compliance)
   - Review accessibility tree
   - See real-time accessibility status

2. **Automated Testing**:
   \`\`\`bash
   pnpm test Avatar.accessibility
   \`\`\`
   - 18 AvatarGroup tests covering WCAG 2.0, 2.1, 2.2 criteria
   - WCAG compliance verification

3. **Manual Testing**:
   - **Screen Readers**: Test with VoiceOver (macOS/iOS) or NVDA (Windows)
   - Verify avatar names are announced correctly
   - Verify selection state announcements
   - Verify group label includes selection count
   - **Keyboard Navigation**: Tab through avatars, use Enter/Space to select
   - **Focus Visibility**: Verify focus indicators are clearly visible
   - **Overflow Menu**: Verify menu is keyboard accessible

4. **Visual Regression**:
   - Chromatic snapshots verify focus states and visual appearance

## Accessibility Report

- ✅ **WCAG 2.0, 2.1, 2.2 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.0, 2.1, 2.2 Level AAA**: Partial Compliance (5/6 applicable criteria compliant)
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis
                `,
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}
