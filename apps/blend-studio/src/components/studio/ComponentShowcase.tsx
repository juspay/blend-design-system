/**
 * ComponentShowcase
 *
 * Renders a representative set of Blend V2 components for live preview.
 * Must be rendered inside a <ThemeProvider> from the parent.
 */

import { useState } from 'react'
import {
    Button,
    ButtonType,
    ButtonSize,
    Alert,
    AlertVariant,
    Tag,
    Checkbox,
    Radio,
    Switch,
    Breadcrumb,
    Avatar,
    AvatarSize,
    Tooltip,
    TooltipSide,
    ProgressBar,
    StatCard,
    StatCardVariant,
    ChangeType,
    Accordion,
    AccordionItem,
    SnackbarVariant,
} from '@juspay/blend-design-system'

interface ComponentShowcaseProps {
    theme?: 'light' | 'dark'
    className?: string
}

export function ComponentShowcase({
    theme = 'light',
    className,
}: ComponentShowcaseProps) {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
    const [radioVal, setRadioVal] = useState('a')
    const [switched, setSwitched] = useState(false)
    const [accordionValue, setAccordionValue] = useState<string[]>([])

    const cardBg =
        theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
    const titleColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-500'

    return (
        <div className={`space-y-6 ${className || ''}`}>
            {/* ── Buttons ── */}
            <Section title="Buttons" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-4">
                    <div>
                        <div
                            className={`text-xs mb-2 uppercase tracking-wide font-medium ${titleColor}`}
                        >
                            Variants
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                text="Primary"
                                buttonType={ButtonType.PRIMARY}
                            />
                            <Button
                                text="Secondary"
                                buttonType={ButtonType.SECONDARY}
                            />
                            <Button
                                text="Danger"
                                buttonType={ButtonType.DANGER}
                            />
                            <Button
                                text="Success"
                                buttonType={ButtonType.SUCCESS}
                            />
                        </div>
                    </div>
                    <div>
                        <div
                            className={`text-xs mb-2 uppercase tracking-wide font-medium ${titleColor}`}
                        >
                            Sizes
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button text="Small" size={ButtonSize.SMALL} />
                            <Button text="Medium" size={ButtonSize.MEDIUM} />
                            <Button text="Large" size={ButtonSize.LARGE} />
                        </div>
                    </div>
                    <div>
                        <div
                            className={`text-xs mb-2 uppercase tracking-wide font-medium ${titleColor}`}
                        >
                            States
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button text="Default" />
                            <Button text="Disabled" disabled />
                            <Button text="Loading" loading />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Alerts / Feedback ── */}
            <Section title="Alerts" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-3">
                    <Alert
                        heading="Information"
                        description="This is a primary alert with helpful information."
                        variant={AlertVariant.PRIMARY}
                    />
                    <Alert
                        heading="Success"
                        description="Your changes have been saved successfully."
                        variant={AlertVariant.SUCCESS}
                    />
                    <Alert
                        heading="Warning"
                        description="Please review your settings before continuing."
                        variant={AlertVariant.WARNING}
                    />
                    <Alert
                        heading="Error"
                        description="Something went wrong. Please try again."
                        variant={AlertVariant.ERROR}
                    />
                </div>
            </Section>

            {/* ── Tags ── */}
            <Section title="Tags" titleColor={titleColor} cardBg={cardBg}>
                <div className="flex flex-wrap gap-2">
                    <Tag text="Default" />
                    <Tag text="Primary" />
                    <Tag text="Banking" />
                    <Tag text="Published" />
                    <Tag text="v2.1.0" />
                </div>
            </Section>

            {/* ── Form Selectors ── */}
            <Section title="Selectors" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-6 items-center">
                        <Checkbox
                            label="Accept terms"
                            checked={checked}
                            onCheckedChange={(val) => setChecked(val)}
                        />
                        <Checkbox label="Disabled" checked disabled />
                        <Checkbox
                            label="Indeterminate"
                            checked="indeterminate"
                        />
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                        <Radio
                            value="a"
                            checked={radioVal === 'a'}
                            onChange={() => setRadioVal('a')}
                        >
                            Option A
                        </Radio>
                        <Radio
                            value="b"
                            checked={radioVal === 'b'}
                            onChange={() => setRadioVal('b')}
                        >
                            Option B
                        </Radio>
                        <Radio
                            value="c"
                            checked={false}
                            onChange={() => {}}
                            disabled
                        >
                            Disabled
                        </Radio>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                        <Switch
                            checked={switched}
                            onChange={(val) => setSwitched(val)}
                            label="Toggle feature"
                        />
                        <Switch checked label="Enabled" />
                        <Switch checked={false} label="Disabled" disabled />
                    </div>
                </div>
            </Section>

            {/* ── Progress ── */}
            <Section title="Progress" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-3">
                    <ProgressBar value={25} />
                    <ProgressBar value={60} />
                    <ProgressBar value={90} />
                </div>
            </Section>

            {/* ── Avatar ── */}
            <Section title="Avatars" titleColor={titleColor} cardBg={cardBg}>
                <div className="flex flex-wrap items-end gap-3">
                    <Avatar fallback="AJ" size={AvatarSize.SM} />
                    <Avatar fallback="BS" size={AvatarSize.REGULAR} />
                    <Avatar fallback="CW" size={AvatarSize.MD} />
                    <Avatar fallback="DB" size={AvatarSize.LG} />
                    <Avatar fallback="EG" size={AvatarSize.XL} />
                </div>
            </Section>

            {/* ── Breadcrumb ── */}
            <Section title="Breadcrumb" titleColor={titleColor} cardBg={cardBg}>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Token Studio', href: '#' },
                        { label: 'Editor', href: '#' },
                    ]}
                />
            </Section>

            {/* ── Stat Cards ── */}
            <Section title="Stat Cards" titleColor={titleColor} cardBg={cardBg}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatCard
                        title="Total Branches"
                        value="24"
                        variant={StatCardVariant.NUMBER}
                        change={{ value: 12, valueType: ChangeType.INCREASE }}
                    />
                    <StatCard
                        title="Published Versions"
                        value="148"
                        variant={StatCardVariant.NUMBER}
                        change={{ value: 8, valueType: ChangeType.INCREASE }}
                    />
                    <StatCard
                        title="Active Teams"
                        value="6"
                        variant={StatCardVariant.NUMBER}
                        change={{ value: 2, valueType: ChangeType.DECREASE }}
                    />
                </div>
            </Section>

            {/* ── Accordion ── */}
            <Section title="Accordion" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-2">
                    <Accordion
                        defaultValue="item-1"
                        value={
                            accordionValue.length > 0
                                ? accordionValue
                                : undefined
                        }
                        onValueChange={(val) =>
                            setAccordionValue(
                                typeof val === 'string' ? [val] : val
                            )
                        }
                    >
                        <AccordionItem
                            value="item-1"
                            title="How do I apply a brand preset?"
                        >
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Use the Presets panel in the Colors tab to
                                instantly apply a brand preset like HDFC,
                                NeoBank, or FinTech. You can then fine-tune
                                individual shades as needed.
                            </p>
                        </AccordionItem>
                        <AccordionItem
                            value="item-2"
                            title="What is a token branch?"
                        >
                            <p className="text-sm text-gray-500">
                                A snapshot of design tokens for a specific brand
                                or theme.
                            </p>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Section>

            {/* ── Tooltip ── */}
            <Section title="Tooltip" titleColor={titleColor} cardBg={cardBg}>
                <div className="flex gap-4">
                    <Tooltip content="This is a tooltip" side={TooltipSide.TOP}>
                        <Button
                            text="Hover me (top)"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </Tooltip>
                    <Tooltip
                        content="Bottom tooltip example"
                        side={TooltipSide.BOTTOM}
                    >
                        <Button
                            text="Hover me (bottom)"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </Tooltip>
                </div>
            </Section>

            {/* ── Snackbar Toast Types ── */}
            <Section
                title="Snackbar Variants"
                titleColor={titleColor}
                cardBg={cardBg}
            >
                <div className="flex flex-wrap gap-3">
                    {Object.values(SnackbarVariant).map((variant) => (
                        <div
                            key={variant}
                            className={`px-3 py-2 rounded text-sm font-medium ${
                                variant === SnackbarVariant.SUCCESS
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : variant === SnackbarVariant.ERROR
                                      ? 'bg-red-100 text-red-800 border border-red-200'
                                      : variant === SnackbarVariant.WARNING
                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                        >
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </div>
                    ))}
                </div>
                <p className={`text-xs mt-2 ${titleColor}`}>
                    Note: Snackbar uses an imperative toast API. Render Snackbar
                    provider once, then call addToast() to display
                    notifications.
                </p>
            </Section>

            {/* ── Color Palette from tokens ── */}
            <Section
                title="Brand Color Palette"
                titleColor={titleColor}
                cardBg={cardBg}
            >
                <div className="space-y-2">
                    {(['primary', 'gray'] as const).map((group) => (
                        <div key={group}>
                            <div
                                className={`text-xs mb-1 capitalize font-medium ${titleColor}`}
                            >
                                {group}
                            </div>
                            <div className="flex rounded-lg overflow-hidden">
                                {[
                                    50, 100, 200, 300, 400, 500, 600, 700, 800,
                                    900, 950,
                                ].map((shade) => (
                                    <div
                                        key={shade}
                                        className="flex-1 h-8 relative group"
                                        style={{
                                            backgroundColor: `var(--blend-color-${group}-${shade}, #eee)`,
                                        }}
                                        title={`${group}-${shade}`}
                                    >
                                        <span className="absolute inset-0 flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 font-bold text-white mix-blend-difference">
                                            {shade}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    )
}

// ── Helper ────────────────────────────────────────────────────────────────────
function Section({
    title,
    children,
    titleColor,
    cardBg,
}: {
    title: string
    children: React.ReactNode
    titleColor: string
    cardBg: string
}) {
    return (
        <div className={`rounded-xl p-5 border shadow-sm ${cardBg}`}>
            <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-4 ${titleColor}`}
            >
                {title}
            </h3>
            {children}
        </div>
    )
}
