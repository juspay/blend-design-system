import {
    KeyValuePair,
    KeyValuePairSize,
    KeyValuePairStateType,
} from '../../../KeyValuePair'
import { Info, Check, AlertCircle } from 'lucide-react'

const KeyValuePairLightHouse = () => {
    return (
        <>
            {/* Basic KeyValuePair - Vertical */}
            <KeyValuePair
                keyString="Label"
                value="Value"
                keyValuePairState={KeyValuePairStateType.vertical}
            />

            {/* Basic KeyValuePair - Horizontal */}
            <KeyValuePair
                keyString="Label"
                value="Value"
                keyValuePairState={KeyValuePairStateType.horizontal}
            />

            {/* Small Size */}
            <KeyValuePair
                keyString="Small"
                value="Small Value"
                size={KeyValuePairSize.SMALL}
            />

            {/* Medium Size */}
            <KeyValuePair
                keyString="Medium"
                value="Medium Value"
                size={KeyValuePairSize.MEDIUM}
            />

            {/* Large Size */}
            <KeyValuePair
                keyString="Large"
                value="Large Value"
                size={KeyValuePairSize.LARGE}
            />

            {/* With Key Slot */}
            <KeyValuePair
                keyString="With Key Icon"
                value="Value"
                keySlot={<Info size={16} />}
            />

            {/* With Value Left Slot */}
            <KeyValuePair
                keyString="Label"
                value="With Left Icon"
                valueLeftSlot={<Check size={16} />}
            />

            {/* With Value Right Slot */}
            <KeyValuePair
                keyString="Label"
                value="With Right Icon"
                valueRightSlot={<AlertCircle size={16} />}
            />

            {/* With All Slots */}
            <KeyValuePair
                keyString="All Slots"
                value="Value"
                keySlot={<Info size={16} />}
                valueLeftSlot={<Check size={16} />}
                valueRightSlot={<AlertCircle size={16} />}
            />

            {/* Text Overflow - Truncate */}
            <KeyValuePair
                keyString="Long Key"
                value="This is a very long value that will be truncated with ellipsis"
                textOverflow="truncate"
                maxWidth="200px"
            />

            {/* Text Overflow - Wrap */}
            <KeyValuePair
                keyString="Long Key"
                value="This is a very long value that will wrap naturally to multiple lines"
                textOverflow="wrap"
                maxWidth="200px"
            />

            {/* Text Overflow - Wrap Clamp */}
            <KeyValuePair
                keyString="Long Key"
                value="This is a very long value that will wrap with a line limit and show ellipsis when it exceeds the maximum number of lines"
                textOverflow="wrap-clamp"
                maxLines={2}
                maxWidth="200px"
            />

            {/* With Max Lines */}
            <KeyValuePair
                keyString="Label"
                value="This is a very long value that will be clamped to 3 lines maximum"
                textOverflow="wrap-clamp"
                maxLines={3}
                maxWidth="200px"
            />

            {/* Without Tooltip on Truncate */}
            <KeyValuePair
                keyString="Label"
                value="This value will be truncated but no tooltip will show"
                textOverflow="truncate"
                showTooltipOnTruncate={false}
                maxWidth="200px"
            />

            {/* Custom Max Width */}
            <KeyValuePair
                keyString="Label"
                value="Value with custom max width"
                maxWidth="300px"
            />

            {/* All Sizes - Vertical */}
            <KeyValuePair
                keyString="Small Vertical"
                value="Value"
                size={KeyValuePairSize.SMALL}
                keyValuePairState={KeyValuePairStateType.vertical}
            />
            <KeyValuePair
                keyString="Medium Vertical"
                value="Value"
                size={KeyValuePairSize.MEDIUM}
                keyValuePairState={KeyValuePairStateType.vertical}
            />
            <KeyValuePair
                keyString="Large Vertical"
                value="Value"
                size={KeyValuePairSize.LARGE}
                keyValuePairState={KeyValuePairStateType.vertical}
            />

            {/* All Sizes - Horizontal */}
            <KeyValuePair
                keyString="Small Horizontal"
                value="Value"
                size={KeyValuePairSize.SMALL}
                keyValuePairState={KeyValuePairStateType.horizontal}
            />
            <KeyValuePair
                keyString="Medium Horizontal"
                value="Value"
                size={KeyValuePairSize.MEDIUM}
                keyValuePairState={KeyValuePairStateType.horizontal}
            />
            <KeyValuePair
                keyString="Large Horizontal"
                value="Value"
                size={KeyValuePairSize.LARGE}
                keyValuePairState={KeyValuePairStateType.horizontal}
            />

            {/* Empty Value */}
            <KeyValuePair keyString="Label" value="" />

            {/* Long Key */}
            <KeyValuePair
                keyString="This is a very long key that demonstrates how the component handles longer text content"
                value="Value"
            />

            {/* Long Value */}
            <KeyValuePair
                keyString="Label"
                value="This is a very long value that demonstrates how the component handles longer text content and wraps properly"
            />

            {/* Complex Example */}
            <KeyValuePair
                keyString="Complex Example"
                value="This is a complex key-value pair with all features enabled including slots and text overflow handling"
                size={KeyValuePairSize.MEDIUM}
                keyValuePairState={KeyValuePairStateType.vertical}
                keySlot={<Info size={16} />}
                valueLeftSlot={<Check size={16} />}
                valueRightSlot={<AlertCircle size={16} />}
                textOverflow="wrap-clamp"
                maxLines={3}
                maxWidth="250px"
                showTooltipOnTruncate={true}
            />

            {/* All Text Overflow Modes */}
            <KeyValuePair
                keyString="Truncate"
                value="This value will be truncated with ellipsis"
                textOverflow="truncate"
                maxWidth="150px"
            />
            <KeyValuePair
                keyString="Wrap"
                value="This value will wrap naturally"
                textOverflow="wrap"
                maxWidth="150px"
            />
            <KeyValuePair
                keyString="Wrap Clamp"
                value="This value will wrap with line limit"
                textOverflow="wrap-clamp"
                maxLines={2}
                maxWidth="150px"
            />
        </>
    )
}

export default KeyValuePairLightHouse
