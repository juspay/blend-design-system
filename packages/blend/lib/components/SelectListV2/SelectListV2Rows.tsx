import { Fragment, type ReactNode, type RefObject } from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { SelectItemV2 } from '../SelectV2'
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem, VirtualListRef } from '../VirtualList/types'
import type {
    SelectListV2ChromeTokens,
    SelectListV2ItemType,
    SelectListV2Row,
} from './selectListV2.types'

export type SelectListV2VirtualizationConfig = {
    height: number
    itemHeight: number
    overscan: number
    listRef: RefObject<VirtualListRef | null>
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
}

export type SelectListV2RowsProps = {
    rows: SelectListV2Row[]
    chrome: SelectListV2ChromeTokens
    mode: 'single' | 'multi'
    /** Single mode holds at most one value; kept as an array for one code path. */
    selectedValues: string[]
    onToggle: (value: string) => void
    isItemDisabled: (item: SelectListV2ItemType) => boolean
    activeItemIndex: number
    getItemRef: (itemIndex: number) => (node: HTMLElement | null) => void
    /** Total option count, for `aria-setsize` on every rendered option. */
    optionCount: number
    virtualization?: SelectListV2VirtualizationConfig
    loadingComponent?: ReactNode
}

const SelectListV2Rows = ({
    rows,
    chrome,
    mode,
    selectedValues,
    onToggle,
    isItemDisabled,
    activeItemIndex,
    getItemRef,
    optionCount,
    virtualization,
    loadingComponent,
}: SelectListV2RowsProps) => {
    // The visible label is decorative in both paths: the accessible name comes
    // from the `role="group"` wrapper (non-virtualized) or from
    // aria-setsize/aria-posinset (virtualized, where no wrapper is expressible).
    const renderGroupLabel = (label: string) => (
        <PrimitiveText
            data-element="select-list-group-label"
            aria-hidden="true"
            fontSize={chrome.groupLabel.fontSize}
            fontWeight={chrome.groupLabel.fontWeight}
            color={chrome.groupLabel.color}
            userSelect="none"
            textTransform="uppercase"
            style={{
                display: 'block',
                margin: 0,
                width: '100%',
                paddingTop: chrome.groupLabel.paddingTop,
                paddingRight: chrome.groupLabel.paddingRight,
                paddingBottom: chrome.groupLabel.paddingBottom,
                paddingLeft: chrome.groupLabel.paddingLeft,
            }}
        >
            {label}
        </PrimitiveText>
    )

    // Decorative: `listbox` permits only `option`/`group` as owned children,
    // so a `separator` role here fails aria-required-children.
    const renderSeparator = () => (
        <Block
            data-element="select-list-separator"
            aria-hidden="true"
            height={chrome.separator.height}
            backgroundColor={chrome.separator.color}
            margin={virtualization ? 0 : chrome.separator.margin}
            width="100%"
        />
    )

    const renderOption = (row: Extract<SelectListV2Row, { kind: 'item' }>) => {
        const disabled = isItemDisabled(row.item)
        return (
            <SelectItemV2
                {...(mode === 'multi'
                    ? {
                          mode: 'multi' as const,
                          selectedValues,
                          decorativeIndicator: true,
                      }
                    : {
                          mode: 'single' as const,
                          selected: selectedValues[0] ?? '',
                          showCheckmark: true,
                      })}
                ref={getItemRef(row.itemIndex)}
                item={{ ...row.item, disabled }}
                onSelect={onToggle}
                itemTokens={chrome.itemTokens}
                index={row.itemIndex}
                asMenuItem={false}
                role="option"
                ariaSetSize={optionCount}
                ariaPosInSet={row.itemIndex + 1}
                tabIndex={
                    row.itemIndex === activeItemIndex && !disabled ? 0 : -1
                }
            />
        )
    }

    // Padding sits outside the scroll viewport so it does not fight the
    // virtualizer's absolute sizing, matching MultiSelectV2MenuVirtualList.
    const listPadding = {
        paddingTop: chrome.listPadding.top,
        paddingRight: chrome.listPadding.right,
        paddingBottom: chrome.listPadding.bottom,
        paddingLeft: chrome.listPadding.left,
    }

    if (virtualization) {
        // Rows mount independently, so a `role="group"` wrapper spanning a
        // group is not expressible. Options stay direct listbox children and
        // aria-setsize/aria-posinset carry the position information APG
        // requires when a listbox is only partially rendered.
        return (
            <Block style={listPadding}>
                <VirtualList
                    ref={virtualization.listRef}
                    items={rows as unknown as VirtualListItem[]}
                    height={virtualization.height}
                    itemHeight={virtualization.itemHeight}
                    overscan={virtualization.overscan}
                    onEndReached={virtualization.onEndReached}
                    endReachedThreshold={virtualization.endReachedThreshold}
                    hasMore={virtualization.hasMore}
                    renderItem={({ item }) => {
                        const row = item as SelectListV2Row
                        if (row.kind === 'label')
                            return renderGroupLabel(row.label)
                        if (row.kind === 'separator') return renderSeparator()
                        return (
                            <Block width="100%" style={{ minWidth: 0 }}>
                                {renderOption(row)}
                            </Block>
                        )
                    }}
                />
                {virtualization.hasMore && loadingComponent}
            </Block>
        )
    }

    // Non-virtualized: emit the APG grouped-listbox form, where each labelled
    // group is a `role="group"` wrapping its own options.
    type RenderGroup = {
        groupIndex: number
        label?: string
        options: Extract<SelectListV2Row, { kind: 'item' }>[]
        separator: boolean
    }
    const groups: RenderGroup[] = []

    rows.forEach((row) => {
        let group = groups.find((g) => g.groupIndex === row.groupIndex)
        if (!group) {
            group = {
                groupIndex: row.groupIndex,
                options: [],
                separator: false,
            }
            groups.push(group)
        }
        if (row.kind === 'label') group.label = row.label
        else if (row.kind === 'separator') group.separator = true
        else group.options.push(row)
    })

    return (
        <Block style={listPadding}>
            {groups.map((group) => {
                const options = group.options.map((row) => (
                    <Block key={row.id} width="100%" style={{ minWidth: 0 }}>
                        {renderOption(row)}
                    </Block>
                ))

                return (
                    <Fragment key={group.groupIndex}>
                        {group.label ? (
                            <Block role="group" aria-label={group.label}>
                                {renderGroupLabel(group.label)}
                                {options}
                            </Block>
                        ) : (
                            options
                        )}
                        {group.separator && renderSeparator()}
                    </Fragment>
                )
            })}
        </Block>
    )
}

SelectListV2Rows.displayName = 'SelectListV2Rows'

export default SelectListV2Rows
