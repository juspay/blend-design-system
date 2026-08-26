import { View } from 'react-native'
import { Bell, Check, Search, Star, X } from 'lucide-react-native'

/**
 * Slot payloads shared by the specs.
 *
 * Module-level constants on purpose: a toggle control decides whether it is
 * on by comparing the current prop against its `on` value with `Object.is`,
 * so the payload has to be the same object every render. Building these
 * inline in a spec would leave the toggle permanently off.
 *
 * The icons carry no `color` — `Slot` tints them from the component's own
 * tokens, which is the behaviour worth exercising here.
 */
export const STAR_SLOT = { slot: <Star size={14} /> }
export const CHECK_SLOT = { slot: <Check size={14} /> }
export const BELL_SLOT = { slot: <Bell size={16} /> }
export const SEARCH_SLOT = { slot: <Search size={16} /> }
export const X_SLOT = { slot: <X size={14} /> }

export const STAR_NODE = <Star size={16} />
export const BELL_NODE = <Bell size={16} />

/** Stand-in for card imagery, so `media` can be toggled without an asset. */
export const MEDIA_NODE = (
    <View
        style={{
            height: 96,
            borderRadius: 8,
            backgroundColor: '#B8C6E8',
        }}
    />
)
