import { useState } from 'react'
import {
    AccordionV2,
    AccordionV2Item,
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from '../../../../packages/blend/lib/components/AccordionV2'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import { User, Settings, Info } from 'lucide-react'

const AccordionV2Demo = () => {
    const [accordionType, setAccordionType] = useState(
        AccordionV2Type.NO_BORDER
    )
    const [isMultiple, setIsMultiple] = useState(false)
    const [chevronPosition, setChevronPosition] = useState(
        AccordionV2ChevronPosition.RIGHT
    )
    const [showIcons, setShowIcons] = useState(true)
    const [showSubtext, setShowSubtext] = useState(true)
    const [showRightSlot, setShowRightSlot] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [activeItems, setActiveItems] = useState<string[]>([])

    const accordionTypeOptions = [
        { value: AccordionV2Type.BORDER, label: 'Border' },
        { value: AccordionV2Type.NO_BORDER, label: 'No Border' },
    ]

    const chevronPositionOptions = [
        { value: AccordionV2ChevronPosition.LEFT, label: 'Left' },
        { value: AccordionV2ChevronPosition.RIGHT, label: 'Right' },
    ]

    const handleValueChange = (value: string | string[]) => {
        if (isMultiple) {
            setActiveItems(value as string[])
        } else {
            setActiveItems(value ? [value as string] : [])
        }
    }

    const getIconForItem = (itemId: string) => {
        switch (itemId) {
            case 'item1':
                return <User size={16} />
            case 'item2':
                return <Settings size={16} />
            case 'item3':
                return <Info size={16} />
            default:
                return <User size={16} />
        }
    }

    const getRightSlotForItem = () => {
        return <span className="text-xs text-gray-500">Badge</span>
    }

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">AccordionV2 Playground</h2>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <SingleSelect
                            label="Type"
                            placeholder="Select Type"
                            items={[{ items: accordionTypeOptions }]}
                            selected={accordionType}
                            onSelect={(value) =>
                                setAccordionType(value as AccordionV2Type)
                            }
                        />
                        <SingleSelect
                            label="Chevron Position"
                            placeholder="Select Position"
                            items={[{ items: chevronPositionOptions }]}
                            selected={chevronPosition}
                            onSelect={(value) =>
                                setChevronPosition(
                                    value as AccordionV2ChevronPosition
                                )
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Toggle Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Switch
                            label="Multiple Selection"
                            checked={isMultiple}
                            onChange={() => setIsMultiple(!isMultiple)}
                        />
                        <Switch
                            label="Show Icons"
                            checked={showIcons}
                            onChange={() => setShowIcons(!showIcons)}
                        />
                        <Switch
                            label="Show Subtext"
                            checked={showSubtext}
                            onChange={() => setShowSubtext(!showSubtext)}
                        />
                        <Switch
                            label="Show Right Slot"
                            checked={showRightSlot}
                            onChange={() => setShowRightSlot(!showRightSlot)}
                        />
                        <Switch
                            label="Disabled"
                            checked={isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                    </div>
                </div>

                <div className="w-full max-w-2xl">
                    <AccordionV2
                        accordionType={accordionType}
                        isMultiple={isMultiple}
                        value={isMultiple ? activeItems : activeItems[0]}
                        onValueChange={handleValueChange}
                    >
                        <AccordionV2Item
                            value="item1"
                            title="General Information"
                            subtext={
                                showSubtext
                                    ? 'Basic details and overview'
                                    : undefined
                            }
                            leftSlot={
                                showIcons ? getIconForItem('item1') : undefined
                            }
                            rightSlot={
                                showRightSlot
                                    ? getRightSlotForItem()
                                    : undefined
                            }
                            chevronPosition={chevronPosition}
                            isDisabled={isDisabled}
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    This is the content for General Information.
                                    You can add any content here including
                                    forms, lists, or other components.
                                </p>
                            </div>
                        </AccordionV2Item>

                        <AccordionV2Item
                            value="item2"
                            title="Settings & Preferences"
                            subtext={
                                showSubtext
                                    ? 'Configure your preferences'
                                    : undefined
                            }
                            leftSlot={
                                showIcons ? getIconForItem('item2') : undefined
                            }
                            rightSlot={
                                showRightSlot
                                    ? getRightSlotForItem()
                                    : undefined
                            }
                            chevronPosition={chevronPosition}
                            isDisabled={isDisabled}
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    This is the content for Settings &
                                    Preferences. You can customize various
                                    settings here.
                                </p>
                            </div>
                        </AccordionV2Item>

                        <AccordionV2Item
                            value="item3"
                            title="Help & Support"
                            subtext={
                                showSubtext ? 'Get help and support' : undefined
                            }
                            leftSlot={
                                showIcons ? getIconForItem('item3') : undefined
                            }
                            rightSlot={
                                showRightSlot
                                    ? getRightSlotForItem()
                                    : undefined
                            }
                            chevronPosition={chevronPosition}
                            isDisabled={isDisabled}
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    This is the content for Help & Support. Find
                                    answers to common questions and contact
                                    support.
                                </p>
                            </div>
                        </AccordionV2Item>
                    </AccordionV2>
                </div>
            </div>
        </div>
    )
}

export default AccordionV2Demo
