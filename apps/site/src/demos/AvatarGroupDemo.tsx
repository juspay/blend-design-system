import { useState } from 'react'
import { AvatarGroup } from '../../../../packages/blend/lib/components/AvatarGroup'
import type { SkeletonVariant } from '../../../../packages/blend/lib/components/Skeleton/skeleton.tokens'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { Settings, User } from 'lucide-react'
import {
    AvatarShape,
    AvatarSize,
} from '../../../../packages/blend/lib/components/Avatar'

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
    // Pure AvatarGroup Playground State
    const [playgroundAvatars] = useState(sampleAvatars)
    const [playgroundMaxCount, setPlaygroundMaxCount] = useState('5')
    const [playgroundSize, setPlaygroundSize] = useState<AvatarSize>(
        AvatarSize.MD
    )
    const [playgroundShape, setPlaygroundShape] = useState<AvatarShape>(
        AvatarShape.CIRCULAR
    )
    const [playgroundSelectable, setPlaygroundSelectable] = useState(true)
    const [playgroundSelectedIds, setPlaygroundSelectedIds] = useState<
        (string | number)[]
    >([1, 3])

    // Skeleton AvatarGroup Playground State
    const [skeletonMaxCount, setSkeletonMaxCount] = useState('5')
    const [skeletonSize, setSkeletonSize] = useState<AvatarSize>(AvatarSize.MD)
    const [skeletonShape, setSkeletonShape] = useState<AvatarShape>(
        AvatarShape.CIRCULAR
    )
    const [skeletonVariant, setSkeletonVariant] =
        useState<SkeletonVariant>('pulse')

    // Options for selects
    const sizeOptions = [
        { value: AvatarSize.SM, label: 'Small' },
        { value: AvatarSize.MD, label: 'Medium' },
        { value: AvatarSize.LG, label: 'Large' },
        { value: AvatarSize.XL, label: 'Extra Large' },
    ]

    const shapeOptions = [
        { value: AvatarShape.CIRCULAR, label: 'Circular' },
        { value: AvatarShape.ROUNDED, label: 'Rounded' },
    ]

    const maxCountOptions = [
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '8', label: '8' },
    ]

    const skeletonVariantOptions = [
        { value: 'pulse' as SkeletonVariant, label: 'Pulse' },
        { value: 'wave' as SkeletonVariant, label: 'Wave' },
        { value: 'shimmer' as SkeletonVariant, label: 'Shimmer' },
    ]

    const handleSelectionChange = (selectedIds: (string | number)[]) => {
        setPlaygroundSelectedIds(selectedIds)
        addSnackbar({
            header: `Selected ${selectedIds.length} avatars`,
            description:
                selectedIds.length > 0
                    ? `IDs: ${selectedIds.join(', ')}`
                    : 'None selected',
        })
    }

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">
                    AvatarGroup Component Demo
                </h1>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                        <strong>Molecule Component:</strong> AvatarGroup is a
                        molecule that handles loading states with skeleton
                        variants and provides selection functionality.
                    </p>
                </div>
            </div>

            {/* Pure AvatarGroup Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    ✅ Pure AvatarGroup Playground
                </h2>
                <p className="text-gray-600">
                    Test the AvatarGroup component with different configurations
                </p>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SingleSelect
                            label="Max Count"
                            items={[{ items: maxCountOptions }]}
                            selected={playgroundMaxCount}
                            onSelect={(value) =>
                                setPlaygroundMaxCount(value as string)
                            }
                            placeholder="Select max count"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as AvatarSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Shape"
                            items={[{ items: shapeOptions }]}
                            selected={playgroundShape}
                            onSelect={(value) =>
                                setPlaygroundShape(value as AvatarShape)
                            }
                            placeholder="Select shape"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Selectable"
                            checked={playgroundSelectable}
                            onChange={() =>
                                setPlaygroundSelectable(!playgroundSelectable)
                            }
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-white">
                        <AvatarGroup
                            avatars={playgroundAvatars}
                            maxCount={parseInt(playgroundMaxCount)}
                            size={playgroundSize}
                            shape={playgroundShape}
                            selectedAvatarIds={
                                playgroundSelectable
                                    ? playgroundSelectedIds
                                    : undefined
                            }
                            onSelectionChange={
                                playgroundSelectable
                                    ? handleSelectionChange
                                    : undefined
                            }
                        />
                    </div>

                    {playgroundSelectable && (
                        <div className="text-sm text-gray-600">
                            Selected:{' '}
                            {playgroundSelectedIds.length > 0
                                ? playgroundSelectedIds.join(', ')
                                : 'None'}
                        </div>
                    )}
                </div>
            </div>

            {/* Skeleton AvatarGroup Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔄 Skeleton AvatarGroup Playground
                </h2>
                <p className="text-gray-600">
                    Test the AvatarGroup loading state with different skeleton
                    variants
                </p>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SingleSelect
                            label="Max Count"
                            items={[{ items: maxCountOptions }]}
                            selected={skeletonMaxCount}
                            onSelect={(value) =>
                                setSkeletonMaxCount(value as string)
                            }
                            placeholder="Select max count"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={skeletonSize}
                            onSelect={(value) =>
                                setSkeletonSize(value as AvatarSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Shape"
                            items={[{ items: shapeOptions }]}
                            selected={skeletonShape}
                            onSelect={(value) =>
                                setSkeletonShape(value as AvatarShape)
                            }
                            placeholder="Select shape"
                        />

                        <SingleSelect
                            label="Variant"
                            items={[{ items: skeletonVariantOptions }]}
                            selected={skeletonVariant}
                            onSelect={(value) =>
                                setSkeletonVariant(value as SkeletonVariant)
                            }
                            placeholder="Select variant"
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-white">
                        <AvatarGroup
                            avatars={sampleAvatars}
                            maxCount={parseInt(skeletonMaxCount)}
                            size={skeletonSize}
                            shape={skeletonShape}
                            loading={true}
                            skeletonVariant={skeletonVariant}
                        />
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.values(AvatarSize).map((size) => (
                        <div key={size} className="space-y-3">
                            <h3 className="text-sm font-medium uppercase">
                                {size}
                            </h3>
                            <AvatarGroup
                                avatars={sampleAvatars.slice(0, 4)}
                                maxCount={3}
                                size={size}
                                shape={AvatarShape.CIRCULAR}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Shapes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Shapes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.values(AvatarShape).map((shape) => (
                        <div key={shape} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {shape}
                            </h3>
                            <AvatarGroup
                                avatars={sampleAvatars.slice(0, 6)}
                                maxCount={4}
                                size={AvatarSize.MD}
                                shape={shape}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Max Count Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Max Count Configuration</h2>
                <p className="text-gray-600">
                    The maxCount prop controls how many avatars are visible
                    before showing the overflow counter
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[3, 5, 8].map((maxCount) => (
                        <div key={maxCount} className="space-y-3">
                            <h3 className="text-sm font-medium">
                                Max Count: {maxCount}
                            </h3>
                            <AvatarGroup
                                avatars={manyAvatars}
                                maxCount={maxCount}
                                size={AvatarSize.MD}
                                shape={AvatarShape.CIRCULAR}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mixed Content Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Mixed Avatar Content</h2>
                <p className="text-gray-600">
                    AvatarGroups can contain avatars with images, initials, or
                    icon fallbacks
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Images, Initials & Icons
                        </h3>
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
                                    alt: 'Unknown user',
                                    fallback: <User size={18} />,
                                },
                            ]}
                            maxCount={3}
                            size={AvatarSize.MD}
                        />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Plain Initials</h3>
                        <AvatarGroup
                            avatars={Array.from({ length: 12 }, (_, i) => ({
                                id: i + 1,
                                alt: 'Plain Heading',
                                fallback: 'PH',
                            }))}
                            maxCount={3}
                            size={AvatarSize.MD}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Selection Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Selection</h2>
                <p className="text-gray-600">
                    Click on avatars to select/deselect them. Selection state is
                    visually indicated
                </p>
                <AvatarGroupWithSelectionDemo />
            </div>
        </div>
    )
}

// Interactive demo with state management
const AvatarGroupWithSelectionDemo = () => {
    const [selected, setSelected] = useState<(string | number)[]>([2, 4])

    const handleSelectionChange = (selectedIds: (string | number)[]) => {
        setSelected(selectedIds)
        addSnackbar({
            header: `Selection changed`,
            description:
                selectedIds.length > 0
                    ? `Selected: ${selectedIds.join(', ')}`
                    : 'All deselected',
        })
    }

    return (
        <div className="space-y-6">
            <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-white">
                <AvatarGroup
                    avatars={manyAvatars}
                    maxCount={6}
                    size={AvatarSize.LG}
                    selectedAvatarIds={selected}
                    onSelectionChange={handleSelectionChange}
                />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
                <span className="text-sm font-medium text-gray-600">
                    Selected:
                </span>
                {selected.length > 0 ? (
                    selected.map((id) => (
                        <span
                            key={id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                            ID: {id}
                        </span>
                    ))
                ) : (
                    <span className="text-sm text-gray-500 italic">
                        None selected
                    </span>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => setSelected([])}
                    className="px-4 py-2 bg-gray-600 text-white border-none rounded-lg cursor-pointer hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                    Clear Selection
                </button>
                <button
                    onClick={() =>
                        setSelected(manyAvatars.slice(0, 4).map((a) => a.id))
                    }
                    className="px-4 py-2 bg-blue-600 text-white border-none rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Select First 4
                </button>
            </div>
        </div>
    )
}

export default AvatarGroupDemo
