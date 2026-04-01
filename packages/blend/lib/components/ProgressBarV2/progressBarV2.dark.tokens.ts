import { FoundationTokenType } from '../../tokens/theme.token'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
} from './progressBarV2.types'
import type { ResponsiveProgressBarV2Tokens } from './progressBarV2.tokens'

export const getProgressBarV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveProgressBarV2Tokens => {
    return {
        sm: {
            linear: {
                height: {
                    [ProgressBarV2Size.SM]: foundationToken.unit[12],
                    [ProgressBarV2Size.MD]: foundationToken.unit[20],
                    [ProgressBarV2Size.LG]: foundationToken.unit[24],
                },
                fill: {
                    backgroundColor: {
                        [ProgressBarV2Appearance.SOLID]: String(
                            foundationToken.colors.primary[600]
                        ),
                        [ProgressBarV2Appearance.SEGMENTED]: String(
                            foundationToken.colors.primary[600]
                        ),
                    },
                    borderRadius: {
                        [ProgressBarV2Appearance.SOLID]: String(
                            foundationToken.border.radius[8]
                        ),
                        [ProgressBarV2Appearance.SEGMENTED]: String(
                            foundationToken.border.radius[2]
                        ),
                    },
                },
                empty: {
                    backgroundColor: {
                        [ProgressBarV2Appearance.SOLID]: String(
                            foundationToken.colors.gray[150]
                        ),
                        [ProgressBarV2Appearance.SEGMENTED]: 'transparent',
                    },
                    backgroundImage: {
                        [ProgressBarV2Appearance.SOLID]: undefined,
                        [ProgressBarV2Appearance.SEGMENTED]: `repeating-linear-gradient(
                    to right,
                    ${String(foundationToken.colors.gray[100])},
                    ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[8]}
                )`,
                    },
                    backgroundSize: {
                        [ProgressBarV2Appearance.SOLID]: undefined,
                        [ProgressBarV2Appearance.SEGMENTED]: `${foundationToken.unit[10]} 100%`,
                    },
                },
                borderRadius: {
                    [ProgressBarV2Appearance.SOLID]: String(
                        foundationToken.border.radius[8]
                    ),
                    [ProgressBarV2Appearance.SEGMENTED]: '0px',
                },
                gap: foundationToken.unit[8],
            },
            circular: {
                size: {
                    [ProgressBarV2Size.SM]: foundationToken.unit[40],
                    [ProgressBarV2Size.MD]: foundationToken.unit[60],
                    [ProgressBarV2Size.LG]: foundationToken.unit[80],
                },
                strokeWidth: {
                    [ProgressBarV2Size.SM]: 3,
                    [ProgressBarV2Size.MD]: 4,
                    [ProgressBarV2Size.LG]: 6,
                },
                stroke: {
                    [ProgressBarV2Appearance.SOLID]: String(
                        foundationToken.colors.primary[600]
                    ),
                    [ProgressBarV2Appearance.SEGMENTED]: String(
                        foundationToken.colors.primary[600]
                    ),
                },
                background: {
                    [ProgressBarV2Appearance.SOLID]: String(
                        foundationToken.colors.gray[150]
                    ),
                    [ProgressBarV2Appearance.SEGMENTED]: String(
                        foundationToken.colors.gray[150]
                    ),
                },
                dashArray: {
                    [ProgressBarV2Appearance.SOLID]: '',
                    [ProgressBarV2Appearance.SEGMENTED]: '4 2',
                },
                dashOffset: {
                    [ProgressBarV2Appearance.SOLID]: '0',
                    [ProgressBarV2Appearance.SEGMENTED]: '0',
                },
            },
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: String(foundationToken.colors.gray[300]),
            },
            transition: 'width 0.3s ease-in-out',
        },
        lg: {
            linear: {
                height: {
                    [ProgressBarV2Size.SM]: foundationToken.unit[12],
                    [ProgressBarV2Size.MD]: foundationToken.unit[20],
                    [ProgressBarV2Size.LG]: foundationToken.unit[24],
                },
                fill: {
                    backgroundColor: {
                        [ProgressBarV2Appearance.SOLID]: String(
                            foundationToken.colors.primary[600]
                        ),
                        [ProgressBarV2Appearance.SEGMENTED]: String(
                            foundationToken.colors.primary[600]
                        ),
                    },
                    borderRadius: {
                        [ProgressBarV2Appearance.SOLID]: String(
                            foundationToken.border.radius[8]
                        ),
                        [ProgressBarV2Appearance.SEGMENTED]: String(
                            foundationToken.border.radius[2]
                        ),
                    },
                },
                empty: {
                    backgroundColor: {
                        [ProgressBarV2Appearance.SOLID]: String(
                            foundationToken.colors.gray[150]
                        ),
                        [ProgressBarV2Appearance.SEGMENTED]: 'transparent',
                    },
                    backgroundImage: {
                        [ProgressBarV2Appearance.SOLID]: undefined,
                        [ProgressBarV2Appearance.SEGMENTED]: `repeating-linear-gradient(
                    to right,
                    ${String(foundationToken.colors.gray[100])},
                    ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[8]}
                )`,
                    },
                    backgroundSize: {
                        [ProgressBarV2Appearance.SOLID]: undefined,
                        [ProgressBarV2Appearance.SEGMENTED]: `${foundationToken.unit[10]} 100%`,
                    },
                },
                borderRadius: {
                    [ProgressBarV2Appearance.SOLID]: String(
                        foundationToken.border.radius[8]
                    ),
                    [ProgressBarV2Appearance.SEGMENTED]: '0px',
                },
                gap: foundationToken.unit[8],
            },
            circular: {
                size: {
                    [ProgressBarV2Size.SM]: foundationToken.unit[40],
                    [ProgressBarV2Size.MD]: foundationToken.unit[60],
                    [ProgressBarV2Size.LG]: foundationToken.unit[80],
                },
                strokeWidth: {
                    [ProgressBarV2Size.SM]: 3,
                    [ProgressBarV2Size.MD]: 4,
                    [ProgressBarV2Size.LG]: 6,
                },
                stroke: {
                    [ProgressBarV2Appearance.SOLID]: String(
                        foundationToken.colors.primary[600]
                    ),
                    [ProgressBarV2Appearance.SEGMENTED]: String(
                        foundationToken.colors.primary[600]
                    ),
                },
                background: {
                    [ProgressBarV2Appearance.SOLID]: String(
                        foundationToken.colors.gray[150]
                    ),
                    [ProgressBarV2Appearance.SEGMENTED]: String(
                        foundationToken.colors.gray[150]
                    ),
                },
                dashArray: {
                    [ProgressBarV2Appearance.SOLID]: '',
                    [ProgressBarV2Appearance.SEGMENTED]: '4 2',
                },
                dashOffset: {
                    [ProgressBarV2Appearance.SOLID]: '0',
                    [ProgressBarV2Appearance.SEGMENTED]: '0',
                },
            },
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: String(foundationToken.colors.gray[300]),
            },
            transition: 'width 0.3s ease-in-out',
        },
    }
}
