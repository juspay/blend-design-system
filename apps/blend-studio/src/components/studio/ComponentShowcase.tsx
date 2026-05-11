/**
 * ComponentShowcase
 *
 * Renders product-like preview cards so token changes can be judged in context.
 * Must be rendered inside a <ThemeProvider> from the parent.
 */

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
} from '@phosphor-icons/react'

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
                <PreviewCard
                    className={`min-h-[236px] ${cardClassName}`}
                    icon={<Lightning className="h-4 w-4 text-emerald-500" />}
                    title="Checkout Experience"
                    eyebrow={
                        <TagV2
                            text="Recommended"
                            color={TagV2Color.SUCCESS}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="Review selected token changes across labels, feature tags, helper text, and primary actions."
                    mutedTextClassName={mutedTextClassName}
                >
                    <div className="flex flex-wrap gap-2">
                        <TagV2
                            text="14/17 Selected Features Available"
                            color={TagV2Color.PRIMARY}
                            type={TagV2Type.SUBTLE}
                        />
                        <TagV2
                            text="Customisable UI"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                        <TagV2
                            text="Easy Integration"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                    </div>
                    <ButtonV2
                        text="Read details"
                        buttonType={ButtonV2Type.SECONDARY}
                        subType={ButtonV2SubType.INLINE}
                        size={ButtonV2Size.SMALL}
                        leftSlot={{ slot: <RadioDot /> }}
                        rightSlot={{
                            slot: <ArrowRight className="h-3.5 w-3.5" />,
                        }}
                    />
                </PreviewCard>

                <PreviewCard
                    className={cardClassName}
                    media
                    icon={<Sparkle className="h-4 w-4 text-emerald-500" />}
                    title="Customise Board"
                    eyebrow={
                        <TagV2
                            text="New"
                            color={TagV2Color.SUCCESS}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="A launch surface for announcements, product cards, and promotional modules."
                    mutedTextClassName={mutedTextClassName}
                >
                    <div className="flex flex-wrap gap-2">
                        <TagV2
                            text="New Feature"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                        <TagV2
                            text="Latest Feature"
                            color={TagV2Color.NEUTRAL}
                            type={TagV2Type.SUBTLE}
                        />
                    </div>
                </PreviewCard>

                <PreviewCard
                    className={cardClassName}
                    title="Message Card"
                    eyebrow={
                        <TagV2
                            text="Label"
                            color={TagV2Color.PRIMARY}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="A compact support card using the active token family for calls to action."
                    mutedTextClassName={mutedTextClassName}
                >
                    <ButtonV2
                        text="Send message"
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.SMALL}
                        rightSlot={{
                            slot: <ArrowRight className="h-3.5 w-3.5" />,
                        }}
                        width="100%"
                    />
                </PreviewCard>

                <PreviewCard
                    className={cardClassName}
                    title="EMI Suite"
                    eyebrow={
                        <TagV2
                            text="Label"
                            color={TagV2Color.PRIMARY}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="A text-heavy card for financial offers, notices, and secondary information."
                    mutedTextClassName={mutedTextClassName}
                >
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
                        This supporting note can wrap to two lines while keeping
                        the card balanced.
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

                <PreviewCard
                    className={cardClassName}
                    media
                    icon={
                        <MegaphoneSimple className="h-4 w-4 text-emerald-500" />
                    }
                    title="Product Launch"
                    eyebrow={
                        <TagV2
                            text="Label"
                            color={TagV2Color.PRIMARY}
                            type={TagV2Type.SUBTLE}
                        />
                    }
                    description="A stacked layout combining media, label, description, and primary action."
                    mutedTextClassName={mutedTextClassName}
                >
                    <ButtonV2
                        text="Send message"
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.SMALL}
                        rightSlot={{
                            slot: <ArrowRight className="h-3.5 w-3.5" />,
                        }}
                        width="100%"
                    />
                </PreviewCard>

                <div
                    className={`sm:col-span-2 rounded-2xl border p-4 ${cardClassName}`}
                >
                    <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                        <TextInputV2
                            label="Preview input"
                            placeholder="Search components or tokens"
                            value=""
                            leftSlot={{ slot: <Info className="h-4 w-4" /> }}
                            onChange={() => {}}
                        />
                        <div className="flex flex-wrap items-center gap-4">
                            <RadioV2
                                label="Light"
                                checked={theme === 'light'}
                            />
                            <RadioV2 label="Dark" checked={theme === 'dark'} />
                            <ButtonV2
                                text="Add"
                                buttonType={ButtonV2Type.SECONDARY}
                                size={ButtonV2Size.SMALL}
                                leftSlot={{
                                    slot: <Plus className="h-3.5 w-3.5" />,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

ComponentShowcase.displayName = 'ComponentShowcase'

interface PreviewCardProps {
    title: string
    description: string
    mutedTextClassName: string
    className: string
    children: ReactNode
    eyebrow?: ReactNode
    icon?: ReactNode
    media?: boolean
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
            media = false,
        }: PreviewCardProps,
        ref
    ) => (
        <article
            ref={ref}
            className={`flex min-h-[184px] flex-col overflow-hidden rounded-2xl border shadow-sm ${className}`}
        >
            {media ? (
                <div className="min-h-[132px] bg-[linear-gradient(135deg,var(--blend-color-primary-100,#DBEAFE),var(--blend-color-primary-300,#93C5FD))]" />
            ) : null}
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                        {icon}
                        <h3 className="text-sm font-semibold tracking-[-0.01em]">
                            {title}
                        </h3>
                        {eyebrow}
                    </div>
                    <span className="h-3 w-3 shrink-0 rounded bg-[var(--blend-color-primary-100,#DBEAFE)]" />
                </div>
                <p className={`text-xs leading-5 ${mutedTextClassName}`}>
                    {description}
                </p>
                {children}
            </div>
        </article>
    )
)

PreviewCard.displayName = 'PreviewCard'

const RadioDot = () => (
    <span className="inline-block h-3 w-3 rounded-full border-2 border-current" />
)
