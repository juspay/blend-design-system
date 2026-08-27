import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import { TabsV2Size, TabsV2Variant } from '@juspay/blend-design-system/node'
import { useControllableState } from '../../hooks/useControllableState'
import { TabsContext, type TriggerLayout } from './tabs.context'
import type { TabsNativeProps } from './tabs.types'

/**
 * Tabs root — the native port of web's `TabsV2`.
 *
 * Provides selection + styling context to `TabsList`/`TabsTrigger`/
 * `TabsContent`. Controlled and uncontrolled (`value`/`defaultValue`/
 * `onValueChange`), like web's Radix root.
 */
const Tabs = forwardRef<RNView, TabsNativeProps>(function Tabs(
    {
        value: controlledValue,
        defaultValue,
        onValueChange,
        variant = TabsV2Variant.UNDERLINE,
        size = TabsV2Size.MD,
        expanded = false,
        fitContent = false,
        disabled = false,
        children,
        testID,
        style,
    },
    ref
) {
    const [value, setValue] = useControllableState<string | undefined>(
        controlledValue,
        defaultValue,
        onValueChange as (value: string | undefined) => void
    )

    const layouts = useRef(new Map<string, TriggerLayout>())
    const [layoutsVersion, setLayoutsVersion] = useState(0)
    const registerLayout = useCallback(
        (triggerValue: string, layout: TriggerLayout) => {
            const previous = layouts.current.get(triggerValue)
            if (
                previous &&
                previous.x === layout.x &&
                previous.width === layout.width
            ) {
                return
            }
            layouts.current.set(triggerValue, layout)
            setLayoutsVersion((v) => v + 1)
        },
        []
    )

    const context = useMemo(
        () => ({
            value,
            setValue: setValue as (value: string) => void,
            variant,
            size,
            disabled,
            expanded,
            layouts,
            layoutsVersion,
            registerLayout,
        }),
        [
            value,
            setValue,
            variant,
            size,
            disabled,
            expanded,
            layoutsVersion,
            registerLayout,
        ]
    )

    return (
        <TabsContext.Provider value={context}>
            <View
                ref={ref}
                testID={testID}
                style={[
                    { alignSelf: fitContent ? 'flex-start' : 'stretch' },
                    style,
                ]}
            >
                {children}
            </View>
        </TabsContext.Provider>
    )
})

Tabs.displayName = 'Tabs'

export default Tabs
