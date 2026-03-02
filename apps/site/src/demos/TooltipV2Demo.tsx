import React, { useState } from 'react'
import { Info, HelpCircle, Check, Settings, MessageCircle } from 'lucide-react'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import {
    TooltipV2,
    TooltipV2Align,
    TooltipV2Side,
    TooltipV2Size,
    TooltipV2SlotDirection,
} from '../../../../packages/blend/lib/components/TooltipV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

const TooltipV2Demo: React.FC = () => {
    // Configuration state
    const [config, setConfig] = useState({
        content: 'This is a configurable tooltip',
        side: TooltipV2Side.TOP,
        align: TooltipV2Align.CENTER,
        size: TooltipV2Size.SM,
        showArrow: true,
        forceVisible: false,
        hasSlot: false,
        slotDirection: TooltipV2SlotDirection.RIGHT,
        delayDuration: 300,
        offset: 5,
        disableInteractive: true,
    })
    const { theme } = useTheme()
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target
        const isCheckbox = type === 'checkbox'

        setConfig({
            ...config,
            [name]: isCheckbox
                ? (e.target as HTMLInputElement).checked
                : name === 'delayDuration' || name === 'offset'
                  ? Number(value)
                  : value,
        })
    }

    // Render slot content if enabled
    const renderSlot = () => {
        if (config.hasSlot) {
            return <Check size={14} color="white" />
        }
        return null
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    Tooltip Configuration Playground
                </h1>
                <p className="text-lg text-gray-600">
                    Customize the tooltip to see different configurations in
                    action
                </p>
            </div>

            <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Left Column */}
                    <div>
                        <div className="mb-4">
                            <label
                                htmlFor="content"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Tooltip Content
                            </label>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                value={config.content}
                                onChange={handleChange}
                                placeholder="Enter tooltip content"
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="side"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Side
                            </label>
                            <select
                                id="side"
                                name="side"
                                value={config.side}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                {Object.values(TooltipV2Side).map((side) => (
                                    <option key={side} value={side}>
                                        {side.charAt(0).toUpperCase() +
                                            side.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="align"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Alignment
                            </label>
                            <select
                                id="align"
                                name="align"
                                value={config.align}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                {Object.values(TooltipV2Align).map((align) => (
                                    <option key={align} value={align}>
                                        {align.charAt(0).toUpperCase() +
                                            align.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="size"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Size
                            </label>
                            <select
                                id="size"
                                name="size"
                                value={config.size}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                {Object.values(TooltipV2Size).map((size) => (
                                    <option key={size} value={size}>
                                        {size.charAt(0).toUpperCase() +
                                            size.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        {config.hasSlot && (
                            <div className="mb-4">
                                <label
                                    htmlFor="slotDirection"
                                    className="block mb-2 font-medium text-gray-700"
                                >
                                    Slot Direction
                                </label>
                                <select
                                    id="slotDirection"
                                    name="slotDirection"
                                    value={config.slotDirection}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                >
                                    {Object.values(TooltipV2SlotDirection).map(
                                        (direction) => (
                                            <option
                                                key={direction}
                                                value={direction}
                                            >
                                                {direction
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    direction.slice(1)}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}

                        <div className="mb-4">
                            <label
                                htmlFor="delayDuration"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Delay Duration (ms)
                            </label>
                            <input
                                type="number"
                                id="delayDuration"
                                name="delayDuration"
                                value={config.delayDuration}
                                onChange={handleChange}
                                min={0}
                                max={1000}
                                step={50}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="offset"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Offset (px)
                            </label>
                            <input
                                type="number"
                                id="offset"
                                name="offset"
                                value={config.offset}
                                onChange={handleChange}
                                min={0}
                                max={20}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="showArrow"
                                        checked={config.showArrow}
                                        onChange={handleChange}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Arrow</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="forceVisible"
                                        checked={config.forceVisible}
                                        onChange={handleChange}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Force Visible</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="hasSlot"
                                        checked={config.hasSlot}
                                        onChange={handleChange}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Include Slot</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="disableInteractive"
                                        checked={config.disableInteractive}
                                        onChange={handleChange}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Disable Interactive</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`min-h-32 p-8 rounded-xl flex justify-center items-center border-1 ${
                    theme === Theme.DARK
                        ? 'border-gray-700 bg-gray-900'
                        : 'border-gray-200 bg-gray-50'
                }`}
            >
                <TooltipV2
                    content={config.content}
                    side={config.side}
                    align={config.align}
                    size={config.size}
                    showArrow={config.showArrow}
                    slot={renderSlot()}
                    slotDirection={config.slotDirection}
                    delayDuration={config.delayDuration}
                    offset={config.offset}
                    open={config.forceVisible || undefined}
                    disableInteractive={config.disableInteractive}
                >
                    <Button
                        data-tooltip={'Hover Me'}
                        text="Hover Me"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        leadingIcon={<Settings size={16} />}
                    />
                </TooltipV2>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Real-world Example: No Style Inheritance
                </h2>
                <p className="text-base text-gray-600 mb-6">
                    This example shows that tooltip text doesn't inherit parent
                    styling (like bold text)
                </p>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 gap-4 font-bold text-lg text-gray-800">
                    <h3 className="text-lg font-bold text-gray-800">
                        Priority Rules Configuration
                    </h3>

                    <TooltipV2 content="No corporates available. Please add a corporate to proceed">
                        <div>
                            <Button
                                text="Add Threshold Rule"
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<Settings size={16} />}
                                disabled={false}
                            />
                        </div>
                    </TooltipV2>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        Notice: The tooltip text appears with normal weight (not
                        bold) despite being inside a bold parent container
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Tooltip Gallery
                </h2>
                <p className="text-base text-gray-600 mb-6">
                    Pre-configured tooltip examples
                </p>

                <div className="flex flex-wrap gap-6">
                    <TooltipV2 content="Basic tooltip">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 cursor-pointer">
                            <Info size={20} color="#374151" />
                        </div>
                    </TooltipV2>

                    <TooltipV2
                        content="Large tooltip with more information"
                        size={TooltipV2Size.LG}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 cursor-pointer">
                            <HelpCircle size={20} color="#374151" />
                        </div>
                    </TooltipV2>

                    <TooltipV2
                        content="Right side tooltip"
                        side={TooltipV2Side.RIGHT}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 cursor-pointer">
                            <MessageCircle size={20} color="#374151" />
                        </div>
                    </TooltipV2>

                    <TooltipV2 content="No arrow tooltip" showArrow={false}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 cursor-pointer">
                            <Check size={20} color="#374151" />
                        </div>
                    </TooltipV2>

                    <TooltipV2
                        content="With slot"
                        slot={<Check size={14} color="white" />}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 cursor-pointer">
                            <Settings size={20} color="#374151" />
                        </div>
                    </TooltipV2>
                </div>
            </div>

            {/* Additional Examples */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Tooltip Positions
                </h2>
                <p className="text-base text-gray-600 mb-6">
                    Examples of tooltips in different positions
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-600">Top</span>
                        <TooltipV2
                            content="Top tooltip"
                            side={TooltipV2Side.TOP}
                        >
                            <Button
                                text="Top"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-600">Right</span>
                        <TooltipV2
                            content="Right tooltip"
                            side={TooltipV2Side.RIGHT}
                        >
                            <Button
                                text="Right"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-600">Bottom</span>
                        <TooltipV2
                            content="Bottom tooltip"
                            side={TooltipV2Side.BOTTOM}
                        >
                            <Button
                                text="Bottom"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-600">Left</span>
                        <TooltipV2
                            content="Left tooltip"
                            side={TooltipV2Side.LEFT}
                        >
                            <Button
                                text="Left"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>
                </div>
            </div>

            {/* Tooltip Sizes */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Tooltip Sizes
                </h2>
                <p className="text-base text-gray-600 mb-6">
                    Different tooltip sizes for various content lengths
                </p>

                <div className="flex flex-wrap gap-6">
                    <TooltipV2 content="Small tooltip" size={TooltipV2Size.SM}>
                        <Button
                            text="Small"
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                        />
                    </TooltipV2>

                    <TooltipV2
                        content="Large tooltip with more content to show the difference in size and how it handles longer text and provides more space for detailed information"
                        size={TooltipV2Size.LG}
                    >
                        <Button
                            text="Large"
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                        />
                    </TooltipV2>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Interactive Examples
                </h2>
                <p className="text-base text-gray-600 mb-6">
                    Tooltips with different interactive behaviors
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">
                            Quick tooltip (no delay):
                        </span>
                        <TooltipV2
                            content="Appears immediately"
                            delayDuration={0}
                        >
                            <Button
                                text="No Delay"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">
                            Delayed tooltip:
                        </span>
                        <TooltipV2
                            content="Appears after 1 second"
                            delayDuration={1000}
                        >
                            <Button
                                text="1s Delay"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">
                            Tooltip with custom offset:
                        </span>
                        <TooltipV2
                            content="Further away from trigger"
                            offset={15}
                        >
                            <Button
                                text="Custom Offset"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                            />
                        </TooltipV2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TooltipV2Demo
