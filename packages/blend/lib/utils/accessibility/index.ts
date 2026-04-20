/**
 * Centralized accessibility utilities export
 *
 * This module provides shared accessibility utilities for consistent
 * ARIA implementation, keyboard navigation, and focus management across
 * all components in the Blend Design System.
 *
 * @example
 * ```tsx
 * import {
 *     getButtonAriaAttributes,
 *     createButtonKeyboardHandler,
 *     focusFirstFocusable
 * } from '@juspay/blend-design-system/utils/accessibility'
 * ```
 */

export * from './aria-helpers'
export * from './keyboard-helpers'
export * from './focus-helpers'
export * from './visually-hidden'

// Re-export types for convenience
export type { AriaAttributes } from './aria-helpers'
export type { KeyboardHandler } from './keyboard-helpers'
