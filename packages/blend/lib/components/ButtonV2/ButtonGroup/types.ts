import type { ReactElement } from 'react'
import type { ButtonV2Props } from '../types'
import type { ButtonProps } from '../../Button/types'

export type ButtonGroupV2ChildProps = ButtonV2Props | ButtonProps

export type ButtonGroupV2Props = {
    /**
     * Whether buttons should be stacked (no gap, connected borders)
     * @default false
     */
    stacked?: boolean
    /**
     * Gap between buttons when not stacked
     * Uses foundation tokens if not provided
     */
    gap?: string | number
    /**
     * Children - Button or ButtonV2 components
     */
    children:
        | ReactElement<ButtonGroupV2ChildProps>
        | ReactElement<ButtonGroupV2ChildProps>[]
}

export type ButtonGroupPosition = 'left' | 'center' | 'right'
