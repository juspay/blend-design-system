import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../../tokens/theme.token';
declare enum SearchInputState {
    DEFAULT = "default",
    HOVER = "hover",
    FOCUS = "focus",
    ERROR = "error"
}
export type SearchInputTokensType = {
    height: CSSObject["height"];
    width: CSSObject["width"];
    gap: CSSObject["gap"];
    padding: {
        x: CSSObject["padding"];
        y: CSSObject["padding"];
    };
    borderRadius: CSSObject["borderRadius"];
    borderTop: {
        [key in SearchInputState]: CSSObject["borderTop"];
    };
    borderLeft: {
        [key in SearchInputState]: CSSObject["borderTop"];
    };
    borderRight: {
        [key in SearchInputState]: CSSObject["borderRight"];
    };
    borderBottom: {
        [key in SearchInputState]: CSSObject["borderBottom"];
    };
    border?: {
        radius: CSSObject["borderRadius"];
        color: {
            [key in SearchInputState]: CSSObject["borderColor"];
        };
    };
    outline: CSSObject["outline"];
    boxShadow: CSSObject["boxShadow"];
};
declare const searchInputTokens: Readonly<SearchInputTokensType>;
export declare const getSearchInputTokens: (foundationTokens: FoundationTokenType) => SearchInputTokensType;
export default searchInputTokens;
