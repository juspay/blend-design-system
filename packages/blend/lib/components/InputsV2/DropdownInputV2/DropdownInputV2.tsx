import { forwardRef, useId } from 'react'
import Block from '../../Primitives/Block/Block'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { useMemo } from 'react'
import { DropdownInputV2TokensType } from './DropdownInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { DropdownInputV2Props } from './DropdownInputV2.types'

const DropdownInputV2 = forwardRef<HTMLInputElement, DropdownInputV2Props>(
    ({
        label,
        sublabel,
        helpIconHintText,
        required,
        name,
        disabled,
        isFocused,
        isHovered,
        size,
        error,
        errorMessage,
        hintText,
        id: providedId,
        ...rest
    }) => {
        const dropdownInputTokens =
            useResponsiveTokens<DropdownInputV2TokensType>('DROPDOWN_INPUT_V2')
        const labelState = useMemo((): InputStateV2 => {
            if (disabled) return InputStateV2.DISABLED
            if (error) return InputStateV2.ERROR
            if (isFocused) return InputStateV2.FOCUS
            if (isHovered) return InputStateV2.HOVER
            return InputStateV2.DEFAULT
        }, [disabled, error, isFocused, isHovered])
        const generatedId = useId()
        const inputId = providedId || generatedId
        const errorId = `${inputId}-error`
        const hintId = `${inputId}-hint`
        return (
            <Block>
                <InputLabelsV2
                    label={label}
                    sublabel={sublabel}
                    helpIconText={helpIconHintText}
                    required={required}
                    inputId={inputId}
                    name={name}
                    size={size}
                    state={labelState}
                    tokens={dropdownInputTokens.topContainer}
                />
                <InputFooterV2
                    error={error}
                    errorMessage={errorMessage}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    tokens={dropdownInputTokens.bottomContainer}
                    size={size}
                />
            </Block>
        )
    }
)

DropdownInputV2.displayName = 'DropdownInputV2'
export default DropdownInputV2
