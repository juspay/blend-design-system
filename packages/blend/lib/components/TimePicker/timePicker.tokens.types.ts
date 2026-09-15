import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type TimePickerSizeKey = 'sm' | 'md' | 'lg'

/**
 * Tokens for the time *dropdown* only.
 *
 * The trigger deliberately has no tokens here — every picker in the library
 * renders `renderPickerTrigger` against the shared `CALENDAR` slot's
 * `trigger.dateInput` sub-tree, so TimePicker, SingleDatePicker and
 * DateRangePicker cannot visually drift apart.
 */
export type TimePickerTokensType = {
    dropdown: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        padding: CSSObject['padding']
        gap: CSSObject['gap']
        maxHeight: CSSObject['maxHeight']
        column: {
            width: CSSObject['width']
            gap: CSSObject['gap']
            separator: CSSObject['borderLeft']
            header: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                paddingY: CSSObject['padding']
            }
        }
        option: {
            height: CSSObject['height']
            paddingX: CSSObject['padding']
            borderRadius: CSSObject['borderRadius']
            fontSize: {
                [key in TimePickerSizeKey]: CSSObject['fontSize']
            }
            fontWeight: CSSObject['fontWeight']
            color: {
                default: CSSObject['color']
                selected: CSSObject['color']
                disabled: CSSObject['color']
            }
            backgroundColor: {
                default: CSSObject['backgroundColor']
                hover: CSSObject['backgroundColor']
                selected: CSSObject['backgroundColor']
                disabled: CSSObject['backgroundColor']
            }
            focusOutline: CSSObject['outline']
        }
    }
    errorMessage: {
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        marginTop: CSSObject['marginTop']
    }
}

export type ResponsiveTimePickerTokens = {
    [key in keyof BreakpointType]: TimePickerTokensType
}
