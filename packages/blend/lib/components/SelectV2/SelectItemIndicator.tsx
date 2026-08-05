import { Check, Minus } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CheckboxTokensType } from '../Checkbox/checkbox.token'
import { getCheckboxIconColor } from '../Checkbox/checkboxUtils'
import { CheckboxSize } from '../Checkbox/types'

export type SelectItemIndicatorProps = {
    checked: boolean | 'indeterminate'
    disabled?: boolean
}

/**
 * Read-only checkbox visual for rows that are themselves the widget.
 *
 * On an always-visible list the row carries `role="option"` and the tab stop,
 * so a real `Checkbox` nested inside it would be a second focusable control —
 * an axe `nested-interactive` violation that neither `tabindex="-1"` nor
 * `aria-hidden` clears. This renders the same token-driven appearance with no
 * focusable element and nothing exposed to assistive tech.
 *
 * Single-select rows do not need this: their indicator is a `Check` icon,
 * which was never interactive.
 */
const SelectItemIndicator = ({
    checked,
    disabled = false,
}: SelectItemIndicatorProps) => {
    const tokens = useResponsiveTokens<CheckboxTokensType>('CHECKBOX')
    const size = CheckboxSize.MEDIUM

    const checkedState =
        checked === 'indeterminate'
            ? 'indeterminate'
            : checked
              ? 'checked'
              : 'unchecked'
    const interactionState = disabled ? 'disabled' : 'default'

    return (
        <Block
            as="span"
            aria-hidden="true"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            style={{
                boxSizing: 'border-box',
                width: tokens.indicator.width[size],
                height: tokens.indicator.height[size],
                borderRadius: tokens.indicator.borderRadius[size],
                backgroundColor:
                    tokens.indicator.backgroundColor[checkedState]?.[
                        interactionState
                    ],
                border: tokens.indicator.border[checkedState]?.[
                    interactionState
                ] as string | undefined,
                opacity: disabled ? 0.7 : 1,
            }}
        >
            {checked === 'indeterminate' ? (
                <Minus
                    size={tokens.indicator.icon.width[size]}
                    color={getCheckboxIconColor(tokens, checked, disabled)}
                    strokeWidth={tokens.indicator.icon.strokeWidth[size]}
                    aria-hidden="true"
                    focusable={false}
                />
            ) : checked ? (
                <Check
                    size={tokens.indicator.icon.width[size]}
                    color={getCheckboxIconColor(tokens, checked, disabled)}
                    strokeWidth={tokens.indicator.icon.strokeWidth[size]}
                    aria-hidden="true"
                    focusable={false}
                />
            ) : null}
        </Block>
    )
}

SelectItemIndicator.displayName = 'SelectItemIndicator'

export default SelectItemIndicator
