import { AvatarGroup } from '../../../AvatarGroup'
import { AvatarSize, AvatarShape } from '../../../Avatar'

const AvatarGroupLightHouse = () => {
    return (
        <>
            {/* AvatarGroup - Basic */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                        src: 'https://i.pravatar.cc/150?img=1',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                        src: 'https://i.pravatar.cc/150?img=2',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                        src: 'https://i.pravatar.cc/150?img=3',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.MD}
            />

            {/* AvatarGroup - With Overflow */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                        src: 'https://i.pravatar.cc/150?img=1',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                        src: 'https://i.pravatar.cc/150?img=2',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                        src: 'https://i.pravatar.cc/150?img=3',
                    },
                    {
                        id: 4,
                        alt: 'Alice Brown',
                        fallback: 'AB',
                        src: 'https://i.pravatar.cc/150?img=4',
                    },
                    {
                        id: 5,
                        alt: 'Charlie Wilson',
                        fallback: 'CW',
                        src: 'https://i.pravatar.cc/150?img=5',
                    },
                    {
                        id: 6,
                        alt: 'Diana Prince',
                        fallback: 'DP',
                        src: 'https://i.pravatar.cc/150?img=6',
                    },
                    {
                        id: 7,
                        alt: 'Eve Adams',
                        fallback: 'EA',
                        src: 'https://i.pravatar.cc/150?img=7',
                    },
                ]}
                maxCount={5}
                size={AvatarSize.MD}
            />

            {/* AvatarGroup - With Selection */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                        src: 'https://i.pravatar.cc/150?img=1',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                        src: 'https://i.pravatar.cc/150?img=2',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                        src: 'https://i.pravatar.cc/150?img=3',
                    },
                    {
                        id: 4,
                        alt: 'Alice Brown',
                        fallback: 'AB',
                        src: 'https://i.pravatar.cc/150?img=4',
                    },
                ]}
                maxCount={4}
                size={AvatarSize.MD}
                selectedAvatarIds={[1, 3]}
                onSelectionChange={(selectedIds) => {
                    console.log('Selected avatars:', selectedIds)
                }}
            />

            {/* AvatarGroup - Small Size */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.SM}
            />

            {/* AvatarGroup - Medium Size */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.MD}
            />

            {/* AvatarGroup - Large Size */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.LG}
            />

            {/* AvatarGroup - Circular Shape */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.MD}
                shape={AvatarShape.CIRCULAR}
            />

            {/* AvatarGroup - Rounded Shape */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.MD}
                shape={AvatarShape.ROUNDED}
            />

            {/* AvatarGroup - With Skeleton */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                    },
                ]}
                maxCount={3}
                size={AvatarSize.MD}
                skeleton={{
                    show: true,
                    variant: 'pulse',
                }}
            />

            {/* AvatarGroup - Large Overflow */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                        src: 'https://i.pravatar.cc/150?img=1',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                        src: 'https://i.pravatar.cc/150?img=2',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                        src: 'https://i.pravatar.cc/150?img=3',
                    },
                    {
                        id: 4,
                        alt: 'Alice Brown',
                        fallback: 'AB',
                        src: 'https://i.pravatar.cc/150?img=4',
                    },
                    {
                        id: 5,
                        alt: 'Charlie Wilson',
                        fallback: 'CW',
                        src: 'https://i.pravatar.cc/150?img=5',
                    },
                    {
                        id: 6,
                        alt: 'Diana Prince',
                        fallback: 'DP',
                        src: 'https://i.pravatar.cc/150?img=6',
                    },
                    {
                        id: 7,
                        alt: 'Eve Adams',
                        fallback: 'EA',
                        src: 'https://i.pravatar.cc/150?img=7',
                    },
                    {
                        id: 8,
                        alt: 'Frank Miller',
                        fallback: 'FM',
                        src: 'https://i.pravatar.cc/150?img=8',
                    },
                    {
                        id: 9,
                        alt: 'Grace Lee',
                        fallback: 'GL',
                        src: 'https://i.pravatar.cc/150?img=9',
                    },
                    {
                        id: 10,
                        alt: 'Henry Taylor',
                        fallback: 'HT',
                        src: 'https://i.pravatar.cc/150?img=10',
                    },
                ]}
                maxCount={5}
                size={AvatarSize.MD}
            />

            {/* AvatarGroup - Max Count 1 */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                        src: 'https://i.pravatar.cc/150?img=1',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                        src: 'https://i.pravatar.cc/150?img=2',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                        src: 'https://i.pravatar.cc/150?img=3',
                    },
                ]}
                maxCount={1}
                size={AvatarSize.MD}
            />

            {/* AvatarGroup - Max Count 2 */}
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'John Doe',
                        fallback: 'JD',
                        src: 'https://i.pravatar.cc/150?img=1',
                    },
                    {
                        id: 2,
                        alt: 'Jane Smith',
                        fallback: 'JS',
                        src: 'https://i.pravatar.cc/150?img=2',
                    },
                    {
                        id: 3,
                        alt: 'Bob Johnson',
                        fallback: 'BJ',
                        src: 'https://i.pravatar.cc/150?img=3',
                    },
                ]}
                maxCount={2}
                size={AvatarSize.MD}
            />
        </>
    )
}

export default AvatarGroupLightHouse
