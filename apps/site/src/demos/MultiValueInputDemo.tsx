import { useState } from 'react'
import { MultiValueInput } from '../../../../packages/blend/lib/components/Inputs/MultiValueInput'
import { TextInputSize } from '../../../../packages/blend/lib/components/Inputs/TextInput/types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'

const MultiValueInputDemo = () => {
    // State for different examples
    const [basicTags, setBasicTags] = useState<string[]>([
        'React',
        'TypeScript',
    ])
    const [emailTags, setEmailTags] = useState<string[]>(['user@example.com'])
    const [skillsTags, setSkillsTags] = useState<string[]>([
        'JavaScript',
        'Python',
        'Go',
    ])
    const [categoryTags, setCategoryTags] = useState<string[]>([])
    const [errorTags, setErrorTags] = useState<string[]>(['invalid-email'])
    const [disabledTags] = useState<string[]>(['Read-only', 'Tag'])
    const [smallTags, setSmallTags] = useState<string[]>(['Small'])
    const [mediumTags, setMediumTags] = useState<string[]>(['Medium'])
    const [largeTags, setLargeTags] = useState<string[]>(['Large'])

    const [inputValue, setInputValue] = useState<string>('')

    // Handlers for different examples
    const handleBasicTagAdd = (tag: string) => {
        setBasicTags([...basicTags, tag])
        setInputValue('')
    }

    const handleBasicTagRemove = (tag: string) => {
        setBasicTags(basicTags.filter((t) => t !== tag))
    }

    const handleEmailTagAdd = (tag: string) => {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(tag)) {
            setEmailTags([...emailTags, tag])
        }
    }

    const handleEmailTagRemove = (tag: string) => {
        setEmailTags(emailTags.filter((t) => t !== tag))
    }

    const handleSkillsTagAdd = (tag: string) => {
        setSkillsTags([...skillsTags, tag])
    }

    const handleSkillsTagRemove = (tag: string) => {
        setSkillsTags(skillsTags.filter((t) => t !== tag))
    }

    const handleCategoryTagAdd = (tag: string) => {
        setCategoryTags([...categoryTags, tag])
    }

    const handleCategoryTagRemove = (tag: string) => {
        setCategoryTags(categoryTags.filter((t) => t !== tag))
    }

    const handleErrorTagAdd = (tag: string) => {
        setErrorTags([...errorTags, tag])
    }

    const handleErrorTagRemove = (tag: string) => {
        setErrorTags(errorTags.filter((t) => t !== tag))
    }

    const handleSmallTagAdd = (tag: string) => {
        setSmallTags([...smallTags, tag])
    }

    const handleSmallTagRemove = (tag: string) => {
        setSmallTags(smallTags.filter((t) => t !== tag))
    }

    const handleMediumTagAdd = (tag: string) => {
        setMediumTags([...mediumTags, tag])
    }

    const handleMediumTagRemove = (tag: string) => {
        setMediumTags(mediumTags.filter((t) => t !== tag))
    }

    const handleLargeTagAdd = (tag: string) => {
        setLargeTags([...largeTags, tag])
    }

    const handleLargeTagRemove = (tag: string) => {
        setLargeTags(largeTags.filter((t) => t !== tag))
    }

    return (
        <Block
            padding="32px"
            display="flex"
            flexDirection="column"
            gap="40px"
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            minHeight="100vh"
        >
            <Block>
                <Block marginBottom="8px">
                    <Text
                        variant="heading.lg"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[900]}
                    >
                        MultiValueInput Component Demo
                    </Text>
                </Block>
                <Text
                    variant="body.md"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Interactive playground for MultiValueInput component
                    variations
                </Text>
            </Block>

            {/* Basic Example */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Basic Usage
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        onFocus={() => console.log('focused')}
                        onBlur={() => console.log('blurred')}
                        value={inputValue}
                        onChange={(value) => setInputValue(value)}
                        label="Technologies"
                        sublabel="Add programming languages or frameworks"
                        placeholder="Type and press Enter to add"
                        tags={basicTags}
                        onTagAdd={handleBasicTagAdd}
                        onTagRemove={handleBasicTagRemove}
                        hintText="Press Enter to add a tag, Backspace to remove the last one"
                    />
                    <button onClick={() => handleBasicTagAdd('Test')}>
                        Test
                    </button>
                </Block>
            </Block>

            {/* Email Tags Example */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Email Tags with Validation
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        label="Email Recipients"
                        sublabel="Add email addresses"
                        placeholder="Enter email address"
                        tags={emailTags}
                        onTagAdd={handleEmailTagAdd}
                        onTagRemove={handleEmailTagRemove}
                        hintText="Only valid email addresses will be added"
                    />
                </Block>
            </Block>

            {/* Different Sizes */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Different Sizes
                    </Text>
                </Block>
                <Block display="flex" flexDirection="column" gap="24px">
                    <Block maxWidth="400px">
                        <MultiValueInput
                            label="Small Size"
                            placeholder="Small input"
                            tags={smallTags}
                            onTagAdd={handleSmallTagAdd}
                            onTagRemove={handleSmallTagRemove}
                            size={TextInputSize.SMALL}
                        />
                    </Block>
                    <Block maxWidth="500px">
                        <MultiValueInput
                            label="Medium Size (Default)"
                            placeholder="Medium input"
                            tags={mediumTags}
                            onTagAdd={handleMediumTagAdd}
                            onTagRemove={handleMediumTagRemove}
                            size={TextInputSize.MEDIUM}
                        />
                    </Block>
                    <Block maxWidth="600px">
                        <MultiValueInput
                            label="Large Size"
                            placeholder="Large input"
                            tags={largeTags}
                            onTagAdd={handleLargeTagAdd}
                            onTagRemove={handleLargeTagRemove}
                            size={TextInputSize.LARGE}
                        />
                    </Block>
                </Block>
            </Block>

            {/* Required Field */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Required Field
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        label="Skills"
                        sublabel="List your technical skills"
                        placeholder="Add skills"
                        tags={skillsTags}
                        onTagAdd={handleSkillsTagAdd}
                        onTagRemove={handleSkillsTagRemove}
                        required
                        hintText="At least one skill is required"
                    />
                </Block>
            </Block>

            {/* Error State */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Error State
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        label="Tags with Error"
                        sublabel="This field has validation errors"
                        placeholder="Add tags"
                        tags={errorTags}
                        onTagAdd={handleErrorTagAdd}
                        onTagRemove={handleErrorTagRemove}
                        error
                        errorMessage="Please remove invalid tags and ensure all entries are valid"
                    />
                </Block>
            </Block>

            {/* Disabled State */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Disabled State
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        label="Read-only Tags"
                        sublabel="This field cannot be modified"
                        placeholder="Cannot add tags"
                        tags={disabledTags}
                        disabled
                        hintText="This field is read-only"
                    />
                </Block>
            </Block>

            {/* Empty State */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Empty State
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        label="Categories"
                        sublabel="Add product categories"
                        placeholder="Start typing to add categories"
                        tags={categoryTags}
                        onTagAdd={handleCategoryTagAdd}
                        onTagRemove={handleCategoryTagRemove}
                        hintText="No categories added yet"
                    />
                </Block>
            </Block>

            {/* Additional HTML Input Attributes */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        With Additional Input Attributes
                    </Text>
                </Block>
                <Block maxWidth="500px">
                    <MultiValueInput
                        label="Restricted Input"
                        sublabel="Maximum 3 characters per tag"
                        placeholder="Short tags only"
                        tags={[]}
                        onTagAdd={(tag) => {
                            if (tag.length <= 3) {
                                // Handle add logic here
                                console.log('Adding tag:', tag)
                            }
                        }}
                        onTagRemove={(tag) => {
                            console.log('Removing tag:', tag)
                        }}
                        maxLength={3}
                        autoComplete="off"
                        hintText="Each tag can be maximum 3 characters"
                    />
                </Block>
            </Block>

            {/* Usage Examples */}
            <Block>
                <Block marginBottom="16px">
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Usage Instructions
                    </Text>
                </Block>
                <Block
                    padding="20px"
                    backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                    borderRadius="8px"
                    border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                >
                    <Block marginBottom="12px">
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[700]}
                        >
                            <strong>Keyboard Shortcuts:</strong>
                        </Text>
                    </Block>
                    <Block display="flex" flexDirection="column" gap="4px">
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            • <strong>Enter</strong> - Add current input as a
                            tag
                        </Text>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            • <strong>Backspace</strong> - Remove last tag (when
                            input is empty)
                        </Text>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            • <strong>Click</strong> - Focus the input field
                        </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

export default MultiValueInputDemo
