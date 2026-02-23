import { forwardRef, useId } from 'react'
import { Check, Minus } from 'lucide-react'
import {
    CheckboxV2ContentProps,
    CheckboxV2Props,
    CheckboxV2RootProps,
    CheckboxV2Size,
} from './checkboxV2.types'
import Block from '../Primitives/Block/Block'
import { StyledCheckboxRoot, StyledCheckboxIndicator } from './StyledCheckboxV2'
import { getErrorShakeStyle } from '../common/error.animations'
import { useErrorShake } from '../common/useErrorShake'
import {
    getSubtextId,
    mergeAriaDescribedBy,
    getCheckboxIconColor,
    handleCheckboxKeyDown,
} from './utils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CheckboxV2TokensType } from './checkboxV2.tokens'
import SelectorsLabel from '../SelectorsContent/SelectorsLabel'
import {
    SelectorsLabelTokensType,
    SelectorsSubLabelTokensType,
} from '../SelectorsContent/SelectorsContent.types'
import SelectorsSubLabel from '../SelectorsContent/SelectorsSubLabel'
import { addAccessibleAriaAttributes } from '../../utils/accessibility/icon-helpers'

const CheckboxV2 = forwardRef<HTMLButtonElement, CheckboxV2Props>(
    (
        {
            label,
            id,
            name,
            checked,
            onCheckedChange,
            disabled = false,
            required = false,
            error = false,
            size = CheckboxV2Size.MD,
            subLabel,
            slot,
            maxLength,
            ...rest
        },
        ref
    ) => {
        const generatedId = useId()
        const uniqueId = id || generatedId
        const shouldShake = useErrorShake(error)
        const subLabelId = getSubtextId(uniqueId, !!subLabel)
        const labelMaxLength = maxLength?.label
        const { 'aria-describedby': customAriaDescribedBy, ...restProps } =
            rest as { 'aria-describedby'?: string; [key: string]: unknown }

        const ariaAttributes = {
            'aria-required': required ? true : undefined,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': mergeAriaDescribedBy(
                subLabelId,
                customAriaDescribedBy
            ),
            'aria-disabled': disabled ? true : undefined,
        }

        const tokens = useResponsiveTokens<CheckboxV2TokensType>('CHECKBOXV2')

        return (
            <Block
                display="flex"
                alignItems="flex-start"
                gap={tokens.gap}
                data-checkbox={label ?? 'checkbox'}
            >
                <CheckboxV2Root
                    uniqueId={uniqueId}
                    tokens={tokens}
                    name={name || 'checkbox'}
                    ref={ref as React.RefObject<HTMLButtonElement>}
                    checked={checked || false}
                    onCheckedChange={
                        onCheckedChange as (
                            checked: boolean | 'indeterminate'
                        ) => void
                    }
                    disabled={disabled}
                    required={required}
                    size={size}
                    error={error}
                    shouldShake={shouldShake}
                    ariaAttributes={
                        ariaAttributes as {
                            'aria-required': boolean
                            'aria-invalid': boolean
                            'aria-describedby': string
                        }
                    }
                    restProps={restProps}
                />
                <CheckboxV2Content
                    uniqueId={uniqueId}
                    disabled={disabled}
                    error={error}
                    required={required}
                    size={size}
                    label={label}
                    subLabel={subLabel}
                    slot={slot}
                    tokens={tokens}
                    labelMaxLength={labelMaxLength}
                    subLabelMaxLength={maxLength?.subLabel}
                    subLabelId={subLabelId}
                />
            </Block>
        )
    }
)

CheckboxV2.displayName = 'CheckboxV2'

export default CheckboxV2

const CheckboxV2Root = ({
    tokens,
    uniqueId,
    name,
    ref,
    checked,
    onCheckedChange,
    disabled,
    required,
    size,
    error,
    shouldShake,
    ariaAttributes,
    restProps,
}: CheckboxV2RootProps) => {
    return (
        <StyledCheckboxRoot
            role="checkbox"
            aria-labelledby={`${uniqueId}-label`}
            id={uniqueId}
            name={name}
            ref={ref}
            checked={checked || false}
            onCheckedChange={onCheckedChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
                handleCheckboxKeyDown(
                    e,
                    checked,
                    Boolean(disabled),
                    onCheckedChange as
                        | undefined
                        | ((checked: boolean | 'indeterminate') => void)
                )
            }
            disabled={disabled}
            required={required}
            size={size}
            $isDisabled={disabled}
            $checked={checked || false}
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
                                    tokens.checkbox.icon.strokeWidth[size]
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
                                    tokens.checkbox.icon.strokeWidth[size]
                                }
                                aria-hidden="true"
                                focusable={false}
                            />
                        )}
                    </Block>
                ) : null}
            </StyledCheckboxIndicator>
        </StyledCheckboxRoot>
    )
}

const CheckboxV2Content = ({
    uniqueId,
    disabled,
    error,
    required,
    size,
    label,
    subLabel,
    slot,
    tokens,
    labelMaxLength,
    subLabelMaxLength,
    subLabelId,
}: CheckboxV2ContentProps) => {
    const labelId = `${uniqueId}-label`
    return (
        <Block display="flex" flexDirection="column" gap={tokens.content.gap}>
            <Block
                display="flex"
                alignItems="center"
                gap={tokens.content.label.gap}
            >
                <SelectorsLabel
                    id={labelId}
                    uniqueId={uniqueId}
                    disabled={disabled}
                    error={error}
                    required={required}
                    size={size}
                    label={label ?? ''}
                    tokens={tokens as unknown as SelectorsLabelTokensType}
                    maxLength={labelMaxLength}
                    elementType="checkbox-label"
                />
                {slot && (
                    <Block
                        data-element="slot-icon"
                        contentCentered
                        maxHeight={
                            slot?.maxHeight ||
                            tokens.content.label.slot.maxHeight[size]
                        }
                    >
                        {addAccessibleAriaAttributes(slot.slot)}
                    </Block>
                )}
            </Block>
            <SelectorsSubLabel
                id={subLabelId}
                subLabel={subLabel ?? ''}
                size={size}
                disabled={disabled}
                error={error}
                tokens={tokens as unknown as SelectorsSubLabelTokensType}
                maxLength={subLabelMaxLength}
                elementType="checkbox-description"
            />
        </Block>
    )
}
