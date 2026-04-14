/**
 * ComponentShowcase
 *
 * Renders a representative set of Blend V2 components for live preview.
 * Must be rendered inside a <ThemeProvider> from the parent.
 */

import { useState } from 'react'
import {
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    AlertV2,
    AlertV2Type,
    AlertV2SubType,
    TagV2,
    TagV2Color,
    CheckboxV2,
    RadioV2,
    SwitchV2,
    BreadcrumbV2,
    AvatarV2,
    AvatarV2Size,
    TooltipV2,
    ProgressBarV2,
    StatCardV2,
    AccordionV2,
    AccordionV2Item,
    TextInputV2,
    StatCardV2ChangeType,
    StatCardV2ArrowDirection,
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
    const [inputValue, setInputValue] = useState('')

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
                            <ButtonV2
                                buttonType={ButtonV2Type.PRIMARY}
                                text="Primary"
                            />
                            <ButtonV2
                                buttonType={ButtonV2Type.SECONDARY}
                                text="Secondary"
                            />
                            <ButtonV2
                                buttonType={ButtonV2Type.DANGER}
                                text="Danger"
                            />
                            <ButtonV2
                                buttonType={ButtonV2Type.SUCCESS}
                                text="Success"
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
                            <ButtonV2 size={ButtonV2Size.SMALL} text="Small" />
                            <ButtonV2
                                size={ButtonV2Size.MEDIUM}
                                text="Medium"
                            />
                            <ButtonV2 size={ButtonV2Size.LARGE} text="Large" />
                        </div>
                    </div>
                    <div>
                        <div
                            className={`text-xs mb-2 uppercase tracking-wide font-medium ${titleColor}`}
                        >
                            States
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <ButtonV2 text="Default" />
                            <ButtonV2 text="Disabled" disabled />
                            <ButtonV2 text="Loading" loading />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Alerts / Feedback ── */}
            <Section title="Alerts" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-3">
                    <AlertV2
                        type={AlertV2Type.PRIMARY}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Information"
                        description="This is a primary alert with helpful information."
                    />
                    <AlertV2
                        type={AlertV2Type.SUCCESS}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Success"
                        description="Your changes have been saved successfully."
                    />
                    <AlertV2
                        type={AlertV2Type.WARNING}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Warning"
                        description="Please review your settings before continuing."
                    />
                    <AlertV2
                        type={AlertV2Type.ERROR}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Error"
                        description="Something went wrong. Please try again."
                    />
                </div>
            </Section>

            {/* ── Tags ── */}
            <Section title="Tags" titleColor={titleColor} cardBg={cardBg}>
                <div className="flex flex-wrap gap-2">
                    <TagV2 text="Default" />
                    <TagV2 text="Primary" color={TagV2Color.PRIMARY} />
                    <TagV2 text="Success" color={TagV2Color.SUCCESS} />
                    <TagV2 text="Warning" color={TagV2Color.WARNING} />
                    <TagV2 text="Error" color={TagV2Color.ERROR} />
                </div>
            </Section>

            {/* ── Form Inputs ── */}
            <Section
                title="Form Inputs"
                titleColor={titleColor}
                cardBg={cardBg}
            >
                <div className="space-y-4">
                    <TextInputV2
                        label="Text Input"
                        placeholder="Enter text..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <TextInputV2
                        label="Disabled Input"
                        placeholder="Cannot edit"
                        value=""
                        disabled
                    />
                </div>
            </Section>

            {/* ── Form Selectors ── */}
            <Section title="Selectors" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-6 items-center">
                        <CheckboxV2
                            label="Accept terms"
                            checked={checked === true}
                            onCheckedChange={(val) => setChecked(val)}
                        />
                        <CheckboxV2 label="Disabled" checked disabled />
                        <CheckboxV2
                            label="Indeterminate"
                            checked="indeterminate"
                            onCheckedChange={() => {}}
                        />
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                        <RadioV2
                            label="Option A"
                            checked={radioVal === 'a'}
                            onChange={() => setRadioVal('a')}
                        />
                        <RadioV2
                            label="Option B"
                            checked={radioVal === 'b'}
                            onChange={() => setRadioVal('b')}
                        />
                        <RadioV2 label="Disabled" disabled />
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                        <SwitchV2
                            checked={switched}
                            onCheckedChange={setSwitched}
                            label="Toggle feature"
                        />
                        <SwitchV2 checked label="Enabled" />
                        <SwitchV2 checked={false} label="Disabled" disabled />
                    </div>
                </div>
            </Section>

            {/* ── Progress ── */}
            <Section title="Progress" titleColor={titleColor} cardBg={cardBg}>
                <div className="space-y-3">
                    <ProgressBarV2 value={25} />
                    <ProgressBarV2 value={60} />
                    <ProgressBarV2 value={90} />
                </div>
            </Section>

            {/* ── Avatar ── */}
            <Section title="Avatars" titleColor={titleColor} cardBg={cardBg}>
                <div className="flex flex-wrap items-end gap-3">
                    <AvatarV2 fallbackText="AJ" size={AvatarV2Size.SM} />
                    <AvatarV2 fallbackText="BS" size={AvatarV2Size.MD} />
                    <AvatarV2 fallbackText="CW" size={AvatarV2Size.LG} />
                </div>
            </Section>

            {/* ── Breadcrumb ── */}
            <Section title="Breadcrumb" titleColor={titleColor} cardBg={cardBg}>
                <BreadcrumbV2
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
                    <StatCardV2
                        title="Total Branches"
                        value="24"
                        change={{
                            value: '12',
                            changeType: StatCardV2ChangeType.INCREASE,
                            arrowDirection: StatCardV2ArrowDirection.UP,
                        }}
                    />
                    <StatCardV2
                        title="Published Versions"
                        value="148"
                        change={{
                            value: '8',
                            changeType: StatCardV2ChangeType.INCREASE,
                            arrowDirection: StatCardV2ArrowDirection.UP,
                        }}
                    />
                    <StatCardV2
                        title="Active Teams"
                        value="6"
                        change={{
                            value: '2',
                            changeType: StatCardV2ChangeType.DECREASE,
                            arrowDirection: StatCardV2ArrowDirection.DOWN,
                        }}
                    />
                </div>
            </Section>

            {/* ── Accordion ── */}
            <Section title="Accordion" titleColor={titleColor} cardBg={cardBg}>
                <AccordionV2 defaultValue="item-1">
                    <AccordionV2Item
                        value="item-1"
                        title="How do I apply a brand preset?"
                    >
                        Use the Presets panel in the Colors tab to instantly
                        apply a brand preset like HDFC, NeoBank, or FinTech. You
                        can then fine-tune individual shades as needed.
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="What is a token branch?"
                    >
                        A token branch is a snapshot of design tokens for a
                        specific brand or theme configuration.
                    </AccordionV2Item>
                </AccordionV2>
            </Section>

            {/* ── Tooltip ── */}
            <Section title="Tooltip" titleColor={titleColor} cardBg={cardBg}>
                <div className="flex gap-4">
                    <TooltipV2 content="This is a tooltip">
                        <ButtonV2
                            buttonType={ButtonV2Type.SECONDARY}
                            text="Hover me"
                        />
                    </TooltipV2>
                </div>
            </Section>

            {/* ── Color Palette Preview ── */}
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
