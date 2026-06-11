import type { ReactElement } from 'react'
import type { ButtonProps } from '../Button/types'

export type ButtonGroupProps = {
    stacked?: boolean
    children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[]
}
