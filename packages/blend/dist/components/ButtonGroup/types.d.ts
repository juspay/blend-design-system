import { ReactElement } from 'react';
import { ButtonV2Props } from '../Button';
export type ButtonGroupProps = {
    stacked?: boolean;
    children: ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[];
};
