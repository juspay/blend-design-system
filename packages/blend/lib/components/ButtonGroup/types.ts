import type { ReactElement } from 'react'
import type { ButtonProps } from '../Button'

export type ButtonGroupProps = {
    stacked?: boolean
    children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[]
}
