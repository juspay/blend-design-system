import React from 'react'
import { figma } from '@figma/code-connect'
import {
    AvatarV2,
    AvatarV2Shape,
    AvatarV2Size,
    AvatarV2Status,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR AVATARV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - type (Figma) → shape (Code)
 *      NOTE: The Figma component's variant values are `circle` and `square`
 *      (verified against the live component). The V1 Code Connect file mapped
 *      `circular`/`rounded`, which no longer matches the published Figma
 *      component — `circle` maps to AvatarV2Shape.CIRCULAR and `square` maps
 *      to AvatarV2Shape.ROUNDED.
 *    - notificationDot (Figma) → status (Code)
 *      V1 exposed this as the boolean `online`; V2 replaces it with the
 *      `status` config object ({ type, position? }).
 *    - placeholder (Figma) → fallbackText (Code)
 *      V1 mapped this to `fallback`; V2 renames it to `fallbackText`.
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size
 *      Figma values `sm`/`regular`/`md`/`lg`/`xl` map 1:1 to AvatarV2Size
 *      members (V2 adds the `regular` size that V1 lacked).
 *
 * 3. SPECIAL MAPPINGS:
 *    - notificationDot (Figma, variant 'true'/'false') → status (Code, AvatarV2StatusConfig)
 *      - notificationDot=true  → { type: AvatarV2Status.ONLINE }
 *      - notificationDot=false → { type: AvatarV2Status.NONE }
 *      (V2 also supports OFFLINE/AWAY/BUSY, but Figma only toggles on/off.)
 *    - placeholder (Figma, variant 'true'/'false') → fallbackText (Code, string)
 *      The Figma component does not expose a text property for the placeholder
 *      content, so a sensible default ('AB') is provided; replace it with the
 *      actual fallback content in your implementation.
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - display: Platform target (always "web"), handled by the library.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - src: Image URL (not controlled by Figma).
 *    - alt: Alternative text — always provide for accessibility ('User Name'
 *      is used as a sensible default here).
 *    - leftSlot, rightSlot: ReactElement content slots flanking the avatar.
 *    - skeleton: { show, variant } skeleton loading state.
 *    - backgroundColor, disabled, width, height: layout/styling overrides.
 *    - onImageError, onImageLoad: image lifecycle callbacks.
 *    - status.position: Status indicator placement (defaults to TOP_RIGHT).
 *
 * Note: When no `src` is provided, AvatarV2 renders the fallback content
 * derived from `fallbackText` (or initials generated from `alt`).
 */

figma.connect(
    AvatarV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-212273&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Renamed mapping: type (Figma) → shape (Code)
            // Figma values are `circle`/`square` (not circular/rounded).
            shape: figma.enum('type', {
                circle: AvatarV2Shape.CIRCULAR,
                square: AvatarV2Shape.ROUNDED,
            }),

            // Direct mapping: size (Figma values sm/regular/md/lg/xl → V2 enum)
            size: figma.enum('size', {
                sm: AvatarV2Size.SM,
                regular: AvatarV2Size.REGULAR,
                md: AvatarV2Size.MD,
                lg: AvatarV2Size.LG,
                xl: AvatarV2Size.XL,
            }),

            // Renamed mapping: notificationDot (Figma) → status (Code)
            // V2 uses a status config object instead of the V1 `online` boolean.
            status: figma.enum('notificationDot', {
                true: { type: AvatarV2Status.ONLINE },
                false: { type: AvatarV2Status.NONE },
            }),

            // Renamed mapping: placeholder (Figma) → fallbackText (Code)
            // No exposed text property in Figma, so a sensible default is used.
            fallbackText: figma.enum('placeholder', {
                true: 'AB',
                false: undefined,
            }),
        },

        example: ({ shape, size, status, fallbackText }) => (
            <AvatarV2
                shape={shape}
                size={size}
                status={status}
                fallbackText={fallbackText}
                alt="User Name"
            />
        ),

        imports: [
            "import { AvatarV2, AvatarV2Shape, AvatarV2Size, AvatarV2Status } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/AvatarV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-avatarv2--docs',
            },
        ],
    }
)
