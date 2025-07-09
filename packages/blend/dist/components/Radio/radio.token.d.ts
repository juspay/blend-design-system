import { CSSObject } from 'styled-components';
import { ThemeType } from '../../tokens';
import { RadioSize } from './types';
export type RadioState = "default" | "hover" | "disabled" | "error";
export type RadioIndicatorState = "active" | "inactive";
export type RadioTokensType = Readonly<{
    gap: CSSObject["gap"];
    slotGap: CSSObject["gap"];
    groupGap: CSSObject["gap"];
    indicator: {
        [key in RadioIndicatorState]: {
            background: {
                [key in Exclude<RadioState, "error">]: CSSObject["backgroundColor"];
            };
            border: {
                [key in Exclude<RadioState, "error">]: CSSObject["borderColor"];
            };
        };
    };
    activeIndicator: {
        active: {
            background: {
                [key in Exclude<RadioState, "hover" | "error">]: CSSObject["backgroundColor"];
            };
        };
    };
    content: {
        label: {
            color: {
                [key in RadioState]: CSSObject["color"];
            };
            font: {
                [key in RadioSize]: {
                    fontSize: CSSObject["fontSize"];
                    fontWeight: CSSObject["fontWeight"];
                };
            };
        };
        sublabel: {
            color: {
                [key in RadioState]: CSSObject["color"];
            };
            font: {
                [key in RadioSize]: {
                    fontSize: CSSObject["fontSize"];
                    fontWeight: CSSObject["fontWeight"];
                };
            };
        };
    };
    height: {
        [key in RadioSize]: CSSObject["height"];
    };
    borderWidth: {
        [key in RadioIndicatorState]: {
            [key in Exclude<RadioState, "error">]: number;
        };
    };
    slot: {
        size: {
            [key in RadioSize]: CSSObject["width"];
        };
    };
}>;
export declare const getRadioTokens: (foundationToken: ThemeType) => RadioTokensType;
declare const radioTokens: RadioTokensType;
export default radioTokens;
