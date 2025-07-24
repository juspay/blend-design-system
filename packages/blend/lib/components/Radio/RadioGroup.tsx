import React, { forwardRef, useState, useCallback } from 'react'
import type { RadioGroupProps } from './types'
import {
    isRadioElement,
    shouldRadioBeChecked,
    createGroupChangeHandler,
    isValidRadioValue,
    getRadioTextProps,
} from './utils'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Radio from './Radio'
import type { RadioTokensType } from './radio.token'
import { RadioSize } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        { children, label, name, value, defaultValue, onChange, disabled },
        ref
    ) => {
        const radioTokens = useResponsiveTokens<RadioTokensType>('RADIO')

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
                    case 'Enter':
                        e.preventDefault()
                        const targetRadio = radios[
                            currentIndex
                        ] as HTMLInputElement
                        if (targetRadio && targetRadio.value) {
                            handleGroupChange(targetRadio.value)
                        }
                        return
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

        const enhancedChildren = React.Children.map(children, (child) => {
            if (!React.isValidElement(child) || !isRadioElement(child, Radio)) {
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
                onChange: (checked: boolean) => {
                    if (checked) {
                        handleGroupChange(childValue)
                    }
                },
                disabled: disabled || child.props.disabled,
            })
        })

        return (
            <Block
                ref={ref}
                display="flex"
                flexDirection="column"
                gap={radioTokens.groupGap}
                role="radiogroup"
                aria-label={label}
                onKeyDown={handleKeyDown}
            >
                {label && (
                    <GroupLabel radioTokens={radioTokens}>{label}</GroupLabel>
                )}
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={radioTokens.groupGap}
                >
                    {enhancedChildren}
                </Block>
            </Block>
        )
    }
)

const GroupLabel: React.FC<{
    children: React.ReactNode
    radioTokens: RadioTokensType
}> = ({ children, radioTokens }) => {
    const textProps = getRadioTextProps(
        radioTokens,
        RadioSize.MEDIUM,
        false,
        false
    )

    return (
        <PrimitiveText
            as="label"
            fontSize={textProps.fontSize}
            fontWeight={textProps.fontWeight}
            color={textProps.color}
            style={{ marginBottom: radioTokens.groupGap }}
        >
            {children}
        </PrimitiveText>
    )
}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
