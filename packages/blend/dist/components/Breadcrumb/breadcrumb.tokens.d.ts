import { CSSObject } from 'styled-components';
import { FoundationTokenType } from '../../tokens/theme.token';
type BreadcrumbItemType = "active" | "inactive";
export type BreadcrumbTokenType = {
    height: CSSObject["height"];
    padding: CSSObject["padding"];
    gap: CSSObject["gap"];
    item: {
        padding: CSSObject["padding"];
        gap: CSSObject["gap"];
        fontSize: {
            [key in BreadcrumbItemType]: CSSObject["fontSize"];
        };
        fontWeight: {
            [key in BreadcrumbItemType]: CSSObject["fontWeight"];
        };
        color: {
            [key in BreadcrumbItemType]: CSSObject["color"];
        };
        background: {
            [key in BreadcrumbItemType]: CSSObject["background"];
        };
    };
};
declare const breadcrumbTokens: BreadcrumbTokenType;
export declare const getBreadcrumbTokens: (foundationToken: FoundationTokenType) => BreadcrumbTokenType;
export default breadcrumbTokens;
