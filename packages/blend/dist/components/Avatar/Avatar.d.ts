import { AvatarSize, AvatarShape } from './types';
declare const Avatar: import('react').ForwardRefExoticComponent<{
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
    size?: AvatarSize;
    shape?: AvatarShape;
    online?: boolean;
    leadingSlot?: React.ReactNode;
    trailingSlot?: React.ReactNode;
} & Omit<import('react').HTMLAttributes<HTMLDivElement>, "children"> & import('react').RefAttributes<HTMLDivElement>>;
export default Avatar;
