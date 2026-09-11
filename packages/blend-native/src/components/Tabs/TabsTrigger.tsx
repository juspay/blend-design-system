import { forwardRef } from 'react'
import type { View as RNView, LayoutChangeEvent } from 'react-native'
import type { TabsV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import Text from '../../primitives/Text'
import { useTabsContext } from './tabs.context'
import type { TabsTriggerNativeProps } from './tabs.types'

/**
 * One tab. Reports its layout into the Tabs context so the list's
 * indicator can follow it; the trigger surface itself stays transparent —
 * the active background/underline is the list's animated indicator.
 */
const TabsTrigger = forwardRef<RNView, TabsTriggerNativeProps>(
    function TabsTrigger(
        { value, children, leftSlot, rightSlot, disabled = false, testID },
        ref
    ) {
        const context = useTabsContext('TabsTrigger')
        const tokens = useNativeTokens<TabsV2TokensType>('TABSV2')
        const trigger = tokens.tabList.trigger

        const { variant, size } = context
        const selected = context.value === value
        const isDisabled = disabled || context.disabled
        const textState = isDisabled
            ? 'disabled'
            : selected
              ? 'active'
              : 'default'
        const pad = trigger.padding[size]?.[variant]
        const textColor = String(
            trigger.text.color[variant]?.[textState] ?? '#000000'
        )

        const onLayout = (event: LayoutChangeEvent) => {
            const { x, width, height } = event.nativeEvent.layout
            context.registerLayout(value, { x, width, height })
        }

        return (
            <Pressable
                ref={ref}
                onPress={() => context.setValue(value)}
                disabled={isDisabled}
                onLayout={onLayout}
                minTouchTarget={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={trigger.gap as string | number}
                paddingTop={pad?.top as string | number}
                paddingRight={pad?.right as string | number}
                paddingBottom={pad?.bottom as string | number}
                paddingLeft={pad?.left as string | number}
                flexGrow={context.expanded ? 1 : undefined}
                accessibilityRole="tab"
                accessibilityState={{ selected, disabled: isDisabled }}
                accessibilityLabel={String(children)}
                testID={testID}
            >
                {leftSlot && (
                    <Slot
                        hidden
                        color={textColor}
                        maxHeight={trigger.icon.maxWidth as string | number}
                    >
                        {leftSlot}
                    </Slot>
                )}
                <Text
                    fontSize={trigger.text.fontSize[size] as string | number}
                    fontWeight={
                        trigger.text.fontWeight[size] as string | number
                    }
                    color={textColor}
                >
                    {String(children)}
                </Text>
                {rightSlot && (
                    <Slot
                        hidden
                        color={textColor}
                        maxHeight={trigger.icon.maxWidth as string | number}
                    >
                        {rightSlot}
                    </Slot>
                )}
            </Pressable>
        )
    }
)

TabsTrigger.displayName = 'TabsTrigger'

export default TabsTrigger
