import { useState } from 'react'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { NumberInput } from '../../../../packages/blend/lib/components/Inputs/NumberInput'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextArea } from '../../../../packages/blend/lib/components/Inputs/TextArea'
import {
    Button,
    ButtonType,
} from '../../../../packages/blend/lib/components/Button'
import {
    RadioGroup,
    Radio,
} from '../../../../packages/blend/lib/components/Radio'
import { Checkbox } from '../../../../packages/blend/lib/components/Checkbox'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { User, Mail, Lock } from 'lucide-react'
import {
    MultiSelect,
    MultiSelectMenuGroupType,
    MultiSelectSelectionTagType,
} from '../../../../packages/blend/lib/components/MultiSelect'

const FormElementsDemo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        budget: 1000,
        country: 'us',
        bio: '',
        accountType: 'personal',
        newsletter: false,
        terms: false,
        notifications: true,
    })
    const simpleItems: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
                { label: 'Option 5', value: 'option5' },
            ],
        },
    ]
    const handleMultiSelectChange =
        (
            _: string[],
            setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
        ) =>
        (value: string) => {
            if (value === '') {
                setSelectedValues([])
            } else {
                setSelectedValues((prev) =>
                    prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                )
            }
        }
    const [basicSimpleSelected, setBasicSimpleSelected] = useState<string[]>([])

    const handleSubmit = () => {
        addSnackbar({
            header: 'Form Submitted!',
            description: `Account type: ${formData.accountType}`,
        })
        console.log('Form Data:', formData)
    }

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            budget: 1000,
            country: 'us',
            bio: '',
            accountType: 'personal',
            newsletter: false,
            terms: false,
            notifications: true,
        })
        addSnackbar({ header: 'Form Reset' })
    }

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Form Elements Demo</h1>
                <p className="text-gray-600">
                    A concise demo showcasing all form elements
                </p>
            </div>

            <div className="bg-white rounded-lg border p-6 space-y-6">
                {/* Text Inputs */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Inputs</h2>
                    <TextInput
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        leftSlot={<User size={16} />}
                        required
                    />
                    <TextInput
                        label="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@example.com"
                        leftSlot={<Mail size={16} />}
                        required
                    />
                    <TextInput
                        label="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        type="password"
                        placeholder="Enter password"
                        leftSlot={<Lock size={16} />}
                        hintText="Must be at least 8 characters"
                        required
                    />

                    <NumberInput
                        label="Budget"
                        value={formData.budget}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                budget: parseFloat(e.target.value) || 0,
                            })
                        }
                        placeholder="Enter budget"
                        min={0}
                        max={100000}
                    />
                    <Button
                        text="Reset"
                        buttonType={ButtonType.SECONDARY}
                        onClick={handleReset}
                    />
                    <SingleSelect
                        label="Country"
                        selected={formData.country}
                        onSelect={(value) =>
                            setFormData({ ...formData, country: value })
                        }
                        placeholder="Select country"
                        items={[
                            {
                                items: [
                                    { value: 'us', label: 'United States' },
                                    { value: 'uk', label: 'United Kingdom' },
                                    { value: 'ca', label: 'Canada' },
                                    { value: 'au', label: 'Australia' },
                                ],
                            },
                        ]}
                    />
                    <MultiSelect
                        enableSearch={true}
                        enableSelectAll={true}
                        label="Basic Options"
                        items={simpleItems}
                        selectedValues={basicSimpleSelected}
                        onChange={handleMultiSelectChange(
                            basicSimpleSelected,
                            setBasicSimpleSelected
                        )}
                        placeholder="Choose multiple options"
                        selectionTagType={MultiSelectSelectionTagType.COUNT}
                    />
                    <TextArea
                        label="Bio"
                        value={formData.bio}
                        onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                        }
                        placeholder="Tell us about yourself"
                        rows={3}
                    />
                </div>

                {/* Radio Group */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Radio Group</h2>
                    <RadioGroup
                        label="Account Type"
                        name="accountType"
                        value={formData.accountType}
                        onChange={(value: string) =>
                            setFormData({ ...formData, accountType: value })
                        }
                    >
                        <Radio value="personal" subtext="For individual use">
                            Personal
                        </Radio>
                        <Radio value="business" subtext="For business accounts">
                            Business
                        </Radio>
                        <Radio
                            value="enterprise"
                            subtext="For large organizations"
                        >
                            Enterprise
                        </Radio>
                    </RadioGroup>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Checkboxes</h2>
                    <div className="space-y-2">
                        <Checkbox
                            checked={formData.newsletter || false}
                            onCheckedChange={(checked) =>
                                setFormData({
                                    ...formData,
                                    newsletter: checked as boolean,
                                })
                            }
                            subtext="Get weekly updates and news"
                        >
                            Subscribe to newsletter
                        </Checkbox>
                        <Checkbox
                            checked={formData.terms}
                            onCheckedChange={(checked) =>
                                setFormData({
                                    ...formData,
                                    terms: checked as boolean,
                                })
                            }
                            required
                        >
                            I agree to the terms and conditions
                        </Checkbox>
                    </div>
                </div>

                {/* Switch */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Switch</h2>
                    <Switch
                        label="Enable Notifications"
                        subtext="Receive push notifications for updates"
                        checked={formData.notifications}
                        onChange={() =>
                            setFormData({
                                ...formData,
                                notifications: !formData.notifications,
                            })
                        }
                    />
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Buttons</h2>
                    <div className="flex gap-3">
                        <Button
                            text="Submit"
                            buttonType={ButtonType.PRIMARY}
                            onClick={handleSubmit}
                        />
                        <Button
                            text="Reset"
                            buttonType={ButtonType.SECONDARY}
                            onClick={handleReset}
                        />
                        <Button
                            text="Cancel"
                            buttonType={ButtonType.DANGER}
                            onClick={() => addSnackbar({ header: 'Cancelled' })}
                        />
                    </div>
                </div>
            </div>

            {/* Form Data Display */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-2">Form State:</h3>
                <pre className="text-xs overflow-auto">
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default FormElementsDemo
