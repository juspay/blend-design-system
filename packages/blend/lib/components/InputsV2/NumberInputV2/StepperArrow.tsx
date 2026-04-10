import { TriangleIcon } from '@phosphor-icons/react'
import type { StepperArrowProps } from './numberInputV2.types'

export const StepperArrow = ({
    disabled,
    dimmed,
    flip,
    size,
    colorDefault,
    colorDisabled,
}: StepperArrowProps) => {
    const color = disabled ? colorDisabled : colorDefault
    return (
        <TriangleIcon
            style={{
                transform: flip ? 'rotate(180deg)' : undefined,
                opacity: disabled ? 1 : dimmed ? 0.3 : 1,
            }}
            color={color}
            fill={color}
            size={size}
            weight="fill"
        />
    )
}
