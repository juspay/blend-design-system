import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../../tokens/theme.token';
declare enum TextInputSize {
    MD = "md",
    LG = "lg"
}
declare enum TextInputState {
    DEFAULT = "default",
    HOVER = "hover",
    FOCUS = "focus",
    ERROR = "error",
    DISABLED = "disabled"
}
export type NumberInputTokensType = {
    input: {
        gap: CSSObject["gap"];
        borderRadius?: CSSObject["borderRadius"];
        boxShadow: CSSObject["boxShadow"];
        paddingX: {
            [key in TextInputSize]: CSSObject["padding"];
        };
        paddingY: {
            [key in TextInputSize]: CSSObject["padding"];
        };
        border: {
            [key in TextInputState]: CSSObject["border"];
        };
        color: {
            [key in TextInputState]: CSSObject["color"];
        };
        outline: {
            [key in TextInputState]: CSSObject["outline"];
        };
        backgroundColor: {
            default: CSSObject["backgroundColor"];
            disabled: CSSObject["backgroundColor"];
        };
    };
};
declare const numberInputTokens: Readonly<NumberInputTokensType>;
export declare const getNumberInputTokens: (foundationTheme: FoundationTokenType) => NumberInputTokensType;
export default numberInputTokens;
