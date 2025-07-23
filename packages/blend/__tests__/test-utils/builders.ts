import React from 'react'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../lib/components/Button/types'
import { MockIcon } from './index'

/**
 * Test data builder for Button component props
 * Implements the builder pattern for flexible test data creation
 */
export class ButtonPropsBuilder {
    private props: any = {}

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

    withCustomProps(props: Record<string, any>) {
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
        const variants: Array<{ name: string; props: any }> = []

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
