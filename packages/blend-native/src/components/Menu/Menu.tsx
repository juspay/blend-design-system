import { Pressable, View } from 'react-native'
import type { MenuV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useNativeBreakpoint } from '../../theme/useNativeBreakpoint'
import { useControllableState } from '../../hooks/useControllableState'
import { AnchoredOverlay } from '../../overlay/anchored/AnchoredOverlay'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import { MenuList } from './MenuList'
import type { MenuNativeProps } from './menu.types'

/**
 * Menu — the native port of web's `MenuV2`.
 *
 * **Docblocked divergence:** web's Menu is an anchored dropdown at every
 * size; native presents phones (`sm`) a bottom sheet — consistent with
 * Popover and the Selects — and tablets (`lg`) the anchored surface.
 * Selection is fully controlled by the caller (web parity). Sub-menus are
 * a push-in pane; the item list is a FlatList over the node-exported
 * flatten/filter utils.
 */
export function Menu({
    trigger,
    items = [],
    enableSearch,
    searchPlaceholder,
    searchSortFn,
    onEnter,
    open,
    onOpenChange,
    selectionStyle,
    selectionMode,
    closeOnSelect = true,
    alignment,
    side,
    sideOffset = 8,
    maxHeightFraction,
    minWidth,
    maxWidth,
    maxHeight,
    testID,
    style,
}: MenuNativeProps) {
    const tokens = useNativeTokens<MenuV2TokensType>('MENU_V2')
    const breakpoint = useNativeBreakpoint()
    const [isOpen, setOpen] = useControllableState<boolean>(
        open,
        false,
        onOpenChange
    )
    const close = () => setOpen(false)

    const list = (
        <MenuList
            groups={items}
            enableSearch={enableSearch}
            searchPlaceholder={searchPlaceholder}
            searchSortFn={searchSortFn}
            onEnter={onEnter}
            selectionStyle={selectionStyle}
            selectionMode={selectionMode}
            closeOnSelect={closeOnSelect}
            onRequestClose={close}
            tokens={tokens}
            testID={testID}
        />
    )

    const padding = {
        paddingTop: parseDimension(tokens.paddingTop as string | number),
        paddingBottom: parseDimension(tokens.paddingBottom as string | number),
        paddingLeft: parseDimension(tokens.paddingLeft as string | number),
        paddingRight: parseDimension(tokens.paddingRight as string | number),
    }

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
                    backgroundColor={String(
                        tokens.backgroundColor ?? '#FFFFFF'
                    )}
                    maxHeightFraction={maxHeightFraction}
                    accessibilityLabel="Menu"
                    testID={testID}
                    style={style}
                >
                    <View style={padding}>{list}</View>
                </BottomSheet>
            </>
        )
    }

    return (
        <AnchoredOverlay
            open={isOpen}
            onRequestClose={close}
            placement={side ?? 'bottom'}
            alignment={alignment ?? 'start'}
            offset={sideOffset}
            backdrop="transparent"
            modal
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
                    backgroundColor: String(
                        tokens.backgroundColor ?? '#FFFFFF'
                    ),
                    borderRadius:
                        parseDimension(
                            tokens.borderRadius as string | number
                        ) ?? 8,
                    ...parseBorder(String(tokens.border ?? 'none')),
                    ...padding,
                    minWidth:
                        minWidth ??
                        parseDimension(tokens.minWidth as string | number),
                    maxWidth:
                        maxWidth ??
                        parseDimension(tokens.maxWidth as string | number),
                    maxHeight,
                },
                style,
            ]}
        >
            {list}
        </AnchoredOverlay>
    )
}

Menu.displayName = 'Menu'

export default Menu
