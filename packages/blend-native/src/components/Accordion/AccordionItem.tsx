import { forwardRef, useEffect, useState } from 'react'
import { View } from 'react-native'
import type { View as RNView, LayoutChangeEvent } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { ChevronDown, ChevronRight } from 'lucide-react-native'
import { AccordionV2ChevronPosition } from '@juspay/blend-design-system/node'
import type { AccordionV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { MOTION_EASING } from '../../motion/motion'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import Text from '../../primitives/Text'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { useAccordionContext } from './accordion.context'
import type { AccordionItemNativeProps } from './accordion.types'

/** Web's accordion keyframes run 0.3s; the easing maps to `standard`. */
const EXPAND_DURATION = 300

/** Split web's `"20px 16px"` padding shorthand into y/x. */
function splitPadding(shorthand: unknown): { y: number; x: number } {
    const parts = String(shorthand ?? '').split(/\s+/)
    return {
        y: parseDimension(parts[0]) ?? 0,
        x: parseDimension(parts[1] ?? parts[0]) ?? 0,
    }
}

/**
 * One accordion section — trigger row plus a measured, height-animated
 * panel. The content stays mounted inside an overflow-hidden wrapper whose
 * height tweens between 0 and the measured content height (the Skeleton
 * measurement precedent — no Reanimated layout animations); collapsed
 * content is hidden from assistive tech. The chevron rotates from the same
 * progress.
 */
const AccordionItem = forwardRef<RNView, AccordionItemNativeProps>(
    function AccordionItem(
        {
            value,
            title,
            subtext,
            isDisabled = false,
            chevronPosition = AccordionV2ChevronPosition.RIGHT,
            leftSlot,
            rightSlot,
            subtextSlot,
            children,
            testID,
        },
        ref
    ) {
        const context = useAccordionContext('AccordionItem')
        const tokens = useNativeTokens<AccordionV2TokensType>('ACCORDIONV2')
        const reduceMotion = useReduceMotion()

        const expanded = context.expandedValues.includes(value)
        const type = context.accordionType
        const state = isDisabled ? 'disabled' : expanded ? 'open' : 'default'

        const [contentHeight, setContentHeight] = useState(0)
        const progress = useSharedValue(expanded ? 1 : 0)
        useEffect(() => {
            if (reduceMotion) {
                progress.value = expanded ? 1 : 0
                return
            }
            progress.value = withTiming(expanded ? 1 : 0, {
                duration: EXPAND_DURATION,
                easing: Easing.bezier(...MOTION_EASING.standard),
            })
        }, [progress, expanded, reduceMotion])

        const panelStyle = useAnimatedStyle(
            () => ({ height: progress.value * contentHeight }),
            [contentHeight]
        )
        const chevronStyle = useAnimatedStyle(
            () => ({
                transform: [
                    {
                        rotate: `${
                            progress.value *
                            (chevronPosition === AccordionV2ChevronPosition.LEFT
                                ? 90
                                : 180)
                        }deg`,
                    },
                ],
            }),
            [chevronPosition]
        )

        const pad = splitPadding(tokens.trigger.padding[type])
        const chevronSize =
            parseDimension(tokens.chevron.height as string | number) ?? 16
        const chevronColor = String(
            tokens.chevron.color[state] ?? tokens.chevron.color.default
        )
        const ChevronIcon =
            chevronPosition === AccordionV2ChevronPosition.LEFT
                ? ChevronRight
                : ChevronDown
        const chevron = (
            <Animated.View style={chevronStyle}>
                <ChevronIcon size={chevronSize} color={chevronColor} />
            </Animated.View>
        )

        const onContentLayout = (event: LayoutChangeEvent) => {
            const height = event.nativeEvent.layout.height
            if (height > 0 && height !== contentHeight) {
                setContentHeight(height)
            }
        }

        return (
            <View ref={ref} testID={testID} style={{ alignSelf: 'stretch' }}>
                <Pressable
                    onPress={() => context.toggle(value)}
                    disabled={isDisabled}
                    flexDirection="row"
                    alignItems="center"
                    gap={tokens.trigger.content.gap as string | number}
                    paddingTop={pad.y}
                    paddingBottom={pad.y}
                    paddingLeft={pad.x}
                    paddingRight={pad.x}
                    backgroundColor={String(
                        tokens.trigger.backgroundColor[type]?.[state] ??
                            'transparent'
                    )}
                    border={String(
                        tokens.trigger.border[type]?.[state] ?? 'none'
                    )}
                    borderRadius={tokens.borderRadius[type] as string | number}
                    accessibilityRole="button"
                    accessibilityState={{ expanded, disabled: isDisabled }}
                    accessibilityLabel={title}
                    testID={testID ? `${testID}-trigger` : undefined}
                >
                    {chevronPosition === AccordionV2ChevronPosition.LEFT &&
                        chevron}
                    {leftSlot && (
                        <Slot
                            hidden
                            maxHeight={
                                tokens.trigger.slot.height as string | number
                            }
                        >
                            {leftSlot}
                        </Slot>
                    )}
                    <View style={{ flexGrow: 1, flexShrink: 1 }}>
                        <Text
                            fontSize={
                                tokens.trigger.text.title.fontSize as
                                    | string
                                    | number
                            }
                            fontWeight={
                                tokens.trigger.text.title.fontWeight as
                                    | string
                                    | number
                            }
                            lineHeight={
                                tokens.trigger.text.title.lineHeight as
                                    | string
                                    | number
                            }
                            color={String(
                                tokens.trigger.text.title.color[state] ??
                                    tokens.trigger.text.title.color.default
                            )}
                        >
                            {title}
                        </Text>
                        {subtext ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap:
                                        parseDimension(
                                            tokens.trigger.text.subtext.gap as
                                                | string
                                                | number
                                        ) ?? 4,
                                }}
                            >
                                <Text
                                    fontSize={
                                        tokens.trigger.text.subtext.fontSize as
                                            | string
                                            | number
                                    }
                                    fontWeight={
                                        tokens.trigger.text.subtext
                                            .fontWeight as string | number
                                    }
                                    color={String(
                                        tokens.trigger.text.subtext.color[
                                            state
                                        ] ??
                                            tokens.trigger.text.subtext.color
                                                .default
                                    )}
                                    style={{ flexShrink: 1 }}
                                >
                                    {subtext}
                                </Text>
                                {subtextSlot && (
                                    <Slot hidden>{subtextSlot}</Slot>
                                )}
                            </View>
                        ) : null}
                    </View>
                    {rightSlot && (
                        <Slot
                            hidden
                            maxHeight={
                                tokens.trigger.slot.height as string | number
                            }
                        >
                            {rightSlot}
                        </Slot>
                    )}
                    {chevronPosition === AccordionV2ChevronPosition.RIGHT &&
                        chevron}
                </Pressable>
                <Animated.View
                    style={[{ overflow: 'hidden' }, panelStyle]}
                    accessibilityElementsHidden={!expanded}
                    importantForAccessibility={
                        expanded ? 'auto' : 'no-hide-descendants'
                    }
                    testID={testID ? `${testID}-panel` : undefined}
                >
                    <View
                        onLayout={onContentLayout}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                        }}
                    >
                        {children}
                    </View>
                </Animated.View>
            </View>
        )
    }
)

AccordionItem.displayName = 'AccordionItem'

export default AccordionItem
