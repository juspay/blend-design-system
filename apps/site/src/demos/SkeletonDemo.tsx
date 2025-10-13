import React, { useState } from 'react'
import { Skeleton } from '../../../../packages/blend/lib/components/Skeleton'
import {
    TagVariant,
    TagSize,
    TagShape,
    TagColor,
} from '../../../../packages/blend/lib/components/Tags/types'
import {
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button/types'
import { Button } from '../../../../packages/blend/lib/components/Button'
import { Tag } from '../../../../packages/blend/lib/components/Tags'
import {
    Avatar,
    AvatarSize,
    AvatarShape,
} from '../../../../packages/blend/lib/components/Avatar'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { Star, Download, Settings } from 'lucide-react'

const SkeletonDemo: React.FC = () => {
    const [loading, setLoading] = useState(true)

    return (
        <div style={{ padding: '24px', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                    }}
                >
                    Skeleton Loading States Demo
                </h1>
                <p style={{ color: '#666', marginBottom: '16px' }}>
                    Perfect component mirroring with exact token matching for
                    seamless loading experiences.
                </p>
                <Button
                    onClick={() => setLoading(!loading)}
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                >
                    {loading ? 'Hide Loading States' : 'Show Loading States'}
                </Button>
            </div>

            {/* Skeleton Tag Showcase */}
            <section style={{ marginBottom: '48px' }}>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                    }}
                >
                    🏷️ SkeletonTag - Perfect Tag Component Mirroring
                </h2>

                {/* Different Variants */}
                <div style={{ marginBottom: '24px' }}>
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '12px',
                        }}
                    >
                        Tag Variants with Dynamic Content Sizing
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Subtle
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Primary Tag"
                                    tagVariant={TagVariant.SUBTLE}
                                    color={TagColor.PRIMARY}
                                />
                                <Tag
                                    text="Primary Tag"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.PRIMARY}
                                />
                            </div>
                        </div>

                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Attentive
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Success Tag"
                                    tagVariant={TagVariant.ATTENTIVE}
                                    color={TagColor.SUCCESS}
                                />
                                <Tag
                                    text="Success Tag"
                                    variant={TagVariant.ATTENTIVE}
                                    color={TagColor.SUCCESS}
                                />
                            </div>
                        </div>

                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                No Fill
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Error Tag"
                                    tagVariant={TagVariant.NO_FILL}
                                    color={TagColor.ERROR}
                                />
                                <Tag
                                    text="Error Tag"
                                    variant={TagVariant.NO_FILL}
                                    color={TagColor.ERROR}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Different Sizes */}
                <div style={{ marginBottom: '24px' }}>
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '12px',
                        }}
                    >
                        Tag Sizes with Content-Aware Width
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            alignItems: 'flex-end',
                        }}
                    >
                        {[TagSize.XS, TagSize.SM, TagSize.MD, TagSize.LG].map(
                            (size) => (
                                <div key={size}>
                                    <Text
                                        variant="body.sm"
                                        style={{
                                            marginBottom: '8px',
                                            color: '#666',
                                        }}
                                    >
                                        {size.toUpperCase()}
                                    </Text>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '8px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Skeleton.Tag
                                            loading={loading}
                                            text={`${size.toUpperCase()} Tag`}
                                            size={size}
                                            color={TagColor.PRIMARY}
                                        />
                                        <Tag
                                            text={`${size.toUpperCase()} Tag`}
                                            size={size}
                                            color={TagColor.PRIMARY}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Different Shapes */}
                <div style={{ marginBottom: '24px' }}>
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '12px',
                        }}
                    >
                        Tag Shapes with Border Radius Mirroring
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Squarical
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Squarical Tag"
                                    shape={TagShape.SQUARICAL}
                                    color={TagColor.WARNING}
                                />
                                <Tag
                                    text="Squarical Tag"
                                    shape={TagShape.SQUARICAL}
                                    color={TagColor.WARNING}
                                />
                            </div>
                        </div>

                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Rounded
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Rounded Tag"
                                    shape={TagShape.ROUNDED}
                                    color={TagColor.PURPLE}
                                />
                                <Tag
                                    text="Rounded Tag"
                                    shape={TagShape.ROUNDED}
                                    color={TagColor.PURPLE}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags with Slots */}
                <div style={{ marginBottom: '24px' }}>
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '12px',
                        }}
                    >
                        Tags with Slots - Dynamic Width Calculation
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Left Slot
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Starred"
                                    hasLeftSlot={true}
                                    color={TagColor.SUCCESS}
                                />
                                <Tag
                                    text="Starred"
                                    leftSlot={<Star size={12} />}
                                    color={TagColor.SUCCESS}
                                />
                            </div>
                        </div>

                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Right Slot
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Download"
                                    hasRightSlot={true}
                                    color={TagColor.PRIMARY}
                                />
                                <Tag
                                    text="Download"
                                    rightSlot={<Download size={12} />}
                                    color={TagColor.PRIMARY}
                                />
                            </div>
                        </div>

                        <div>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                Both Slots
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Tag
                                    loading={loading}
                                    text="Settings"
                                    hasLeftSlot={true}
                                    hasRightSlot={true}
                                    color={TagColor.NEUTRAL}
                                />
                                <Tag
                                    text="Settings"
                                    leftSlot={<Settings size={12} />}
                                    rightSlot={<Settings size={12} />}
                                    color={TagColor.NEUTRAL}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Split Tags */}
                <div style={{ marginBottom: '24px' }}>
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '12px',
                        }}
                    >
                        Split Tags - Border Radius Positioning
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: '0px',
                            alignItems: 'center',
                        }}
                    >
                        <Skeleton.Tag
                            loading={loading}
                            text="Left"
                            splitTagPosition="left"
                            color={TagColor.PRIMARY}
                        />
                        <Skeleton.Tag
                            loading={loading}
                            text="Right"
                            splitTagPosition="right"
                            color={TagColor.SUCCESS}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '0px',
                            alignItems: 'center',
                            marginTop: '8px',
                        }}
                    >
                        <Tag
                            text="Left"
                            splitTagPosition="left"
                            color={TagColor.PRIMARY}
                        />
                        <Tag
                            text="Right"
                            splitTagPosition="right"
                            color={TagColor.SUCCESS}
                        />
                    </div>
                </div>
            </section>

            {/* Skeleton Button Showcase */}
            <section style={{ marginBottom: '48px' }}>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                    }}
                >
                    🔘 SkeletonButton - Perfect Button Component Mirroring
                </h2>

                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <Text
                            variant="body.sm"
                            style={{ marginBottom: '8px', color: '#666' }}
                        >
                            Primary Button
                        </Text>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton.Button
                                loading={loading}
                                text="Download File"
                                hasLeadingIcon={true}
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.MEDIUM}
                            />
                            <Button
                                text="Download File"
                                leadingIcon={<Download size={16} />}
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.MEDIUM}
                            />
                        </div>
                    </div>

                    <div>
                        <Text
                            variant="body.sm"
                            style={{ marginBottom: '8px', color: '#666' }}
                        >
                            Secondary Button
                        </Text>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton.Button
                                loading={loading}
                                text="Cancel"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                            <Button
                                text="Cancel"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Skeleton Avatar Showcase */}
            <section style={{ marginBottom: '48px' }}>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                    }}
                >
                    👤 SkeletonAvatar - Perfect Avatar Component Mirroring
                </h2>

                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    {['sm', 'md', 'lg'].map((size) => (
                        <div key={size}>
                            <Text
                                variant="body.sm"
                                style={{ marginBottom: '8px', color: '#666' }}
                            >
                                {size.toUpperCase()}
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton.Avatar
                                    loading={loading}
                                    size={size as any}
                                    shape="circle"
                                />
                                <Avatar
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                    alt="User"
                                    size={size as any}
                                    shape={AvatarShape.ROUNDED}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skeleton Card Showcase */}
            <section style={{ marginBottom: '48px' }}>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                    }}
                >
                    🃏 SkeletonCard - Complete Layout Skeletons
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <Skeleton.Card loading={loading} />

                    <div
                        style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: 'white',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '16px',
                            }}
                        >
                            <Avatar
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                alt="User"
                                size={AvatarSize.MD}
                                shape={AvatarShape.ROUNDED}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <Text variant="body.md" fontWeight={600}>
                                    John Doe
                                </Text>
                                <Text variant="body.sm" color="#666">
                                    Software Engineer
                                </Text>
                            </div>
                        </div>

                        <Text variant="body.md" style={{ marginBottom: '8px' }}>
                            This is a sample card with real content to compare
                            with the skeleton version.
                        </Text>
                        <Text variant="body.md" style={{ marginBottom: '8px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </Text>
                        <Text
                            variant="body.md"
                            style={{ marginBottom: '16px' }}
                        >
                            Sed do eiusmod tempor incididunt ut labore.
                        </Text>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '8px',
                            }}
                        >
                            <Button
                                text="Cancel"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                            <Button
                                text="Save Changes"
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Compound API Usage */}
            <section style={{ marginBottom: '48px' }}>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                    }}
                >
                    🔧 Modern Compound API Usage
                </h2>

                <div
                    style={{
                        padding: '16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                    }}
                >
                    <pre>{`// Modern Compound Component API (Recommended)
<Skeleton.Tag 
  loading={isLoading} 
  text="Primary Tag" 
  tagVariant={TagVariant.SUBTLE}
  color={TagColor.PRIMARY}
  hasLeftSlot={true}
/>

<Skeleton.Button 
  loading={isLoading} 
  text="Download File"
  hasLeadingIcon={true}
/>

<Skeleton.Avatar loading={isLoading} size="md" />

<Skeleton.Card loading={isLoading} />`}</pre>
                </div>
            </section>

            {/* Animation Variants */}
            <section style={{ marginBottom: '48px' }}>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                    }}
                >
                    ✨ Animation Variants
                </h2>

                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div>
                        <Text
                            variant="body.sm"
                            style={{ marginBottom: '8px', color: '#666' }}
                        >
                            Pulse
                        </Text>
                        <Skeleton.Tag
                            loading={true}
                            variant="pulse"
                            text="Pulse Animation"
                            color={TagColor.PRIMARY}
                        />
                    </div>

                    <div>
                        <Text
                            variant="body.sm"
                            style={{ marginBottom: '8px', color: '#666' }}
                        >
                            Wave
                        </Text>
                        <Skeleton.Tag
                            loading={true}
                            variant="wave"
                            text="Wave Animation"
                            color={TagColor.SUCCESS}
                        />
                    </div>

                    <div>
                        <Text
                            variant="body.sm"
                            style={{ marginBottom: '8px', color: '#666' }}
                        >
                            Shimmer
                        </Text>
                        <Skeleton.Tag
                            loading={true}
                            variant="shimmer"
                            text="Shimmer Animation"
                            color={TagColor.WARNING}
                        />
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    🎯 Key Features
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '8px',
                            }}
                        >
                            Perfect Token Mirroring
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Uses exact component tokens for pixel-perfect
                            matching during loading states.
                        </p>
                    </div>

                    <div
                        style={{
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '8px',
                            }}
                        >
                            Content-Aware Sizing
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Dynamic width calculation based on text length,
                            slots, and component configuration.
                        </p>
                    </div>

                    <div
                        style={{
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '8px',
                            }}
                        >
                            Modern API
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Compound component pattern with TypeScript support
                            and tree-shaking optimization.
                        </p>
                    </div>

                    <div
                        style={{
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '8px',
                            }}
                        >
                            Accessibility First
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Respects motion preferences and includes proper ARIA
                            attributes for screen readers.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SkeletonDemo
