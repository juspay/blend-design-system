import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getStepperV2Tokens,
    StepperV2StepStatus,
    type StepperV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    buildSubstepRowLabel,
    getStepAriaLabel,
    getStepState,
    getStepStatus,
    getSubstepListLabelSuffix,
    getSubstepTextColor,
    hasVisibleSubsteps,
    resolveSubstepFlags,
} from '../src/components/Stepper/stepper.utils'
import type { StepperStep } from '../src/components/Stepper/stepper.types'

// ---------------------------------------------------------------------------
// getStepState — precedence parity with web Steps.tsx
// ---------------------------------------------------------------------------

describe('getStepState (web parity)', () => {
    const base: StepperStep = { id: 1, title: 'Step' }

    it('disabled prop wins over everything', () => {
        expect(getStepState({ ...base, disabled: true }, true, true)).toBe(
            StepperV2StepStatus.DISABLED
        )
    })

    it('explicit status wins over derived index state', () => {
        expect(
            getStepState(
                { ...base, status: StepperV2StepStatus.SKIPPED },
                true,
                false
            )
        ).toBe(StepperV2StepStatus.SKIPPED)
    })

    it('derives completed / current / pending from index', () => {
        expect(getStepState(base, true, false)).toBe(
            StepperV2StepStatus.COMPLETED
        )
        expect(getStepState(base, false, true)).toBe(
            StepperV2StepStatus.CURRENT
        )
        expect(getStepState(base, false, false)).toBe(
            StepperV2StepStatus.PENDING
        )
    })
})

// ---------------------------------------------------------------------------
// Substep helpers
// ---------------------------------------------------------------------------

describe('substep labels and flags', () => {
    it('suffix precedence: completed > current > disabled > skipped > pending', () => {
        expect(getSubstepListLabelSuffix(true, false, false, false)).toBe(
            ', completed'
        )
        expect(getSubstepListLabelSuffix(false, true, false, false)).toBe(
            ', current'
        )
        expect(getSubstepListLabelSuffix(false, false, true, false)).toBe(
            ', disabled'
        )
        expect(getSubstepListLabelSuffix(false, false, false, true)).toBe(
            ', skipped'
        )
        expect(getSubstepListLabelSuffix(false, false, false, false)).toBe(
            ', pending'
        )
    })

    it('builds a 1-based substep row label', () => {
        expect(
            buildSubstepRowLabel(0, 'Review', true, false, false, false)
        ).toBe('Substep 1: Review, completed')
        expect(buildSubstepRowLabel(2, 'Pay', false, false, false, false)).toBe(
            'Substep 3: Pay, pending'
        )
    })

    it('resolves substep flags from status', () => {
        const flags = resolveSubstepFlags({
            id: 1,
            title: 's',
            status: StepperV2StepStatus.CURRENT,
        })
        expect(flags).toEqual({
            isSubstepCurrent: true,
            isSubstepCompleted: false,
            isSubstepPending: false,
            isSubstepSkipped: false,
        })
    })
})

// ---------------------------------------------------------------------------
// A11y labels
// ---------------------------------------------------------------------------

describe('getStepAriaLabel / getStepStatus', () => {
    it('builds "Step N of M" labels with a status suffix', () => {
        expect(
            getStepAriaLabel(0, 3, 'Cart', StepperV2StepStatus.COMPLETED)
        ).toBe('Step 1 of 3: Cart, completed')
        expect(getStepAriaLabel(2, 3, 'Pay', StepperV2StepStatus.CURRENT)).toBe(
            'Step 3 of 3: Pay, current'
        )
        expect(
            getStepAriaLabel(1, 3, 'Ship', StepperV2StepStatus.PENDING)
        ).toBe('Step 2 of 3: Ship, pending')
        expect(
            getStepAriaLabel(1, 3, 'Ship', StepperV2StepStatus.DISABLED)
        ).toBe('Step 2 of 3: Ship, disabled')
    })

    it('maps enum statuses to plain strings', () => {
        expect(getStepStatus(StepperV2StepStatus.COMPLETED)).toBe('completed')
        expect(getStepStatus(StepperV2StepStatus.DISABLED)).toBe('disabled')
        expect(getStepStatus(StepperV2StepStatus.PENDING)).toBe('pending')
    })
})

// ---------------------------------------------------------------------------
// Token resolution — both themes, both breakpoints
// ---------------------------------------------------------------------------

describe('STEPPERV2 token resolution', () => {
    const THEMES = [Theme.LIGHT, Theme.DARK]

    it.each(THEMES.map((t) => [t] as const))(
        '%s: resolves the slot shape the component consumes',
        (theme) => {
            const resolved = getStepperV2Tokens(FOUNDATION_THEME, theme)
            for (const bp of ['sm', 'lg'] as const) {
                const tokens = resolved[bp] as StepperV2TokensType

                // Container + connector (gap may be a raw number — CSSObject)
                expect(tokens.container.gap).toBeTruthy()
                expect(typeof tokens.container.connector.line.color).toBe(
                    'string'
                )
                expect(typeof tokens.container.connector.line.height).toBe(
                    'string'
                )

                // Circle: every status carries a default interaction state
                for (const status of Object.values(StepperV2StepStatus)) {
                    const circle = tokens.container.step.circle[status].default
                    expect(typeof circle.backgroundColor).toBe('string')
                    expect(typeof circle.borderColor).toBe('string')
                    expect(circle.size).toBeTruthy()

                    const icon = tokens.container.step.icon[status].default
                    expect(typeof icon.color).toBe('string')

                    const title = tokens.container.title.text[status].default
                    expect(typeof title.color).toBe('string')
                    expect(typeof title.fontSize).toBe('string')
                }

                // Substep connector + description
                const sub = tokens.container.subConnector
                expect(typeof sub.line.color).toBe('string')
                expect(typeof sub.dot.width).toBe('string')
                expect(typeof sub.text.default.color).toBe('string')
                const desc = tokens.container.description.text
                expect(typeof desc.fontSize).toBe('string')
            }
        }
    )

    it('picks substep text colors by status (disabled wins)', () => {
        const tokens = getStepperV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
            .sm as StepperV2TokensType
        const flags = {
            isSubstepCompleted: false,
            isSubstepCurrent: false,
            isSubstepPending: false,
            isSubstepSkipped: false,
        }
        expect(
            getSubstepTextColor(tokens, {
                ...flags,
                isSubstepDisabled: true,
            })
        ).toBe(String(tokens.container.subConnector.text.disabled.color))
        expect(
            getSubstepTextColor(tokens, {
                ...flags,
                isSubstepCompleted: true,
                isSubstepDisabled: false,
            })
        ).toBe(String(tokens.container.subConnector.text.completed.color))
        expect(
            getSubstepTextColor(tokens, {
                ...flags,
                isSubstepCurrent: true,
                isSubstepDisabled: false,
            })
        ).toBe(String(tokens.container.subConnector.text.current.color))
    })

    it('hasVisibleSubsteps is false for undefined/empty arrays', () => {
        expect(hasVisibleSubsteps({ id: 1, title: 'a' })).toBe(false)
        expect(hasVisibleSubsteps({ id: 1, title: 'a', substeps: [] })).toBe(
            false
        )
        expect(
            hasVisibleSubsteps({
                id: 1,
                title: 'a',
                substeps: [{ id: 1, title: 's' }],
            })
        ).toBe(true)
    })
})
