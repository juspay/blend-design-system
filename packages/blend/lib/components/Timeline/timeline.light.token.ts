import { FoundationTokenType } from '../../tokens/theme.token'
import { TimelineNodeStatus } from './types'
import type { TimelineTokensType } from './timeline.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

type ResponsiveTimelineTokens = {
    [key in keyof BreakpointType]: TimelineTokensType
}

const buildTokens = (
    foundationToken: FoundationTokenType
): TimelineTokensType => ({
    track: {
        width: '1px',
        backgroundColor: foundationToken.colors.gray[300],
        left: '13px',
    },

    indicator: {
        left: '10.5px',
        width: foundationToken.unit[6],
        height: foundationToken.unit[6],
    },

    statusColors: {
        [TimelineNodeStatus.SUCCESS]: foundationToken.colors.green[600],
        [TimelineNodeStatus.WARNING]: foundationToken.colors.orange[500],
        [TimelineNodeStatus.ERROR]: foundationToken.colors.red[500],
        [TimelineNodeStatus.NEUTRAL]: foundationToken.colors.gray[400],
    },

    label: {
        paddingLeft: foundationToken.unit[28],
        marginBottom: foundationToken.unit[12],
        circle: {
            left: foundationToken.unit[8],
            width: foundationToken.unit[10],
            height: foundationToken.unit[10],
            backgroundColor: 'transparent',
            border: `1px solid ${foundationToken.colors.gray[300]}`,
        },
        mask: {
            backgroundColor: foundationToken.colors.gray[50],
            height: foundationToken.unit[10],
        },
        text: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: 500,
            color: foundationToken.colors.gray[500],
        },
    },

    header: {
        row: {
            paddingLeft: foundationToken.unit[28],
            marginBottom: foundationToken.unit[20],
            gap: foundationToken.unit[8],
        },
        section: {
            marginBottom: foundationToken.unit[20],
        },
        title: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: 500,
            color: foundationToken.colors.gray[800],
        },
        timestamp: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            color: foundationToken.colors.gray[500],
            gap: foundationToken.unit[8],
        },
    },

    subsection: {
        paddingLeft: foundationToken.unit[28],
        marginTop: foundationToken.unit[0],
        marginBottom: foundationToken.unit[18],
        marginLeft: foundationToken.unit[40],
        rootIndicator: {
            top: foundationToken.unit[6],
        },
        headerRow: {
            gap: foundationToken.unit[8],
        },
        titleRow: {
            gap: foundationToken.unit[4],
        },
        datetimeGroup: {
            gap: foundationToken.unit[6],
        },
        title: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: 500,
            color: foundationToken.colors.gray[800],
            gap: foundationToken.unit[8],
        },
        description: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            color: foundationToken.colors.gray[600],
            marginTop: foundationToken.unit[4],
            marginBottom: foundationToken.unit[8],
            lineHeight: foundationToken.font.size.body.md.lineHeight,
        },
        datetime: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            color: foundationToken.colors.gray[500],
            gap: foundationToken.unit[8],
        },
        connector: {
            left: foundationToken.unit[0.5],
            width: foundationToken.unit[22],
            height: foundationToken.unit[12],
            color: foundationToken.colors.gray[300],
        },
        avatar: {
            width: foundationToken.unit[20],
            height: foundationToken.unit[20],
            marginTop: foundationToken.unit[8],
        },
        user: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            color: foundationToken.colors.gray[600],
            marginLeft: foundationToken.unit[6],
        },
        time: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            color: foundationToken.colors.gray[600],
        },
        separator: {
            width: foundationToken.unit[4],
            height: foundationToken.unit[4],
            color: foundationToken.colors.gray[600],
            marginLeft: foundationToken.unit[6],
            marginRight: foundationToken.unit[6],
        },
    },

    showMore: {
        paddingLeft: foundationToken.unit[40],
        marginTop: foundationToken.unit[8],
    },
})

export const getTimelineLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTimelineTokens => {
    const tokens = buildTokens(foundationToken)
    return { sm: tokens, lg: tokens }
}
