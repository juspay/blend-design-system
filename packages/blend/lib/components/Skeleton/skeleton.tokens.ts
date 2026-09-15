import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSkeletonLightTokens } from './skeleton.light.tokens'
import { getSkeletonDarkTokens } from './skeleton.dark.tokens'
import type { ResponsiveSkeletonTokens } from './skeleton.tokens.types'

export type {
    ResponsiveSkeletonTokens,
    SkeletonTokensType,
    SkeletonVariant,
    SkeletonShape,
} from './skeleton.tokens.types'

export const getSkeletonTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSkeletonTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSkeletonDarkTokens(foundationToken)
    }

    return getSkeletonLightTokens(foundationToken)
}

export default getSkeletonTokens
