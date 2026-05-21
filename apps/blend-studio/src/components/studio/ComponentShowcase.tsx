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
    const { surface, card, cardHeader, title, subtitle, betaNotice } =
        getShowcaseClassNames(theme)

    return (
        <div
            ref={ref}
            className={`min-h-full rounded-[28px] ${surface} ${className}`}
        >
            <div className={getShowcaseGridClassNames(isMobile)}>
                <article
                    className={`flex min-h-[184px] flex-col overflow-hidden rounded-2xl border shadow-sm ${card}`}
                >
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
                            className="w-fit text-xs text-blue-500"
                        >
                            Read Details &gt;
                        </button>
                    </div>
                </article>

                <PreviewCard
                    className={card}
                    titleClassName={title}
                    subtitleClassName={subtitle}
                    media={
                        <img
                            src={nodeConfigurationUrl}
                            alt="Node Configuration"
                            className="block h-auto w-full"
                        />
                    }
                    title="Node Configuration"
                    eyebrow={
                        <TagV2
                            leftSlot={{
                                slot: (
                                    <LightningIcon
                                        className="h-3.5 w-3.5"
                                        color="#059669"
                                    />
                                ),
                            }}
                            text="New"
                            color={TagV2Color.PRIMARY}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="Connect your stack across languages and services. Visualise how your payment nodes talk to each other and configure routing logic per environment."
                >
                    <div className="flex flex-wrap gap-2">
                        <TagV2
                            leftSlot={{
                                slot: <RecycleIcon className="h-3.5 w-3.5" />,
                            }}
                            text="New Feature"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                        <TagV2
                            leftSlot={{
                                slot: (
                                    <WarningDiamondIcon className="h-3.5 w-3.5" />
                                ),
                            }}
                            text="Latest Feature"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                    </div>
                </PreviewCard>

                <PreviewCard
                    className={card}
                    titleClassName={title}
                    subtitleClassName={subtitle}
                    title="Embedded Messaging"
                    eyebrow={
                        <TagV2
                            text="Widget"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="Drop a support channel directly into your checkout flow. Resolve payment queries without redirecting customers away from the page."
                >
                    <div className="flex h-full items-end">
                        <ButtonV2
                            text="Send message"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.SMALL}
                            width="100%"
                        />
                    </div>
                </PreviewCard>

                <PreviewCard
                    className={card}
                    titleClassName={title}
                    subtitleClassName={subtitle}
                    title="EMI Suite"
                    eyebrow={
                        <TagV2
                            leftSlot={{
                                slot: (
                                    <CurrencyCircleDollarIcon weight="fill" />
                                ),
                            }}
                            text="Finance"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description={
                        <>
                            The most comprehensive EMI offers, aggregated under
                            one roof.{' '}
                            <a href="/" className="text-blue-500">
                                Learn More
                            </a>
                        </>
                    }
                >
                    <div className="flex h-full items-end">
                        <div
                            className={`rounded-xl border p-3 text-xs leading-5 ${betaNotice.container}`}
                        >
                            <strong className={betaNotice.strong}>BETA</strong>{' '}
                            Convert high-value purchases into easy monthly
                            instalments. Currently available.
                        </div>
                    </div>
                </PreviewCard>

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

                <PreviewCard
                    className={card}
                    titleClassName={title}
                    subtitleClassName={subtitle}
                    media={
                        <div className="p-[16px]">
                            <img
                                src={costEffectiveIcon}
                                alt="Cost-Effective Processing"
                                className="block h-auto w-full"
                            />
                        </div>
                    }
                >
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-[14px]">
                            <h3 className={`title inter-display ${title}`}>
                                Cost-Effective Processing
                            </h3>
                            <TagV2
                                text="Cost Saver"
                                color={TagV2Color.PRIMARY}
                            />
                        </div>
                        <p
                            className={`mb-[24px] subtitle inter-display ${subtitle}`}
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
                </PreviewCard>
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
