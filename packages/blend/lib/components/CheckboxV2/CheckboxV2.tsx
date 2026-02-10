import { forwardRef, useId } from 'react'
import { Check, Minus } from 'lucide-react'
import { CheckboxV2Props, CheckboxV2Size } from './checkboxV2.types'
import Block from '../Primitives/Block/Block'
import { StyledCheckboxRoot, StyledCheckboxIndicator } from './StyledCheckboxV2'
import { getErrorShakeStyle } from '../common/error.animations'
import { useErrorShake } from '../common/useErrorShake'
import {
    getSubtextId,
    mergeAriaDescribedBy,
    getCheckboxIconColor,
} from './utils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CheckboxV2TokensType } from './checkboxV2.tokens'

const CheckboxV2 = forwardRef<HTMLButtonElement, CheckboxV2Props>(
    (
        {
            label,
            id,
            name,
            checked,
            defaultChecked = false,
            onCheckedChange,
            disabled = false,
            required = false,
            error = false,
            size = CheckboxV2Size.MEDIUM,
            children,
            subtext,
            slot,
            maxLength,
            ...rest
        },
        ref
    ) => {
        const generatedId = useId()
        const uniqueId = id || generatedId
        const shouldShake = useErrorShake(error)
        const subtextId = getSubtextId(uniqueId, !!subtext)
        const { 'aria-describedby': customAriaDescribedBy, ...restProps } =
            rest as { 'aria-describedby'?: string; [key: string]: unknown }

        const ariaAttributes = {
            'aria-required': required ? true : undefined,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': mergeAriaDescribedBy(
                subtextId,
                customAriaDescribedBy
            ),
        }

        const tokens = useResponsiveTokens<CheckboxV2TokensType>('CHECKBOXV2')

        return (
            <Block display="flex" alignItems="flex-start" gap={tokens.gap}>
                <StyledCheckboxRoot
                    id={uniqueId}
                    name={name}
                    ref={ref}
                    checked={checked ?? defaultChecked ?? false}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                    required={required}
                    size={size}
                    $isDisabled={disabled}
                    $checked={checked ?? defaultChecked ?? false}
                    $error={error}
                    style={getErrorShakeStyle(shouldShake)}
                    {...ariaAttributes}
                    {...restProps}
                    data-element="checkbox"
                    data-state={
                        checked === 'indeterminate'
                            ? 'indeterminate'
                            : checked
                              ? 'checked'
                              : 'unchecked'
                    }
                >
                    <StyledCheckboxIndicator
                        forceMount={true}
                        size={size}
                        aria-hidden="true"
                        data-state={
                            checked === 'indeterminate'
                                ? 'indeterminate'
                                : checked
                                  ? 'checked'
                                  : 'unchecked'
                        }
                    >
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
                                        size={tokens.checkbox.icon.width[size]}
                                        color={getCheckboxIconColor(
                                            tokens,
                                            checked,
                                            disabled
                                        )}
                                        strokeWidth={
                                            tokens.checkbox.icon.strokeWidth[
                                                size
                                            ]
                                        }
                                        aria-hidden="true"
                                        focusable={false}
                                    />
                                ) : (
                                    <Check
                                        size={tokens.checkbox.icon.width[size]}
                                        color={getCheckboxIconColor(
                                            tokens,
                                            checked,
                                            disabled
                                        )}
                                        strokeWidth={
                                            tokens.checkbox.icon.strokeWidth[
                                                size
                                            ]
                                        }
                                        aria-hidden="true"
                                        focusable={false}
                                    />
                                )}
                            </Block>
                        ) : null}
                    </StyledCheckboxIndicator>
                </StyledCheckboxRoot>

                {children}
            </Block>
        )
    }
)

export default CheckboxV2
