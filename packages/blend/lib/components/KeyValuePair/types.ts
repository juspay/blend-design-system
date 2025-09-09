export enum KeyValuePairStateType {
    vertical,
    horizontal,
}

export enum KeyValuePairSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export type KeyValuePairPropTypes = {
    keyString: string
    size?: KeyValuePairSize
    value?: string
    keySlot?: React.ReactNode
    valueLeftSlot?: React.ReactNode
    valueRightSlot?: React.ReactNode
    keyValuePairState?: KeyValuePairStateType
    maxWidth?: string
}
