import { CSSObject } from 'styled-components';
import { ButtonSizeV2, ButtonSubTypeV2, ButtonTypeV2 } from './types';
import { FoundationTokenType } from '../../tokens/theme.token';
import { BreakpointType } from '../../breakpoints/breakPoints';
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled';
export type ButtonTokensType = {
    gap: CSSObject['gap'];
    backgroundColor: {
        [key in ButtonTypeV2]: {
            [key in ButtonSubTypeV2]: {
                [key in ButtonState]: CSSObject['background'];
            };
        };
    };
    color: {
        [key in ButtonTypeV2]: {
            [key in ButtonSubTypeV2]: {
                [key in ButtonState]: CSSObject['color'];
            };
        };
    };
    borderRadius: {
        [key in ButtonTypeV2]: {
            [key in ButtonSubTypeV2]: {
                [key in ButtonState]: CSSObject['borderRadius'];
            };
        };
    };
    padding: {
        [key in ButtonSizeV2]: {
            [key in ButtonSubTypeV2]: CSSObject['padding'];
        };
    };
    border: {
        [key in ButtonTypeV2]: {
            [key in ButtonSubTypeV2]: {
                [key in ButtonState]: CSSObject['border'];
            };
        };
    };
    shadow: {
        [key in ButtonTypeV2]: {
            [key in ButtonSubTypeV2]: {
                [key in ButtonState]: CSSObject['boxShadow'];
            };
        };
    };
    outline: {
        [key in ButtonTypeV2]: {
            [key in ButtonSubTypeV2]: {
                [key in ButtonState]: CSSObject['outline'];
            };
        };
    };
};
declare const buttonTokens: ButtonTokensType;
export type ResponsiveButtonTokens = {
    [key in keyof BreakpointType]: ButtonTokensType;
};
export declare const getButtonTokens: (foundationToken: FoundationTokenType) => ResponsiveButtonTokens;
export default buttonTokens;
