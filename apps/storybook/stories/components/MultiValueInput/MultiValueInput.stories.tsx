import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    MultiValueInput,
    MultiValueInputSize,
} from '@juspay/blend-design-system'
import { Search, User, Mail, Tag } from 'lucide-react'

const meta: Meta<typeof MultiValueInput> = {
    title: 'Components/Inputs/MultiValueInput',
    component: MultiValueInput,
    parameters: {
        layout: 'padded',
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
