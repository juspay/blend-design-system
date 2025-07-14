import { TabsVariant, TabsSize } from './types';
declare const TabsTrigger: import('react').ForwardRefExoticComponent<Omit<import('@radix-ui/react-tabs').TabsTriggerProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & {
    value: string;
    variant?: TabsVariant;
    size?: TabsSize;
    leftSlot?: import('react').ReactNode;
    rightSlot?: import('react').ReactNode;
    children: string | number;
} & import('react').RefAttributes<HTMLButtonElement>>;
export default TabsTrigger;
