import { Check, Minus } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CheckboxV2TokensType } from '../SelectorV2/CheckboxV2/checkboxV2.tokens.types'
import { CheckboxV2CheckedState } from '../SelectorV2/CheckboxV2/checkboxV2.tokens.types'
import { getCheckboxIconColor } from '../SelectorV2/CheckboxV2/utils'
import { SelectorV2Size } from '../SelectorV2/selectorV2.types'

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
    const tokens = useResponsiveTokens<CheckboxV2TokensType>('CHECKBOXV2')
    const size = SelectorV2Size.MD

    const checkedState =
        checked === 'indeterminate'
            ? CheckboxV2CheckedState.INDETERMINATE
            : checked
              ? CheckboxV2CheckedState.CHECKED
              : CheckboxV2CheckedState.UNCHECKED
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
                width: tokens.checkbox.width[size],
                height: tokens.checkbox.height[size],
                borderRadius: tokens.checkbox.borderRadius[size],
                backgroundColor:
                    tokens.checkbox.backgroundColor[checkedState]?.[
                        interactionState
                    ],
                border: tokens.checkbox.border[checkedState]?.[
                    interactionState
                ] as string | undefined,
                opacity: disabled ? 0.7 : 1,
            }}
        >
            {checked === 'indeterminate' ? (
                <Minus
                    width={tokens.checkbox.icon.width[size]}
                    height={tokens.checkbox.icon.height[size]}
                    color={getCheckboxIconColor(tokens, checked, disabled)}
                    strokeWidth={tokens.checkbox.icon.strokeWidth[size]}
                    aria-hidden="true"
                    focusable={false}
                />
            ) : checked ? (
                <Check
                    width={tokens.checkbox.icon.width[size]}
                    height={tokens.checkbox.icon.height[size]}
                    color={getCheckboxIconColor(tokens, checked, disabled)}
                    strokeWidth={tokens.checkbox.icon.strokeWidth[size]}
                    aria-hidden="true"
                    focusable={false}
                />
            ) : null}
        </Block>
    )
}

SelectItemIndicator.displayName = 'SelectItemIndicator'

export default SelectItemIndicator
