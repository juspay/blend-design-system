import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSelectTokens } from './select.tokens.types'
import { SelectMenuSize } from './types'

const block = (foundationToken: FoundationTokenType) => ({
    trigger: {
        container: {
            gap: foundationToken.unit[8],
        },
        label: {
            color: foundationToken.colors.gray[100],
            fontWeight: 500,
            fontSize: 14,
        },
        selectedValue: {
            color: foundationToken.colors.gray[100],
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
        backgroundColor: foundationToken.colors.gray[900],
        border: `1px solid ${foundationToken.colors.gray[800]}`,
    },
    item: {
        selectedBackgroundColor: foundationToken.colors.gray[800],
        hoverBackgroundColor: foundationToken.colors.gray[800],
        highlightedBackgroundColor: foundationToken.colors.gray[800],
        color: foundationToken.colors.gray[400],
        selectedColor: foundationToken.colors.gray[100],
        subLabelColor: foundationToken.colors.gray[500],
        checkmarkColor: foundationToken.colors.gray[400],
    },
    groupLabel: {
        color: foundationToken.colors.gray[500],
    },
    subTrigger: {
        hoverBackgroundColor: foundationToken.colors.gray[800],
        highlightedBackgroundColor: foundationToken.colors.gray[800],
        color: foundationToken.colors.gray[400],
        subLabelColor: foundationToken.colors.gray[500],
    },
    subContent: {
        backgroundColor: foundationToken.colors.gray[900],
        color: foundationToken.colors.gray[100],
    },
    separator: {
        backgroundColor: foundationToken.colors.gray[800],
    },
    triggerColors: {
        backgroundColor: foundationToken.colors.gray[900],
        hoverBackgroundColor: foundationToken.colors.gray[800],
        focusBackgroundColor: foundationToken.colors.gray[900],
        outlineBorder: `1px solid ${foundationToken.colors.gray[800]}`,
        outlineBorderFocus: `1px solid ${foundationToken.colors.gray[700]}`,
        caretColor: foundationToken.colors.gray[100],
        chevronIconColor: foundationToken.colors.gray[500],
        placeholderColor: foundationToken.colors.gray[500],
    },
    clearButton: {
        backgroundColor: foundationToken.colors.gray[900],
        hoverBackgroundColor: foundationToken.colors.gray[800],
        focusBackgroundColor: foundationToken.colors.gray[800],
        outlineBorder: `1px solid ${foundationToken.colors.gray[800]}`,
        outlineBorderFocus: `1px solid ${foundationToken.colors.gray[700]}`,
        iconColor: foundationToken.colors.gray[500],
    },
    labelColors: {
        subLabel: foundationToken.colors.gray[500],
        hintText: foundationToken.colors.gray[500],
        required: foundationToken.colors.red[400],
        helpIcon: foundationToken.colors.gray[500],
    },
    selectionTag: {
        backgroundColor: foundationToken.colors.primary[400],
        color: foundationToken.colors.gray[900],
    },
    selectedLabels: {
        color: foundationToken.colors.gray[500],
    },
})

export const getSelectDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSelectTokens => {
    return {
        sm: block(foundationToken),
        lg: block(foundationToken),
    }
}
