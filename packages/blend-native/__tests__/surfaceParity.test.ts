import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { resolveSurfaceStyle } from '../src/adapters/surfaceStyle'

/**
 * `Block` and `Pressable` must accept the same surface props.
 *
 * Tag renders one or the other depending on whether it is interactive, and
 * builds a single surface object for both. When `Pressable` was missing
 * `backgroundColor` and `alignSelf`, those props fell silently into its
 * `...rest` and were spread onto the underlying RN component as no-ops — so
 * an interactive attentive Tag rendered white text on a white background.
 *
 * TypeScript could not catch it: spreading an object into JSX skips
 * excess-property checking. Both types now extend `SurfaceStyleProps`, and
 * this test pins that so the shared base is not accidentally removed.
 */

const SRC = resolve(__dirname, '../src')

function sourceOf(relativePath: string): string {
    return readFileSync(resolve(SRC, relativePath), 'utf8')
}

describe('Block / Pressable surface prop parity', () => {
    it('both primitives derive their props from SurfaceStyleProps', () => {
        const block = sourceOf('primitives/Block.tsx')
        const pressable = sourceOf('primitives/Pressable.tsx')

        expect(block).toMatch(/BlockProps\s*=\s*SurfaceStyleProps/)
        expect(pressable).toMatch(
            /PrimitivePressableProps\s*=\s*SurfaceStyleProps/
        )
    })

    it('both resolve their styles through the shared resolver', () => {
        for (const file of [
            'primitives/Block.tsx',
            'primitives/Pressable.tsx',
        ]) {
            expect(sourceOf(file)).toContain('resolveSurfaceStyle')
        }
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
        // The exact prop set Tag hands to whichever primitive it renders.
        const style = resolveSurfaceStyle({
            backgroundColor: '#2563EB',
            border: '1px solid #2563EB',
            borderRadius: '6px',
            height: '22px',
            paddingTop: '3px',
            paddingBottom: '3px',
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
