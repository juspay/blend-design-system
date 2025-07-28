import { FOUNDATION_THEME } from '../../tokens'
import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'

export type DrawerTokensType = {
    overlay: {
        backgroundColor: CSSObject['backgroundColor']
        zIndex: CSSObject['zIndex']
    }
    content: {
        backgroundColor: CSSObject['backgroundColor']
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        zIndex: CSSObject['zIndex']
        border: CSSObject['border']
    }
    mobileOffset: {
        top: CSSObject['top']
        bottom: CSSObject['bottom']
        left: CSSObject['left']
        right: CSSObject['right']
    }
    handle: {
        backgroundColor: CSSObject['backgroundColor']
        borderRadius: CSSObject['borderRadius']
        width: CSSObject['width']
        height: CSSObject['height']
    }
    header: {
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']
        backgroundColor: CSSObject['backgroundColor']
        title: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
        }
        description: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            lineHeight: CSSObject['lineHeight']
        }
    }
    body: {
        padding: CSSObject['padding']
        backgroundColor: CSSObject['backgroundColor']
        overflowY: CSSObject['overflowY']
    }
    footer: {
        padding: CSSObject['padding']
        borderTop: CSSObject['borderTop']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
        alignItems: CSSObject['alignItems']
        justifyContent: CSSObject['justifyContent']
    }
}

export const drawerTokens: DrawerTokensType = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9998,
    },
    content: {
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        borderRadius: FOUNDATION_THEME.border.radius[16],
        boxShadow: FOUNDATION_THEME.shadows.xl,
        zIndex: 9999,
        border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    },
    mobileOffset: {
        top: '74px',
        bottom: '16px',
        left: '16px',
        right: '16px',
    },
    handle: {
        backgroundColor: FOUNDATION_THEME.colors.gray[300],
        borderRadius: FOUNDATION_THEME.border.radius.full,
        width: '48px',
        height: '6px',
    },
    header: {
        padding: FOUNDATION_THEME.unit[16],
        borderBottom: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        title: {
            color: FOUNDATION_THEME.colors.gray[900],
            fontSize: FOUNDATION_THEME.font.size.heading.md.fontSize,
            fontWeight: FOUNDATION_THEME.font.weight[600],
            lineHeight: FOUNDATION_THEME.font.size.heading.md.lineHeight,
        },
        description: {
            color: FOUNDATION_THEME.colors.gray[600],
            fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
            lineHeight: FOUNDATION_THEME.font.size.body.md.lineHeight,
        },
    },
    body: {
        padding: FOUNDATION_THEME.unit[16],
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        overflowY: 'auto',
    },
    footer: {
        padding: FOUNDATION_THEME.unit[16],
        borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        gap: FOUNDATION_THEME.unit[12],
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
}

export const getDrawerComponentTokens = (
    foundationToken: FoundationTokenType
): DrawerTokensType => {
    return {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9998,
        },
        content: {
            backgroundColor: foundationToken.colors.gray[0],
            borderRadius: foundationToken.border.radius[16],
            boxShadow: foundationToken.shadows.xl,
            zIndex: 9999,
            border: `1px solid ${foundationToken.colors.gray[200]}`,
        },
        mobileOffset: {
            top: '74px',
            bottom: '16px',
            left: '16px',
            right: '16px',
        },
        handle: {
            backgroundColor: foundationToken.colors.gray[300],
            borderRadius: foundationToken.border.radius.full,
            width: '48px',
            height: '6px',
        },
        header: {
            padding: foundationToken.unit[16],
            borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: foundationToken.colors.gray[0],
            title: {
                color: foundationToken.colors.gray[900],
                fontSize: foundationToken.font.size.heading.md.fontSize,
                fontWeight: foundationToken.font.weight[600],
                lineHeight: foundationToken.font.size.heading.md.lineHeight,
            },
            description: {
                color: foundationToken.colors.gray[600],
                fontSize: foundationToken.font.size.body.md.fontSize,
                lineHeight: foundationToken.font.size.body.md.lineHeight,
            },
        },
        body: {
            padding: foundationToken.unit[16],
            backgroundColor: foundationToken.colors.gray[0],
            overflowY: 'auto',
        },
        footer: {
            padding: foundationToken.unit[16],
            borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: foundationToken.colors.gray[0],
            gap: foundationToken.unit[12],
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    }
}

export default drawerTokens
