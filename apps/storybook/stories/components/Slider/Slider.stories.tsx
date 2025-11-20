import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import {
    Slider,
    SliderVariant,
    SliderSize,
    SliderValueType,
} from '@juspay/blend-design-system'

const meta: Meta<typeof Slider> = {
    title: 'Components/Slider',
    component: Slider,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A flexible slider component built on Radix UI for selecting values from a range.

## Features
- Single and range selection
- Primary and secondary variants
- Three sizes (Small, Medium, Large)
- Horizontal and vertical orientations
- Optional value labels with custom formatting
- Keyboard accessible
- Token-based styling system
- Step control for precise value selection

## Usage

\`\`\`tsx
import { Slider, SliderVariant, SliderSize } from '@juspay/blend-design-system';

// Single value
<Slider
  defaultValue={[50]}
  variant={SliderVariant.PRIMARY}
  size={SliderSize.MEDIUM}
  min={0}
  max={100}
  step={1}
/>

// Range selection
<Slider
  defaultValue={[25, 75]}
  variant={SliderVariant.PRIMARY}
  size={SliderSize.MEDIUM}
  min={0}
  max={100}
/>
\`\`\`

## Accessibility
- Fully keyboard accessible (Arrow keys, Home, End, Page Up, Page Down)
- Proper ARIA attributes (role="slider", aria-valuenow, aria-valuemin, aria-valuemax)
- Focus indicators for keyboard navigation
- Screen reader announcements for value changes
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: Object.values(SliderVariant),
            description:
                'Visual style variant of the slider. PRIMARY for brand color, SECONDARY for neutral.',
            table: {
                type: { summary: 'SliderVariant' },
                defaultValue: { summary: 'PRIMARY' },
                category: 'Appearance',
            },
        },
        size: {
            control: 'select',
            options: Object.values(SliderSize),
            description:
                'Size of the slider affecting track height and thumb dimensions.',
            table: {
                type: { summary: 'SliderSize' },
                defaultValue: { summary: 'MEDIUM' },
                category: 'Appearance',
            },
        },
        min: {
            control: 'number',
            description: 'Minimum value of the slider.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Value',
            },
        },
        max: {
            control: 'number',
            description: 'Maximum value of the slider.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '100' },
                category: 'Value',
            },
        },
        step: {
            control: 'number',
            description: 'Step interval for value selection.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
                category: 'Value',
            },
        },
        defaultValue: {
            control: 'object',
            description:
                'Default value(s) of the slider. Single value: [50], Range: [25, 75].',
            table: {
                type: { summary: 'number[]' },
                category: 'Value',
            },
        },
        value: {
            control: 'object',
            description:
                'Controlled value(s) of the slider. Use with onValueChange for controlled component.',
            table: {
                type: { summary: 'number[]' },
                category: 'Value',
            },
        },
        onValueChange: {
            action: 'valueChanged',
            description: 'Callback fired when the slider value changes.',
            table: {
                type: { summary: '(value: number[]) => void' },
                category: 'Events',
            },
        },
        onValueCommit: {
            action: 'valueCommitted',
            description:
                'Callback fired when the user commits the value (releases thumb).',
            table: {
                type: { summary: '(value: number[]) => void' },
                category: 'Events',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the slider, preventing interaction.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Orientation of the slider.',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: 'horizontal' },
                category: 'Layout',
            },
        },
        showValueLabels: {
            control: 'boolean',
            description: 'Show value labels on the slider thumbs.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display',
            },
        },
        labelPosition: {
            control: 'select',
            options: ['top', 'bottom', 'inline'],
            description: 'Position of value labels relative to thumbs.',
            table: {
                type: { summary: "'top' | 'bottom' | 'inline'" },
                defaultValue: { summary: 'top' },
                category: 'Display',
            },
        },
        valueFormat: {
            control: 'object',
            description:
                'Configuration for formatting displayed values (type, prefix, suffix, etc.).',
            table: {
                type: { summary: 'SliderValueFormatConfig' },
                category: 'Display',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

// Default story
export const Default: Story = {
    args: {
        defaultValue: [50],
        variant: SliderVariant.PRIMARY,
        size: SliderSize.MEDIUM,
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
        showValueLabels: false,
    },
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'aria-required-attr', enabled: true },
                ],
            },
        },
    },
}

// Variants
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Primary
                </h4>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Secondary
                </h4>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.SECONDARY}
                    size={SliderSize.MEDIUM}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Two style variants: PRIMARY uses brand colors, SECONDARY uses neutral colors.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Small
                </h4>
                <Slider
                    defaultValue={[60]}
                    size={SliderSize.SMALL}
                    variant={SliderVariant.PRIMARY}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Medium
                </h4>
                <Slider
                    defaultValue={[60]}
                    size={SliderSize.MEDIUM}
                    variant={SliderVariant.PRIMARY}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Large
                </h4>
                <Slider
                    defaultValue={[60]}
                    size={SliderSize.LARGE}
                    variant={SliderVariant.PRIMARY}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Three size variants affecting track height and thumb dimensions.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Range Slider
export const RangeSlider: Story = {
    render: () => {
        const [value, setValue] = useState([25, 75])

        return (
            <div>
                <div
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Range: {value[0]} - {value[1]}
                </div>
                <Slider
                    value={value}
                    onValueChange={setValue}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    min={0}
                    max={100}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider with two thumbs for range selection. Pass an array with two values to enable range mode.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Value Labels
export const WithValueLabels: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Label Position: Top
                </h4>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    showValueLabels={true}
                    labelPosition="top"
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Label Position: Bottom
                </h4>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    showValueLabels={true}
                    labelPosition="bottom"
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Range with Labels
                </h4>
                <Slider
                    defaultValue={[30, 70]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    showValueLabels={true}
                    labelPosition="top"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Sliders with value labels showing current values. Labels can be positioned above, below, or inline with thumbs.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Formatted Values
export const FormattedValues: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Percentage
                </h4>
                <Slider
                    defaultValue={[65]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    showValueLabels={true}
                    valueFormat={{
                        type: SliderValueType.PERCENTAGE,
                    }}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Price Range
                </h4>
                <Slider
                    defaultValue={[250, 750]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    min={0}
                    max={1000}
                    showValueLabels={true}
                    valueFormat={{
                        type: SliderValueType.NUMBER,
                        prefix: '$',
                    }}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Temperature
                </h4>
                <Slider
                    defaultValue={[22]}
                    variant={SliderVariant.SECONDARY}
                    size={SliderSize.MEDIUM}
                    min={15}
                    max={30}
                    showValueLabels={true}
                    valueFormat={{
                        type: SliderValueType.NUMBER,
                        suffix: '°C',
                    }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Value labels can be formatted with custom prefixes, suffixes, and number formats for percentages, currency, temperature, etc.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Step Values
export const StepValues: Story = {
    render: () => {
        const [value1, setValue1] = useState([50])
        const [value2, setValue2] = useState([5])

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
            >
                <div>
                    <div
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span style={{ fontWeight: '600' }}>Step: 1</span>
                        <span style={{ color: '#666' }}>
                            Value: {value1[0]}
                        </span>
                    </div>
                    <Slider
                        value={value1}
                        onValueChange={setValue1}
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.MEDIUM}
                        min={0}
                        max={100}
                        step={1}
                    />
                </div>

                <div>
                    <div
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span style={{ fontWeight: '600' }}>Step: 10</span>
                        <span style={{ color: '#666' }}>
                            Value: {value2[0]}
                        </span>
                    </div>
                    <Slider
                        value={value2}
                        onValueChange={setValue2}
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.MEDIUM}
                        min={0}
                        max={10}
                        step={1}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Control the granularity of value selection with the step prop. Use step={10} for increments of 10, step={0.1} for decimals, etc.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Vertical Orientation
export const VerticalOrientation: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
            <div style={{ height: '200px' }}>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    orientation="vertical"
                />
            </div>

            <div style={{ height: '200px' }}>
                <Slider
                    defaultValue={[30, 70]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    orientation="vertical"
                />
            </div>

            <div style={{ height: '200px' }}>
                <Slider
                    defaultValue={[50]}
                    variant={SliderVariant.SECONDARY}
                    size={SliderSize.LARGE}
                    orientation="vertical"
                    showValueLabels={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Sliders can be oriented vertically for space-constrained layouts or specialized use cases like volume controls.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Disabled State
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Enabled
                </h4>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    disabled={false}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Disabled
                </h4>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    disabled={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Disabled sliders prevent interaction and are visually distinguished with reduced opacity.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Use Cases
export const UseCases: Story = {
    render: () => {
        const [volume, setVolume] = useState([70])
        const [priceRange, setPriceRange] = useState([200, 800])
        const [brightness, setBrightness] = useState([80])

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '48px',
                }}
            >
                <div>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Volume Control
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>🔊</span>
                        <Slider
                            value={volume}
                            onValueChange={setVolume}
                            variant={SliderVariant.PRIMARY}
                            size={SliderSize.MEDIUM}
                            min={0}
                            max={100}
                        />
                        <span
                            style={{
                                fontSize: '14px',
                                color: '#666',
                                minWidth: '40px',
                            }}
                        >
                            {volume[0]}%
                        </span>
                    </div>
                </div>

                <div>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Price Range Filter
                    </h4>
                    <div>
                        <div
                            style={{
                                marginBottom: '12px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            ${priceRange[0]} - ${priceRange[1]}
                        </div>
                        <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            variant={SliderVariant.PRIMARY}
                            size={SliderSize.MEDIUM}
                            min={0}
                            max={1000}
                            step={10}
                        />
                    </div>
                </div>

                <div>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Brightness Control
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>☀️</span>
                        <Slider
                            value={brightness}
                            onValueChange={setBrightness}
                            variant={SliderVariant.SECONDARY}
                            size={SliderSize.MEDIUM}
                            min={0}
                            max={100}
                        />
                        <span
                            style={{
                                fontSize: '14px',
                                color: '#666',
                                minWidth: '40px',
                            }}
                        >
                            {brightness[0]}%
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Common use cases: volume/brightness controls, price range filters, and other value selection scenarios.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Interactive Playground
export const Interactive: Story = {
    args: {
        defaultValue: [50],
        variant: SliderVariant.PRIMARY,
        size: SliderSize.MEDIUM,
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
        showValueLabels: true,
        labelPosition: 'top',
        orientation: 'horizontal',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Slider props using the controls panel.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    - <strong>Arrow Keys:</strong> Increment/decrement by step
                    <br />- <strong>Home/End:</strong> Jump to min/max values
                    <br />- <strong>Page Up/Down:</strong> Larger increments
                    <br />- <strong>Tab:</strong> Navigate between thumbs (range
                    slider)
                </p>
                <Slider
                    defaultValue={[50]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Attributes
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Sliders include proper ARIA attributes for screen readers:
                    role="slider", aria-valuenow, aria-valuemin, aria-valuemax,
                    and aria-orientation.
                </p>
                <Slider
                    defaultValue={[25, 75]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.MEDIUM}
                    showValueLabels={true}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Focus Indicators
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Clear focus indicators help keyboard users see which thumb
                    is currently active. Try tabbing to the slider and using
                    arrow keys.
                </p>
                <Slider
                    defaultValue={[60]}
                    variant={SliderVariant.PRIMARY}
                    size={SliderSize.LARGE}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features including full keyboard support, ARIA attributes, and visible focus indicators. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'aria-required-attr', enabled: true },
                    { id: 'focus-order-semantics', enabled: true },
                ],
            },
        },
    },
}
