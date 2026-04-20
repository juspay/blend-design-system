import React, { forwardRef, useState, useCallback, useId, useMemo } from 'react'
import type { RadioGroupProps } from './types'
import { isRadioElement, isValidRadioValue, getRadioTextProps } from './utils'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Radio from './Radio'
import type { RadioTokensType } from './radio.token'
import { RadioSize } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../tokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            id,
            children,
            label,
            name,
            value,
            defaultValue,
            onChange,
            disabled,
            required,
            error,
            ...rest
        },
        ref
    ) => {
        const radioTokens = useResponsiveTokens<RadioTokensType>('RADIO')
        const generatedId = useId()
        const uniqueId = id || generatedId
        const shouldShake = useErrorShake(error || false)

        const ariaLabelledBy = (rest as { 'aria-labelledby'?: string })[
            'aria-labelledby'
        ]
        const customAriaDescribedBy = (rest as { 'aria-describedby'?: string })[
            'aria-describedby'
        ]
        const labelId =
            !ariaLabelledBy && label ? `${uniqueId}-label` : undefined

        // Internal state for uncontrolled mode
        const [internalValue, setInternalValue] = useState<string | undefined>(
            defaultValue
        )

        // Determine if controlled or uncontrolled
        const isControlled = value !== undefined
        const currentValue = isControlled ? value : internalValue

        const handleGroupChange = useCallback(
            (newValue: string) => {
                if (!isControlled) {
                    setInternalValue(newValue)
                }
                onChange?.(newValue)
            },
            [isControlled, onChange]
        )

        // Handle keyboard navigation
        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (disabled) return

                const radios = Array.from(
                    e.currentTarget.querySelectorAll(
                        'input[type="radio"]:not(:disabled)'
                    )
                )
                const currentIndex = radios.findIndex(
                    (radio) => radio === e.target
                )

                if (currentIndex === -1) return

                let nextIndex = currentIndex

                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault()
                        nextIndex = (currentIndex + 1) % radios.length
                        break
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault()
                        nextIndex =
                            currentIndex === 0
                                ? radios.length - 1
                                : currentIndex - 1
                        break
                    case ' ':
                    case 'Enter': {
                        e.preventDefault()
                        const targetRadio = radios[
                            currentIndex
                        ] as HTMLInputElement
                        if (targetRadio && targetRadio.value) {
                            handleGroupChange(targetRadio.value)
                        }
                        return
                    }
                    default:
                        return
                }

                const nextRadio = radios[nextIndex] as HTMLInputElement
                if (nextRadio) {
                    nextRadio.focus()
                    if (nextRadio.value) {
                        handleGroupChange(nextRadio.value)
                    }
                }
            },
            [disabled, handleGroupChange]
        )

        // Memoize cloning so simple group-level disabled toggles don't require
        // re-cloning every child. Group disabled is applied via a <fieldset>.
        const enhancedChildren = useMemo(() => {
            return React.Children.map(children, (child) => {
                if (
                    !React.isValidElement(child) ||
                    !isRadioElement(child, Radio)
                ) {
                    return null
                }

                const childValue = child.props.value
                if (!isValidRadioValue(childValue)) {
                    console.warn(
                        'RadioGroup: Radio child must have a string value prop'
                    )
                    return null
                }

                const isChecked = currentValue === childValue

                return React.cloneElement(child, {
                    name,
                    checked: isChecked,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                            handleGroupChange(childValue)
                        }
                    },
                    // Note: do NOT derive from group `disabled` here; group-level
                    // disabled is handled by the wrapping <fieldset>.
                    disabled: child.props.disabled,
                    error: error || child.props.error,
                    required: required || child.props.required,
                })
            })
        }, [children, currentValue, error, handleGroupChange, name, required])

        return (
            <Block
                data-radiogroup={label ?? 'radiogroup'}
                data-status={disabled ? 'disabled' : 'enabled'}
                ref={ref}
                id={uniqueId}
                display="flex"
                flexDirection="column"
                gap={radioTokens.group.gap}
                role="radiogroup"
                style={getErrorShakeStyle(shouldShake)}
                onKeyDown={handleKeyDown}
                {...rest}
                aria-label={!ariaLabelledBy && !labelId ? label : undefined}
                aria-labelledby={ariaLabelledBy || labelId}
                aria-describedby={customAriaDescribedBy}
                aria-required={required ? true : undefined}
                aria-invalid={error ? true : undefined}
            >
                {label && (
                    <GroupLabel
                        radioTokens={radioTokens}
                        required={required}
                        id={labelId}
                    >
                        {label}
                    </GroupLabel>
                )}
                <fieldset
                    disabled={disabled}
                    style={{
                        margin: 0,
                        padding: 0,
                        border: 0,
                        minInlineSize: 0,
                    }}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={radioTokens.group.gap}
                    >
                        {enhancedChildren}
                    </Block>
                </fieldset>
            </Block>
        )
    }
)

const GroupLabel: React.FC<{
    children: React.ReactNode
    radioTokens: RadioTokensType
    required?: boolean
    id?: string
}> = ({ children, radioTokens, required, id }) => {
    const textProps = getRadioTextProps(
        radioTokens,
        RadioSize.MEDIUM,
        false,
        false
    )

    return (
        <PrimitiveText
            as="label"
            id={id}
            fontSize={textProps.fontSize}
            fontWeight={textProps.fontWeight}
            color={textProps.color}
            style={{ marginBottom: radioTokens.group.gap }}
        >
            {children}
            {required && (
                <PrimitiveText
                    as="span"
                    color={radioTokens.required.color}
                    style={{ marginLeft: FOUNDATION_THEME.unit[2] }}
                >
                    *
                </PrimitiveText>
            )}
        </PrimitiveText>
    )
}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
