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
    layout: {
        circleOffset: foundationToken.unit[7],
        gutter: foundationToken.unit[28],
    },
    line: {
        width: '1px',
        backgroundColor: foundationToken.colors.gray[700],
        marginLeft: foundationToken.unit[11],
    },
    statusColors: {
        [TimelineNodeStatus.SUCCESS]: foundationToken.colors.green[500],
        [TimelineNodeStatus.WARNING]: foundationToken.colors.orange[500],
        [TimelineNodeStatus.ERROR]: foundationToken.colors.red[500],
        [TimelineNodeStatus.NEUTRAL]: foundationToken.colors.gray[600],
    },
    label: {
        fontSize: foundationToken.font.size.body.sm.fontSize,
        fontWeight: 500,
        color: foundationToken.colors.gray[400],
        marginBottom: foundationToken.unit[16],
        circle: {
            size: foundationToken.unit[8],
            backgroundColor: foundationToken.colors.gray[700],
            border: 'none',
        },
    },
    header: {
        marginBottom: foundationToken.unit[16],
        title: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: 500,
            color: foundationToken.colors.gray[100],
            marginBottom: foundationToken.unit[4],
        },
        timestamp: {
            fontSize: foundationToken.font.size.body.xs.fontSize,
            color: foundationToken.colors.gray[500],
        },
        circle: {
            size: foundationToken.unit[8],
        },
    },
    substep: {
        marginLeft: foundationToken.unit[16],
        marginTop: foundationToken.unit[8],
        marginBottom: foundationToken.unit[8],
        paddingLeft: foundationToken.unit[20],
        title: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: 500,
            color: foundationToken.colors.gray[100],
        },
        description: {
            fontSize: foundationToken.font.size.body.xs.fontSize,
            color: foundationToken.colors.gray[400],
            marginTop: foundationToken.unit[4],
        },
        timestamp: {
            fontSize: foundationToken.font.size.body.xs.fontSize,
            color: foundationToken.colors.gray[500],
        },
        connector: {
            width: '14px',
            height: '14px',
            borderColor: foundationToken.colors.gray[700],
            borderRadius: '0 0 0 4px',
        },
    },
    node: {
        marginBottom: foundationToken.unit[20],
        circle: {
            size: foundationToken.unit[8],
            topOffset: '6px',
        },
        header: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: 500,
            color: foundationToken.colors.gray[100],
        },
        datetime: {
            fontSize: foundationToken.font.size.body.xs.fontSize,
            color: foundationToken.colors.gray[500],
        },
        text: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            color: foundationToken.colors.gray[100],
            lineHeight: foundationToken.font.size.body.sm.lineHeight,
            marginBottom: foundationToken.unit[8],
        },
        user: {
            fontSize: foundationToken.font.size.body.xs.fontSize,
            color: foundationToken.colors.gray[400],
            marginLeft: foundationToken.unit[8],
        },
        time: {
            fontSize: foundationToken.font.size.body.xs.fontSize,
            color: foundationToken.colors.gray[500],
        },
        avatar: {
            size: foundationToken.unit[20],
        },
        separator: {
            size: foundationToken.unit[4],
            color: foundationToken.colors.gray[600],
            marginX: foundationToken.unit[4],
        },
    },
    showMore: {
        fontSize: foundationToken.font.size.body.sm.fontSize,
        fontWeight: 500,
        color: foundationToken.colors.primary[400],
        marginTop: foundationToken.unit[8],
        cursor: 'pointer',
        hover: {
            color: foundationToken.colors.primary[300],
        },
    },
})

export const getTimelineDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTimelineTokens => {
    const tokens = buildTokens(foundationToken)
    return { sm: tokens, lg: tokens }
}
