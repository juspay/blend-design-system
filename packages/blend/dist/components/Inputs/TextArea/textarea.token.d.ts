import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../../tokens/theme.token';
type TextAreaState = 'default' | 'hover' | 'focus' | 'error' | 'disabled';
export type TextAreaTokensType = {
    fontFamily: CSSObject['fontFamily'];
    paddingX: CSSObject['padding'];
    paddingY: CSSObject['padding'];
    borderRadius: CSSObject['borderRadius'];
    boxShadow: {
        [key in TextAreaState]: CSSObject['boxShadow'];
    };
    outline: {
        [key in TextAreaState]: CSSObject['outline'];
    };
    border: {
        [key in TextAreaState]: CSSObject['border'];
    };
    color: {
        [key in TextAreaState]: CSSObject['color'];
    };
    backgroundColor: {
        [key in TextAreaState]: CSSObject['backgroundColor'];
    };
};
export declare const textAreaTokens: TextAreaTokensType;
export declare const getTextAreaTokens: (foundationTokens: FoundationTokenType) => TextAreaTokensType;
export default textAreaTokens;
