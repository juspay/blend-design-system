import { InputStateV2 } from '../inputV2.types'

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
