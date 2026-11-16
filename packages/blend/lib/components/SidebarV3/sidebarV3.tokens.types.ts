import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SidebarV3ItemInteractionStates = 'default' | 'hover' | 'active'

export type SidebarV3TokensType = {
    container: {
        zIndex: CSSObject['zIndex']
        backgroundColor: CSSObject['backgroundColor']
        borderRight: CSSObject['borderRight']
        hoverPreview: {
            boxShadow: CSSObject['boxShadow']
        }
        maxWidth: {
            withLeftPanel: CSSObject['maxWidth']
            withoutLeftPanel: CSSObject['maxWidth']
            iconOnly: CSSObject['maxWidth']
        }
    }
    leftPanel: {
        width: CSSObject['width']
        backgroundColor: CSSObject['backgroundColor']
        borderRight: CSSObject['borderRight']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        gap: CSSObject['gap']
        item: {
            width: CSSObject['width']
            borderRadius: CSSObject['borderRadius']
            border: {
                [key in SidebarV3ItemInteractionStates]: CSSObject['border']
            }
            backgroundColor: {
                [key in SidebarV3ItemInteractionStates]: CSSObject['backgroundColor']
            }
        }
    }
    header: {
        zIndex: CSSObject['zIndex']
        backgroundColor: CSSObject['backgroundColor']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        gap: CSSObject['gap']
        borderBottom: CSSObject['borderBottom']
        borderBottomWidth: CSSObject['borderWidth']
        scrolledBorderColor: CSSObject['color']
        toggleButton: {
            borderRadius: CSSObject['borderRadius']
            padding: CSSObject['padding']
            backgroundColor: {
                [key in SidebarV3ItemInteractionStates]: CSSObject['backgroundColor']
            }
            width: CSSObject['width']
            iconColor: CSSObject['color']
        }
    }
    directory: {
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
    }
    footer: {
        zIndex: CSSObject['zIndex']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        borderTop: CSSObject['borderTop']
    }
    primarySidebar: {
        width: CSSObject['width']
    }
    secondarySidebar: {
        width: CSSObject['width']
        borderRight: CSSObject['borderRight']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        item: {
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            border: {
                [key in SidebarV3ItemInteractionStates]: CSSObject['border']
            }
            backgroundColor: {
                [key in SidebarV3ItemInteractionStates]: CSSObject['backgroundColor']
            }
        }
    }
    frame: {
        stripHeight: CSSObject['height']
        stripPaddingInline: CSSObject['paddingInline']
        stripBackgroundColor: CSSObject['backgroundColor']
        stripColor: CSSObject['color']
        surfaceRadius: CSSObject['borderRadius']
        surfaceBackgroundColor: CSSObject['backgroundColor']
        surfaceColor: CSSObject['color']
    }
    search: { padding: CSSObject['padding'] }
    navigation: {
        hoverBackgroundColor: CSSObject['backgroundColor']
        selectedBackgroundColor: CSSObject['backgroundColor']
        selectedColor: CSSObject['color']
        separatorColor: CSSObject['color']
        separatorWidth: CSSObject['width']
        separatorOffset: CSSObject['top']
        guideColor: CSSObject['color']
        guideOffset: CSSObject['left']
        /** Nested disclosure transition; Euler D uses 150ms. Foundation has no motion scale. */
        motionDuration: CSSObject['transitionDuration']
        /** Row feedback transition; Euler D uses 200ms. */
        feedbackDuration: CSSObject['transitionDuration']
        /** Euler D easing; Foundation has no motion scale. */
        feedbackEasing: CSSObject['transitionTimingFunction']
    }
}

export type ResponsiveSidebarV3Tokens = {
    [key in keyof BreakpointType]: SidebarV3TokensType
}
