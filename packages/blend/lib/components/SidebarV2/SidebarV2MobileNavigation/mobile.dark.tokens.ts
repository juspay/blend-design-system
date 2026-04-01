import { FoundationTokenType } from '../../../tokens/theme.token'
import {
    ResponsiveMobileNavigationV2Tokens,
    MobileNavigationV2TokenType,
} from './mobile.tokens'

export const getMobileNavigationV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMobileNavigationV2Tokens => {
    const baseTokens: MobileNavigationV2TokenType = {
        container: {
            zIndex: foundationToken.zIndex[1100],
            backgroundColor: foundationToken.colors.gray[900],
            opacity: 0.72,
            border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            borderWidth: foundationToken.border.width[1],
            borderRadius: foundationToken.border.radius[24],
            backdropFilter: 'blur(20px) saturate(180%)',
            transition:
                'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        layout: {
            safeAreaOffset: foundationToken.unit[8],
            floatingPadding: foundationToken.unit[16],
            primaryActionMarginX: foundationToken.unit[14],
            itemLabelMarginTop: foundationToken.unit[2],
            itemLabelLineHeight: '1',
            paddingTop: foundationToken.unit[4],
            paddingBottom: foundationToken.unit[4],
            paddingLeft: foundationToken.unit[24],
            paddingRight: foundationToken.unit[24],
            gap: foundationToken.unit[12],
            rowPaddingTop: foundationToken.unit[12],
            rowPaddingBottom: foundationToken.unit[12],
            rowPaddingLeft: foundationToken.unit[0],
            rowPaddingRight: foundationToken.unit[0],
            rowGap: foundationToken.unit[10],
        },
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
                default: foundationToken.colors.gray[500],
                active: foundationToken.colors.gray[100],
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
        rowPrimaryAction: {
            width: foundationToken.unit[48],
            height: foundationToken.unit[48],
            borderRadius: foundationToken.border.radius[28],
            background: `linear-gradient(135deg, ${foundationToken.colors.primary[500]} 0%, ${foundationToken.colors.primary[700]} 100%)`,
            boxShadow: foundationToken.shadows['2xl'],
            color: foundationToken.colors.gray[0],
            icon: {
                width: foundationToken.unit[24],
                height: foundationToken.unit[24],
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
