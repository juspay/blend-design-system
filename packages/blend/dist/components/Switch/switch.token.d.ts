import { CSSObject } from 'styled-components';
import { ThemeType } from '../../tokens';
import { SwitchSize } from './types';
import { BreakpointType } from '../../breakpoints/breakPoints';
export type SwitchState = 'default' | 'hover' | 'disabled' | 'error';
export type SwitchIndicatorState = 'active' | 'inactive';
export type SwitchTokensType = {
    gap: CSSObject['gap'];
    slotGap: CSSObject['gap'];
    contentGap: CSSObject['gap'];
    height: {
        [key in SwitchSize]: CSSObject['height'];
    };
    width: {
        [key in SwitchSize]: CSSObject['width'];
    };
    borderRadius: {
        base: CSSObject['borderRadius'];
        thumb: CSSObject['borderRadius'];
    };
    indicator: {
        [key in SwitchIndicatorState]: {
            background: {
                [key in Exclude<SwitchState, 'error'>]: CSSObject['backgroundColor'];
            };
            border: {
                [key in Exclude<SwitchState, 'error'>]: CSSObject['borderColor'];
            };
        };
    };
    thumb: {
        background: CSSObject['backgroundColor'];
        border: {
            color: CSSObject['borderColor'];
            width: CSSObject['borderWidth'];
        };
        size: {
            [key in SwitchSize]: {
                width: CSSObject['width'];
                height: CSSObject['height'];
                top: CSSObject['top'];
                left: CSSObject['left'];
                offset: {
                    active: CSSObject['left'];
                    inactive: CSSObject['left'];
                };
            };
        };
    };
    content: {
        label: {
            color: {
                [key in SwitchState]: CSSObject['color'];
            };
            font: {
                [key in SwitchSize]: {
                    fontSize: CSSObject['fontSize'];
                    fontWeight: CSSObject['fontWeight'];
                };
            };
        };
        sublabel: {
            color: {
                [key in SwitchState]: CSSObject['color'];
            };
            font: {
                [key in SwitchSize]: {
                    fontSize: CSSObject['fontSize'];
                    fontWeight: CSSObject['fontWeight'];
                };
            };
            spacing: {
                left: {
                    [key in SwitchSize]: CSSObject['marginLeft'];
                };
                top: CSSObject['marginTop'];
            };
        };
    };
    borderWidth: {
        [key in SwitchIndicatorState]: {
            [key in Exclude<SwitchState, 'error'>]: number;
        };
    };
    focus: {
        outline: {
            width: CSSObject['borderWidth'];
            color: CSSObject['borderColor'];
            offset: CSSObject['outlineOffset'];
        };
    };
    slot: {
        size: {
            [key in SwitchSize]: CSSObject['width'];
        };
        spacing: CSSObject['margin'];
    };
    required: {
        color: CSSObject['color'];
        spacing: CSSObject['margin'];
    };
    transition: {
        duration: CSSObject['transitionDuration'];
        easing: CSSObject['transitionTimingFunction'];
    };
};
export type ResponsiveSwitchTokens = {
    [key in keyof BreakpointType]: SwitchTokensType;
};
export declare const getSwitchTokens: (foundationToken: ThemeType) => ResponsiveSwitchTokens;
declare const switchTokens: ResponsiveSwitchTokens;
export default switchTokens;
