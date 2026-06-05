import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSnackbarV2DarkTokens } from './snackbarV2.dark.tokens'
import { getSnackbarV2LightTokens } from './snackbarV2.light.tokens'
import type { ResponsiveSnackbarV2Tokens } from './snackbarV2.tokens.types'

export type {
    ResponsiveSnackbarV2Tokens,
    SnackbarV2TokensType,
} from './snackbarV2.tokens.types'

export enum SnackbarV2PaddingDirection {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
}

export const getSnackbarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSnackbarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSnackbarV2DarkTokens(foundationToken)
    }

    return getSnackbarV2LightTokens(foundationToken)
}
