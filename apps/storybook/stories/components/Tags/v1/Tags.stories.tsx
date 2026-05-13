import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    TagShape,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import {
    X,
    Check,
    AlertCircle,
    Info,
    Star,
    Heart,
    User,
    Calendar,
    MapPin,
    Zap,
    TrendingUp,
    Shield,
    Award,
    Flag,
    Bookmark,
    Hash,
    Percent,
    Plus,
    Server,
    Database,
    Activity,
    Smartphone,
} from 'lucide-react'

// Figma Code Connect is configured in Tags.figma.tsx

const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A versatile tag component for labeling, categorizing, and displaying metadata with various styles, colors, and sizes.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Tag, TagVariant, TagColor, TagSize } from '@juspay/blend-design-system';

<Tag
  text="New Feature"
  variant={TagVariant.SUBTLE}
  color={TagColor.SUCCESS}
  size={TagSize.SM}
  leftSlot={<Star size={12} />}
  onClick={() => console.log('Tag clicked')}
/>
\`\`\`

## Features
- Multiple variants (No Fill, Attentive, Subtle)
- Six color options (Neutral, Primary, Success, Error, Warning, Purple)
- Four size options (XS, SM, MD, LG)
- Two shape options (Rounded, Squarical)
- Left and right slots for icons or custom content
- Click handler support for interactive tags
- Split tag support for grouped tags
- Responsive and accessible design

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space for interactive tags)
- Screen reader support (VoiceOver/NVDA)
- Proper semantic HTML structure
- Interactive tags support onClick handlers with keyboard events
- Touch targets meet Level AA requirement (24x24px minimum for interactive tags)
- Color contrast ratios meet WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text)

**Level AAA Compliance**: ⚠️ Partial (3 out of 4 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA)
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Touch Target Sizes**:
- XS tags: ~16-20px (meets AA 24px when interactive, does not meet AAA 44px)
- SM tags: ~20-24px (meets AA 24px, does not meet AAA 44px)
- MD tags: ~24-28px (meets AA 24px, does not meet AAA 44px)
- LG tags: ~28-32px (meets AA 24px, does not meet AAA 44px)

**Accessibility Features**:
- Interactive tags support keyboard navigation (Enter/Space to activate)
- Decorative icons should have \`aria-hidden="true"\` when used in leftSlot/rightSlot
- Interactive tags should have descriptive text or \`aria-label\` for screen readers
- Tags with onClick handlers are keyboard accessible
- Focus indicators visible for interactive tags
- Semantic HTML structure (div with appropriate role when interactive)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Keyboard Testing**: Tab to interactive tags, press Enter/Space to activate
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

        `,
            },
        },
    },
    argTypes: {
        text: {
            control: 'text',
            description: 'The text content of the tag',
        },
        variant: {
            control: 'select',
            options: Object.values(TagVariant),
            description: 'The visual variant of the tag',
        },
        color: {
            control: 'select',
            options: Object.values(TagColor),
            description: 'The color scheme of the tag',
        },
        size: {
            control: 'select',
            options: Object.values(TagSize),
            description: 'The size of the tag',
        },
        shape: {
            control: 'select',
            options: Object.values(TagShape),
            description: 'The shape/border radius style of the tag',
        },
        leftSlot: {
            control: false,
            description: 'Content to display on the left side of the tag text',
        },
        rightSlot: {
            control: false,
            description: 'Content to display on the right side of the tag text',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler for interactive tags',
        },
        splitTagPosition: {
            control: 'select',
            options: [undefined, 'left', 'right'],
            description: 'Position for split tag styling (left or right)',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tag>

// Default story
export const Default: Story = {
    args: {
        text: 'Default Tag',
        variant: TagVariant.SUBTLE,
        color: TagColor.PRIMARY,
        size: TagSize.SM,
        shape: TagShape.SQUARICAL,
    },
}

// Tag Variants
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="mb-3 text-sm text-gray-500">No Fill Variant</h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="Neutral"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="Primary"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.PRIMARY}
                    />
                    <Tag
                        text="Success"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.SUCCESS}
                    />
                    <Tag
                        text="Error"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.ERROR}
                    />
                    <Tag
                        text="Warning"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Purple"
                        variant={TagVariant.NO_FILL}
                        color={TagColor.PURPLE}
                    />
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm text-gray-500">
                    Attentive Variant
                </h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="Neutral"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="Primary"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.PRIMARY}
                    />
                    <Tag
                        text="Success"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.SUCCESS}
                    />
                    <Tag
                        text="Error"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.ERROR}
                    />
                    <Tag
                        text="Warning"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Purple"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.PURPLE}
                    />
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Subtle Variant</h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="Neutral"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="Primary"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PRIMARY}
                    />
                    <Tag
                        text="Success"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.SUCCESS}
                    />
                    <Tag
                        text="Error"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.ERROR}
                    />
                    <Tag
                        text="Warning"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.WARNING}
                    />
                    <Tag
                        text="Purple"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PURPLE}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tag variants with all color options.',
            },
        },
    },
}

// Tag Sizes
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 items-start">
            <div className="flex gap-2 items-center">
                <Tag text="Extra Small" size={TagSize.XS} />
                <span className="text-xs text-gray-500">XS</span>
            </div>
            <div className="flex gap-2 items-center">
                <Tag text="Small" size={TagSize.SM} />
                <span className="text-xs text-gray-500">SM</span>
            </div>
            <div className="flex gap-2 items-center">
                <Tag text="Medium" size={TagSize.MD} />
                <span className="text-xs text-gray-500">MD</span>
            </div>
            <div className="flex gap-2 items-center">
                <Tag text="Large" size={TagSize.LG} />
                <span className="text-xs text-gray-500">LG</span>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All available tag sizes from extra small to large.',
            },
        },
    },
}

// Tag Shapes
export const Shapes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Squarical Shape</h3>
                <div className="flex gap-2">
                    <Tag
                        text="Squarical XS"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.XS}
                    />
                    <Tag
                        text="Squarical SM"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.SM}
                    />
                    <Tag
                        text="Squarical MD"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.MD}
                    />
                    <Tag
                        text="Squarical LG"
                        shape={TagShape.SQUARICAL}
                        size={TagSize.LG}
                    />
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Rounded Shape</h3>
                <div className="flex gap-2">
                    <Tag
                        text="Rounded XS"
                        shape={TagShape.ROUNDED}
                        size={TagSize.XS}
                    />
                    <Tag
                        text="Rounded SM"
                        shape={TagShape.ROUNDED}
                        size={TagSize.SM}
                    />
                    <Tag
                        text="Rounded MD"
                        shape={TagShape.ROUNDED}
                        size={TagSize.MD}
                    />
                    <Tag
                        text="Rounded LG"
                        shape={TagShape.ROUNDED}
                        size={TagSize.LG}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different shape options with various sizes.',
            },
        },
    },
}

// Tags with Icons
export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Left Icons</h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="New"
                        color={TagColor.SUCCESS}
                        leftSlot={<Star size={12} />}
                    />
                    <Tag
                        text="Favorite"
                        color={TagColor.ERROR}
                        leftSlot={<Heart size={12} />}
                    />
                    <Tag
                        text="User"
                        color={TagColor.PRIMARY}
                        leftSlot={<User size={12} />}
                    />
                    <Tag
                        text="Scheduled"
                        color={TagColor.WARNING}
                        leftSlot={<Calendar size={12} />}
                    />
                    <Tag
                        text="Trending"
                        color={TagColor.PURPLE}
                        leftSlot={<TrendingUp size={12} />}
                    />
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Right Icons</h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="Close"
                        rightSlot={<X size={12} />}
                        onClick={() => console.log('Remove tag')}
                    />
                    <Tag
                        text="Verified"
                        color={TagColor.SUCCESS}
                        rightSlot={<Check size={12} />}
                    />
                    <Tag
                        text="Protected"
                        color={TagColor.PRIMARY}
                        rightSlot={<Shield size={12} />}
                    />
                    <Tag
                        text="Premium"
                        color={TagColor.WARNING}
                        rightSlot={<Award size={12} />}
                    />
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Both Icons</h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="Location"
                        leftSlot={<MapPin size={12} />}
                        rightSlot={<X size={12} />}
                        onClick={() => console.log('Remove location tag')}
                    />
                    <Tag
                        text="Priority"
                        color={TagColor.ERROR}
                        leftSlot={<Flag size={12} />}
                        rightSlot={<AlertCircle size={12} />}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tags with icons in different positions for enhanced visual communication.',
            },
        },
    },
}

// Split Tags
export const SplitTags: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div>
                <h3 className="mb-3 text-sm text-gray-500">Split Tag Groups</h3>
                <div className="flex gap-4 flex-wrap">
                    <div className="flex">
                        <Tag
                            text="Version"
                            color={TagColor.NEUTRAL}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="2.0.0"
                            color={TagColor.PRIMARY}
                            splitTagPosition="right"
                        />
                    </div>
                    <div className="flex">
                        <Tag
                            text="Status"
                            color={TagColor.NEUTRAL}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="Active"
                            color={TagColor.SUCCESS}
                            splitTagPosition="right"
                        />
                    </div>
                    <div className="flex">
                        <Tag
                            text="Priority"
                            color={TagColor.NEUTRAL}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="High"
                            color={TagColor.ERROR}
                            splitTagPosition="right"
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Split tags for displaying key-value pairs or related information.',
            },
        },
    },
}

// Size and Icon Combinations
export const SizeAndIconCombinations: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            {Object.values(TagSize).map((size) => (
                <div key={size} className="flex gap-2">
                    <span className="text-xs text-gray-500 w-7.5">
                        {size.toUpperCase()}
                    </span>
                    <Tag text="Default" size={size} />
                    <Tag
                        text="With Icon"
                        size={size}
                        leftSlot={
                            <Star
                                size={
                                    size === TagSize.XS
                                        ? 10
                                        : size === TagSize.SM
                                          ? 12
                                          : size === TagSize.MD
                                            ? 14
                                            : 16
                                }
                            />
                        }
                    />
                    <Tag
                        text="Both Icons"
                        size={size}
                        leftSlot={
                            <Info
                                size={
                                    size === TagSize.XS
                                        ? 10
                                        : size === TagSize.SM
                                          ? 12
                                          : size === TagSize.MD
                                            ? 14
                                            : 16
                                }
                            />
                        }
                        rightSlot={
                            <X
                                size={
                                    size === TagSize.XS
                                        ? 10
                                        : size === TagSize.SM
                                          ? 12
                                          : size === TagSize.MD
                                            ? 14
                                            : 16
                                }
                            />
                        }
                    />
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tag sizes with appropriately sized icons.',
            },
        },
    },
}

// Edge Cases and Accessibility
export const EdgeCases: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="mb-3 text-base font-bold">
                    Text Length Variations
                </h3>
                <div className="flex gap-2 flex-wrap items-start">
                    <Tag text="A" size={TagSize.SM} />
                    <Tag text="Short" size={TagSize.SM} />
                    <Tag text="Medium length tag" size={TagSize.SM} />
                    <Tag
                        text="Very long tag that demonstrates text wrapping behavior and layout considerations"
                        size={TagSize.SM}
                        className="max-w-50"
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-base font-bold">
                    Special Characters and Unicode
                </h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag text="🎉 Celebration" leftSlot={<Star size={12} />} />
                    <Tag text="Café & Résumé" color={TagColor.PURPLE} />
                    <Tag text="数据分析" color={TagColor.PRIMARY} />
                    <Tag text="α/β Testing" color={TagColor.SUCCESS} />
                    <Tag text="<script/> Safe" color={TagColor.ERROR} />
                    <Tag text="100% Success" leftSlot={<Percent size={12} />} />
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-base font-bold">
                    High Contrast & Accessibility
                </h3>
                <div className="flex gap-2 flex-wrap">
                    <Tag
                        text="High Contrast"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.NEUTRAL}
                        size={TagSize.MD}
                    />
                    <Tag
                        text="Screen Reader"
                        variant={TagVariant.ATTENTIVE}
                        color={TagColor.ERROR}
                        size={TagSize.MD}
                        aria-label="Important error tag for screen readers"
                    />
                    <Tag
                        text="Focus Visible"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.PRIMARY}
                        size={TagSize.MD}
                        onClick={() => {}}
                        className="outline-2 outline-blue-500 outline-offset-2"
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-base font-bold">
                    Dense Layout Performance
                </h3>
                <div className="flex gap-1 flex-wrap max-w-150">
                    {Array.from({ length: 50 }, (_, i) => (
                        <Tag
                            key={i}
                            text={`Tag ${i + 1}`}
                            size={TagSize.XS}
                            color={
                                [
                                    TagColor.PRIMARY,
                                    TagColor.SUCCESS,
                                    TagColor.WARNING,
                                    TagColor.ERROR,
                                    TagColor.PURPLE,
                                    TagColor.NEUTRAL,
                                ][i % 6]
                            }
                            variant={
                                [
                                    TagVariant.SUBTLE,
                                    TagVariant.NO_FILL,
                                    TagVariant.ATTENTIVE,
                                ][i % 3]
                            }
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    50 tags to test performance and layout with dense content
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Edge cases including text length variations, special characters, accessibility features, and performance with many tags.',
            },
        },
    },
}

// Advanced Interactive Patterns
export const AdvancedInteractivePatterns: Story = {
    render: () => {
        const AdvancedInteractiveComponent = () => {
            const [selectedCategories, setSelectedCategories] = React.useState([
                'frontend',
            ])
            const [searchTags, setSearchTags] = React.useState([
                'react',
                'javascript',
            ])
            const [filterMode, setFilterMode] = React.useState<
                'inclusive' | 'exclusive'
            >('inclusive')

            const categories = [
                {
                    id: 'frontend',
                    label: 'Frontend',
                    color: TagColor.PRIMARY,
                    icon: <User size={12} />,
                },
                {
                    id: 'backend',
                    label: 'Backend',
                    color: TagColor.SUCCESS,
                    icon: <Server size={12} />,
                },
                {
                    id: 'database',
                    label: 'Database',
                    color: TagColor.WARNING,
                    icon: <Database size={12} />,
                },
                {
                    id: 'devops',
                    label: 'DevOps',
                    color: TagColor.ERROR,
                    icon: <Activity size={12} />,
                },
                {
                    id: 'mobile',
                    label: 'Mobile',
                    color: TagColor.PURPLE,
                    icon: <Smartphone size={12} />,
                },
            ]

            const availableTags = [
                'react',
                'vue',
                'angular',
                'javascript',
                'typescript',
                'python',
                'java',
                'docker',
                'kubernetes',
            ]

            const toggleCategory = (categoryId: string) => {
                setSelectedCategories((prev) =>
                    prev.includes(categoryId)
                        ? prev.filter((id) => id !== categoryId)
                        : [...prev, categoryId]
                )
            }

            const removeSearchTag = (tag: string) => {
                setSearchTags((prev) => prev.filter((t) => t !== tag))
            }

            const addSearchTag = (tag: string) => {
                if (!searchTags.includes(tag)) {
                    setSearchTags((prev) => [...prev, tag])
                }
            }

            return (
                <div className="flex flex-col gap-5 max-w-200">
                    {/* Category Selection */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold">
                            Select Categories (Multi-select)
                        </h4>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => (
                                <Tag
                                    key={category.id}
                                    text={category.label}
                                    color={category.color}
                                    variant={
                                        selectedCategories.includes(category.id)
                                            ? TagVariant.ATTENTIVE
                                            : TagVariant.NO_FILL
                                    }
                                    leftSlot={category.icon}
                                    rightSlot={
                                        selectedCategories.includes(
                                            category.id
                                        ) ? (
                                            <Check size={12} />
                                        ) : null
                                    }
                                    onClick={() => toggleCategory(category.id)}
                                    className={`cursor-pointer transition-all duration-200 ${selectedCategories.includes(category.id) ? 'scale-105' : 'scale-100'}`}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Selected:{' '}
                            {selectedCategories.length > 0
                                ? selectedCategories.join(', ')
                                : 'None'}
                        </p>
                    </div>

                    {/* Search Tags with Add/Remove */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold">
                            Search Tags (Removable)
                        </h4>
                        <div className="flex gap-2 flex-wrap mb-3">
                            {searchTags.map((tag) => (
                                <Tag
                                    key={tag}
                                    text={tag}
                                    color={TagColor.PRIMARY}
                                    variant={TagVariant.SUBTLE}
                                    leftSlot={<Hash size={12} />}
                                    rightSlot={<X size={12} />}
                                    onClick={() => removeSearchTag(tag)}
                                    className="cursor-pointer"
                                />
                            ))}
                            {searchTags.length === 0 && (
                                <span className="text-xs text-gray-500 italic">
                                    No search tags active
                                </span>
                            )}
                        </div>

                        <div>
                            <h5 className="mb-2 text-xs text-gray-500">
                                Add Tags:
                            </h5>
                            <div className="flex gap-1.5 flex-wrap">
                                {availableTags
                                    .filter((tag) => !searchTags.includes(tag))
                                    .map((tag) => (
                                        <Tag
                                            key={tag}
                                            text={tag}
                                            size={TagSize.XS}
                                            variant={TagVariant.NO_FILL}
                                            color={TagColor.NEUTRAL}
                                            rightSlot={<Plus size={10} />}
                                            onClick={() => addSearchTag(tag)}
                                            className="cursor-pointer"
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Filter Mode Toggle */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold">
                            Filter Mode
                        </h4>
                        <div className="flex gap-2">
                            <Tag
                                text="Inclusive (OR)"
                                color={TagColor.SUCCESS}
                                variant={
                                    filterMode === 'inclusive'
                                        ? TagVariant.ATTENTIVE
                                        : TagVariant.NO_FILL
                                }
                                leftSlot={<Check size={12} />}
                                onClick={() => setFilterMode('inclusive')}
                                className="cursor-pointer"
                            />
                            <Tag
                                text="Exclusive (AND)"
                                color={TagColor.ERROR}
                                variant={
                                    filterMode === 'exclusive'
                                        ? TagVariant.ATTENTIVE
                                        : TagVariant.NO_FILL
                                }
                                leftSlot={<X size={12} />}
                                onClick={() => setFilterMode('exclusive')}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h4 className="mb-2 text-sm font-semibold">
                            Current Filters Summary
                        </h4>
                        <div className="text-xs text-gray-500">
                            <div>
                                Categories:{' '}
                                {selectedCategories.length > 0
                                    ? selectedCategories.join(', ')
                                    : 'All'}
                            </div>
                            <div>
                                Tags:{' '}
                                {searchTags.length > 0
                                    ? searchTags.join(', ')
                                    : 'None'}
                            </div>
                            <div>
                                Mode:{' '}
                                {filterMode === 'inclusive'
                                    ? 'Show items matching ANY tag'
                                    : 'Show items matching ALL tags'}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return <AdvancedInteractiveComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Advanced interactive patterns including multi-select categories, removable search tags, and filter mode toggles.',
            },
        },
    },
}

// ============================================================================
// Skeleton Loading
// ============================================================================

/**
 * Tags with skeleton loading states
 */
export const SkeletonLoading: Story = {
    render: () => {
        const [loading, setLoading] = React.useState(true)
        const [variant, setVariant] = React.useState<
            'pulse' | 'wave' | 'shimmer'
        >('pulse')

        // Note: Tag component has TagWithSkeletonProps interface but implementation
        // may vary. This story demonstrates the intended skeleton loading pattern.
        return (
            <div className="flex flex-col gap-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="mb-3 text-base font-semibold">
                        Skeleton Loading Demo
                    </h3>
                    <p className="mb-4 text-slate-500 text-sm">
                        Toggle loading state to see skeleton placeholders.
                        Select different animation variants.
                    </p>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setLoading(!loading)}
                            className={`px-4 py-2 text-white border-none rounded-md cursor-pointer text-sm ${loading ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        >
                            {loading ? 'Load Content' : 'Show Skeleton'}
                        </button>
                        <select
                            value={variant}
                            onChange={(e) =>
                                setVariant(
                                    e.target.value as
                                        | 'pulse'
                                        | 'wave'
                                        | 'shimmer'
                                )
                            }
                            className="px-3 py-2 rounded-md border border-slate-200 text-sm"
                        >
                            <option value="pulse">Pulse</option>
                            <option value="wave">Wave</option>
                            <option value="shimmer">Shimmer</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex gap-2 flex-wrap">
                        {/* Skeleton placeholders for tags */}
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-7 bg-slate-200 rounded"
                                style={{
                                    width: `${80 + Math.random() * 60}px`,
                                    animation:
                                        variant === 'pulse'
                                            ? 'tag-pulse 1.5s ease-in-out infinite'
                                            : variant === 'wave'
                                              ? 'tag-wave 1.5s linear infinite'
                                              : 'tag-shimmer 2s linear infinite',
                                    backgroundImage:
                                        variant === 'shimmer'
                                            ? 'linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%)'
                                            : 'none',
                                    backgroundSize: '200% 100%',
                                }}
                            />
                        ))}
                        <style>{`
                            @keyframes tag-pulse {
                                0%, 100% { opacity: 1; }
                                50% { opacity: 0.5; }
                            }
                            @keyframes tag-wave {
                                0% { opacity: 0.6; }
                                50% { opacity: 1; }
                                100% { opacity: 0.6; }
                            }
                            @keyframes tag-shimmer {
                                0% { background-position: -200% 0; }
                                100% { background-position: 200% 0; }
                            }
                        `}</style>
                    </div>
                ) : (
                    <div className="flex gap-2 flex-wrap">
                        <Tag
                            text="React"
                            color={TagColor.PRIMARY}
                            variant={TagVariant.SUBTLE}
                            leftSlot={<Star size={12} />}
                        />
                        <Tag
                            text="TypeScript"
                            color={TagColor.SUCCESS}
                            variant={TagVariant.SUBTLE}
                            leftSlot={<Check size={12} />}
                        />
                        <Tag
                            text="JavaScript"
                            color={TagColor.WARNING}
                            variant={TagVariant.SUBTLE}
                            leftSlot={<Zap size={12} />}
                        />
                        <Tag
                            text="CSS"
                            color={TagColor.PURPLE}
                            variant={TagVariant.SUBTLE}
                            leftSlot={<Award size={12} />}
                        />
                        <Tag
                            text="HTML"
                            color={TagColor.NEUTRAL}
                            variant={TagVariant.NO_FILL}
                            leftSlot={<Bookmark size={12} />}
                        />
                        <Tag
                            text="Node.js"
                            color={TagColor.ERROR}
                            variant={TagVariant.ATTENTIVE}
                            leftSlot={<Server size={12} />}
                        />
                    </div>
                )}

                <div className="p-4 bg-sky-50 rounded-lg text-sm">
                    <strong>Features:</strong>
                    <ul className="mt-2 pl-5 text-slate-500">
                        <li>
                            <code>showSkeleton</code>: Displays loading
                            placeholders
                        </li>
                        <li>
                            <code>skeletonVariant</code>: Choose pulse, wave, or
                            shimmer animation
                        </li>
                        <li>Maintains tag structure during loading</li>
                        <li>Smooth transition when content loads</li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates skeleton loading states with different animation variants (pulse, wave, shimmer). Useful for showing loading feedback while tag content is being fetched.',
            },
        },
    },
}
