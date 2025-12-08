import { useState } from 'react'
import { AvatarGroup } from '../../../../packages/blend/lib/components/AvatarGroup'

import { Settings, User } from 'lucide-react'
import {
    AvatarShape,
    AvatarSize,
} from '../../../../packages/blend/lib/components/Avatar'
import { Switch } from '../../../../packages/blend/lib/main'

// Sample avatar data
const sampleAvatars = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'John Doe',
        fallback: 'JD',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'Sarah Wilson',
        fallback: 'SW',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'Robert Johnson',
        fallback: 'RJ',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'Emily Davis',
        fallback: 'ED',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'Michael Brown',
        fallback: 'MB',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'Jessica Miller',
        fallback: 'JM',
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'David Wilson',
        fallback: 'DW',
    },
    {
        id: 8,
        alt: 'Alex Taylor',
        fallback: 'AT',
    },
]

// Create a larger set for the example with many avatars
const manyAvatars = [
    ...sampleAvatars,
    {
        id: 9,
        alt: 'Thomas Hill',
        fallback: 'TH',
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        alt: 'Patricia Moore',
        fallback: 'PM',
    },
    {
        id: 11,
        fallback: <Settings size={18} />,
        alt: 'Settings account',
    },
    {
        id: 12,
        fallback: <User size={18} />,
        alt: 'Unknown user',
    },
]

const AvatarGroupDemo = () => {
    const [selectedAvatars, setSelectedAvatars] = useState<(string | number)[]>(
        [1, 3]
    )
    const [showSkeleton, setShowSkeleton] = useState(false)

    const handleSelectionChange = (selectedIds: (string | number)[]) => {
        setSelectedAvatars(selectedIds)
        console.log('Selected avatar IDs:', selectedIds)
    }

    return (
        <div className="flex flex-col gap-8 p-8">
            <div>
                <h1 className="text-2xl font-semibold mb-4">
                    AvatarGroup Component
                </h1>
                <p className="text-base text-gray-600 mb-6">
                    AvatarGroup displays multiple avatars with configurable
                    overflow handling and selection states.
                </p>
            </div>
            <Switch
                label="Show Skeleton"
                checked={showSkeleton}
                onChange={() => setShowSkeleton(!showSkeleton)}
            />

            {/* Featured Demo */}
            <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-black">
                    Featured: Selection with Overflow
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    AvatarGroup displays a configurable number of avatars, with
                    an overflow counter for the rest. Users can select avatars
                    by clicking, with selected state visually indicated.
                </p>

                <div className="flex flex-col gap-6">
                    <AvatarGroup
                        skeleton={{ show: showSkeleton, variant: 'pulse' }}
                        avatars={sampleAvatars}
                        maxCount={5}
                        size={AvatarSize.MD}
                        selectedAvatarIds={selectedAvatars}
                        onSelectionChange={handleSelectionChange}
                    />

                    <p className="text-sm text-gray-600">
                        Currently selected avatar IDs:{' '}
                        {selectedAvatars.join(', ') || 'None'}
                    </p>
                </div>
            </div>

            {/* Different Sizes */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    AvatarGroup Sizes
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    AvatarGroups can be rendered in different sizes to fit
                    various UI needs.
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Small (SM)
                        </span>
                        <AvatarGroup
                            avatars={sampleAvatars}
                            maxCount={5}
                            size={AvatarSize.SM}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Medium (MD)
                        </span>
                        <AvatarGroup
                            avatars={sampleAvatars}
                            maxCount={5}
                            size={AvatarSize.MD}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Large (LG)
                        </span>
                        <AvatarGroup
                            avatars={sampleAvatars}
                            maxCount={5}
                            size={AvatarSize.LG}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            X-Large (XL)
                        </span>
                        <AvatarGroup
                            avatars={sampleAvatars}
                            maxCount={5}
                            size={AvatarSize.XL}
                        />
                    </div>
                </div>
            </div>

            {/* Different Shapes */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    AvatarGroup Shapes
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    AvatarGroups support different shapes matching the
                    underlying Avatar components.
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Circular (Default)
                        </span>
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 6)}
                            maxCount={4}
                            size={AvatarSize.MD}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">Rounded</span>
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 6)}
                            maxCount={4}
                            size={AvatarSize.MD}
                            shape={AvatarShape.ROUNDED}
                        />
                    </div>
                </div>
            </div>

            {/* Max Count Configuration */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    Max Visible Avatars
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    The maxCount prop controls how many avatars are visible
                    before showing the overflow counter.
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Max Count: 3
                        </span>
                        <AvatarGroup
                            avatars={manyAvatars}
                            maxCount={3}
                            size={AvatarSize.MD}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Max Count: 5
                        </span>
                        <AvatarGroup
                            avatars={manyAvatars}
                            maxCount={5}
                            size={AvatarSize.MD}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                            Max Count: 8
                        </span>
                        <AvatarGroup
                            avatars={manyAvatars}
                            maxCount={8}
                            size={AvatarSize.MD}
                        />
                    </div>
                </div>
            </div>

            {/* Mixed Content Examples */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    Mixed Avatar Content
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    AvatarGroups can contain avatars with images, initials, or
                    icon fallbacks.
                </p>
                <div>
                    <AvatarGroup
                        avatars={[
                            {
                                id: 1,
                                src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
                                alt: 'User with image',
                            },
                            {
                                id: 2,
                                alt: 'User with initials',
                                fallback: 'UI',
                            },
                            {
                                id: 3,
                                alt: 'Settings account',
                                fallback: <Settings size={18} />,
                            },
                            {
                                id: 4,
                                src: 'https://invalid-image-url.jpg',
                                alt: 'User with invalid image',
                                fallback: 'II',
                            },
                            {
                                id: 5,
                                alt: 'Unknown user',
                                fallback: <User size={18} />,
                            },
                        ]}
                        maxCount={4}
                        size={AvatarSize.MD}
                    />
                </div>
            </div>

            {/* Plain Avatars Example */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    Plain Avatars (Initials Only)
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    AvatarGroups can be rendered with plain initials for
                    abstract representations.
                </p>
                <div className="flex flex-col gap-6">
                    <div>
                        <AvatarGroup
                            avatars={[
                                { id: 1, alt: 'Plain Heading', fallback: 'PH' },
                                { id: 2, alt: 'Plain Heading', fallback: 'PH' },
                                { id: 3, alt: 'Plain Heading', fallback: 'PH' },
                                { id: 4, alt: 'Plain Heading', fallback: 'PH' },
                            ]}
                            maxCount={4}
                            size={AvatarSize.LG}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>

                    <div>
                        <AvatarGroup
                            avatars={Array.from({ length: 24 }, (_, i) => ({
                                id: i + 1,
                                alt: 'Plain Heading',
                                fallback: 'PH',
                            }))}
                            maxCount={3}
                            size={AvatarSize.LG}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Examples */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    Mixed Avatar Examples
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Different configurations for various use cases.
                </p>
                <div className="flex flex-col gap-6">
                    <div>
                        <AvatarGroup
                            avatars={[
                                {
                                    id: 1,
                                    src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
                                    alt: 'User 1',
                                },
                                {
                                    id: 2,
                                    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
                                    alt: 'User 2',
                                },
                                {
                                    id: 3,
                                    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
                                    alt: 'User 3',
                                },
                                {
                                    id: 4,
                                    src: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
                                    alt: 'User 4',
                                },
                            ]}
                            maxCount={4}
                            size={AvatarSize.LG}
                        />
                    </div>

                    <div>
                        <AvatarGroup
                            avatars={[
                                { id: 1, alt: 'User 1', fallback: 'PH' },
                                { id: 2, alt: 'User 2', fallback: 'PH' },
                                { id: 3, alt: 'User 3', fallback: 'PH' },
                                {
                                    id: 4,
                                    alt: 'User 4',
                                    fallback: <Settings size={18} />,
                                },
                            ]}
                            maxCount={4}
                            size={AvatarSize.LG}
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Selection Example */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    Interactive Selection
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Click on avatars to select/deselect them. The selection
                    state is visually indicated and tracked.
                </p>
                <div className="flex flex-col gap-4">
                    <AvatarGroupWithSelectionDemo />
                </div>
            </div>
        </div>
    )
}

// Interactive demo with state management
const AvatarGroupWithSelectionDemo = () => {
    const [selected, setSelected] = useState<(string | number)[]>([2, 4])

    return (
        <div className="flex flex-col gap-3">
            <AvatarGroup
                avatars={manyAvatars}
                maxCount={6}
                size={AvatarSize.LG}
                selectedAvatarIds={selected}
                onSelectionChange={setSelected}
            />

            <div className="flex gap-2 flex-wrap items-center">
                <span className="text-sm text-gray-600">Selected:</span>
                {selected.length > 0 ? (
                    selected.map((id) => (
                        <span
                            key={id}
                            className="px-2 py-1 bg-gray-200 rounded text-sm"
                        >
                            ID: {id}
                        </span>
                    ))
                ) : (
                    <span className="text-sm text-gray-600">None selected</span>
                )}
            </div>

            <div className="mt-2">
                <button
                    onClick={() => setSelected([])}
                    className="px-4 py-2 bg-gray-700 text-white border-none rounded cursor-pointer hover:bg-gray-800"
                >
                    Clear Selection
                </button>
            </div>
        </div>
    )
}

export default AvatarGroupDemo
