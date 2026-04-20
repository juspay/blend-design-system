import { useState } from 'react'
import { TextArea } from '../../../Inputs'

const TextAreaLightHouse = () => {
    const [basicText, setBasicText] = useState('')
    const [requiredText, setRequiredText] = useState('')
    const [errorText, setErrorText] = useState('Short')
    const [disabledText] = useState(
        'This field is disabled and cannot be edited'
    )

    return (
        <div className="flex flex-col gap-4">
            {/* Basic TextArea */}
            <TextArea
                label="Description"
                placeholder="Enter your description..."
                value={basicText}
                onChange={(e) => setBasicText(e.target.value)}
                rows={4}
            />

            {/* With sublabel and hint */}
            <TextArea
                label="Project Description"
                sublabel="Provide a detailed overview"
                hintText="Enter at least 10 characters"
                placeholder="Describe your project..."
                value={basicText}
                onChange={(e) => setBasicText(e.target.value)}
                rows={5}
            />

            {/* Required field */}
            <TextArea
                label="Required Description"
                placeholder="This field is required..."
                value={requiredText}
                onChange={(e) => setRequiredText(e.target.value)}
                rows={4}
                required
                hintText="This field is required"
            />

            {/* Error state */}
            <TextArea
                label="Description (Error Example)"
                placeholder="Enter description..."
                value={errorText}
                onChange={(e) => setErrorText(e.target.value)}
                rows={4}
                error={errorText.length > 0 && errorText.length < 10}
                errorMessage="Please enter at least 10 characters"
            />

            {/* Disabled state */}
            <TextArea
                label="Disabled TextArea"
                placeholder="This textarea is disabled"
                value={disabledText}
                onChange={() => {}}
                rows={4}
                disabled
                hintText="This field is disabled"
            />

            {/* Different row counts */}
            <TextArea
                label="Small (3 rows)"
                placeholder="Small textarea..."
                value=""
                onChange={() => {}}
                rows={3}
            />
            <TextArea
                label="Medium (5 rows)"
                placeholder="Medium textarea..."
                value=""
                onChange={() => {}}
                rows={5}
            />
            <TextArea
                label="Large (8 rows)"
                placeholder="Large textarea..."
                value=""
                onChange={() => {}}
                rows={8}
            />

            {/* Different resize options */}
            <TextArea
                label="No Resize"
                placeholder="Cannot be resized..."
                value=""
                onChange={() => {}}
                rows={4}
                resize="none"
            />
            <TextArea
                label="Vertical Resize"
                placeholder="Can be resized vertically..."
                value=""
                onChange={() => {}}
                rows={4}
                resize="vertical"
            />
            <TextArea
                label="Both Directions"
                placeholder="Can be resized in both directions..."
                value=""
                onChange={() => {}}
                rows={4}
                resize="both"
            />

            {/* With help icon */}
            <TextArea
                label="Description"
                helpIconHintText="Provide a comprehensive description that will help reviewers understand your project"
                placeholder="Enter description..."
                value={basicText}
                onChange={(e) => setBasicText(e.target.value)}
                rows={4}
            />

            {/* With character limit */}
            <TextArea
                label="Review Notes"
                sublabel="Maximum 500 characters"
                hintText="0/500 characters"
                placeholder="Enter review notes..."
                value=""
                onChange={() => {}}
                rows={4}
                maxLength={500}
            />
        </div>
    )
}

export default TextAreaLightHouse
