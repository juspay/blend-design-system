import { ReactNode } from 'react';
export declare enum AlertVariant {
    PRIMARY = "primary",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    PURPLE = "purple",
    ORANGE = "orange",
    NEUTRAL = "neutral"
}
export declare enum AlertActionPlacement {
    BOTTOM = "bottom",
    RIGHT = "right"
}
export declare enum AlertStyle {
    SUBTLE = "subtle",
    NO_FILL = "noFill"
}
export type AlertAction = {
    label: string;
    onClick: () => void;
};
export type AlertProps = {
    heading: string;
    description: string;
    variant?: AlertVariant;
    style?: AlertStyle;
    primaryAction?: AlertAction;
    secondaryAction?: AlertAction;
    onClose?: () => void;
    icon?: ReactNode;
    actionPlacement?: AlertActionPlacement;
};
