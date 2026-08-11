import type { FoundationTokenType } from '../../../tokens/theme.token'
import type {
    MobileTokenType,
    ResponsiveMobileTokens,
} from './mobile.tokens.types'

const buildMobileDarkTokens = (
    foundationToken: FoundationTokenType
): MobileTokenType => {
    const surface = foundationToken.colors.gray[900]
    const fade = (direction: 'to bottom' | 'to top') =>
        `linear-gradient(${direction}, color-mix(in srgb, ${surface} 95%, transparent) 0%, color-mix(in srgb, ${surface} 70%, transparent) 50%, color-mix(in srgb, ${surface} 20%, transparent) 80%, transparent 100%)`

    return {
        picker: {
            itemHeight: foundationToken.unit[44],
            containerHeight: `calc(${foundationToken.unit[44]} * 3)`,
            divider: {
                width: foundationToken.unit[70],
                strokeColor: foundationToken.colors.gray[500],
                strokeColorEnd: foundationToken.colors.gray[900],
            },
            text: {
                selected: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[0],
                    opacity: 1,
                },
                unselected: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                    opacity: 0.6,
                },
            },
            title: {
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[12],
                },
                backgroundColor: foundationToken.colors.gray[900],
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                },
                fade: {
                    top: fade('to bottom'),
                    bottom: fade('to top'),
                },
            },
        },
        footer: {
            gap: foundationToken.unit[16],
            padding: {
                x: foundationToken.unit[8],
                y: foundationToken.unit[8],
            },
            borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            backgroundColor: foundationToken.colors.gray[900],
        },
        presets: {
            backgroundColor: foundationToken.colors.gray[900],
            hoverBackgroundColor: foundationToken.colors.gray[800],
            borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            padding: {
                x: foundationToken.unit[16],
                y: foundationToken.unit[12],
            },
            text: {
                default: foundationToken.colors.gray[200],
                selected: foundationToken.colors.gray[0],
                disabled: foundationToken.colors.gray[600],
            },
        },
        drawer: {
            backgroundColor: foundationToken.colors.gray[900],
        },
        padding: {
            x: foundationToken.unit[16],
            y: foundationToken.unit[0],
        },
        gap: foundationToken.unit[12],
        header: {
            backgroundColor: foundationToken.colors.gray[900],
            padding: {
                x: foundationToken.unit[12],
                y: foundationToken.unit[12],
            },
            text: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: foundationToken.colors.gray[400],
            },
        },
    }
}

export const getMobileDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMobileTokens => {
    const baseTokens = buildMobileDarkTokens(foundationToken)

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
