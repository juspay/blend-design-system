import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveSidebarV2Tokens } from './sidebarV2.tokens'

export const getSidebarV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSidebarV2Tokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[25],
            primarySidebar: {
                width: '302px',
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[25],
                padding: {
                    top: foundationToken.unit[12],
                    bottom: foundationToken.unit[12],
                    left: foundationToken.unit[8],
                    right: foundationToken.unit[8],
                },
            },
            secondarySidebar: {
                width: '52px',
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[25],
                gap: foundationToken.unit[16],
                padding: {
                    top: foundationToken.unit[10],
                    bottom: foundationToken.unit[10],
                    left: foundationToken.unit[10],
                    right: foundationToken.unit[10],
                },
                item: {
                    width: foundationToken.unit[32],
                    height: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[4],
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[150]}`,
                        hover: `1px solid ${foundationToken.colors.gray[200]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: 'transparent',
                    },
                },
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[25],
            primarySidebar: {
                width: '302px',
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[25],
                padding: {
                    top: foundationToken.unit[12],
                    bottom: foundationToken.unit[12],
                    left: foundationToken.unit[8],
                    right: foundationToken.unit[8],
                },
            },
            secondarySidebar: {
                width: '52px',
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[25],
                gap: foundationToken.unit[16],
                padding: {
                    top: foundationToken.unit[10],
                    bottom: foundationToken.unit[10],
                    left: foundationToken.unit[10],
                    right: foundationToken.unit[10],
                },
                item: {
                    width: foundationToken.unit[32],
                    height: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[4],
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[150]}`,
                        hover: `1px solid ${foundationToken.colors.gray[200]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: 'transparent',
                    },
                },
            },
        },
    }
}
