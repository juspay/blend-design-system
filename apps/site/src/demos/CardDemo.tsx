import { useState } from 'react'
import {
    Card,
    CardHeaderVariant,
    CardSlotVariant,
    Tag,
    TagColor,
    TagVariant,
    TagSize,
    SingleSelect,
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/main'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import {
    Star,
    Heart,
    MessageCircle,
    Settings,
    User,
    Calendar,
    TrendingUp,
} from 'lucide-react'

const CardDemo = () => {
    const [selectedVariant, setSelectedVariant] = useState<CardSlotVariant>(
        CardSlotVariant.TOP
    )
    const [selectedHeaderVariant, setSelectedHeaderVariant] =
        useState<CardHeaderVariant>(CardHeaderVariant.DEFAULT)

    const imageSlot = (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
            }}
        >
            Image Placeholder
        </div>
    )

    const iconSlot = (
        <div
            style={{
                width: '60px',
                height: '60px',
                background: '#f0f9ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e0f2fe',
            }}
        >
            <TrendingUp size={24} color="#0ea5e9" />
        </div>
    )
    return (
        <div
            style={{
                padding: '20px',
                gap: '32px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div>
                <h1
                    style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        marginBottom: '8px',
                    }}
                >
                    Card Component Playground
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Explore all Card variants with different slot positions and
                    header styles
                </p>
            </div>

            {/* Interactive Controls */}
            <div
                style={{
                    padding: '24px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                }}
            >
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                        }}
                    >
                        Slot Variant
                    </label>
                    <SingleSelect
                        label=""
                        placeholder="Select Slot Variant"
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Top Slot',
                                        value: CardSlotVariant.TOP,
                                    },
                                    {
                                        label: 'Top Slot with Padding',
                                        value: CardSlotVariant.TOP_WITH_PADDING,
                                    },
                                    {
                                        label: 'Left Slot',
                                        value: CardSlotVariant.LEFT,
                                    },
                                ],
                            },
                        ]}
                        selected={selectedVariant}
                        onSelect={(value) =>
                            setSelectedVariant(value as CardSlotVariant)
                        }
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                        }}
                    >
                        Header Variant
                    </label>
                    <SingleSelect
                        label=""
                        placeholder="Select Header Variant"
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Default',
                                        value: CardHeaderVariant.DEFAULT,
                                    },
                                    {
                                        label: 'Bordered',
                                        value: CardHeaderVariant.BORDERED,
                                    },
                                    {
                                        label: 'Bordered with Label',
                                        value: CardHeaderVariant.BORDERED_WITH_LABEL,
                                    },
                                ],
                            },
                        ]}
                        selected={selectedHeaderVariant}
                        onSelect={(value) =>
                            setSelectedHeaderVariant(value as CardHeaderVariant)
                        }
                    />
                </div>
            </div>

            {/* Interactive Card Example */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    Interactive Example
                </h2>
                <div style={{ maxWidth: '400px' }}>
                    <Card
                        header={{
                            variant: selectedHeaderVariant,
                            title: 'Interactive Card',
                            subtitle:
                                selectedHeaderVariant ===
                                CardHeaderVariant.BORDERED_WITH_LABEL
                                    ? undefined
                                    : 'Customize using controls above',
                            label:
                                selectedHeaderVariant ===
                                CardHeaderVariant.BORDERED_WITH_LABEL ? (
                                    <Tag
                                        text="New"
                                        variant={TagVariant.ATTENTIVE}
                                        color={TagColor.SUCCESS}
                                        size={TagSize.SM}
                                    />
                                ) : undefined,
                            actions: (
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Settings size={16} />}
                                />
                            ),
                        }}
                        slot={{
                            variant: selectedVariant,
                            content:
                                selectedVariant === CardSlotVariant.LEFT
                                    ? iconSlot
                                    : imageSlot,
                            centerAlign:
                                selectedVariant ===
                                CardSlotVariant.TOP_WITH_PADDING,
                        }}
                        bottomButton={{
                            text: 'Primary Action',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            <Text>
                                This card demonstrates the{' '}
                                {selectedVariant.replace('_', ' ')} variant with{' '}
                                {selectedHeaderVariant} header style.
                            </Text>
                        </div>
                    </Card>
                </div>
            </div>

            {/* All Variants Showcase */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    All Card Variants
                </h2>

                {/* Top Slot Variants */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '16px',
                        }}
                    >
                        Top Slot Variants
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        {/* Top Slot without Padding */}
                        <Card
                            header={{
                                variant: CardHeaderVariant.DEFAULT,
                                title: 'Top Slot',
                                subtitle: 'No padding in slot area',
                                actions: <Star size={16} color="#fbbf24" />,
                            }}
                            slot={{
                                variant: CardSlotVariant.TOP,
                                content: imageSlot,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <Text>
                                    Content area has 16px padding. Slot takes
                                    50% height with no padding.
                                </Text>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Tag
                                        text="Design"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.PRIMARY}
                                        size={TagSize.SM}
                                    />
                                    <Tag
                                        text="UI/UX"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.PURPLE}
                                        size={TagSize.SM}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Top Slot with Padding */}
                        <Card
                            header={{
                                variant: CardHeaderVariant.DEFAULT,
                                title: 'Top Slot with Padding',
                                subtitle: 'Centered content in slot',
                            }}
                            slot={{
                                variant: CardSlotVariant.TOP_WITH_PADDING,
                                content: (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        <User
                                            size={32}
                                            style={{ marginBottom: '8px' }}
                                        />
                                        <div
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            User Profile
                                        </div>
                                    </div>
                                ),
                            }}
                            bottomButton={{
                                text: 'View Profile',
                                buttonType: ButtonType.PRIMARY,
                                size: ButtonSize.SMALL,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <Text>
                                    Slot has padding and content is centered.
                                    Perfect for profile cards.
                                </Text>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Left Slot Variant */}
                <div style={{ marginBottom: '32px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '16px',
                        }}
                    >
                        Left Slot Variant
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        <Card
                            header={{
                                variant: CardHeaderVariant.BORDERED,
                                title: 'Analytics Dashboard',
                                subtitle: 'Monthly performance metrics',
                                actions: (
                                    <div
                                        style={{ display: 'flex', gap: '8px' }}
                                    >
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                            leadingIcon={<Calendar size={16} />}
                                        />
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                            leadingIcon={<Settings size={16} />}
                                        />
                                    </div>
                                ),
                            }}
                            slot={{
                                variant: CardSlotVariant.LEFT,
                                content: iconSlot,
                            }}
                            bottomButton={{
                                text: 'View Details',
                                buttonType: ButtonType.PRIMARY,
                                size: ButtonSize.SMALL,
                            }}
                        >
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
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                        }}
                                    >
                                        $12,345
                                    </Text>
                                    <Tag
                                        text="+12%"
                                        variant={TagVariant.ATTENTIVE}
                                        color={TagColor.SUCCESS}
                                        size={TagSize.SM}
                                    />
                                </div>
                                <Text style={{ color: '#666' }}>
                                    Revenue increased by 12% compared to last
                                    month. Great progress!
                                </Text>
                            </div>
                        </Card>

                        <Card
                            header={{
                                variant: CardHeaderVariant.DEFAULT,
                                title: 'Team Member',
                                actions: (
                                    <MessageCircle size={16} color="#6b7280" />
                                ),
                            }}
                            slot={{
                                variant: CardSlotVariant.LEFT,
                                content: (
                                    <div
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background:
                                                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '20px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        JD
                                    </div>
                                ),
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <div>
                                    <Text
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        John Doe
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#666',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Senior Developer
                                    </Text>
                                </div>
                                <Text style={{ fontSize: '14px' }}>
                                    Experienced full-stack developer with
                                    expertise in React and Node.js.
                                </Text>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '6px',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Tag
                                        text="React"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.PRIMARY}
                                        size={TagSize.SM}
                                    />
                                    <Tag
                                        text="Node.js"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.SUCCESS}
                                        size={TagSize.SM}
                                    />
                                    <Tag
                                        text="TypeScript"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.WARNING}
                                        size={TagSize.SM}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* No Slot Examples */}
                <div>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '16px',
                        }}
                    >
                        Traditional Cards (No Slots)
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        <Card
                            header={{
                                variant: CardHeaderVariant.DEFAULT,
                                title: 'Simple Card',
                                subtitle: 'Basic card without slots',
                            }}
                        >
                            <Text>
                                This is a traditional card without any slots.
                                Perfect for simple content display.
                            </Text>
                        </Card>

                        <Card
                            header={{
                                variant: CardHeaderVariant.BORDERED,
                                title: 'Bordered Header',
                                actions: <Heart size={16} color="#ef4444" />,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <Text>Card with bordered header variant.</Text>
                                <Button
                                    text="Action Button"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                />
                            </div>
                        </Card>

                        <Card
                            header={{
                                variant: CardHeaderVariant.BORDERED_WITH_LABEL,
                                title: 'Header with Label',
                                label: (
                                    <Tag
                                        text="Featured"
                                        variant={TagVariant.ATTENTIVE}
                                        color={TagColor.PRIMARY}
                                        size={TagSize.SM}
                                    />
                                ),
                            }}
                        >
                            <Text>
                                This card uses the bordered with label header
                                variant with gray-25 background.
                            </Text>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Usage Guidelines */}
            <div
                style={{
                    padding: '24px',
                    background: '#f0f9ff',
                    borderRadius: '12px',
                    border: '1px solid #e0f2fe',
                }}
            >
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '12px',
                    }}
                >
                    Usage Guidelines
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <div>
                        <Text
                            style={{ fontWeight: '600', marginBottom: '4px' }}
                        >
                            Top Slot
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                            Use for image headers, charts, or visual content
                            that should take prominent space.
                        </Text>
                    </div>
                    <div>
                        <Text
                            style={{ fontWeight: '600', marginBottom: '4px' }}
                        >
                            Left Slot
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                            Perfect for avatars, icons, or small visual elements
                            alongside content.
                        </Text>
                    </div>
                    <div>
                        <Text
                            style={{ fontWeight: '600', marginBottom: '4px' }}
                        >
                            Header with Label
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                            Use when you need to highlight status or category
                            with a prominent header.
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDemo
