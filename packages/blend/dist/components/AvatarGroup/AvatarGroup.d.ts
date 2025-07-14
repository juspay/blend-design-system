import { default as React } from 'react'
import { AvatarShape, AvatarSize } from '../Avatar/types'
declare const AvatarGroup: React.ForwardRefExoticComponent<
    {
        avatars: import('./types').AvatarData[]
        maxCount?: number
        size?: AvatarSize
        shape?: AvatarShape
        selectedAvatarIds?: (string | number)[]
        onSelectionChange?: (selectedIds: (string | number)[]) => void
    } & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
        React.RefAttributes<HTMLDivElement>
>
export default AvatarGroup
