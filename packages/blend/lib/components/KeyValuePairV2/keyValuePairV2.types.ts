import { HTMLAttributes } from 'react'

export enum KeyValuePairV2StateType {
    vertical,
    horizontal,
}

export enum KeyValuePairV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type TextOverflowMode = 'truncate' | 'wrap' | 'wrap-clamp'

export type KeyValuePairV2PropTypes = {
    keyString: string
    size?: KeyValuePairV2Size
    value?: string
    slots?: {
        key?: React.ReactNode
        value?: {
            left?: React.ReactNode
            right?: React.ReactNode
        }
    }
    keyValuePairState?: KeyValuePairV2StateType
    maxWidth?: string
    textOverflow?: TextOverflowMode
    maxLines?: number
    showTooltipOnTruncate?: boolean
} & Omit<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'style' | 'slot' | 'onChange'
>
