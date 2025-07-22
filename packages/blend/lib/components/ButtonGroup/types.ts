import type { ReactElement } from 'react'
import type { ButtonV2Props } from '../Button'

export type ButtonGroupProps = {
    stacked?: boolean
    children: ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[]
}
