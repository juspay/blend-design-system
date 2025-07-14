import { CSSObject } from 'styled-components';
import { AlertStyle, AlertVariant } from './types';
import { FoundationTokenType } from '../../tokens/theme.token';
export type AlertTokenType = {
    padding: CSSObject['padding'];
    borderRadius: CSSObject['borderRadius'];
    background: {
        [key in AlertVariant]: {
            [key in AlertStyle]: CSSObject['color'];
        };
    };
    border: {
        [key in AlertVariant]: CSSObject['color'];
    };
    button: {
        [key in AlertVariant]: CSSObject['color'];
    };
};
declare const alertTokens: AlertTokenType;
export declare const getAlertTokens: (foundationToken: FoundationTokenType) => AlertTokenType;
export default alertTokens;
