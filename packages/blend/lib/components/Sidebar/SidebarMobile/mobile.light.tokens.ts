import { FoundationTokenType } from '../../../tokens/theme.token'
import type {
    ResponsiveMobileNavigationTokens,
    MobileNavigationTokenType,
} from './mobile.tokens.types'

export const getMobileNavigationLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMobileNavigationTokens => {
    const baseTokens: MobileNavigationTokenType = {
        container: {
            backgroundColor: `${foundationToken.colors.gray[0]}B8`,
            background: `${foundationToken.colors.gray[0]}B3`,
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[24],
            backdropFilter: 'blur(20px) saturate(180%)',
            zIndex: 1050,
            transition:
                'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        backgroundColor: foundationToken.colors.gray[0],
        drawer: {
            borderRadius: foundationToken.border.radius[24],
            borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
        },
        padding: {
            x: foundationToken.unit[24],
            y: foundationToken.unit[4],
        },
        gap: foundationToken.unit[12],
        row: {
            padding: {
                x: foundationToken.unit[0],
                y: foundationToken.unit[12],
            },
            gap: foundationToken.unit[10],
            item: {
                width: foundationToken.unit[56],
                height: foundationToken.unit[48],
                borderRadius: foundationToken.border.radius[24],
                gap: foundationToken.unit[4],
                backgroundColor: {
                    default: 'transparent',
                    active: 'transparent',
                },
                color: {
                    default: foundationToken.colors.gray[400],
                    active: foundationToken.colors.gray[800],
                },
                fontWeight: foundationToken.font.weight[500],
                icon: {
                    width: foundationToken.unit[20],
                    height: foundationToken.unit[20],
                    borderRadius: foundationToken.border.radius[12],
                    transition: 'color 0.2s ease',
                },
                text: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    textAlign: 'center',
                },
            },
            primaryAction: {
                width: foundationToken.unit[48],
                height: foundationToken.unit[48],
                borderRadius: foundationToken.border.radius[28],
                background: `linear-gradient(135deg, ${foundationToken.colors.primary[400]} 0%, ${foundationToken.colors.primary[600]} 100%)`,
                boxShadow: foundationToken.shadows['2xl'],
                color: foundationToken.colors.gray[0],
                icon: {
                    width: '24px',
                    height: '24px',
                },
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
