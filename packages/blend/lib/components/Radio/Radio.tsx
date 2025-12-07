import React from 'react'
import { type RadioProps, RadioSize } from './types'
import { getRadioTextProps, getRadioLabelStyles } from './utils'
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
    value,
    maxLength,
    ...rest
}: RadioProps) => {
    const radioTokens = useResponsiveTokens<RadioTokensType>('RADIO')
    const generatedId = React.useId()
    const uniqueId = id || generatedId
    const shouldShake = useErrorShake(error)
    const labelMaxLength = maxLength?.label
    const subtextMaxLength = maxLength?.subtext

    const subtextId = subtext ? `${uniqueId}-subtext` : undefined
    const customAriaDescribedBy = (rest as { 'aria-describedby'?: string })[
        'aria-describedby'
    ]
    const ariaDescribedBy =
        subtextId && customAriaDescribedBy
            ? `${customAriaDescribedBy} ${subtextId}`
            : subtextId || customAriaDescribedBy

    return (
        <Block
            data-radio={children ?? 'radio'}
            data-status={disabled ? 'disabled' : 'enabled'}
            data-id={value ?? ''}
            display="flex"
            alignItems={subtext ? 'flex-start' : 'center'}
            gap={radioTokens.gap}
        >
            <StyledRadioInput
                type="radio"
                id={uniqueId}
                name={name}
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                required={required}
                onChange={onChange}
                size={size}
                $isDisabled={disabled}
                $isChecked={checked || false}
                $error={error}
                $tokens={radioTokens}
                style={getErrorShakeStyle(shouldShake)}
                {...rest}
                aria-required={required ? true : undefined}
                aria-invalid={error ? true : undefined}
                aria-describedby={ariaDescribedBy}
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
                subtextId={subtextId}
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
    subtextId?: string
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
    subtextId,
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
        <Block id={subtextId}>
            <PrimitiveText
                data-element="radio-description"
                data-id={subtext ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
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
        </Block>
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
                    data-element="radio-label"
                    data-id={children ?? ''}
                    display="flex"
                    alignItems="center"
                    gap={radioTokens.content.label.gap}
                >
                    {labelWithTooltip}
                    {slot && (
                        <Block
                            data-element="icon"
                            as="span"
                            width={radioTokens.slot[size]}
                        >
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
