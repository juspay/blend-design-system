import { forwardRef, useMemo, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import type { ScrollView as RNScrollView } from 'react-native'
import { Ellipsis } from 'lucide-react-native'
import type { BreadcrumbV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import Slot from '../../primitives/Slot'
import { Menu } from '../Menu'
import type { MenuGroupType } from '../Menu'
import {
    breadcrumbItemKey,
    computeBreadcrumbOverflowLayout,
    isCurrentCrumb,
} from './breadcrumb.utils'
import type {
    BreadcrumbNativeItemType,
    BreadcrumbNativeProps,
} from './breadcrumb.types'

/**
 * One crumb: slots + label. The current page renders as plain text (web
 * swaps the anchor for a `span` + `aria-current="page"`); RN's closest
 * mapping is a `text` role carrying `selected` state. Every other crumb is
 * a `link`-role pressable (the `LinkButton` convention).
 */
function Crumb({
    item,
    active,
    tokens,
    testID,
}: {
    item: BreadcrumbNativeItemType
    active: boolean
    tokens: BreadcrumbV2TokensType
    testID?: string
}) {
    const [pressed, setPressed] = useState(false)
    const color = active
        ? tokens.item.text.color.active
        : pressed
          ? tokens.item.text.color.hover
          : tokens.item.text.color.default
    const resolvedColor = String(color)

    const label = (
        <Text
            fontSize={tokens.item.text.fontSize as string | number}
            fontWeight={tokens.item.text.fontWeight as string | number}
            color={resolvedColor}
            numberOfLines={1}
        >
            {item.label}
        </Text>
    )

    const slots = (
        <>
            {item.leftSlot ? (
                <Slot maxHeight={16} color={resolvedColor}>
                    {item.leftSlot}
                </Slot>
            ) : null}
            {label}
            {item.rightSlot ? (
                <Slot maxHeight={16} color={resolvedColor}>
                    {item.rightSlot}
                </Slot>
            ) : null}
        </>
    )

    if (active) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: parseDimension(tokens.item.gap as string | number),
                    paddingHorizontal: parseDimension(
                        // The token padding is "Py Px"; horizontal is the
                        // second value.
                        String(tokens.item.padding).split(/\s+/)[1]
                    ),
                }}
                testID={testID}
            >
                {slots}
            </View>
        )
    }

    return (
        <Pressable
            onPress={item.onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            accessibilityRole="link"
            accessibilityLabel={`Navigate to ${item.label}`}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: parseDimension(tokens.item.gap as string | number),
                paddingHorizontal: parseDimension(
                    String(tokens.item.padding).split(/\s+/)[1]
                ),
            }}
            testID={testID}
        >
            {slots}
        </Pressable>
    )
}

/** Decorative separator, hidden from assistive tech like web's `aria-hidden`. */
function BreadcrumbSeparator({
    children,
    color,
}: {
    children?: React.ReactNode
    color: string
}) {
    return (
        <View
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            <Text color={color}>{children ?? '/'}</Text>
        </View>
    )
}

/**
 * Breadcrumb — the native port of web's `BreadcrumbV2`.
 *
 * A horizontally scrollable row of crumbs with web's overflow policy: beyond
 * `maxItems`, the trail collapses to first crumb + ellipsis + up to three
 * trailing segments, with the hidden crumbs in an overflow `Menu` — unless
 * that would leave fewer than `minVisibleItems` crumbs visible. The current
 * page (last entry, or `isActive`) renders as text, everything else as a
 * link-role pressable.
 */
const Breadcrumb = forwardRef<RNScrollView, BreadcrumbNativeProps>(
    function Breadcrumb(
        {
            items = [],
            maxItems = 4,
            minVisibleItems,
            separator,
            accessibilityLabel = 'Breadcrumb navigation',
            testID,
            style,
        },
        ref
    ) {
        const tokens = useNativeTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

        const layout = useMemo(
            () =>
                computeBreadcrumbOverflowLayout(
                    items,
                    maxItems,
                    minVisibleItems
                ),
            [items, maxItems, minVisibleItems]
        )

        const total = items.length
        const separatorColor = String(tokens.separator.color)

        const overflowGroups: MenuGroupType[] = useMemo(() => {
            if (!layout.shouldShowMenu || layout.menuItems.length === 0) {
                return []
            }
            return [
                {
                    id: 'breadcrumb-overflow',
                    items: layout.menuItems.map((item, i) => ({
                        id: breadcrumbItemKey(item, i + 1),
                        label: {
                            text: item.label,
                            // Menu's label slot is typed ReactElement,
                            // narrower than the crumb's ReactNode.
                            leftSlot: item.leftSlot as
                                | React.ReactElement
                                | undefined,
                        },
                        onPress: item.onPress,
                    })),
                },
            ]
        }, [layout.shouldShowMenu, layout.menuItems])

        if (total === 0) return null

        const renderCrumb = (
            item: BreadcrumbNativeItemType,
            index: number,
            key: string
        ) => {
            const active = isCurrentCrumb(index, total, item.isActive)
            return (
                <View
                    key={key}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: parseDimension(tokens.gap as string | number),
                    }}
                >
                    <Crumb
                        item={item}
                        active={active}
                        tokens={tokens}
                        testID={testID ? `${testID}-item-${index}` : undefined}
                    />
                    {!active ? (
                        <BreadcrumbSeparator color={separatorColor}>
                            {separator}
                        </BreadcrumbSeparator>
                    ) : null}
                </View>
            )
        }

        return (
            <ScrollView
                ref={ref}
                horizontal
                showsHorizontalScrollIndicator={false}
                accessibilityRole="list"
                accessibilityLabel={accessibilityLabel}
                contentContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: parseDimension(tokens.gap as string | number),
                }}
                style={style}
                testID={testID}
            >
                {layout.base
                    ? renderCrumb(
                          layout.base,
                          0,
                          breadcrumbItemKey(layout.base, 0)
                      )
                    : null}

                {layout.shouldShowMenu && overflowGroups[0] ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: parseDimension(tokens.gap as string | number),
                        }}
                    >
                        <Menu
                            trigger={
                                <Ellipsis
                                    size={tokens.ellipsis.size}
                                    color={String(tokens.ellipsis.color)}
                                />
                            }
                            items={overflowGroups}
                            testID={testID ? `${testID}-overflow` : undefined}
                        />
                        {layout.rest.length > 0 ? (
                            <BreadcrumbSeparator color={separatorColor}>
                                {separator}
                            </BreadcrumbSeparator>
                        ) : null}
                    </View>
                ) : null}

                {layout.rest.map((item, i) => {
                    // `rest` is the trailing slice of the full list — index
                    // it back into the original positions so `isCurrentCrumb`
                    // still sees the true last entry.
                    const index = total - layout.rest.length + i
                    return renderCrumb(
                        item,
                        index,
                        breadcrumbItemKey(item, index)
                    )
                })}
            </ScrollView>
        )
    }
)

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
