import { CSSObject } from 'styled-components';
import { ThemeType } from '../../tokens';
import { CheckboxSize, CheckboxCheckedState, CheckboxInteractionState } from './types';
export type CheckboxTokensType = Readonly<{
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
}>;
export declare const getCheckboxTokens: (foundationToken: ThemeType) => CheckboxTokensType;
declare const checkboxTokens: CheckboxTokensType;
export default checkboxTokens;
