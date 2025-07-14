import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../../tokens/theme.token';
import { DropdownInputSize, DropdownInputState } from './types';
export type DropdownInputTokensType = {
    input: {
        gap: CSSObject['gap'];
        borderRadius?: CSSObject['borderRadius'];
        boxShadow: {
            [key in DropdownInputState]: CSSObject['boxShadow'];
        };
        paddingX: {
            [key in DropdownInputSize]: CSSObject['padding'];
        };
        paddingY: {
            [key in DropdownInputSize]: CSSObject['padding'];
        };
        border: {
            [key in DropdownInputState]: CSSObject['border'];
        };
        color: {
            [key in DropdownInputState]: CSSObject['color'];
        };
        outline: {
            [key in DropdownInputState]: CSSObject['outline'];
        };
        backgroundColor: {
            [key in DropdownInputState]: CSSObject['backgroundColor'];
        };
    };
};
declare const dropdownInputTokens: Readonly<DropdownInputTokensType>;
export declare const getDropdownInputTokens: (foundationTheme: FoundationTokenType) => DropdownInputTokensType;
export default dropdownInputTokens;
