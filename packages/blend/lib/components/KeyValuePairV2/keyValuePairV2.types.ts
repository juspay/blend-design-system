export enum KeyValuePairV2StateType {
    vertical,
    horizontal,
}

export enum KeyValuePairV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export type TextOverflowMode = 'truncate' | 'wrap' | 'wrap-clamp'

export type KeyValuePairV2PropTypes = {
    keyString: string
    size?: KeyValuePairV2Size
    value?: string
    keySlot?: React.ReactNode
    valueLeftSlot?: React.ReactNode
    valueRightSlot?: React.ReactNode
    keyValuePairState?: KeyValuePairV2StateType
    maxWidth?: string
    textOverflow?: TextOverflowMode
    maxLines?: number
    showTooltipOnTruncate?: boolean
}
