import { CardVariant, CardAlignment } from '../../../Card/types'
import { ButtonType, ButtonSize } from '../../../Button/types'
import { Tag, TagColor, TagVariant, TagSize } from '../../../Tags'
import { Settings, TrendingUp, User, Star, CheckCircle } from 'lucide-react'
import Button from '../../../Button/Button'
import { Card } from '../../../Card'

const CardLightHouse = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Default Card Variants */}
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
                        aria-label="Analytics icon"
                    >
                        <TrendingUp size={14} color="white" />
                    </div>
                }
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
                        aria-label="Open dashboard settings"
                    />
                }
                subHeader="Real-time performance metrics and insights"
                bodyTitle="Monthly Summary"
                content="Track your key metrics and performance indicators with comprehensive analytics and real-time data visualization."
                actionButton={{
                    text: 'View Full Report',
                    buttonType: ButtonType.PRIMARY,
                    size: ButtonSize.SMALL,
                }}
            />

            <Card
                headerTitle="User Management"
                headerTag={
                    <Tag
                        text="Active"
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
                        aria-label="More options"
                    />
                }
                subHeader="Manage users and permissions"
                bodyTitle="Active Users"
                content="Currently 142 active users with various permission levels. Manage access and roles from this dashboard."
                actionButton={{
                    text: 'Manage Users',
                    buttonType: ButtonType.PRIMARY,
                    size: ButtonSize.SMALL,
                }}
            />

            <Card
                headerTitle="Simple Card"
                bodyTitle="Basic Example"
                content="This shows a minimal default card with just the essential elements."
                actionButton={{
                    text: 'Learn More',
                    buttonType: ButtonType.SECONDARY,
                    size: ButtonSize.SMALL,
                }}
            />

            {/* Aligned Card - Vertical */}
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
                        role="img"
                        aria-label="User avatar for John Doe"
                    >
                        JD
                    </div>
                }
                headerTitle="John Doe"
                headerTag={
                    <Tag
                        text="Premium"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.SUCCESS}
                        size={TagSize.SM}
                    />
                }
                subHeader="Senior Developer"
                bodyTitle="Profile Information"
                content="Senior Developer with expertise in React and Node.js. 5+ years of experience building scalable web applications."
                actionButton={{
                    text: 'View Profile',
                    buttonType: ButtonType.SECONDARY,
                    size: ButtonSize.SMALL,
                }}
            />

            <Card
                variant={CardVariant.ALIGNED}
                alignment={CardAlignment.VERTICAL}
                centerAlign={false}
                cardSlot={
                    <div
                        style={{
                            width: '100%',
                            height: '120px',
                            background:
                                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '600',
                            borderRadius: '8px',
                        }}
                        role="img"
                        aria-label="Image placeholder"
                    >
                        Image Placeholder
                    </div>
                }
                headerTitle="Image Card"
                subHeader="Standard vertical alignment"
                bodyTitle="Beautiful Gradient"
                content="This card showcases vertical alignment without center alignment, perfect for image-heavy content."
                actionButton={{
                    text: 'View Gallery',
                    buttonType: ButtonType.SECONDARY,
                    size: ButtonSize.SMALL,
                }}
            />

            {/* Aligned Card - Horizontal */}
            <Card
                variant={CardVariant.ALIGNED}
                alignment={CardAlignment.HORIZONTAL}
                centerAlign={false}
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
                        role="img"
                        aria-label="New feature icon"
                    >
                        <TrendingUp
                            size={16}
                            color="#0ea5e9"
                            aria-hidden="true"
                        />
                    </div>
                }
                headerTitle="New App Launch"
                headerSlot2={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        leadingIcon={<Settings size={16} />}
                        aria-label="More options"
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

            <Card
                variant={CardVariant.ALIGNED}
                alignment={CardAlignment.HORIZONTAL}
                centerAlign={true}
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
                        role="img"
                        aria-label="Customize icon"
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
                    size: ButtonSize.SMALL,
                }}
            />

            {/* Custom Card */}
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
                            leadingIcon={<Settings size={16} />}
                            aria-label="Settings"
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
                        role="img"
                        aria-label="User icon"
                    >
                        <User size={32} color="white" aria-hidden="true" />
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
                        <p
                            style={{
                                margin: '0',
                                color: '#666',
                                fontSize: '14px',
                            }}
                        >
                            This is a custom card where you have complete
                            control over the content. Just 16px padding wrapper!
                        </p>
                    </div>
                    <Button
                        text="Custom Action"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                    />
                </div>
            </Card>

            {/* Cards with All Features */}
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
                        aria-label="Analytics icon"
                    >
                        <Star size={14} color="white" />
                    </div>
                }
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
                        aria-label="Open dashboard settings"
                    />
                }
                subHeader="Real-time performance metrics and insights"
                bodySlot1={
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '8px',
                            border: '1px solid #bbf7d0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <CheckCircle size={16} color="#10b981" />
                        <span
                            style={{
                                fontSize: '14px',
                                color: '#166534',
                                fontWeight: '600',
                            }}
                        >
                            All systems operational
                        </span>
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
                            <div
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#10b981',
                                }}
                            >
                                92%
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
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                }}
                            >
                                Revenue
                            </div>
                        </div>
                    </div>
                }
                actionButton={{
                    text: 'View Full Report',
                    buttonType: ButtonType.PRIMARY,
                    size: ButtonSize.SMALL,
                }}
            />
        </div>
    )
}

export default CardLightHouse
