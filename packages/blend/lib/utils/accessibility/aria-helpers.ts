/**
 * Shared ARIA attribute helpers for consistent accessibility across all components
 *
 * These utilities ensure consistent ARIA implementation following WCAG 2.2 Level AA standards
 * and reduce code duplication across components.
 */

export type AriaAttributes = {
    'aria-label'?: string
    'aria-labelledby'?: string
    'aria-describedby'?: string
    'aria-expanded'?: boolean
    'aria-selected'?: boolean
    'aria-disabled'?: boolean
    'aria-busy'?: boolean
    'aria-invalid'?: boolean
    'aria-required'?: boolean
    'aria-controls'?: string
    'aria-live'?: 'polite' | 'assertive' | 'off'
    'aria-atomic'?: boolean
    'aria-haspopup'?:
        | 'true'
        | 'false'
        | 'menu'
        | 'listbox'
        | 'tree'
        | 'grid'
        | 'dialog'
    'aria-modal'?: boolean
    'aria-orientation'?: 'horizontal' | 'vertical'
    role?: string
}

/**
 * Generate ARIA attributes for button components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getButtonAriaAttributes({
 *     disabled: true,
 *     loading: false,
 *     ariaLabel: 'Close dialog'
 * })
 * <button {...ariaAttrs}>Close</button>
 * ```
 */
export function getButtonAriaAttributes(props: {
    disabled?: boolean
    loading?: boolean
    ariaLabel?: string
    ariaLabelledBy?: string
}): AriaAttributes {
    const attrs: AriaAttributes = {}

    if (props.disabled) {
        attrs['aria-disabled'] = true
    }

    if (props.loading) {
        attrs['aria-busy'] = true
    }

    if (props.ariaLabel) {
        attrs['aria-label'] = props.ariaLabel
    }

    if (props.ariaLabelledBy) {
        attrs['aria-labelledby'] = props.ariaLabelledBy
    }

    return attrs
}

/**
 * Generate ARIA attributes for input components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getInputAriaAttributes({
 *     id: 'email-input',
 *     labelId: 'email-label',
 *     errorId: 'email-error',
 *     hintId: 'email-hint',
 *     required: true,
 *     invalid: true
 * })
 * <input {...ariaAttrs} />
 * ```
 */
export function getInputAriaAttributes(props: {
    id: string
    labelId?: string
    errorId?: string
    hintId?: string
    required?: boolean
    invalid?: boolean
    describedBy?: string[]
}): AriaAttributes {
    const attrs: AriaAttributes = {}
    const describedBy: string[] = []

    if (props.labelId) {
        attrs['aria-labelledby'] = props.labelId
    }

    if (props.errorId) {
        describedBy.push(props.errorId)
        attrs['aria-invalid'] = props.invalid ?? true
    }

    if (props.hintId) {
        describedBy.push(props.hintId)
    }

    if (props.describedBy) {
        describedBy.push(...props.describedBy)
    }

    if (describedBy.length > 0) {
        attrs['aria-describedby'] = describedBy.join(' ')
    }

    if (props.required) {
        attrs['aria-required'] = true
    }

    return attrs
}

/**
 * Generate ARIA attributes for modal/dialog components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getModalAriaAttributes({
 *     id: 'dialog-1',
 *     titleId: 'dialog-title',
 *     descriptionId: 'dialog-description',
 *     isAlert: false
 * })
 * <div role="dialog" {...ariaAttrs}>...</div>
 * ```
 */
export function getModalAriaAttributes(props: {
    id: string
    titleId: string
    descriptionId?: string
    isAlert?: boolean
}): AriaAttributes {
    return {
        role: props.isAlert ? 'alertdialog' : 'dialog',
        'aria-modal': true,
        'aria-labelledby': props.titleId,
        ...(props.descriptionId && {
            'aria-describedby': props.descriptionId,
        }),
    }
}

/**
 * Generate ARIA attributes for dropdown/select components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getDropdownAriaAttributes({
 *     id: 'select-1',
 *     isOpen: true,
 *     triggerId: 'select-trigger',
 *     menuId: 'select-menu'
 * })
 * <button {...ariaAttrs}>Select</button>
 * ```
 */
export function getDropdownAriaAttributes(props: {
    id: string
    isOpen: boolean
    triggerId: string
    menuId: string
    hasPopup?: 'listbox' | 'menu'
}): AriaAttributes {
    return {
        'aria-expanded': props.isOpen,
        'aria-controls': props.menuId,
        'aria-haspopup': props.hasPopup || 'listbox',
    }
}

/**
 * Generate ARIA attributes for tab components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getTabAriaAttributes({
 *     id: 'tab-1',
 *     panelId: 'panel-1',
 *     selected: true
 * })
 * <button role="tab" {...ariaAttrs}>Tab 1</button>
 * ```
 */
export function getTabAriaAttributes(props: {
    id: string
    panelId: string
    selected: boolean
    controls?: string
}): AriaAttributes {
    return {
        role: 'tab',
        'aria-selected': props.selected,
        'aria-controls': props.panelId,
        ...(props.controls && { 'aria-controls': props.controls }),
    }
}

/**
 * Generate ARIA attributes for tab panel components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getTabPanelAriaAttributes({
 *     id: 'panel-1',
 *     tabId: 'tab-1',
 *     labelledBy: 'tab-1-label'
 * })
 * <div role="tabpanel" {...ariaAttrs}>Panel content</div>
 * ```
 */
export function getTabPanelAriaAttributes(props: {
    id: string
    tabId: string
    labelledBy?: string
}): AriaAttributes {
    return {
        role: 'tabpanel',
        'aria-labelledby': props.labelledBy || props.tabId,
    }
}

/**
 * Generate ARIA attributes for accordion components
 *
 * @example
 * ```tsx
 * const ariaAttrs = getAccordionAriaAttributes({
 *     headerId: 'accordion-header-1',
 *     contentId: 'accordion-content-1',
 *     expanded: false
 * })
 * <button {...ariaAttrs}>Accordion Header</button>
 * ```
 */
export function getAccordionAriaAttributes(props: {
    headerId: string
    contentId: string
    expanded: boolean
}): AriaAttributes {
    return {
        role: 'button',
        'aria-expanded': props.expanded,
        'aria-controls': props.contentId,
    }
}

/**
 * Generate ARIA live region attributes for dynamic content
 *
 * @example
 * ```tsx
 * const ariaAttrs = getLiveRegionAriaAttributes({
 *     live: 'assertive',
 *     atomic: true
 * })
 * <div {...ariaAttrs}>Error message</div>
 * ```
 */
export function getLiveRegionAriaAttributes(props: {
    live?: 'polite' | 'assertive' | 'off'
    atomic?: boolean
}): AriaAttributes {
    return {
        'aria-live': props.live || 'polite',
        'aria-atomic': props.atomic ?? true,
    }
}

/**
 * Generate unique IDs for ARIA relationships
 *
 * @example
 * ```tsx
 * const labelId = generateAriaId('label')
 * const inputId = generateAriaId('input')
 * ```
 */
export function generateAriaId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Combine multiple ARIA attribute objects
 * Later objects override earlier ones for conflicting keys
 *
 * @example
 * ```tsx
 * const baseAttrs = getButtonAriaAttributes({ disabled: true })
 * const additionalAttrs = { 'aria-label': 'Custom label' }
 * const merged = mergeAriaAttributes(baseAttrs, additionalAttrs)
 * ```
 */
export function mergeAriaAttributes(
    ...attrs: Array<AriaAttributes | undefined>
): AriaAttributes {
    return attrs.reduce<AriaAttributes>((acc, curr) => {
        if (!curr) return acc
        return { ...acc, ...curr }
    }, {})
}
