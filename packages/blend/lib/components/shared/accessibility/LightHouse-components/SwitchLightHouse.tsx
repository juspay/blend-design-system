import { Switch, SwitchGroup, SwitchSize } from '../../../Switch'
import { Info, AlertCircle } from 'lucide-react'

const SwitchLightHouse = () => {
    return (
        <>
            {/* Basic Switch - Small */}
            <Switch size={SwitchSize.SMALL} />

            {/* Basic Switch - Medium */}
            <Switch size={SwitchSize.MEDIUM} />

            {/* Checked Switch */}
            <Switch checked={true} />

            {/* Unchecked Switch */}
            <Switch checked={false} />

            {/* Default Checked */}
            <Switch defaultChecked={true} />

            {/* Disabled Switch */}
            <Switch disabled={true} />

            {/* Disabled Checked */}
            <Switch checked={true} disabled={true} />

            {/* Required Switch */}
            <Switch required={true} label="Required Switch" />

            {/* Error Switch */}
            <Switch error={true} label="Error Switch" />

            {/* Error Checked */}
            <Switch checked={true} error={true} label="Error Checked" />

            {/* With Label */}
            <Switch label="Switch with Label" />

            {/* With Label - Checked */}
            <Switch checked={true} label="Checked Switch" />

            {/* With Subtext */}
            <Switch
                label="Switch with Subtext"
                subtext="This is a subtext description"
            />

            {/* With Subtext - Checked */}
            <Switch
                checked={true}
                label="Checked with Subtext"
                subtext="This is a subtext description"
            />

            {/* With Subtext - Disabled */}
            <Switch
                disabled={true}
                label="Disabled with Subtext"
                subtext="This is a subtext description"
            />

            {/* With Subtext - Error */}
            <Switch
                error={true}
                label="Error with Subtext"
                subtext="This is an error message"
            />

            {/* With Slot */}
            <Switch label="Switch with Slot" slot={<Info size={16} />} />

            {/* With Slot - Checked */}
            <Switch
                checked={true}
                label="Checked with Slot"
                slot={<Info size={16} />}
            />

            {/* With Slot and Subtext */}
            <Switch
                label="Switch with Slot and Subtext"
                slot={<Info size={16} />}
                subtext="This switch has both slot and subtext"
            />

            {/* Small Size with Label */}
            <Switch size={SwitchSize.SMALL} label="Small Switch" />

            {/* Medium Size with Label */}
            <Switch size={SwitchSize.MEDIUM} label="Medium Switch" />

            {/* Small Size with Subtext */}
            <Switch
                size={SwitchSize.SMALL}
                label="Small Switch"
                subtext="Small switch subtext"
            />

            {/* Medium Size with Subtext */}
            <Switch
                size={SwitchSize.MEDIUM}
                label="Medium Switch"
                subtext="Medium switch subtext"
            />

            {/* Required with Subtext */}
            <Switch
                required={true}
                label="Required Switch"
                subtext="This field is required"
            />

            {/* Error with Subtext */}
            <Switch
                error={true}
                label="Error Switch"
                subtext="Please fix this error"
            />

            {/* Disabled with Subtext */}
            <Switch
                disabled={true}
                label="Disabled Switch"
                subtext="This switch is disabled"
            />

            {/* With onChange Handler */}
            <Switch
                label="Switch with onChange"
                onChange={(checked) => {
                    console.log('Switch changed:', checked)
                }}
            />

            {/* Controlled Switch */}
            <Switch
                checked={true}
                label="Controlled Switch"
                onChange={(checked) => {
                    console.log('Controlled switch changed:', checked)
                }}
            />

            {/* With Name */}
            <Switch name="switch-name" label="Switch with Name" />

            {/* With ID */}
            <Switch id="custom-switch-id" label="Switch with ID" />

            {/* With Name and ID */}
            <Switch
                name="switch-name"
                id="custom-switch-id"
                label="Switch with Name and ID"
            />

            {/* With Value */}
            <Switch value="switch-value" label="Switch with Value" />

            {/* Long Label */}
            <Switch label="This is a very long switch label that demonstrates how the component handles longer text content and wraps properly" />

            {/* Long Label with Subtext */}
            <Switch
                label="This is a very long switch label that demonstrates how the component handles longer text content"
                subtext="This is also a long subtext that should wrap properly and maintain good readability"
            />

            {/* With MaxLength - Label */}
            <Switch
                label="This is a very long label that will be truncated"
                maxLength={{ label: 20 }}
            />

            {/* With MaxLength - Subtext */}
            <Switch
                label="Switch with Truncated Subtext"
                subtext="This is a very long subtext that will be truncated when it exceeds the max length"
                maxLength={{ subtext: 30 }}
            />

            {/* With MaxLength - Both */}
            <Switch
                label="This is a very long label that will be truncated"
                subtext="This is a very long subtext that will be truncated"
                maxLength={{ label: 25, subtext: 30 }}
            />

            {/* Complex Switch */}
            <Switch
                checked={true}
                required={true}
                slot={<AlertCircle size={16} />}
                label="Complex Switch Example"
                subtext="This is a complex switch with all features enabled"
                size={SwitchSize.MEDIUM}
                name="complex-switch"
                value="complex"
                onChange={(checked) => {
                    console.log('Complex switch changed:', checked)
                }}
            />

            {/* SwitchGroup - Basic */}
            <SwitchGroup name="basic-group" label="Basic Group">
                <Switch value="switch1" label="Switch 1" />
                <Switch value="switch2" label="Switch 2" />
                <Switch value="switch3" label="Switch 3" />
            </SwitchGroup>

            {/* SwitchGroup - With Default Values */}
            <SwitchGroup
                name="default-group"
                label="Group with Defaults"
                defaultValue={['switch1', 'switch3']}
            >
                <Switch value="switch1" label="Switch 1" />
                <Switch value="switch2" label="Switch 2" />
                <Switch value="switch3" label="Switch 3" />
            </SwitchGroup>

            {/* SwitchGroup - Controlled */}
            <SwitchGroup
                name="controlled-group"
                label="Controlled Group"
                value={['switch1']}
                onChange={(values) => {
                    console.log('Group values changed:', values)
                }}
            >
                <Switch value="switch1" label="Switch 1" />
                <Switch value="switch2" label="Switch 2" />
                <Switch value="switch3" label="Switch 3" />
            </SwitchGroup>

            {/* SwitchGroup - Disabled */}
            <SwitchGroup
                name="disabled-group"
                label="Disabled Group"
                disabled={true}
            >
                <Switch value="switch1" label="Switch 1" />
                <Switch value="switch2" label="Switch 2" />
                <Switch value="switch3" label="Switch 3" />
            </SwitchGroup>

            {/* SwitchGroup - With Subtext */}
            <SwitchGroup name="subtext-group" label="Group with Subtext">
                <Switch
                    value="switch1"
                    label="Switch 1"
                    subtext="Description for switch 1"
                />
                <Switch
                    value="switch2"
                    label="Switch 2"
                    subtext="Description for switch 2"
                />
                <Switch
                    value="switch3"
                    label="Switch 3"
                    subtext="Description for switch 3"
                />
            </SwitchGroup>

            {/* SwitchGroup - With Slots */}
            <SwitchGroup name="slot-group" label="Group with Slots">
                <Switch
                    value="switch1"
                    label="Switch 1"
                    slot={<Info size={16} />}
                />
                <Switch
                    value="switch2"
                    label="Switch 2"
                    slot={<AlertCircle size={16} />}
                />
                <Switch value="switch3" label="Switch 3" />
            </SwitchGroup>

            {/* SwitchGroup - Small Size */}
            <SwitchGroup name="small-group" label="Small Size Group">
                <Switch
                    value="switch1"
                    size={SwitchSize.SMALL}
                    label="Switch 1"
                />
                <Switch
                    value="switch2"
                    size={SwitchSize.SMALL}
                    label="Switch 2"
                />
                <Switch
                    value="switch3"
                    size={SwitchSize.SMALL}
                    label="Switch 3"
                />
            </SwitchGroup>

            {/* SwitchGroup - Mixed Sizes */}
            <SwitchGroup name="mixed-group" label="Mixed Sizes Group">
                <Switch
                    value="switch1"
                    size={SwitchSize.SMALL}
                    label="Small Switch"
                />
                <Switch
                    value="switch2"
                    size={SwitchSize.MEDIUM}
                    label="Medium Switch"
                />
                <Switch
                    value="switch3"
                    size={SwitchSize.SMALL}
                    label="Small Switch"
                />
            </SwitchGroup>

            {/* All States - Small */}
            <Switch size={SwitchSize.SMALL} label="Small Unchecked" />
            <Switch
                size={SwitchSize.SMALL}
                checked={true}
                label="Small Checked"
            />
            <Switch
                size={SwitchSize.SMALL}
                disabled={true}
                label="Small Disabled"
            />
            <Switch size={SwitchSize.SMALL} error={true} label="Small Error" />

            {/* All States - Medium */}
            <Switch size={SwitchSize.MEDIUM} label="Medium Unchecked" />
            <Switch
                size={SwitchSize.MEDIUM}
                checked={true}
                label="Medium Checked"
            />
            <Switch
                size={SwitchSize.MEDIUM}
                disabled={true}
                label="Medium Disabled"
            />
            <Switch
                size={SwitchSize.MEDIUM}
                error={true}
                label="Medium Error"
            />
        </>
    )
}

export default SwitchLightHouse
