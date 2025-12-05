import {
    AvatarGroup,
    AvatarSize,
    AvatarShape,
} from '../../../packages/blend/lib/main'
import { Star, CheckCircle, Settings, User } from 'lucide-react'

function App() {
    const sampleAvatars = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            alt: 'John Doe',
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
            alt: 'Jane Smith',
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            alt: 'Mike Johnson',
        },
        {
            id: 4,
            alt: 'Sarah Wilson',
            fallback: 'SW',
        },
        {
            id: 5,
            alt: 'Emma Davis',
            fallback: 'ED',
        },
    ]

    const manyAvatars = [
        ...sampleAvatars,
        {
            id: 6,
            alt: 'Alex Chen',
            fallback: 'AC',
        },
        {
            id: 7,
            alt: 'Lisa Brown',
            fallback: 'LB',
        },
        {
            id: 8,
            alt: 'David Wilson',
            fallback: 'DW',
        },
        {
            id: 9,
            alt: 'Jessica Miller',
            fallback: 'JM',
        },
        {
            id: 10,
            alt: 'Robert Johnson',
            fallback: 'RJ',
        },
    ]

    const avatarsWithIcons = [
        {
            id: 1,
            alt: 'User Icon',
            fallback: <User size={20} />,
        },
        {
            id: 2,
            alt: 'Star User',
            fallback: <Star size={20} />,
        },
        {
            id: 3,
            alt: 'Settings',
            fallback: <Settings size={20} />,
        },
        {
            id: 4,
            alt: 'Check Circle',
            fallback: <CheckCircle size={20} />,
        },
    ]

    return (
        <>
            <AvatarGroup
                avatars={sampleAvatars.slice(0, 3)}
                size={AvatarSize.SM}
                maxCount={3}
            />
            <AvatarGroup
                avatars={sampleAvatars.slice(0, 3)}
                size={AvatarSize.REGULAR}
                maxCount={3}
            />
            <AvatarGroup
                avatars={sampleAvatars.slice(0, 3)}
                size={AvatarSize.MD}
                maxCount={3}
            />
            <AvatarGroup
                avatars={sampleAvatars.slice(0, 3)}
                size={AvatarSize.LG}
                maxCount={3}
            />
            <AvatarGroup
                avatars={sampleAvatars.slice(0, 3)}
                size={AvatarSize.XL}
                maxCount={3}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                shape={AvatarShape.CIRCULAR}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                shape={AvatarShape.ROUNDED}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                maxCount={3}
            />
            <AvatarGroup
                avatars={manyAvatars}
                size={AvatarSize.LG}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                maxCount={2}
            />
            <AvatarGroup
                avatars={avatarsWithIcons}
                size={AvatarSize.LG}
                maxCount={4}
            />
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'Custom Text',
                        fallback: '?',
                    },
                    {
                        id: 2,
                        alt: 'User',
                        fallback: 'U',
                    },
                ]}
                size={AvatarSize.LG}
                maxCount={2}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.MD}
                maxCount={3}
                skeleton={{ show: true, variant: 'pulse' }}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                maxCount={3}
                skeleton={{ show: true, variant: 'wave' }}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.SM}
                shape={AvatarShape.CIRCULAR}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.REGULAR}
                shape={AvatarShape.CIRCULAR}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.MD}
                shape={AvatarShape.CIRCULAR}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                shape={AvatarShape.CIRCULAR}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.XL}
                shape={AvatarShape.CIRCULAR}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.SM}
                shape={AvatarShape.ROUNDED}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.REGULAR}
                shape={AvatarShape.ROUNDED}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.MD}
                shape={AvatarShape.ROUNDED}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.LG}
                shape={AvatarShape.ROUNDED}
                maxCount={5}
            />
            <AvatarGroup
                avatars={sampleAvatars}
                size={AvatarSize.XL}
                shape={AvatarShape.ROUNDED}
                maxCount={5}
            />
        </>
    )
}

export default App
