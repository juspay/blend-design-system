import React from 'react'
import { figma } from '@figma/code-connect'
import {
    KeyValuePairV2,
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR KEYVALUEPAIRV2 COMPONENT
 *
 * One Figma component set maps to KeyValuePairV2:
 * - "Key Value" (18805:533612) — individual key-value pair
 *
 * The "Key Value Set" (18805:533588) is a demo arrangement of multiple
 * "Key Value" instances in different layouts (vertical/grid/horizontal).
 * It has no code equivalent — consumers compose multiple KeyValuePairV2
 * components themselves — so it is intentionally not mapped.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * RENAMED MAPPINGS:
 * - type (Figma: 'horizontal' | 'vertical') → keyValuePairState (Code:
 *   KeyValuePairV2StateType.horizontal | vertical)
 *   NOTE: Figma calls the layout direction "type"; code calls it
 *   "keyValuePairState". KeyValuePairV2StateType is a numeric enum
 *   (vertical=0, horizontal=1).
 *
 * DIRECT MAPPINGS:
 * - size (Figma) → size (Code)
 *   'sm' | 'md' | 'lg' → KeyValuePairV2Size.SM | MD | LG
 *
 * BOOLEAN-GATED INSTANCE SLOTS:
 * - hasKeySlot#6699:0 (BOOLEAN) gates keySlot#20156:10 (INSTANCE_SWAP)
 *   → slots.key (ReactNode)
 * - hasLeftSlot#6665:3 (BOOLEAN) gates leftSlot#6872:0 (INSTANCE_SWAP)
 *   → slots.value.left (ReactNode)
 * - hasRightSlot#6665:8 (BOOLEAN) gates rightSlot#6872:5 (INSTANCE_SWAP)
 *   → slots.value.right (ReactNode)
 *
 * BOOLEAN-GATED TEXT:
 * - hasValueText#7998:0 (BOOLEAN) → value (string 'Value' | undefined)
 *
 * UNMAPPED FIGMA PROPS:
 * - keyString and value text are hardcoded in the Figma design ("A very
 *   long Key", "Value") and NOT exposed as component properties.
 *   keyString="Key" is provided as a static default in the example.
 */

figma.connect(
    KeyValuePairV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-533612',
    {
        props: {
            // Direct mapping
            size: figma.enum('size', {
                sm: KeyValuePairV2Size.SM,
                md: KeyValuePairV2Size.MD,
                lg: KeyValuePairV2Size.LG,
            }),

            // Renamed: type (Figma) → keyValuePairState (Code)
            keyValuePairState: figma.enum('type', {
                horizontal: KeyValuePairV2StateType.horizontal,
                vertical: KeyValuePairV2StateType.vertical,
            }),

            // Boolean-gated instance slots
            // NOTE: Figma prop names have hash suffixes (e.g. hasKeySlot#6699:0)
            // but Code Connect references them without the hash.
            keySlot: figma.boolean('hasKeySlot', {
                true: figma.instance('keySlot'),
                false: undefined,
            }),

            leftSlot: figma.boolean('hasLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('hasRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),

            // Boolean-gated value text
            value: figma.boolean('hasValueText', {
                true: 'Value',
                false: undefined,
            }),
        },

        example: ({
            size,
            keyValuePairState,
            keySlot,
            leftSlot,
            rightSlot,
            value,
        }) => (
            <KeyValuePairV2
                keyString="Key"
                value={value}
                size={size}
                keyValuePairState={keyValuePairState}
                slots={{
                    key: keySlot,
                    value: {
                        left: leftSlot,
                        right: rightSlot,
                    },
                }}
            />
        ),

        imports: [
            "import { KeyValuePairV2, KeyValuePairV2Size, KeyValuePairV2StateType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/KeyValuePairV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-keyvaluepairv2--docs',
            },
        ],
    }
)
