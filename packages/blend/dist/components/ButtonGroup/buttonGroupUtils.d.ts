import { ButtonSize, ButtonType } from '../Button/types';
import { ReactElement } from 'react';
import { ButtonGroupMode } from './types';
export declare const getButtonGroupSpacing: (size: ButtonSize) => string;
export declare const getButtonPosition: (index: number, total: number) => "first" | "middle" | "last";
export declare const findPrimaryButtonIndex: (children: ReactElement[]) => number;
export declare const getTransformedButtonType: (originalType: ButtonType | undefined, mode: ButtonGroupMode, index: number, primaryIndex: number) => ButtonType;
