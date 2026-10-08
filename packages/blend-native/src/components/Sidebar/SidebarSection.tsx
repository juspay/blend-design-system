import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { ChevronDown } from 'lucide-react-native'
import Pressable from '../../primitives/Pressable'
import Text from '../../primitives/Text'
import { useSidebarContext } from './sidebar.context'
import { SIDEBAR_METRICS } from './sidebar.theme'
import SidebarItem from './SidebarItem'
import type { SidebarSectionData } from './sidebar.types'

export type SidebarSectionProps = {
    section: SidebarSectionData
    testID?: string
}

/**
 * One labelled, optionally-collapsible group of `SidebarItem` rows. Hidden
 * entirely (both label and items) while the rail is icon-only — a collapsed
 * rail shows a flat column of leaf icons, not grouped sections.
 */
export default function SidebarSection({
    section,
    testID,
}: SidebarSectionProps) {
    const { palette, iconOnlyMode, reduceMotion, expandProgress } =
        useSidebarContext('SidebarSection')

    const collapsible = section.isCollapsible ?? Boolean(section.label)
    const [open, setOpen] = useState(section.defaultOpen ?? true)
    const isOpen = !collapsible || open

    const [contentHeight, setContentHeight] = useState(0)
    const progress = useSharedValue(isOpen ? 1 : 0)
    useEffect(() => {
        if (reduceMotion) {
            progress.value = isOpen ? 1 : 0
            return
        }
        progress.value = withTiming(isOpen ? 1 : 0, {
            duration: SIDEBAR_METRICS.transitionDuration,
            easing: Easing.linear,
        })
    }, [progress, isOpen, reduceMotion])

    const panelStyle = useAnimatedStyle(
        () => ({ height: progress.value * contentHeight }),
        [contentHeight]
    )
    const chevronStyle = useAnimatedStyle(
        () => ({
            transform: [{ rotate: `${progress.value * 180}deg` }],
        }),
        []
    )
    // Same fix as `SidebarItem`'s `labelAreaStyle`: the header lives inside
    // the same width-animating rail, so gating it on the instant
    // `iconOnlyMode` boolean let it mount at full size before the rail
    // caught up. Growing its height in step with the rail's own progress
    // avoids that.
    const headerAreaStyle = useAnimatedStyle(
        () => ({
            height: expandProgress.value * SIDEBAR_METRICS.groupLabelHeight,
            opacity: expandProgress.value,
        }),
        []
    )

    const onContentLayout = (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        if (height > 0 && height !== contentHeight) {
            setContentHeight(height)
        }
    }

    // Absolute positioning is only meaningful inside the animated measuring
    // wrapper below. In icon-only mode `items` renders directly into the
    // section's flow instead — absolute-positioning it there would take it
    // out of layout entirely and collapse the section to 0 height.
    const measuring = collapsible && !iconOnlyMode
    const items = (
        <View
            onLayout={onContentLayout}
            style={[
                measuring
                    ? {
                          position: 'absolute' as const,
                          top: 0,
                          left: 0,
                          right: 0,
                      }
                    : undefined,
                { gap: 2 },
            ]}
        >
            {section.items.map((item, index) => (
                <SidebarItem key={item.id ?? `${index}`} item={item} />
            ))}
        </View>
    )

    return (
        <View style={{ gap: 4 }} testID={testID}>
            {section.label ? (
                <Animated.View
                    style={[styles.headerArea, headerAreaStyle]}
                    accessibilityElementsHidden={iconOnlyMode}
                    importantForAccessibility={
                        iconOnlyMode ? 'no-hide-descendants' : 'auto'
                    }
                >
                    {collapsible ? (
                        <Pressable
                            onPress={() => setOpen((current) => !current)}
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            minHeight={SIDEBAR_METRICS.groupLabelHeight}
                            paddingLeft={SIDEBAR_METRICS.groupLabelPaddingX}
                            paddingRight={SIDEBAR_METRICS.groupLabelPaddingX}
                            accessibilityRole="button"
                            accessibilityState={{ expanded: isOpen }}
                            accessibilityLabel={`${section.label}, ${isOpen ? 'expanded' : 'collapsed'}`}
                        >
                            <Text
                                fontSize={SIDEBAR_METRICS.groupLabelFontSize}
                                fontWeight={
                                    SIDEBAR_METRICS.groupLabelFontWeight
                                }
                                color={palette.mutedForeground}
                                style={styles.groupLabelText}
                            >
                                {section.label}
                            </Text>
                            <Animated.View style={chevronStyle}>
                                <ChevronDown
                                    size={14}
                                    color={palette.mutedForeground}
                                />
                            </Animated.View>
                        </Pressable>
                    ) : (
                        <Text
                            fontSize={SIDEBAR_METRICS.groupLabelFontSize}
                            fontWeight={SIDEBAR_METRICS.groupLabelFontWeight}
                            color={palette.mutedForeground}
                            style={[
                                styles.groupLabelText,
                                {
                                    minHeight: SIDEBAR_METRICS.groupLabelHeight,
                                    paddingLeft:
                                        SIDEBAR_METRICS.groupLabelPaddingX,
                                    paddingRight:
                                        SIDEBAR_METRICS.groupLabelPaddingX,
                                    textAlignVertical: 'center',
                                },
                            ]}
                        >
                            {section.label}
                        </Text>
                    )}
                </Animated.View>
            ) : null}
            {measuring ? (
                <Animated.View
                    style={[{ overflow: 'hidden' }, panelStyle]}
                    accessibilityElementsHidden={!isOpen}
                    importantForAccessibility={
                        isOpen ? 'auto' : 'no-hide-descendants'
                    }
                >
                    {items}
                </Animated.View>
            ) : (
                items
            )}
        </View>
    )
}

SidebarSection.displayName = 'SidebarSection'

const styles = StyleSheet.create({
    headerArea: {
        overflow: 'hidden',
    },
    groupLabelText: {
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
})
