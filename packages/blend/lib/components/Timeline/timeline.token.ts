import type { CSSObject } from 'styled-components'
import { TimelineNodeStatus } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getTimelineDarkTokens } from './timeline.dark.token'
import { getTimelineLightTokens } from './timeline.light.token'

export type TimelineStatusColors = {
    [key in TimelineNodeStatus]: CSSObject['backgroundColor']
}

export type TimelineTokensType = {
    track: {
        width: CSSObject['width']
        backgroundColor: CSSObject['backgroundColor']
        left: CSSObject['left']
    }

    statusColors: TimelineStatusColors

    label: {
        paddingLeft: CSSObject['paddingLeft']
        marginTop: CSSObject['marginTop']
        marginBottom: CSSObject['marginBottom']
        minHeight: CSSObject['minHeight']
        circle: {
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            maskBackground: CSSObject['backgroundColor']
            maskHeight: CSSObject['height']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    header: {
        paddingLeft: CSSObject['paddingLeft']
        toSubsectionMarginBottom: CSSObject['marginBottom']
        sectionMarginBottom: CSSObject['marginBottom']
        gap: CSSObject['gap']
        circle: {
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
        }
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        timestamp: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            gap: CSSObject['gap']
        }
    }

    substep: {
        marginTop: CSSObject['marginTop']
        marginBottom: CSSObject['marginBottom']
        marginLeft: CSSObject['marginLeft']
        gap: CSSObject['gap']
        circle: {
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
        }
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
            gap: CSSObject['gap']
        }
        description: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            marginTop: CSSObject['marginTop']
        }
        timestamp: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            gap: CSSObject['gap']
        }
        connector: {
            width: CSSObject['width']
            height: CSSObject['height']
            strokeColor: CSSObject['color']
            left: CSSObject['left']
        }
    }

    node: {
        paddingLeft: CSSObject['paddingLeft']
        marginBottom: CSSObject['marginBottom']
        /** Gap between title / right-slot group items */
        gap: CSSObject['gap']
        /** Smaller gap used inside the datetime slot group */
        gapSmall: CSSObject['gap']
        circle: {
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
            top: CSSObject['top']
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
        avatar: {
            width: CSSObject['width']
            height: CSSObject['height']
            marginTop: CSSObject['marginTop']
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
        separator: {
            width: CSSObject['width']
            height: CSSObject['height']
            color: CSSObject['color']
            marginLeft: CSSObject['marginLeft']
            marginRight: CSSObject['marginRight']
        }
    }

    showMore: {
        paddingLeft: CSSObject['paddingLeft']
        marginTop: CSSObject['marginTop']
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
