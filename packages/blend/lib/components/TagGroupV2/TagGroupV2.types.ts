import type { ReactElement } from 'react'
import type { TagV2Props } from '../TagV2/TagV2.types'

export type TagGroupV2ChildProps = TagV2Props

export type TagGroupV2Props = {
    stacked?: boolean
    gap?: string | number
    children:
        | ReactElement<TagGroupV2ChildProps>
        | ReactElement<TagGroupV2ChildProps>[]
}
