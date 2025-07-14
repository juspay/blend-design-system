import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../../tokens/theme.token';
import { TextInputSize, TextInputState } from './types';
export type TextInputTokensType = {
    input: {
        gap: CSSObject['gap'];
        borderRadius?: CSSObject['borderRadius'];
        boxShadow: CSSObject['boxShadow'];
        paddingX: {
            [key in TextInputSize]: CSSObject['padding'];
        };
        paddingY: {
            [key in TextInputSize]: CSSObject['padding'];
        };
        border: {
            [key in TextInputState]: CSSObject['border'];
        };
        color: {
            [key in TextInputState]: CSSObject['color'];
        };
        outline: {
            [key in TextInputState]: CSSObject['outline'];
        };
        backgroundColor: {
            [key in TextInputState]: CSSObject['backgroundColor'];
        };
    };
};
declare const textInputTokens: Readonly<TextInputTokensType>;
export declare const getTextInputTokens: (foundationTheme: FoundationTokenType) => TextInputTokensType;
export default textInputTokens;
