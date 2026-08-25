import {
    InputSizeV2,
    InputStateV2,
    type TextInputV2TokensType,
} from '@juspay/blend-design-system/node'
import { Block } from '../../../primitives/Block'
import { Text } from '../../../primitives/Text'

/**
 * Label row above a field: label, required marker, sublabel.
 *
 * Ports web's `InputLabelsV2` against the same `topContainer` token shape,
 * with two deliberate omissions:
 *
 * - `helpIconText` — web wraps a help icon in `Tooltip`; native has no
 *   tooltip yet, so the prop does not exist rather than silently doing
 *   nothing (the `skeleton` precedent).
 * - `as="label"`/`htmlFor` — no DOM. The field component instead puts the
 *   label text into the input's `accessibilityLabel`.
 */

export type FieldLabelsProps = {
    label?: string
    sublabel?: string
    required?: boolean
    size?: InputSizeV2
    state?: InputStateV2
    tokens: TextInputV2TokensType['topContainer']
    testID?: string
}

export function FieldLabels({
    label,
    sublabel,
    required = false,
    size = InputSizeV2.SM,
    state = InputStateV2.DEFAULT,
    tokens,
    testID,
}: FieldLabelsProps) {
    if (!label) return null

    return (
        <Block
            flexDirection="row"
            alignItems="center"
            gap={4}
            width="100%"
            testID={testID}
        >
            <Text
                fontWeight={tokens.label.fontWeight[size]}
                fontSize={tokens.label.fontSize[size]}
                color={String(tokens.label.color[state])}
                lineHeight={tokens.label.lineHeight[size]}
            >
                {label}
            </Text>
            {required ? (
                // Web renders <sup aria-hidden>*</sup>; the accessible
                // "required" semantics live on the input's a11y props, so
                // the marker stays visual-only here too.
                <Text
                    color={String(tokens.required.color)}
                    fontSize={tokens.label.fontSize[size]}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                >
                    *
                </Text>
            ) : null}
            {sublabel ? (
                <Text
                    fontWeight={tokens.subLabel.fontWeight[size]}
                    fontSize={tokens.subLabel.fontSize[size]}
                    color={String(tokens.subLabel.color[state])}
                    lineHeight={tokens.subLabel.lineHeight[size]}
                >
                    ({sublabel})
                </Text>
            ) : null}
        </Block>
    )
}

FieldLabels.displayName = 'FieldLabels'
