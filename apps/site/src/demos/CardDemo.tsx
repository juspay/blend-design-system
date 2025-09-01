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
    ButtonSubType,
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
    MoreHorizontal,
    Bell,
    Download,
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

            {/* Explanation Note */}
            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '8px',
                    border: '1px solid #e0f2fe',
                    fontSize: '14px',
                    color: '#1e40af',
                    marginBottom: '20px',
                }}
            >
                <strong>Note:</strong> When "Bordered" header variant is
                selected, it uses the new bordered header pattern with gray 25
                background and gray 200 border. For other variants, slot
                selections (Top/Left) will show the legacy card patterns with
                proper spacing and alignment.
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
                    {/* Standard Card */}
                    {selectedVariant === CardSlotVariant.TOP &&
                        selectedHeaderVariant === CardHeaderVariant.DEFAULT && (
                            <Card
                                title="Standard Card"
                                titleSlot={
                                    <Tag
                                        text="Standard"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.PRIMARY}
                                        size={TagSize.SM}
                                    />
                                }
                                headerActionSlot={
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        leadingIcon={<Settings size={16} />}
                                    />
                                }
                                description="This follows the new standardized pattern with proper spacing and typography guidelines."
                                content={
                                    <div
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#f3f4f6',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <Text style={{ fontSize: '14px' }}>
                                            Content area with standard 16px gap
                                            from description
                                        </Text>
                                    </div>
                                }
                                actionButton={{
                                    text: 'Primary Action',
                                    buttonType: ButtonType.PRIMARY,
                                    size: ButtonSize.SMALL,
                                }}
                            />
                        )}

                    {/* Bordered Header Card */}
                    {selectedHeaderVariant === CardHeaderVariant.BORDERED && (
                        <Card
                            borderedHeader={{
                                title: 'Bordered Header Card',
                                titleSlot: (
                                    <Tag
                                        text="Bordered"
                                        variant={TagVariant.ATTENTIVE}
                                        color={TagColor.SUCCESS}
                                        size={TagSize.SM}
                                    />
                                ),
                                headerActionSlot: (
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        leadingIcon={<Settings size={16} />}
                                    />
                                ),
                                headerDescription:
                                    'Gray 25 background with gray 200 border',
                                topSlot: (
                                    <div
                                        style={{
                                            height: '60px',
                                            backgroundColor: '#f0f9ff',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #e0f2fe',
                                        }}
                                    >
                                        <TrendingUp size={24} color="#0ea5e9" />
                                    </div>
                                ),
                                subHeaderTitle: 'Sub Header Title',
                                description:
                                    'Description with 6px gap from sub header title. All spacing follows the exact specifications.',
                                content: (
                                    <div
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#f3f4f6',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <Text style={{ fontSize: '14px' }}>
                                            Content with 14px gaps between
                                            elements
                                        </Text>
                                    </div>
                                ),
                                actionButton: {
                                    text: 'Bordered Action',
                                    buttonType: ButtonType.PRIMARY,
                                    size: ButtonSize.SMALL,
                                },
                            }}
                        />
                    )}

                    {/* Legacy Top Slot Card */}
                    {selectedVariant === CardSlotVariant.TOP &&
                        selectedHeaderVariant !==
                            CardHeaderVariant.BORDERED && (
                            <Card
                                header={{
                                    variant: selectedHeaderVariant,
                                    title: 'Top Slot Card',
                                    subtitle:
                                        selectedHeaderVariant ===
                                        CardHeaderVariant.BORDERED_WITH_LABEL
                                            ? undefined
                                            : 'Image at the top',
                                    label:
                                        selectedHeaderVariant ===
                                        CardHeaderVariant.BORDERED_WITH_LABEL ? (
                                            <Tag
                                                text="Featured"
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
                                    content: imageSlot,
                                }}
                                actionButton={{
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
                                    <Text>
                                        Top slot takes 50% height with image
                                        content. Content area below with proper
                                        spacing.
                                    </Text>
                                </div>
                            </Card>
                        )}

                    {/* Legacy Top Slot with Padding (Center Aligned) */}
                    {selectedVariant === CardSlotVariant.TOP_WITH_PADDING &&
                        selectedHeaderVariant !==
                            CardHeaderVariant.BORDERED && (
                            <Card
                                header={{
                                    variant: selectedHeaderVariant,
                                    title: 'Top Slot with Padding',
                                    subtitle:
                                        selectedHeaderVariant ===
                                        CardHeaderVariant.BORDERED_WITH_LABEL
                                            ? undefined
                                            : 'Centered content',
                                    label:
                                        selectedHeaderVariant ===
                                        CardHeaderVariant.BORDERED_WITH_LABEL ? (
                                            <Tag
                                                text="Centered"
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
                                    content: (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
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
                                                Centered Content
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '14px',
                                                    marginTop: '4px',
                                                }}
                                            >
                                                Everything is center aligned
                                            </div>
                                        </div>
                                    ),
                                    centerAlign: true,
                                }}
                                actionButton={{
                                    text: 'Center Action',
                                    buttonType: ButtonType.PRIMARY,
                                    size: ButtonSize.SMALL,
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text>
                                        Content is center aligned when
                                        centerAlign is true. Perfect for profile
                                        cards.
                                    </Text>
                                </div>
                            </Card>
                        )}

                    {/* Legacy Left Slot Card */}
                    {selectedVariant === CardSlotVariant.LEFT &&
                        selectedHeaderVariant !==
                            CardHeaderVariant.BORDERED && (
                            <Card
                                header={{
                                    variant: selectedHeaderVariant,
                                    title: 'Left Slot Card',
                                    subtitle:
                                        selectedHeaderVariant ===
                                        CardHeaderVariant.BORDERED_WITH_LABEL
                                            ? undefined
                                            : 'Icon on the left',
                                    label:
                                        selectedHeaderVariant ===
                                        CardHeaderVariant.BORDERED_WITH_LABEL ? (
                                            <Tag
                                                text="Left"
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
                                    content: iconSlot,
                                }}
                                actionButton={{
                                    text: 'Left Action',
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
                                        Left slot contains icon/avatar. Content
                                        flows to the right with proper gap
                                        spacing.
                                    </Text>
                                    <div
                                        style={{ display: 'flex', gap: '8px' }}
                                    >
                                        <Tag
                                            text="Layout"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.PRIMARY}
                                            size={TagSize.SM}
                                        />
                                        <Tag
                                            text="Design"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.PURPLE}
                                            size={TagSize.SM}
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}
                </div>
            </div>

            {/* Standardized Card Examples */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    New Standardized Card Pattern
                </h2>
                <p
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '20px',
                    }}
                >
                    These cards follow the new standardized content pattern:
                    <br />• <strong>Title</strong> (Body LG, Gray 800,
                    font-weight 600) + optional <strong>titleSlot</strong> (8px
                    gap)
                    <br />• <strong>headerActionSlot</strong> on the right
                    (space-between layout)
                    <br />• <strong>Description</strong> (Body MD, Gray 500, max
                    2 lines with truncation, 4px gap from header)
                    <br />• <strong>Content slot</strong> (16px gap from
                    description)
                    <br />• <strong>Action button</strong> (14px gap for inline
                    buttons, 24px gap for regular buttons)
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '20px',
                        marginBottom: '32px',
                    }}
                >
                    {/* Basic Standardized Card */}
                    <Card
                        title="Project Overview"
                        description="Track your project progress and manage team collaboration effectively with real-time updates and notifications."
                        content={
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
                                            fontSize: '14px',
                                            color: '#666',
                                        }}
                                    >
                                        Progress
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        75%
                                    </Text>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '8px',
                                        backgroundColor: '#f3f4f6',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '75%',
                                            height: '100%',
                                            backgroundColor: '#10b981',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        actionButton={{
                            text: 'View Details',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    <Card
                        title="Notifications"
                        titleSlot={
                            <Tag
                                text="3 New"
                                variant={TagVariant.ATTENTIVE}
                                color={TagColor.WARNING}
                                size={TagSize.SM}
                            />
                        }
                        headerActionSlot={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<Bell size={16} />}
                            />
                        }
                        description="Stay updated with the latest notifications from your team and projects."
                        content={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <div
                                    style={{
                                        padding: '8px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        New message from John
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                        }}
                                    >
                                        2 minutes ago
                                    </Text>
                                </div>
                                <div
                                    style={{
                                        padding: '8px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Task completed
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                        }}
                                    >
                                        5 minutes ago
                                    </Text>
                                </div>
                            </div>
                        }
                        actionButton={{
                            text: 'View All',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Card with Menu Action */}
                    <Card
                        title="Downloads"
                        headerActionSlot={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<MoreHorizontal size={16} />}
                            />
                        }
                        description="Access and manage your downloaded files and documents from various projects and sources."
                        content={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <Download size={16} color="#6b7280" />
                                    <div style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            project-report.pdf
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '12px',
                                                color: '#666',
                                            }}
                                        >
                                            2.4 MB
                                        </Text>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <Download size={16} color="#6b7280" />
                                    <div style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            design-assets.zip
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '12px',
                                                color: '#666',
                                            }}
                                        >
                                            15.8 MB
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        }
                        actionButton={{
                            text: 'Manage Files',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Simple Card with just header and action */}
                    <Card
                        title="Quick Actions"
                        actionButton={{
                            text: 'Get Started',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Card with long description (truncated) */}
                    <Card
                        title="Documentation"
                        titleSlot={
                            <Tag
                                text="Updated"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        }
                        description="This is a very long description that should be truncated after two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
                        content={
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Tag
                                    text="API"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.PRIMARY}
                                    size={TagSize.SM}
                                />
                                <Tag
                                    text="Components"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.PURPLE}
                                    size={TagSize.SM}
                                />
                                <Tag
                                    text="Guides"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.SUCCESS}
                                    size={TagSize.SM}
                                />
                            </div>
                        }
                        actionButton={{
                            text: 'Read More',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Card with only content slot */}
                    <Card
                        title="Statistics"
                        content={
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px',
                                }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <Text
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#10b981',
                                        }}
                                    >
                                        142
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                        }}
                                    >
                                        Active Users
                                    </Text>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Text
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#3b82f6',
                                        }}
                                    >
                                        89%
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                        }}
                                    >
                                        Completion
                                    </Text>
                                </div>
                            </div>
                        }
                    />

                    {/* Card demonstrating regular button spacing (24px gap) */}
                    <Card
                        title="Regular Button Gap"
                        description="This card demonstrates the 24px gap between content and regular buttons."
                        content={
                            <div
                                style={{
                                    padding: '12px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '6px',
                                }}
                            >
                                <Text style={{ fontSize: '14px' }}>
                                    Content area above button
                                </Text>
                            </div>
                        }
                        actionButton={{
                            text: 'Regular Button',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Card demonstrating inline button spacing (14px gap) */}
                    <Card
                        title="Inline Button Gap"
                        description="This card demonstrates the 14px gap between content and inline buttons."
                        content={
                            <div
                                style={{
                                    padding: '12px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '6px',
                                }}
                            >
                                <Text style={{ fontSize: '14px' }}>
                                    Content area above button
                                </Text>
                            </div>
                        }
                        actionButton={{
                            text: 'Inline Button',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />
                </div>
            </div>

            {/* Bordered Header Variant Examples */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    Bordered Header Variant
                </h2>
                <p
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '20px',
                    }}
                >
                    Bordered header cards have a special layout with:
                    <br />• <strong>Header</strong>: Gray 25 background, 12px
                    top/bottom + 16px left/right padding
                    <br />• <strong>Header title</strong> (Body LG, Gray 800,
                    font-weight 600) + optional slots
                    <br />• <strong>Header description</strong> (Body SM, Gray
                    500) below title
                    <br />• <strong>Content area</strong>: Standard padding with
                    specific spacing
                    <br />• <strong>Sub header title</strong> (Body MD, Gray
                    800, font-weight 500) - 14px gap from slot
                    <br />• <strong>Description</strong> (Body MD, Gray 500) -
                    6px gap from sub header
                    <br />• <strong>Content + Action</strong> with 14px gaps
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '20px',
                        marginBottom: '32px',
                    }}
                >
                    {/* Bordered Header Card - Full Example */}
                    <Card
                        borderedHeader={{
                            title: 'Analytics Dashboard',
                            titleSlot: (
                                <Tag
                                    text="Pro"
                                    variant={TagVariant.ATTENTIVE}
                                    color={TagColor.SUCCESS}
                                    size={TagSize.SM}
                                />
                            ),
                            headerActionSlot: (
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Settings size={16} />}
                                />
                            ),
                            headerDescription: 'Real-time performance metrics',
                            topSlot: (
                                <div
                                    style={{
                                        height: '60px',
                                        backgroundColor: '#f0f9ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #e0f2fe',
                                    }}
                                >
                                    <TrendingUp size={24} color="#0ea5e9" />
                                </div>
                            ),
                            subHeaderTitle: 'Monthly Performance',
                            description:
                                'Track your key metrics and performance indicators with real-time data visualization and insights.',
                            content: (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '16px',
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: '#10b981',
                                            }}
                                        >
                                            92%
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '12px',
                                                color: '#666',
                                            }}
                                        >
                                            Success Rate
                                        </Text>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: '#3b82f6',
                                            }}
                                        >
                                            $12.5K
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '12px',
                                                color: '#666',
                                            }}
                                        >
                                            Revenue
                                        </Text>
                                    </div>
                                </div>
                            ),
                            actionButton: {
                                text: 'View Report',
                                buttonType: ButtonType.PRIMARY,
                                size: ButtonSize.SMALL,
                            },
                        }}
                    />

                    {/* Bordered Header Card - Minimal Example */}
                    <Card
                        borderedHeader={{
                            title: 'Team Updates',
                            headerActionSlot: (
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Bell size={16} />}
                                />
                            ),
                            headerDescription: 'Latest activity',
                            subHeaderTitle: 'Recent Changes',
                            description:
                                'Stay informed about the latest updates and changes from your team members.',
                            actionButton: {
                                text: 'View All',
                                buttonType: ButtonType.SECONDARY,
                                subType: ButtonSubType.INLINE,
                                size: ButtonSize.SMALL,
                            },
                        }}
                    />

                    {/* Bordered Header Card - With Content Slot */}
                    <Card
                        borderedHeader={{
                            title: 'Project Status',
                            titleSlot: (
                                <Tag
                                    text="Active"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.SUCCESS}
                                    size={TagSize.SM}
                                />
                            ),
                            headerDescription: 'Current project overview',
                            topSlot: (
                                <div
                                    style={{
                                        padding: '12px',
                                        backgroundColor: '#fef3c7',
                                        borderRadius: '6px',
                                        border: '1px solid #fbbf24',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: '14px',
                                            color: '#92400e',
                                        }}
                                    >
                                        🚀 Project is on track and progressing
                                        well
                                    </Text>
                                </div>
                            ),
                            subHeaderTitle: 'Development Progress',
                            content: (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text style={{ fontSize: '14px' }}>
                                            Frontend
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            85%
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text style={{ fontSize: '14px' }}>
                                            Backend
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            92%
                                        </Text>
                                    </div>
                                </div>
                            ),
                            actionButton: {
                                text: 'View Details',
                                buttonType: ButtonType.PRIMARY,
                                size: ButtonSize.SMALL,
                            },
                        }}
                    />
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
                    Legacy Card Variants
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
                            actionButton={{
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
                            actionButton={{
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
