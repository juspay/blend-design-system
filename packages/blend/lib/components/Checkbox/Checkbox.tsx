import { forwardRef, useId } from 'react'
import { Check, Minus } from 'lucide-react'
import type { CheckboxProps } from './types'
import { CheckboxSize } from './types'
import {
    getCheckboxIconColor,
    getCheckboxTextProps,
    getCheckboxSubtextProps,
    getCheckboxLabelStyles,
    getSubtextId,
    mergeAriaDescribedBy,
} from './checkboxUtils'
import { StyledCheckboxRoot, StyledCheckboxIndicator } from './StyledCheckbox'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip/Tooltip'
import type { CheckboxTokensType } from './checkbox.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../tokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'
import { getTruncatedText } from '../../global-utils/GlobalUtils'

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
    (
        {
            id,
            name,
            checked,
            defaultChecked = false,
            onCheckedChange,
            disabled = false,
            required = false,
            error = false,
            size = CheckboxSize.MEDIUM,
            children,
            subtext,
            slot,
            maxLength,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CheckboxTokensType>('CHECKBOX')
        const generatedId = useId()
        const uniqueId = id || generatedId
        const shouldShake = useErrorShake(error)

        const labelMaxLength = maxLength?.label
        const subtextMaxLength = maxLength?.subtext

        const { 'aria-describedby': customAriaDescribedBy, ...restProps } =
            rest as { 'aria-describedby'?: string; [key: string]: unknown }

        const subtextId = getSubtextId(uniqueId, !!subtext)

        const ariaAttributes = {
            'aria-required': required ? true : undefined,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': mergeAriaDescribedBy(
                subtextId,
                customAriaDescribedBy
            ),
        }

        return (
            <Block display="flex" alignItems="flex-start" gap={tokens.gap}>
                <StyledCheckboxRoot
                    id={uniqueId}
                    name={name}
                    ref={ref}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                    required={required}
                    size={size}
                    $isDisabled={disabled}
                    $checked={checked || false}
                    $error={error}
                    style={getErrorShakeStyle(shouldShake)}
                    {...ariaAttributes}
                    {...restProps}
                >
                    <CheckboxIndicator
                        checked={checked || false}
                        size={size}
                        tokens={tokens}
                        disabled={disabled}
                    />
                </StyledCheckboxRoot>

                {children && (
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={tokens.content.gap}
                    >
                        <Block display="flex" alignItems="center">
                            <CheckboxContent
                                uniqueId={uniqueId}
                                disabled={disabled}
                                error={error}
                                required={required}
                                size={size}
                                children={children}
                                tokens={tokens}
                                maxLength={labelMaxLength}
                            />

                            {slot && (
                                <Block
                                    as="span"
                                    marginLeft={tokens.slot.marginLeft}
                                >
                                    {slot}
                                </Block>
                            )}
                        </Block>

                        {subtext && (
                            <CheckboxSubtext
                                id={subtextId}
                                size={size}
                                disabled={disabled}
                                error={error}
                                tokens={tokens}
                                maxLength={subtextMaxLength}
                            >
                                {subtext}
                            </CheckboxSubtext>
                        )}
                    </Block>
                )}
            </Block>
        )
    }
)

const CheckboxIndicator: React.FC<{
    checked: boolean | 'indeterminate'
    size: CheckboxSize
    tokens: CheckboxTokensType
    disabled: boolean
}> = ({ checked, size, tokens, disabled }) => (
    <StyledCheckboxIndicator forceMount={true} size={size} aria-hidden="true">
        {checked ? (
            <Block
                as="span"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
            >
                {checked === 'indeterminate' ? (
                    <Minus
                        size={tokens.indicator.icon.width[size]}
                        color={getCheckboxIconColor(tokens, checked, disabled)}
                        strokeWidth={tokens.indicator.icon.strokeWidth[size]}
                        aria-hidden="true"
                        focusable={false}
                    />
                ) : (
                    <Check
                        size={tokens.indicator.icon.width[size]}
                        color={getCheckboxIconColor(tokens, checked, disabled)}
                        strokeWidth={tokens.indicator.icon.strokeWidth[size]}
                        aria-hidden="true"
                        focusable={false}
                    />
                )}
            </Block>
        ) : null}
    </StyledCheckboxIndicator>
)

const CheckboxContent: React.FC<{
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: CheckboxSize
    children?: React.ReactNode
    tokens: CheckboxTokensType
    maxLength?: number
}> = ({
    uniqueId,
    disabled,
    error,
    required,
    size,
    children,
    tokens,
    maxLength,
}) => {
    if (!children) return null

    const labelStyles = getCheckboxLabelStyles(disabled)
    const textProps = getCheckboxTextProps(tokens, size, disabled, error)
    const isStringChild =
        typeof children === 'string' || typeof children === 'number'
    const truncation = isStringChild
        ? getTruncatedText(String(children), maxLength)
        : null

    const content = (
        <label htmlFor={uniqueId} style={labelStyles}>
            <PrimitiveText
                data-text={children}
                as="span"
                fontSize={textProps.fontSize}
                fontWeight={textProps.fontWeight}
                color={textProps.color}
            >
                {truncation?.isTruncated ? truncation.truncatedValue : children}
                {required && (
                    <PrimitiveText
                        as="span"
                        color={tokens.required.color}
                        style={{ marginLeft: FOUNDATION_THEME.unit[2] }}
                    >
                        *
                    </PrimitiveText>
                )}
            </PrimitiveText>
        </label>
    )

    return truncation?.isTruncated ? (
        <Tooltip content={truncation.fullValue}>{content}</Tooltip>
    ) : (
        content
    )
}

const CheckboxSubtext: React.FC<{
    id?: string
    size: CheckboxSize
    disabled: boolean
    error: boolean
    tokens: CheckboxTokensType
    children: React.ReactNode
    maxLength?: number
}> = ({ id, size, disabled, error, tokens, children, maxLength }) => {
    const subtextProps = getCheckboxSubtextProps(tokens, size, disabled, error)
    const isStringLike =
        typeof children === 'string' || typeof children === 'number'
    const truncation = isStringLike
        ? getTruncatedText(String(children), maxLength)
        : null

    const content = (
        <Block id={id}>
            <PrimitiveText
                data-description-text={children}
                as="span"
                color={subtextProps.color}
                fontSize={subtextProps.fontSize}
            >
                {truncation?.isTruncated ? truncation.truncatedValue : children}
            </PrimitiveText>
        </Block>
    )

    return truncation?.isTruncated ? (
        <Tooltip content={truncation.fullValue}>{content}</Tooltip>
    ) : (
        content
    )
}

Checkbox.displayName = 'Checkbox'
