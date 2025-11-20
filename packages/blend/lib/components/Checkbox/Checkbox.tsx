import { forwardRef, useId } from 'react'
import { Check, Minus } from 'lucide-react'
import type { CheckboxProps } from './types'
import { CheckboxSize } from './types'
import {
    getCheckboxDataState,
    getCheckboxIconColor,
    getCheckboxTextProps,
    getCheckboxSubtextProps,
    getCheckboxLabelStyles,
} from './checkboxUtils'
import { StyledCheckboxRoot, StyledCheckboxIndicator } from './StyledCheckbox'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import type { CheckboxTokensType } from './checkbox.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../tokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'

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
            ...rest
        },
        ref
    ) => {
        const generatedId = useId()
        const uniqueId = id || generatedId
        const tokens = useResponsiveTokens<CheckboxTokensType>('CHECKBOX')
        const shouldShake = useErrorShake(error)

        return (
            <Block display="flex" alignItems="flex-start" gap={tokens.gap}>
                <StyledCheckboxRoot
                    id={id}
                    name={name}
                    ref={ref}
                    data-state={getCheckboxDataState(checked || false)}
                    data-error={error}
                    defaultChecked={defaultChecked}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                    required={required}
                    size={size}
                    $isDisabled={disabled}
                    $checked={checked || false}
                    $error={error}
                    style={getErrorShakeStyle(shouldShake)}
                    {...rest}
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
                                size={size}
                                disabled={disabled}
                                error={error}
                                tokens={tokens}
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
    <StyledCheckboxIndicator forceMount={true} size={size}>
        {checked && (
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
                    />
                ) : (
                    <Check
                        size={tokens.indicator.icon.width[size]}
                        color={getCheckboxIconColor(tokens, checked, disabled)}
                        strokeWidth={tokens.indicator.icon.strokeWidth[size]}
                    />
                )}
            </Block>
        )}
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
}> = ({ uniqueId, disabled, error, required, size, children, tokens }) => {
    if (!children) return null

    const labelStyles = getCheckboxLabelStyles(disabled)
    const textProps = getCheckboxTextProps(tokens, size, disabled, error)

    return (
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
                        color={tokens.required.color}
                        style={{ marginLeft: FOUNDATION_THEME.unit[2] }}
                    >
                        *
                    </PrimitiveText>
                )}
            </PrimitiveText>
        </label>
    )
}

const CheckboxSubtext: React.FC<{
    size: CheckboxSize
    disabled: boolean
    error: boolean
    tokens: CheckboxTokensType
    children: React.ReactNode
}> = ({ size, disabled, error, tokens, children }) => {
    const subtextProps = getCheckboxSubtextProps(tokens, size, disabled, error)

    return (
        <Block>
            <PrimitiveText
                data-description-text={children}
                as="span"
                color={subtextProps.color}
                fontSize={subtextProps.fontSize}
            >
                {children}
            </PrimitiveText>
        </Block>
    )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
