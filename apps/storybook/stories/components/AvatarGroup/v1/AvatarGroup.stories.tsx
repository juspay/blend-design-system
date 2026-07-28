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
} from '../../../../.storybook/a11y.config'

const meta: Meta<typeof AvatarGroup> = {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A flexible avatar group component for displaying multiple user avatars with overflow handling, selection support, and search functionality.',
        docs: {
            description: {
                component: `
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

        `,
            },
        },
    },
    argTypes: {
        avatars: {
            control: 'object',
            description:
                'Array of avatar data objects with id, src, alt, and optional fallback',
            table: {
                type: {
                    summary: 'AvatarData[]',
                    detail: `{
  id: string | number;     // Unique identifier (required)
  src: string;             // Image URL
  alt?: string;            // Alt text for accessibility
  fallback?: string | ReactNode;  // Fallback initials or element
}`,
                },
                category: 'Data',
            },
        },
        maxCount: {
            control: { type: 'number', min: 1, max: 10 },
            description:
                'Maximum number of avatars to display before showing overflow',
            table: {
                category: 'Display',
            },
        },
        size: {
            control: 'select',
            options: Object.values(AvatarSize),
            description: 'Size variant for all avatars in the group',
            table: {
                category: 'Appearance',
            },
        },
        shape: {
            control: 'select',
            options: Object.values(AvatarShape),
            description: 'Shape variant for all avatars in the group',
            table: {
                category: 'Appearance',
            },
        },
        selectedAvatarIds: {
            control: 'object',
            description:
                'Array of selected avatar IDs for controlled selection',
            table: {
                type: {
                    summary: '(string | number)[]',
                    detail: `Array of avatar IDs that are currently selected.
Example: [1, 3, 5] or ['user-1', 'user-3']`,
                },
                category: 'Selection',
            },
        },
        onSelectionChange: {
            action: 'selectionChanged',
            description: 'Callback fired when avatar selection changes',
        },
        skeleton: {
            control: 'object',
            description:
                'Skeleton loading state configuration with show and variant properties',
            table: {
                type: {
                    summary: 'SkeletonConfig',
                    detail: `{
  show: boolean;              // Whether to show skeleton loading
  variant?: 'pulse' | 'wave'; // Animation variant (default: 'pulse')
}`,
                },
                category: 'State',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="min-h-100 flex items-start justify-center pt-12.4">
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
        <div className="flex items-center justify-center h-full pt-50">
            <AvatarGroup {...args} onSelectionChange={args.onSelectionChange} />
        </div>
    ),
}

// Different sizes
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Small (24px)</h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.SM}
                />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">
                    Regular (28px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.REGULAR}
                />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">
                    Medium (32px)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.MD}
                />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Large (40px)</h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">
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
        <div className="flex flex-col items-center h-full gap-6 mt-16">
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Circular</h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                    shape={AvatarShape.CIRCULAR}
                />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Rounded</h4>
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
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Max Count: 1</h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={1} />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Max Count: 3</h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={3} />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">Max Count: 5</h4>
                <AvatarGroup avatars={sampleAvatars} maxCount={5} />
            </div>
            <div>
                <h4 className="m-0 mb-3 text-sm text-gray-600">
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
            <div className="flex flex-col gap-4 pt-40">
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                    selectedAvatarIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                />
                <div className="text-sm text-gray-600">
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
            <div className="pt-40">
                <AvatarGroup
                    avatars={avatarsWithFallbacks}
                    maxCount={5}
                    size={AvatarSize.LG}
                />
            </div>
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
            <div className="flex flex-col gap-6 pt-40">
                <div>
                    <h4 className="m-0 mb-3 text-sm text-gray-600">
                        20 users, showing 5
                    </h4>
                    <AvatarGroup
                        avatars={largeAvatarList}
                        maxCount={5}
                        size={AvatarSize.MD}
                    />
                </div>
                <div className="text-xs text-gray-600">
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
            <div className="pt-40">
                <AvatarGroup
                    avatars={mixedAvatars}
                    maxCount={5}
                    size={AvatarSize.LG}
                    shape={AvatarShape.ROUNDED}
                />
            </div>
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

// Skeleton Loading State
// ============================================================================
// Demonstrates the skeleton loading state for AvatarGroup
// ============================================================================

export const SkeletonState: Story = {
    render: () => (
        <div className="flex flex-col gap-8 p-6">
            <div>
                <h4 className="text-base font-semibold mb-3">
                    Pulse Variant (Default)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars.slice(0, 5)}
                    maxCount={5}
                    size={AvatarSize.MD}
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            </div>

            <div>
                <h4 className="text-base font-semibold mb-3">Wave Variant</h4>
                <AvatarGroup
                    avatars={sampleAvatars.slice(0, 5)}
                    maxCount={5}
                    size={AvatarSize.MD}
                    skeleton={{ show: true, variant: 'wave' }}
                />
            </div>

            <div>
                <h4 className="text-base font-semibold mb-3">
                    With Overflow Counter (Pulse)
                </h4>
                <AvatarGroup
                    avatars={sampleAvatars}
                    maxCount={3}
                    size={AvatarSize.LG}
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            </div>

            <div>
                <h4 className="text-base font-semibold mb-3">
                    Different Sizes (Wave)
                </h4>
                <div className="flex flex-col gap-6">
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 4)}
                        maxCount={4}
                        size={AvatarSize.SM}
                        skeleton={{ show: true, variant: 'wave' }}
                    />
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 4)}
                        maxCount={4}
                        size={AvatarSize.MD}
                        skeleton={{ show: true, variant: 'wave' }}
                    />
                    <AvatarGroup
                        avatars={sampleAvatars.slice(0, 4)}
                        maxCount={4}
                        size={AvatarSize.XL}
                        skeleton={{ show: true, variant: 'wave' }}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates skeleton loading states for AvatarGroup. Shows pulse and wave variants, with and without overflow counter, and across different sizes. The overflow counter also shows a skeleton when loading.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}
