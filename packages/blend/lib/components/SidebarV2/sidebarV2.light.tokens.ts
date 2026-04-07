import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveSidebarV2Tokens } from './sidebarV2.tokens'

export const getSidebarV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSidebarV2Tokens => {
    return {
        sm: {
            container: {
                zIndex: foundationToken.zIndex[99],
                backgroundColor: foundationToken.colors.gray[25],
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                hoverPreview: {
                    boxShadow: foundationToken.shadows['lg'],
                },
                maxWidth: {
                    withLeftPanel: '300px',
                    withoutLeftPanel: '250px',
                    iconOnly: foundationToken.unit[52],
                },
            },
            leftPanel: {
                width: '52px',
                backgroundColor: foundationToken.colors.gray[25],
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                paddingTop: foundationToken.unit[10],
                paddingBottom: foundationToken.unit[10],
                paddingLeft: foundationToken.unit[10],
                paddingRight: foundationToken.unit[10],
                gap: foundationToken.unit[16],
                item: {
                    width: foundationToken.unit[32],
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
            header: {
                zIndex: foundationToken.zIndex[10],
                backgroundColor: foundationToken.colors.gray[25],
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[8],
                paddingRight: foundationToken.unit[8],
                gap: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                borderBottomWidth: foundationToken.border.width[1],
                scrolledBorderColor: foundationToken.colors.gray[200],
                toggleButton: {
                    borderRadius: foundationToken.border.radius[10],
                    padding: foundationToken.unit[9],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[100],
                        active: foundationToken.colors.gray[100],
                    },
                    width: foundationToken.unit[16],
                    iconColor: foundationToken.colors.gray[600],
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
                backgroundColor: foundationToken.colors.gray[25],
                gap: foundationToken.unit[12],
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[8],
                paddingRight: foundationToken.unit[8],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            primarySidebar: {
                width: '250px',
            },
            secondarySidebar: {
                width: '52px',
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[25],
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
            container: {
                zIndex: foundationToken.zIndex[99],
                backgroundColor: foundationToken.colors.gray[25],
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                hoverPreview: {
                    boxShadow: foundationToken.shadows['lg'],
                },
                maxWidth: {
                    withLeftPanel: '320px',
                    withoutLeftPanel: '270px',
                    iconOnly: foundationToken.unit[52],
                },
            },
            leftPanel: {
                width: '52px',
                backgroundColor: foundationToken.colors.gray[25],
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                gap: foundationToken.unit[16],
                item: {
                    width: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[6],
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
            header: {
                zIndex: foundationToken.zIndex[10],
                backgroundColor: foundationToken.colors.gray[25],
                paddingTop: foundationToken.unit[6],
                paddingBottom: foundationToken.unit[6],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                gap: foundationToken.unit[16],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                borderBottomWidth: foundationToken.border.width[1],
                scrolledBorderColor: foundationToken.colors.gray[200],
                toggleButton: {
                    borderRadius: foundationToken.border.radius[10],
                    padding: foundationToken.unit[10],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[100],
                        active: foundationToken.colors.gray[100],
                    },
                    width: foundationToken.unit[16],
                    iconColor: foundationToken.colors.gray[600],
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
                backgroundColor: foundationToken.colors.gray[25],
                gap: foundationToken.unit[12],
                paddingTop: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[16],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            primarySidebar: {
                width: '250px',
            },
            secondarySidebar: {
                width: '52px',
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[25],
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
