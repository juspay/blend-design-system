import { memo } from 'react'
import type { AlertV2Type } from '@juspay/blend-design-system/node'
import { Block } from '../../primitives/Block'
import { Pressable } from '../../primitives/Pressable'
import { Text } from '../../primitives/Text'
import { getActionAccessibilityLabel } from './alert.utils'
import type {
    AlertActionTokens,
    AlertActionVariantTokens,
} from './alert.tokens'
import type {
    AlertAction,
    AlertActions as AlertActionsConfig,
} from './alert.types'

/**
 * `Alert`'s action row.
 *
 * These are **text links**, not `Button`s: web renders them as a bare
 * `PrimitiveButton` with no border or background, so native composes
 * `Pressable` + `Text` rather than reusing the `Button` component.
 */

type ActionLinkProps = {
    action: AlertAction
    type: AlertV2Type
    tokens: AlertActionVariantTokens
    testID?: string
}

function ActionLink({ action, type, tokens, testID }: ActionLinkProps) {
    return (
        <Pressable
            onPress={action.onPress}
            accessibilityRole="button"
            accessibilityLabel={getActionAccessibilityLabel(
                action.text,
                action.accessibilityLabel
            )}
            testID={testID}
            alignSelf="flex-start"
        >
            <Text
                fontSize={tokens.fontSize}
                fontWeight={tokens.fontWeight}
                lineHeight={tokens.lineHeight}
                color={String(tokens.color[type])}
                // Web sets `white-space: nowrap`; the RN equivalent is a single
                // line. `tail` makes an over-long label visibly truncated rather
                // than silently clipped.
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {action.text}
            </Text>
        </Pressable>
    )
}

export type AlertActionsProps = {
    actions?: AlertActionsConfig
    type: AlertV2Type
    tokens: AlertActionTokens
    testID?: string
}

function AlertActionsImpl({
    actions,
    type,
    tokens,
    testID,
}: AlertActionsProps) {
    if (!actions?.primaryAction && !actions?.secondaryAction) return null

    return (
        <Block flexDirection="row" alignItems="center" gap={tokens.gap}>
            {actions.primaryAction ? (
                <ActionLink
                    action={actions.primaryAction}
                    type={type}
                    tokens={tokens.primaryAction}
                    testID={testID ? `${testID}-primary-action` : undefined}
                />
            ) : null}
            {actions.secondaryAction ? (
                <ActionLink
                    action={actions.secondaryAction}
                    type={type}
                    tokens={tokens.secondaryAction}
                    testID={testID ? `${testID}-secondary-action` : undefined}
                />
            ) : null}
        </Block>
    )
}

export const AlertActions = memo(AlertActionsImpl)
AlertActions.displayName = 'AlertActions'
