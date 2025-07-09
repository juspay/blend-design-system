import { ButtonSizeV2, ButtonSubTypeV2, ButtonTypeV2 } from './types';
declare const ButtonV2: import('react').ForwardRefExoticComponent<{
    buttonType?: ButtonTypeV2;
    size?: ButtonSizeV2;
    subType?: ButtonSubTypeV2;
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
export default ButtonV2;
