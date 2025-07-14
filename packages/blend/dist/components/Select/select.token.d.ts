import { CSSObject } from 'styled-components';
type SelectTokenTypes = {
    trigger: {
        container: {
            gap: CSSObject['gap'];
        };
        label: {
            color: CSSObject['color'];
            fontWeight: CSSObject['fontWeight'];
            fontSize: CSSObject['fontSize'];
        };
        selectedValue: {
            color: CSSObject['color'];
            font: {
                weight: CSSObject['fontWeight'];
                size: {
                    sm: CSSObject['fontSize'];
                    md: CSSObject['fontSize'];
                    lg: CSSObject['fontSize'];
                };
            };
            padding: {
                sm: {
                    x: CSSObject['padding'];
                    y: CSSObject['padding'];
                };
                md: {
                    x: CSSObject['padding'];
                    y: CSSObject['padding'];
                };
                lg: {
                    x: CSSObject['padding'];
                    y: CSSObject['padding'];
                };
            };
        };
    };
};
declare const selectTokens: Readonly<SelectTokenTypes>;
export default selectTokens;
