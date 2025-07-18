import { FOUNDATION_THEME } from '../../tokens'
import { ProgressBarSize } from './types'
import type { CSSObject } from 'styled-components'

export type ProgressBarTokenType = {
    container: {
        borderRadius: string
        overflow: string
    }
    height: {
        [ProgressBarSize.SMALL]: CSSObject['height']
        [ProgressBarSize.MEDIUM]: CSSObject['height']
    }
    fill: {
        solid: {
            backgroundColor: CSSObject['backgroundColor']
            borderRadius: CSSObject['borderRadius']
        }
        segmented: {
            backgroundColor: CSSObject['backgroundColor']
            borderRadius: CSSObject['borderRadius']
        }
    }
    empty: {
        solid: {
            backgroundColor: CSSObject['backgroundColor']
        }
        segmented: {
            backgroundColor: CSSObject['backgroundColor']
            backgroundImage: CSSObject['backgroundImage']
            backgroundSize: CSSObject['backgroundSize']
        }
    }
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    transition: string
}

const progressBarTokens: ProgressBarTokenType = {
    container: {
        borderRadius: String(FOUNDATION_THEME.border.radius[8]),
        overflow: 'hidden',
    },
    height: {
        [ProgressBarSize.SMALL]: FOUNDATION_THEME.unit[12],
        [ProgressBarSize.MEDIUM]: FOUNDATION_THEME.unit[20],
    },
    fill: {
        solid: {
            backgroundColor: String(FOUNDATION_THEME.colors.primary[500]),
            borderRadius: String(FOUNDATION_THEME.border.radius[8]),
        },
        segmented: {
            backgroundColor: String(FOUNDATION_THEME.colors.primary[500]),
            borderRadius: String(FOUNDATION_THEME.border.radius[2]),
        },
    },
    empty: {
        solid: {
            backgroundColor: String(FOUNDATION_THEME.colors.gray[150]),
        },
        segmented: {
            backgroundColor: 'transparent',
            backgroundImage: `repeating-linear-gradient(
                to right,
                ${String(FOUNDATION_THEME.colors.gray[100])},
                ${String(FOUNDATION_THEME.colors.gray[100])} ${FOUNDATION_THEME.unit[2]},
                transparent ${FOUNDATION_THEME.unit[2]},
                transparent ${FOUNDATION_THEME.unit[8]}
            )`,
            backgroundSize: `${FOUNDATION_THEME.unit[10]} 100%`,
        },
    },
    label: {
        fontSize: String(FOUNDATION_THEME.font.size.body.md.fontSize),
        fontWeight: FOUNDATION_THEME.font.weight[500],
        color: String(FOUNDATION_THEME.colors.gray[600]),
    },
    transition: 'width 0.3s ease-in-out',
}

export default progressBarTokens
