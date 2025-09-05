import { Hash, X, Plus, Download, Upload, Settings } from 'lucide-react'
import { useState } from 'react'
import {
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../../packages/blend/lib/components/Button'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const ButtonDemo = () => {
    const [playgroundText, setPlaygroundText] = useState('Click me')
    const [playgroundType, setPlaygroundType] = useState<ButtonType>(
        ButtonType.PRIMARY
    )
    const [playgroundSize, setPlaygroundSize] = useState<ButtonSize>(
        ButtonSize.MEDIUM
    )
    const [playgroundSubType, setPlaygroundSubType] = useState<ButtonSubType>(
        ButtonSubType.DEFAULT
    )
    const [showLeadingIcon, setShowLeadingIcon] = useState(false)
    const [showTrailingIcon, setShowTrailingIcon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [fullWidth, setFullWidth] = useState(false)

    // Options for selects
    const typeOptions = [
        { value: ButtonType.PRIMARY, label: 'Primary' },
        { value: ButtonType.SECONDARY, label: 'Secondary' },
        { value: ButtonType.DANGER, label: 'Danger' },
        { value: ButtonType.SUCCESS, label: 'Success' },
    ]

    const sizeOptions = [
        { value: ButtonSize.SMALL, label: 'Small' },
        { value: ButtonSize.MEDIUM, label: 'Medium' },
        { value: ButtonSize.LARGE, label: 'Large' },
    ]

    const subTypeOptions = [
        { value: ButtonSubType.DEFAULT, label: 'Default' },
        { value: ButtonSubType.ICON_ONLY, label: 'Icon Only' },
        { value: ButtonSubType.INLINE, label: 'Inline' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Text"
                            value={playgroundText}
                            onChange={(e) => setPlaygroundText(e.target.value)}
                            placeholder="Enter button text"
                        />

                        <SingleSelect
                            label="Type"
                            items={[{ items: typeOptions }]}
                            selected={playgroundType}
                            onSelect={(value) =>
                                setPlaygroundType(value as ButtonType)
                            }
                            placeholder="Select type"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as ButtonSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Sub Type"
                            items={[{ items: subTypeOptions }]}
                            selected={playgroundSubType}
                            onSelect={(value) =>
                                setPlaygroundSubType(value as ButtonSubType)
                            }
                            placeholder="Select sub type"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Leading Icon"
                            checked={showLeadingIcon}
                            onChange={() =>
                                setShowLeadingIcon(!showLeadingIcon)
                            }
                        />
                        <Switch
                            label="Trailing Icon"
                            checked={showTrailingIcon}
                            onChange={() =>
                                setShowTrailingIcon(!showTrailingIcon)
                            }
                        />
                        <Switch
                            label="Loading"
                            checked={isLoading}
                            onChange={() => setIsLoading(!isLoading)}
                        />
                        <Switch
                            label="Skeleton Loading"
                            checked={isSkeletonLoading}
                            onChange={() =>
                                setIsSkeletonLoading(!isSkeletonLoading)
                            }
                        />
                        <Switch
                            label="Disabled"
                            checked={isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                        <Switch
                            label="Full Width"
                            checked={fullWidth}
                            onChange={() => setFullWidth(!fullWidth)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
                        <Button
                            text={
                                playgroundSubType === ButtonSubType.ICON_ONLY
                                    ? undefined
                                    : playgroundText
                            }
                            buttonType={playgroundType}
                            size={playgroundSize}
                            subType={playgroundSubType}
                            leadingIcon={
                                showLeadingIcon ? <Hash size={16} /> : undefined
                            }
                            trailingIcon={
                                showTrailingIcon ? <X size={16} /> : undefined
                            }
                            loading={isLoading}
                            skeletonLoading={isSkeletonLoading}
                            disabled={isDisabled}
                            fullWidth={fullWidth}
                            onClick={() => {
                                addSnackbar({
                                    header: 'Button clicked!',
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Button Types */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Button Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.values(ButtonType).map((type) => (
                        <div key={type} className="space-y-3">
                            <h3 className="text-sm font-medium capitalize">
                                {type}
                            </h3>
                            <div className="space-y-2">
                                <Button
                                    text="Button"
                                    buttonType={type}
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${type} button clicked!`,
                                        })
                                    }}
                                />
                                <Button
                                    text="With Icon"
                                    buttonType={type}
                                    leadingIcon={<Plus size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${type} button with icon clicked!`,
                                        })
                                    }}
                                />
                                <Button
                                    buttonType={type}
                                    leadingIcon={<Settings size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${type} icon button clicked!`,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(ButtonSize).map((size) => (
                        <div key={size} className="space-y-3">
                            <h3 className="text-sm font-medium capitalize">
                                {size}
                            </h3>
                            <div className="space-y-2">
                                <Button
                                    text="Button"
                                    size={size}
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${size} button clicked!`,
                                        })
                                    }}
                                />
                                <Button
                                    text="With Icon"
                                    size={size}
                                    leadingIcon={
                                        <Download
                                            size={
                                                size === ButtonSize.SMALL
                                                    ? 14
                                                    : size === ButtonSize.MEDIUM
                                                      ? 16
                                                      : 18
                                            }
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${size} button with icon clicked!`,
                                        })
                                    }}
                                />
                                <Button
                                    size={size}
                                    leadingIcon={
                                        <Upload
                                            size={
                                                size === ButtonSize.SMALL
                                                    ? 14
                                                    : size === ButtonSize.MEDIUM
                                                      ? 16
                                                      : 18
                                            }
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${size} icon button clicked!`,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sub Types */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sub Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(ButtonSubType).map((subType) => (
                        <div key={subType} className="space-y-3">
                            <h3 className="text-sm font-medium capitalize">
                                {subType.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <div className="space-y-2">
                                <Button
                                    text={
                                        subType === ButtonSubType.ICON_ONLY
                                            ? undefined
                                            : 'Button'
                                    }
                                    subType={subType}
                                    leadingIcon={
                                        subType === ButtonSubType.ICON_ONLY ? (
                                            <Settings size={16} />
                                        ) : (
                                            <Plus size={16} />
                                        )
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${subType} button clicked!`,
                                        })
                                    }}
                                />
                                <Button
                                    text={
                                        subType === ButtonSubType.ICON_ONLY
                                            ? undefined
                                            : 'Danger'
                                    }
                                    buttonType={ButtonType.DANGER}
                                    subType={subType}
                                    leadingIcon={
                                        subType === ButtonSubType.ICON_ONLY ? (
                                            <X size={16} />
                                        ) : (
                                            <X size={16} />
                                        )
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: `${subType} danger button clicked!`,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Default</h3>
                        <Button
                            text="Button"
                            onClick={() => {
                                addSnackbar({
                                    header: 'Default button clicked!',
                                })
                            }}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Loading (Spinner)
                        </h3>
                        <Button text="Loading" loading={true} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Skeleton Loading
                        </h3>
                        <Button text="Skeleton" skeletonLoading={true} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <Button text="Disabled" disabled={true} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Full Width</h3>
                        <Button
                            text="Full Width"
                            fullWidth={true}
                            onClick={() => {
                                addSnackbar({
                                    header: 'Full width button clicked!',
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Skeleton Loading Showcase */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Skeleton Loading Showcase
                </h2>
                <p className="text-gray-600">
                    Skeleton loading provides a better perceived performance
                    during initial page loads. Compare with traditional spinner
                    loading for user actions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Different sizes */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">All Sizes</h3>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Small</p>
                                <Button
                                    text="Small"
                                    size={ButtonSize.SMALL}
                                    skeletonLoading={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Medium</p>
                                <Button
                                    text="Medium"
                                    size={ButtonSize.MEDIUM}
                                    skeletonLoading={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Large</p>
                                <Button
                                    text="Large"
                                    size={ButtonSize.LARGE}
                                    skeletonLoading={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Different types */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">All Types</h3>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Primary</p>
                                <Button
                                    text="Primary"
                                    buttonType={ButtonType.PRIMARY}
                                    skeletonLoading={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    Secondary
                                </p>
                                <Button
                                    text="Secondary"
                                    buttonType={ButtonType.SECONDARY}
                                    skeletonLoading={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Danger</p>
                                <Button
                                    text="Danger"
                                    buttonType={ButtonType.DANGER}
                                    skeletonLoading={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Success</p>
                                <Button
                                    text="Success"
                                    buttonType={ButtonType.SUCCESS}
                                    skeletonLoading={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Different widths */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Width Variations
                        </h3>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    Default Width
                                </p>
                                <Button text="Normal" skeletonLoading={true} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    Full Width
                                </p>
                                <Button
                                    text="Full Width"
                                    fullWidth={true}
                                    skeletonLoading={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Button
                        text="Download"
                        leadingIcon={<Download size={16} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Download started!',
                            })
                        }}
                    />
                    <Button
                        text="Upload"
                        trailingIcon={<Upload size={16} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Upload started!',
                            })
                        }}
                    />
                    <Button
                        text="Settings"
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Settings size={16} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Settings opened!',
                            })
                        }}
                    />
                    <Button
                        text="Delete"
                        buttonType={ButtonType.DANGER}
                        leadingIcon={<X size={16} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Delete confirmed!',
                            })
                        }}
                    />
                </div>
            </div>

            {/* All Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Combinations</h2>
                <div className="space-y-8">
                    {Object.values(ButtonType).map((type) => (
                        <div key={type} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {type} Type
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.values(ButtonSize).map((size) => (
                                    <div key={size} className="space-y-2">
                                        <h4 className="text-xs font-medium capitalize text-gray-600">
                                            {size}
                                        </h4>
                                        <div className="space-y-1">
                                            <Button
                                                text="S"
                                                buttonType={type}
                                                size={size}
                                                onClick={() => {
                                                    addSnackbar({
                                                        header: `${type} ${size} button clicked!`,
                                                    })
                                                }}
                                            />
                                            <Button
                                                text="M"
                                                buttonType={type}
                                                size={size}
                                                leadingIcon={
                                                    <Plus
                                                        size={
                                                            size ===
                                                            ButtonSize.SMALL
                                                                ? 14
                                                                : size ===
                                                                    ButtonSize.MEDIUM
                                                                  ? 16
                                                                  : 18
                                                        }
                                                    />
                                                }
                                                onClick={() => {
                                                    addSnackbar({
                                                        header: `${type} ${size} button with icon clicked!`,
                                                    })
                                                }}
                                            />
                                            <Button
                                                buttonType={type}
                                                size={size}
                                                leadingIcon={
                                                    <Settings
                                                        size={
                                                            size ===
                                                            ButtonSize.SMALL
                                                                ? 14
                                                                : size ===
                                                                    ButtonSize.MEDIUM
                                                                  ? 16
                                                                  : 18
                                                        }
                                                    />
                                                }
                                                onClick={() => {
                                                    addSnackbar({
                                                        header: `${type} ${size} icon button clicked!`,
                                                    })
                                                }}
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

export default ButtonDemo
