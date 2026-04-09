import { type ReactNode, useEffect, useRef, useState } from 'react'
import { UnitInputV2Position } from './UnitInputV2.types'

type Args = {
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    unit: string
    unitPosition: UnitInputV2Position
    paddingY: number
}

export function useUnitInputV2AdornmentLayout({
    leftSlot,
    rightSlot,
    unit,
    unitPosition,
    paddingY,
}: Args) {
    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)
    const [unitWidth, setUnitWidth] = useState(0)

    const leftSlotRef = useRef<HTMLDivElement>(null)
    const rightSlotRef = useRef<HTMLDivElement>(null)
    const unitRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setLeftSlotWidth(leftSlotRef.current?.offsetWidth ?? 0)
        setRightSlotWidth(rightSlotRef.current?.offsetWidth ?? 0)
        setUnitWidth(unitRef.current?.offsetWidth ?? 0)
    }, [leftSlot, rightSlot, unit])

    const paddingInlineStart =
        (!leftSlot && unitPosition !== UnitInputV2Position.LEFT
            ? paddingY
            : (unitPosition === UnitInputV2Position.LEFT ? unitWidth + 8 : 8) +
              (leftSlot ? leftSlotWidth + 8 : 0)) + 4

    const paddingInlineEnd =
        !rightSlot && unitPosition !== UnitInputV2Position.RIGHT
            ? paddingY
            : (unitPosition === UnitInputV2Position.RIGHT ? unitWidth + 8 : 0) +
              (rightSlot ? rightSlotWidth + 8 : 0)

    return {
        leftSlotRef,
        rightSlotRef,
        unitRef,
        unitWidth,
        paddingInlineStart,
        paddingInlineEnd,
    }
}
