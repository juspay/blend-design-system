import { CSSObject } from 'styled-components';
import { MenuItemV2ActionType, MenuItemV2Variant } from './types';
import { FoundationTokenType } from '../../tokens/theme.token';
import { BreakpointType } from '../../breakpoints/breakPoints';
export type MenuItemStates = 'default' | 'hover' | 'active' | 'focus' | 'focusVisible' | 'disabled';
export type MenuTokensType = {
    shadow: CSSObject['boxShadow'];
    backgroundColor: CSSObject['backgroundColor'];
    paddingTop: CSSObject['paddingTop'];
    paddingBottom: CSSObject['paddingBottom'];
    border: CSSObject['border'];
    outline: CSSObject['outline'];
    borderRadius: CSSObject['borderRadius'];
    item: {
        padding: CSSObject['padding'];
        margin: CSSObject['margin'];
        borderRadius: CSSObject['borderRadius'];
        backgroundColor: {
            [MenuItemV2Variant.DEFAULT]: {
                enabled: {
                    [key in MenuItemStates]: CSSObject['backgroundColor'];
                };
                disabled: {
                    [key in MenuItemStates]: CSSObject['backgroundColor'];
                };
            };
            [MenuItemV2Variant.ACTION]: {
                [key in MenuItemV2ActionType]: {
                    enabled: {
                        [key in MenuItemStates]: CSSObject['backgroundColor'];
                    };
                    disabled: {
                        [key in MenuItemStates]: CSSObject['backgroundColor'];
                    };
                };
            };
        };
        cursor: CSSObject['cursor'];
        gap: CSSObject['gap'];
        label: {
            fontSize: CSSObject['fontSize'];
            fontWeight: CSSObject['fontWeight'];
            color: {
                [MenuItemV2Variant.DEFAULT]: {
                    enabled: {
                        [key in MenuItemStates]: CSSObject['color'];
                    };
                    disabled: {
                        [key in MenuItemStates]: CSSObject['color'];
                    };
                };
                [MenuItemV2Variant.ACTION]: {
                    [key in MenuItemV2ActionType]: {
                        enabled: {
                            [key in MenuItemStates]: CSSObject['color'];
                        };
                        disabled: {
                            [key in MenuItemStates]: CSSObject['color'];
                        };
                    };
                };
            };
        };
        subLabel: {
            fontSize: CSSObject['fontSize'];
            fontWeight: CSSObject['fontWeight'];
            color: {
                [MenuItemV2Variant.DEFAULT]: {
                    enabled: {
                        [key in MenuItemStates]: CSSObject['color'];
                    };
                    disabled: {
                        [key in MenuItemStates]: CSSObject['color'];
                    };
                };
                [MenuItemV2Variant.ACTION]: {
                    [key in MenuItemV2ActionType]: {
                        enabled: {
                            [key in MenuItemStates]: CSSObject['color'];
                        };
                        disabled: {
                            [key in MenuItemStates]: CSSObject['color'];
                        };
                    };
                };
            };
        };
    };
    seperator: {
        color: CSSObject['color'];
        height: CSSObject['height'];
        margin: CSSObject['margin'];
    };
};
export type ResponsiveMenuTokensType = {
    [key in keyof BreakpointType]: MenuTokensType;
};
declare const menuTokens: MenuTokensType;
export declare const getMenuTokens: (foundationToken: FoundationTokenType) => ResponsiveMenuTokensType;
export default menuTokens;
