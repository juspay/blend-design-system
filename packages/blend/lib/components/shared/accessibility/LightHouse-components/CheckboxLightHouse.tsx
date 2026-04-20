import { Checkbox, CheckboxSize } from '../../../Checkbox'
import { Info, AlertCircle } from 'lucide-react'

const CheckboxLightHouse = () => {
    return (
        <>
            {/* Basic Checkbox - Small */}
            <Checkbox size={CheckboxSize.SMALL}>Small Checkbox</Checkbox>

            {/* Basic Checkbox - Medium */}
            <Checkbox size={CheckboxSize.MEDIUM}>Medium Checkbox</Checkbox>

            {/* Checked Checkbox */}
            <Checkbox checked={true}>Checked Checkbox</Checkbox>

            {/* Unchecked Checkbox */}
            <Checkbox checked={false}>Unchecked Checkbox</Checkbox>

            {/* Default Checked */}
            <Checkbox defaultChecked={true}>Default Checked</Checkbox>

            {/* Indeterminate Checkbox */}
            <Checkbox checked="indeterminate">Indeterminate Checkbox</Checkbox>

            {/* Disabled Checkbox */}
            <Checkbox disabled={true}>Disabled Checkbox</Checkbox>

            {/* Disabled Checked */}
            <Checkbox checked={true} disabled={true}>
                Disabled Checked
            </Checkbox>

            {/* Disabled Indeterminate */}
            <Checkbox checked="indeterminate" disabled={true}>
                Disabled Indeterminate
            </Checkbox>

            {/* Required Checkbox */}
            <Checkbox required={true}>Required Checkbox</Checkbox>

            {/* Error Checkbox */}
            <Checkbox error={true}>Error Checkbox</Checkbox>

            {/* Error Checked */}
            <Checkbox checked={true} error={true}>
                Error Checked
            </Checkbox>

            {/* With Subtext */}
            <Checkbox subtext="This is a subtext description">
                Checkbox with Subtext
            </Checkbox>

            {/* With Subtext - Checked */}
            <Checkbox checked={true} subtext="This is a subtext description">
                Checked with Subtext
            </Checkbox>

            {/* With Subtext - Disabled */}
            <Checkbox disabled={true} subtext="This is a subtext description">
                Disabled with Subtext
            </Checkbox>

            {/* With Subtext - Error */}
            <Checkbox error={true} subtext="This is an error message">
                Error with Subtext
            </Checkbox>

            {/* With Slot */}
            <Checkbox slot={<Info size={16} />}>Checkbox with Slot</Checkbox>

            {/* With Slot - Checked */}
            <Checkbox checked={true} slot={<Info size={16} />}>
                Checked with Slot
            </Checkbox>

            {/* With Slot and Subtext */}
            <Checkbox
                slot={<Info size={16} />}
                subtext="This checkbox has both slot and subtext"
            >
                Checkbox with Slot and Subtext
            </Checkbox>

            {/* Small Size with Subtext */}
            <Checkbox
                size={CheckboxSize.SMALL}
                subtext="Small checkbox subtext"
            >
                Small Checkbox
            </Checkbox>

            {/* Medium Size with Subtext */}
            <Checkbox
                size={CheckboxSize.MEDIUM}
                subtext="Medium checkbox subtext"
            >
                Medium Checkbox
            </Checkbox>

            {/* Required with Subtext */}
            <Checkbox required={true} subtext="This field is required">
                Required Checkbox
            </Checkbox>

            {/* Error with Subtext */}
            <Checkbox error={true} subtext="Please fix this error">
                Error Checkbox
            </Checkbox>

            {/* Disabled with Subtext */}
            <Checkbox disabled={true} subtext="This checkbox is disabled">
                Disabled Checkbox
            </Checkbox>

            {/* With onChange Handler */}
            <Checkbox
                onCheckedChange={(checked) => {
                    console.log('Checkbox changed:', checked)
                }}
            >
                Checkbox with onChange
            </Checkbox>

            {/* Controlled Checkbox */}
            <Checkbox
                checked={true}
                onCheckedChange={(checked) => {
                    console.log('Controlled checkbox changed:', checked)
                }}
            >
                Controlled Checkbox
            </Checkbox>

            {/* Indeterminate with onChange */}
            <Checkbox
                checked="indeterminate"
                onCheckedChange={(checked) => {
                    console.log('Indeterminate changed:', checked)
                }}
            >
                Indeterminate with onChange
            </Checkbox>

            {/* With Name */}
            <Checkbox name="checkbox-name">Checkbox with Name</Checkbox>

            {/* With ID */}
            <Checkbox id="custom-checkbox-id">Checkbox with ID</Checkbox>

            {/* With Name and ID */}
            <Checkbox name="checkbox-name" id="custom-checkbox-id">
                Checkbox with Name and ID
            </Checkbox>

            {/* Long Label */}
            <Checkbox>
                This is a very long checkbox label that demonstrates how the
                component handles longer text content and wraps properly
            </Checkbox>

            {/* Long Label with Subtext */}
            <Checkbox subtext="This is also a long subtext that should wrap properly and maintain good readability">
                This is a very long checkbox label that demonstrates how the
                component handles longer text content
            </Checkbox>

            {/* With MaxLength - Label */}
            <Checkbox maxLength={{ label: 20 }}>
                This is a very long label that will be truncated
            </Checkbox>

            {/* With MaxLength - Subtext */}
            <Checkbox
                subtext="This is a very long subtext that will be truncated when it exceeds the max length"
                maxLength={{ subtext: 30 }}
            >
                Checkbox with Truncated Subtext
            </Checkbox>

            {/* With MaxLength - Both */}
            <Checkbox
                subtext="This is a very long subtext that will be truncated"
                maxLength={{ label: 25, subtext: 30 }}
            >
                This is a very long label that will be truncated
            </Checkbox>

            {/* Complex Checkbox */}
            <Checkbox
                checked={true}
                required={true}
                slot={<AlertCircle size={16} />}
                subtext="This is a complex checkbox with all features enabled"
                size={CheckboxSize.MEDIUM}
                onCheckedChange={(checked) => {
                    console.log('Complex checkbox changed:', checked)
                }}
            >
                Complex Checkbox Example
            </Checkbox>

            {/* All States - Small */}
            <Checkbox size={CheckboxSize.SMALL}>Small Unchecked</Checkbox>
            <Checkbox size={CheckboxSize.SMALL} checked={true}>
                Small Checked
            </Checkbox>
            <Checkbox size={CheckboxSize.SMALL} checked="indeterminate">
                Small Indeterminate
            </Checkbox>
            <Checkbox size={CheckboxSize.SMALL} disabled={true}>
                Small Disabled
            </Checkbox>
            <Checkbox size={CheckboxSize.SMALL} error={true}>
                Small Error
            </Checkbox>

            {/* All States - Medium */}
            <Checkbox size={CheckboxSize.MEDIUM}>Medium Unchecked</Checkbox>
            <Checkbox size={CheckboxSize.MEDIUM} checked={true}>
                Medium Checked
            </Checkbox>
            <Checkbox size={CheckboxSize.MEDIUM} checked="indeterminate">
                Medium Indeterminate
            </Checkbox>
            <Checkbox size={CheckboxSize.MEDIUM} disabled={true}>
                Medium Disabled
            </Checkbox>
            <Checkbox size={CheckboxSize.MEDIUM} error={true}>
                Medium Error
            </Checkbox>
        </>
    )
}

export default CheckboxLightHouse
