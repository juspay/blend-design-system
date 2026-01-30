import { useState } from 'react'
import SingleSelectGroup from '../../../../packages/blend/lib/components/SingleSelectGroup/SingleSelectGroup'
import {
    SelectMenuAlignment,
    SelectMenuGroupType,
    SelectMenuSize,
    SingleSelect,
} from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SelectMenuVariant } from '../../../../packages/blend/lib/components/Select'

const SingleSelectGroupDemo = () => {
    const [stacked, setStacked] = useState(true)
    const [gap, setGap] = useState('8')

    const renderTags = () => {
        const sizeOptions: SelectMenuGroupType[] = [
            {
                items: [
                    { label: 'Small', value: SelectMenuSize.SMALL },
                    { label: 'Medium', value: SelectMenuSize.MEDIUM },
                    { label: 'Large', value: SelectMenuSize.LARGE },
                ],
            },
        ]
        const [playgroundSize, setPlaygroundSize] = useState<SelectMenuSize>(
            SelectMenuSize.LARGE
        )

        return (
            <>
                <SingleSelect
                    label="Size"
                    items={sizeOptions}
                    selected={playgroundSize}
                    variant={SelectMenuVariant.CONTAINER}
                    onSelect={(value) =>
                        setPlaygroundSize(value as SelectMenuSize)
                    }
                    placeholder="Select size"
                    // alignment={SelectMenuAlignment.START}
                />
                <SingleSelect
                    label="Size"
                    items={sizeOptions}
                    selected={playgroundSize}
                    variant={SelectMenuVariant.CONTAINER}
                    onSelect={(value) =>
                        setPlaygroundSize(value as SelectMenuSize)
                    }
                    placeholder="Select size"
                    // alignment={SelectMenuAlignment.CENTER}
                />
                <SingleSelect
                    label="Size"
                    items={sizeOptions}
                    selected={playgroundSize}
                    variant={SelectMenuVariant.CONTAINER}
                    onSelect={(value) =>
                        setPlaygroundSize(value as SelectMenuSize)
                    }
                    placeholder="Select size"
                    // alignment={SelectMenuAlignment.CENTER}
                />
                <SingleSelect
                    label="Size"
                    items={sizeOptions}
                    selected={playgroundSize}
                    variant={SelectMenuVariant.CONTAINER}
                    onSelect={(value) =>
                        setPlaygroundSize(value as SelectMenuSize)
                    }
                    placeholder="Select size"
                    // alignment={SelectMenuAlignment.END}
                />
            </>
        )
    }

    return (
        <div className="space-y-6 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Switch
                    label="stacked"
                    checked={stacked}
                    onChange={() => setStacked(!stacked)}
                />
            </div>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-white p-8">
                    <SingleSelectGroup
                        stacked={stacked}
                        gap={stacked ? undefined : Number(gap)}
                    >
                        {renderTags()}
                    </SingleSelectGroup>
                </div>
            </div>
        </div>
    )
}

export default SingleSelectGroupDemo
