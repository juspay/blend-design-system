/**
 * Button Component Exports
 *
 * Refactored button component following RFC 0007 standards.
 * Provides cleaner API with improved readability.
 */

export { default as Button } from './Button'
export type {
    ButtonProps,
    ButtonVariant,
    ButtonSize,
    ButtonSubType,
    ButtonGroupPosition,
} from './Button.types'

export type {
    ButtonV2TokensType,
    ResponsiveButtonV2Tokens,
} from './ButtonV2.tokens'
export { getButtonV2Tokens } from './ButtonV2.tokens'

export { default as ButtonV2 } from './ButtonV2'
export {
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2State,
} from './ButtonV2.types'
export type { ButtonV2Props, ButtonV2GroupPosition } from './ButtonV2.types'
