/**
 * ComponentShowcase
 *
 * Renders product-like preview cards so token changes can be judged in context.
 * Must be rendered inside a <ThemeProvider> from the parent.
 */

import checkoutIconUrl from '../svg/CheckoutIcon.svg'
import nodeConfigurationUrl from '../svg/NodeConfiguration.svg'
import costEffectiveIcon from '../svg/CostEffective.svg'
import { forwardRef, type ReactNode } from 'react'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2Type,
    StatCardV2,
    StatCardV2ArrowDirection,
    StatCardV2ChangeType,
    StatCardV2Variant,
    TagV2,
    TagV2Color,
    TagV2Type,
    Card,
    CardVariant,
} from '@juspay/blend-design-system'
import {
    BellSlashIcon,
    ArrowCircleDownIcon,
    RecycleIcon,
    WarningDiamondIcon,
    LightningIcon,
    CurrencyCircleDollarIcon,
    WarningOctagonIcon,
    GearSixIcon,
    CaretRightIcon,
} from '@phosphor-icons/react'
import {
    AUTHORIZATION_RATE_CHART_OPTIONS,
    getShowcaseClassNames,
    getShowcaseGridClassNames,
    type ShowcaseTheme,
} from '@/components/utils'

interface ComponentShowcaseProps {
    theme?: ShowcaseTheme
    className?: string
    isMobile?: boolean
}

export const ComponentShowcase = forwardRef<
    HTMLDivElement,
    ComponentShowcaseProps
>(({ theme = 'light', className = '', isMobile = false }, ref) => {
    const { surface, cardHeader, title, subtitle, betaNotice } =
        getShowcaseClassNames(theme)

    return (
        <div
            ref={ref}
            className={`min-h-full rounded-[28px] mx-[50px] ${surface} ${className}`}
        >
            <div className={getShowcaseGridClassNames(isMobile)}>
                <Card variant={CardVariant.CUSTOM}>
                    <div
                        className={`flex items-center justify-between border-b px-[16px] py-[12px] ${cardHeader}`}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <img
                                src={checkoutIconUrl}
                                alt="Hyper Checkout"
                                className="block h-5 w-5 shrink-0"
                            />
                            <span className={`title ${title}`}>
                                Hyper Checkout
                            </span>
                            <TagV2
                                text="Recommended"
                                color={TagV2Color.PRIMARY}
                                type={TagV2Type.SUBTLE}
                            />
                        </div>
                        <ButtonV2
                            text="Add +"
                            buttonType={ButtonV2Type.SECONDARY}
                        />
                    </div>
                    <div className="flex flex-col gap-2 p-[16px]">
                        <div className="flex flex-col gap-2">
                            <TagV2
                                text="14/17 Selected Features Available"
                                leftSlot={{
                                    slot: (
                                        <WarningOctagonIcon className="h-3.5 w-3.5" />
                                    ),
                                }}
                                color={TagV2Color.PURPLE}
                                type={TagV2Type.SUBTLE}
                            />
                            <div className="flex gap-2">
                                <TagV2
                                    text="Customisable UI"
                                    leftSlot={{
                                        slot: (
                                            <BellSlashIcon className="h-3.5 w-3.5" />
                                        ),
                                    }}
                                    color={TagV2Color.NEUTRAL}
                                    type={TagV2Type.SUBTLE}
                                />
                                <TagV2
                                    text="Easy Integration"
                                    leftSlot={{
                                        slot: (
                                            <ArrowCircleDownIcon className="h-3.5 w-3.5" />
                                        ),
                                    }}
                                    color={TagV2Color.NEUTRAL}
                                    type={TagV2Type.SUBTLE}
                                />
                            </div>
                        </div>
                        <p className={`subtitle inter-display ${subtitle}`}>
                            Accept payments across 50+ gateways with a single
                            integration. Built for conversion, with smart
                            retries and fallback routing out of the box.
                        </p>
                        <button
                            type="button"
                            className="w-fit text-[#0561E2] font-size-[14px] font-weight-[500]"
                        >
                            <span className="flex items-center gap-2">
                                {' '}
                                <span>Read Details</span>{' '}
                                <CaretRightIcon
                                    size={16}
                                    weight="bold"
                                    color="#0561E2"
                                    className="shrink-0"
                                />
                            </span>
                        </button>
                    </div>
                </Card>

                <Card variant={CardVariant.CUSTOM}>
                    <img
                        src={nodeConfigurationUrl}
                        alt="Node Configuration"
                        className="block h-auto w-full"
                    />

                    <div className="flex flex-col gap-2 p-[16px]">
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex items-center justify-between">
                                {' '}
                                <h3 className={`title inter-display ${title}`}>
                                    Node Configuration
                                </h3>
                            </div>
                            <TagV2
                                text="New"
                                color={TagV2Color.PRIMARY}
                                type={TagV2Type.SUBTLE}
                                leftSlot={{
                                    slot: (
                                        <LightningIcon
                                            className="h-3.5 w-3.5"
                                            color="#059669"
                                        />
                                    ),
                                }}
                            />
                        </div>
                        <p className={`subtitle inter-display ${subtitle}`}>
                            Connect your stack across languages and services.
                            Visualise how your payment nodes talk to each other
                            and configure routing logic per environment.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <TagV2
                                text="New Feature"
                                color={TagV2Color.NEUTRAL}
                                type={TagV2Type.SUBTLE}
                                leftSlot={{
                                    slot: (
                                        <RecycleIcon className="h-3.5 w-3.5" />
                                    ),
                                }}
                            />
                            <TagV2
                                text="Latest Feature"
                                color={TagV2Color.NEUTRAL}
                                type={TagV2Type.SUBTLE}
                                leftSlot={{
                                    slot: (
                                        <WarningDiamondIcon className="h-3.5 w-3.5" />
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </Card>

                <Card variant={CardVariant.CUSTOM} minHeight="184px">
                    <div className="flex min-h-0 flex-1 flex-col justify-between p-[16px]">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <div className="flex items-center justify-between">
                                    {' '}
                                    <h3
                                        className={`title inter-display ${title}`}
                                    >
                                        Embedded Messaging
                                    </h3>
                                </div>
                                <TagV2
                                    text="Widget"
                                    color={TagV2Color.NEUTRAL}
                                    type={TagV2Type.SUBTLE}
                                />
                            </div>
                            <p className={`subtitle inter-display ${subtitle}`}>
                                Drop a support channel directly into your
                                checkout flow. Resolve payment queries without
                                redirecting customers away from the page.
                            </p>
                        </div>
                        <ButtonV2
                            text="Send message"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.SMALL}
                            width="100%"
                        />
                    </div>
                </Card>

                <Card variant={CardVariant.CUSTOM} minHeight="184px">
                    <div className="flex flex-col gap-2 justify-between h-[100%] p-[16px]">
                        <div className="flex flex-row items-center gap-2">
                            <h3 className={`title inter-display ${title}`}>
                                EMI Suite
                            </h3>
                            <TagV2
                                text="Finance"
                                color={TagV2Color.NEUTRAL}
                                type={TagV2Type.SUBTLE}
                                leftSlot={{
                                    slot: (
                                        <CurrencyCircleDollarIcon weight="fill" />
                                    ),
                                }}
                            />
                        </div>
                        <p className={`subtitle inter-display ${subtitle}`}>
                            The most comprehensive EMI offers, aggregated under
                            one roof.{' '}
                            <a href="/" className="text-blue-500">
                                Learn More
                            </a>
                        </p>

                        <div className="flex h-full items-end">
                            <div
                                className={`rounded-xl border p-3 text-xs leading-5 ${betaNotice.container}`}
                            >
                                <strong className={betaNotice.strong}>
                                    BETA
                                </strong>{' '}
                                Convert high-value purchases into easy monthly
                                instalments. Currently available.
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="w-full">
                    <StatCardV2
                        title="Authorization Rate"
                        actionIcon={<GearSixIcon size={16} />}
                        helpIconText="helpText"
                        value="83.24%"
                        variant={StatCardV2Variant.CHART}
                        change={{
                            value: '23.45%',
                            changeType: StatCardV2ChangeType.INCREASE,
                            arrowDirection: StatCardV2ArrowDirection.UP,
                        }}
                        maxWidth="100%"
                        options={AUTHORIZATION_RATE_CHART_OPTIONS}
                    />
                </div>
                <Card variant={CardVariant.CUSTOM} minHeight="184px">
                    <div className="p-[16px]">
                        <img
                            src={costEffectiveIcon}
                            alt="Cost-Effective Processing"
                            className="block h-auto w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 pb-[16px] px-[16px]">
                        <div className="flex flex-row justify-center items-center gap-2">
                            <h3 className={`title inter-display ${title}`}>
                                Cost-Effective Processing
                            </h3>
                            <TagV2
                                text="Cost Saver"
                                color={TagV2Color.PRIMARY}
                                type={TagV2Type.SUBTLE}
                            />
                        </div>
                        <p
                            className={`subtitle inter-display ${subtitle} text-center mb-[16px]`}
                        >
                            Compare processors side by side and find the best
                            fit for your transaction volume. Cut costs without
                            compromising on reliability.
                        </p>
                        <ButtonV2
                            text="Find My Processor"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.SMALL}
                            width="100%"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
})

ComponentShowcase.displayName = 'ComponentShowcase'

interface PreviewCardProps {
    title?: string
    description?: ReactNode
    titleClassName?: string
    subtitleClassName?: string
    className?: string
    children: ReactNode
    eyebrow?: ReactNode
    icon?: ReactNode
    media?: ReactNode
}

const PreviewCard = forwardRef<HTMLElement, PreviewCardProps>(
    (
        {
            title,
            description,
            titleClassName = '',
            subtitleClassName = '',
            className = '',
            children,
            eyebrow,
            icon,
            media,
        },
        ref
    ) => {
        const hasHeader = Boolean(title || description || icon || eyebrow)

        return (
            <article
                ref={ref}
                className={`flex min-h-[184px] flex-col overflow-hidden rounded-2xl border shadow-sm ${className}`}
            >
                {media}
                <div className="flex flex-1 flex-col gap-[14px] p-4">
                    {hasHeader && (
                        <div className="shrink-0 flex flex-col gap-[14px]">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 flex-wrap items-center gap-2">
                                    {icon}
                                    {title && (
                                        <h3
                                            className={`title inter-display ${titleClassName}`}
                                        >
                                            {title}
                                        </h3>
                                    )}
                                    {eyebrow}
                                </div>
                            </div>
                            {description && (
                                <p
                                    className={`subtitle inter-display ${subtitleClassName}`}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="flex min-h-0 flex-1 flex-col">
                        {children}
                    </div>
                </div>
            </article>
        )
    }
)

PreviewCard.displayName = 'PreviewCard'
