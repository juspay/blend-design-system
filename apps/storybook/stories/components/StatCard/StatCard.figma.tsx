import React from 'react'
import { figma } from '@figma/code-connect'
import {
    StatCard,
    StatCardVariant,
    ChangeType,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR STATCARD COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - variant → variant
 *    - title → title
 *    - value → value
 *    - subtitle → subtitle
 *
 * 2. SPECIAL MAPPINGS:
 *    - delta (Figma) → change (Code) - needs to map to {value, type} object
 *    - slot1 (Figma) → titleIcon (Code)
 *    - hasVisualisation (Figma) → chartData presence (Code) - only for line variant
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction state, not needed in code
 *    - hasDate: Date visibility handled automatically
 *    - hasHelpIcon: Help icon visibility handled automatically
 *    - hasSlot1: Handled by slot1/titleIcon mapping
 *    - hasSlot2: Not used in code
 *    - slot2: Not mapped to code
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - chartData: Required for line variant when hasVisualisation is true
 *    - progressValue: Required for progress variant
 *    - actionIcon: Not in Figma
 *    - helpIconText: Not in Figma
 */

// Sample chart data for line variant
const sampleChartData = [
    { value: 10, label: 'Mon' },
    { value: 20, label: 'Tue' },
    { value: 15, label: 'Wed' },
    { value: 25, label: 'Thu' },
    { value: 30, label: 'Fri' },
]

figma.connect(
    StatCard,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4356-3366&t=jEHPJiKmUT0XJ9QL-4',
    {
        props: {
            // Direct enum mapping
            variant: figma.enum('variant', {
                line: StatCardVariant.LINE,
                progress: StatCardVariant.PROGRESS_BAR,
                bar: StatCardVariant.BAR,
                number: StatCardVariant.NUMBER,
            }),

            // Direct string/number mappings
            title: figma.string('title'),
            value: figma.string('value'),
            subtitle: figma.string('subtitle'),

            // Change mapping - hasDelta controls visibility
            change: figma.boolean('hasDelta', {
                true: { value: 10, type: ChangeType.INCREASE }, // Default change value when visible
                false: undefined,
            }),

            // Slot1 to titleIcon mapping - using correct property name with space
            titleIcon: figma.boolean('hasSlot1', {
                true: figma.instance('slot 1'), // Property name with space
                false: undefined,
            }),

            // Chart data based on variant and hasVisualisation
            chartData: figma.enum('variant', {
                line: figma.boolean('hasVisualisation', {
                    true: sampleChartData,
                    false: undefined,
                }),
                progress: undefined,
                bar: undefined,
                number: undefined,
            }),

            // Progress value for progress variant
            progressValue: figma.enum('variant', {
                line: undefined,
                progress: 75, // Default progress value
                bar: undefined,
                number: undefined,
            }),

            // Note: The following props are not mapped:
            // - actionIcon (not in Figma)
            // - helpIconText (not in Figma)
        },

        example: ({
            variant,
            title,
            value,
            change,
            subtitle,
            chartData,
            progressValue,
            titleIcon,
        }) => (
            <StatCard
                variant={variant}
                title={title}
                value={value}
                change={change}
                subtitle={subtitle}
                chartData={chartData}
                progressValue={progressValue}
                titleIcon={titleIcon}
            />
        ),

        imports: ["import { StatCard } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StatCard',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-statcard--docs',
            },
        ],
    }
)
