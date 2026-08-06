import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSelectTokens } from './select.tokens.types'
import { SelectMenuSize } from './types'

const block = (foundationToken: FoundationTokenType) => ({
    trigger: {
        container: {
            gap: foundationToken.unit[8],
        },
        label: {
            color: foundationToken.colors.gray[700],
            fontWeight: 500,
            fontSize: 14,
        },
        selectedValue: {
            color: foundationToken.colors.gray[700],
            font: {
                weight: 500,
                size: {
                    [SelectMenuSize.SMALL]: 'body.sm',
                    [SelectMenuSize.MEDIUM]: 'body.md',
                    [SelectMenuSize.LARGE]: 'body.md',
                },
            },
            padding: {
                [SelectMenuSize.SMALL]: {
                    x: foundationToken.unit[14],
                    y: foundationToken.unit[6],
                },
                [SelectMenuSize.MEDIUM]: {
                    x: foundationToken.unit[14],
                    y: foundationToken.unit[8],
                },
                [SelectMenuSize.LARGE]: {
                    x: foundationToken.unit[14],
                    y: foundationToken.unit[10],
                },
            },
        },
    },
    container: {
        backgroundColor: foundationToken.colors.gray[0],
        border: `1px solid ${foundationToken.colors.gray[200]}`,
    },
    item: {
        selectedBackgroundColor: foundationToken.colors.primary[50],
        hoverBackgroundColor: foundationToken.colors.gray[50],
        highlightedBackgroundColor: foundationToken.colors.gray[50],
        color: foundationToken.colors.gray[600],
        selectedColor: foundationToken.colors.primary[500],
        subLabelColor: foundationToken.colors.gray[400],
        checkmarkColor: foundationToken.colors.gray[600],
    },
    groupLabel: {
        color: foundationToken.colors.gray[400],
    },
    subTrigger: {
        hoverBackgroundColor: foundationToken.colors.gray[50],
        highlightedBackgroundColor: foundationToken.colors.gray[50],
        color: foundationToken.colors.gray[600],
        subLabelColor: foundationToken.colors.gray[400],
    },
    subContent: {
        backgroundColor: foundationToken.colors.gray[0],
        color: foundationToken.colors.gray[700],
    },
    separator: {
        backgroundColor: foundationToken.colors.gray[200],
    },
    triggerColors: {
        backgroundColor: foundationToken.colors.gray[0],
        hoverBackgroundColor: foundationToken.colors.gray[50],
        focusBackgroundColor: foundationToken.colors.gray[0],
        outlineBorder: `1px solid ${foundationToken.colors.gray[200]}`,
        outlineBorderFocus: `1px solid ${foundationToken.colors.gray[400]}`,
        caretColor: foundationToken.colors.gray[700],
        chevronIconColor: foundationToken.colors.gray[400],
        placeholderColor: foundationToken.colors.gray[600],
    },
    clearButton: {
        backgroundColor: foundationToken.colors.gray[0],
        hoverBackgroundColor: foundationToken.colors.gray[25],
        focusBackgroundColor: foundationToken.colors.gray[25],
        outlineBorder: `1px solid ${foundationToken.colors.gray[200]}`,
        outlineBorderFocus: `1px solid ${foundationToken.colors.gray[400]}`,
        iconColor: foundationToken.colors.gray[400],
    },
    labelColors: {
        subLabel: foundationToken.colors.gray[400],
        hintText: foundationToken.colors.gray[400],
        required: foundationToken.colors.red[500],
        helpIcon: foundationToken.colors.gray[400],
    },
    selectionTag: {
        backgroundColor: foundationToken.colors.primary[600],
        color: foundationToken.colors.gray[0],
    },
    selectedLabels: {
        color: foundationToken.colors.gray[400],
    },
})

export const getSelectLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSelectTokens => {
    return {
        sm: block(foundationToken),
        lg: block(foundationToken),
    }
}
