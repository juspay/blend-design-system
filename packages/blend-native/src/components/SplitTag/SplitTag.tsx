import { forwardRef } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import { TagV2Type } from '@juspay/blend-design-system/node'
import { Tag } from '../Tag'
import type { SplitTagNativeProps } from './splitTag.types'
import { getSplitTagLabel } from './splitTag.utils'

/**
 * SplitTag — the native port of web's `SplitTag`: two tags joined edge to
 * edge, a quiet `primaryTag` beside an emphasised `secondaryTag`.
 *
 * Built on `Tag`'s own `tagGroupPosition`, so the shared corners square off
 * exactly as they do in a stacked `TagGroup`. Web's `shape` is `subType` here.
 * No `alignSelf`: the row sizes to its tags and takes its parent's alignment.
 */
const SplitTag = forwardRef<RNView, SplitTagNativeProps>(function SplitTag(
    {
        primaryTag,
        secondaryTag,
        size,
        subType,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    return (
        <View
            ref={ref}
            testID={testID}
            accessibilityLabel={
                accessibilityLabel ??
                getSplitTagLabel(primaryTag.text, secondaryTag?.text)
            }
            style={[{ flexDirection: 'row' }, style]}
        >
            <Tag
                {...primaryTag}
                size={size}
                subType={subType}
                type={primaryTag.type ?? TagV2Type.NO_FILL}
                tagGroupPosition={secondaryTag ? 'left' : undefined}
                testID={testID ? `${testID}-primary` : primaryTag.testID}
            />
            {secondaryTag && (
                <Tag
                    {...secondaryTag}
                    size={size}
                    subType={subType}
                    type={secondaryTag.type ?? TagV2Type.ATTENTIVE}
                    tagGroupPosition="right"
                    testID={
                        testID ? `${testID}-secondary` : secondaryTag.testID
                    }
                />
            )}
        </View>
    )
})

SplitTag.displayName = 'SplitTag'

export default SplitTag
