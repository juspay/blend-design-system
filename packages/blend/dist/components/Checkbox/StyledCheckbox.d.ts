import { CheckboxSize } from './types';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
export declare const StyledCheckboxRoot: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<CheckboxPrimitive.CheckboxProps & import('react').RefAttributes<HTMLButtonElement>, {
    size: CheckboxSize;
    $isDisabled: boolean;
    $checked: boolean | "indeterminate";
    $error?: boolean;
}>> & string & Omit<import('react').ForwardRefExoticComponent<CheckboxPrimitive.CheckboxProps & import('react').RefAttributes<HTMLButtonElement>>, keyof import('react').Component<any, {}, any>>;
export declare const StyledCheckboxIndicator: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<CheckboxPrimitive.CheckboxIndicatorProps & import('react').RefAttributes<HTMLSpanElement>, {
    size: CheckboxSize;
}>> & string & Omit<import('react').ForwardRefExoticComponent<CheckboxPrimitive.CheckboxIndicatorProps & import('react').RefAttributes<HTMLSpanElement>>, keyof import('react').Component<any, {}, any>>;
