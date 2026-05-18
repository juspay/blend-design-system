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
    ButtonV2SubType,
    ButtonV2Type,
    RadioV2,
    TagV2,
    TagV2Color,
    TagV2Type,
    TextInputV2,
} from '@juspay/blend-design-system'
import {
    ArrowRight,
    ChartLineUp,
    Info,
    Lightning,
    MegaphoneSimple,
    Plus,
    Sparkle,
    BellSlashIcon,
    ArrowCircleDownIcon,
    RecycleIcon,
    WarningDiamondIcon,
    LightningIcon,
    CurrencyCircleDollarIcon,
    GearSixIcon,
    WarningOctagonIcon,
} from '@phosphor-icons/react'
import {
    StatCardV2,
    StatCardV2Variant,
    StatCardV2ChangeType,
} from '@juspay/blend-design-system'

interface ComponentShowcaseProps {
    theme?: 'light' | 'dark'
    className?: string
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

export const ComponentShowcase = forwardRef<
    HTMLDivElement,
    ComponentShowcaseProps
>(({ theme = 'light', className = '' }: ComponentShowcaseProps, ref) => {
    const cardClassName = getCardClassNames(theme)
    const mutedTextClassName = getMutedTextClassNames(theme)

    return (
        <div
            ref={ref}
            className={`min-h-full rounded-[28px] ${getSurfaceClassNames(
                theme
            )} ${className}`}
        >
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-7 p-2 sm:grid-cols-2">
                <div className="rounded-[12px] border bg-white">
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
                                color={TagV2Color.PRIMARY}
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
                            Accept payments across 50+ gateways with a single
                            integration. Built for conversion, with smart
                            retries and fallback routing out of the box.
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
                    // icon={<Sparkle className="h-4 w-4 text-emerald-500" />}
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
                            The most comprehensive EMI offers, aggregated under
                            one roof.{' '}
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

                <PreviewCard
                    className={`min-h-[236px] ${cardClassName}`}
                    icon={<ChartLineUp className="h-4 w-4 text-emerald-500" />}
                    title="Authorization Rate"
                    eyebrow={
                        <TagV2
                            text="Stat"
                            color={TagV2Color.PRIMARY}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="A metric surface for checking text hierarchy and success colour contrast."
                    mutedTextClassName={mutedTextClassName}
                >
                    <div className="mt-auto">
                        <div className="flex items-end gap-3">
                            <strong className="text-3xl font-semibold tracking-[-0.04em]">
                                83.24%
                            </strong>
                            <span className="pb-1 text-xs font-semibold text-emerald-600">
                                +23.45%
                            </span>
                        </div>
                        <div className="mt-4 h-16 rounded-xl bg-gradient-to-b from-emerald-100 to-transparent">
                            <svg
                                viewBox="0 0 280 72"
                                className="h-full w-full text-emerald-500"
                                aria-hidden="true"
                            >
                                <polyline
                                    points="0,58 28,54 56,54 84,32 112,50 140,38 168,43 196,28 224,34 252,48 280,66"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </PreviewCard>

                <StatCardV2
                    title={'title'}
                    subtitle={'subtitle'}
                    actionIcon={<GearSixIcon size={16} />}
                    helpIconText={'helpText'}
                    value={'23%'}
                    variant={StatCardV2Variant.CHART}
                    // options={
                    //     {
                    //               tooltip: {
                    //                   backgroundColor: '#181B25',
                    //                   borderColor: '#181B25',
                    //                   borderRadius: 8,
                    //                   shadow: false,
                    //                   useHTML: true,
                    //                   style: {
                    //                       color: '#FFFFFF',
                    //                       fontSize: '10px',
                    //                       fontWeight: '500',
                    //                       lineHeight: '14px',
                    //                   },
                    //                   pointFormat:
                    //                       'Value: <b>{point.y}%</b>',
                    //               },
                    //               series: [
                    //                   (() => {
                    //                       const isIncrease = true

                    //                       const baseColor = isIncrease
                    //                           ? '#00A63E'
                    //                           : '#F04438'
                    //                       return {
                    //                           data: [
                    //                               9, 11, 13, 10, 12, 15, 18,
                    //                               17, 19, 21, 22,
                    //                           ],
                    //                           type: 'line',
                    //                           color: baseColor,
                    //                       }
                    //                   })(),
                    //               ],
                    //           }
                    // }
                />

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
                            <h3 className="text-sm font-semibold tracking-[-0.01em]">
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
                            Compare processors side by side and find the best
                            fit for your transaction volume. Cut costs without
                            compromising on reliability.
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
})

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
    ) => (
        <article
            ref={ref}
            className={`flex min-h-[184px] flex-col overflow-hidden rounded-2xl border shadow-sm ${className}`}
        >
            {media ? media : null}
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="shrink-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                            {icon}
                            <h3 className="text-sm font-semibold tracking-[-0.01em]">
                                {title}
                            </h3>
                            {eyebrow}
                        </div>
                    </div>
                    <p className={`text-xs leading-5 ${mutedTextClassName}`}>
                        {description}
                    </p>
                </div>
                <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            </div>
        </article>
    )
)

PreviewCard.displayName = 'PreviewCard'

const RadioDot = () => (
    <span className="inline-block h-3 w-3 rounded-full border-2 border-current" />
)
