import { forwardRef, useMemo } from 'react'
import type { View as RNView } from 'react-native'
import { X } from 'lucide-react-native'
import {
    AlertV2ActionPosition,
    AlertV2SubType,
    AlertV2Type,
    type AlertV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { Block } from '../../primitives/Block'
import { Pressable } from '../../primitives/Pressable'
import { Separator } from '../../primitives/Separator'
import { Slot } from '../../primitives/Slot'
import { Text } from '../../primitives/Text'
import { buildAnnouncement } from '../../a11y/announcement'
import { useLiveRegionAnnounce } from '../../a11y/useLiveRegion'
import {
    getActionAccessibilityLabel,
    getAlertLayout,
    getCloseIconSize,
    shouldShowSeparator,
} from './alert.utils'
import type {
    AlertAction,
    AlertCloseButton,
    AlertNativeProps,
} from './alert.types'

/**
 * Alert — React Native implementation of web's `AlertV2`.
 *
 * Tokens resolve through `useNativeTokens('ALERTV2')`, so theme and per-slot
 * overrides come from `BlendNativeProvider`.
 *
 * Note the actions are *text links*, not `Button`s: web renders them as a bare
 * `PrimitiveButton` with no border or background, so native composes
 * `Pressable` + `Text` rather than reusing the `Button` component.
 *
 * AlertV2's tokens contain no gradients, so this needs no native module beyond
 * the icon set.
 */

type ActionLinkProps = {
    action: AlertAction
    color: string
    fontSize: AlertV2TokensType['mainContainer']['content']['actionContainer']['primaryAction']['fontSize']
    fontWeight: AlertV2TokensType['mainContainer']['content']['actionContainer']['primaryAction']['fontWeight']
    lineHeight: AlertV2TokensType['mainContainer']['content']['actionContainer']['primaryAction']['lineHeight']
    testID?: string
}

function ActionLink({
    action,
    color,
    fontSize,
    fontWeight,
    lineHeight,
    testID,
}: ActionLinkProps) {
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
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                color={color}
                numberOfLines={1}
            >
                {action.text}
            </Text>
        </Pressable>
    )
}

type CloseControlProps = {
    closeButton: AlertCloseButton
    color: string
    size: number
    alignSelf: NonNullable<React.ComponentProps<typeof Pressable>['alignSelf']>
    testID?: string
}

function CloseControl({
    closeButton,
    color,
    size,
    alignSelf,
    testID,
}: CloseControlProps) {
    return (
        <Pressable
            onPress={closeButton.onPress}
            accessibilityRole="button"
            accessibilityLabel={closeButton.accessibilityLabel ?? 'Close'}
            testID={testID}
            alignSelf={alignSelf}
            alignItems="center"
            justifyContent="center"
        >
            {closeButton.icon ? (
                <Slot color={color}>{closeButton.icon}</Slot>
            ) : (
                <X size={size} color={color} />
            )}
        </Pressable>
    )
}

const Alert = forwardRef<RNView, AlertNativeProps>(function Alert(
    {
        type = AlertV2Type.PRIMARY,
        subType = AlertV2SubType.SUBTLE,
        slot,
        heading,
        description,
        actions,
        closeButton = { show: true },
        width,
        maxWidth,
        minWidth,
        announce = true,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<AlertV2TokensType>('ALERTV2')

    const position = actions?.position ?? AlertV2ActionPosition.BOTTOM
    const layout = useMemo(() => getAlertLayout(position), [position])

    const closeShown = Boolean(closeButton?.show)
    const showSeparator = shouldShowSeparator(position, closeShown)

    // Web hard-codes `aria-live="assertive"` + `aria-atomic`. Android reads
    // the region itself via `accessibilityLiveRegion`; iOS has no live-region
    // support, so the composed sentence is announced imperatively.
    const announcement = useMemo(
        () => buildAnnouncement(heading, description),
        [heading, description]
    )
    useLiveRegionAnnounce(announcement, announce)

    const text = tokens.mainContainer.content.textContainer
    const actionTokens = tokens.mainContainer.content.actionContainer
    const closeColor = String(tokens.mainContainer.closeButton.color[type])

    const hasText = Boolean(heading || description)
    const hasActions = Boolean(
        actions?.primaryAction || actions?.secondaryAction
    )

    return (
        <Block
            ref={ref}
            testID={testID}
            // The container carries the accessible name so the alert is
            // announced as one unit, matching web's `aria-atomic`.
            accessible
            accessibilityLabel={accessibilityLabel ?? announcement}
            accessibilityLiveRegion={announce ? 'assertive' : 'none'}
            flexDirection="row"
            alignItems="center"
            width={width ?? tokens.width}
            maxWidth={maxWidth ?? tokens.maxWidth}
            minWidth={minWidth ?? tokens.minWidth}
            border={String(tokens.border[type][subType])}
            borderRadius={tokens.borderRadius}
            backgroundColor={String(tokens.backgroundColor[type][subType])}
            paddingTop={tokens.padding.top}
            paddingBottom={tokens.padding.bottom}
            paddingLeft={tokens.padding.left}
            paddingRight={tokens.padding.right}
            gap={tokens.gap[position]}
            style={style}
        >
            {/*
              `flexShrink` is explicit on every box in this row chain because
              Yoga defaults it to 0, where CSS defaults it to 1. Without it a
              flex child sizes to its content and refuses to shrink, so a long
              description runs off the edge instead of wrapping — the text
              overflows rather than the box narrowing.
            */}
            <Block
                flexDirection="row"
                flexGrow={1}
                flexShrink={1}
                gap={tokens.mainContainer.gap}
            >
                {slot?.slot ? (
                    <Slot
                        maxHeight={slot.maxHeight ?? tokens.slot.maxHeight}
                        hidden={hasText}
                        testID={testID ? `${testID}-slot` : undefined}
                    >
                        {slot.slot}
                    </Slot>
                ) : null}

                <Block
                    flexGrow={1}
                    flexShrink={1}
                    flexDirection={layout.contentDirection}
                    justifyContent={layout.contentJustify}
                    alignItems={layout.contentAlign}
                    gap={tokens.mainContainer.content.gap[position]}
                >
                    {hasText ? (
                        <Block
                            flexGrow={1}
                            flexShrink={1}
                            flexDirection="column"
                            gap={text.gap}
                        >
                            {heading ? (
                                <Text
                                    accessibilityRole="header"
                                    fontSize={text.heading.fontSize}
                                    fontWeight={text.heading.fontWeight}
                                    lineHeight={text.heading.lineHeight}
                                    color={String(text.heading.color[type])}
                                >
                                    {heading}
                                </Text>
                            ) : null}
                            {description ? (
                                <Text
                                    fontSize={text.description.fontSize}
                                    fontWeight={text.description.fontWeight}
                                    lineHeight={text.description.lineHeight}
                                    color={String(text.description.color[type])}
                                >
                                    {description}
                                </Text>
                            ) : null}
                        </Block>
                    ) : null}

                    {hasActions ? (
                        <Block
                            flexDirection="row"
                            alignItems="center"
                            gap={actionTokens.gap}
                        >
                            {actions?.primaryAction ? (
                                <ActionLink
                                    action={actions.primaryAction}
                                    color={String(
                                        actionTokens.primaryAction.color[type]
                                    )}
                                    fontSize={
                                        actionTokens.primaryAction.fontSize
                                    }
                                    fontWeight={
                                        actionTokens.primaryAction.fontWeight
                                    }
                                    lineHeight={
                                        actionTokens.primaryAction.lineHeight
                                    }
                                    testID={
                                        testID
                                            ? `${testID}-primary-action`
                                            : undefined
                                    }
                                />
                            ) : null}
                            {actions?.secondaryAction ? (
                                <ActionLink
                                    action={actions.secondaryAction}
                                    color={String(
                                        actionTokens.secondaryAction.color[type]
                                    )}
                                    fontSize={
                                        actionTokens.secondaryAction.fontSize
                                    }
                                    fontWeight={
                                        actionTokens.secondaryAction.fontWeight
                                    }
                                    lineHeight={
                                        actionTokens.secondaryAction.lineHeight
                                    }
                                    testID={
                                        testID
                                            ? `${testID}-secondary-action`
                                            : undefined
                                    }
                                />
                            ) : null}
                        </Block>
                    ) : null}
                </Block>
            </Block>

            {showSeparator ? (
                <Separator
                    testID={testID ? `${testID}-separator` : undefined}
                />
            ) : null}

            {closeShown ? (
                <CloseControl
                    closeButton={closeButton}
                    color={closeColor}
                    size={getCloseIconSize(tokens)}
                    alignSelf={layout.closeAlign}
                    testID={testID ? `${testID}-close` : undefined}
                />
            ) : null}
        </Block>
    )
})

Alert.displayName = 'Alert'

export default Alert
