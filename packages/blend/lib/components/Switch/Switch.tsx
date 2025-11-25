import React from 'react'
import { type SwitchProps, SwitchSize } from './types'
import {
    getSwitchDataState,
    getSwitchTextProps,
    getSwitchSubtextProps,
    getSwitchLabelStyles,
} from './utils'
import { StyledSwitchRoot, StyledSwitchThumb } from './StyledSwitch'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip/Tooltip'
import type { SwitchTokensType } from './switch.token'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'
import { getTruncatedText } from '../../global-utils/GlobalUtils'

export const Switch = ({
    id,
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    required = false,
    error = false,
    size = SwitchSize.MEDIUM,
    label,
    subtext,
    slot,
    name,
    value,
    maxLength,
    ...rest
}: SwitchProps) => {
    const tokens = useResponsiveTokens<SwitchTokensType>('SWITCH')
    const generatedId = React.useId()
    const uniqueId = id || generatedId
    const shouldShake = useErrorShake(error)
    const labelMaxLength = maxLength?.label
    const subtextMaxLength = maxLength?.subtext

    return (
        <Block display="flex" gap={tokens.gap}>
            <StyledSwitchRoot
                type="button"
                role="switch"
                id={uniqueId}
                aria-checked={checked || false}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onClick={() => onChange?.(checked || false)}
                data-state={getSwitchDataState(checked || false)}
                size={size}
                $isDisabled={disabled}
                $isChecked={checked || false}
                $error={error}
                value={value}
                name={name}
                style={getErrorShakeStyle(shouldShake)}
                {...rest}
            >
                <StyledSwitchThumb size={size} $isChecked={checked || false} />
            </StyledSwitchRoot>
            <Block
                display="flex"
                flexDirection="column"
                gap={tokens.content.gap}
            >
                <Block display="flex" alignItems="center">
                    <SwitchContent
                        uniqueId={uniqueId}
                        disabled={disabled}
                        error={error}
                        required={required}
                        size={size}
                        label={label}
                        tokens={tokens}
                        maxLength={labelMaxLength}
                    />

                    {slot && (
                        <Block as="span" marginLeft={tokens.content.label.gap}>
                            {slot}
                        </Block>
                    )}
                </Block>

                {subtext && (
                    <SwitchSubtext
                        size={size}
                        disabled={disabled}
                        error={error}
                        tokens={tokens}
                        maxLength={subtextMaxLength}
                    >
                        {subtext}
                    </SwitchSubtext>
                )}
            </Block>
        </Block>
    )
}

const SwitchContent: React.FC<{
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: SwitchSize
    label?: string
    tokens: SwitchTokensType
    maxLength?: number
}> = ({
    uniqueId,
    disabled,
    error,
    required,
    size,
    label,
    tokens,
    maxLength,
}) => {
    if (!label) return null

    const labelStyles = getSwitchLabelStyles(disabled)
    const textProps = getSwitchTextProps(tokens, size, disabled, error)
    const { truncatedValue, fullValue, isTruncated } = getTruncatedText(
        label,
        maxLength
    )

    const content = (
        <label htmlFor={uniqueId} style={labelStyles}>
            <PrimitiveText
                data-text={label}
                as="span"
                fontSize={textProps.fontSize}
                fontWeight={textProps.fontWeight}
                color={textProps.color}
            >
                {truncatedValue}
                {required && (
                    <PrimitiveText
                        as="span"
                        color={tokens.required.color}
                        style={{ marginLeft: '4px' }}
                    >
                        *
                    </PrimitiveText>
                )}
            </PrimitiveText>
        </label>
    )

    return isTruncated ? (
        <Tooltip content={fullValue}>{content}</Tooltip>
    ) : (
        content
    )
}

const SwitchSubtext: React.FC<{
    size: SwitchSize
    disabled: boolean
    error: boolean
    tokens: SwitchTokensType
    children: React.ReactNode
    maxLength?: number
}> = ({ size, disabled, error, tokens, children, maxLength }) => {
    const subtextProps = getSwitchSubtextProps(tokens, size, disabled, error)
    const isStringLike =
        typeof children === 'string' || typeof children === 'number'
    const stringValue = isStringLike ? String(children) : ''
    const truncation = isStringLike
        ? getTruncatedText(stringValue, maxLength)
        : null

    const content = (
        <PrimitiveText
            data-description-text={children}
            as="span"
            color={subtextProps.color}
            fontSize={subtextProps.fontSize}
        >
            {truncation?.isTruncated ? truncation.truncatedValue : children}
        </PrimitiveText>
    )

    if (truncation?.isTruncated) {
        return <Tooltip content={truncation.fullValue}>{content}</Tooltip>
    }

    return content
}

Switch.displayName = 'Switch'
