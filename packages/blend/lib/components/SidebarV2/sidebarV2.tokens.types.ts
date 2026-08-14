import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type SidebarV2ItemInteractionStates = 'default' | 'hover' | 'active'

export type SidebarV2TokensType = {
    container: {
        zIndex: CSSObject['zIndex']
        backgroundColor: CSSObject['backgroundColor']
        borderRight: CSSObject['borderRight']
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
                [key in SidebarV2ItemInteractionStates]: CSSObject['border']
            }
            backgroundColor: {
                [key in SidebarV2ItemInteractionStates]: CSSObject['backgroundColor']
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
                [key in SidebarV2ItemInteractionStates]: CSSObject['backgroundColor']
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
                [key in SidebarV2ItemInteractionStates]: CSSObject['border']
            }
            backgroundColor: {
                [key in SidebarV2ItemInteractionStates]: CSSObject['backgroundColor']
            }
        }
    }
}

export type ResponsiveSidebarV2Tokens = {
    [key in keyof BreakpointType]: SidebarV2TokensType
}
