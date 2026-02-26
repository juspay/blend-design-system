import type { HTMLAttributes, ReactNode } from 'react'
import type { AvatarV2Props } from '../AvatarV2/avatarV2.types'
import type { ButtonV2Props } from '../ButtonV2/buttonV2.types'

export enum TimelineNodeStatus {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    NEUTRAL = 'neutral',
}

export type TimelineUser = {
    name: string
    avatar?: AvatarV2Props['src']
    fallbackText?: string
}

export type LinePositionOptions = {
    indicatorHeightPx: number
    indicatorTopPx: number
    labelCircleHeightPx: number
}

export type LineLayout = {
    top: number
    height: number
}

export type TimelineRootProps = {
    children: ReactNode
    className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'style'>

export type TimelineLabelProps = {
    text: string
}

export type TimelineHeaderProps = HTMLAttributes<HTMLDivElement> & {
    title: string
    status?: TimelineNodeStatus
    timestamp?: string
    children?: ReactNode
    leftSlot?: ReactNode
    rightSlot?: ReactNode
}

export type TimelineSubstepProps = HTMLAttributes<HTMLDivElement> & {
    title: string
    isNestedUnderHeader?: boolean
    showIndicator?: boolean
    description?: string
    timestamp?: string
    rightSlot?: ReactNode
    datetimeLeftSlot?: ReactNode
    datetimeRightSlot?: ReactNode
}

export type TimelineNodeProps = HTMLAttributes<HTMLDivElement> & {
    title?: string
    leftSlot?: ReactNode
    headerRightSlot?: ReactNode
    datetime?: string
    datetimeLeftSlot?: ReactNode
    datetimeRightSlot?: ReactNode
    text?: string
    maxLines?: number
    user?: TimelineUser
    avatarProps?: Partial<Omit<AvatarV2Props, 'src' | 'fallbackText'>>
    time?: string
    status?: TimelineNodeStatus
    children?: ReactNode
}

export type TimelineShowMoreProps = {
    count: number
    label?: string
    onShowMore?: () => void
    buttonProps?: Partial<Omit<ButtonV2Props, 'text' | 'onClick'>>
}

export type TimelineCommentData = {
    id: string
    text: string
    user: { name: string; avatar?: string; fallbackText?: string }
    timestamp: string
}

export type TimelineSubstepData = {
    id: string
    title: string
    description?: string
    timestamp: string
}

export type TimelineHeaderData = {
    id: string
    title: string
    status?: string
    timestamp: string
    substeps?: TimelineSubstepData[]
    comments?: TimelineCommentData[]
}

export type TimelineLabelData = {
    id: string
    date: string
    headers?: TimelineHeaderData[]
    comments?: TimelineCommentData[]
}

export type TimelineItemData = {
    label?: TimelineLabelData
    header?: TimelineHeaderData
    comment?: TimelineCommentData
}
