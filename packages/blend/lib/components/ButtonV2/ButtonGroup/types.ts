import type { ReactElement } from 'react'
import type { ButtonV2Props } from '../types'
import type { ButtonProps } from '../../Button/types'

export type ButtonGroupV2ChildProps = ButtonV2Props | ButtonProps

export type ButtonGroupV2Props = {
    stacked?: boolean
    gap?: string | number
    children:
        | ReactElement<ButtonGroupV2ChildProps>
        | ReactElement<ButtonGroupV2ChildProps>[]
}

export type ButtonGroupPosition = 'left' | 'center' | 'right'
