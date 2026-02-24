import type { HTMLAttributes, ReactNode } from 'react'
import type { AvatarV2Props } from '../AvatarV2/avatarV2.types'
import type { ButtonV2Props } from '../ButtonV2/buttonV2.types'

// ---- Enums ----

export enum TimelineNodeStatus {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    NEUTRAL = 'neutral',
}

/** @deprecated Use TimelineNodeStatus instead */
export { TimelineNodeStatus as TimelineHeaderStatus }

// ---- Shared data types ----

export type TimelineUser = {
    name: string
    avatar?: AvatarV2Props['src']
    fallbackText?: string
}

// ---- Composable component props ----

export interface TimelineRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export interface TimelineLabelProps {
    /** Label text (e.g. date "JAN 15, 2025" or section "Comments"). Rendered in label row. */
    text: string
    /** @deprecated Use `text` instead */
    date?: string
}

export interface TimelineHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string
    /** Controls the color of the status indicator dot */
    status?: TimelineNodeStatus
    timestamp?: string
    /** Substeps or other nested content */
    children?: ReactNode
    /** Optional element before the title */
    leftSlot?: ReactNode
    /** Optional element after the timestamp */
    rightSlot?: ReactNode
}

export interface TimelineSubstepProps extends HTMLAttributes<HTMLDivElement> {
    title: string
    /** @internal Set by Timeline.Header when Substep is a child */
    isNestedUnderHeader?: boolean
    /** @internal Set by Timeline when Substep is first child (hide dot where connector meets line) */
    showIndicator?: boolean
    description?: string
    /** Date/time (body sm, gray 500); row has datetimeLeftSlot then timestamp */
    timestamp?: string
    /** React element next to title (body md, gray 800, normal weight) — no left slot on title */
    rightSlot?: ReactNode
    /** Optional element before the date/time */
    datetimeLeftSlot?: ReactNode
    /** Optional element after the date/time */
    datetimeRightSlot?: ReactNode
}

/**
 * Generic leaf node on the timeline (not comment-specific).
 * Layout: row1 = header + headerRightSlot + (datetimeLeftSlot, datetime, datetimeRightSlot);
 *         row2 = text/body; row3 = avatar + name + time.
 */
export interface TimelineNodeProps extends HTMLAttributes<HTMLDivElement> {
    /** Optional title on the first row */
    title?: string
    /** Slot before the title */
    leftSlot?: ReactNode
    /** Slot after the title on the same row */
    headerRightSlot?: ReactNode
    /** Date/time shown top-right (e.g. "4:00 PM") */
    datetime?: string
    /** Slot before datetime in the top-right group */
    datetimeLeftSlot?: ReactNode
    /** Slot after datetime in the top-right group */
    datetimeRightSlot?: ReactNode
    /** Body text below the header row (or use children) */
    text?: string
    /** Max lines before text is truncated */
    maxLines?: number
    /** Optional avatar + name row below text (uses AvatarV2) */
    user?: TimelineUser
    /** Props passed to AvatarV2 when user is set (e.g. size, shape) */
    avatarProps?: Omit<AvatarV2Props, 'src' | 'fallbackText'>
    /** Time shown next to avatar (e.g. "04:30 PM") */
    time?: string
    /** Status dot color */
    status?: TimelineNodeStatus
    /** Body content (alternative to text) */
    children?: ReactNode
}

export interface TimelineShowMoreProps {
    /** Number of hidden items (e.g. for building the label) */
    count: number
    /**
     * Label shown on the trigger. User-provided so it can be anything
     * (e.g. "Show All Comments (45+)" or "Load more items").
     * Default: `Show more (${count}+)`
     */
    label?: string
    /**
     * Called when the user clicks. Composable: parent owns loading state
     * and shows a loader below/elsewhere until more items are rendered.
     */
    onShowMore?: () => void
    /** Props passed to the underlying ButtonV2 (e.g. size, buttonType, subType, disabled) */
    buttonProps?: Partial<Omit<ButtonV2Props, 'text' | 'onClick'>>
}
