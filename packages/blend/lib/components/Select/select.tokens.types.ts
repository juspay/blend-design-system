import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type SelectTokenTypes = {
    trigger: {
        container: {
            gap: CSSObject['gap']
        }
        label: {
            color: CSSObject['color']
            fontWeight: CSSObject['fontWeight']
            fontSize: CSSObject['fontSize']
        }
        selectedValue: {
            color: CSSObject['color']
            font: {
                weight: CSSObject['fontWeight']
                size: {
                    sm: string
                    md: string
                    lg: string
                }
            }
            padding: {
                sm: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
                md: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
                lg: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }
    }
    container: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
    }
    item: {
        selectedBackgroundColor: CSSObject['backgroundColor']
        hoverBackgroundColor: CSSObject['backgroundColor']
        highlightedBackgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
        selectedColor: CSSObject['color']
        subLabelColor: CSSObject['color']
        checkmarkColor: CSSObject['color']
    }
    groupLabel: {
        color: CSSObject['color']
    }
    subTrigger: {
        hoverBackgroundColor: CSSObject['backgroundColor']
        highlightedBackgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
        subLabelColor: CSSObject['color']
    }
    subContent: {
        backgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
    }
    separator: {
        backgroundColor: CSSObject['backgroundColor']
    }
    triggerColors: {
        backgroundColor: CSSObject['backgroundColor']
        hoverBackgroundColor: CSSObject['backgroundColor']
        focusBackgroundColor: CSSObject['backgroundColor']
        outlineBorder: CSSObject['border']
        outlineBorderFocus: CSSObject['border']
        caretColor: CSSObject['color']
        chevronIconColor: CSSObject['color']
        placeholderColor: CSSObject['color']
    }
    clearButton: {
        backgroundColor: CSSObject['backgroundColor']
        hoverBackgroundColor: CSSObject['backgroundColor']
        focusBackgroundColor: CSSObject['backgroundColor']
        outlineBorder: CSSObject['border']
        outlineBorderFocus: CSSObject['border']
        iconColor: CSSObject['color']
    }
    labelColors: {
        subLabel: CSSObject['color']
        hintText: CSSObject['color']
        required: CSSObject['color']
        helpIcon: CSSObject['color']
    }
    selectionTag: {
        backgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
    }
    selectedLabels: {
        color: CSSObject['color']
    }
}

export type SelectTokensType = SelectTokenTypes

export type ResponsiveSelectTokens = {
    [key in keyof BreakpointType]: SelectTokenTypes
}
