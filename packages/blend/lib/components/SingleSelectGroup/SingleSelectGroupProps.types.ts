import type { ReactElement } from 'react'
import type { SingleSelectProps } from '../SingleSelect/types'

export type SingleSelectGroupProps = {
    stacked?: boolean
    gap?: string | number
    children:
        | ReactElement<SingleSelectProps>
        | ReactElement<SingleSelectProps>[]
}
