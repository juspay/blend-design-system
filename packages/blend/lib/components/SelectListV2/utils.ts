import type {
    SelectListV2GroupType,
    SelectListV2ItemType,
    SelectListV2Row,
} from './selectListV2.types'

const isDev = process.env.NODE_ENV !== 'production'
const warned = new Set<string>()

/** Dev-only, once per distinct message, so a long list cannot flood the console. */
export const warnOnce = (key: string, message: string): void => {
    if (!isDev || warned.has(key)) return
    warned.add(key)
    console.error(message)
}

/** Test seam: lets a suite assert the first warning of a run. */
export const resetSelectListV2Warnings = (): void => warned.clear()

/**
 * Flattens groups into render-ready rows.
 *
 * `subMenu` is rejected rather than flattened. Both V2 item models carry it,
 * but every renderer implements it as a Radix popover, and a list surface has
 * nowhere to anchor one. Silently dropping the children would lose options
 * with no signal, and indenting them inline would ship a drill-down UI that
 * was explicitly deferred — so the parent renders as an ordinary selectable
 * row and development gets a hard, unmissable error naming the item.
 */
export const flattenSelectListV2Groups = (
    groups: SelectListV2GroupType[]
): SelectListV2Row[] => {
    const rows: SelectListV2Row[] = []
    let rowId = 0
    let itemIndex = 0

    const pushItem = (item: SelectListV2ItemType, groupIndex: number): void => {
        if (item.subMenu?.length) {
            warnOnce(
                `submenu:${item.value}`,
                `[Blend] SelectListV2/MultiSelectListV2 do not support \`subMenu\` (item "${item.value}"). ` +
                    'Its nested options were not rendered. Drill-down is tracked as a fast-follow; ' +
                    'use SingleSelectV2/MultiSelectV2 if you need nested options today.'
            )
        }
        rows.push({
            id: `item-${rowId++}`,
            kind: 'item',
            item,
            itemIndex: itemIndex++,
            groupIndex,
        })
    }

    groups.forEach((group, groupIndex) => {
        if (group.groupLabel) {
            rows.push({
                id: `label-${groupIndex}`,
                kind: 'label',
                label: group.groupLabel,
                groupIndex,
            })
        }

        group.items.forEach((item) => pushItem(item, groupIndex))

        if (groupIndex !== groups.length - 1 && group.showSeparator) {
            rows.push({
                id: `separator-${groupIndex}`,
                kind: 'separator',
                groupIndex,
            })
        }
    })

    return rows
}

/** Total renderable options, for `aria-setsize`. */
export const countSelectListV2Options = (rows: SelectListV2Row[]): number =>
    rows.reduce((count, row) => (row.kind === 'item' ? count + 1 : count), 0)

export type SelectListV2FocusTarget = {
    itemIndex: number
    /** Index into the flattened rows, used to scroll a virtualized row in. */
    rowIndex: number
    disabled: boolean
}

export const getSelectListV2FocusTargets = (
    rows: SelectListV2Row[],
    isRowDisabled: (row: Extract<SelectListV2Row, { kind: 'item' }>) => boolean
): SelectListV2FocusTarget[] =>
    rows.reduce<SelectListV2FocusTarget[]>((targets, row, rowIndex) => {
        if (row.kind === 'item') {
            targets.push({
                itemIndex: row.itemIndex,
                rowIndex,
                disabled: isRowDisabled(row),
            })
        }
        return targets
    }, [])
