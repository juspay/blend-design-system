import { ButtonSize, ButtonSubType, ButtonType } from './types';
declare const Button: import('react').ForwardRefExoticComponent<{
    buttonType?: ButtonType;
    size?: ButtonSize;
    subType?: ButtonSubType;
    text?: string;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    loading?: boolean;
    buttonGroupPosition?: "center" | "left" | "right";
    fullWidth?: boolean;
    justifyContent?: import('styled-components').CSSObject["justifyContent"];
} & Omit<import('react').ButtonHTMLAttributes<HTMLButtonElement>, "style" | "className"> & import('react').RefAttributes<HTMLButtonElement>>;
export default Button;
