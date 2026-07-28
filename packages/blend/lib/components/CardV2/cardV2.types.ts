import type {
    FC,
    ForwardRefExoticComponent,
    ReactNode,
    RefAttributes,
} from 'react'
import type { CSSObject } from 'styled-components'
import type { ButtonV2Props } from '../ButtonV2/buttonV2.types'
import type { SkeletonVariant } from '../Skeleton/types'

export enum CardV2Variant {
    OUTLINED = 'outlined',
    ELEVATED = 'elevated',
    GHOST = 'ghost',
}

export enum CardV2Orientation {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export enum CardV2Padding {
    NONE = 'none',
    COMPACT = 'compact',
    COMFORTABLE = 'comfortable',
}

export enum CardV2ActionPlacement {
    BODY = 'body',
    FOOTER = 'footer',
}

export type CardV2SkeletonProps = {
    show?: boolean
    variant?: SkeletonVariant
    height?: CSSObject['height']
    width?: CSSObject['width']
}

export type CardV2Action = ButtonV2Props

export type CardV2SectionProps = {
    children?: ReactNode
}

export type CardV2HeaderProps = {
    title?: ReactNode
    truncateTitle?: boolean
    subtitle?: ReactNode
    eyebrow?: ReactNode
    leadingSlot?: ReactNode
    trailingSlot?: ReactNode
    centered?: boolean
}

export type CardV2MetaProps = Pick<
    CardV2HeaderProps,
    'title' | 'truncateTitle' | 'subtitle' | 'eyebrow' | 'centered'
>

export type CardV2MediaProps = CardV2SectionProps & {
    orientation?: CardV2Orientation
    width?: CSSObject['width']
    height?: CSSObject['height']
    minHeight?: CSSObject['minHeight']
}

export type CardV2BodyProps = CardV2SectionProps & {
    description?: ReactNode
    actions?: CardV2Action | CardV2Action[]
    centered?: boolean
    scrollable?: boolean
}

export type CardV2ActionsProps = {
    actions?: CardV2Action | CardV2Action[]
    centered?: boolean
}

export type CardV2FooterProps = CardV2SectionProps & {
    actions?: CardV2Action | CardV2Action[]
    centered?: boolean
    divider?: boolean
}

export type CardV2Props = {
    variant?: CardV2Variant
    orientation?: CardV2Orientation
    padding?: CardV2Padding
    title?: ReactNode
    truncateTitle?: boolean
    subtitle?: ReactNode
    description?: ReactNode
    eyebrow?: ReactNode
    media?: ReactNode
    mediaWidth?: CSSObject['width']
    mediaHeight?: CSSObject['height']
    mediaMinHeight?: CSSObject['minHeight']
    leadingSlot?: ReactNode
    trailingSlot?: ReactNode
    footer?: ReactNode
    actions?: CardV2Action | CardV2Action[]
    actionPlacement?: CardV2ActionPlacement
    centered?: boolean
    interactive?: boolean
    selected?: boolean
    skeleton?: CardV2SkeletonProps
    width?: CSSObject['width']
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    height?: CSSObject['height']
    minHeight?: CSSObject['minHeight']
    maxHeight?: CSSObject['maxHeight']
    scrollable?: boolean
    children?: ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'>

export type CardV2Component = ForwardRefExoticComponent<
    CardV2Props & RefAttributes<HTMLDivElement>
> & {
    Header: FC<CardV2HeaderProps>
    Meta: FC<CardV2MetaProps>
    Media: FC<CardV2MediaProps>
    Body: FC<CardV2BodyProps>
    Content: FC<CardV2SectionProps>
    Actions: FC<CardV2ActionsProps>
    Footer: FC<CardV2FooterProps>
    Skeleton: FC<{
        skeleton?: CardV2SkeletonProps
    }>
}
