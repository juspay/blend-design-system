import { FoundationTokenType } from '../../tokens/theme.token'
import { darkCodeEditorV2Tokens } from './codeEditorV2.dark.tokens'
import { lightCodeEditorV2Tokens } from './codeEditorV2.light.token'
import { Theme } from '../../context/theme.enum'
import type { ResponsiveCodeEditorV2Tokens } from './codeEditorV2.tokens.types'

export type {
    CodeEditorV2Tokens,
    ResponsiveCodeEditorV2Tokens,
} from './codeEditorV2.tokens.types'

export const getCodeEditorV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCodeEditorV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return darkCodeEditorV2Tokens(foundationToken)
    }

    return lightCodeEditorV2Tokens(foundationToken)
}
