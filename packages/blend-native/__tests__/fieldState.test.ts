import { describe, it, expect } from 'vitest'
import { InputStateV2 } from '@juspay/blend-design-system/node'
import {
    getFieldState,
    getFieldVisualState,
} from '../src/components/shared/field/fieldState'

const err = { show: true, message: 'Required' }
const hiddenErr = { show: false, message: 'Required' }

describe('getFieldState (labels/footer)', () => {
    it('error beats disabled beats default', () => {
        expect(getFieldState(err, true)).toBe(InputStateV2.ERROR)
        expect(getFieldState(err, false)).toBe(InputStateV2.ERROR)
        expect(getFieldState(undefined, true)).toBe(InputStateV2.DISABLED)
        expect(getFieldState(undefined, false)).toBe(InputStateV2.DEFAULT)
    })

    it('a non-showing error is no error', () => {
        expect(getFieldState(hiddenErr, false)).toBe(InputStateV2.DEFAULT)
    })
})

describe('getFieldVisualState (container)', () => {
    it('error > disabled > focus > default', () => {
        expect(getFieldVisualState(err, true, true)).toBe(InputStateV2.ERROR)
        expect(getFieldVisualState(undefined, true, true)).toBe(
            InputStateV2.DISABLED
        )
        expect(getFieldVisualState(undefined, false, true)).toBe(
            InputStateV2.FOCUS
        )
        expect(getFieldVisualState(undefined, false, false)).toBe(
            InputStateV2.DEFAULT
        )
    })

    it('focus never applies to an erroring field', () => {
        // Web keeps the error border while focused; the truth table must too.
        expect(getFieldVisualState(err, false, true)).toBe(InputStateV2.ERROR)
    })
})
