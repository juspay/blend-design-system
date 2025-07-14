import { CSSObject } from 'styled-components';
import { TooltipSize } from './types';
import { FoundationTokenType } from '../../tokens/theme.token';
export type TooltipTokensType = {
    background: CSSObject['backgroundColor'];
    color: CSSObject['color'];
    fontWeight: {
        [key in TooltipSize]: CSSObject['fontWeight'];
    };
    borderRadius: {
        [key in TooltipSize]: CSSObject['borderRadius'];
    };
    maxWidth: {
        [key in TooltipSize]: CSSObject['maxWidth'];
    };
    padding: {
        [key in TooltipSize]: CSSObject['padding'];
    };
    fontSize: {
        [key in TooltipSize]: CSSObject['fontSize'];
    };
    lineHeight: {
        [key in TooltipSize]: CSSObject['lineHeight'];
    };
    gap: {
        [key in TooltipSize]: CSSObject['gap'];
    };
};
declare const tooltipTokens: TooltipTokensType;
export declare const getTooltipTokens: (foundationToken: FoundationTokenType) => TooltipTokensType;
export default tooltipTokens;
