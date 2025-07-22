import React from 'react'
import { figma } from '@figma/code-connect'
import { Avatar, AvatarSize, AvatarShape } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR AVATAR COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - shape → shape
 *    - size → size
 *    - online → online
 *
 * 2. SPECIAL MAPPINGS:
 *    - placeholder (Figma) → Handled by not passing src and using alt prop
 *      When placeholder=true in Figma, we don't pass src and use alt for initials
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - src: Image URL (handled based on placeholder prop)
 *    - alt: Alternative text (always provided for accessibility)
 *    - fallback: Custom fallback content (optional)
 *    - leadingSlot: Content before avatar (optional)
 *    - trailingSlot: Content after avatar (optional)
 *
 * Note: The Avatar component automatically generates initials from the alt text
 * when no src is provided, which corresponds to placeholder=true in Figma.
 */

figma.connect(
    Avatar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2519-2437&t=syQLBedyuJq8TAlu-11',
    {
        props: {
            // Direct enum mappings
            shape: figma.enum('shape', {
                circular: AvatarShape.CIRCULAR,
                rounded: AvatarShape.ROUNDED,
            }),

            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),

            // Boolean mapping
            online: figma.boolean('online'),

            // Placeholder mapping - when true, we don't pass src
            placeholder: figma.boolean('placeholder'),
        },

        example: ({ shape, size, online, placeholder }) => {
            // When placeholder is true, don't provide src so initials are shown
            // When placeholder is false, provide a sample image URL
            const avatarProps = {
                shape,
                size,
                online,
                alt: 'User Name', // Always provide alt text for accessibility
                ...(placeholder
                    ? {}
                    : { src: 'https://example.com/avatar.jpg' }),
            }

            return <Avatar {...avatarProps} />
        },

        imports: ["import { Avatar } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Avatar',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-avatar--docs',
            },
        ],
    }
)

// Variant for circular shape with placeholder
figma.connect(
    Avatar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2519-2437&t=syQLBedyuJq8TAlu-11',
    {
        variant: { shape: 'circular', placeholder: true },
        props: {
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),
            online: figma.boolean('online'),
        },
        example: ({ size, online }) => (
            <Avatar
                shape={AvatarShape.CIRCULAR}
                size={size}
                online={online}
                alt="John Doe" // This will generate "JD" as initials
            />
        ),
    }
)

// Variant for rounded shape with placeholder
figma.connect(
    Avatar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2519-2437&t=syQLBedyuJq8TAlu-11',
    {
        variant: { shape: 'rounded', placeholder: true },
        props: {
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),
            online: figma.boolean('online'),
        },
        example: ({ size, online }) => (
            <Avatar
                shape={AvatarShape.ROUNDED}
                size={size}
                online={online}
                alt="Jane Smith" // This will generate "JS" as initials
            />
        ),
    }
)

// Variant for circular shape with image
figma.connect(
    Avatar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2519-2437&t=syQLBedyuJq8TAlu-11',
    {
        variant: { shape: 'circular', placeholder: false },
        props: {
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),
            online: figma.boolean('online'),
        },
        example: ({ size, online }) => (
            <Avatar
                shape={AvatarShape.CIRCULAR}
                size={size}
                online={online}
                src="https://example.com/user-avatar.jpg"
                alt="User Profile"
            />
        ),
    }
)

// Variant for rounded shape with image
figma.connect(
    Avatar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2519-2437&t=syQLBedyuJq8TAlu-11',
    {
        variant: { shape: 'rounded', placeholder: false },
        props: {
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),
            online: figma.boolean('online'),
        },
        example: ({ size, online }) => (
            <Avatar
                shape={AvatarShape.ROUNDED}
                size={size}
                online={online}
                src="https://example.com/profile-photo.jpg"
                alt="Profile Photo"
            />
        ),
    }
)

/**
 * Example of Avatar with additional features not in Figma:
 *
 * // With custom fallback
 * <Avatar
 *   size={AvatarSize.LG}
 *   fallback={<Icon name="user" />}
 *   alt="User"
 * />
 *
 * // With slots
 * <Avatar
 *   src="/avatar.jpg"
 *   alt="User"
 *   leadingSlot={<Badge status="premium" />}
 *   trailingSlot={<Button size="xs" icon="edit" />}
 * />
 */
