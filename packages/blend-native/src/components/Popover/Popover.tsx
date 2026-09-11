import { Pressable, View } from 'react-native'
import {
    PopoverV2Align,
    PopoverV2Side,
    PopoverV2Size,
} from '@juspay/blend-design-system/node'
import type { PopoverV2TokenType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useNativeBreakpoint } from '../../theme/useNativeBreakpoint'
import { useControllableState } from '../../hooks/useControllableState'
import { AnchoredOverlay } from '../../overlay/anchored/AnchoredOverlay'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { PopoverHeader } from './PopoverHeader'
import { PopoverFooter } from './PopoverFooter'
import type { PopoverNativeProps } from './popover.types'

/**
 * Popover — the native port of web's `PopoverV2`.
 *
 * Phones (`sm`) present a bottom sheet, exactly what web's
 * `useDrawerOnMobile` does with the V1 Drawer; tablets (`lg`) get an
 * anchored surface via `AnchoredOverlay`. Chrome comes from POPOVERV2
 * tokens. Web's `border` token holds `"8px"` — an invalid CSS shorthand
 * browsers silently drop — so no border is drawn (flagged upstream).
 */
export function Popover({
    trigger,
    children,
    heading,
    description,
    showCloseButton = true,
    open,
    onOpenChange,
    onClose,
    side = PopoverV2Side.BOTTOM,
    align = PopoverV2Align.CENTER,
    sideOffset = 8,
    size = PopoverV2Size.MD,
    primaryAction,
    secondaryAction,
    maxHeightFraction,
    width,
    minWidth = 300,
    maxWidth = 400,
    height,
    minHeight,
    maxHeight,
    testID,
    style,
}: PopoverNativeProps) {
    const tokens = useNativeTokens<PopoverV2TokenType>('POPOVERV2')
    const breakpoint = useNativeBreakpoint()
    const [isOpen, setOpen] = useControllableState<boolean>(
        open,
        false,
        onOpenChange
    )

    const close = () => {
        setOpen(false)
        onClose?.()
    }

    const gap = parseDimension(tokens.gap[size] as string | number) ?? 12
    const padding = {
        paddingTop:
            parseDimension(tokens.padding.top[size] as string | number) ?? 12,
        paddingBottom:
            parseDimension(tokens.padding.bottom[size] as string | number) ??
            16,
        paddingLeft:
            parseDimension(tokens.padding.left[size] as string | number) ?? 16,
        paddingRight:
            parseDimension(tokens.padding.right[size] as string | number) ?? 16,
    }

    const header = (
        <PopoverHeader
            heading={heading}
            description={description}
            showCloseButton={showCloseButton}
            onClose={close}
            size={size}
            tokens={tokens}
            testID={testID ? `${testID}-header` : undefined}
        />
    )
    const footer = (
        <PopoverFooter
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            size={size}
            tokens={tokens}
            testID={testID ? `${testID}-footer` : undefined}
        />
    )

    if (breakpoint === 'sm') {
        return (
            <>
                <Pressable
                    onPress={() => setOpen(true)}
                    testID={testID ? `${testID}-trigger` : undefined}
                >
                    {trigger}
                </Pressable>
                <BottomSheet
                    open={isOpen}
                    onClose={close}
                    backgroundColor={String(tokens.background ?? '#FFFFFF')}
                    topRadius={
                        parseDimension(
                            tokens.borderRadius[size] as string | number
                        ) ?? 8
                    }
                    maxHeightFraction={maxHeightFraction}
                    accessibilityLabel={heading}
                    testID={testID}
                >
                    <View style={[padding, { gap }, style]}>
                        {header}
                        {children}
                        {footer}
                    </View>
                </BottomSheet>
            </>
        )
    }

    return (
        <AnchoredOverlay
            open={isOpen}
            onRequestClose={close}
            placement={side}
            alignment={align}
            offset={sideOffset}
            backdrop="transparent"
            modal
            accessibilityLabel={heading}
            testID={testID}
            trigger={
                <Pressable
                    onPress={() => setOpen(true)}
                    testID={testID ? `${testID}-trigger` : undefined}
                >
                    {trigger}
                </Pressable>
            }
            contentStyle={[
                {
                    backgroundColor: String(tokens.background ?? '#FFFFFF'),
                    borderRadius:
                        parseDimension(
                            tokens.borderRadius[size] as string | number
                        ) ?? 8,
                    ...padding,
                    gap,
                    width,
                    minWidth,
                    maxWidth,
                    height,
                    minHeight,
                    maxHeight,
                },
                style,
            ]}
        >
            {header}
            {children}
            {footer}
        </AnchoredOverlay>
    )
}

Popover.displayName = 'Popover'

export default Popover
