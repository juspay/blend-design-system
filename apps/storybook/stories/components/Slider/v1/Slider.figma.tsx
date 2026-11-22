import React from 'react'
import { figma } from '@figma/code-connect'
import { Slider, SliderSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SLIDER COMPONENT (V1)
 *
 * The Slider page contains 40 individual component symbols (not a
 * component set). Each symbol encodes its variant state in the name:
 *   label=<bool>, leftValue=<n>, rightValue=<n>, size=<sm|md>
 *
 * PROP MAPPING:
 *   size (Figma sm/md) -> SliderSize.SMALL / SliderSize.MEDIUM
 *   leftValue, rightValue -> defaultValue={[leftValue, rightValue]}
 *   label (Figma bool) -> showValueLabels (code bool)
 *
 * CODE-ONLY PROPS (not in Figma):
 *   variant, valueFormat, labelPosition, min, max, step, disabled,
 *   orientation, onValueChange, value (controlled)
 */

// ---------------------------------------------------------------------------
// MEDIUM, label=false
// ---------------------------------------------------------------------------

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798504',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[0, 25]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798528',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[25, 50]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798552',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[0, 50]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798576',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[25, 75]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798600',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[0, 75]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798624',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[25, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798648',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[0, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798672',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[50, 75]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798696',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[75, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798720',
    {
        example: () => (
            <Slider size={SliderSize.MEDIUM} defaultValue={[50, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

// ---------------------------------------------------------------------------
// SMALL, label=false
// ---------------------------------------------------------------------------

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798510',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[0, 25]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798534',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[25, 50]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798558',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[0, 50]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798582',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[25, 75]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798606',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[0, 75]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798630',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[25, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798654',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[0, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798678',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[50, 75]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798702',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[75, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798726',
    {
        example: () => (
            <Slider size={SliderSize.SMALL} defaultValue={[50, 100]} />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

// ---------------------------------------------------------------------------
// MEDIUM, label=true (showValueLabels)
// ---------------------------------------------------------------------------

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798516',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[0, 25]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798540',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[25, 50]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798564',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[0, 50]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798588',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[25, 75]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798612',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[0, 75]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798636',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[25, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798660',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[0, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798684',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[50, 75]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798708',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[75, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798732',
    {
        example: () => (
            <Slider
                size={SliderSize.MEDIUM}
                defaultValue={[50, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

// ---------------------------------------------------------------------------
// SMALL, label=true (showValueLabels)
// ---------------------------------------------------------------------------

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798522',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[0, 25]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798546',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[25, 50]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798570',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[0, 50]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798594',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[25, 75]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798618',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[0, 75]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798642',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[25, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798666',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[0, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798690',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[50, 75]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798714',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[75, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798738',
    {
        example: () => (
            <Slider
                size={SliderSize.SMALL}
                defaultValue={[50, 100]}
                showValueLabels
            />
        ),
        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)
