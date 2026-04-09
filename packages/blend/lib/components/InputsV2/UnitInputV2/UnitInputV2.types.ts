import { RefObject } from 'react'
import { InputSizeV2 } from '../inputV2.types'
import { UnitInputV2TokensType } from './UnitInputV2.token'

export enum UnitInputV2Position {
    LEFT = 'left',
    RIGHT = 'right',
}
export type UnitSideSlotProps = {
    side: UnitInputV2Position.LEFT | UnitInputV2Position.RIGHT
    unitLabel: string
    size: InputSizeV2
    disabled: boolean
    unitRef: RefObject<HTMLDivElement | null>
    ic: UnitInputV2TokensType['inputContainer']
}
export type UnitInputV2PropsType = {
    value: number | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    step?: number
    error?: boolean
    errorMessage?: string
    required?: boolean
    size?: InputSizeV2
    label?: string
    sublabel?: string
    helpIconHintText?: string
    hintText?: string
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    unit: string
    unitPosition?: UnitInputV2Position
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className'
>
