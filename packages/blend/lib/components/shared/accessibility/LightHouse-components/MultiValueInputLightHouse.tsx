import { useState } from 'react'
import { MultiValueInput } from '../../../Inputs'
import { TextInputSize } from '../../../Inputs/TextInput/types'

const MultiValueInputLightHouse = () => {
    const [basicTags, setBasicTags] = useState<string[]>([])
    const [requiredTags, setRequiredTags] = useState<string[]>([])
    const [errorTags, setErrorTags] = useState<string[]>([])
    const [disabledTags] = useState(['readonly', 'tags'])

    return (
        <div className="flex flex-col gap-4">
            {/* Basic MultiValueInput */}
            <MultiValueInput
                label="Keywords"
                placeholder="Add keyword..."
                value=""
                onChange={() => {}}
                tags={basicTags}
                onTagAdd={(tag) => setBasicTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setBasicTags((prev) => prev.filter((t) => t !== tag))
                }
            />

            {/* With sublabel and hint */}
            <MultiValueInput
                label="Project Technologies"
                sublabel="Add technologies used in this project"
                hintText="Press Enter to add a technology"
                placeholder="e.g., React, TypeScript..."
                value=""
                onChange={() => {}}
                tags={basicTags}
                onTagAdd={(tag) => setBasicTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setBasicTags((prev) => prev.filter((t) => t !== tag))
                }
            />

            {/* Required field */}
            <MultiValueInput
                label="Required Tags"
                placeholder="This field is required..."
                value=""
                onChange={() => {}}
                tags={requiredTags}
                onTagAdd={(tag) => setRequiredTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setRequiredTags((prev) => prev.filter((t) => t !== tag))
                }
                required
                hintText="This field is required"
            />

            {/* Error state */}
            <MultiValueInput
                label="Categories (Error Example)"
                placeholder="Add category..."
                value=""
                onChange={() => {}}
                tags={errorTags}
                onTagAdd={(tag) => setErrorTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setErrorTags((prev) => prev.filter((t) => t !== tag))
                }
                error={errorTags.length === 0}
                errorMessage="At least one category is required"
            />

            {/* Disabled state */}
            <MultiValueInput
                label="Disabled MultiValueInput"
                placeholder="This input is disabled"
                value=""
                onChange={() => {}}
                tags={disabledTags}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
                disabled
                hintText="This field is disabled"
            />

            {/* Different sizes */}
            <MultiValueInput
                label="Small Size"
                placeholder="Add tag..."
                value=""
                onChange={() => {}}
                tags={[]}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
                size={TextInputSize.SMALL}
            />
            <MultiValueInput
                label="Medium Size"
                placeholder="Add tag..."
                value=""
                onChange={() => {}}
                tags={[]}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
                size={TextInputSize.MEDIUM}
            />
            <MultiValueInput
                label="Large Size"
                placeholder="Add tag..."
                value=""
                onChange={() => {}}
                tags={[]}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
                size={TextInputSize.LARGE}
            />

            {/* With multiple tags */}
            <MultiValueInput
                label="Skills"
                placeholder="Add skill..."
                value=""
                onChange={() => {}}
                tags={['react', 'typescript', 'javascript', 'css', 'html']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />

            {/* With help icon */}
            <MultiValueInput
                label="Keywords"
                helpIconHintText="Keywords help categorize your content and improve searchability"
                placeholder="Add keyword..."
                value=""
                onChange={() => {}}
                tags={basicTags}
                onTagAdd={(tag) => setBasicTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setBasicTags((prev) => prev.filter((t) => t !== tag))
                }
            />
        </div>
    )
}

export default MultiValueInputLightHouse
