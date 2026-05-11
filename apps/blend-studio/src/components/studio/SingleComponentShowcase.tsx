/**
 * SingleComponentShowcase
 *
 * Displays only a single selected component for focused preview in Component Overrides.
 */

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
import { useState } from 'react'

interface SingleComponentShowcaseProps {
    componentKey: string
    theme?: 'light' | 'dark'
}

export function SingleComponentShowcase({
    componentKey,
    theme = 'light',
}: SingleComponentShowcaseProps) {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
    const [radioVal, setRadioVal] = useState('a')
    const [switched, setSwitched] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const cardBg =
        theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
    const titleColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-500'

    const renderComponent = () => {
        switch (componentKey) {
            case 'BUTTONV2':
                return (
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
                                <ButtonV2
                                    size={ButtonV2Size.SMALL}
                                    text="Small"
                                />
                                <ButtonV2
                                    size={ButtonV2Size.MEDIUM}
                                    text="Medium"
                                />
                                <ButtonV2
                                    size={ButtonV2Size.LARGE}
                                    text="Large"
                                />
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
                )

            case 'ALERTV2':
                return (
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
                )

            case 'TAGV2':
                return (
                    <div className="flex flex-wrap gap-2">
                        <TagV2 text="Default" />
                        <TagV2 text="Primary" color={TagV2Color.PRIMARY} />
                        <TagV2 text="Success" color={TagV2Color.SUCCESS} />
                        <TagV2 text="Warning" color={TagV2Color.WARNING} />
                        <TagV2 text="Error" color={TagV2Color.ERROR} />
                    </div>
                )

            case 'TEXT_INPUTV2':
                return (
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
                )

            case 'CHECKBOXV2':
                return (
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
                )

            case 'RADIOV2':
                return (
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
                )

            case 'SWITCHV2':
                return (
                    <div className="flex flex-wrap gap-6 items-center">
                        <SwitchV2
                            checked={switched}
                            onCheckedChange={setSwitched}
                            label="Toggle feature"
                        />
                        <SwitchV2 checked label="Enabled" />
                        <SwitchV2 checked={false} label="Disabled" disabled />
                    </div>
                )

            case 'PROGRESS_BARV2':
                return (
                    <div className="space-y-3">
                        <ProgressBarV2 value={25} />
                        <ProgressBarV2 value={60} />
                        <ProgressBarV2 value={90} />
                    </div>
                )

            case 'AVATARV2':
                return (
                    <div className="flex flex-wrap items-end gap-3">
                        <AvatarV2 fallbackText="AJ" size={AvatarV2Size.SM} />
                        <AvatarV2 fallbackText="BS" size={AvatarV2Size.MD} />
                        <AvatarV2 fallbackText="CW" size={AvatarV2Size.LG} />
                    </div>
                )

            case 'BREADCRUMBV2':
                return (
                    <BreadcrumbV2
                        items={[
                            { label: 'Home', href: '#' },
                            { label: 'Token Studio', href: '#' },
                            { label: 'Editor', href: '#' },
                        ]}
                    />
                )

            case 'STATCARDV2':
                return (
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
                )

            case 'ACCORDIONV2':
                return (
                    <AccordionV2 defaultValue="item-1">
                        <AccordionV2Item
                            value="item-1"
                            title="How do I apply a brand preset?"
                        >
                            Use the Presets panel in the Colors tab to instantly
                            apply a brand preset like HDFC, NeoBank, or FinTech.
                            You can then fine-tune individual shades as needed.
                        </AccordionV2Item>
                        <AccordionV2Item
                            value="item-2"
                            title="What is a token branch?"
                        >
                            A token branch is a snapshot of design tokens for a
                            specific brand or theme configuration.
                        </AccordionV2Item>
                    </AccordionV2>
                )

            case 'TOOLTIPV2':
                return (
                    <TooltipV2 content="This is a tooltip">
                        <ButtonV2
                            buttonType={ButtonV2Type.SECONDARY}
                            text="Hover me"
                        />
                    </TooltipV2>
                )

            default:
                return (
                    <div className={`p-6 rounded-lg border ${cardBg}`}>
                        <p className={`text-sm ${titleColor}`}>
                            Preview for <strong>{componentKey}</strong> is not
                            available.
                        </p>
                    </div>
                )
        }
    }

    const componentLabels: Record<string, string> = {
        BUTTONV2: 'Button',
        ALERTV2: 'Alert',
        TAGV2: 'Tag',
        TEXT_INPUTV2: 'Text Input',
        CHECKBOXV2: 'Checkbox',
        RADIOV2: 'Radio',
        SWITCHV2: 'Switch',
        PROGRESS_BARV2: 'Progress Bar',
        AVATARV2: 'Avatar',
        BREADCRUMBV2: 'Breadcrumb',
        STATCARDV2: 'Stat Card',
        ACCORDIONV2: 'Accordion',
        TOOLTIPV2: 'Tooltip',
    }

    return (
        <div className={`rounded-xl p-5 border shadow-sm ${cardBg}`}>
            <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-4 ${titleColor}`}
            >
                {componentLabels[componentKey] || componentKey}
            </h3>
            {renderComponent()}
        </div>
    )
}
