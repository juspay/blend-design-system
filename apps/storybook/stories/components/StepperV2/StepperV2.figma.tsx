import React from 'react'
import { figma } from '@figma/code-connect'
import {
    StepperV2,
    StepperV2Type,
    StepperV2StepStatus,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR STEPPERV2 COMPONENT
 *
 * Six Figma component sets map to StepperV2 (data-driven API):
 *
 * 1. "stepper" (20382:12234) — full stepper container (22 variants)
 * 2. "stepper-number" (20382:12618) — vertical step with number indicator (8 variants)
 * 3. "stepper-icon" (20382:12667) — vertical step with icon indicator (8 variants)
 * 4. "number" (20503:10168) — horizontal step with number (8 variants)
 * 5. "icon" (20503:10173) — horizontal step with icon (8 variants)
 * 6. "substep" (20435:8680) — substep within a vertical step (8 variants)
 *
 * Set 7 "substep" (20435:9196) is a purely decorative number indicator
 * (Default, 1-8) with no meaningful code props — intentionally not mapped.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * STATUS MAPPING (Figma → Code):
 * - Figma 'active' → StepperV2StepStatus.CURRENT
 * - Figma 'done'   → StepperV2StepStatus.COMPLETED
 * - Figma 'default'→ StepperV2StepStatus.PENDING
 * - Figma 'disable'→ StepperV2StepStatus.DISABLED
 *
 * RENAMED MAPPINGS:
 * - type (Figma: vertical | horizontal) → stepperType (Code: StepperV2Type)
 * - number (Figma: 1-8 on container) → steps (Code: sample array with N steps)
 * - number/icon (Figma: status on horizontal steps) → stepStatus (Code: StepperV2StepStatus)
 * - status (Figma: on vertical steps/substeps) → stepStatus/substepStatus
 *
 * UNMAPPED FIGMA PROPS (no code equivalent):
 * - subtype (number | icon) — determined by whether step.icon is set in code
 * - state (default | hover) — CSS interaction state, not a data prop
 * - hasSlot / slot — no general slot prop on StepperV2Step
 * - hasInfo / HasInfo — no info tooltip prop
 * - screen (only 'web') — platform flag
 */

// ─── 1. Stepper Container ──────────────────────────────────────────

figma.connect(
    StepperV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20382-12234',
    {
        props: {
            // Direct mapping: type → stepperType
            stepperType: figma.enum('type', {
                vertical: StepperV2Type.VERTICAL,
                horizontal: StepperV2Type.HORIZONTAL,
            }),

            // Value mapping: number (1-8) → sample steps array
            // First steps completed, one current, rest pending
            steps: figma.enum('number', {
                '1': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.CURRENT,
                    },
                ],
                '2': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.CURRENT,
                    },
                ],
                '3': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.CURRENT,
                    },
                    {
                        id: 3,
                        title: 'Step 3',
                        status: StepperV2StepStatus.PENDING,
                    },
                ],
                '4': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 3,
                        title: 'Step 3',
                        status: StepperV2StepStatus.CURRENT,
                    },
                    {
                        id: 4,
                        title: 'Step 4',
                        status: StepperV2StepStatus.PENDING,
                    },
                ],
                '5': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 3,
                        title: 'Step 3',
                        status: StepperV2StepStatus.CURRENT,
                    },
                    {
                        id: 4,
                        title: 'Step 4',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 5,
                        title: 'Step 5',
                        status: StepperV2StepStatus.PENDING,
                    },
                ],
                '6': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 3,
                        title: 'Step 3',
                        status: StepperV2StepStatus.CURRENT,
                    },
                    {
                        id: 4,
                        title: 'Step 4',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 5,
                        title: 'Step 5',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 6,
                        title: 'Step 6',
                        status: StepperV2StepStatus.PENDING,
                    },
                ],
                '7': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 3,
                        title: 'Step 3',
                        status: StepperV2StepStatus.CURRENT,
                    },
                    {
                        id: 4,
                        title: 'Step 4',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 5,
                        title: 'Step 5',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 6,
                        title: 'Step 6',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 7,
                        title: 'Step 7',
                        status: StepperV2StepStatus.PENDING,
                    },
                ],
                '8': [
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 2,
                        title: 'Step 2',
                        status: StepperV2StepStatus.COMPLETED,
                    },
                    {
                        id: 3,
                        title: 'Step 3',
                        status: StepperV2StepStatus.CURRENT,
                    },
                    {
                        id: 4,
                        title: 'Step 4',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 5,
                        title: 'Step 5',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 6,
                        title: 'Step 6',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 7,
                        title: 'Step 7',
                        status: StepperV2StepStatus.PENDING,
                    },
                    {
                        id: 8,
                        title: 'Step 8',
                        status: StepperV2StepStatus.PENDING,
                    },
                ],
            }),
        },

        example: ({ stepperType, steps }) => (
            <StepperV2 stepperType={stepperType} steps={steps} />
        ),

        imports: [
            "import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StepperV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-stepperv2--docs',
            },
        ],
    }
)

// ─── 2. Vertical Step with Number Indicator ────────────────────────

figma.connect(
    StepperV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20382-12618',
    {
        props: {
            // Direct text mapping (hash-suffixed: Title#20923:0)
            title: figma.string('Title'),

            // Boolean-gated text (hasDescription#20483:35 gates description#20923:9)
            description: figma.boolean('hasDescription', {
                true: figma.string('description'),
                false: undefined,
            }),

            // Direct boolean mapping (hasChevron#20451:15)
            isExpandable: figma.boolean('hasChevron'),

            // Boolean-gated substeps (hasSubstep#19902:5)
            substeps: figma.boolean('hasSubstep', {
                true: [
                    {
                        id: 1,
                        title: 'Substep 1',
                        status: StepperV2StepStatus.CURRENT,
                    },
                ],
                false: undefined,
            }),

            // Status mapping (Figma status → Code StepperV2StepStatus)
            stepStatus: figma.enum('status', {
                active: StepperV2StepStatus.CURRENT,
                done: StepperV2StepStatus.COMPLETED,
                default: StepperV2StepStatus.PENDING,
                disable: StepperV2StepStatus.DISABLED,
            }),
        },

        example: ({
            title,
            description,
            isExpandable,
            substeps,
            stepStatus,
        }) => (
            <StepperV2
                stepperType={StepperV2Type.VERTICAL}
                steps={[
                    {
                        id: 1,
                        title: title,
                        description: description,
                        isExpandable: isExpandable,
                        substeps: substeps,
                        status: stepStatus,
                    },
                ]}
            />
        ),

        imports: [
            "import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StepperV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-stepperv2--docs',
            },
        ],
    }
)

// ─── 3. Vertical Step with Icon Indicator ──────────────────────────

figma.connect(
    StepperV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20382-12667',
    {
        props: {
            // Direct text mapping (hash-suffixed: Title#20923:18)
            title: figma.string('Title'),

            // Boolean-gated text (hasDescription#20483:40 gates description#20923:27)
            description: figma.boolean('hasDescription', {
                true: figma.string('description'),
                false: undefined,
            }),

            // Direct boolean mapping (hasChevron#20451:20)
            isExpandable: figma.boolean('hasChevron'),

            // Boolean-gated substeps (hasSubstep#19902:10)
            substeps: figma.boolean('hasSubstep', {
                true: [
                    {
                        id: 1,
                        title: 'Substep 1',
                        status: StepperV2StepStatus.CURRENT,
                    },
                ],
                false: undefined,
            }),

            // Instance swap → icon (slot1#20751:40, not gated by boolean)
            icon: figma.instance('slot1'),

            // Status mapping
            stepStatus: figma.enum('status', {
                active: StepperV2StepStatus.CURRENT,
                done: StepperV2StepStatus.COMPLETED,
                default: StepperV2StepStatus.PENDING,
                disable: StepperV2StepStatus.DISABLED,
            }),
        },

        example: ({
            title,
            description,
            isExpandable,
            substeps,
            icon,
            stepStatus,
        }) => (
            <StepperV2
                stepperType={StepperV2Type.VERTICAL}
                steps={[
                    {
                        id: 1,
                        title: title,
                        description: description,
                        isExpandable: isExpandable,
                        substeps: substeps,
                        icon: icon,
                        status: stepStatus,
                    },
                ]}
            />
        ),

        imports: [
            "import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StepperV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-stepperv2--docs',
            },
        ],
    }
)

// ─── 4. Horizontal Step with Number ────────────────────────────────

figma.connect(
    StepperV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20503-10168',
    {
        props: {
            // Direct text mapping (hash-suffixed: title#20923:45)
            title: figma.string('title'),

            // Status mapping — Figma prop is called 'number' but values are statuses
            stepStatus: figma.enum('number', {
                active: StepperV2StepStatus.CURRENT,
                done: StepperV2StepStatus.COMPLETED,
                default: StepperV2StepStatus.PENDING,
                disable: StepperV2StepStatus.DISABLED,
            }),
        },

        example: ({ title, stepStatus }) => (
            <StepperV2
                stepperType={StepperV2Type.HORIZONTAL}
                steps={[
                    {
                        id: 1,
                        title: title,
                        status: stepStatus,
                    },
                ]}
            />
        ),

        imports: [
            "import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StepperV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-stepperv2--docs',
            },
        ],
    }
)

// ─── 5. Horizontal Step with Icon ──────────────────────────────────

figma.connect(
    StepperV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20503-10173',
    {
        props: {
            // Direct text mapping (hash-suffixed: title#20923:54)
            title: figma.string('title'),

            // Status mapping — Figma prop is called 'icon' but values are statuses
            stepStatus: figma.enum('icon', {
                active: StepperV2StepStatus.CURRENT,
                done: StepperV2StepStatus.COMPLETED,
                default: StepperV2StepStatus.PENDING,
                disable: StepperV2StepStatus.DISABLED,
            }),
        },

        example: ({ title, stepStatus }) => (
            <StepperV2
                stepperType={StepperV2Type.HORIZONTAL}
                steps={[
                    {
                        id: 1,
                        title: title,
                        status: stepStatus,
                    },
                ]}
            />
        ),

        imports: [
            "import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StepperV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-stepperv2--docs',
            },
        ],
    }
)

// ─── 6. Substep ────────────────────────────────────────────────────

figma.connect(
    StepperV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=20435-8680',
    {
        props: {
            // Direct text mapping (hash-suffixed: subtextTitle#20923:36)
            substepTitle: figma.string('subtextTitle'),

            // Status mapping
            substepStatus: figma.enum('status', {
                active: StepperV2StepStatus.CURRENT,
                done: StepperV2StepStatus.COMPLETED,
                default: StepperV2StepStatus.PENDING,
                disable: StepperV2StepStatus.DISABLED,
            }),
        },

        example: ({ substepTitle, substepStatus }) => (
            <StepperV2
                stepperType={StepperV2Type.VERTICAL}
                steps={[
                    {
                        id: 1,
                        title: 'Step 1',
                        status: StepperV2StepStatus.CURRENT,
                        substeps: [
                            {
                                id: 1,
                                title: substepTitle,
                                status: substepStatus,
                            },
                        ],
                    },
                ]}
            />
        ),

        imports: [
            "import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StepperV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-stepperv2--docs',
            },
        ],
    }
)
