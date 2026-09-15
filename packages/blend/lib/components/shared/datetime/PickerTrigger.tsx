import { type ReactElement, type ReactNode } from 'react'
import { Calendar, ChevronDown, ChevronUp, X } from 'lucide-react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { ButtonV2, ButtonV2Size, ButtonV2Type } from '../../ButtonV2'
import { FOUNDATION_THEME } from '../../../tokens'
import type { ThemeType } from '../../../tokens'
import type { CalendarTokenType } from '../../DateRangePicker/dateRangePicker.tokens'
import type {
    DateRange,
    TriggerConfig,
    DateRangePickerSize,
} from '../../DateRangePicker/types'

/**
 * The trigger surface shared by every date/time picker in the library.
 *
 * This was lifted verbatim out of `DateRangePicker`'s inline `renderTrigger`
 * closure so `SingleDatePicker` and `TimePicker` present an identical control
 * instead of forking 230 lines of markup, token wiring and `data-*` hooks.
 *
 * The four render branches and their precedence are unchanged:
 *   1. `triggerConfig.renderTrigger` — caller owns the markup entirely
 *   2. `triggerConfig.element` / `triggerElement` — caller supplies a node
 *   3. mobile drawer — a plain secondary button
 *   4. the default token-styled button
 *
 * Everything added for the newer components (`hasError`, `onClear`,
 * `defaultIcon`) is optional and inert when omitted, so DateRangePicker's
 * output is byte-identical to before the extraction.
 */
export type PickerTriggerProps = {
    /** Text for the default desktop trigger. Caller does the formatting. */
    displayText: string
    /** Text for the mobile drawer button. Caller does the formatting. */
    mobileText?: string
    /** Passed straight through to `triggerConfig.renderTrigger`. */
    displayRange: DateRange | undefined
    isOpen: boolean
    isDisabled: boolean
    size: DateRangePickerSize
    calendarToken: CalendarTokenType
    /** Foundation palette used for legacy fallback styles. */
    foundationTokens?: ThemeType
    /** Squares off the left edge when a quick-range selector sits beside it. */
    hasQuickSelector?: boolean
    triggerConfig?: TriggerConfig
    triggerElement?: ReactNode
    /** Render branch 3 (the drawer button) instead of the default button. */
    isMobileDrawer?: boolean
    onToggle: () => void
    onMobileOpen?: () => void
    ariaLabel: string
    /** Value of the `data-date-picker` attribute used by E2E selectors. */
    dataDatePicker: string
    /** Icon used when `triggerConfig.icon` is not supplied. */
    defaultIcon?: ReactNode
    /** Applies the error border token instead of the default border. */
    hasError?: boolean
    /**
     * Reserves room at the right edge for a `PickerClearButton` overlay.
     * The button itself must be rendered by the caller as a DOM sibling —
     * see the note in the render body.
     */
    showClearSpacer?: boolean
}

export type PickerClearButtonProps = {
    onClear: () => void
    calendarToken: CalendarTokenType
    label?: string
}

/**
 * The inline "clear" affordance. Rendered as a sibling of the trigger and
 * absolutely positioned over its right edge, because a button nested inside
 * the trigger button would be invalid ARIA and unreachable by keyboard.
 */
export const PickerClearButton = ({
    onClear,
    calendarToken,
    label = 'Clear selection',
}: PickerClearButtonProps) => {
    const dateInputToken = calendarToken?.trigger?.dateInput
    const iconSize = dateInputToken?.iconSize

    return (
        <PrimitiveButton
            type="button"
            aria-label={label}
            data-element="datepicker-clear"
            onClick={onClear}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="transparent"
            border="none"
            cursor="pointer"
            padding={0}
            color={dateInputToken?.text?.color}
        >
            <X size={iconSize} aria-hidden="true" />
        </PrimitiveButton>
    )
}

const Chevron = ({
    isOpen,
    size,
    gap,
}: {
    isOpen: boolean
    size?: string | number
    gap?: string | number
}) => {
    const Icon = isOpen ? ChevronUp : ChevronDown
    return <Icon size={size} aria-hidden="true" style={{ marginLeft: gap }} />
}

/**
 * Deliberately a render *function*, not a component.
 *
 * `Popover`/`Drawer` render their trigger with Radix `asChild`, which clones
 * the returned element to inject `onClick`, `ref` and `data-state`. A wrapper
 * component would swallow all of that and the popover would never open, so the
 * element handed back here must be the interactive node itself.
 */
export const renderPickerTrigger = ({
    displayText,
    mobileText,
    displayRange,
    isOpen,
    isDisabled,
    size,
    calendarToken,
    foundationTokens = FOUNDATION_THEME,
    hasQuickSelector = false,
    triggerConfig,
    triggerElement,
    isMobileDrawer = false,
    onToggle,
    onMobileOpen,
    ariaLabel,
    dataDatePicker,
    defaultIcon,
    hasError = false,
    showClearSpacer = false,
}: PickerTriggerProps): ReactElement => {
    // ---- Branch 1: fully custom render -------------------------------------
    if (triggerConfig?.renderTrigger) {
        return (
            <Block width="100%" display="flex">
                {triggerConfig.renderTrigger({
                    selectedRange: displayRange,
                    isOpen,
                    isDisabled,
                    formattedValue: displayText,
                    onClick: onToggle,
                })}
            </Block>
        )
    }

    // ---- Branch 2: caller-supplied element ---------------------------------
    if (triggerConfig?.element || triggerElement) {
        return (
            <Block
                style={{
                    opacity: isDisabled ? 0.5 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    width: '100%',
                    ...triggerConfig?.style,
                }}
            >
                {triggerConfig?.element || triggerElement}
            </Block>
        )
    }

    // ---- Branch 3: mobile drawer -------------------------------------------
    if (isMobileDrawer) {
        return (
            <ButtonV2
                buttonType={ButtonV2Type.SECONDARY}
                size={ButtonV2Size.MEDIUM}
                text={mobileText ?? displayText}
                disabled={isDisabled}
                onClick={() => onMobileOpen?.()}
                width="100%"
            />
        )
    }

    // ---- Branch 4: default token-styled trigger ----------------------------
    const dateInputToken = calendarToken?.trigger?.dateInput
    const iconSize = dateInputToken?.iconSize

    const iconElement =
        triggerConfig?.showIcon === false
            ? null
            : triggerConfig?.icon || defaultIcon || <Calendar size={iconSize} />

    const border = isDisabled
        ? dateInputToken?.border?.disabled
        : hasError
          ? // `error` is an optional token key and CALENDAR overrides replace
            // the whole slot, so a consumer on an older override would
            // otherwise render the error state identically to the resting one.
            (dateInputToken?.border?.error ??
            `${foundationTokens.border.width[1]} solid ${foundationTokens.colors.red[500]}`)
          : dateInputToken?.border?.default

    return (
        <PrimitiveButton
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor={dateInputToken?.backgroundColor}
            color={dateInputToken?.text?.color}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            paddingX={
                dateInputToken?.padding?.[
                    size as keyof CalendarTokenType['trigger']['dateInput']['padding']
                ]?.x
            }
            paddingY={
                dateInputToken?.padding?.[
                    size as keyof CalendarTokenType['trigger']['dateInput']['padding']
                ]?.y
            }
            borderRadius={
                hasQuickSelector
                    ? dateInputToken?.borderRadius?.withQuickSelector
                    : dateInputToken?.borderRadius?.withoutQuickSelector
            }
            border={border}
            boxShadow={calendarToken?.calendar?.boxShadow}
            // NOTE: deliberately no onClick — Popover.Trigger renders `asChild`
            // and attaches its own handler. Adding one here double-toggles.
            aria-expanded={isOpen}
            aria-disabled={isDisabled}
            aria-label={ariaLabel}
            aria-haspopup="dialog"
            aria-invalid={hasError || undefined}
            disabled={isDisabled}
            data-component-field-wrapper=""
            data-date-picker={dataDatePicker}
            data-id={displayText.replace(/\s/g, '').replace(/-/g, '➟')}
            data-status={isDisabled ? 'disabled' : 'enabled'}
            type="button"
            data-element="datepicker-selector"
        >
            <Block
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                style={{
                    color: dateInputToken?.text?.color,
                    fontWeight: dateInputToken?.text?.fontWeight,
                    fontSize:
                        dateInputToken?.text?.fontSize?.[
                            size as keyof CalendarTokenType['trigger']['dateInput']['text']['fontSize']
                        ],
                }}
            >
                <Block
                    display="flex"
                    alignItems="center"
                    gap={dateInputToken?.gap}
                >
                    {iconElement && (
                        <span aria-hidden="true">{iconElement}</span>
                    )}
                    <span
                        data-element="placeholder"
                        data-id={displayText}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {displayText}
                    </span>
                </Block>
                {/* Kept as a bare sibling when there is no clear affordance so
                    DateRangePicker's DOM is unchanged by this extraction.

                    The clear control itself is NOT rendered here: nesting an
                    interactive node inside this <button> is invalid ARIA
                    (axe `nested-interactive`) and screen readers cannot reach
                    it. Callers render `PickerClearButton` as a DOM sibling and
                    overlay it; this only reserves the space so long values
                    don't run underneath it. */}
                {showClearSpacer ? (
                    <Block display="flex" alignItems="center">
                        <Block
                            as="span"
                            aria-hidden="true"
                            display="flex"
                            alignItems="center"
                            marginLeft={dateInputToken?.gap}
                            width={iconSize}
                            flexShrink={0}
                        />
                        <Chevron
                            isOpen={isOpen}
                            size={iconSize}
                            gap={dateInputToken?.gap}
                        />
                    </Block>
                ) : (
                    <Chevron
                        isOpen={isOpen}
                        size={iconSize}
                        gap={dateInputToken?.gap}
                    />
                )}
            </Block>
        </PrimitiveButton>
    )
}

export default renderPickerTrigger
