import { Pressable, View } from 'react-native'
import {
    TooltipV2Align,
    TooltipV2Side,
    TooltipV2Size,
    TooltipV2SlotDirection,
} from '@juspay/blend-design-system/node'
import type { TooltipV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useControllableState } from '../../hooks/useControllableState'
import { useLiveRegionAnnounce } from '../../a11y/useLiveRegion'
import { AnchoredOverlay } from '../../overlay/anchored/AnchoredOverlay'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import type { TooltipNativeProps } from './tooltip.types'

/**
 * Tooltip — the native port of web's `TooltipV2`.
 *
 * Anchored at every size (web parity — TooltipV2 has no mobile branch).
 * Long-press shows it; a tap anywhere (the transparent backdrop) or the
 * Android back button dismisses. String content doubles as the trigger's
 * `accessibilityHint` and is announced when shown.
 */

/** `"4px 6px"` → vertical/horizontal points. */
function splitPadding(shorthand: unknown): { y: number; x: number } {
    const parts = String(shorthand ?? '')
        .trim()
        .split(/\s+/)
        .map((part) => parseDimension(part) ?? 0)
    const y = parts[0] ?? 0
    return { y, x: parts[1] ?? y }
}

const ARROW_SIZE = 6

export function Tooltip({
    children,
    content,
    slot,
    open,
    onOpenChange,
    side = TooltipV2Side.TOP,
    align = TooltipV2Align.CENTER,
    showArrow = true,
    size = TooltipV2Size.SM,
    slotDirection = TooltipV2SlotDirection.LEFT,
    delayDuration = 300,
    offset = 5,
    fullWidth = false,
    maxWidth,
    testID,
    style,
}: TooltipNativeProps) {
    const tokens = useNativeTokens<TooltipV2TokensType>('TOOLTIPV2')
    const [isOpen, setOpen] = useControllableState<boolean>(
        open,
        false,
        onOpenChange
    )

    const stringContent = typeof content === 'string' ? content : undefined
    useLiveRegionAnnounce(stringContent, isOpen)

    const padding = splitPadding(tokens.padding[size])
    const resolvedMaxWidth =
        maxWidth ?? parseDimension(tokens.maxWidth[size] as string | number)

    return (
        <AnchoredOverlay
            open={isOpen}
            onRequestClose={() => setOpen(false)}
            placement={side}
            alignment={align}
            offset={offset}
            arrowSize={showArrow ? ARROW_SIZE : undefined}
            arrowColor={String(tokens.background ?? '#181B25')}
            backdrop="transparent"
            testID={testID}
            contentStyle={[
                {
                    backgroundColor: String(tokens.background ?? '#181B25'),
                    borderRadius:
                        parseDimension(
                            tokens.borderRadius[size] as string | number
                        ) ?? 6,
                    paddingVertical: padding.y,
                    paddingHorizontal: padding.x,
                    maxWidth: resolvedMaxWidth,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap:
                        parseDimension(tokens.gap[size] as string | number) ??
                        4,
                },
                style,
            ]}
            trigger={
                <Pressable
                    onLongPress={() => setOpen(true)}
                    delayLongPress={delayDuration}
                    accessibilityHint={stringContent}
                    style={fullWidth ? { alignSelf: 'stretch' } : undefined}
                    testID={testID ? `${testID}-trigger` : undefined}
                >
                    {children}
                </Pressable>
            }
        >
            {slot && slotDirection === TooltipV2SlotDirection.LEFT ? (
                <View>{slot}</View>
            ) : null}
            {typeof content === 'string' ? (
                <Text
                    color={String(tokens.text.color ?? '#FFFFFF')}
                    fontSize={tokens.text.fontSize[size] as string | number}
                    fontWeight={tokens.text.fontWeight[size] as string | number}
                    lineHeight={tokens.text.lineHeight[size] as string | number}
                >
                    {content}
                </Text>
            ) : (
                content
            )}
            {slot && slotDirection === TooltipV2SlotDirection.RIGHT ? (
                <View>{slot}</View>
            ) : null}
        </AnchoredOverlay>
    )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
