import type { CSSObject } from 'styled-components'
import { TimelineNodeStatus } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getTimelineDarkTokens } from './timeline.dark.token'
import { getTimelineLightTokens } from './timeline.light.token'

/** Shared map of status → background color used by header and comment dots */
export type TimelineStatusColors = {
    [key in TimelineNodeStatus]: CSSObject['backgroundColor']
}

export type TimelineTokensType = {
    /**
     * Layout helpers — used to align all circles onto the vertical line.
     * circleOffset: absolute left of the 8 px circle so its centre sits
     *               exactly on the line (lineLeft - circleSize/2).
     * gutter:       paddingLeft applied to every content row so text
     *               starts to the right of the circle.
     */
    layout: {
        circleOffset: CSSObject['left']
        gutter: CSSObject['paddingLeft']
    }
    line: {
        width: CSSObject['width']
        backgroundColor: CSSObject['backgroundColor']
        marginLeft: CSSObject['marginLeft']
    }
    statusColors: TimelineStatusColors
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
        marginBottom: CSSObject['marginBottom']
        circle: {
            size: CSSObject['width']
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
        }
    }
    header: {
        marginBottom: CSSObject['marginBottom']
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
            marginBottom: CSSObject['marginBottom']
        }
        timestamp: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
        }
        circle: {
            size: CSSObject['width']
        }
    }
    substep: {
        marginLeft: CSSObject['marginLeft']
        marginTop: CSSObject['marginTop']
        marginBottom: CSSObject['marginBottom']
        paddingLeft: CSSObject['paddingLeft']
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        description: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            marginTop: CSSObject['marginTop']
        }
        timestamp: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
        }
        connector: {
            /** Width of the horizontal leg of the L-connector */
            width: CSSObject['width']
            /** Height covers from the top down to the centre of the first title line */
            height: CSSObject['height']
            borderColor: CSSObject['borderColor']
            borderRadius: CSSObject['borderRadius']
        }
    }
    /** Generic node (e.g. comment, note, event) — header row, text, avatar + time */
    node: {
        marginBottom: CSSObject['marginBottom']
        circle: {
            size: CSSObject['width']
            topOffset: CSSObject['top']
        }
        header: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        datetime: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
        }
        text: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            lineHeight: CSSObject['lineHeight']
            marginBottom: CSSObject['marginBottom']
        }
        user: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            marginLeft: CSSObject['marginLeft']
        }
        time: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
        }
        avatar: {
            size: CSSObject['width']
        }
        separator: {
            size: CSSObject['width']
            color: CSSObject['color']
            marginX: CSSObject['marginLeft']
        }
    }
    showMore: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
        marginTop: CSSObject['marginTop']
        cursor: CSSObject['cursor']
        hover: {
            color: CSSObject['color']
        }
    }
}

export type ResponsiveTimelineTokens = {
    [key in keyof BreakpointType]: TimelineTokensType
}

export const getTimelineTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTimelineTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTimelineDarkTokens(foundationToken)
    }
    return getTimelineLightTokens(foundationToken)
}
