/**
 * Legacy data shapes for organizeTimelineItems / flattenComments.
 * Use the composable Timeline.Node / Timeline.Header etc. for new code.
 */

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

/**
 * Groups timeline items by labels and organizes headers and comments
 */
export const organizeTimelineItems = (
    items: TimelineItemData[]
): TimelineLabelData[] => {
    const labelsMap = new Map<string, TimelineLabelData>()

    items.forEach((item) => {
        if (item.label) {
            labelsMap.set(item.label.id, {
                ...item.label,
                headers: item.label.headers || [],
                comments: item.label.comments || [],
            })
        } else if (item.header) {
            const lastLabel = Array.from(labelsMap.values()).pop()
            if (lastLabel) {
                if (!lastLabel.headers) lastLabel.headers = []
                lastLabel.headers.push(item.header!)
            }
        } else if (item.comment) {
            const lastLabel = Array.from(labelsMap.values()).pop()
            if (lastLabel) {
                if (!lastLabel.comments) lastLabel.comments = []
                lastLabel.comments.push(item.comment)
            }
        }
    })

    return Array.from(labelsMap.values())
}

/**
 * Flattens timeline items into a list of comments
 */
export const flattenComments = (
    items: TimelineItemData[]
): TimelineCommentData[] => {
    const comments: TimelineCommentData[] = []
    items.forEach((item) => {
        if (item.comment) comments.push(item.comment)
        else if (item.label?.comments) comments.push(...item.label.comments)
        else if (item.header?.comments) comments.push(...item.header.comments)
    })
    return comments
}

/**
 * Gets all comments from headers
 */
export const getAllCommentsFromHeaders = (
    headers: TimelineHeaderData[]
): TimelineCommentData[] => {
    const comments: TimelineCommentData[] = []
    headers.forEach((header) => {
        if (header.comments) comments.push(...header.comments)
    })
    return comments
}

/**
 * Truncates text to a maximum number of lines
 */
export const truncateText = (
    text: string,
    maxLines: number = 2
): { text: string; isTruncated: boolean } => {
    const lines = text.split('\n')
    if (lines.length <= maxLines) return { text, isTruncated: false }
    return { text: lines.slice(0, maxLines).join('\n'), isTruncated: true }
}
