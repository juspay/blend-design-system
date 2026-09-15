import type { FoundationTokenType } from '../../../tokens/theme.token'
import type {
    MobileTokenType,
    ResponsiveMobileTokens,
} from './mobile.tokens.types'

const buildMobileLightTokens = (
    foundationToken: FoundationTokenType
): MobileTokenType => ({
    picker: {
        itemHeight: foundationToken.unit[44],
        containerHeight: `calc(${foundationToken.unit[44]} * 3)`,
        divider: {
            width: foundationToken.unit[70],
            strokeColor: foundationToken.colors.gray[500],
            strokeColorEnd: foundationToken.colors.gray[0],
        },
        text: {
            selected: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[900],
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
            backgroundColor: foundationToken.colors.gray[0],
            text: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: foundationToken.colors.gray[500],
            },
            fade: {
                top: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
                bottom: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
            },
        },
    },
    footer: {
        gap: foundationToken.unit[16],
        padding: {
            x: foundationToken.unit[8],
            y: foundationToken.unit[8],
        },
        borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        backgroundColor: foundationToken.colors.gray[0],
    },
    presets: {
        backgroundColor: foundationToken.colors.gray[0],
        hoverBackgroundColor: foundationToken.colors.gray[50],
        borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[150]}`,
        padding: {
            x: foundationToken.unit[16],
            y: foundationToken.unit[12],
        },
        text: {
            default: foundationToken.colors.gray[600],
            selected: foundationToken.colors.gray[700],
            disabled: foundationToken.colors.gray[400],
        },
    },
    drawer: {
        backgroundColor: foundationToken.colors.gray[0],
    },
    padding: {
        x: foundationToken.unit[16],
        y: foundationToken.unit[0],
    },
    gap: foundationToken.unit[12],
    header: {
        backgroundColor: foundationToken.colors.gray[0],
        padding: {
            x: foundationToken.unit[12],
            y: foundationToken.unit[12],
        },
        text: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[400],
            color: foundationToken.colors.gray[500],
        },
    },
})

export const getMobileLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMobileTokens => {
    const baseTokens = buildMobileLightTokens(foundationToken)

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
