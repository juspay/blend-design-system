import { type FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getModalV2LightToken } from './modalV2.light.tokens'
import { getModalV2DarkToken } from './modalV2.dark.tokens'
import type { ResponsiveModalV2Tokens } from './modalV2.tokens.types'

export type {
    ModalV2State,
    ModalV2TokensType,
    ResponsiveModalV2Tokens,
} from './modalV2.tokens.types'

export const getModalV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveModalV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getModalV2DarkToken(foundationToken)
    }
    return getModalV2LightToken(foundationToken)
}
