import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTimelineDarkTokens } from './timeline.dark.token'
import { getTimelineLightTokens } from './timeline.light.token'
import type { ResponsiveTimelineTokens } from './timeline.tokens.types'

export type {
    ResponsiveTimelineTokens,
    TimelineTokensType,
    TimelineStatusColors,
} from './timeline.tokens.types'

export const getTimelineTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTimelineTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTimelineDarkTokens(foundationToken)
    }
    return getTimelineLightTokens(foundationToken)
}
