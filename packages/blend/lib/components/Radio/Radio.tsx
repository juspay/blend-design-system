import React from 'react'
import { type RadioProps, RadioSize } from './types'
import {
    getRadioDataState,
    createRadioInputProps,
    getCurrentCheckedState,
    createRadioChangeHandler,
    getRadioTextProps,
    getRadioLabelStyles,
} from './utils'
import { StyledRadioInput } from './StyledRadio'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import type { RadioTokensType } from './radio.token'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../tokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'

export const Radio = ({
    id,
    value,
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    required = false,
    error = false,
    size = RadioSize.MEDIUM,
    children,
    subtext,
    slot,
    name,
    ...rest
}: RadioProps) => {
    const radioTokens = useResponsiveTokens<RadioTokensType>('RADIO')

    const generatedId = React.useId()
    const uniqueId = id || generatedId

    const inputProps = createRadioInputProps(checked, defaultChecked)
    const currentChecked = getCurrentCheckedState(checked, defaultChecked)
    const handleChange = createRadioChangeHandler(disabled, onChange)
    const shouldShake = useErrorShake(error)

    return (
        <Block
            display="flex"
            alignItems={subtext ? 'flex-start' : 'center'}
            gap={radioTokens.gap}
        >
            <StyledRadioInput
                type="radio"
                id={uniqueId}
                name={name}
                value={value}
                {...inputProps}
                disabled={disabled}
                required={required}
                onChange={handleChange}
                data-state={getRadioDataState(currentChecked)}
                aria-checked={currentChecked}
                size={size}
                $isDisabled={disabled}
                $isChecked={currentChecked}
                $error={error}
                style={getErrorShakeStyle(shouldShake)}
                {...rest}
            />

            <RadioContent
                uniqueId={uniqueId}
                disabled={disabled}
                error={error}
                required={required}
                size={size}
                children={children}
                subtext={subtext}
                radioTokens={radioTokens}
                slot={slot}
            />
        </Block>
    )
}

const RadioContent: React.FC<{
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: RadioSize
    children?: React.ReactNode
    subtext?: React.ReactNode
    radioTokens: RadioTokensType
    slot?: React.ReactNode
}> = ({
    uniqueId,
    disabled,
    error,
    required,
    size,
    children,
    subtext,
    radioTokens,
    slot,
}) => {
    const labelStyles = getRadioLabelStyles(radioTokens, disabled)
    const textProps = getRadioTextProps(radioTokens, size, disabled, error)
    const subtextProps = getRadioTextProps(
        radioTokens,
        size,
        disabled,
        error,
        true
    )

    return (
        <Block display="flex" flexDirection="column">
            {children && (
                <Block
                    display="flex"
                    alignItems="center"
                    gap={radioTokens.content.label.gap}
                >
                    <label htmlFor={uniqueId} style={labelStyles}>
                        <PrimitiveText
                            data-text={children}
                            as="span"
                            fontSize={textProps.fontSize}
                            fontWeight={textProps.fontWeight}
                            color={textProps.color}
                        >
                            {children}
                            {required && (
                                <PrimitiveText
                                    as="span"
                                    color={radioTokens.required.color}
                                    style={{
                                        marginLeft: FOUNDATION_THEME.unit[2],
                                    }}
                                >
                                    *
                                </PrimitiveText>
                            )}
                        </PrimitiveText>
                    </label>
                    {slot && (
                        <Block as="span" width={radioTokens.slot[size]}>
                            {slot}
                        </Block>
                    )}
                </Block>
            )}
            {subtext && (
                <PrimitiveText
                    data-description-text={subtext}
                    as="span"
                    fontSize={subtextProps.fontSize}
                    fontWeight={subtextProps.fontWeight}
                    color={subtextProps.color}
                >
                    {subtext}
                </PrimitiveText>
            )}
        </Block>
    )
}

Radio.displayName = 'Radio'

export default Radio
