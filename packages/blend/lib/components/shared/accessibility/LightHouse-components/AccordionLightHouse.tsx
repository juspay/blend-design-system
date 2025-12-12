import {
    Accordion,
    AccordionItem,
    AccordionType,
    AccordionChevronPosition,
} from '../../../Accordion'
import { Info, Settings, User } from 'lucide-react'

const AccordionLightHouse = () => {
    return (
        <>
            {/* Single Accordion - No Border */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* Single Accordion - Border */}
            <Accordion accordionType={AccordionType.BORDER}>
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* Multiple Accordion - No Border */}
            <Accordion
                accordionType={AccordionType.NO_BORDER}
                isMultiple={true}
            >
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* Multiple Accordion - Border */}
            <Accordion accordionType={AccordionType.BORDER} isMultiple={true}>
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* With Default Value - Single */}
            <Accordion
                accordionType={AccordionType.NO_BORDER}
                defaultValue="item-2"
            >
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* With Default Value - Multiple */}
            <Accordion
                accordionType={AccordionType.NO_BORDER}
                isMultiple={true}
                defaultValue={['item-1', 'item-3']}
            >
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* With Subtext */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    subtext="This is subtext for item 1"
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    subtext="This is subtext for item 2"
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* With Left Slot */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    leftSlot={<Info size={16} />}
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    leftSlot={<Settings size={16} />}
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* With Right Slot */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    rightSlot={<User size={16} />}
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    rightSlot={<Info size={16} />}
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* With Subtext Slot */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    subtextSlot={<span>Custom subtext slot</span>}
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    subtextSlot={<span>Another custom subtext</span>}
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* With All Slots */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    subtext="Subtext here"
                    leftSlot={<Info size={16} />}
                    rightSlot={<User size={16} />}
                    subtextSlot={<span>Custom subtext slot</span>}
                >
                    Content for item 1
                </AccordionItem>
            </Accordion>

            {/* Chevron Position Left */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* Chevron Position Right */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    chevronPosition={AccordionChevronPosition.RIGHT}
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    chevronPosition={AccordionChevronPosition.RIGHT}
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* Disabled Item */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2 (Disabled)"
                    isDisabled={true}
                >
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>

            {/* All Disabled */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion Item 1"
                    isDisabled={true}
                >
                    Content for item 1
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Accordion Item 2"
                    isDisabled={true}
                >
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* Single Item */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem value="item-1" title="Single Accordion Item">
                    Content for single item
                </AccordionItem>
            </Accordion>

            {/* Border Type Single Item */}
            <Accordion accordionType={AccordionType.BORDER}>
                <AccordionItem value="item-1" title="Single Accordion Item">
                    Content for single item
                </AccordionItem>
            </Accordion>

            {/* Complex Content */}
            <Accordion accordionType={AccordionType.NO_BORDER}>
                <AccordionItem
                    value="item-1"
                    title="Accordion with Complex Content"
                    subtext="This has rich content inside"
                    leftSlot={<Info size={16} />}
                >
                    <div>
                        <h4>Section Title</h4>
                        <p>This is a paragraph with detailed information.</p>
                        <ul>
                            <li>List item 1</li>
                            <li>List item 2</li>
                            <li>List item 3</li>
                        </ul>
                    </div>
                </AccordionItem>
            </Accordion>

            {/* With onChange Handler */}
            <Accordion
                accordionType={AccordionType.NO_BORDER}
                onValueChange={(value) => {
                    console.log('Accordion value changed:', value)
                }}
            >
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
            </Accordion>

            {/* Multiple with onChange Handler */}
            <Accordion
                accordionType={AccordionType.NO_BORDER}
                isMultiple={true}
                onValueChange={(value) => {
                    console.log('Multiple accordion value changed:', value)
                }}
            >
                <AccordionItem value="item-1" title="Accordion Item 1">
                    Content for item 1
                </AccordionItem>
                <AccordionItem value="item-2" title="Accordion Item 2">
                    Content for item 2
                </AccordionItem>
                <AccordionItem value="item-3" title="Accordion Item 3">
                    Content for item 3
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default AccordionLightHouse
