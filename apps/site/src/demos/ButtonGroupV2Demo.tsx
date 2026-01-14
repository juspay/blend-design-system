import {
    ButtonV2,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../../packages/blend/lib/components/ButtonV2'
import { ButtonGroup } from '../../../../packages/blend/lib/components/ButtonV2/ButtonGroup'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    Hash,
    X,
    Plus,
    Star,
    Download,
    Upload,
    Settings,
    Edit,
    Trash2,
    Eye,
    ChevronDown,
    Filter,
} from 'lucide-react'
import {
    Tag,
    TagSize,
    TagColor,
    TagVariant,
} from '../../../../packages/blend/lib/components/Tags'
import { useState } from 'react'

const ButtonGroupV2Demo = () => {
    const [playgroundStacked, setPlaygroundStacked] = useState(false)
    const [playgroundButtonType, setPlaygroundButtonType] =
        useState<ButtonType>(ButtonType.PRIMARY)
    const [playgroundSize, setPlaygroundSize] = useState<ButtonSize>(
        ButtonSize.MEDIUM
    )
    const [playgroundSubType, setPlaygroundSubType] = useState<ButtonSubType>(
        ButtonSubType.DEFAULT
    )
    const [playgroundCount, setPlaygroundCount] = useState('3')

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

    const countOptions = [
        { value: '2', label: '2 Buttons' },
        { value: '3', label: '3 Buttons' },
        { value: '4', label: '4 Buttons' },
        { value: '5', label: '5 Buttons' },
    ]

    const renderPlaygroundButtons = () => {
        const buttons = []
        const icons = [Hash, X, Plus, Star, Settings]

        for (let i = 0; i < Number(playgroundCount); i++) {
            const IconComponent = icons[i]
            buttons.push(
                <ButtonV2
                    key={i}
                    text={
                        playgroundSubType === ButtonSubType.ICON_ONLY
                            ? undefined
                            : `Button ${i + 1}`
                    }
                    buttonType={playgroundButtonType}
                    size={playgroundSize}
                    subType={playgroundSubType}
                    leadingIcon={
                        playgroundSubType === ButtonSubType.ICON_ONLY &&
                        IconComponent ? (
                            <IconComponent size={16} />
                        ) : undefined
                    }
                    onClick={() => {
                        addSnackbar({
                            header: `Button ${i + 1} clicked!`,
                        })
                    }}
                />
            )
        }
        return buttons
    }

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SingleSelect
                            label="Button Type"
                            items={[{ items: typeOptions }]}
                            selected={playgroundButtonType}
                            onSelect={(value) =>
                                setPlaygroundButtonType(value as ButtonType)
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

                        <SingleSelect
                            label="Button Count"
                            items={[{ items: countOptions }]}
                            selected={playgroundCount}
                            onSelect={(value) => setPlaygroundCount(value)}
                            placeholder="Select count"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Stacked"
                            checked={playgroundStacked}
                            onChange={() =>
                                setPlaygroundStacked(!playgroundStacked)
                            }
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
                        <ButtonGroup stacked={playgroundStacked}>
                            {renderPlaygroundButtons()}
                        </ButtonGroup>
                    </div>
                </div>
            </div>

            {/* Basic Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Examples</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Horizontal Group
                        </h3>
                        <div className="space-y-4">
                            <ButtonGroup>
                                <ButtonV2
                                    text="Save"
                                    leadingIcon={<Download size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Save clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text="Cancel"
                                    buttonType={ButtonType.SECONDARY}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Cancel clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>

                            <ButtonGroup>
                                <ButtonV2
                                    text="Edit"
                                    buttonType={ButtonType.PRIMARY}
                                    leadingIcon={<Edit size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Edit clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text="View"
                                    buttonType={ButtonType.SECONDARY}
                                    leadingIcon={<Eye size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'View clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text="Delete"
                                    buttonType={ButtonType.DANGER}
                                    leadingIcon={<Trash2 size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Delete clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Stacked Group</h3>
                        <div className="space-y-4">
                            <ButtonGroup stacked>
                                <ButtonV2
                                    text="Left"
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Left button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text="Center"
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Center button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text="Right"
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Right button clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>

                            <ButtonGroup stacked>
                                <ButtonV2
                                    leadingIcon={<Hash size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Hash button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    leadingIcon={<Plus size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Plus button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    leadingIcon={<Star size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Star button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    leadingIcon={<Settings size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Settings button clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Types */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Button Types</h2>
                <div className="space-y-6">
                    {Object.values(ButtonType).map((type) => (
                        <div key={type} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {type}
                            </h3>
                            <div className="space-y-4">
                                <ButtonGroup>
                                    <ButtonV2
                                        text="First"
                                        buttonType={type}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${type} first button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Second"
                                        buttonType={type}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${type} second button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Third"
                                        buttonType={type}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${type} third button clicked!`,
                                            })
                                        }}
                                    />
                                </ButtonGroup>

                                <ButtonGroup stacked>
                                    <ButtonV2
                                        text="Left"
                                        buttonType={type}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${type} left button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Center"
                                        buttonType={type}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${type} center button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Right"
                                        buttonType={type}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${type} right button clicked!`,
                                            })
                                        }}
                                    />
                                </ButtonGroup>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="space-y-6">
                    {Object.values(ButtonSize).map((size) => (
                        <div key={size} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {size}
                            </h3>
                            <div className="space-y-4">
                                <ButtonGroup>
                                    <ButtonV2
                                        text="Small"
                                        size={size}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${size} small button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Medium"
                                        size={size}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${size} medium button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Large"
                                        size={size}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${size} large button clicked!`,
                                            })
                                        }}
                                    />
                                </ButtonGroup>

                                <ButtonGroup stacked>
                                    <ButtonV2
                                        text="Left"
                                        size={size}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${size} left button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Center"
                                        size={size}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${size} center button clicked!`,
                                            })
                                        }}
                                    />
                                    <ButtonV2
                                        text="Right"
                                        size={size}
                                        onClick={() => {
                                            addSnackbar({
                                                header: `${size} right button clicked!`,
                                            })
                                        }}
                                    />
                                </ButtonGroup>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mixed Types */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Mixed Types</h2>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Primary + Secondary
                        </h3>
                        <ButtonGroup>
                            <ButtonV2
                                text="Primary Action"
                                buttonType={ButtonType.PRIMARY}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Primary action clicked!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Secondary Action"
                                buttonType={ButtonType.SECONDARY}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Secondary action clicked!',
                                    })
                                }}
                            />
                        </ButtonGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Success + Danger
                        </h3>
                        <ButtonGroup>
                            <ButtonV2
                                text="Approve"
                                buttonType={ButtonType.SUCCESS}
                                leadingIcon={<Plus size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Approve clicked!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Reject"
                                buttonType={ButtonType.DANGER}
                                leadingIcon={<X size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Reject clicked!',
                                    })
                                }}
                            />
                        </ButtonGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Mixed with Icons
                        </h3>
                        <ButtonGroup>
                            <ButtonV2
                                text="Download"
                                buttonType={ButtonType.PRIMARY}
                                leadingIcon={<Download size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Download clicked!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Upload"
                                buttonType={ButtonType.SECONDARY}
                                leadingIcon={<Upload size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Upload clicked!',
                                    })
                                }}
                            />
                            <ButtonV2
                                buttonType={ButtonType.DANGER}
                                leadingIcon={<Trash2 size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Delete clicked!',
                                    })
                                }}
                            />
                        </ButtonGroup>
                    </div>
                </div>
            </div>

            {/* Mixed Content Alignment */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Mixed Content Alignment (Bug Fix Demo)
                </h2>
                <p className="text-gray-600">
                    These examples demonstrate proper alignment when mixing
                    buttons with different content types: text with trailing
                    icons, icon-only buttons, and regular text buttons. All
                    buttons maintain consistent heights regardless of content.
                </p>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Button with Tag + Icon-Only Button (Small Size)
                        </h3>
                        <p className="text-sm text-gray-600">
                            Common pattern: A button with a trailing tag/badge
                            next to an icon-only dropdown button
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <ButtonGroup>
                                <ButtonV2
                                    text="Status"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    trailingIcon={
                                        <Tag
                                            text="Active"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.SUCCESS}
                                            size={TagSize.XS}
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Status button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text=""
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<ChevronDown size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Dropdown clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>

                            <ButtonGroup>
                                <ButtonV2
                                    text="Priority"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                    trailingIcon={
                                        <Tag
                                            text="High"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.ERROR}
                                            size={TagSize.XS}
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Priority button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text=""
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Filter size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Filter clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Button with Tag + Icon-Only Button (Medium Size)
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                            <ButtonGroup>
                                <ButtonV2
                                    text="Category"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    trailingIcon={
                                        <Tag
                                            text="12"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.NEUTRAL}
                                            size={TagSize.SM}
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Category button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text=""
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    leadingIcon={<Settings size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Settings clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>

                            <ButtonGroup>
                                <ButtonV2
                                    text="Notifications"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    trailingIcon={
                                        <Tag
                                            text="New"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.WARNING}
                                            size={TagSize.SM}
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Notifications clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text=""
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    leadingIcon={<ChevronDown size={16} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'More options!',
                                        })
                                    }}
                                />
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Button with Tag + Icon-Only Button (Large Size)
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                            <ButtonGroup>
                                <ButtonV2
                                    text="Team"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.LARGE}
                                    trailingIcon={
                                        <Tag
                                            text="8 members"
                                            variant={TagVariant.SUBTLE}
                                            color={TagColor.PRIMARY}
                                            size={TagSize.MD}
                                        />
                                    }
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Team button clicked!',
                                        })
                                    }}
                                />
                                <ButtonV2
                                    text=""
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.LARGE}
                                    leadingIcon={<Plus size={20} />}
                                    onClick={() => {
                                        addSnackbar({
                                            header: 'Add member clicked!',
                                        })
                                    }}
                                />
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Stacked: Mixed Content
                        </h3>
                        <p className="text-sm text-gray-600">
                            Stacked buttons also maintain consistent heights
                        </p>
                        <ButtonGroup stacked>
                            <ButtonV2
                                text="Active Items"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.MEDIUM}
                                trailingIcon={
                                    <Tag
                                        text="24"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.SUCCESS}
                                        size={TagSize.SM}
                                    />
                                }
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Active items clicked!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text=""
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.MEDIUM}
                                leadingIcon={<Filter size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Filter clicked!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Archived"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.MEDIUM}
                                trailingIcon={
                                    <Tag
                                        text="8"
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.NEUTRAL}
                                        size={TagSize.SM}
                                    />
                                }
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Archived clicked!',
                                    })
                                }}
                            />
                        </ButtonGroup>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">File Actions</h3>
                        <ButtonGroup>
                            <ButtonV2
                                text="New File"
                                buttonType={ButtonType.PRIMARY}
                                leadingIcon={<Plus size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'New file created!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Open"
                                buttonType={ButtonType.SECONDARY}
                                leadingIcon={<Eye size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'File opened!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Save"
                                buttonType={ButtonType.SUCCESS}
                                leadingIcon={<Download size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'File saved!',
                                    })
                                }}
                            />
                        </ButtonGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">User Actions</h3>
                        <ButtonGroup stacked>
                            <ButtonV2
                                text="View Profile"
                                buttonType={ButtonType.PRIMARY}
                                leadingIcon={<Eye size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Profile viewed!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Edit Profile"
                                buttonType={ButtonType.SECONDARY}
                                leadingIcon={<Edit size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Profile edit mode!',
                                    })
                                }}
                            />
                            <ButtonV2
                                text="Delete Account"
                                buttonType={ButtonType.DANGER}
                                leadingIcon={<Trash2 size={16} />}
                                onClick={() => {
                                    addSnackbar({
                                        header: 'Delete account confirmed!',
                                    })
                                }}
                            />
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonGroupV2Demo
