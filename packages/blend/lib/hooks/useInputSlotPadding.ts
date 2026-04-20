import { RefObject, useEffect, useState } from 'react'

export type UseInputSlotPaddingParams = {
    leftSlotRef: RefObject<HTMLDivElement | null>
    rightSlotRef: RefObject<HTMLDivElement | null>
    hasLeftSlot: boolean
    hasRightSlot: boolean
    paddingLeft: number
    paddingRight: number
    gap: number
}

export function useInputSlotPadding({
    leftSlotRef,
    rightSlotRef,
    hasLeftSlot,
    hasRightSlot,
    paddingLeft,
    paddingRight,
    gap,
}: UseInputSlotPaddingParams) {
    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)

    useEffect(() => {
        if (leftSlotRef.current) {
            setLeftSlotWidth(leftSlotRef.current.offsetWidth)
        } else {
            setLeftSlotWidth(0)
        }
        if (rightSlotRef.current) {
            setRightSlotWidth(rightSlotRef.current.offsetWidth)
        } else {
            setRightSlotWidth(0)
        }
    }, [hasLeftSlot, hasRightSlot, leftSlotRef, rightSlotRef])

    const calculatedLeftInputPadding = hasLeftSlot
        ? paddingLeft + leftSlotWidth + gap
        : paddingLeft

    const calculatedRightInputPadding = hasRightSlot
        ? paddingRight + rightSlotWidth + gap
        : paddingRight

    return {
        calculatedLeftInputPadding,
        calculatedRightInputPadding,
    }
}
