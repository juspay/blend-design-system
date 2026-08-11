import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Slider,
    SliderSize,
    SliderVariant,
    ThemeProvider,
    Theme,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Slider> = {
    title: 'Components/Slider',
    component: Slider,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A range input that lets users pick a single value or a range between a min and max by dragging one or more thumbs along a track.',
    },
}

export default meta
type Story = StoryObj<typeof Slider>

// ---------------------------------------------------------------------------
// Light: all variants × sizes

export const VariantsAndSizes: Story = {
    render: () => {
        const Col = ({
            title,
            children,
        }: {
            title: string
            children: React.ReactNode
        }) => (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    maxWidth: 320,
                    padding: 16,
                }}
            >
                <h3 style={{ margin: 0, fontSize: 13 }}>{title}</h3>
                {children}
            </div>
        )

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: 24,
                }}
            >
                <Col title="Primary · Small">
                    <Slider
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.SMALL}
                        defaultValue={[40]}
                        showValueLabels
                    />
                </Col>
                <Col title="Primary · Medium">
                    <Slider
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.MEDIUM}
                        defaultValue={[40]}
                        showValueLabels
                    />
                </Col>
                <Col title="Primary · Large">
                    <Slider
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.LARGE}
                        defaultValue={[40]}
                        showValueLabels
                    />
                </Col>
                <Col title="Secondary · Small">
                    <Slider
                        variant={SliderVariant.SECONDARY}
                        size={SliderSize.SMALL}
                        defaultValue={[40]}
                        showValueLabels
                    />
                </Col>
                <Col title="Secondary · Medium">
                    <Slider
                        variant={SliderVariant.SECONDARY}
                        size={SliderSize.MEDIUM}
                        defaultValue={[40]}
                        showValueLabels
                    />
                </Col>
                <Col title="Secondary · Large">
                    <Slider
                        variant={SliderVariant.SECONDARY}
                        size={SliderSize.LARGE}
                        defaultValue={[40]}
                        showValueLabels
                    />
                </Col>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'All Slider variants and sizes in the default light theme.',
            },
        },
        chromatic: CHROMATIC_CONFIG,
    },
}

// ---------------------------------------------------------------------------
// Dark: all variants × sizes

export const DarkThemeVariantsAndSizes: Story = {
    ...VariantsAndSizes,
    name: 'Dark: Variants & Sizes',
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.DARK}>
                <div
                    style={{
                        background: '#0f172a',
                        padding: 24,
                    }}
                >
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        ...VariantsAndSizes.parameters,
        docs: {
            description: {
                story: 'Same grid as the light variant snapshot, rendered under `ThemeProvider theme={Theme.DARK}`.',
            },
        },
        chromatic: CHROMATIC_CONFIG,
    },
}
