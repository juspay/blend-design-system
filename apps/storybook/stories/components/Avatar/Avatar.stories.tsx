import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Avatar,
    AvatarSize,
    AvatarShape,
    AvatarOnlinePosition,
} from '@juspay/blend-design-system'
import { Crown, Star, CheckCircle, Settings, User } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A flexible avatar component for displaying user profile images with automatic fallback to initials, multiple sizes and shapes, and online status indicators.

## Features
- Multiple sizes (Extra Small, Small, Regular, Medium, Large, Extra Large)
- Two shape variants (Circular, Rounded)
- Automatic fallback to initials when image fails
- Online status indicator support (top/bottom position)
- Custom fallback content support
- Leading and trailing slot support
- Skeleton loading state
- Accessible design with screen reader support
- Error handling for broken images

## Accessibility

**WCAG Compliance**: 2.0, 2.1, 2.2 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Proper alt text handling for images
- Visually hidden text ensures accessible name is always available
- Screen reader support (VoiceOver/NVDA)
- Decorative elements properly marked with aria-hidden="true"
- Online status communicated via data-status attribute (not solely visual)
- Semantic HTML structure with role="img" for images
- Error handling maintains accessibility when images fail
- Text scaling support up to 200% without loss of functionality

**Level AAA Compliance**: ⚠️ Partial (6 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1), 2.5.5 Target Size - Small and Regular sizes need 44x44px minimum if Avatar is made interactive
- ℹ️ **Not Applicable**: Avatar is decorative by default, so 2.5.5 applies only if wrapped in interactive elements

**Accessibility Features**:
- **Alt Text**: Always provide descriptive alt text (e.g., "John Doe" not "Avatar" or "Profile picture")
- **Image Failures**: Visually hidden span ensures accessible name is available even when image fails to load
- **Online Status**: Indicated by both visual indicator and data-status attribute, not solely by color
- **Decorative Elements**: Online indicator and fallback content properly marked with aria-hidden="true"
- **Screen Readers**: Accessible name provided via visually hidden text for all scenarios

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Avatar.accessibility\` (52 tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify alt text announcements, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Avatar, AvatarSize, AvatarShape } from '@juspay/blend-design-system';

<Avatar 
  src="/user-profile.jpg" 
  alt="John Doe" 
  size={AvatarSize.MD}
  shape={AvatarShape.CIRCULAR}
  online={true}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        src: {
            control: 'text',
            description: 'URL of the avatar image to display',
        },
        alt: {
            control: 'text',
            description:
                'Alternative text for the avatar image and fallback initials generation',
        },
        size: {
            control: 'select',
            options: Object.values(AvatarSize),
            description: 'Size variant of the avatar',
        },
        shape: {
            control: 'select',
            options: Object.values(AvatarShape),
            description: 'Shape variant of the avatar',
        },
        online: {
            control: 'boolean',
            description: 'Whether to show online status indicator',
        },
        fallback: {
            control: 'text',
            description: 'Custom fallback content when image is not available',
        },
        leadingSlot: {
            control: 'select',
            options: ['none', 'crown', 'star', 'user', 'checkCircle'],
            description: 'Content to display before the avatar',
        },
        trailingSlot: {
            control: 'select',
            options: ['none', 'star', 'checkCircle', 'settings'],
            description: 'Content to display after the avatar',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

// Helper functions to render slots based on control selection
const getSlotContent = (slotType: string) => {
    switch (slotType) {
        case 'crown':
            return <Crown size={16} color="#FFD700" />
        case 'star':
            return <Star size={16} color="#FFD700" />
        case 'user':
            return <User size={16} color="#666" />
        case 'checkCircle':
            return <CheckCircle size={16} color="#22C55E" />
        case 'settings':
            return <Settings size={16} color="#666" />
        case 'none':
        default:
            return undefined
    }
}

// Default story with interactive controls
export const Default: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        alt: 'John Doe',
        size: AvatarSize.MD,
        shape: AvatarShape.CIRCULAR,
        online: false,
        fallback: '',
        leadingSlot: 'none',
        trailingSlot: 'none',
    },
    render: (args: any) => (
        <Avatar
            {...args}
            fallback={args.fallback || undefined}
            leadingSlot={getSlotContent(args.leadingSlot)}
            trailingSlot={getSlotContent(args.trailingSlot)}
        />
    ),
}

// Avatar sizes
export const AvatarSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=20&h=20&fit=crop&crop=face"
                    alt="Small Avatar"
                    size={AvatarSize.SM}
                />
                <div
                    style={{
                        fontSize: '11px',
                        marginTop: '4px',
                        color: '#666',
                    }}
                >
                    SM
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar alt="Regular Avatar" size={AvatarSize.REGULAR} />
                <div
                    style={{
                        fontSize: '11px',
                        marginTop: '4px',
                        color: '#666',
                    }}
                >
                    Regular
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                    alt="Medium Avatar"
                    size={AvatarSize.MD}
                />
                <div
                    style={{
                        fontSize: '11px',
                        marginTop: '4px',
                        color: '#666',
                    }}
                >
                    MD
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                    alt="Large Avatar"
                    size={AvatarSize.LG}
                />
                <div
                    style={{
                        fontSize: '11px',
                        marginTop: '4px',
                        color: '#666',
                    }}
                >
                    LG
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                    alt="Extra Large Avatar"
                    size={AvatarSize.XL}
                />
                <div
                    style={{
                        fontSize: '11px',
                        marginTop: '4px',
                        color: '#666',
                    }}
                >
                    XL
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different avatar sizes: Small (SM), Regular, Medium (MD), Large (LG), and Extra Large (XL). All avatars include descriptive alt text for accessibility.',
            },
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: 'image-alt',
                        enabled: true,
                    },
                ],
            },
        },
    },
}

// Avatar shapes
export const AvatarShapes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="Alex Johnson"
                size={AvatarSize.LG}
                shape={AvatarShape.CIRCULAR}
            />
            <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                alt="Lisa Chen"
                size={AvatarSize.LG}
                shape={AvatarShape.ROUNDED}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different avatar shapes: Circular (fully rounded) and Rounded (slightly rounded corners).',
            },
        },
    },
}

// Fallback avatars (no image)
export const FallbackAvatars: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Avatar alt="John Doe" size={AvatarSize.MD} />
            <Avatar alt="Sarah Wilson" size={AvatarSize.MD} />
            <Avatar alt="Mike Johnson" size={AvatarSize.MD} />
            <Avatar alt="Emma Davis" size={AvatarSize.MD} />
            <Avatar alt="Alex Chen" size={AvatarSize.MD} />
            <Avatar alt="Lisa Brown" size={AvatarSize.MD} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars without images showing automatic initials generation from the alt text.',
            },
        },
    },
}

// Online status indicators
export const OnlineStatus: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                    alt="Online User"
                    size={AvatarSize.LG}
                    online={true}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Online
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                    alt="Offline User"
                    size={AvatarSize.LG}
                    online={false}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Offline
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    alt="Online Fallback"
                    size={AvatarSize.LG}
                    online={true}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Online (Fallback)
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars with online status indicators showing user presence.',
            },
        },
    },
}

// Custom fallback content
export const CustomFallback: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Avatar
                alt="User Icon"
                size={AvatarSize.LG}
                fallback={<User size={20} />}
            />
            <Avatar
                alt="Star User"
                size={AvatarSize.LG}
                fallback={<Star size={20} />}
            />
            <Avatar alt="Custom Text" size={AvatarSize.LG} fallback="?" />
            <Avatar
                alt="Settings"
                size={AvatarSize.LG}
                fallback={<Settings size={20} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars with custom fallback content including icons and custom text.',
            },
        },
    },
}

// Error handling (broken images)
export const ErrorHandling: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Avatar
                src="https://broken-image-url.jpg"
                alt="Broken Image User"
                size={AvatarSize.LG}
            />
            <Avatar
                src="https://nonexistent.jpg"
                alt="Another Broken"
                size={AvatarSize.LG}
                online={true}
            />
            <Avatar
                src="https://invalid-url"
                alt="Custom Fallback"
                size={AvatarSize.LG}
                fallback={<CheckCircle size={20} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars gracefully handling broken or invalid image URLs by falling back to initials or custom content.',
            },
        },
    },
}

// With slots (leading and trailing)
export const WithSlots: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
            }}
        >
            <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                alt="VIP User"
                size={AvatarSize.MD}
                leadingSlot={<Crown size={16} color="#gold" />}
            />
            <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
                alt="Star User"
                size={AvatarSize.MD}
                trailingSlot={<Star size={16} color="#ffd700" />}
            />
            <Avatar
                alt="Both Slots"
                size={AvatarSize.MD}
                leadingSlot={<Crown size={16} color="#gold" />}
                trailingSlot={<Star size={16} color="#ffd700" />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars with leading and trailing content slots for additional context or actions.',
            },
        },
    },
}

// Size and shape combinations
export const SizeShapeCombinations: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span
                    style={{ width: '80px', fontSize: '14px', color: '#666' }}
                >
                    Circular:
                </span>
                <Avatar
                    alt="Small Circular"
                    size={AvatarSize.SM}
                    shape={AvatarShape.CIRCULAR}
                />
                <Avatar
                    alt="Regular Circular"
                    size={AvatarSize.REGULAR}
                    shape={AvatarShape.CIRCULAR}
                />
                <Avatar
                    alt="Medium Circular"
                    size={AvatarSize.MD}
                    shape={AvatarShape.CIRCULAR}
                />
                <Avatar
                    alt="Large Circular"
                    size={AvatarSize.LG}
                    shape={AvatarShape.CIRCULAR}
                />
                <Avatar
                    alt="Extra Large Circular"
                    size={AvatarSize.XL}
                    shape={AvatarShape.CIRCULAR}
                />
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span
                    style={{ width: '80px', fontSize: '14px', color: '#666' }}
                >
                    Rounded:
                </span>
                <Avatar
                    alt="Small Rounded"
                    size={AvatarSize.SM}
                    shape={AvatarShape.ROUNDED}
                />
                <Avatar
                    alt="Regular Rounded"
                    size={AvatarSize.REGULAR}
                    shape={AvatarShape.ROUNDED}
                />
                <Avatar
                    alt="Medium Rounded"
                    size={AvatarSize.MD}
                    shape={AvatarShape.ROUNDED}
                />
                <Avatar
                    alt="Large Rounded"
                    size={AvatarSize.LG}
                    shape={AvatarShape.ROUNDED}
                />
                <Avatar
                    alt="Extra Large Rounded"
                    size={AvatarSize.XL}
                    shape={AvatarShape.ROUNDED}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All size and shape combinations showcasing the flexibility of the avatar component. All avatars include descriptive alt text for accessibility.',
            },
        },
    },
}

// Skeleton state
export const SkeletonState: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    alt="Loading Avatar"
                    size={AvatarSize.MD}
                    skeleton={{ show: true, variant: 'pulse' }}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Pulse
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    alt="Loading Avatar"
                    size={AvatarSize.LG}
                    skeleton={{ show: true, variant: 'wave' }}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Wave
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatar skeleton loading states. Alt text is still available for screen readers during loading.',
            },
        },
    },
}

// Online position indicators
export const OnlinePosition: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    alt="Top Position User"
                    size={AvatarSize.LG}
                    online={true}
                    onlinePosition={AvatarOnlinePosition.TOP}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Top Position
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar
                    alt="Bottom Position User"
                    size={AvatarSize.LG}
                    online={true}
                    onlinePosition={AvatarOnlinePosition.BOTTOM}
                />
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '8px',
                        color: '#666',
                    }}
                >
                    Bottom Position
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Online status indicator positions. Status is communicated via data-status attribute, not solely visual.',
            },
        },
    },
}

// Interactive playground
export const Interactive: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        alt: 'Interactive User',
        size: AvatarSize.LG,
        shape: AvatarShape.CIRCULAR,
        online: true,
        fallback: '',
        leadingSlot: 'crown',
        trailingSlot: 'star',
    },
    render: (args: any) => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Avatar
                {...args}
                fallback={args.fallback || undefined}
                leadingSlot={getSlotContent(args.leadingSlot)}
                trailingSlot={getSlotContent(args.trailingSlot)}
            />
            <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                Use the controls below to experiment with different avatar
                configurations
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Avatar props using the controls panel.',
            },
        },
    },
}

// Accessibility Testing
// ============================================================================
// Accessibility examples demonstrating WCAG compliance features
// ============================================================================

export const Accessibility: Story = {
    render: () => (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
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
                    compliance features of the Avatar component.
                </p>
            </div>

            {/* WCAG 1.1.1 Non-text Content */}
            <div style={{ marginBottom: '32px' }}>
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '12px',
                    }}
                >
                    1.1.1 Non-text Content (Level A)
                </h3>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    All images have alt text. Visually hidden text ensures
                    accessible name is available even when image fails.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="John Doe"
                        size={AvatarSize.LG}
                    />
                    <Avatar alt="Jane Smith" size={AvatarSize.LG} />
                    <Avatar
                        src="https://broken-image-url.jpg"
                        alt="Broken Image User"
                        size={AvatarSize.LG}
                    />
                </div>
            </div>

            {/* WCAG 1.4.1 Use of Color */}
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
                    Online status indicated by both visual indicator and
                    data-status attribute, not solely by color.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Avatar
                            alt="Online User"
                            size={AvatarSize.LG}
                            online={true}
                        />
                        <div
                            style={{
                                fontSize: '12px',
                                marginTop: '8px',
                                color: '#666',
                            }}
                        >
                            Online (data-status="online")
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar
                            alt="Offline User"
                            size={AvatarSize.LG}
                            online={false}
                        />
                        <div
                            style={{
                                fontSize: '12px',
                                marginTop: '8px',
                                color: '#666',
                            }}
                        >
                            Offline (data-status="offline")
                        </div>
                    </div>
                </div>
            </div>

            {/* WCAG 4.1.2 Name, Role, Value */}
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
                    Accessible name provided via alt text and visually hidden
                    span. Image has role="img".
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="User Profile"
                        size={AvatarSize.LG}
                    />
                    <Avatar alt="User Profile" size={AvatarSize.LG} />
                </div>
            </div>

            {/* WCAG 4.1.3 Status Messages */}
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
                    Online status changes communicated via data-status attribute
                    updates.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        alt="Status User"
                        size={AvatarSize.LG}
                        online={true}
                    />
                    <Avatar
                        alt="Status User"
                        size={AvatarSize.LG}
                        online={false}
                    />
                </div>
            </div>

            {/* WCAG 2.4.4 Link Purpose */}
            <div style={{ marginBottom: '32px' }}>
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '12px',
                    }}
                >
                    2.4.4 Link Purpose (Level A)
                </h3>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    When Avatar is wrapped in a link, alt text provides context
                    for link purpose.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                    }}
                >
                    <a href="/profile" style={{ textDecoration: 'none' }}>
                        <Avatar alt="John Doe's Profile" size={AvatarSize.LG} />
                    </a>
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
                    All Sizes with Descriptive Alt Text
                </h3>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    All avatar sizes include descriptive alt text for
                    accessibility.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <Avatar alt="Small User" size={AvatarSize.SM} />
                    <Avatar alt="Regular User" size={AvatarSize.REGULAR} />
                    <Avatar alt="Medium User" size={AvatarSize.MD} />
                    <Avatar alt="Large User" size={AvatarSize.LG} />
                    <Avatar alt="Extra Large User" size={AvatarSize.XL} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating WCAG 2.0, 2.1, 2.2 Level AA compliance features including alt text handling, status communication, and semantic structure.

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
   - 52 tests covering WCAG 2.0, 2.1, 2.2 criteria
   - WCAG compliance verification

3. **Manual Testing**:
   - **Screen Readers**: Test with VoiceOver (macOS/iOS) or NVDA (Windows)
   - Verify alt text is announced correctly
   - Verify visually hidden text is accessible
   - Verify online status is communicated
   - **Keyboard Navigation**: Avatar is decorative, should not interfere with tab order
   - **Contrast**: Verify contrast ratios with WebAIM Contrast Checker

4. **Visual Regression**:
   - Chromatic snapshots verify focus states and visual appearance

## Accessibility Report

- ✅ **WCAG 2.0, 2.1, 2.2 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.0, 2.1, 2.2 Level AAA**: Partial Compliance (6/9 applicable criteria compliant)
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('content'),
    },
}
