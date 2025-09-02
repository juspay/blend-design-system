import { useState } from 'react'
import {
    Card,
    CardVariant,
    CardAlignment,
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
    Settings,
    User,
    TrendingUp,
    MoreHorizontal,
    Calendar,
} from 'lucide-react'

const CardDemo = () => {
    const [selectedVariant, setSelectedVariant] = useState<CardVariant>(
        CardVariant.DEFAULT
    )
    const [selectedAlignment, setSelectedAlignment] = useState<CardAlignment>(
        CardAlignment.VERTICAL
    )
    const [centerAlign, setCenterAlign] = useState(false)

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

    const iconSlot = (
        <div
            style={{
                width: '32px',
                height: '32px',
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
                    Explore the new Card structure with Default, Aligned, and
                    Custom variants
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
                        Card Variant
                    </label>
                    <SingleSelect
                        label=""
                        placeholder="Select Card Variant"
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Default',
                                        value: CardVariant.DEFAULT,
                                    },
                                    {
                                        label: 'Aligned',
                                        value: CardVariant.ALIGNED,
                                    },
                                    {
                                        label: 'Custom',
                                        value: CardVariant.CUSTOM,
                                    },
                                ],
                            },
                        ]}
                        selected={selectedVariant}
                        onSelect={(value) =>
                            setSelectedVariant(value as CardVariant)
                        }
                    />
                </div>

                {selectedVariant === CardVariant.ALIGNED && (
                    <>
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                }}
                            >
                                Alignment
                            </label>
                            <SingleSelect
                                label=""
                                placeholder="Select Alignment"
                                items={[
                                    {
                                        items: [
                                            {
                                                label: 'Vertical',
                                                value: CardAlignment.VERTICAL,
                                            },
                                            {
                                                label: 'Horizontal',
                                                value: CardAlignment.HORIZONTAL,
                                            },
                                        ],
                                    },
                                ]}
                                selected={selectedAlignment}
                                onSelect={(value) =>
                                    setSelectedAlignment(value as CardAlignment)
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
                                Center Align
                            </label>
                            <Button
                                text={centerAlign ? 'Enabled' : 'Disabled'}
                                buttonType={
                                    centerAlign
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                size={ButtonSize.SMALL}
                                onClick={() => setCenterAlign(!centerAlign)}
                            />
                        </div>
                    </>
                )}
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
                }}
            >
                <strong>Card Structure:</strong>
                <br />• <strong>Default:</strong> Header box (gray 25) + Body
                content with all slots
                <br />• <strong>Aligned:</strong> Vertical/Horizontal layout, no
                headerSlot1 & bodySlot2
                <br />• <strong>Custom:</strong> Simple 16px padding wrapper for
                custom content
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
                    {selectedVariant === CardVariant.DEFAULT && (
                        <Card
                            headerSlot1={
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
                            }
                            headerTitle="Default Card"
                            headerTag={
                                <Tag
                                    text="New"
                                    variant={TagVariant.ATTENTIVE}
                                    color={TagColor.SUCCESS}
                                    size={TagSize.SM}
                                />
                            }
                            headerSlot2={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Settings size={16} />}
                                />
                            }
                            subHeader="This demonstrates the header box with gray 25 background"
                            bodySlot1={
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
                                        📋 Body Slot 1: Important notice or
                                        status
                                    </Text>
                                </div>
                            }
                            bodyTitle="Body Title Section"
                            content="This is the main content area where you can put any descriptive text or information about the card."
                            bodySlot2={
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '8px',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Tag
                                        text="Feature"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.PRIMARY}
                                        size={TagSize.SM}
                                    />
                                    <Tag
                                        text="Demo"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.PURPLE}
                                        size={TagSize.SM}
                                    />
                                </div>
                            }
                            actionButton={{
                                text: 'Take Action',
                                buttonType: ButtonType.PRIMARY,
                                size: ButtonSize.SMALL,
                            }}
                        />
                    )}

                    {selectedVariant === CardVariant.ALIGNED && (
                        <Card
                            variant={CardVariant.ALIGNED}
                            alignment={selectedAlignment}
                            centerAlign={centerAlign}
                            cardSlot={
                                selectedAlignment === CardAlignment.VERTICAL
                                    ? imageSlot
                                    : iconSlot
                            }
                            headerTitle="Aligned Card"
                            headerTag={
                                <Tag
                                    text="Aligned"
                                    variant={TagVariant.ATTENTIVE}
                                    color={TagColor.WARNING}
                                    size={TagSize.SM}
                                />
                            }
                            headerSlot2={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<MoreHorizontal size={16} />}
                                />
                            }
                            subHeader={`${selectedAlignment} alignment ${centerAlign ? 'with center align' : 'without center align'}`}
                            bodyTitle="Aligned Content"
                            content="CardSlot positioned based on alignment, content shows center alignment effect."
                            actionButton={{
                                text: 'Aligned Action',
                                buttonType: ButtonType.PRIMARY,
                                size: ButtonSize.SMALL,
                            }}
                        />
                    )}

                    {selectedVariant === CardVariant.CUSTOM && (
                        <Card variant={CardVariant.CUSTOM}>
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
                                        Custom Content
                                    </h3>
                                    <p
                                        style={{
                                            margin: '0',
                                            color: '#666',
                                            fontSize: '14px',
                                        }}
                                    >
                                        This is a custom card where you have
                                        complete control over the content. Just
                                        16px padding wrapper!
                                    </p>
                                </div>
                                <Button
                                    text="Custom Action"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                />
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Default Card Examples */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    Default Card Examples
                </h2>
                <p
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '20px',
                    }}
                >
                    Default cards have a header box (gray 25 background) and
                    body content area with proper spacing:
                    <br />• <strong>Header:</strong> headerSlot1 → headerTitle →
                    headerTag → headerSlot2 (8px gaps)
                    <br />• <strong>Sub Header:</strong> Below header with 4px
                    gap
                    <br />• <strong>Body:</strong> bodySlot1 → bodyTitle →
                    content → bodySlot2 → actionButton
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
                    {/* Full Featured Default Card */}
                    <Card
                        headerSlot1={iconSlot}
                        headerTitle="Analytics Dashboard"
                        headerTag={
                            <Tag
                                text="Pro"
                                variant={TagVariant.ATTENTIVE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        }
                        headerSlot2={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<Settings size={16} />}
                            />
                        }
                        subHeader="Real-time performance metrics and insights"
                        bodySlot1={
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
                                    <Text
                                        style={{
                                            fontSize: '14px',
                                            color: '#0ea5e9',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Performance is up 23% this month
                                    </Text>
                                </div>
                            </div>
                        }
                        bodyTitle="Monthly Summary"
                        content="Track your key metrics and performance indicators with comprehensive analytics and real-time data visualization."
                        bodySlot2={
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
                        }
                        actionButton={{
                            text: 'View Full Report',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Minimal Default Card */}
                    <Card
                        headerTitle="Simple Card"
                        headerSlot2={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<MoreHorizontal size={16} />}
                            />
                        }
                        bodyTitle="Basic Example"
                        content="This shows a minimal default card with just the essential elements."
                        actionButton={{
                            text: 'Learn More',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Card with Tags */}
                    <Card
                        headerTitle="Project Status"
                        headerTag={
                            <Tag
                                text="Active"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        }
                        subHeader="Current development progress"
                        content="All systems are operational and the project is progressing according to schedule."
                        bodySlot2={
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Tag
                                    text="Frontend"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.PRIMARY}
                                    size={TagSize.SM}
                                />
                                <Tag
                                    text="Backend"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.PURPLE}
                                    size={TagSize.SM}
                                />
                                <Tag
                                    text="Testing"
                                    variant={TagVariant.SUBTLE}
                                    color={TagColor.WARNING}
                                    size={TagSize.SM}
                                />
                            </div>
                        }
                        actionButton={{
                            text: 'View Details',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />
                </div>
            </div>

            {/* Aligned Card Examples */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    Aligned Card Examples
                </h2>
                <p
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '20px',
                    }}
                >
                    Aligned cards support vertical/horizontal layouts with
                    optional center alignment:
                    <br />• <strong>No headerSlot1</strong> and{' '}
                    <strong>no bodySlot2</strong>
                    <br />• <strong>centerAlign</strong> option centers all
                    content
                    <br />• Perfect for image cards, profile cards, or
                    horizontal layouts
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
                    {/* Vertical Aligned Card - Center Aligned */}
                    <Card
                        variant={CardVariant.ALIGNED}
                        alignment={CardAlignment.VERTICAL}
                        centerAlign={true}
                        cardSlot={
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background:
                                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                        }
                        headerTitle="Profile Card"
                        headerTag={
                            <Tag
                                text="Premium"
                                variant={TagVariant.ATTENTIVE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        }
                        subHeader="Centered vertical layout"
                        bodyTitle="John Doe"
                        content="Senior Developer with expertise in React and Node.js."
                        actionButton={{
                            text: 'View Profile',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Horizontal Aligned Card */}
                    <Card
                        variant={CardVariant.ALIGNED}
                        alignment={CardAlignment.HORIZONTAL}
                        cardSlot={
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
                                <TrendingUp size={24} color="#0ea5e9" />
                            </div>
                        }
                        headerTitle="New App Launch"
                        headerSlot2={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<MoreHorizontal size={16} />}
                            />
                        }
                        subHeader="Description (max 1-2 lines)"
                        content="Lorem ipsum dolor sit amet consectetur. Suscipit at dolor morbi adipiscing."
                        actionButton={{
                            text: 'Send Message',
                            buttonType: ButtonType.PRIMARY,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Vertical without Center Align */}
                    <Card
                        variant={CardVariant.ALIGNED}
                        alignment={CardAlignment.VERTICAL}
                        centerAlign={false}
                        cardSlot={imageSlot}
                        headerTitle="Image Card"
                        subHeader="Standard vertical alignment"
                        bodyTitle="Beautiful Gradient"
                        content="This card showcases vertical alignment without center alignment, perfect for image-heavy content."
                        actionButton={{
                            text: 'View Gallery',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Aligned Card without cardSlot */}
                    <Card
                        variant={CardVariant.ALIGNED}
                        alignment={CardAlignment.VERTICAL}
                        headerTitle="No CardSlot"
                        headerTag={
                            <Tag
                                text="Full Space"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.PRIMARY}
                                size={TagSize.SM}
                            />
                        }
                        subHeader="Header and body take full card space with 16px padding"
                        bodyTitle="Full Width Content"
                        content="When no cardSlot is provided, the header and body content take the full card space with proper 16px padding throughout."
                        actionButton={{
                            text: 'Learn More',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />

                    {/* Horizontal Aligned Card - Matching Figma */}
                    <Card
                        variant={CardVariant.ALIGNED}
                        alignment={CardAlignment.HORIZONTAL}
                        cardSlot={
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
                                        width: '24px',
                                        height: '24px',
                                        background: 'rgba(255,255,255,0.2)',
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                        }
                        headerTitle="Customize Board"
                        headerTag={
                            <Tag
                                text="NEW"
                                variant={TagVariant.ATTENTIVE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        }
                        subHeader="Description (max 1-2 lines)"
                        content="Lorem ipsum dolor sit amet consectetur. Suscipit at dolor morbi adipiscing dispiscing..."
                        actionButton={{
                            text: 'Latest Feature',
                            buttonType: ButtonType.SECONDARY,
                            subType: ButtonSubType.INLINE,
                            size: ButtonSize.SMALL,
                        }}
                    />
                </div>
            </div>

            {/* Custom Card Examples */}
            <div>
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }}
                >
                    Custom Card Examples
                </h2>
                <p
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '20px',
                    }}
                >
                    Custom cards provide a simple 16px padding wrapper for
                    complete creative control:
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
                    {/* Custom Dashboard Card */}
                    <Card variant={CardVariant.CUSTOM}>
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
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                        }}
                                    >
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
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                        }}
                                    >
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
                    </Card>

                    {/* Custom Form Card */}
                    <Card variant={CardVariant.CUSTOM}>
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
                    </Card>
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
                    Card Usage Guidelines
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
                            Default Cards
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                            Use for structured content with header box (gray 25)
                            and all available slots. Perfect for dashboards and
                            data displays.
                        </Text>
                    </div>
                    <div>
                        <Text
                            style={{ fontWeight: '600', marginBottom: '4px' }}
                        >
                            Aligned Cards
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                            Use for image cards, profiles, or when you need
                            specific layout control. No headerSlot1 or
                            bodySlot2.
                        </Text>
                    </div>
                    <div>
                        <Text
                            style={{ fontWeight: '600', marginBottom: '4px' }}
                        >
                            Custom Cards
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                            Use when you need complete creative control. Just a
                            16px padding wrapper for your custom content.
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDemo
