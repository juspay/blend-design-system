import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    AlertV2ActionPosition,
    AlertV2SubType,
    AlertV2Type,
    getAlertV2Tokens,
    type AlertV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    getAlertLayout,
    shouldShowSeparator,
    getActionAccessibilityLabel,
    getCloseIconSize,
    ALERT_FLEX_BOX,
    FALLBACK_CLOSE_ICON_SIZE,
} from '../src/components/Alert/alert.utils'
import { resolveSurfaceStyle } from '../src/adapters/surfaceStyle'

const TYPES = Object.values(AlertV2Type)
const SUBTYPES = Object.values(AlertV2SubType)
const POSITIONS = Object.values(AlertV2ActionPosition)

const light = getAlertV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as AlertV2TokensType
const dark = getAlertV2Tokens(FOUNDATION_THEME, Theme.DARK)
    .sm as AlertV2TokensType

/** The surface `Alert.tsx` builds for its container, without rendering. */
function resolveAlertSurface(
    tokens: AlertV2TokensType,
    type: AlertV2Type,
    subType: AlertV2SubType,
    position: AlertV2ActionPosition
) {
    return resolveSurfaceStyle({
        backgroundColor: String(tokens.backgroundColor[type][subType]),
        border: String(tokens.border[type][subType]),
        borderRadius: tokens.borderRadius as string | number,
        width: tokens.width as string | number,
        maxWidth: tokens.maxWidth as string | number,
        minWidth: tokens.minWidth as string | number,
        paddingTop: tokens.padding.top as string | number,
        paddingBottom: tokens.padding.bottom as string | number,
        paddingLeft: tokens.padding.left as string | number,
        paddingRight: tokens.padding.right as string | number,
        gap: tokens.gap[position] as string | number,
        flexDirection: 'row',
        alignItems: 'center',
    })
}

const MATRIX = TYPES.flatMap((type) =>
    SUBTYPES.flatMap((subType) =>
        POSITIONS.map((position) => ({ type, subType, position }))
    )
)

describe('Alert variant matrix', () => {
    it('covers every documented combination', () => {
        // 7 types x 2 subTypes x 2 action positions
        expect(MATRIX).toHaveLength(28)
    })

    describe.each([
        ['light', light],
        ['dark', dark],
    ])('%s theme', (_label, tokens) => {
        it.each(MATRIX)(
            'resolves $type/$subType/$position to valid RN styles',
            ({ type, subType, position }) => {
                const style = resolveAlertSurface(
                    tokens,
                    type,
                    subType,
                    position
                )

                for (const [key, value] of Object.entries(style)) {
                    expect(value, `${key} must not be undefined`).toBeDefined()
                    if (typeof value === 'number') {
                        expect(
                            Number.isNaN(value),
                            `${key} must not be NaN`
                        ).toBe(false)
                    }
                }

                expect(typeof style.backgroundColor).toBe('string')
            }
        )
    })

    it('resolves a text colour for every type', () => {
        const text = light.mainContainer.content.textContainer
        for (const type of TYPES) {
            expect(String(text.heading.color[type])).toMatch(/^#|^rgb/)
            expect(String(text.description.color[type])).toMatch(/^#|^rgb/)
        }
    })

    it('resolves an action and close colour for every type', () => {
        const actions = light.mainContainer.content.actionContainer
        for (const type of TYPES) {
            expect(String(actions.primaryAction.color[type])).toMatch(/^#|^rgb/)
            expect(String(actions.secondaryAction.color[type])).toMatch(
                /^#|^rgb/
            )
            expect(String(light.mainContainer.closeButton.color[type])).toMatch(
                /^#|^rgb/
            )
        }
    })

    it('differs between light and dark', () => {
        expect(String(light.backgroundColor.primary.subtle)).not.toBe(
            String(dark.backgroundColor.primary.subtle)
        )
    })
})

describe('getAlertLayout', () => {
    it('stacks text above actions for the bottom position', () => {
        expect(getAlertLayout(AlertV2ActionPosition.BOTTOM)).toEqual({
            contentDirection: 'column',
            contentJustify: 'space-between',
            contentAlign: 'flex-start',
            closeAlign: 'flex-start',
        })
    })

    it('runs text and actions inline for the right position', () => {
        expect(getAlertLayout(AlertV2ActionPosition.RIGHT)).toEqual({
            contentDirection: 'row',
            contentJustify: 'flex-start',
            contentAlign: 'center',
            closeAlign: 'center',
        })
    })

    it.each(POSITIONS)('emits only valid RN values for %s', (position) => {
        const layout = getAlertLayout(position)
        expect(['row', 'column']).toContain(layout.contentDirection)
        expect(['space-between', 'flex-start']).toContain(layout.contentJustify)
        expect(['flex-start', 'center']).toContain(layout.contentAlign)
    })
})

describe('shouldShowSeparator', () => {
    // Truth table: web's condition is `position === RIGHT && closeButton.show`,
    // and the separator only makes sense when both share a line.
    it.each([
        [AlertV2ActionPosition.RIGHT, true, true],
        [AlertV2ActionPosition.RIGHT, false, false],
        [AlertV2ActionPosition.BOTTOM, true, false],
        [AlertV2ActionPosition.BOTTOM, false, false],
    ])('%s + close=%s -> %s', (position, closeShown, expected) => {
        expect(shouldShowSeparator(position, closeShown)).toBe(expected)
    })
})

describe('getActionAccessibilityLabel', () => {
    it('suffixes the action text, matching web', () => {
        expect(getActionAccessibilityLabel('Retry')).toBe('Retry action')
    })

    it('honours an explicit override', () => {
        expect(getActionAccessibilityLabel('Retry', 'Try again now')).toBe(
            'Try again now'
        )
    })
})

describe('getCloseIconSize', () => {
    it('reads the token web uses for the close button height', () => {
        expect(getCloseIconSize(light)).toBeGreaterThan(0)
        expect(Number.isFinite(getCloseIconSize(light))).toBe(true)
    })

    it('falls back to a usable size for an unparseable token', () => {
        const broken = {
            mainContainer: { closeButton: { height: 'auto' } },
        } as unknown as AlertV2TokensType
        expect(getCloseIconSize(broken)).toBe(FALLBACK_CLOSE_ICON_SIZE)
    })
})

describe('text wrapping', () => {
    // Regression: the long description used to run off the right edge instead
    // of wrapping. Yoga defaults `flexShrink` to 0 where CSS defaults it to 1,
    // so every box in Alert's row chain sized to its content and refused to
    // narrow.
    //
    // The invariant now lives in one exported constant, so this asserts the
    // real value rather than pattern-matching the component source.
    it('pairs flexGrow with an explicit flexShrink', () => {
        expect(ALERT_FLEX_BOX).toEqual({ flexGrow: 1, flexShrink: 1 })
    })

    it('survives the surface resolver without losing either', () => {
        const style = resolveSurfaceStyle({ ...ALERT_FLEX_BOX })
        expect(style.flexGrow).toBe(1)
        expect(style.flexShrink).toBe(1)
    })
})
