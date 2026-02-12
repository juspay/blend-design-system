import { forwardRef, useId } from 'react'
import Block from '../Primitives/Block/Block'
import {
    SwitchV2ButtonProps,
    SwitchV2ContentProps,
    SwitchV2Props,
    SwitchV2Size,
} from './switchV2.types'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SwitchV2TokensType } from './switchV2.tokens'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { getSubtextId, mergeAriaDescribedBy } from '../Switch/utils'
import SelectorsLabel from '../SelectorsContent/SelectorsLabel'
import SelectorsSubLabel from '../SelectorsContent/SelectorsSubLabel'
import {
    SelectorsLabelTokensType,
    SelectorsSubLabelTokensType,
} from '../SelectorsContent/SelectorsContent.types'
import { FOUNDATION_THEME } from '../../tokens'
import { addAccessibleAriaAttributes } from '../../utils/accessibility/icon-helpers'

const SwitchV2Content = ({
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
}: SwitchV2ContentProps) => {
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
                    elementType="switch-label"
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
                elementType="switch-description"
            />
        </Block>
    )
}

const SwitchV2Button = ({
    id,
    checked,
    disabled,
    size,
    tokens,
    onToggle,
    buttonProps,
    ref,
}: SwitchV2ButtonProps) => {
    return (
        <PrimitiveButton
            role="switch"
            id={id}
            ref={ref}
            disabled={disabled}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            onClick={onToggle}
            position="relative"
            borderRadius={FOUNDATION_THEME.border.radius[16]}
            border="none"
            outline="none"
            display="inline-flex"
            alignItems="center"
            justifyContent="flex-start"
            width={tokens.switch.width[size]}
            minWidth={tokens.switch.width[size]}
            height={tokens.switch.height[size]}
            backgroundColor={
                disabled
                    ? tokens.switch.backgroundColor[
                          checked ? 'checked' : 'unchecked'
                      ].disabled
                    : tokens.switch.backgroundColor[
                          checked ? 'checked' : 'unchecked'
                      ].default
            }
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            aria-labelledby={`${id}-label`}
            _focusVisible={{
                outline: tokens.switch.thumb.outline,
                outlineOffset: FOUNDATION_THEME.unit[2],
                boxShadow: `0 0 0 2px ${FOUNDATION_THEME.colors.primary[100]}`,
            }}
            willChange="background-color, transform"
            transition="background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)"
            transformOrigin="center"
            backfaceVisibility="hidden"
            {...(buttonProps as Record<string, unknown>)}
        >
            <Block
                as="span"
                position="absolute"
                top={'1px'}
                left={'1px'}
                borderRadius={FOUNDATION_THEME.border.radius.full}
                backgroundColor={tokens.switch.thumb.backgroundColor}
                border={tokens.switch.thumb.border}
                width={tokens.switch.thumb.width[size]}
                height={tokens.switch.thumb.height[size]}
                transform={`translateX( ${checked ? (size === SwitchV2Size.SM ? '12px' : '16px') : '0px'})`}
                willChange="transform, left"
                transition="transform 250ms cubic-bezier(0.4, 0, 0.2, 1), left 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)"
                transformOrigin="center"
            />
        </PrimitiveButton>
    )
}

const SwitchV2 = forwardRef<HTMLButtonElement, SwitchV2Props>(
    (
        {
            id,
            checked,
            onChange,
            required = false,
            disabled = false,
            error = false,
            size = SwitchV2Size.MD,
            label,
            subLabel,
            slot,
            maxLength,
            ...rest
        },
        ref
    ) => {
        const generatedId = useId()
        const uniqueId = id || generatedId
        const tokens = useResponsiveTokens<SwitchV2TokensType>('SWITCHV2')

        const labelMaxLength = maxLength?.label
        const subLabelMaxLength = maxLength?.subLabel

        const subLabelId = getSubtextId(uniqueId, !!subLabel)
        const { 'aria-describedby': customAriaDescribedBy, ...restProps } =
            rest as { 'aria-describedby'?: string; [key: string]: unknown }

        const ariaAttributes = {
            'aria-required': required || undefined,
            'aria-invalid': error || undefined,
            'aria-disabled': disabled || undefined,
            'aria-describedby': mergeAriaDescribedBy(
                subLabelId,
                customAriaDescribedBy
            ),
        }

        const filteredRest = filterBlockedProps(restProps)
        const rootButtonProps = {
            ...filteredRest,
            ...ariaAttributes,
        }

        return (
            <Block
                data-switch={label ?? 'switch'}
                data-status={disabled ? 'disabled' : 'enabled'}
                display="flex"
                alignItems="flex-start"
                gap={tokens.gap}
                cursor={disabled ? 'not-allowed' : 'auto'}
            >
                <SwitchV2Button
                    id={uniqueId}
                    ref={ref}
                    checked={checked}
                    disabled={disabled}
                    size={size}
                    tokens={tokens}
                    onToggle={() => onChange?.(!checked)}
                    buttonProps={rootButtonProps}
                />
                <SwitchV2Content
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
                    subLabelMaxLength={subLabelMaxLength}
                    subLabelId={subLabelId}
                />
            </Block>
        )
    }
)

SwitchV2.displayName = 'SwitchV2'

export default SwitchV2
