import { describe, it, expect, expectTypeOf } from 'vitest'
import type { BlockProps } from '../src/primitives/Block'
import type { PrimitivePressableProps } from '../src/primitives/Pressable'
import {
    resolveSurfaceStyle,
    type SurfaceStyleProps,
} from '../src/adapters/surfaceStyle'

/**
 * `Block` and `Pressable` must accept the same surface props.
 *
 * Tag renders one or the other depending on whether it is interactive, and
 * builds a single surface object for both. When `Pressable` was missing
 * `backgroundColor` and `alignSelf`, those props fell silently into its
 * `...rest` and were spread onto the underlying RN component as no-ops — so an
 * interactive attentive Tag rendered white text on a white background.
 *
 * TypeScript could not catch that on its own: spreading an object into JSX
 * skips excess-property checking. The assertions below close that hole at the
 * type level, so `tsc` fails if either primitive stops accepting the shared
 * base. (The imports are type-only and erase at runtime, so this suite pulls
 * in no react-native code.)
 */

describe('Block / Pressable surface prop parity', () => {
    it('Block accepts every surface prop', () => {
        expectTypeOf<SurfaceStyleProps>().toExtend<BlockProps>()
    })

    it('Pressable accepts every surface prop', () => {
        expectTypeOf<SurfaceStyleProps>().toExtend<PrimitivePressableProps>()
    })

    it('the two share one surface base', () => {
        // Anything valid for one branch is valid for the other, which is what
        // lets a component hand the same object to whichever it renders.
        expectTypeOf<SurfaceStyleProps>().toExtend<
            BlockProps & PrimitivePressableProps
        >()
    })
})

describe('resolveSurfaceStyle background precedence', () => {
    it('emits a backgroundColor from an explicit flat colour', () => {
        expect(
            resolveSurfaceStyle({ backgroundColor: '#EFF6FF' }).backgroundColor
        ).toBe('#EFF6FF')
    })

    it('emits a backgroundColor from a CSS-string flat token', () => {
        expect(
            resolveSurfaceStyle({ background: '#EFF6FF' }).backgroundColor
        ).toBe('#EFF6FF')
    })

    it('prefers an explicit backgroundColor over the parsed background', () => {
        expect(
            resolveSurfaceStyle({
                background: '#000000',
                backgroundColor: '#FFFFFF',
            }).backgroundColor
        ).toBe('#FFFFFF')
    })

    it('never drops the fill for a Tag-shaped surface', () => {
        const style = resolveSurfaceStyle({
            backgroundColor: '#2563EB',
            border: '1px solid #2563EB',
            borderRadius: '6px',
            height: '22px',
            paddingLeft: '8px',
            paddingRight: '8px',
            gap: '6px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
        })

        expect(style.backgroundColor).toBe('#2563EB')
        expect(style.alignSelf).toBe('flex-start')
        expect(style.borderWidth).toBe(1)
        expect(style.height).toBe(22)
        expect(style.gap).toBe(6)
    })
})
