import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { AutocompleteState, AutocompleteSize } from './types'

export type AutocompleteTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in AutocompleteState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in AutocompleteState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in AutocompleteState]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    required: {
        color: CSSObject['color']
    }
    inputContainer: {
        padding: {
            x: { [key in AutocompleteSize]: CSSObject['padding'] }
            y: { [key in AutocompleteSize]: CSSObject['padding'] }
        }
        gap: CSSObject['gap']
        borderRadius: { [key in AutocompleteSize]: CSSObject['borderRadius'] }
        border: {
            [key in AutocompleteState]: CSSObject['border']
        }
        outline: CSSObject['outline']
        backgroundColor: {
            [key in AutocompleteState]: CSSObject['backgroundColor']
        }
        color: {
            [key in AutocompleteState]: CSSObject['color']
        }
        fontSize: { [key in AutocompleteSize]: CSSObject['fontSize'] }
        fontWeight: { [key in AutocompleteSize]: CSSObject['fontWeight'] }
    }
    icon: {
        color: {
            [key in AutocompleteState]: CSSObject['color']
        }
        width: CSSObject['width']
    }
    clearButton: {
        color: {
            default: CSSObject['color']
            hover: CSSObject['color']
        }
        size: CSSObject['width']
    }
    dropdown: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        maxHeight: CSSObject['maxHeight']
        padding: CSSObject['padding']
    }
    option: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            default: CSSObject['color']
            hover: CSSObject['color']
            selected: CSSObject['color']
            disabled: CSSObject['color']
        }
        backgroundColor: {
            default: CSSObject['backgroundColor']
            hover: CSSObject['backgroundColor']
            selected: CSSObject['backgroundColor']
        }
        borderRadius: CSSObject['borderRadius']
    }
    groupLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
    }
    noOptions: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
        padding: CSSObject['padding']
    }
    tag: {
        backgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        gap: CSSObject['gap']
        borderRadius: CSSObject['borderRadius']
    }
}

export type ResponsiveAutocompleteTokens = {
    [key in keyof BreakpointType]: AutocompleteTokensType
}

export const getAutocompleteTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveAutocompleteTokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[500],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[600],
            },
            required: {
                color: foundationTokens.colors.red[600],
            },
            inputContainer: {
                padding: {
                    x: {
                        small: foundationTokens.unit[8],
                        medium: foundationTokens.unit[12],
                        large: foundationTokens.unit[16],
                    },
                    y: {
                        small: foundationTokens.unit[6],
                        medium: foundationTokens.unit[8],
                        large: foundationTokens.unit[10],
                    },
                },
                gap: foundationTokens.unit[8],
                borderRadius: {
                    small: foundationTokens.unit[6],
                    medium: foundationTokens.unit[8],
                    large: foundationTokens.unit[8],
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[300]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                },
                outline: 'none',
                backgroundColor: {
                    default: 'white',
                    hover: 'white',
                    focus: 'rgba(239, 246, 255, 0.15)',
                    disabled: foundationTokens.colors.gray[50],
                    error: 'white',
                },
                color: {
                    default: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[800],
                },
                fontSize: {
                    small: foundationTokens.font.size.body.sm.fontSize,
                    medium: foundationTokens.font.size.body.md.fontSize,
                    large: foundationTokens.font.size.body.lg.fontSize,
                },
                fontWeight: {
                    small: foundationTokens.font.weight[400],
                    medium: foundationTokens.font.weight[500],
                    large: foundationTokens.font.weight[500],
                },
            },
            icon: {
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[600],
                    focus: foundationTokens.colors.primary[500],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[500],
                },
                width: foundationTokens.unit[16],
            },
            clearButton: {
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[600],
                },
                size: foundationTokens.unit[16],
            },
            dropdown: {
                backgroundColor: 'white',
                border: `1px solid ${foundationTokens.colors.gray[200]}`,
                borderRadius: foundationTokens.unit[8],
                boxShadow: foundationTokens.shadows.lg,
                maxHeight: '300px',
                padding: foundationTokens.unit[4],
            },
            option: {
                padding: {
                    x: foundationTokens.unit[12],
                    y: foundationTokens.unit[8],
                },
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[900],
                    selected: foundationTokens.colors.primary[700],
                    disabled: foundationTokens.colors.gray[400],
                },
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationTokens.colors.gray[50],
                    selected: foundationTokens.colors.primary[50],
                },
                borderRadius: foundationTokens.unit[6],
            },
            groupLabel: {
                fontSize: foundationTokens.font.size.body.sm.fontSize,
                fontWeight: foundationTokens.font.weight[600],
                color: foundationTokens.colors.gray[500],
                padding: {
                    x: foundationTokens.unit[12],
                    y: foundationTokens.unit[6],
                },
            },
            noOptions: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: foundationTokens.colors.gray[500],
                padding: foundationTokens.unit[12],
            },
            tag: {
                backgroundColor: foundationTokens.colors.primary[50],
                color: foundationTokens.colors.primary[700],
                fontSize: foundationTokens.font.size.body.sm.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                padding: {
                    x: foundationTokens.unit[8],
                    y: foundationTokens.unit[4],
                },
                gap: foundationTokens.unit[4],
                borderRadius: foundationTokens.unit[4],
            },
        },
        lg: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[500],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[600],
            },
            required: {
                color: foundationTokens.colors.red[600],
            },
            inputContainer: {
                padding: {
                    x: {
                        small: foundationTokens.unit[8],
                        medium: foundationTokens.unit[12],
                        large: foundationTokens.unit[16],
                    },
                    y: {
                        small: foundationTokens.unit[6],
                        medium: foundationTokens.unit[8],
                        large: foundationTokens.unit[10],
                    },
                },
                gap: foundationTokens.unit[8],
                borderRadius: {
                    small: foundationTokens.unit[6],
                    medium: foundationTokens.unit[8],
                    large: foundationTokens.unit[8],
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[300]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                },
                outline: 'none',
                backgroundColor: {
                    default: 'white',
                    hover: 'white',
                    focus: 'rgba(239, 246, 255, 0.15)',
                    disabled: foundationTokens.colors.gray[50],
                    error: 'white',
                },
                color: {
                    default: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[800],
                },
                fontSize: {
                    small: foundationTokens.font.size.body.sm.fontSize,
                    medium: foundationTokens.font.size.body.md.fontSize,
                    large: foundationTokens.font.size.body.lg.fontSize,
                },
                fontWeight: {
                    small: foundationTokens.font.weight[400],
                    medium: foundationTokens.font.weight[500],
                    large: foundationTokens.font.weight[500],
                },
            },
            icon: {
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[600],
                    focus: foundationTokens.colors.primary[500],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[500],
                },
                width: foundationTokens.unit[16],
            },
            clearButton: {
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[600],
                },
                size: foundationTokens.unit[16],
            },
            dropdown: {
                backgroundColor: 'white',
                border: `1px solid ${foundationTokens.colors.gray[200]}`,
                borderRadius: foundationTokens.unit[8],
                boxShadow: foundationTokens.shadows.lg,
                maxHeight: '300px',
                padding: foundationTokens.unit[4],
            },
            option: {
                padding: {
                    x: foundationTokens.unit[12],
                    y: foundationTokens.unit[8],
                },
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[900],
                    selected: foundationTokens.colors.primary[700],
                    disabled: foundationTokens.colors.gray[400],
                },
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationTokens.colors.gray[50],
                    selected: foundationTokens.colors.primary[50],
                },
                borderRadius: foundationTokens.unit[6],
            },
            groupLabel: {
                fontSize: foundationTokens.font.size.body.sm.fontSize,
                fontWeight: foundationTokens.font.weight[600],
                color: foundationTokens.colors.gray[500],
                padding: {
                    x: foundationTokens.unit[12],
                    y: foundationTokens.unit[6],
                },
            },
            noOptions: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: foundationTokens.colors.gray[500],
                padding: foundationTokens.unit[12],
            },
            tag: {
                backgroundColor: foundationTokens.colors.primary[50],
                color: foundationTokens.colors.primary[700],
                fontSize: foundationTokens.font.size.body.sm.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                padding: {
                    x: foundationTokens.unit[8],
                    y: foundationTokens.unit[4],
                },
                gap: foundationTokens.unit[4],
                borderRadius: foundationTokens.unit[4],
            },
        },
    }
}

export default getAutocompleteTokens
