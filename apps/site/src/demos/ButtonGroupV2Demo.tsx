import {
    ButtonV2,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../../packages/blend/lib/components/ButtonV2'
import { ButtonGroupV2 } from '../../../../packages/blend/lib/components/ButtonV2/ButtonGroupV2'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { Hash, X, Plus, Download, Edit } from 'lucide-react'
import { useState } from 'react'

const ButtonGroupV2Demo = () => {
    const [stacked, setStacked] = useState(false)
    const [buttonType, setButtonType] = useState<ButtonType>(ButtonType.PRIMARY)
    const [size, setSize] = useState<ButtonSize>(ButtonSize.MEDIUM)
    const [subType, setSubType] = useState<ButtonSubType>(ButtonSubType.DEFAULT)
    const [count, setCount] = useState('3')

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

    const icons = [Hash, X, Plus, Download, Edit]

    const renderButtons = () => {
        const buttons = []
        for (let i = 0; i < Number(count); i++) {
            const IconComponent = icons[i]
            buttons.push(
                <ButtonV2
                    key={i}
                    text={
                        subType === ButtonSubType.ICON_ONLY
                            ? undefined
                            : `Button ${i + 1}`
                    }
                    buttonType={buttonType}
                    size={size}
                    subType={subType}
                    leftSlot={
                        subType === ButtonSubType.ICON_ONLY && IconComponent
                            ? { slot: <IconComponent size={16} /> }
                            : undefined
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
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">ButtonGroupV2 Component</h1>
                <p className="text-gray-600">
                    Interactive playground to test ButtonGroupV2 with stacked
                    and non-stacked modes.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Playground</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SingleSelect
                            label="Button Type"
                            items={[{ items: typeOptions }]}
                            selected={buttonType}
                            onSelect={(value) =>
                                setButtonType(value as ButtonType)
                            }
                            placeholder="Select type"
                        />
                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={size}
                            onSelect={(value) => setSize(value as ButtonSize)}
                            placeholder="Select size"
                        />
                        <SingleSelect
                            label="Sub Type"
                            items={[{ items: subTypeOptions }]}
                            selected={subType}
                            onSelect={(value) =>
                                setSubType(value as ButtonSubType)
                            }
                            placeholder="Select sub type"
                        />
                        <SingleSelect
                            label="Button Count"
                            items={[{ items: countOptions }]}
                            selected={count}
                            onSelect={(value) => setCount(value)}
                            placeholder="Select count"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Stacked"
                            checked={stacked}
                            onChange={() => setStacked(!stacked)}
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <ButtonGroupV2 stacked={stacked}>
                        {renderButtons()}
                    </ButtonGroupV2>
                </div>
            </section>
        </div>
    )
}

export default ButtonGroupV2Demo
