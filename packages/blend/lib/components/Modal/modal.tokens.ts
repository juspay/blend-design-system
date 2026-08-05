import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getModalDarkTokens } from './modal.dark.tokens'
import { getModalLightTokens } from './modal.light.tokens'
import type { ResponsiveModalTokens } from './modal.tokens.types'

export type {
    ModalState,
    ModalTokensType,
    ResponsiveModalTokens,
} from './modal.tokens.types'

export const getModalComponentTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveModalTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getModalDarkTokens(foundationToken)
    }

    return getModalLightTokens(foundationToken)
}

export default getModalComponentTokens
