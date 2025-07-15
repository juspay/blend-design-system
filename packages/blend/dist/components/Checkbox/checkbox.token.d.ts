import { CSSObject } from 'styled-components';
import { ThemeType } from '../../tokens';
import { CheckboxSize, CheckboxCheckedState, CheckboxInteractionState } from './types';
import { BreakpointType } from '../../breakpoints/breakPoints';
export type CheckboxTokensType = {
    gap: CSSObject['gap'];
    slotGap: CSSObject['gap'];
    checkboxMarginRight: CSSObject['marginRight'];
    indicator: {
        size: {
            [key in CheckboxSize]: {
                width: CSSObject['width'];
                height: CSSObject['height'];
            };
        };
        background: {
            [key in CheckboxCheckedState]?: {
                [key in CheckboxInteractionState]?: CSSObject['backgroundColor'];
            };
        };
        border: {
            radius: CSSObject['borderRadius'];
            width: CSSObject['borderWidth'];
            color: {
                [key in CheckboxCheckedState]?: {
                    [key in CheckboxInteractionState]?: CSSObject['borderColor'];
                };
            };
        };
        focus: {
            outlineColor: CSSObject['borderColor'];
            outlineWidth: CSSObject['borderWidth'];
            outlineOffset: CSSObject['outlineOffset'];
            boxShadow: CSSObject['boxShadow'];
        };
    };
    icon: {
        color: {
            [key in Exclude<CheckboxCheckedState, 'unchecked'>]?: {
                [key in Extract<CheckboxInteractionState, 'default' | 'disabled'>]?: CSSObject['color'];
            };
        };
        size: {
            [key in CheckboxSize]: {
                width: CSSObject['width'];
                height: CSSObject['height'];
                strokeWidth: CSSObject['strokeWidth'];
            };
        };
    };
    content: {
        gap: CSSObject['gap'];
        label: {
            color: {
                [key in Exclude<CheckboxInteractionState, 'hover'>]: CSSObject['color'];
            };
            font: {
                [key in CheckboxSize]: {
                    fontSize: CSSObject['fontSize'];
                    fontWeight: CSSObject['fontWeight'];
                };
            };
        };
        subtext: {
            color: {
                [key in Exclude<CheckboxInteractionState, 'hover'>]: CSSObject['color'];
            };
            font: {
                [key in CheckboxSize]: {
                    fontSize: CSSObject['fontSize'];
                    fontWeight: CSSObject['fontWeight'];
                };
            };
            spacing: {
                left: {
                    [key in CheckboxSize]: CSSObject['marginLeft'];
                };
                top: CSSObject['marginTop'];
            };
        };
    };
    required: {
        color: CSSObject['color'];
        spacing: CSSObject['marginLeft'];
    };
    transition: {
        duration: CSSObject['transitionDuration'];
        easing: CSSObject['transitionTimingFunction'];
    };
};
export type ResponsiveCheckboxTokens = {
    [key in keyof BreakpointType]: CheckboxTokensType;
};
export declare const getCheckboxTokens: (foundationToken: ThemeType) => ResponsiveCheckboxTokens;
declare const checkboxTokens: ResponsiveCheckboxTokens;
export default checkboxTokens;
