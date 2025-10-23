export enum KeyValuePairStateType {
    vertical,
    horizontal,
}

export enum KeyValuePairSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export type TextOverflowMode = 'truncate' | 'wrap' | 'wrap-clamp'

export type KeyValuePairPropTypes = {
    keyString: string
    size?: KeyValuePairSize
    value?: string
    keySlot?: React.ReactNode
    valueLeftSlot?: React.ReactNode
    valueRightSlot?: React.ReactNode
    keyValuePairState?: KeyValuePairStateType
    maxWidth?: string
    /**
     * Controls how text overflow is handled for both key and value
     * - 'truncate': Single line with ellipsis (default)
     * - 'wrap': Allow natural text wrapping
     * - 'wrap-clamp': Wrap with line limit and ellipsis
     * @default 'truncate'
     */
    textOverflow?: TextOverflowMode
    /**
     * Maximum number of lines to display when textOverflow is 'wrap-clamp'
     * @default 2
     */
    maxLines?: number
    /**
     * Show tooltip on hover when text is truncated
     * @default true
     */
    showTooltipOnTruncate?: boolean
}
