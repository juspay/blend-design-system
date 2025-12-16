import { Radio, RadioGroup, RadioSize } from '../../../Radio'
import { Info, AlertCircle } from 'lucide-react'

const RadioLightHouse = () => {
    return (
        <>
            {/* Basic Radio - Small */}
            <Radio size={RadioSize.SMALL}>Small Radio</Radio>

            {/* Basic Radio - Medium */}
            <Radio size={RadioSize.MEDIUM}>Medium Radio</Radio>

            {/* Checked Radio */}
            <Radio checked={true}>Checked Radio</Radio>

            {/* Unchecked Radio */}
            <Radio checked={false}>Unchecked Radio</Radio>

            {/* Default Checked */}
            <Radio defaultChecked={true}>Default Checked</Radio>

            {/* Disabled Radio */}
            <Radio disabled={true}>Disabled Radio</Radio>

            {/* Disabled Checked */}
            <Radio checked={true} disabled={true}>
                Disabled Checked
            </Radio>

            {/* Required Radio */}
            <Radio required={true}>Required Radio</Radio>

            {/* Error Radio */}
            <Radio error={true}>Error Radio</Radio>

            {/* Error Checked */}
            <Radio checked={true} error={true}>
                Error Checked
            </Radio>

            {/* With Subtext */}
            <Radio subtext="This is a subtext description">
                Radio with Subtext
            </Radio>

            {/* With Subtext - Checked */}
            <Radio checked={true} subtext="This is a subtext description">
                Checked with Subtext
            </Radio>

            {/* With Subtext - Disabled */}
            <Radio disabled={true} subtext="This is a subtext description">
                Disabled with Subtext
            </Radio>

            {/* With Subtext - Error */}
            <Radio error={true} subtext="This is an error message">
                Error with Subtext
            </Radio>

            {/* With Slot */}
            <Radio slot={<Info size={16} />}>Radio with Slot</Radio>

            {/* With Slot - Checked */}
            <Radio checked={true} slot={<Info size={16} />}>
                Checked with Slot
            </Radio>

            {/* With Slot and Subtext */}
            <Radio
                slot={<Info size={16} />}
                subtext="This radio has both slot and subtext"
            >
                Radio with Slot and Subtext
            </Radio>

            {/* Small Size with Subtext */}
            <Radio size={RadioSize.SMALL} subtext="Small radio subtext">
                Small Radio
            </Radio>

            {/* Medium Size with Subtext */}
            <Radio size={RadioSize.MEDIUM} subtext="Medium radio subtext">
                Medium Radio
            </Radio>

            {/* Required with Subtext */}
            <Radio required={true} subtext="This field is required">
                Required Radio
            </Radio>

            {/* Error with Subtext */}
            <Radio error={true} subtext="Please fix this error">
                Error Radio
            </Radio>

            {/* Disabled with Subtext */}
            <Radio disabled={true} subtext="This radio is disabled">
                Disabled Radio
            </Radio>

            {/* With onChange Handler */}
            <Radio
                onChange={(e) => {
                    console.log('Radio changed:', e.target.value)
                }}
            >
                Radio with onChange
            </Radio>

            {/* Controlled Radio */}
            <Radio
                checked={true}
                onChange={(e) => {
                    console.log('Controlled radio changed:', e.target.value)
                }}
            >
                Controlled Radio
            </Radio>

            {/* With Name */}
            <Radio name="radio-name">Radio with Name</Radio>

            {/* With ID */}
            <Radio id="custom-radio-id">Radio with ID</Radio>

            {/* With Name and ID */}
            <Radio name="radio-name" id="custom-radio-id">
                Radio with Name and ID
            </Radio>

            {/* With Value */}
            <Radio value="option1">Radio with Value</Radio>

            {/* Long Label */}
            <Radio>
                This is a very long radio label that demonstrates how the
                component handles longer text content and wraps properly
            </Radio>

            {/* Long Label with Subtext */}
            <Radio subtext="This is also a long subtext that should wrap properly and maintain good readability">
                This is a very long radio label that demonstrates how the
                component handles longer text content
            </Radio>

            {/* With MaxLength - Label */}
            <Radio maxLength={{ label: 20 }}>
                This is a very long label that will be truncated
            </Radio>

            {/* With MaxLength - Subtext */}
            <Radio
                subtext="This is a very long subtext that will be truncated when it exceeds the max length"
                maxLength={{ subtext: 30 }}
            >
                Radio with Truncated Subtext
            </Radio>

            {/* With MaxLength - Both */}
            <Radio
                subtext="This is a very long subtext that will be truncated"
                maxLength={{ label: 25, subtext: 30 }}
            >
                This is a very long label that will be truncated
            </Radio>

            {/* Complex Radio */}
            <Radio
                checked={true}
                required={true}
                slot={<AlertCircle size={16} />}
                subtext="This is a complex radio with all features enabled"
                size={RadioSize.MEDIUM}
                name="complex-radio"
                value="complex"
                onChange={(e) => {
                    console.log('Complex radio changed:', e.target.value)
                }}
            >
                Complex Radio Example
            </Radio>

            {/* RadioGroup - Basic */}
            <RadioGroup name="basic-group" label="Basic Group">
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - With Default Value */}
            <RadioGroup
                name="default-group"
                label="Group with Default"
                defaultValue="option2"
            >
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - Controlled */}
            <RadioGroup
                name="controlled-group"
                label="Controlled Group"
                value="option1"
                onChange={(value) => {
                    console.log('Group value changed:', value)
                }}
            >
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - Disabled */}
            <RadioGroup
                name="disabled-group"
                label="Disabled Group"
                disabled={true}
            >
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - Required */}
            <RadioGroup
                name="required-group"
                label="Required Group"
                required={true}
            >
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - Error */}
            <RadioGroup name="error-group" label="Error Group" error={true}>
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - With Subtext */}
            <RadioGroup name="subtext-group" label="Group with Subtext">
                <Radio value="option1" subtext="Description for option 1">
                    Option 1
                </Radio>
                <Radio value="option2" subtext="Description for option 2">
                    Option 2
                </Radio>
                <Radio value="option3" subtext="Description for option 3">
                    Option 3
                </Radio>
            </RadioGroup>

            {/* RadioGroup - With Slots */}
            <RadioGroup name="slot-group" label="Group with Slots">
                <Radio value="option1" slot={<Info size={16} />}>
                    Option 1
                </Radio>
                <Radio value="option2" slot={<AlertCircle size={16} />}>
                    Option 2
                </Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            {/* RadioGroup - Small Size */}
            <RadioGroup name="small-group" label="Small Size Group">
                <Radio value="option1" size={RadioSize.SMALL}>
                    Option 1
                </Radio>
                <Radio value="option2" size={RadioSize.SMALL}>
                    Option 2
                </Radio>
                <Radio value="option3" size={RadioSize.SMALL}>
                    Option 3
                </Radio>
            </RadioGroup>

            {/* RadioGroup - Mixed Sizes */}
            <RadioGroup name="mixed-group" label="Mixed Sizes Group">
                <Radio value="option1" size={RadioSize.SMALL}>
                    Small Option
                </Radio>
                <Radio value="option2" size={RadioSize.MEDIUM}>
                    Medium Option
                </Radio>
                <Radio value="option3" size={RadioSize.SMALL}>
                    Small Option
                </Radio>
            </RadioGroup>

            {/* All States - Small */}
            <Radio size={RadioSize.SMALL}>Small Unchecked</Radio>
            <Radio size={RadioSize.SMALL} checked={true}>
                Small Checked
            </Radio>
            <Radio size={RadioSize.SMALL} disabled={true}>
                Small Disabled
            </Radio>
            <Radio size={RadioSize.SMALL} error={true}>
                Small Error
            </Radio>

            {/* All States - Medium */}
            <Radio size={RadioSize.MEDIUM}>Medium Unchecked</Radio>
            <Radio size={RadioSize.MEDIUM} checked={true}>
                Medium Checked
            </Radio>
            <Radio size={RadioSize.MEDIUM} disabled={true}>
                Medium Disabled
            </Radio>
            <Radio size={RadioSize.MEDIUM} error={true}>
                Medium Error
            </Radio>
        </>
    )
}

export default RadioLightHouse
