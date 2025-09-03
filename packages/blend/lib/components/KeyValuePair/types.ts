export enum KeyValuePairStateType {
    vertical,
    horizontal,
}

export type KeyValuePairPropTypes = {
    keyString: string
    value?: string
    keySlot?: React.ReactNode
    valueLeftSlot?: React.ReactNode
    valueRightSlot?: React.ReactNode
    keyValuePairState?: KeyValuePairStateType
}
