import { Triangle } from 'lucide-react'
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
        <Triangle
            style={{
                transform: flip ? 'rotate(180deg)' : undefined,
                opacity: disabled ? 1 : dimmed ? 0.3 : 1,
            }}
            direction="up"
            color={color}
            fill={color}
            size={size}
        />
    )
}
