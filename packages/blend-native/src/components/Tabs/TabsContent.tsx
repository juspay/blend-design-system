import { forwardRef } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import { useTabsContext } from './tabs.context'
import type { TabsContentNativeProps } from './tabs.types'

/** The active tab's panel — renders nothing while its tab is inactive. */
const TabsContent = forwardRef<RNView, TabsContentNativeProps>(
    function TabsContent({ value, children, testID, style }, ref) {
        const context = useTabsContext('TabsContent')
        if (context.value !== value) return null
        return (
            <View ref={ref} testID={testID} style={style}>
                {children}
            </View>
        )
    }
)

TabsContent.displayName = 'TabsContent'

export default TabsContent
