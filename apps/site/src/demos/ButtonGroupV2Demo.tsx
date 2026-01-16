import {
    ButtonV2,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../../packages/blend/lib/components/ButtonV2'
import { ButtonGroupV2 } from '../../../../packages/blend/lib/components/ButtonV2/ButtonGroupV2'
import { Group } from '../../../../packages/blend/lib/components/Primitives/Group'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    Hash,
    X,
    Plus,
    Download,
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
    const [formGroup1, setFormGroup1] = useState('')
    const [formGroup2, setFormGroup2] = useState('')
    const [formGroup3, setFormGroup3] = useState('')

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
        const icons = [Hash, X, Plus, Download, Edit]

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
                    onClick={() =>
                        addSnackbar({ header: `Button ${i + 1} clicked!` })
                    }
                />
            )
        }
        return buttons
    }

    return (
        <div className="p-8 space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                    ButtonGroupV2 Component Demo
                </h1>
                <p className="text-gray-600">
                    Group buttons together with connected borders and consistent
                    alignment.
                </p>
            </div>

            {/* Playground */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Playground</h2>

                <div className="space-y-4">
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
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <ButtonGroupV2 stacked={playgroundStacked}>
                        {renderPlaygroundButtons()}
                    </ButtonGroupV2>
                </div>
            </section>

            {/* Basic Examples */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Basic Examples</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Horizontal Groups
                        </h3>
                        <div className="space-y-3">
                            <ButtonGroupV2>
                                <ButtonV2
                                    text="Save"
                                    leadingIcon={<Download size={16} />}
                                    onClick={() =>
                                        addSnackbar({ header: 'Save clicked!' })
                                    }
                                />
                                <ButtonV2
                                    text="Cancel"
                                    buttonType={ButtonType.SECONDARY}
                                    onClick={() =>
                                        addSnackbar({
                                            header: 'Cancel clicked!',
                                        })
                                    }
                                />
                            </ButtonGroupV2>

                            <ButtonGroupV2>
                                <ButtonV2
                                    text="Edit"
                                    buttonType={ButtonType.PRIMARY}
                                    leadingIcon={<Edit size={16} />}
                                    onClick={() =>
                                        addSnackbar({ header: 'Edit clicked!' })
                                    }
                                />
                                <ButtonV2
                                    text="View"
                                    buttonType={ButtonType.SECONDARY}
                                    leadingIcon={<Eye size={16} />}
                                    onClick={() =>
                                        addSnackbar({ header: 'View clicked!' })
                                    }
                                />
                                <ButtonV2
                                    text="Delete"
                                    buttonType={ButtonType.DANGER}
                                    leadingIcon={<Trash2 size={16} />}
                                    onClick={() =>
                                        addSnackbar({
                                            header: 'Delete clicked!',
                                        })
                                    }
                                />
                            </ButtonGroupV2>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Stacked Groups
                        </h3>
                        <div className="space-y-3">
                            <ButtonGroupV2 stacked>
                                <ButtonV2
                                    text="Left"
                                    onClick={() =>
                                        addSnackbar({ header: 'Left clicked!' })
                                    }
                                />
                                <ButtonV2
                                    text="Center"
                                    onClick={() =>
                                        addSnackbar({
                                            header: 'Center clicked!',
                                        })
                                    }
                                />
                                <ButtonV2
                                    text="Right"
                                    onClick={() =>
                                        addSnackbar({
                                            header: 'Right clicked!',
                                        })
                                    }
                                />
                            </ButtonGroupV2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mixed Types */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Mixed Types</h2>

                <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold mb-3 text-gray-600">
                            Primary + Secondary
                        </h3>
                        <ButtonGroupV2>
                            <ButtonV2
                                text="Primary Action"
                                buttonType={ButtonType.PRIMARY}
                                onClick={() =>
                                    addSnackbar({ header: 'Primary clicked!' })
                                }
                            />
                            <ButtonV2
                                text="Secondary Action"
                                buttonType={ButtonType.SECONDARY}
                                onClick={() =>
                                    addSnackbar({
                                        header: 'Secondary clicked!',
                                    })
                                }
                            />
                        </ButtonGroupV2>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold mb-3 text-gray-600">
                            Success + Danger
                        </h3>
                        <ButtonGroupV2>
                            <ButtonV2
                                text="Approve"
                                buttonType={ButtonType.SUCCESS}
                                leadingIcon={<Plus size={16} />}
                                onClick={() =>
                                    addSnackbar({ header: 'Approve clicked!' })
                                }
                            />
                            <ButtonV2
                                text="Reject"
                                buttonType={ButtonType.DANGER}
                                leadingIcon={<X size={16} />}
                                onClick={() =>
                                    addSnackbar({ header: 'Reject clicked!' })
                                }
                            />
                        </ButtonGroupV2>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold mb-3 text-gray-600">
                            With Icons
                        </h3>
                        <ButtonGroupV2>
                            <ButtonV2
                                text="Download"
                                buttonType={ButtonType.PRIMARY}
                                leadingIcon={<Download size={16} />}
                                onClick={() =>
                                    addSnackbar({ header: 'Download clicked!' })
                                }
                            />
                            <ButtonV2
                                text="Upload"
                                buttonType={ButtonType.SECONDARY}
                                leadingIcon={<ChevronDown size={16} />}
                                onClick={() =>
                                    addSnackbar({ header: 'Upload clicked!' })
                                }
                            />
                        </ButtonGroupV2>
                    </div>
                </div>
            </section>

            {/* Mixed Content Alignment */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Mixed Content Alignment</h2>
                <p className="text-gray-600">
                    Proper alignment when mixing buttons with different content
                    types.
                </p>

                <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold mb-3 text-gray-600">
                            Button with Tag + Icon Button
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                            <ButtonGroupV2>
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
                                    onClick={() =>
                                        addSnackbar({
                                            header: 'Status clicked!',
                                        })
                                    }
                                />
                                <ButtonV2
                                    text=""
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<ChevronDown size={16} />}
                                    onClick={() =>
                                        addSnackbar({
                                            header: 'Dropdown clicked!',
                                        })
                                    }
                                />
                            </ButtonGroupV2>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold mb-3 text-gray-600">
                            Stacked with Tags
                        </h3>
                        <ButtonGroupV2 stacked>
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
                                onClick={() =>
                                    addSnackbar({ header: 'Active clicked!' })
                                }
                            />
                            <ButtonV2
                                text=""
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.MEDIUM}
                                leadingIcon={<Filter size={16} />}
                                onClick={() =>
                                    addSnackbar({ header: 'Filter clicked!' })
                                }
                            />
                        </ButtonGroupV2>
                    </div>
                </div>
            </section>

            {/* Form Elements Group */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Form Elements</h2>
                <p className="text-gray-600">
                    Using the Group component to align form elements.
                </p>

                <div className="p-4 border rounded-lg bg-white">
                    <h3 className="text-sm font-semibold mb-3 text-gray-600">
                        Horizontal Form Group
                    </h3>
                    <Group gap={10} alignItems="flex-end">
                        <SingleSelect
                            label="Category"
                            placeholder="Select category"
                            items={[
                                {
                                    items: [
                                        { value: 'tech', label: 'Technology' },
                                        { value: 'finance', label: 'Finance' },
                                    ],
                                },
                            ]}
                            selected={formGroup1}
                            onSelect={setFormGroup1}
                        />
                        <SingleSelect
                            label="Status"
                            placeholder="Select status"
                            items={[
                                {
                                    items: [
                                        { value: 'active', label: 'Active' },
                                        {
                                            value: 'inactive',
                                            label: 'Inactive',
                                        },
                                    ],
                                },
                            ]}
                            selected={formGroup2}
                            onSelect={setFormGroup2}
                        />
                        <SingleSelect
                            label="Priority"
                            placeholder="Select priority"
                            items={[
                                {
                                    items: [
                                        { value: 'high', label: 'High' },
                                        { value: 'low', label: 'Low' },
                                    ],
                                },
                            ]}
                            selected={formGroup3}
                            onSelect={setFormGroup3}
                        />
                    </Group>
                </div>
            </section>
        </div>
    )
}

export default ButtonGroupV2Demo
