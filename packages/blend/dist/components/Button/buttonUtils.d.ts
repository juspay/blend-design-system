import { ButtonType, ButtonSize, ButtonSubType } from './types';
export declare const buttonSizes: {
    sm: {
        padding: string;
        fontSize: string;
        height: string;
        iconSize: string;
    };
    md: {
        padding: string;
        fontSize: string;
        height: string;
        iconSize: string;
    };
    lg: {
        padding: string;
        fontSize: string;
        height: string;
        iconSize: string;
    };
};
export declare const getButtonSizeStyles: (size: ButtonSize, subType: ButtonSubType) => import('styled-components').RuleSet<object>;
export declare const getButtonTypeKey: (type: ButtonType) => "primary" | "secondary" | "danger" | "success";
export declare const getButtonTypeStyles: (buttonType: ButtonType, subType: ButtonSubType) => import('styled-components').RuleSet<object>;
export declare const getLoadingStyles: (isLoading: boolean) => import('styled-components').RuleSet<object>;
export declare const getBaseButtonStyles: () => import('styled-components').RuleSet<object>;
