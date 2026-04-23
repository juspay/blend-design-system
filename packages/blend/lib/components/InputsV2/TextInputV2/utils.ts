import {
    SingleSelectV2Props,
    SingleSelectV2Variant,
} from '../../SingleSelectV2/singleSelectV2.types'
import { InputStateV2 } from '../inputV2.types'
import { EmbeddedSingleSelectOptions } from './TextInputV2.types'

export const FOCUS_RING_STYLES = {
    boxShadow: '0 0 0 3px #EFF6FF',
    backgroundColor: 'rgba(239, 246, 255, 0.15)',
} as const

export const TRANSITION =
    'border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out'

export const getInputState = (
    error?: { show: boolean } | null,
    disabled?: boolean
): InputStateV2 => {
    if (error?.show) return InputStateV2.ERROR
    if (disabled) return InputStateV2.DISABLED
    return InputStateV2.DEFAULT
}

export const getVerticalInputPadding = ({
    isSmallScreenWithLargeSize,
    inputFocusedOrWithValue,
    paddingTop,
    paddingBottom,
}: {
    isSmallScreenWithLargeSize: boolean
    inputFocusedOrWithValue: boolean
    paddingTop: number
    paddingBottom: number
}) => {
    const top =
        isSmallScreenWithLargeSize && inputFocusedOrWithValue
            ? paddingTop * 1.5
            : paddingTop

    const bottom =
        isSmallScreenWithLargeSize && inputFocusedOrWithValue
            ? paddingBottom / 2
            : paddingBottom

    return { top, bottom }
}

/** Spreads full `SingleSelectV2` config, then applies TextInputV2 embed defaults and field-level disabled/label. */
export function toEmbeddedSingleSelectV2Props(
    config: SingleSelectV2Props,
    options: EmbeddedSingleSelectOptions
): SingleSelectV2Props {
    const {
        fieldLabel,
        fieldDisabled,
        singleSelectV2Size,
        menuAlignment,
        menuSideOffset,
        menuAlignOffset,
        defaultSingleSelectGroupPosition,
    } = options

    return {
        ...config,
        variant: SingleSelectV2Variant.NO_CONTAINER,
        inline: true,
        size: singleSelectV2Size,
        disabled: fieldDisabled,
        'aria-label': config['aria-label'] ?? fieldLabel ?? 'Select option',
        singleSelectGroupPosition:
            config.singleSelectGroupPosition ??
            defaultSingleSelectGroupPosition,
        menuPosition: {
            alignment: menuAlignment,
            sideOffset: menuSideOffset,
            alignOffset: menuAlignOffset,
            ...config.menuPosition,
        },
        triggerDimensions: config.triggerDimensions ?? {
            width: 'max-content',
        },
    }
}
