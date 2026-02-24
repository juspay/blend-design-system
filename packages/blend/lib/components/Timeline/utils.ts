const DATA_LABEL = 'data-timeline-label'
const DATA_HEADER = 'data-timeline-header'
const DATA_SUBSTEP = 'data-timeline-substep'
const DATA_NODE = 'data-timeline-node'
const DATA_SHOW_MORE = 'data-timeline-show-more'

export type LinePositionOptions = {
    indicatorHeightPx: number
    indicatorTopPx: number
    labelCircleHeightPx: number
}

export function parsePx(value: string | number | undefined): number {
    if (value == null) return 0
    if (typeof value === 'number') return value
    const match = String(value).match(/^(-?\d*(?:\.\d+)?)\s*px?$/i)
    return match ? parseFloat(match[1]) : parseFloat(value) || 0
}

function getIndicatorBottomForElement(
    el: HTMLElement,
    options: LinePositionOptions
): number {
    const { indicatorHeightPx, indicatorTopPx } = options
    if (el.getAttribute(DATA_LABEL) === 'true') {
        return el.offsetTop + el.offsetHeight / 2
    }
    if (el.getAttribute(DATA_HEADER) === 'true') {
        const row = el.firstElementChild as HTMLElement | null
        if (row) {
            const headerChildren = Array.from(el.children) as HTMLElement[]
            if (headerChildren.length > 1) {
                const wrapper = headerChildren[1]
                return el.offsetTop + wrapper.offsetTop
            }
            return el.offsetTop + row.offsetTop + row.offsetHeight / 2
        }
        return el.offsetTop + el.offsetHeight / 2
    }
    if (el.getAttribute(DATA_NODE) === 'true') {
        return el.offsetTop + indicatorTopPx + indicatorHeightPx / 2
    }
    if (el.getAttribute(DATA_SUBSTEP) === 'true') {
        return el.offsetTop + indicatorHeightPx / 2
    }
    return el.offsetTop + el.offsetHeight
}

/**
 * Line starts at the bottom of the first item's indicator (circle then line).
 * No line segment above the first circle; line connects to the circle with no gap.
 */
export function getLineTop(
    container: HTMLElement,
    options: LinePositionOptions
): number {
    const { indicatorHeightPx, indicatorTopPx, labelCircleHeightPx } = options
    const children = Array.from(container.children) as HTMLElement[]
    const first = children[0]
    if (!first) return 0

    if (first.getAttribute(DATA_LABEL) === 'true') {
        const containerRect = container.getBoundingClientRect()
        const firstRect = first.getBoundingClientRect()
        const visualTop = firstRect.top - containerRect.top
        const circleCenter = visualTop + first.offsetHeight / 2
        return circleCenter + labelCircleHeightPx / 2
    }
    if (first.getAttribute(DATA_HEADER) === 'true') {
        const row = first.firstElementChild as HTMLElement | null
        if (row) {
            const rowCenter =
                first.offsetTop + row.offsetTop + row.offsetHeight / 2
            return rowCenter + indicatorHeightPx / 2
        }
        return first.offsetTop + first.offsetHeight / 2
    }
    if (first.getAttribute(DATA_SUBSTEP) === 'true') {
        return first.offsetTop + indicatorHeightPx
    }
    if (first.getAttribute(DATA_NODE) === 'true') {
        return first.offsetTop + indicatorTopPx + indicatorHeightPx
    }
    return 0
}

export function getLineBottom(
    container: HTMLElement,
    options: LinePositionOptions
): number | null {
    const { indicatorHeightPx, indicatorTopPx } = options
    const children = Array.from(container.children) as HTMLElement[]
    const last = children[children.length - 1]
    if (!last) return null

    if (last.getAttribute(DATA_SHOW_MORE) === 'true') {
        const prev = children[children.length - 2]
        if (!prev) return null
        return getIndicatorBottomForElement(prev, options)
    }
    if (last.getAttribute(DATA_LABEL) === 'true') {
        return last.offsetTop + last.offsetHeight / 2
    }
    if (last.getAttribute(DATA_HEADER) === 'true') {
        const row = last.firstElementChild as HTMLElement | null
        if (row) {
            const headerChildren = Array.from(last.children) as HTMLElement[]
            if (headerChildren.length > 1) {
                const wrapper = headerChildren[1]
                return last.offsetTop + wrapper.offsetTop
            }
            return last.offsetTop + row.offsetTop + row.offsetHeight / 2
        }
        return last.offsetTop + last.offsetHeight / 2
    }
    if (last.getAttribute(DATA_NODE) === 'true') {
        return last.offsetTop + indicatorTopPx + indicatorHeightPx / 2
    }
    if (last.getAttribute(DATA_SUBSTEP) === 'true') {
        return last.offsetTop + indicatorHeightPx / 2
    }
    return last.offsetTop + last.offsetHeight
}

export function clampLineHeight(
    lineTop: number,
    lineBottom: number | null
): { top: number; height: number } | null {
    if (lineBottom == null) return null
    const top = lineTop
    let height = lineBottom - lineTop
    if (height < 1) {
        height = 1
    }
    return { top, height }
}
