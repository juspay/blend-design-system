import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSidebarV2Tokens } from './sidebarV2.tokens.types'

export const getSidebarV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSidebarV2Tokens => {
    return {
        sm: {
            container: {
                zIndex: foundationToken.zIndex[99],
                backgroundColor: foundationToken.colors.gray[900],
                borderRight: `1px solid ${foundationToken.colors.gray[800]}`,
                maxWidth: {
                    withLeftPanel: '300px',
                    withoutLeftPanel: '250px',
                    iconOnly: foundationToken.unit[52],
                },
            },
            leftPanel: {
                width: '52px',
                backgroundColor: foundationToken.colors.gray[900],
                borderRight: `1px solid ${foundationToken.colors.gray[800]}`,
                paddingTop: foundationToken.unit[10],
                paddingBottom: foundationToken.unit[10],
                paddingLeft: foundationToken.unit[10],
                paddingRight: foundationToken.unit[10],
                gap: foundationToken.unit[16],
                item: {
                    width: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[4],
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[700]}`,
                        hover: `1px solid ${foundationToken.colors.gray[600]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: 'transparent',
                    },
                },
            },
            header: {
                zIndex: foundationToken.zIndex[10],
                backgroundColor: foundationToken.colors.gray[900],
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[8],
                paddingRight: foundationToken.unit[8],
                gap: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[800]}`,
                borderBottomWidth: foundationToken.border.width[1],
                scrolledBorderColor: foundationToken.colors.gray[800],
                toggleButton: {
                    borderRadius: foundationToken.border.radius[10],
                    padding: foundationToken.unit[9],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: foundationToken.colors.gray[800],
                    },
                    width: foundationToken.unit[16],
                    iconColor: foundationToken.colors.gray[100],
                },
            },
            directory: {
                gap: foundationToken.unit[24],
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
            },
            footer: {
                zIndex: foundationToken.zIndex[10],
                backgroundColor: foundationToken.colors.gray[900],
                gap: foundationToken.unit[12],
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[8],
                paddingRight: foundationToken.unit[8],
                borderTop: `1px solid ${foundationToken.colors.gray[800]}`,
            },
            primarySidebar: {
                width: '250px',
            },
            secondarySidebar: {
                width: '52px',
                borderRight: `1px solid ${foundationToken.colors.gray[800]}`,
                backgroundColor: foundationToken.colors.gray[900],
                gap: foundationToken.unit[16],
                paddingTop: foundationToken.unit[10],
                paddingBottom: foundationToken.unit[10],
                paddingLeft: foundationToken.unit[10],
                paddingRight: foundationToken.unit[10],
                item: {
                    width: foundationToken.unit[32],
                    height: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[4],
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[700]}`,
                        hover: `1px solid ${foundationToken.colors.gray[600]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: 'transparent',
                    },
                },
            },
        },
        lg: {
            container: {
                zIndex: foundationToken.zIndex[99],
                backgroundColor: foundationToken.colors.gray[900],
                borderRight: `1px solid ${foundationToken.colors.gray[800]}`,
                maxWidth: {
                    withLeftPanel: '320px',
                    withoutLeftPanel: '270px',
                    iconOnly: foundationToken.unit[52],
                },
            },
            leftPanel: {
                width: '52px',
                backgroundColor: foundationToken.colors.gray[900],
                borderRight: `1px solid ${foundationToken.colors.gray[800]}`,
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                gap: foundationToken.unit[16],
                item: {
                    width: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[6],
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[700]}`,
                        hover: `1px solid ${foundationToken.colors.gray[600]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: 'transparent',
                    },
                },
            },
            header: {
                zIndex: foundationToken.zIndex[10],
                backgroundColor: foundationToken.colors.gray[900],
                paddingTop: foundationToken.unit[6],
                paddingBottom: foundationToken.unit[6],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                gap: foundationToken.unit[16],
                borderBottom: `1px solid ${foundationToken.colors.gray[800]}`,
                borderBottomWidth: foundationToken.border.width[1],
                scrolledBorderColor: foundationToken.colors.gray[800],
                toggleButton: {
                    borderRadius: foundationToken.border.radius[10],
                    padding: foundationToken.unit[10],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: foundationToken.colors.gray[800],
                    },
                    width: foundationToken.unit[16],
                    iconColor: foundationToken.colors.gray[100],
                },
            },
            directory: {
                gap: foundationToken.unit[24],
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
            },
            footer: {
                zIndex: foundationToken.zIndex[10],
                backgroundColor: foundationToken.colors.gray[900],
                gap: foundationToken.unit[12],
                paddingTop: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[16],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                borderTop: `1px solid ${foundationToken.colors.gray[800]}`,
            },
            primarySidebar: {
                width: '250px',
            },
            secondarySidebar: {
                width: '52px',
                borderRight: `1px solid ${foundationToken.colors.gray[800]}`,
                backgroundColor: foundationToken.colors.gray[900],
                gap: foundationToken.unit[16],
                paddingTop: foundationToken.unit[10],
                paddingBottom: foundationToken.unit[10],
                paddingLeft: foundationToken.unit[10],
                paddingRight: foundationToken.unit[10],
                item: {
                    width: foundationToken.unit[32],
                    height: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[4],
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[700]}`,
                        hover: `1px solid ${foundationToken.colors.gray[600]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: 'transparent',
                    },
                },
            },
        },
    }
}
