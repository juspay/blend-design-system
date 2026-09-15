import { SearchInput } from 'blend-native'
import type { SearchInputNativeProps } from 'blend-native'
import { SEARCH_NODE } from './slots'
import type { ComponentSpec } from '../types'

const spec: ComponentSpec<SearchInputNativeProps> = {
    name: 'SearchInput',
    summary:
        'Bare bottom-bordered field with the search return key. The clear button appears once there is text and steps aside for a `rightSlot`; like web there is no size prop, no label and no footer.',
    mode: 'inline',
    defaults: {
        placeholder: 'Search transactions',
        allowClear: true,
        leftSlot: SEARCH_NODE,
    },
    controls: [
        {
            kind: 'text',
            key: 'placeholder',
            label: 'Placeholder',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'leftSlot',
            label: 'Search icon',
            group: 'Content',
            on: SEARCH_NODE,
            off: undefined,
            onCode: '<Search size={16} />',
        },
        {
            kind: 'toggle',
            key: 'allowClear',
            label: 'Allow clear',
            group: 'State',
        },
        { kind: 'toggle', key: 'error', label: 'Error', group: 'State' },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
    ],
    render: (props) => <SearchInput {...props} style={{ width: 280 }} />,
}

export default spec
