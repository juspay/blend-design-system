import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    MultiValueInput,
    MultiValueInputSize,
} from '@juspay/blend-design-system'
import { Search, User, Mail, Tag } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof MultiValueInput> = {
    title: 'Components/Inputs/MultiValueInput',
    component: MultiValueInput,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A specialized input component for managing multiple values as tags, ideal for features like tagging, categories, keywords, or multi-item selection.

## Features
- Three sizes (Small, Medium, Large)
- Dynamic tag addition and removal
- Tag validation and error handling
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Error state handling with custom messages
- Required field indication
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Accessibility

- Uses native \`<input type="text">\` for proper semantics
- Labels are associated via \`label\`, \`sublabel\`, and \`name\` props
- Required state is visually indicated and exposed via \`required\` / \`aria-required\`
- Error state is exposed via error text and can be associated with inputs via \`InputFooter\`
- Focus styles and error shake patterns are keyboard-friendly
- Tag removal buttons are keyboard accessible (Enter/Space to activate)
- Left/right slot icons are decorative by default and should not replace accessible labels
- Hint and help text provide additional instructions for users and assistive technologies
- Tag keyboard navigation: Enter to add tag, Backspace on empty input to remove last tag

**WCAG Compliance Target**: 2.1 Level AA (designed to support 2.2 as the latest version of WCAG [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)])

**Intended coverage:**
- **Perceivable**: Labels, hints, and error messages are visible and can be programmatically associated
- **Operable**: Fully keyboard operable (Tab / Shift+Tab focus, Enter to add tags, Backspace to remove tags, Enter/Space on tag remove buttons)
- **Understandable**: Clear labels, inline help, and error messaging patterns
- **Robust**: Built with semantic HTML and ARIA-friendly props for screen readers

**Verification:**
- **Storybook a11y addon**: Use the Accessibility panel to check for violations (expected 0 for A/AA)
- **jest-axe tests**: Run \`pnpm test MultiValueInput.accessibility\` to automate WCAG checks
- **Manual tests**: Verify with screen readers (VoiceOver/NVDA), keyboard-only navigation, and contrast tools

> Note: WCAG 2.2 builds on 2.1 and 2.0; content that conforms to 2.2 also conforms to earlier versions [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)].

## Usage

\`\`\`tsx
import { MultiValueInput, MultiValueInputSize } from '@juspay/blend-design-system';

<MultiValueInput
  label="Keywords"
  tags={tags}
  onTagAdd={(tag) => setTags([...tags, tag])}
  onTagRemove={(tag) => setTags(tags.filter(t => t !== tag))}
  size={MultiValueInputSize.MD}
  placeholder="Add keyword..."
  required
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        tags: {
            control: false,
            description: 'Array of current tags',
            table: {
                type: { summary: 'string[]' },
                category: 'Core',
            },
        },
        onTagAdd: {
            action: 'tag-added',
            description: 'Callback fired when a new tag is added',
            table: {
                type: { summary: '(tag: string) => void' },
                category: 'Core',
            },
        },
        onTagRemove: {
            action: 'tag-removed',
            description: 'Callback fired when a tag is removed',
            table: {
                type: { summary: '(tag: string) => void' },
                category: 'Core',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(MultiValueInputSize),
            description: 'Size variant of the input',
            table: {
                type: { summary: 'MultiValueInputSize' },
                defaultValue: { summary: 'MultiValueInputSize.MD' },
                category: 'Appearance',
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the input',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label text displayed below the main label',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text displayed below the input',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip text for the help icon',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the input is in error state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Error message displayed when in error state',
            table: {
                type: { summary: 'string' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the input is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when input is empty',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        onFocus: {
            action: 'focused',
            description: 'Callback fired when the input receives focus',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            description: 'Callback fired when the input loses focus',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MultiValueInput>

// Default story
export const Default: Story = {
    render: function DefaultMultiValueInput(args) {
        const [tags, setTags] = useState<string[]>([])

        return (
            <MultiValueInput
                {...args}
                tags={tags}
                onTagAdd={(tag) => setTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                }
            />
        )
    },
    args: {
        label: 'Default Multi Value Input',
        placeholder: 'Type and press Enter to add',
        size: MultiValueInputSize.MD,
        disabled: false,
        error: false,
    },
}

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [tags, setTags] = useState({
            sm: ['small', 'tags'] as string[],
            md: ['medium', 'sized', 'tags'] as string[],
            lg: ['large', 'format', 'tags'] as string[],
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <MultiValueInput
                    label="Small Size"
                    size={MultiValueInputSize.SM}
                    tags={tags.sm}
                    onTagAdd={(tag) =>
                        setTags((prev) => ({ ...prev, sm: [...prev.sm, tag] }))
                    }
                    onTagRemove={(tag) =>
                        setTags((prev) => ({
                            ...prev,
                            sm: prev.sm.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add small tag..."
                />
                <MultiValueInput
                    label="Medium Size"
                    size={MultiValueInputSize.MD}
                    tags={tags.md}
                    onTagAdd={(tag) =>
                        setTags((prev) => ({ ...prev, md: [...prev.md, tag] }))
                    }
                    onTagRemove={(tag) =>
                        setTags((prev) => ({
                            ...prev,
                            md: prev.md.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add medium tag..."
                />
                <MultiValueInput
                    label="Large Size"
                    size={MultiValueInputSize.LG}
                    tags={tags.lg}
                    onTagAdd={(tag) =>
                        setTags((prev) => ({ ...prev, lg: [...prev.lg, tag] }))
                    }
                    onTagRemove={(tag) =>
                        setTags((prev) => ({
                            ...prev,
                            lg: prev.lg.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add large tag..."
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiValueInput in different sizes: Small, Medium, and Large.',
            },
        },
    },
}

// Different use cases
export const UseCases: Story = {
    render: () => {
        const [values, setValues] = useState({
            keywords: ['react', 'typescript', 'ui'] as string[],
            categories: ['frontend', 'development'] as string[],
            skills: ['javascript', 'css', 'html'] as string[],
            emails: ['user@example.com'] as string[],
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <MultiValueInput
                    label="Keywords"
                    sublabel="Add relevant keywords for better searchability"
                    tags={values.keywords}
                    onTagAdd={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            keywords: [...prev.keywords, tag],
                        }))
                    }
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            keywords: prev.keywords.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add keyword..."
                />
                <MultiValueInput
                    label="Categories"
                    tags={values.categories}
                    onTagAdd={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            categories: [...prev.categories, tag],
                        }))
                    }
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            categories: prev.categories.filter(
                                (t) => t !== tag
                            ),
                        }))
                    }
                    placeholder="Add category..."
                />
                <MultiValueInput
                    label="Skills"
                    tags={values.skills}
                    onTagAdd={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            skills: [...prev.skills, tag],
                        }))
                    }
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add skill..."
                />
                <MultiValueInput
                    label="Email Recipients"
                    tags={values.emails}
                    onTagAdd={(tag) => {
                        // Basic email validation
                        if (tag.includes('@')) {
                            setValues((prev) => ({
                                ...prev,
                                emails: [...prev.emails, tag],
                            }))
                        }
                    }}
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            emails: prev.emails.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add email address..."
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiValueInput for different use cases: keywords, categories, skills, and email recipients.',
            },
        },
    },
}

// Error and validation states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: [] as string[],
            tooMany: [
                'tag1',
                'tag2',
                'tag3',
                'tag4',
                'tag5',
                'tag6',
            ] as string[],
            duplicates: ['unique', 'tags'] as string[],
            valid: ['valid', 'tags'] as string[],
        })

        const maxTags = 5

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <MultiValueInput
                    label="Required Tags"
                    tags={values.required}
                    onTagAdd={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            required: [...prev.required, tag],
                        }))
                    }
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            required: prev.required.filter((t) => t !== tag),
                        }))
                    }
                    error={values.required.length === 0}
                    errorMessage={
                        values.required.length === 0
                            ? 'At least one tag is required'
                            : ''
                    }
                    placeholder="Add required tag..."
                />
                <MultiValueInput
                    label="Too Many Tags"
                    sublabel={`Maximum ${maxTags} tags allowed`}
                    tags={values.tooMany}
                    onTagAdd={(tag) => {
                        if (values.tooMany.length < maxTags) {
                            setValues((prev) => ({
                                ...prev,
                                tooMany: [...prev.tooMany, tag],
                            }))
                        }
                    }}
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            tooMany: prev.tooMany.filter((t) => t !== tag),
                        }))
                    }
                    error={values.tooMany.length > maxTags}
                    errorMessage={`Maximum ${maxTags} tags allowed. Please remove ${values.tooMany.length - maxTags} tag(s).`}
                    placeholder="Add tag..."
                />
                <MultiValueInput
                    label="No Duplicates"
                    tags={values.duplicates}
                    onTagAdd={(tag) => {
                        if (!values.duplicates.includes(tag.toLowerCase())) {
                            setValues((prev) => ({
                                ...prev,
                                duplicates: [...prev.duplicates, tag],
                            }))
                        }
                    }}
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            duplicates: prev.duplicates.filter(
                                (t) => t !== tag
                            ),
                        }))
                    }
                    hintText="Duplicate tags are not allowed"
                    placeholder="Add unique tag..."
                />
                <MultiValueInput
                    label="Valid Tags"
                    tags={values.valid}
                    onTagAdd={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: [...prev.valid, tag],
                        }))
                    }
                    onTagRemove={(tag) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: prev.valid.filter((t) => t !== tag),
                        }))
                    }
                    placeholder="Add tag..."
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiValueInput showing different validation states: required tags, maximum limit, duplicate prevention, and valid state.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <MultiValueInput
                label="Disabled Empty"
                tags={[]}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
                placeholder="This input is disabled"
                disabled
            />
            <MultiValueInput
                label="Disabled With Tags"
                tags={['readonly', 'tags', 'cannot', 'modify']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'MultiValueInput in disabled state, both empty and with existing tags.',
            },
        },
    },
}

// With comprehensive labels and hints
export const WithLabelsAndHints: Story = {
    render: () => {
        const [tags, setTags] = useState(['javascript', 'react'])

        return (
            <MultiValueInput
                label="Project Technologies"
                sublabel="Add technologies used in this project"
                hintText="Press Enter or comma to add a tag"
                helpIconHintText="These tags will help categorize your project and make it easier to find. You can add programming languages, frameworks, tools, etc."
                tags={tags}
                onTagAdd={(tag) => setTags((prev) => [...prev, tag])}
                onTagRemove={(tag) =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                }
                placeholder="e.g., TypeScript, Next.js, TailwindCSS..."
                size={MultiValueInputSize.MD}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiValueInput with comprehensive labeling: main label, sublabel, hint text, and help tooltip.',
            },
        },
    },
}

// Accessibility story
export const Accessibility: Story = {
    render: () => {
        const [keywords, setKeywords] = useState<string[]>([])
        const [categories, setCategories] = useState<string[]>([])
        const [skills, setSkills] = useState<string[]>(['react', 'typescript'])
        const [disabledTags] = useState(['readonly', 'tags'])

        const keywordsError =
            keywords.length === 0 ? 'At least one keyword is required' : ''

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    maxWidth: '600px',
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Labels, Required Fields, and Hints
                    </h3>
                    <MultiValueInput
                        label="Keywords"
                        sublabel="Add relevant keywords for searchability"
                        hintText="Press Enter to add a keyword"
                        placeholder="Type and press Enter..."
                        tags={keywords}
                        onTagAdd={(tag) =>
                            setKeywords((prev) => [...prev, tag])
                        }
                        onTagRemove={(tag) =>
                            setKeywords((prev) => prev.filter((t) => t !== tag))
                        }
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Error Messaging and Validation
                    </h3>
                    <MultiValueInput
                        label="Categories"
                        placeholder="Add category..."
                        tags={categories}
                        onTagAdd={(tag) =>
                            setCategories((prev) => [...prev, tag])
                        }
                        onTagRemove={(tag) =>
                            setCategories((prev) =>
                                prev.filter((t) => t !== tag)
                            )
                        }
                        error={categories.length === 0}
                        errorMessage={keywordsError}
                        hintText="At least one category is required"
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Disabled and Read-Only Contexts
                    </h3>
                    <MultiValueInput
                        label="Disabled MultiValueInput"
                        tags={disabledTags}
                        onTagAdd={() => {}}
                        onTagRemove={() => {}}
                        placeholder="This input is disabled"
                        disabled
                        hintText="Disabled fields are not focusable and do not submit values"
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Keyboard and Screen Reader Friendly Layout
                    </h3>
                    <MultiValueInput
                        label="Skills"
                        sublabel="Add your technical skills"
                        hintText="Press Enter to add, Backspace on empty input to remove last tag"
                        helpIconHintText="Use keyboard: Tab to focus, Enter to add tags, Backspace to remove last tag, Enter/Space on tag remove buttons"
                        tags={skills}
                        onTagAdd={(tag) => setSkills((prev) => [...prev, tag])}
                        onTagRemove={(tag) =>
                            setSkills((prev) => prev.filter((t) => t !== tag))
                        }
                        placeholder="e.g., JavaScript, TypeScript, React..."
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Tag Removal with Keyboard
                    </h3>
                    <MultiValueInput
                        label="Tags with Keyboard Removal"
                        hintText="Focus a tag and press Enter or Space to remove it"
                        tags={skills}
                        onTagAdd={(tag) => setSkills((prev) => [...prev, tag])}
                        onTagRemove={(tag) =>
                            setSkills((prev) => prev.filter((t) => t !== tag))
                        }
                        placeholder="Add tag..."
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating labeling, required indicators, error messaging, disabled state, keyboard-friendly focus behavior, and tag management.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to label / control associations, error messaging, and tag button accessibility.

2. **jest-axe tests**:
   - Add \`MultiValueInput.accessibility.test.tsx\` and run:
   \`\`\`bash
   pnpm test MultiValueInput.accessibility
   \`\`\`
   - Validate WCAG 2.0, 2.1, 2.2 A and AA success criteria for form fields (labels, errors, keyboard support, tag interactions).

3. **Manual testing**:
   - Navigate using keyboard only (Tab / Shift+Tab, Enter to add tags, Backspace to remove last tag).
   - Use a screen reader (VoiceOver/NVDA) to confirm labels, hints, errors, and tag names are announced.
   - Verify tag remove buttons are keyboard accessible (Enter/Space to activate).
   - Verify color contrast of text, borders, and focus styles using contrast tools.
   - Test tag removal via keyboard: Focus tag remove button and press Enter or Space.
                `,
            },
        },
        a11y: {
            ...getA11yConfig('form'),
        },
    },
}
