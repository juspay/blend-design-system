/**
 * @juspay/blend-native — React Native components for Blend Design System.
 *
 * This package consumes Blend's token system via the React-free
 * `@juspay/blend-design-system/node` entry and translates CSS-string token
 * values into RN-compatible style objects (see `./adapters`).
 *
 * No `styled-components`, no DOM, no `window.addEventListener`.
 */

export { Button } from './components/Button'
export type { ButtonNativeProps } from './native.types'

// Re-export the web enums with cleaner native names (no "V2" suffix).
// The underlying enum values are the same string constants, so they're
// interchangeable with the web `ButtonV2Type` etc. at runtime.
export {
    ButtonV2Type as ButtonType,
    ButtonV2Size as ButtonSize,
    ButtonV2SubType as ButtonSubType,
    ButtonV2State as ButtonState,
} from '@juspay/blend-design-system/node'
