import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../../tokens/theme.token';
declare enum OTPInputState {
    DEFAULT = "default",
    HOVER = "hover",
    FOCUS = "focus",
    ERROR = "error",
    DISABLED = "disabled"
}
export type OTPInputTokensType = {
    input: {
        gap: CSSObject["gap"];
        borderRadius: CSSObject["borderRadius"];
        boxShadow: CSSObject["boxShadow"];
        padding: CSSObject["padding"];
        outline: {
            [key in OTPInputState]: CSSObject["outline"];
        };
        border: {
            [key in OTPInputState]: CSSObject["border"];
        };
        color: {
            [key in OTPInputState]: CSSObject["color"];
        };
        backgroundColor: {
            [key in OTPInputState]: CSSObject["backgroundColor"];
        };
    };
};
declare const otpInputTokens: OTPInputTokensType;
export declare const getOTPInputTokens: (foundationToken: FoundationTokenType) => OTPInputTokensType;
export default otpInputTokens;
