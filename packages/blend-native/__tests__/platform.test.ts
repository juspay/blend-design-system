import { describe, it, expect } from 'vitest'
import {
    resolveSurfaceStyle,
    type SurfacePlatform,
} from '../src/adapters/surfaceStyle'

/**
 * Shadows are the one style RN models differently per platform, and the
 * package used to emit both models unconditionally.
 *
 * `resolveSurfaceStyle` takes the platform as an argument rather than reading
 * `Platform.OS`, so this stays testable without an RN runtime; the primitives
 * pass the real value.
 */

const SHADOW = '0px 2px 8px rgba(0,0,0,0.15)'

describe('platform-aware shadows', () => {
    it('emits only elevation on Android', () => {
        const style = resolveSurfaceStyle({ boxShadow: SHADOW }, 'android')

        expect(style.elevation).toBeGreaterThan(0)
        // Android ignores these entirely, and before API 28 it ignores
        // shadowColor specifically — carrying them is dead weight.
        expect(style.shadowColor).toBeUndefined()
        expect(style.shadowOffset).toBeUndefined()
        expect(style.shadowOpacity).toBeUndefined()
        expect(style.shadowRadius).toBeUndefined()
    })

    it.each<SurfacePlatform>(['ios', 'web', 'windows', 'macos'])(
        'emits the shadow model and no elevation on %s',
        (platform) => {
            const style = resolveSurfaceStyle({ boxShadow: SHADOW }, platform)

            expect(style.shadowColor).toBeDefined()
            expect(style.shadowOffset).toBeDefined()
            expect(style.shadowRadius).toBeDefined()
            expect(style.elevation).toBeUndefined()
        }
    )

    it('defaults to the shadow model when no platform is given', () => {
        const style = resolveSurfaceStyle({ boxShadow: SHADOW })
        expect(style.shadowColor).toBeDefined()
        expect(style.elevation).toBeUndefined()
    })

    it.each<SurfacePlatform>(['ios', 'android', 'web'])(
        'emits no shadow keys at all on %s when there is no shadow',
        (platform) => {
            const style = resolveSurfaceStyle({ boxShadow: 'none' }, platform)
            expect(style.elevation).toBeUndefined()
            expect(style.shadowColor).toBeUndefined()
        }
    )

    it('resolves every non-shadow property identically across platforms', () => {
        const props = {
            backgroundColor: '#2563EB',
            border: '1px solid #2563EB',
            borderRadius: '6px',
            paddingLeft: '8px',
            gap: '6px',
        }
        const ios = resolveSurfaceStyle(props, 'ios')
        const android = resolveSurfaceStyle(props, 'android')
        expect(ios).toEqual(android)
    })

    it('drops inset shadows on every platform, since RN cannot render them', () => {
        for (const platform of ['ios', 'android'] as SurfacePlatform[]) {
            const style = resolveSurfaceStyle(
                { boxShadow: 'inset 0 1px 2px #000' },
                platform
            )
            expect(style.elevation).toBeUndefined()
            expect(style.shadowColor).toBeUndefined()
        }
    })
})
