import React from 'react'
import { type RadioProps, RadioSize } from './types'
import {
    getRadioDataState,
    getRadioTextProps,
    getRadioLabelStyles,
} from './utils'
import { StyledRadioInput } from './StyledRadio'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip/Tooltip'
import type { RadioTokensType } from './radio.token'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../tokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'
import { getTruncatedText } from '../../global-utils/GlobalUtils'

export const Radio = ({
    id,
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
    maxLength,
    ...rest
}: RadioProps) => {
    const radioTokens = useResponsiveTokens<RadioTokensType>('RADIO')
    const generatedId = React.useId()
    const uniqueId = id || generatedId
    const shouldShake = useErrorShake(error)
    const labelMaxLength = maxLength?.label
    const subtextMaxLength = maxLength?.subtext

    return (
        <Block
            display="flex"
            alignItems={subtext ? 'flex-start' : 'center'}
            gap={radioTokens.gap}
        >
            <StyledRadioInput
                type="radio"
                id={uniqueId}
                defaultChecked={defaultChecked}
                name={name}
                disabled={disabled}
                required={required}
                onChange={(e) => onChange?.(e.target.checked)}
                data-state={getRadioDataState(checked || false)}
                aria-checked={checked || false}
                size={size}
                $isDisabled={disabled}
                $isChecked={checked || false}
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
                labelMaxLength={labelMaxLength}
                subtextMaxLength={subtextMaxLength}
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
    labelMaxLength?: number
    subtextMaxLength?: number
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
    labelMaxLength,
    subtextMaxLength,
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
    const isStringLabel =
        typeof children === 'string' || typeof children === 'number'
    const labelTruncation = isStringLabel
        ? getTruncatedText(String(children), labelMaxLength)
        : null
    const subtextIsString =
        typeof subtext === 'string' || typeof subtext === 'number'
    const subtextTruncation = subtextIsString
        ? getTruncatedText(String(subtext), subtextMaxLength)
        : null

    const labelContent = children ? (
        <label htmlFor={uniqueId} style={labelStyles}>
            <PrimitiveText
                data-text={children}
                as="span"
                fontSize={textProps.fontSize}
                fontWeight={textProps.fontWeight}
                color={textProps.color}
            >
                {labelTruncation?.isTruncated
                    ? labelTruncation.truncatedValue
                    : children}
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
    ) : null

    const labelWithTooltip =
        labelTruncation?.isTruncated && labelContent ? (
            <Tooltip content={labelTruncation.fullValue}>
                {labelContent}
            </Tooltip>
        ) : (
            labelContent
        )

    const subtextContent = subtext ? (
        <PrimitiveText
            data-description-text={subtext}
            as="span"
            fontSize={subtextProps.fontSize}
            fontWeight={subtextProps.fontWeight}
            color={subtextProps.color}
        >
            {subtextTruncation?.isTruncated
                ? subtextTruncation.truncatedValue
                : subtext}
        </PrimitiveText>
    ) : null

    const subtextWithTooltip =
        subtextTruncation?.isTruncated && subtextContent ? (
            <Tooltip content={subtextTruncation.fullValue}>
                {subtextContent}
            </Tooltip>
        ) : (
            subtextContent
        )

    return (
        <Block display="flex" flexDirection="column">
            {labelWithTooltip && (
                <Block
                    display="flex"
                    alignItems="center"
                    gap={radioTokens.content.label.gap}
                >
                    {labelWithTooltip}
                    {slot && (
                        <Block as="span" width={radioTokens.slot[size]}>
                            {slot}
                        </Block>
                    )}
                </Block>
            )}
            {subtextWithTooltip}
        </Block>
    )
}

Radio.displayName = 'Radio'

export default Radio
