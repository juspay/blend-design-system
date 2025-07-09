import { CSSObject } from 'styled-components';
import { VariantType } from '../Text/Text';
export type SnackbarTokens = Readonly<{
    icon: {
        color: {
            info: CSSObject["color"];
            success: CSSObject["color"];
            warning: CSSObject["color"];
            error: CSSObject["color"];
        };
    };
    container: {
        backgroundColor: CSSObject["color"];
        borderRadius: CSSObject["borderRadius"];
        padding: CSSObject["padding"];
        minWidth: CSSObject["minWidth"];
        maxWidth: CSSObject["maxWidth"];
        boxShadow: CSSObject["boxShadow"];
    };
    header: {
        layout: {
            gap: CSSObject["gap"];
            marginBottom: CSSObject["marginBottom"];
            iconGap: CSSObject["gap"];
        };
        text: {
            color: CSSObject["color"];
            variant: VariantType;
        };
    };
    description: {
        layout: {
            paddingLeft: CSSObject["paddingLeft"];
            gap: CSSObject["gap"];
        };
        text: {
            color: CSSObject["color"];
            variant: VariantType;
        };
    };
    actionButton: {
        layout: {
            paddingX: CSSObject["padding"];
        };
        text: {
            color: CSSObject["color"];
            variant: VariantType;
        };
    };
}>;
declare const snackbarTokens: SnackbarTokens;
export default snackbarTokens;
