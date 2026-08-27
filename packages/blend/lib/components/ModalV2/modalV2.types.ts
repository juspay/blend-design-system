// Skeleton types
import { SkeletonVariant } from '../Skeleton'
import type { ModalV2TokensType } from './modalV2.tokens.types'
import type { HTMLAttributes, ReactNode } from 'react'
import type { ButtonV2Props } from '../ButtonV2'
import type { CSSObject } from 'styled-components'

export type HeaderSkeletonConfig = {
    show: boolean
    showDivider: boolean
    showCloseButton: boolean
}

export type BodySkeletonConfig = {
    show: boolean
    width: string
    height: string | number
}

export type FooterSkeletonConfig = {
    show: boolean
    showDivider: boolean
}

export type ModalV2SkeletonProps = {
    modalTokens: ModalV2TokensType
    headerSkeleton?: HeaderSkeletonConfig
    bodySkeleton?: BodySkeletonConfig
    footerSkeleton?: FooterSkeletonConfig
    skeletonVariant: SkeletonVariant
}

// Modal types - using ButtonV2 props
export type ModalV2ButtonAction = Omit<ButtonV2Props, 'buttonGroupPosition'>

export type BodySkeletonProps = {
    show?: boolean
    width?: string
    height?: string | number
}

export type ModalV2BodySkeletonProps = {
    show?: boolean
    variant?: SkeletonVariant
    bodySkeletonProps?: BodySkeletonProps
}

export type ModalV2Dimensions = {
    width?: CSSObject['width']
    height?: CSSObject['height']
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    minHeight?: CSSObject['minHeight']
    maxHeight?: CSSObject['maxHeight']
}

// Defined in the leaf `modalV2.base.types.ts` (see its header) and
// re-exported here so existing consumers keep importing from this module.
export type { ModalBaseProps } from './modalV2.base.types'
import type { ModalBaseProps } from './modalV2.base.types'

export type ModalV2Props = ModalBaseProps & {
    isCustom?: boolean
    children: ReactNode
    primaryAction?: ModalV2ButtonAction
    secondaryAction?: ModalV2ButtonAction
    customHeader?: ReactNode
    customFooter?: ReactNode
    headerSlot?: ReactNode
    dimensions?: ModalV2Dimensions
    useDrawerOnMobile?: boolean
    skeleton?: ModalV2BodySkeletonProps
} & Omit<
        HTMLAttributes<HTMLDivElement>,
        'children' | 'title' | 'className' | 'style'
    >
