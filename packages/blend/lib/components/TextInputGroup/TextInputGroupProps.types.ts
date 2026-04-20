import type { ReactElement } from 'react'
import type { TextInputProps } from '../Inputs/TextInput/types'

export type TextInputGroupProps = {
    stacked?: boolean
    gap?: string | number
    children: ReactElement<TextInputProps> | ReactElement<TextInputProps>[]
}
