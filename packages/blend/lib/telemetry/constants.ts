/**
 * Telemetry constants
 *
 * @fileoverview Centralized constants for telemetry system
 * @package @juspay/blend-design-system
 */

// Package information
export const PACKAGE_VERSION = '0.0.13' as const // TODO: Inject from build process
export const PACKAGE_NAME = '@juspay/blend-design-system' as const

// Session and storage
export const SESSION_ID_PREFIX = 'blend' as const
export const STORAGE_KEY_PREFIX = 'blend_usage' as const
export const HASH_BASE = 36 as const

// Environment detection
export const DEVELOPMENT_PORTS = [
    '3000',
    '3001',
    '5173',
    '8080',
    '8000',
] as const
export const DEVELOPMENT_HOSTNAMES = ['localhost', '127.0.0.1'] as const

// Sampling and performance
export const DEFAULT_SAMPLING_RATE = 1.0 as const
export const MAX_PROPS_SIZE = 1000 as const // Maximum characters for props serialization

// Component prop sanitization configurations
export const SAFE_COMPONENT_PROPS = {
    // Button component
    button: [
        'buttonType',
        'size',
        'subType',
        'disabled',
        'loading',
        'fullWidth',
        'justifyContent',
        'buttonGroupPosition',
        'hasLeadingIcon',
        'hasTrailingIcon',
        'hasText',
        'hasBothIcons',
        'isLoading',
        'isDisabled',
        'type',
        'role',
        'tabIndex',
        'form',
        'name',
        'value',
    ],

    // Input components (TextInput, etc.)
    input: [
        'type',
        'size',
        'disabled',
        'required',
        'placeholder',
        'value',
        'error',
        'loading',
        'autoComplete',
        'inputMode',
        'pattern',
        'hasLeftSlot',
        'hasRightSlot',
        'hasLabel',
        'hasHint',
        'maxLength',
    ],

    // Select components (Dropdown, SingleSelect, MultiSelect)
    select: [
        'size',
        'disabled',
        'required',
        'placeholder',
        'multiple',
        'searchable',
        'clearable',
        'loading',
        'error',
        'itemCount',
        'hasGroups',
        'hasSearch',
    ],

    // Modal/Dialog components
    modal: [
        'size',
        'closable',
        'backdrop',
        'centered',
        'fullScreen',
        'hasHeader',
        'hasFooter',
        'hasCloseButton',
        'persistent',
        'scrollable',
    ],

    // Feedback components (Alert, Snackbar, Tooltip)
    feedback: [
        'variant',
        'severity',
        'dismissible',
        'autoHide',
        'position',
        'duration',
        'hasIcon',
        'hasAction',
        'persistent',
    ],

    // Data components (DataTable, Tabs, etc.)
    data: [
        'variant',
        'size',
        'orientation',
        'defaultValue',
        'multiple',
        'collapsible',
        'itemCount',
        'sortable',
        'filterable',
        'paginated',
        'selectable',
    ],

    // Generic fallback
    generic: ['disabled', 'size', 'variant', 'type', 'role', 'tabIndex'],
} as const

// Legacy alias for backward compatibility
export const SAFE_BUTTON_PROPS = SAFE_COMPONENT_PROPS.button

// Organization and app type patterns
export const ORGANIZATION_PATTERNS = {
    juspay: ['juspay'],
    payu: ['payu'],
    external: ['merchant', 'admin', 'dashboard', 'app'],
} as const

export const APP_TYPE_PATTERNS = {
    merchant: ['merchant', '/merchant/'],
    admin: ['admin', '/admin/'],
    dashboard: ['dashboard', '/dashboard/'],
    consumer: ['consumer', 'app', '/app/'],
} as const
