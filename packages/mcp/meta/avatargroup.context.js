const avatargroupMeta = {
    componentName: 'AvatarGroup',
    componentDescription:
        'A component for displaying multiple avatars in a compact, overlapping layout.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic AvatarGroup',
            description: 'Simple avatargroup usage',
            code: '<AvatarGroup />',
        },
    ],
    props: [
        {
            propName: 'avatars',
            propType: 'AvatarData[]',
            typeDefinition: `AvatarData[]`,
            propDescription: 'avatars prop for AvatarGroup',
            llmContext:
                'avatars prop for AvatarGroup - general property for AvatarGroup',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'maxCount',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'maxCount prop for AvatarGroup',
            llmContext:
                'maxCount prop for AvatarGroup - general property for AvatarGroup',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'size',
            propType: 'AvatarSize',
            typeDefinition: `AvatarSize`,
            propDescription: 'size prop for AvatarGroup',
            llmContext:
                'size prop for AvatarGroup - appearance property for AvatarGroup',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'shape',
            propType: 'AvatarShape',
            typeDefinition: `AvatarShape`,
            propDescription: 'shape prop for AvatarGroup',
            llmContext:
                'shape prop for AvatarGroup - general property for AvatarGroup',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'selectedAvatarIds',
            propType: '(string | number)[]',
            typeDefinition: `(string | number)[]`,
            propDescription: 'selectedAvatarIds prop for AvatarGroup',
            llmContext:
                'selectedAvatarIds prop for AvatarGroup - general property for AvatarGroup',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'onSelectionChange',
            propType: '(selectedIds: (string | number)[]) => void',
            typeDefinition: `(selectedIds: (string | number)[]) => void`,
            propDescription: 'onSelectionChange prop for AvatarGroup',
            llmContext:
                'onSelectionChange prop for AvatarGroup - events property for AvatarGroup',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default avatargroupMeta
