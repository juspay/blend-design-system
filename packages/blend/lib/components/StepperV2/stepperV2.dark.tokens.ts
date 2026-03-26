import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveStepperV2Tokens } from './stepperV2.tokens'

export const getStepperV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveStepperV2Tokens => {
    return {
        sm: {
            container: {
                gap: 6,
                step: {
                    circle: {
                        completed: {
                            default: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        current: {
                            default: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        pending: {
                            default: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[100],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        disabled: {
                            default: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            disabled: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        skipped: {
                            default: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                    },
                    icon: {
                        completed: {
                            default: {
                                color: foundationToken.colors.gray[600],
                            },
                            hover: { color: foundationToken.colors.gray[600] },
                            focus: { color: foundationToken.colors.gray[600] },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                            },
                        },
                        current: {
                            default: {
                                color: foundationToken.colors.gray[600],
                            },
                            hover: { color: foundationToken.colors.gray[600] },
                            focus: { color: foundationToken.colors.gray[600] },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                            },
                        },
                        pending: {
                            default: {
                                color: foundationToken.colors.gray[400],
                            },
                            hover: { color: foundationToken.colors.gray[400] },
                            focus: { color: foundationToken.colors.gray[400] },
                            disabled: {
                                color: foundationToken.colors.gray[400],
                            },
                        },
                        disabled: {
                            default: {
                                color: foundationToken.colors.gray[300],
                            },
                            hover: { color: foundationToken.colors.gray[300] },
                            focus: { color: foundationToken.colors.gray[300] },
                            disabled: {
                                color: foundationToken.colors.gray[300],
                            },
                        },
                        skipped: {
                            default: {
                                color: foundationToken.colors.gray[600],
                            },
                            hover: { color: foundationToken.colors.gray[600] },
                            focus: { color: foundationToken.colors.gray[600] },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                            },
                        },
                    },
                },
                connector: {
                    line: {
                        active: {
                            default: {
                                color: foundationToken.colors.gray[300],
                                height: '1px',
                            },
                        },
                        inactive: {
                            default: {
                                color: foundationToken.colors.gray[300],
                                height: '1px',
                            },
                        },
                    },
                },
                title: {
                    text: {
                        completed: {
                            default: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        current: {
                            default: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        pending: {
                            default: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        disabled: {
                            default: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        skipped: {
                            default: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                    },
                },
            },
        },
        lg: {
            container: {
                gap: 6,
                step: {
                    circle: {
                        completed: {
                            default: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        current: {
                            default: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        pending: {
                            default: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[100],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        disabled: {
                            default: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            disabled: {
                                backgroundColor: foundationToken.colors.gray[0],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                        skipped: {
                            default: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            hover: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                            focus: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: `2px solid ${foundationToken.colors.gray[400]}`,
                                outlineOffset: '2px',
                            },
                            disabled: {
                                backgroundColor:
                                    foundationToken.colors.gray[200],
                                borderColor: foundationToken.colors.gray[300],
                                borderWidth: '1px',
                                borderRadius: '50%',
                                size: '28px',
                                transition: 'all 0.2s ease-in-out',
                                outline: 'none',
                                outlineOffset: '0px',
                            },
                        },
                    },
                    icon: {
                        completed: {
                            default: {
                                color: foundationToken.colors.gray[600],
                            },
                            hover: { color: foundationToken.colors.gray[600] },
                            focus: { color: foundationToken.colors.gray[600] },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                            },
                        },
                        current: {
                            default: {
                                color: foundationToken.colors.gray[600],
                            },
                            hover: { color: foundationToken.colors.gray[600] },
                            focus: { color: foundationToken.colors.gray[600] },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                            },
                        },
                        pending: {
                            default: {
                                color: foundationToken.colors.gray[400],
                            },
                            hover: { color: foundationToken.colors.gray[400] },
                            focus: { color: foundationToken.colors.gray[400] },
                            disabled: {
                                color: foundationToken.colors.gray[400],
                            },
                        },
                        disabled: {
                            default: {
                                color: foundationToken.colors.gray[300],
                            },
                            hover: { color: foundationToken.colors.gray[300] },
                            focus: { color: foundationToken.colors.gray[300] },
                            disabled: {
                                color: foundationToken.colors.gray[300],
                            },
                        },
                        skipped: {
                            default: {
                                color: foundationToken.colors.gray[600],
                            },
                            hover: { color: foundationToken.colors.gray[600] },
                            focus: { color: foundationToken.colors.gray[600] },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                            },
                        },
                    },
                },
                connector: {
                    line: {
                        active: {
                            default: {
                                color: foundationToken.colors.gray[300],
                                height: '1px',
                            },
                        },
                        inactive: {
                            default: {
                                color: foundationToken.colors.gray[300],
                                height: '1px',
                            },
                        },
                    },
                },
                title: {
                    text: {
                        completed: {
                            default: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[800],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        current: {
                            default: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        pending: {
                            default: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[400],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        disabled: {
                            default: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[300],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                        skipped: {
                            default: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            hover: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            focus: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                            disabled: {
                                color: foundationToken.colors.gray[600],
                                fontSize: '14px',
                                fontWeight: 500,
                                gap: 5,
                            },
                        },
                    },
                },
            },
        },
    }
}
