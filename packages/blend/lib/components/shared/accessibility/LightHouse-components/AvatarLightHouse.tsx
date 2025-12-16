import {
    Avatar,
    AvatarSize,
    AvatarShape,
    AvatarOnlinePosition,
} from '../../../Avatar'
import { User, Star, Settings } from 'lucide-react'

const AvatarLightHouse = () => {
    return (
        <>
            {/* All Avatar Sizes */}
            <Avatar alt="John Doe" fallback="JD" size={AvatarSize.SM} />
            <Avatar alt="Jane Smith" fallback="JS" size={AvatarSize.REGULAR} />
            <Avatar alt="Bob Johnson" fallback="BJ" size={AvatarSize.MD} />
            <Avatar alt="Alice Brown" fallback="AB" size={AvatarSize.LG} />
            <Avatar alt="Charlie Wilson" fallback="CW" size={AvatarSize.XL} />

            {/* All Avatar Shapes */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                shape={AvatarShape.CIRCULAR}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                shape={AvatarShape.ROUNDED}
            />

            {/* With Images */}
            <Avatar
                src="https://i.pravatar.cc/150?img=1"
                alt="User 1"
                fallback="U1"
                size={AvatarSize.MD}
            />
            <Avatar
                src="https://i.pravatar.cc/150?img=2"
                alt="User 2"
                fallback="U2"
                size={AvatarSize.MD}
            />
            <Avatar
                src="https://i.pravatar.cc/150?img=3"
                alt="User 3"
                fallback="U3"
                size={AvatarSize.MD}
            />

            {/* With Online Status - Top */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.SM}
                online={true}
                onlinePosition={AvatarOnlinePosition.TOP}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.REGULAR}
                online={true}
                onlinePosition={AvatarOnlinePosition.TOP}
            />
            <Avatar
                alt="Bob Johnson"
                fallback="BJ"
                size={AvatarSize.MD}
                online={true}
                onlinePosition={AvatarOnlinePosition.TOP}
            />
            <Avatar
                alt="Alice Brown"
                fallback="AB"
                size={AvatarSize.LG}
                online={true}
                onlinePosition={AvatarOnlinePosition.TOP}
            />
            <Avatar
                alt="Charlie Wilson"
                fallback="CW"
                size={AvatarSize.XL}
                online={true}
                onlinePosition={AvatarOnlinePosition.TOP}
            />

            {/* With Online Status - Bottom */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                online={true}
                onlinePosition={AvatarOnlinePosition.BOTTOM}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                online={true}
                onlinePosition={AvatarOnlinePosition.BOTTOM}
            />

            {/* With Leading Slot */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                leadingSlot={<User size={16} />}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                leadingSlot={<Star size={16} />}
            />

            {/* With Trailing Slot */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                trailingSlot={<Settings size={16} />}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                trailingSlot={<Star size={16} />}
            />

            {/* With Both Slots */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                leadingSlot={<User size={16} />}
                trailingSlot={<Settings size={16} />}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                leadingSlot={<Star size={16} />}
                trailingSlot={<User size={16} />}
            />

            {/* Interactive Avatar */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                onClick={() => {
                    console.log('Avatar clicked')
                }}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                online={true}
                onClick={() => {
                    console.log('Avatar clicked')
                }}
            />

            {/* With Skeleton */}
            <Avatar
                alt="John Doe"
                fallback="JD"
                size={AvatarSize.MD}
                skeleton={{
                    show: true,
                    variant: 'pulse',
                }}
            />
            <Avatar
                alt="Jane Smith"
                fallback="JS"
                size={AvatarSize.MD}
                skeleton={{
                    show: true,
                    variant: 'wave',
                }}
            />

            {/* Circular Shape Combinations */}
            <Avatar
                src="https://i.pravatar.cc/150?img=1"
                alt="User 1"
                fallback="U1"
                size={AvatarSize.MD}
                shape={AvatarShape.CIRCULAR}
                online={true}
            />
            <Avatar
                alt="User 2"
                fallback="U2"
                size={AvatarSize.MD}
                shape={AvatarShape.CIRCULAR}
                online={true}
                leadingSlot={<User size={16} />}
            />
            <Avatar
                alt="User 3"
                fallback="U3"
                size={AvatarSize.MD}
                shape={AvatarShape.CIRCULAR}
                trailingSlot={<Star size={16} />}
                onClick={() => {
                    console.log('Avatar clicked')
                }}
            />

            {/* Rounded Shape Combinations */}
            <Avatar
                src="https://i.pravatar.cc/150?img=4"
                alt="User 4"
                fallback="U4"
                size={AvatarSize.MD}
                shape={AvatarShape.ROUNDED}
                online={true}
            />
            <Avatar
                alt="User 5"
                fallback="U5"
                size={AvatarSize.MD}
                shape={AvatarShape.ROUNDED}
                online={true}
                leadingSlot={<User size={16} />}
            />
            <Avatar
                alt="User 6"
                fallback="U6"
                size={AvatarSize.MD}
                shape={AvatarShape.ROUNDED}
                trailingSlot={<Settings size={16} />}
                onClick={() => {
                    console.log('Avatar clicked')
                }}
            />
        </>
    )
}

export default AvatarLightHouse
