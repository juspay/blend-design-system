import React from 'react'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../lib/components/Button/types'
import { CheckboxSize } from '../../lib/components/Checkbox/types'
import {
    RadioSize,
    type RadioGroupProps,
} from '../../lib/components/Radio/types'
import {
    SwitchSize,
    type SwitchGroupProps,
} from '../../lib/components/Switch/types'
import { MockIcon } from './index'

interface ButtonTestProps {
    text?: string
    buttonType?: ButtonType
    size?: ButtonSize
    subType?: ButtonSubType
    leadingIcon?: React.ReactElement
    trailingIcon?: React.ReactElement
    fullWidth?: boolean
    disabled?: boolean
    loading?: boolean
    onClick?: () => void
    'aria-label'?: string
    'aria-describedby'?: string
    'aria-pressed'?: string
    [key: string]: unknown
}

/**
 * Test data builder for Button component props
 * Implements the builder pattern for flexible test data creation
 */
export class ButtonPropsBuilder {
    private props: ButtonTestProps = {}

    withText(text: string) {
        this.props.text = text
        return this
    }

    withType(type: ButtonType) {
        this.props.buttonType = type
        return this
    }

    withSize(size: ButtonSize) {
        this.props.size = size
        return this
    }

    withSubType(subType: ButtonSubType) {
        this.props.subType = subType
        return this
    }

    withLeadingIcon() {
        this.props.leadingIcon = React.createElement(MockIcon)
        return this
    }

    withTrailingIcon() {
        this.props.trailingIcon = React.createElement(MockIcon)
        return this
    }

    withFullWidth() {
        this.props.fullWidth = true
        return this
    }

    withDisabled() {
        this.props.disabled = true
        return this
    }

    withLoading() {
        this.props.loading = true
        return this
    }

    withOnClick(onClick: () => void) {
        this.props.onClick = onClick
        return this
    }

    withAriaLabel(label: string) {
        this.props['aria-label'] = label
        return this
    }

    withCustomProps(props: Record<string, unknown>) {
        this.props = { ...this.props, ...props }
        return this
    }

    build() {
        return this.props
    }
}

/**
 * Factory functions for common test scenarios
 */
export const ButtonTestFactory = {
    // Basic button configurations
    default: () => new ButtonPropsBuilder().withText('Test Button').build(),

    primary: () =>
        new ButtonPropsBuilder()
            .withText('Primary Button')
            .withType(ButtonType.PRIMARY)
            .build(),

    disabled: () =>
        new ButtonPropsBuilder()
            .withText('Disabled Button')
            .withDisabled()
            .build(),

    loading: () =>
        new ButtonPropsBuilder()
            .withText('Loading Button')
            .withLoading()
            .build(),

    iconOnly: () =>
        new ButtonPropsBuilder()
            .withLeadingIcon()
            .withSubType(ButtonSubType.ICON_ONLY)
            .withAriaLabel('Icon Button')
            .build(),

    complex: () =>
        new ButtonPropsBuilder()
            .withText('Complex Button')
            .withType(ButtonType.PRIMARY)
            .withSize(ButtonSize.LARGE)
            .withLeadingIcon()
            .withTrailingIcon()
            .withFullWidth()
            .build(),

    // Generate all variants for testing
    allTypes: () =>
        [
            ButtonType.PRIMARY,
            ButtonType.SECONDARY,
            ButtonType.DANGER,
            ButtonType.SUCCESS,
        ].map((type) =>
            new ButtonPropsBuilder()
                .withText(`${type} Button`)
                .withType(type)
                .build()
        ),

    allSizes: () =>
        [ButtonSize.SMALL, ButtonSize.MEDIUM, ButtonSize.LARGE].map((size) =>
            new ButtonPropsBuilder()
                .withText(`${size} Button`)
                .withSize(size)
                .build()
        ),
}

/**
 * Test scenario generators for common testing patterns
 */
export const TestScenarios = {
    // Generate props for all button states
    buttonStates: () => [
        { name: 'default', props: ButtonTestFactory.default() },
        { name: 'disabled', props: ButtonTestFactory.disabled() },
        { name: 'loading', props: ButtonTestFactory.loading() },
    ],

    // Generate props for all visual variants
    visualVariants: () => {
        const variants: Array<{ name: string; props: ButtonTestProps }> = []

        // All type and size combinations
        Object.values(ButtonType).forEach((type) => {
            Object.values(ButtonSize).forEach((size) => {
                variants.push({
                    name: `${type}-${size}`,
                    props: new ButtonPropsBuilder()
                        .withText(`${type} ${size}`)
                        .withType(type)
                        .withSize(size)
                        .build(),
                })
            })
        })

        return variants
    },

    // Accessibility test scenarios
    accessibilityScenarios: () => [
        {
            name: 'with aria-label',
            props: new ButtonPropsBuilder()
                .withText('Save')
                .withAriaLabel('Save document')
                .build(),
        },
        {
            name: 'icon-only with aria-label',
            props: ButtonTestFactory.iconOnly(),
        },
        {
            name: 'with aria-describedby',
            props: new ButtonPropsBuilder()
                .withText('Submit')
                .withCustomProps({ 'aria-describedby': 'help-text' })
                .build(),
        },
        {
            name: 'toggle button',
            props: new ButtonPropsBuilder()
                .withText('Toggle')
                .withCustomProps({ 'aria-pressed': 'false' })
                .build(),
        },
    ],
}

// Checkbox Component Test Props and Builder
interface CheckboxTestProps {
    id?: string
    value?: string
    checked?: boolean | 'indeterminate'
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: CheckboxSize
    children?: React.ReactNode
    subtext?: string
    slot?: React.ReactNode
    [key: string]: unknown
}

/**
 * Test data builder for Checkbox component props
 */
export class CheckboxPropsBuilder {
    private props: CheckboxTestProps = {}

    withId(id: string) {
        this.props.id = id
        return this
    }

    withValue(value: string) {
        this.props.value = value
        return this
    }

    withChecked(checked: boolean | 'indeterminate' = true) {
        this.props.checked = checked
        return this
    }

    withDefaultChecked(defaultChecked: boolean = true) {
        this.props.defaultChecked = defaultChecked
        return this
    }

    withIndeterminate() {
        this.props.checked = 'indeterminate'
        return this
    }

    withDisabled() {
        this.props.disabled = true
        return this
    }

    withRequired() {
        this.props.required = true
        return this
    }

    withError() {
        this.props.error = true
        return this
    }

    withSize(size: CheckboxSize) {
        this.props.size = size
        return this
    }

    withChildren(children: React.ReactNode) {
        this.props.children = children
        return this
    }

    withSubtext(subtext: string) {
        this.props.subtext = subtext
        return this
    }

    withSlot(slot: React.ReactNode) {
        this.props.slot = slot
        return this
    }

    withOnCheckedChange(
        onCheckedChange: (checked: boolean | 'indeterminate') => void
    ) {
        this.props.onCheckedChange = onCheckedChange
        return this
    }

    withCustomProps(props: Record<string, unknown>) {
        this.props = { ...this.props, ...props }
        return this
    }

    build() {
        return this.props
    }
}

// Radio Component Test Props and Builder
interface RadioTestProps {
    id?: string
    value?: string
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: RadioSize
    children?: React.ReactNode
    subtext?: string
    slot?: React.ReactNode
    name?: string
    [key: string]: unknown
}

/**
 * Test data builder for Radio component props
 */
export class RadioPropsBuilder {
    private props: RadioTestProps = {}

    withId(id: string) {
        this.props.id = id
        return this
    }

    withValue(value: string) {
        this.props.value = value
        return this
    }

    withChecked(checked: boolean = true) {
        this.props.checked = checked
        return this
    }

    withDefaultChecked(defaultChecked: boolean = true) {
        this.props.defaultChecked = defaultChecked
        return this
    }

    withDisabled() {
        this.props.disabled = true
        return this
    }

    withRequired() {
        this.props.required = true
        return this
    }

    withError() {
        this.props.error = true
        return this
    }

    withSize(size: RadioSize) {
        this.props.size = size
        return this
    }

    withChildren(children: React.ReactNode) {
        this.props.children = children
        return this
    }

    withSubtext(subtext: string) {
        this.props.subtext = subtext
        return this
    }

    withSlot(slot: React.ReactNode) {
        this.props.slot = slot
        return this
    }

    withName(name: string) {
        this.props.name = name
        return this
    }

    withOnChange(onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        this.props.onChange = onChange
        return this
    }

    withCustomProps(props: Record<string, unknown>) {
        this.props = { ...this.props, ...props }
        return this
    }

    build() {
        return this.props
    }
}

// Switch Component Test Props and Builder
interface SwitchTestProps {
    id?: string
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: SwitchSize
    label?: React.ReactNode
    subtext?: React.ReactNode
    slot?: React.ReactNode
    name?: string
    value?: string
    [key: string]: unknown
}

/**
 * Test data builder for Switch component props
 */
export class SwitchPropsBuilder {
    private props: SwitchTestProps = {}

    withId(id: string) {
        this.props.id = id
        return this
    }

    withChecked(checked: boolean = true) {
        this.props.checked = checked
        return this
    }

    withDefaultChecked(defaultChecked: boolean = true) {
        this.props.defaultChecked = defaultChecked
        return this
    }

    withDisabled() {
        this.props.disabled = true
        return this
    }

    withRequired() {
        this.props.required = true
        return this
    }

    withError() {
        this.props.error = true
        return this
    }

    withSize(size: SwitchSize) {
        this.props.size = size
        return this
    }

    withLabel(label: React.ReactNode) {
        this.props.label = label
        return this
    }

    withSubtext(subtext: React.ReactNode) {
        this.props.subtext = subtext
        return this
    }

    withSlot(slot: React.ReactNode) {
        this.props.slot = slot
        return this
    }

    withName(name: string) {
        this.props.name = name
        return this
    }

    withValue(value: string) {
        this.props.value = value
        return this
    }

    withOnChange(onChange: (checked: boolean) => void) {
        this.props.onChange = onChange
        return this
    }

    withCustomProps(props: Record<string, unknown>) {
        this.props = { ...this.props, ...props }
        return this
    }

    build() {
        return this.props
    }
}

/**
 * Factory functions for Checkbox test scenarios
 */
export const CheckboxTestFactory = {
    default: () =>
        new CheckboxPropsBuilder().withChildren('Test Checkbox').build(),

    checked: () =>
        new CheckboxPropsBuilder()
            .withChildren('Checked Checkbox')
            .withChecked()
            .build(),

    indeterminate: () =>
        new CheckboxPropsBuilder()
            .withChildren('Indeterminate Checkbox')
            .withIndeterminate()
            .build(),

    disabled: () =>
        new CheckboxPropsBuilder()
            .withChildren('Disabled Checkbox')
            .withDisabled()
            .build(),

    required: () =>
        new CheckboxPropsBuilder()
            .withChildren('Required Checkbox')
            .withRequired()
            .build(),

    withError: () =>
        new CheckboxPropsBuilder()
            .withChildren('Error Checkbox')
            .withError()
            .build(),

    withSubtext: () =>
        new CheckboxPropsBuilder()
            .withChildren('Checkbox with subtext')
            .withSubtext('Additional information')
            .build(),

    complex: () =>
        new CheckboxPropsBuilder()
            .withChildren('Complex Checkbox')
            .withSubtext('With subtext')
            .withSlot(React.createElement(MockIcon))
            .withRequired()
            .withSize(CheckboxSize.MEDIUM)
            .build(),

    allSizes: () =>
        [CheckboxSize.SMALL, CheckboxSize.MEDIUM].map((size) =>
            new CheckboxPropsBuilder()
                .withChildren(`${size} Checkbox`)
                .withSize(size)
                .build()
        ),
}

/**
 * Factory functions for Radio test scenarios
 */
export const RadioTestFactory = {
    default: () =>
        new RadioPropsBuilder()
            .withChildren('Test Radio')
            .withValue('test')
            .build(),

    checked: () =>
        new RadioPropsBuilder()
            .withChildren('Checked Radio')
            .withValue('checked')
            .withChecked()
            .build(),

    disabled: () =>
        new RadioPropsBuilder()
            .withChildren('Disabled Radio')
            .withValue('disabled')
            .withDisabled()
            .build(),

    required: () =>
        new RadioPropsBuilder()
            .withChildren('Required Radio')
            .withValue('required')
            .withRequired()
            .build(),

    withError: () =>
        new RadioPropsBuilder()
            .withChildren('Error Radio')
            .withValue('error')
            .withError()
            .build(),

    withSubtext: () =>
        new RadioPropsBuilder()
            .withChildren('Radio with subtext')
            .withValue('subtext')
            .withSubtext('Additional information')
            .build(),

    group: () => [
        new RadioPropsBuilder()
            .withChildren('Option 1')
            .withValue('option1')
            .withName('test-group')
            .build(),
        new RadioPropsBuilder()
            .withChildren('Option 2')
            .withValue('option2')
            .withName('test-group')
            .build(),
        new RadioPropsBuilder()
            .withChildren('Option 3')
            .withValue('option3')
            .withName('test-group')
            .build(),
    ],

    allSizes: () =>
        [RadioSize.SMALL, RadioSize.MEDIUM].map((size) =>
            new RadioPropsBuilder()
                .withChildren(`${size} Radio`)
                .withValue(size)
                .withSize(size)
                .build()
        ),
}

// RadioGroup Component Test Props and Builder
interface RadioGroupTestProps extends RadioGroupProps {
    [key: string]: unknown
}

/**
 * Test data builder for RadioGroup component props
 */
export class RadioGroupPropsBuilder {
    private props: RadioGroupTestProps = { name: 'test-group', children: null }

    withId(id: string) {
        this.props.id = id
        return this
    }

    withLabel(label: string) {
        this.props.label = label
        return this
    }

    withName(name: string) {
        this.props.name = name
        return this
    }

    withValue(value: string) {
        this.props.value = value
        return this
    }

    withDefaultValue(defaultValue: string) {
        this.props.defaultValue = defaultValue
        return this
    }

    withOnChange(onChange: (value: string) => void) {
        this.props.onChange = onChange
        return this
    }

    withDisabled() {
        this.props.disabled = true
        return this
    }

    withChildren(children: React.ReactNode) {
        this.props.children = children
        return this
    }

    withCustomProps(props: Record<string, unknown>) {
        this.props = { ...this.props, ...props }
        return this
    }

    build() {
        return this.props
    }
}

/**
 * Factory functions for RadioGroup test scenarios
 */
export const RadioGroupTestFactory = {
    default: () =>
        new RadioGroupPropsBuilder()
            .withName('default-group')
            .withLabel('Default Group')
            .build(),

    controlled: () =>
        new RadioGroupPropsBuilder()
            .withName('controlled-group')
            .withLabel('Controlled Group')
            .withValue('option1')
            .build(),

    uncontrolled: () =>
        new RadioGroupPropsBuilder()
            .withName('uncontrolled-group')
            .withLabel('Uncontrolled Group')
            .withDefaultValue('option2')
            .build(),

    disabled: () =>
        new RadioGroupPropsBuilder()
            .withName('disabled-group')
            .withLabel('Disabled Group')
            .withDisabled()
            .build(),

    withoutLabel: () =>
        new RadioGroupPropsBuilder().withName('no-label-group').build(),

    withSelection: () =>
        new RadioGroupPropsBuilder()
            .withName('selection-group')
            .withLabel('Selection Group')
            .withValue('option1')
            .build(),

    complex: () =>
        new RadioGroupPropsBuilder()
            .withId('complex-group')
            .withName('complex-group')
            .withLabel('Complex Radio Group')
            .withValue('selected-option')
            .build(),
}

/**
 * Factory functions for Switch test scenarios
 */
export const SwitchTestFactory = {
    default: () => new SwitchPropsBuilder().withLabel('Test Switch').build(),

    checked: () =>
        new SwitchPropsBuilder()
            .withLabel('Checked Switch')
            .withChecked()
            .build(),

    disabled: () =>
        new SwitchPropsBuilder()
            .withLabel('Disabled Switch')
            .withDisabled()
            .build(),

    required: () =>
        new SwitchPropsBuilder()
            .withLabel('Required Switch')
            .withRequired()
            .build(),

    withError: () =>
        new SwitchPropsBuilder().withLabel('Error Switch').withError().build(),

    withSubtext: () =>
        new SwitchPropsBuilder()
            .withLabel('Switch with subtext')
            .withSubtext('Additional information')
            .build(),

    complex: () =>
        new SwitchPropsBuilder()
            .withLabel('Complex Switch')
            .withSubtext('With subtext')
            .withSlot(React.createElement(MockIcon))
            .withRequired()
            .withSize(SwitchSize.MEDIUM)
            .build(),

    allSizes: () =>
        [SwitchSize.SMALL, SwitchSize.MEDIUM].map((size) =>
            new SwitchPropsBuilder()
                .withLabel(`${size} Switch`)
                .withSize(size)
                .build()
        ),
}

// SwitchGroup Component Test Props and Builder
interface SwitchGroupTestProps extends SwitchGroupProps {
    [key: string]: unknown
}

/**
 * Test data builder for SwitchGroup component props
 */
export class SwitchGroupPropsBuilder {
    private props: SwitchGroupTestProps = { children: null }

    withId(id: string) {
        this.props.id = id
        return this
    }

    withLabel(label: string) {
        this.props.label = label
        return this
    }

    withName(name: string) {
        this.props.name = name
        return this
    }

    withValue(value: string[]) {
        this.props.value = value
        return this
    }

    withDefaultValue(defaultValue: string[]) {
        this.props.defaultValue = defaultValue
        return this
    }

    withOnChange(onChange: (value: string[]) => void) {
        this.props.onChange = onChange
        return this
    }

    withDisabled() {
        this.props.disabled = true
        return this
    }

    withChildren(children: React.ReactNode) {
        this.props.children = children
        return this
    }

    withCustomProps(props: Record<string, unknown>) {
        this.props = { ...this.props, ...props }
        return this
    }

    build() {
        return this.props
    }
}

/**
 * Factory functions for SwitchGroup test scenarios
 */
export const SwitchGroupTestFactory = {
    default: () =>
        new SwitchGroupPropsBuilder()
            .withName('default-group')
            .withLabel('Default Switch Group')
            .build(),

    controlled: () =>
        new SwitchGroupPropsBuilder()
            .withName('controlled-group')
            .withLabel('Controlled Switch Group')
            .withValue(['option1'])
            .build(),

    uncontrolled: () =>
        new SwitchGroupPropsBuilder()
            .withName('uncontrolled-group')
            .withLabel('Uncontrolled Switch Group')
            .withDefaultValue(['option2'])
            .build(),

    disabled: () =>
        new SwitchGroupPropsBuilder()
            .withName('disabled-group')
            .withLabel('Disabled Switch Group')
            .withDisabled()
            .build(),

    withoutLabel: () =>
        new SwitchGroupPropsBuilder().withName('no-label-group').build(),

    multipleSelected: () =>
        new SwitchGroupPropsBuilder()
            .withName('multiple-group')
            .withLabel('Multiple Selection Group')
            .withValue(['option1', 'option3'])
            .build(),

    complex: () =>
        new SwitchGroupPropsBuilder()
            .withId('complex-group')
            .withName('complex-group')
            .withLabel('Complex Switch Group')
            .withValue(['selected-option'])
            .build(),
}
