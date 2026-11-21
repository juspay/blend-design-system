/**
 * Strings for the small display components: Avatar, AvatarV2, AvatarGroup,
 * Badge, Card, KeyValuePair(V2), Slider, TagV2, SplitTag, Timeline and the
 * group wrappers (ButtonGroupV2, TagGroupV2, SingleSelectGroup,
 * MultiSelectGroup).
 *
 * Status, pressed and selected suffixes are whole sentences with the name
 * as a placeholder rather than `name + ', online'`: the separator and the
 * word order are not portable. `{name}`, `{text}`, `{key}`, `{value}` and
 * `{label}` are the consumer's own text.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const DISPLAY_MESSAGES = {
    'avatar.label.fallback': 'Avatar',
    'avatar.a11y.status-online': '{name}, online',
    'avatar.a11y.status-offline': '{name}, offline',
    'avatar.a11y.status-away': '{name}, away',
    'avatar.a11y.status-busy': '{name}, busy',

    'avatar-group.label.fallback-name': 'Avatar {id}',
    'avatar-group.a11y.group.one': 'Group of {count} avatar',
    'avatar-group.a11y.group.other': 'Group of {count} avatars',
    'avatar-group.a11y.group-selected.one':
        'Group of {count} avatar, {selected} selected',
    'avatar-group.a11y.group-selected.other':
        'Group of {count} avatars, {selected} selected',
    'avatar-group.a11y.selected': '{name}, selected',
    'avatar-group.a11y.position': 'Avatar {number} of {total}',
    'avatar-group.a11y.position-more':
        'Avatar {number} of {total}, {more} more available',
    'avatar-group.a11y.loading-more': 'Loading more avatars',
    'avatar-group.a11y.overflow.one':
        '{count} more avatar, click to view and select',
    'avatar-group.a11y.overflow.other':
        '{count} more avatars, click to view and select',
    'avatar-group.placeholder.search': 'Search avatars...',

    'badge.a11y.more-than': 'More than {max}',
    'badge.a11y.notification': 'Notification',

    'card.a11y.visual-content': 'Card visual content',
    'card.a11y.custom-content': 'Custom card content',

    'key-value-pair.a11y.label': '{key}: {value}',

    'slider.a11y.thumb-labelled': '{label}, value {number}: {value}',
    'slider.a11y.thumb': 'Slider value {number}: {value}',
    'slider.a11y.single': 'Slider, current value: {value}',

    'tag.a11y.pressed': '{text}, pressed',
    'tag.a11y.mixed': '{text}, mixed state',
    'tag.a11y.split': '{primary}: {secondary}',
    'tag.a11y.split-unnamed': 'Split tag',

    'timeline.action.show-more': 'Show more ({count}+)',

    'group.a11y.button-group': 'Button group',
    'group.a11y.tag-group': 'Tag group',
    'group.a11y.single-select-group': 'SingleSelect group',
    'group.a11y.multi-select-group': 'MultiSelect group',
} as const
