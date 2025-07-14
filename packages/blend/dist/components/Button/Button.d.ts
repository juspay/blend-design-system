import { ButtonType, ButtonSize, ButtonSubType } from './types';
export declare const Button: import('react').ForwardRefExoticComponent<Omit<import('react').DetailedHTMLProps<import('react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    buttonType?: ButtonType;
    size?: ButtonSize;
    subType?: ButtonSubType;
    text?: string;
    leadingIcon?: import('react').ElementType;
    trailingIcon?: import('react').ElementType;
    isLoading?: boolean;
    isDisabled?: boolean;
    ariaLabel?: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    ariaPressed?: boolean | "mixed";
    ariaHasPopup?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
} & import('react').RefAttributes<HTMLButtonElement>>;
export default Button;
