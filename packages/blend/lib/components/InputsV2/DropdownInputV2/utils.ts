import { toPixels } from '../../../global-utils/GlobalUtils'
import type { DropdownInputV2TokensType } from './DropdownInputV2.tokens'
import {
    BorderInteractionVariants,
    DropdownInputLayoutMetrics,
    DropdownPosition,
    SingleSelectMenuPositionConfig,
} from './DropdownInputV2.types'
import type { DropdownInputV2Props } from './DropdownInputV2.types'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { getVerticalInputPadding } from '../TextInputV2/utils'
import {
    SingleSelectV2Alignment,
    SingleSelectV2Size,
    type SingleSelectV2GroupType,
} from '../../SingleSelectV2'

export const defaultDropDown: {
    onSelect: (value: string) => void
    size: SingleSelectV2Size
    items: SingleSelectV2GroupType[]
    value: string
    placeholder: string
    label: string
} = {
    onSelect: () => {},
    size: SingleSelectV2Size.SM,
    items: [],
    value: '',
    placeholder: 'Select',
    label: '',
}

export const defaultInput = {
    value: '',
    onChange: (value: string) => {
        void value
    },
    placeholder: 'Enter value',
    size: InputSizeV2.MD,
    label: 'Value',
}

export function mergeDropDown(
    prop?: DropdownInputV2Props['dropDown']
): typeof defaultDropDown {
    return { ...defaultDropDown, ...prop }
}

export function mergeInput(
    prop?: DropdownInputV2Props['input']
): typeof defaultInput {
    return { ...defaultInput, ...prop }
}

export function resolveInputSize(
    size: InputSizeV2 | undefined,
    inputSize: InputSizeV2 | undefined
): InputSizeV2 {
    return size ?? inputSize ?? InputSizeV2.MD
}

export function resolveSelectSize(
    dropDownSize: SingleSelectV2Size | undefined,
    size: InputSizeV2 | undefined,
    inputSize: InputSizeV2 | undefined
): SingleSelectV2Size {
    return (dropDownSize ??
        size ??
        inputSize ??
        SingleSelectV2Size.MD) as SingleSelectV2Size
}

export function isItemDisabledInGroups(
    groups: SingleSelectV2GroupType[],
    itemValue: string
): boolean {
    for (const group of groups) {
        for (const item of group.items) {
            if (item.value === itemValue) {
                return item.disabled === true
            }
            if (item.subMenu) {
                for (const subItem of item.subMenu) {
                    if (subItem.value === itemValue) {
                        return subItem.disabled === true
                    }
                }
            }
        }
    }
    return false
}

export function isSelectedOptionDisabled(
    groups: SingleSelectV2GroupType[],
    selectedValue: string | undefined
): boolean {
    return selectedValue ? isItemDisabledInGroups(groups, selectedValue) : false
}

export function getDropdownInputLayoutMetrics({
    tokens,
    inputSize,
    isSmallScreenWithLargeSize,
    inputFocusedOrWithValue,
    dropdownPosition,
    dropdownWidth,
}: {
    tokens: DropdownInputV2TokensType
    inputSize: InputSizeV2
    isSmallScreenWithLargeSize: boolean
    inputFocusedOrWithValue: boolean
    dropdownPosition: DropdownPosition
    dropdownWidth: number
}): DropdownInputLayoutMetrics {
    const paddingX = toPixels(tokens.inputContainer.paddingLeft[inputSize])
    const paddingYBase = toPixels(tokens.inputContainer.paddingTop[inputSize])
    const paddingY = paddingYBase + (isSmallScreenWithLargeSize ? 0.5 : 1)
    const gap = toPixels(tokens.inputContainer.gap)

    const { top: paddingTop, bottom: paddingBottom } = getVerticalInputPadding({
        isSmallScreenWithLargeSize,
        inputFocusedOrWithValue,
        paddingTop: paddingY,
        paddingBottom: paddingY,
    })

    /** Match TextInputV2: float label uses base vertical padding, not scaled `paddingTop`. */
    const floatingLabelTopPadding = paddingY

    const paddingLeft =
        dropdownPosition === DropdownPosition.LEFT
            ? paddingX + dropdownWidth + gap
            : paddingX
    const paddingRight =
        dropdownPosition === DropdownPosition.RIGHT
            ? paddingX + (dropdownWidth ? dropdownWidth + 2 * gap : 0)
            : paddingX

    return {
        paddingX,
        paddingY,
        gap,
        paddingTop,
        paddingBottom,
        floatingLabelTopPadding,
        paddingLeft,
        paddingRight,
    }
}

export function getSingleSelectMenuPosition(
    dropdownPosition: DropdownPosition,
    paddingX: number
): SingleSelectMenuPositionConfig {
    return {
        alignment:
            dropdownPosition === DropdownPosition.RIGHT
                ? SingleSelectV2Alignment.END
                : SingleSelectV2Alignment.START,
        alignOffset: -(paddingX + 2),
        sideOffset: paddingX,
    }
}

export function getDropdownAriaDescribedBy(
    hintText: string | undefined,
    error: boolean | undefined,
    errorMessage: string | undefined,
    hintId: string,
    errorId: string
): string | undefined {
    const ids = [
        hintText && !error ? hintId : null,
        error && errorMessage ? errorId : null,
    ].filter(Boolean) as string[]
    return ids.length > 0 ? ids.join(' ') : undefined
}

export function getBorderInteractionVariants(
    hasError: boolean,
    inputState: InputStateV2
): BorderInteractionVariants {
    if (hasError) {
        return {
            borderVariant: InputStateV2.ERROR,
            hoverVariant: InputStateV2.ERROR,
            focusVariant: InputStateV2.ERROR,
        }
    }
    return {
        borderVariant: inputState,
        hoverVariant: InputStateV2.HOVER,
        focusVariant: InputStateV2.FOCUS,
    }
}

export function getSingleSelectAriaLabel(
    dropdownName: string | undefined,
    dropDownLabel: string | undefined,
    fieldLabel: string | undefined
): string {
    return dropdownName || dropDownLabel || fieldLabel || 'Select option'
}
