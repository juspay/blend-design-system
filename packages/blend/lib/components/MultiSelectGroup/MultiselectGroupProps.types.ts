import type { ReactElement } from 'react'
import type { MultiSelectProps } from '../MultiSelect/types'

export type MultiSelectGroupProps = {
    stacked?: boolean
    gap?: string | number
    children: ReactElement<MultiSelectProps> | ReactElement<MultiSelectProps>[]
}
