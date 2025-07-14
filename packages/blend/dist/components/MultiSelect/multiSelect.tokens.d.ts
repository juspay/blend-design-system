import { CSSObject } from 'styled-components';
import { MultiSelectMenuSize, MultiSelectSelectionTagType, MultiSelectVariant } from './types';
import { FoundationTokenType } from '../../tokens/theme.token';
type TriggerStates = 'open' | 'closed' | 'hover' | 'focus';
export type SingleSelectItemStates = 'default' | 'hover' | 'active' | 'focus' | 'focusVisible' | 'disabled' | 'selected';
export type MultiSelectTokensType = {
    trigger: {
        padding: {
            [key in MultiSelectMenuSize]: CSSObject['padding'];
        };
        borderRadius: {
            [key in MultiSelectMenuSize]: CSSObject['borderRadius'];
        };
        boxShadow: {
            [key in MultiSelectVariant]: CSSObject['boxShadow'];
        };
        backgroundColor: {
            container: {
                [key in TriggerStates]: CSSObject['backgroundColor'];
            };
        };
        outline: {
            [key in MultiSelectVariant]: {
                [key in TriggerStates]: CSSObject['outline'];
            };
        };
        selectionTag: {
            container: {
                [key in MultiSelectSelectionTagType]: {
                    color: CSSObject['color'];
                    backgroundColor: CSSObject['backgroundColor'];
                    fontWeight: CSSObject['fontWeight'];
                };
            };
        };
    };
    dropdown: {
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
            gap: CSSObject['gap'];
            backgroundColor: {
                [key in SingleSelectItemStates]: CSSObject['backgroundColor'];
            };
            label: {
                fontSize: CSSObject['fontSize'];
                fontWeight: CSSObject['fontWeight'];
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color'];
                };
            };
            subLabel: {
                fontSize: CSSObject['fontSize'];
                fontWeight: CSSObject['fontWeight'];
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color'];
                };
            };
        };
        seperator: {
            color: CSSObject['color'];
            height: CSSObject['height'];
            margin: CSSObject['margin'];
        };
    };
};
export declare const multiSelectTokens: MultiSelectTokensType;
export declare const getMultiSelectTokens: (foundationToken: FoundationTokenType) => MultiSelectTokensType;
export {};
