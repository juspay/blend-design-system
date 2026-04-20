import {
    Tooltip,
    TooltipSide,
    TooltipAlign,
    TooltipSize,
    TooltipSlotDirection,
} from '../../../Tooltip'
import { Info, CheckCircle } from 'lucide-react'
import { Button, ButtonType, ButtonSize } from '../../../Button'

const TooltipLightHouse = () => {
    return (
        <>
            {/* Basic Tooltip - Top */}
            <Tooltip content="This is a tooltip" side={TooltipSide.TOP}>
                <button>Hover me</button>
            </Tooltip>

            {/* Basic Tooltip - Bottom */}
            <Tooltip content="This is a tooltip" side={TooltipSide.BOTTOM}>
                <button>Hover me</button>
            </Tooltip>

            {/* Basic Tooltip - Left */}
            <Tooltip content="This is a tooltip" side={TooltipSide.LEFT}>
                <button>Hover me</button>
            </Tooltip>

            {/* Basic Tooltip - Right */}
            <Tooltip content="This is a tooltip" side={TooltipSide.RIGHT}>
                <button>Hover me</button>
            </Tooltip>

            {/* Small Size */}
            <Tooltip content="Small tooltip" size={TooltipSize.SMALL}>
                <button>Small Tooltip</button>
            </Tooltip>

            {/* Large Size */}
            <Tooltip content="Large tooltip" size={TooltipSize.LARGE}>
                <button>Large Tooltip</button>
            </Tooltip>

            {/* Without Arrow */}
            <Tooltip content="Tooltip without arrow" showArrow={false}>
                <button>No Arrow</button>
            </Tooltip>

            {/* With Arrow */}
            <Tooltip content="Tooltip with arrow" showArrow={true}>
                <button>With Arrow</button>
            </Tooltip>

            {/* Align Start */}
            <Tooltip
                content="Tooltip aligned to start"
                side={TooltipSide.TOP}
                align={TooltipAlign.START}
            >
                <button>Align Start</button>
            </Tooltip>

            {/* Align Center */}
            <Tooltip
                content="Tooltip aligned to center"
                side={TooltipSide.TOP}
                align={TooltipAlign.CENTER}
            >
                <button>Align Center</button>
            </Tooltip>

            {/* Align End */}
            <Tooltip
                content="Tooltip aligned to end"
                side={TooltipSide.TOP}
                align={TooltipAlign.END}
            >
                <button>Align End</button>
            </Tooltip>

            {/* With Slot - Left */}
            <Tooltip
                content="Tooltip with icon"
                slot={<Info size={16} />}
                slotDirection={TooltipSlotDirection.LEFT}
            >
                <button>With Left Icon</button>
            </Tooltip>

            {/* With Slot - Right */}
            <Tooltip
                content="Always visible tooltip"
                open={true}
                slot={<Info size={16} color="white" />}
                slotDirection={TooltipSlotDirection.RIGHT}
            >
                <button>With Right Icon</button>
            </Tooltip>

            {/* Custom Delay */}
            <Tooltip content="Tooltip with custom delay" delayDuration={500}>
                <button>Custom Delay</button>
            </Tooltip>

            {/* Custom Offset */}
            <Tooltip content="Tooltip with custom offset" offset={10}>
                <button>Custom Offset</button>
            </Tooltip>

            {/* Custom Max Width */}
            <Tooltip
                content="This is a very long tooltip content that demonstrates how the tooltip handles longer text with custom max width"
                maxWidth="300px"
            >
                <button>Custom Max Width</button>
            </Tooltip>

            {/* Controlled Open */}
            <Tooltip content="Controlled tooltip" open={true}>
                <button>Always Open</button>
            </Tooltip>

            {/* With Button Component */}
            <Tooltip content="Tooltip on button">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Button with Tooltip"
                />
            </Tooltip>

            {/* With Icon */}
            <Tooltip content="Info icon tooltip">
                <Info size={24} />
            </Tooltip>

            {/* Long Content */}
            <Tooltip content="This is a very long tooltip content that demonstrates how the component handles longer text content. It should wrap properly and maintain good readability while showing all the necessary information to the user.">
                <button>Long Content</button>
            </Tooltip>

            {/* Complex Example */}
            <Tooltip
                content="Complex tooltip with all features"
                side={TooltipSide.BOTTOM}
                align={TooltipAlign.CENTER}
                size={TooltipSize.LARGE}
                slot={<CheckCircle size={16} />}
                slotDirection={TooltipSlotDirection.LEFT}
                showArrow={true}
                delayDuration={300}
                offset={8}
                maxWidth="400px"
            >
                <button>Complex Tooltip</button>
            </Tooltip>

            {/* All Sides */}
            <Tooltip content="Top tooltip" side={TooltipSide.TOP}>
                <button>Top</button>
            </Tooltip>
            <Tooltip content="Right tooltip" side={TooltipSide.RIGHT}>
                <button>Right</button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" side={TooltipSide.BOTTOM}>
                <button>Bottom</button>
            </Tooltip>
            <Tooltip content="Left tooltip" side={TooltipSide.LEFT}>
                <button>Left</button>
            </Tooltip>

            {/* All Alignments */}
            <Tooltip
                content="Start aligned"
                side={TooltipSide.TOP}
                align={TooltipAlign.START}
            >
                <button>Start</button>
            </Tooltip>
            <Tooltip
                content="Center aligned"
                side={TooltipSide.TOP}
                align={TooltipAlign.CENTER}
            >
                <button>Center</button>
            </Tooltip>
            <Tooltip
                content="End aligned"
                side={TooltipSide.TOP}
                align={TooltipAlign.END}
            >
                <button>End</button>
            </Tooltip>

            {/* All Sizes */}
            <Tooltip content="Small tooltip" size={TooltipSize.SMALL}>
                <button>Small</button>
            </Tooltip>
            <Tooltip content="Large tooltip" size={TooltipSize.LARGE}>
                <button>Large</button>
            </Tooltip>

            {/* With React Element Content */}
            <Tooltip
                content={
                    <div>
                        <strong>Rich Content</strong>
                        <p>This tooltip has rich HTML content</p>
                    </div>
                }
            >
                <button>Rich Content</button>
            </Tooltip>
        </>
    )
}

export default TooltipLightHouse
