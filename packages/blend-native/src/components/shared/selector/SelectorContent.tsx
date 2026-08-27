import { View } from 'react-native'
import Text from '../../../primitives/Text'
import { parseDimension } from '../../../adapters/cssStringAdapter'

/**
 * Label / subLabel / required-marker column shared by Checkbox, Radio and
 * Switch — the native counterpart of web's `SelectorsLabel`/`SelectorsSubLabel`.
 * Internal; the whole control row (including this content) is one Pressable,
 * so tapping the label toggles the control (web's label-click parity).
 *
 * Typed structurally against the `content` subtree the three selector token
 * types share, so no one component's token type is privileged.
 */
export type SelectorContentTokens = {
    gap: unknown
    label: {
        gap: unknown
        color: Record<string, unknown>
        fontSize: Record<string, unknown>
        fontWeight: Record<string, unknown>
        lineHeight: Record<string, unknown>
    }
    subLabel: {
        color: Record<string, unknown>
        fontSize: Record<string, unknown>
        fontWeight: Record<string, unknown>
        lineHeight: Record<string, unknown>
    }
    required: { color: unknown }
}

export type SelectorContentProps = {
    label?: string
    subLabel?: string
    required?: boolean
    size: string
    /** InteractionState key: 'default' | 'disabled' | 'error'. */
    state: string
    tokens: SelectorContentTokens
    testID?: string
}

export function SelectorContent({
    label,
    subLabel,
    required = false,
    size,
    state,
    tokens,
    testID,
}: SelectorContentProps) {
    if (!label && !subLabel) return null

    return (
        <View
            style={{
                flexShrink: 1,
                gap: parseDimension(tokens.gap as string | number) ?? 0,
            }}
            testID={testID}
        >
            {label ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap:
                            parseDimension(
                                tokens.label.gap as string | number
                            ) ?? 4,
                    }}
                >
                    <Text
                        fontSize={
                            tokens.label.fontSize[size] as string | number
                        }
                        fontWeight={
                            tokens.label.fontWeight[size] as string | number
                        }
                        lineHeight={
                            tokens.label.lineHeight[size] as string | number
                        }
                        color={String(tokens.label.color[state])}
                        style={{ flexShrink: 1 }}
                    >
                        {label}
                    </Text>
                    {required && (
                        // Visual-only: "required" reaches assistive tech
                        // through the control's accessibility props.
                        <Text
                            color={String(tokens.required.color)}
                            accessible={false}
                            importantForAccessibility="no-hide-descendants"
                        >
                            *
                        </Text>
                    )}
                </View>
            ) : null}
            {subLabel ? (
                <Text
                    fontSize={tokens.subLabel.fontSize[size] as string | number}
                    fontWeight={
                        tokens.subLabel.fontWeight[size] as string | number
                    }
                    lineHeight={
                        tokens.subLabel.lineHeight[size] as string | number
                    }
                    color={String(tokens.subLabel.color[state])}
                    style={{ flexShrink: 1 }}
                >
                    {subLabel}
                </Text>
            ) : null}
        </View>
    )
}

SelectorContent.displayName = 'SelectorContent'
