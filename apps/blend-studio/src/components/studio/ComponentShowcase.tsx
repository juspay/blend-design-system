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

interface ComponentShowcaseProps {
    theme?: 'light' | 'dark'
    className?: string
    isMobile?: boolean
}

const isDarkTheme = (theme: ComponentShowcaseProps['theme']) => theme === 'dark'

const getSurfaceClassNames = (theme: ComponentShowcaseProps['theme']) =>
    isDarkTheme(theme)
        ? 'bg-slate-950 text-white'
        : 'bg-[#f8fafc] text-slate-950'

const getCardClassNames = (theme: ComponentShowcaseProps['theme']) =>
    isDarkTheme(theme)
        ? 'border-slate-800 bg-slate-900/92 shadow-black/20'
        : 'border-slate-200/80 bg-white shadow-slate-200/70'

const getMutedTextClassNames = (theme: ComponentShowcaseProps['theme']) =>
    isDarkTheme(theme) ? 'text-slate-400' : 'text-slate-500'

const getGridClassNames = (isMobile: boolean) =>
    `mx-auto grid grid-cols-1 gap-7 p-2 ${
        isMobile
            ? 'max-w-[375px] sm:grid-cols-1'
            : 'max-w-[1120px] sm:grid-cols-2'
    }`

export const ComponentShowcase = forwardRef<
    HTMLDivElement,
    ComponentShowcaseProps
>(
    (
        {
            theme = 'light',
            className = '',
            isMobile = false,
        }: ComponentShowcaseProps,
        ref
    ) => {
        const cardClassName = getCardClassNames(theme)
        const mutedTextClassName = getMutedTextClassNames(theme)

        return (
            <div
                ref={ref}
                className={`min-h-full rounded-[28px] ${getSurfaceClassNames(
                    theme
                )} ${className}`}
            >
                <div className={getGridClassNames(isMobile)}>
                    <div className="rounded-[12px] border bg-white shadow-sm">
                        <div className="border-b px-[16px] py-[12px] flex justify-between items-center">
                            <div className="flex flex-row items-center gap-2">
                                <img
                                    src={checkoutIconUrl}
                                    alt="Hyper Checkout"
                                    className="block h-5 w-5 shrink-0"
                                />
                                <span className="text-sm font-semibold leading-none">
                                    Hyper Checkout
                                </span>
                                <TagV2
                                    text="Recommended"
                                    color={TagV2Color.PRIMARY}
                                    type={TagV2Type.SUBTLE}
                                />
                            </div>
                            <div>
                                <ButtonV2
                                    text="Add +"
                                    buttonType={ButtonV2Type.SECONDARY}
                                />
                            </div>
                        </div>
                        <div className="p-[16px] flex flex-col gap-2">
                            <div className="flex gap-2 flex-col">
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
                            <p
                                className={`text-xs leading-5 ${mutedTextClassName}`}
                            >
                                Accept payments across 50+ gateways with a
                                single integration. Built for conversion, with
                                smart retries and fallback routing out of the
                                box.
                            </p>
                            <a href="/" className="text-xs text-blue-500">
                                {'Read Details >'}
                            </a>
                        </div>
                    </div>
                    <PreviewCard
                        className={cardClassName}
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
                                            color={'#059669'}
                                        />
                                    ),
                                }}
                                text="New"
                                color={TagV2Color.PRIMARY}
                                type={TagV2Type.SUBTLE}
                            />
                        }
                        description="Connect your stack across languages and services. Visualise how your payment nodes talk to each other and configure routing logic per environment."
                        mutedTextClassName={mutedTextClassName}
                    >
                        <div className="flex flex-wrap gap-2">
                            <TagV2
                                leftSlot={{
                                    slot: (
                                        <RecycleIcon className="h-3.5 w-3.5" />
                                    ),
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
                        className={cardClassName}
                        title="Embedded Messaging"
                        eyebrow={
                            <TagV2
                                text="Widget"
                                color={TagV2Color.NEUTRAL}
                                type={TagV2Type.SUBTLE}
                            />
                        }
                        description="Drop a support channel directly into your checkout flow. Resolve payment queries without redirecting customers away from the page."
                        mutedTextClassName={mutedTextClassName}
                    >
                        <div className="h-full flex items-end">
                            <ButtonV2
                                text="Send message"
                                buttonType={ButtonV2Type.PRIMARY}
                                size={ButtonV2Size.SMALL}
                                width="100%"
                            />
                        </div>
                    </PreviewCard>

                    <PreviewCard
                        className={cardClassName}
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
                                The most comprehensive EMI offers, aggregated
                                under one roof.{' '}
                                <a href="/" className="text-blue-500">
                                    Learn More
                                </a>
                            </>
                        }
                        mutedTextClassName={mutedTextClassName}
                    >
                        <div className="h-full flex items-end">
                            <div
                                className={`rounded-xl border p-3 text-xs leading-5 ${
                                    isDarkTheme(theme)
                                        ? 'border-slate-800 bg-slate-950/70 text-slate-400'
                                        : 'border-slate-200 bg-slate-50 text-slate-500'
                                }`}
                            >
                                <strong
                                    className={
                                        isDarkTheme(theme)
                                            ? 'text-slate-200'
                                            : 'text-slate-700'
                                    }
                                >
                                    BETA
                                </strong>{' '}
                                Convert high-value purchases into easy monthly
                                instalments. Currently available.
                            </div>
                        </div>
                    </PreviewCard>

                    <div className="w-full">
                        <StatCardV2
                            title={'Authorization Rate'}
                            actionIcon={<GearSixIcon size={16} />}
                            helpIconText={'helpText'}
                            value={'83.24%'}
                            variant={StatCardV2Variant.CHART}
                            change={{
                                value: '23.45%',
                                changeType: StatCardV2ChangeType.INCREASE,
                                arrowDirection: StatCardV2ArrowDirection.UP,
                            }}
                            maxWidth="100%"
                            options={{
                                series: [
                                    {
                                        data: [
                                            9, 11, 13, 10, 12, 15, 18, 17, 19,
                                            21, 22,
                                        ],
                                        type: 'area',
                                        color: '#00A63E',
                                        fillColor: {
                                            linearGradient: {
                                                x1: 0,
                                                y1: 0,
                                                x2: 0,
                                                y2: 1,
                                            },
                                            stops: [
                                                [
                                                    0,
                                                    'rgba(123, 241, 168, 0.40)',
                                                ],
                                                [
                                                    1,
                                                    'rgba(123, 241, 168, 0.00)',
                                                ],
                                            ],
                                        },
                                    },
                                ],
                            }}
                        />
                    </div>

                    <PreviewCard
                        className={cardClassName}
                        media={
                            <div className="p-[16px]">
                                <img
                                    src={costEffectiveIcon}
                                    alt="Node Configuration"
                                    className="block h-auto w-full"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-center items-center gap-2 ">
                                <h3 className="text-sm font-semibold">
                                    Cost-Effective Processing
                                </h3>
                                <TagV2
                                    text="Cost Saver"
                                    color={TagV2Color.PRIMARY}
                                />
                            </div>
                            <div
                                className={`text-xs leading-5 ${mutedTextClassName} mb-[24px]`}
                            >
                                Compare processors side by side and find the
                                best fit for your transaction volume. Cut costs
                                without compromising on reliability.
                            </div>

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
    }
)

ComponentShowcase.displayName = 'ComponentShowcase'

interface PreviewCardProps {
    title?: string
    description?: ReactNode
    mutedTextClassName?: string
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
            mutedTextClassName,
            className,
            children,
            eyebrow,
            icon,
            media,
        }: PreviewCardProps,
        ref
    ) => {
        const hasHeaderContent = Boolean(
            title || description || icon || eyebrow
        )

        return (
            <article
                ref={ref}
                className={`flex min-h-[184px] flex-col overflow-hidden rounded-2xl border shadow-sm ${className}`}
            >
                {media}
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {hasHeaderContent && (
                        <div className="shrink-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 flex-wrap items-center gap-2">
                                    {icon}
                                    {title && (
                                        <h3 className="text-sm font-semibold tracking-[-0.01em]">
                                            {title}
                                        </h3>
                                    )}
                                    {eyebrow}
                                </div>
                            </div>
                            {description && (
                                <p
                                    className={`text-xs leading-5 ${mutedTextClassName}`}
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
