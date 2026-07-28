import type { CSSProperties } from 'react'
import type {
    TooltipV2Align,
    TooltipV2Side,
    TooltipV2Size,
} from '../../TooltipV2/tooltipV2.types'

export type TruncatedTextWithTooltipV2Props = {
    text: string
    className?: string
    style?: CSSProperties
    tooltipContent?: string
    side?: TooltipV2Side
    align?: TooltipV2Align
    size?: TooltipV2Size
    delayDuration?: number
    offset?: number
    disabled?: boolean
    'data-element'?: string
    'data-id'?: string
}
