import {
    Avatar,
    AvatarSize,
    AvatarShape,
} from '../../../../packages/blend/lib/components/Avatar'
import { SkeletonAvatar } from '../../../../packages/blend/lib/components/Skeleton'
import type { SkeletonVariant } from '../../../../packages/blend/lib/components/Skeleton/skeleton.tokens'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { User, Settings, Bell, Mail, Phone, Camera } from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { AvatarGroup } from '../../../../packages/blend/lib/components/AvatarGroup'

const AvatarDemo = () => {
    // Pure Avatar Playground State
    const [playgroundSrc, setPlaygroundSrc] = useState('')
    const [playgroundAlt, setPlaygroundAlt] = useState('John Doe')
    const [playgroundSize, setPlaygroundSize] = useState<AvatarSize>(
        AvatarSize.MD
    )
    const [playgroundShape, setPlaygroundShape] = useState<AvatarShape>(
        AvatarShape.CIRCULAR
    )
    const [playgroundOnline, setPlaygroundOnline] = useState(false)
    const [showLeadingSlot, setShowLeadingSlot] = useState(false)
    const [showTrailingSlot, setShowTrailingSlot] = useState(false)

    // SkeletonAvatar Playground State
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

    const skeletonVariantOptions = [
        { value: 'pulse' as SkeletonVariant, label: 'Pulse' },
        { value: 'wave' as SkeletonVariant, label: 'Wave' },
        { value: 'shimmer' as SkeletonVariant, label: 'Shimmer' },
    ]

    // Sample avatar data for AvatarGroup
    const sampleAvatars = [
        {
            id: '1',
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            alt: 'John Doe',
            fallback: 'JD',
        },
        {
            id: '2',
            src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            alt: 'Jane Smith',
            fallback: 'JS',
        },
        {
            id: '3',
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            alt: 'Mike Johnson',
            fallback: 'MJ',
        },
        {
            id: '4',
            src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            alt: 'Sarah Wilson',
            fallback: 'SW',
        },
        {
            id: '5',
            src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            alt: 'David Brown',
            fallback: 'DB',
        },
        {
            id: '6',
            src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            alt: 'Emily Davis',
            fallback: 'ED',
        },
        {
            id: '7',
            src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
            alt: 'Alex Turner',
            fallback: 'AT',
        },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Avatar Component Demo</h1>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                        <strong>Hybrid Approach:</strong> Avatar is now pure (no
                        skeleton logic). SkeletonAvatar handles loading states
                        with perfect token mirroring.
                    </p>
                </div>
            </div>

            {/* Pure Avatar Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    ✅ Pure Avatar Playground
                </h2>
                <p className="text-gray-600">
                    Test the pure Avatar component focused only on UI rendering
                </p>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Image URL"
                            value={playgroundSrc}
                            onChange={(e) => setPlaygroundSrc(e.target.value)}
                            placeholder="Enter image URL or leave empty for fallback"
                        />

                        <TextInput
                            label="Alt Text"
                            value={playgroundAlt}
                            onChange={(e) => setPlaygroundAlt(e.target.value)}
                            placeholder="Enter alt text"
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
                            label="Online Status"
                            checked={playgroundOnline}
                            onChange={() =>
                                setPlaygroundOnline(!playgroundOnline)
                            }
                        />
                        <Switch
                            label="Leading Slot"
                            checked={showLeadingSlot}
                            onChange={() =>
                                setShowLeadingSlot(!showLeadingSlot)
                            }
                        />
                        <Switch
                            label="Trailing Slot"
                            checked={showTrailingSlot}
                            onChange={() =>
                                setShowTrailingSlot(!showTrailingSlot)
                            }
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
                        <Avatar
                            src={playgroundSrc || undefined}
                            alt={playgroundAlt}
                            size={playgroundSize}
                            shape={playgroundShape}
                            online={playgroundOnline}
                            leadingSlot={
                                showLeadingSlot ? <User size={16} /> : undefined
                            }
                            trailingSlot={
                                showTrailingSlot ? (
                                    <Settings size={16} />
                                ) : undefined
                            }
                            onClick={() => {
                                addSnackbar({
                                    header: 'Avatar clicked!',
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* SkeletonAvatar Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔄 SkeletonAvatar Playground
                </h2>
                <p className="text-gray-600">
                    Test SkeletonAvatar with perfect token mirroring - should
                    match Avatar dimensions exactly
                </p>

                {/* Controls */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        <SkeletonAvatar
                            size={skeletonSize}
                            shape={skeletonShape}
                            variant={skeletonVariant}
                            loading={true}
                        />
                    </div>
                </div>
            </div>

            {/* Token Mirroring Comparison */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🎯 Token Mirroring Comparison
                </h2>
                <p className="text-gray-600">
                    Side-by-side comparison showing perfect dimensional matching
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Object.values(AvatarSize).map((size) => (
                        <div key={size} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {size} Size
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-600">
                                        Real Avatar
                                    </h4>
                                    <div className="flex gap-3 items-center">
                                        <Avatar
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                            alt="John Doe"
                                            size={size}
                                            online={true}
                                        />
                                        <Avatar
                                            alt="JS"
                                            fallback="JS"
                                            size={size}
                                            shape={AvatarShape.ROUNDED}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-600">
                                        Skeleton Avatar
                                    </h4>
                                    <div className="flex gap-3 items-center">
                                        <SkeletonAvatar
                                            size={size}
                                            shape={AvatarShape.CIRCULAR}
                                            variant="pulse"
                                        />
                                        <SkeletonAvatar
                                            size={size}
                                            shape={AvatarShape.ROUNDED}
                                            variant="pulse"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                            <div className="flex items-start justify-start gap-2 p-3">
                                <Avatar
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                    alt="John Doe"
                                    size={size}
                                    online={true}
                                />
                                <Avatar
                                    alt="Jane Smith"
                                    fallback="JS"
                                    size={size}
                                    online={false}
                                />
                                <Avatar
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                    alt="Mike Johnson"
                                    size={size}
                                    online={true}
                                />
                            </div>
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
                            <div className="grid grid-cols-2 gap-3">
                                <Avatar
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                    alt="John Doe"
                                    shape={shape}
                                    online={true}
                                />
                                <Avatar
                                    alt="Jane Smith"
                                    fallback="JS"
                                    shape={shape}
                                    online={false}
                                />
                                <Avatar
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                    alt="Mike Johnson"
                                    shape={shape}
                                    online={true}
                                />
                                <Avatar
                                    alt="Sarah Wilson"
                                    fallback="SW"
                                    shape={shape}
                                    online={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Online Status */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Online Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Online</h3>
                        <div className="space-y-2">
                            <Avatar
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                alt="John Doe"
                                online={true}
                            />
                            <Avatar
                                alt="Jane Smith"
                                fallback="JS"
                                online={true}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Offline</h3>
                        <div className="space-y-2">
                            <Avatar
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                alt="Mike Johnson"
                                online={false}
                            />
                            <Avatar
                                alt="Sarah Wilson"
                                fallback="SW"
                                online={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Slots */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Slots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Leading Slot</h3>
                        <div className="space-y-2">
                            <Avatar
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                alt="John Doe"
                                leadingSlot={<User size={16} />}
                            />
                            <Avatar
                                alt="Jane Smith"
                                fallback="JS"
                                leadingSlot={<Mail size={16} />}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Trailing Slot</h3>
                        <div className="space-y-2">
                            <Avatar
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                alt="Mike Johnson"
                                trailingSlot={<Settings size={16} />}
                            />
                            <Avatar
                                alt="Sarah Wilson"
                                fallback="SW"
                                trailingSlot={<Bell size={16} />}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Both Slots</h3>
                        <div className="space-y-2">
                            <Avatar
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                                alt="Emily Davis"
                                leadingSlot={<Phone size={16} />}
                                trailingSlot={<Camera size={16} />}
                            />
                            <Avatar
                                alt="Alex Turner"
                                fallback="AT"
                                leadingSlot={<User size={16} />}
                                trailingSlot={<Settings size={16} />}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        alt="Clickable Avatar"
                        onClick={() => {
                            addSnackbar({
                                header: 'Avatar clicked!',
                            })
                        }}
                    />
                    <Avatar
                        alt="Fallback Avatar"
                        fallback="JD"
                        onClick={() => {
                            addSnackbar({
                                header: 'Fallback avatar clicked!',
                            })
                        }}
                    />
                    <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                        alt="Online Avatar"
                        online={true}
                        onClick={() => {
                            addSnackbar({
                                header: 'Online avatar clicked!',
                            })
                        }}
                    />
                    <Avatar
                        alt="Slotted Avatar"
                        fallback="JS"
                        leadingSlot={<User size={16} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Slotted avatar clicked!',
                            })
                        }}
                    />
                    <Avatar
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                        alt="Rounded Avatar"
                        shape={AvatarShape.ROUNDED}
                        onClick={() => {
                            addSnackbar({
                                header: 'Rounded avatar clicked!',
                            })
                        }}
                    />
                </div>
            </div>

            {/* Avatar Groups */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Avatar Groups</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Basic Avatar Group
                        </h3>
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 4)}
                            size={AvatarSize.MD}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            🔄 Loading State (Skeleton)
                        </h3>
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 4)}
                            size={AvatarSize.MD}
                            shape={AvatarShape.CIRCULAR}
                            loading={true}
                            skeletonVariant="pulse"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            With Overflow (Max 3)
                        </h3>
                        <AvatarGroup
                            avatars={sampleAvatars}
                            maxCount={3}
                            size={AvatarSize.MD}
                            shape={AvatarShape.CIRCULAR}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Large Rounded Group
                        </h3>
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 5)}
                            size={AvatarSize.LG}
                            shape={AvatarShape.ROUNDED}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Small Group with Selection
                        </h3>
                        <AvatarGroup
                            avatars={sampleAvatars.slice(0, 4)}
                            size={AvatarSize.SM}
                            shape={AvatarShape.CIRCULAR}
                            selectedAvatarIds={['1', '3']}
                            onSelectionChange={(selectedIds) => {
                                addSnackbar({
                                    header: `Selected avatars: ${selectedIds.join(', ')}`,
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* All Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Combinations</h2>
                <div className="space-y-8">
                    {Object.values(AvatarShape).map((shape) => (
                        <div key={shape} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {shape} Shape
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.values(AvatarSize).map((size) => (
                                    <div key={size} className="space-y-2">
                                        <h4 className="text-xs font-medium uppercase text-gray-600">
                                            {size}
                                        </h4>
                                        <div className="space-y-1">
                                            <Avatar
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                                alt="John Doe"
                                                size={size}
                                                shape={shape}
                                                online={true}
                                            />
                                            <Avatar
                                                alt="Jane Smith"
                                                fallback="JS"
                                                size={size}
                                                shape={shape}
                                                online={false}
                                            />
                                            <Avatar
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                                alt="Mike Johnson"
                                                size={size}
                                                shape={shape}
                                                leadingSlot={
                                                    <User
                                                        size={
                                                            size ===
                                                            AvatarSize.SM
                                                                ? 12
                                                                : size ===
                                                                    AvatarSize.MD
                                                                  ? 16
                                                                  : 20
                                                        }
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AvatarDemo
