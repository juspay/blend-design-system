import { forwardRef } from 'react'
import type { ReactElement } from 'react'
import type { View as RNView, StyleProp, ViewStyle } from 'react-native'
import GroupView from '../shared/GroupView'
import type { TagNativeProps } from './tag.types'

/**
 * Container for a row of Tags — the native port of web's `TagGroupV2`.
 *
 * `stacked` joins members edge to edge and injects each child's
 * `tagGroupPosition`; the Tag collapses its own radius from that prop.
 * Like web, only corners collapse for tags — Tag has no border-collapsing
 * path (web ships no `getTagBorderStyles`), so stacked bordered tags keep
 * their shared edges. Non-stacked renders a spaced row and injects nothing.
 */
export type TagGroupNativeProps = {
    /** Join members edge to edge, collapsing shared corners. */
    stacked?: boolean
    /** Space between members when not stacked. Defaults to the web gap. */
    gap?: number | string
    children: ReactElement<TagNativeProps> | ReactElement<TagNativeProps>[]
    /** Container label; the members stay individually reachable. */
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}

const TagGroup = forwardRef<RNView, TagGroupNativeProps>(function TagGroup(
    { accessibilityLabel = 'Tag group', ...rest },
    ref
) {
    return (
        <GroupView
            {...rest}
            ref={ref}
            positionProp="tagGroupPosition"
            accessibilityLabel={accessibilityLabel}
        />
    )
})

TagGroup.displayName = 'TagGroup'

export default TagGroup
