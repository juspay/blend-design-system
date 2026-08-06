import type { BlockProps } from '../Primitives/Block/Block'
import type { SpinnerColor, SpinnerSize } from './spinner.tokens.types'

export type SpinnerProps = Omit<BlockProps, 'children'> & {
    size?: SpinnerSize
    color?: SpinnerColor
    label?: string
    overlay?: boolean
}

export type { SpinnerColor, SpinnerSize }
