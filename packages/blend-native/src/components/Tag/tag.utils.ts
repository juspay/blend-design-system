import {
    TagV2Size,
    TagV2SubType,
    type TagV2TokensType,
} from '@juspay/blend-design-system/node'
import { getGroupedBorderRadius, type GroupPosition } from '../shared/group'

/**
 * Native Tag style helpers.
 *
 * Ported from `packages/blend/lib/components/TagV2/utils.ts`. Both functions
 * below are pure string/logic helpers with no DOM dependency, so they are
 * reproduced verbatim in behaviour — keeping web and native visually and
 * semantically identical is the whole point.
 *
 * Web's third helper, `createKeyboardHandler` (Enter/Space → click), has no
 * native counterpart: RN's `Pressable` handles activation itself, including
 * for switch-control and keyboard users.
 */

/**
 * Resolve the border radius for a tag, collapsing the joined edges when the
 * tag sits inside a group.
 *
 * Mirrors `getTagBorderRadius` in web `utils.ts`. The collapsing itself lives
 * in `shared/group` because Button needs exactly the same algorithm.
 */
export function getTagBorderRadius(
    size: TagV2Size,
    subType: TagV2SubType,
    tagGroupPosition: GroupPosition | undefined,
    tokens: TagV2TokensType
): string {
    return getGroupedBorderRadius(
        tokens.borderRadius[size][subType] as string | number,
        tagGroupPosition
    )
}

/**
 * Build the accessible name for a tag.
 *
 * Mirrors `getAccessibleName` in web `utils.ts`: non-interactive tags get no
 * explicit name (the text content is announced instead), and interactive
 * tags fold their toggle state into the label.
 */
export function getAccessibleName(
    text: string,
    isInteractive: boolean,
    pressed: boolean | 'mixed' | undefined
): string | undefined {
    if (!isInteractive) {
        return undefined
    }

    let accessibleName = text

    if (pressed !== undefined) {
        if (pressed === true) {
            accessibleName = `${text}, pressed`
        } else if (pressed === 'mixed') {
            accessibleName = `${text}, mixed state`
        }
    }

    return accessibleName
}

/**
 * Resolve the accessibility state for a tag.
 *
 * `'mixed'` has no RN equivalent — RN's `selected` is a boolean — so it is
 * reported as unselected and carried in the accessible name instead, which
 * is what `getAccessibleName` already appends.
 */
export function getTagAccessibilityState(
    isInteractive: boolean,
    pressed: boolean | 'mixed' | undefined
): { selected: boolean } | undefined {
    if (!isInteractive || pressed === undefined) return undefined
    return { selected: pressed === true }
}
