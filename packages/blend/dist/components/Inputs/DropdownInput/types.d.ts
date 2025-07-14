import { TextInputSize } from '../TextInput/types';
import { SelectMenuGroupType } from '../../Select/types';
export declare enum DropdownInputSize {
    MD = "md",
    LG = "lg"
}
export declare enum DropdownInputState {
    DEFAULT = "default",
    HOVER = "hover",
    FOCUS = "focus",
    ERROR = "error",
    DISABLED = "disabled"
}
export type DropdownInputProps = {
    label?: string;
    sublabel?: string;
    helpIconHintText?: string;
    error?: boolean;
    errorMessage?: string;
    hintText?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    slot?: React.ReactNode;
    size?: TextInputSize;
    dropDownValue?: string;
    onDropDownChange?: (value: string) => void;
    dropDownItems: SelectMenuGroupType[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'className'>;
