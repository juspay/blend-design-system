import { RadioV2ContentProps, RadioV2Props } from './radioV2.types'
import { SelectorV2Size } from '../selectorV2.types'
import { StyledRadioV2Root } from './StyledRadioV2'
import { RadioV2TokensType } from './radioV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import React, { forwardRef } from 'react'
import { getRadioV2ErrorShakeStyle } from './radioV2.animation'
import { useErrorShake } from '../../common/useErrorShake'
import {
    SelectorsLabelTokensType,
    SelectorsSubLabelTokensType,
} from '../../SelectorsContent/SelectorsContent.types'
import SelectorsLabel from '../../SelectorsContent/SelectorsLabel'
import Block from '../../Primitives/Block/Block'
import SelectorsSubLabel from '../../SelectorsContent/SelectorsSubLabel'
import { addAccessibleAriaAttributes } from '../../../utils/accessibility/icon-helpers'
import { filterBlockedProps } from '../../../utils/prop-helpers'

const RadioV2 = forwardRef<HTMLInputElement, RadioV2Props>(
    (
        {
            id,
            label,
            checked,
            defaultChecked = false,
            onCheckedChange,
            disabled = false,
            required = false,
            error = false,
            size = SelectorV2Size.MD,
            subLabel,
            slot,
            name,
            maxLength,
            ...rest
        },
        ref
    ) => {
        const radioTokens = useResponsiveTokens<RadioV2TokensType>('RADIOV2')
        const generatedId = React.useId()
        const uniqueId = id || generatedId
        const shouldShake = useErrorShake(error)
        const subtextId = subLabel ? `${uniqueId}-subLabel` : undefined
        const labelId = label ? `${uniqueId}-label` : undefined
        const customAriaDescribedBy = (rest as { 'aria-describedby'?: string })[
            'aria-describedby'
        ]
        const ariaDescribedBy =
            subtextId && customAriaDescribedBy
                ? `${customAriaDescribedBy} ${subtextId}`
                : subtextId || customAriaDescribedBy
        const filteredRest = filterBlockedProps(rest)

        const controlProps: Record<string, unknown> =
            checked !== undefined ? { checked } : { defaultChecked }

        return (
            <Block
                display="flex"
                alignItems="flex-start"
                gap={radioTokens.gap}
                data-radio={label ?? 'radio'}
            >
                <StyledRadioV2Root
                    ref={ref}
                    type="radio"
                    id={uniqueId}
                    name={name}
                    {...controlProps}
                    {...filteredRest}
                    disabled={disabled}
                    required={required}
                    onChange={onCheckedChange}
                    size={size}
                    $isDisabled={disabled}
                    $isChecked={checked || false}
                    $error={error}
                    $tokens={radioTokens}
                    style={getRadioV2ErrorShakeStyle(shouldShake)}
                    aria-required={required ? true : undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={ariaDescribedBy}
                    aria-checked={checked}
                    aria-disabled={disabled ? true : undefined}
                    aria-labelledby={labelId}
                />
                <RadioV2Content
                    uniqueId={uniqueId}
                    disabled={disabled}
                    error={error}
                    required={required}
                    size={size}
                    label={label}
                    subLabel={subLabel}
                    tokens={radioTokens}
                    labelMaxLength={maxLength?.label}
                    subLabelMaxLength={maxLength?.subLabel}
                    subLabelId={subtextId}
                    slot={slot}
                />
            </Block>
        )
    }
)

RadioV2.displayName = 'RadioV2'

export default RadioV2

export const RadioV2Content = ({
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
}: RadioV2ContentProps) => {
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
                    elementType="Radio-label"
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
                elementType="Radio-description"
            />
        </Block>
    )
}
