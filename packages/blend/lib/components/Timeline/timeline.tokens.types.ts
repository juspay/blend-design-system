import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { TimelineNodeStatus } from './types'

export type TimelineStatusColors = {
    [key in TimelineNodeStatus]: CSSObject['backgroundColor']
}

export type TimelineTokensType = {
    track: {
        width: CSSObject['width']
        backgroundColor: CSSObject['backgroundColor']
        left: CSSObject['left']
    }

    indicator: {
        left: CSSObject['left']
        width: CSSObject['width']
        height: CSSObject['height']
    }

    statusColors: TimelineStatusColors

    label: {
        paddingLeft: CSSObject['paddingLeft']
        marginBottom: CSSObject['marginBottom']
        circle: {
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
        }
        mask: {
            backgroundColor: CSSObject['backgroundColor']
            height: CSSObject['height']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    header: {
        row: {
            paddingLeft: CSSObject['paddingLeft']
            marginBottom: CSSObject['marginBottom']
            gap: CSSObject['gap']
        }
        section: {
            marginBottom: CSSObject['marginBottom']
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

    subsection: {
        paddingLeft: CSSObject['paddingLeft']
        marginTop: CSSObject['marginTop']
        marginBottom: CSSObject['marginBottom']
        marginLeft: CSSObject['marginLeft']
        rootIndicator: {
            top: CSSObject['top']
        }
        headerRow: {
            gap: CSSObject['gap']
        }
        titleRow: {
            gap: CSSObject['gap']
        }
        datetimeGroup: {
            gap: CSSObject['gap']
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
            marginBottom: CSSObject['marginBottom']
            lineHeight: CSSObject['lineHeight']
        }
        datetime: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
            gap: CSSObject['gap']
        }
        connector: {
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
            color: CSSObject['color']
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
