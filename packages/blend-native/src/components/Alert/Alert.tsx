import { forwardRef, useMemo } from 'react'
import type { View as RNView } from 'react-native'
import {
    AlertV2ActionPosition,
    AlertV2SubType,
    AlertV2Type,
    type AlertV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { Block } from '../../primitives/Block'
import { Separator } from '../../primitives/Separator'
import { Slot } from '../../primitives/Slot'
import { buildAnnouncement } from '../../a11y/announcement'
import { useLiveRegionAnnounce } from '../../a11y/useLiveRegion'
import { AlertActions } from './AlertActions'
import { AlertClose } from './AlertClose'
import { AlertText } from './AlertText'
import {
    ALERT_FLEX_BOX,
    getAlertLayout,
    getCloseIconSize,
    shouldShowSeparator,
} from './alert.utils'
import type { AlertNativeProps } from './alert.types'

/**
 * Alert — React Native implementation of web's `AlertV2`.
 *
 * Tokens resolve through `useNativeTokens('ALERTV2')`, so theme and per-slot
 * overrides come from `BlendNativeProvider`.
 *
 * AlertV2's tokens contain no gradients, so this needs no native module beyond
 * the icon set.
 */
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

    // Web hard-codes `aria-live="assertive"` + `aria-atomic`. Android reads the
    // region itself via `accessibilityLiveRegion`; iOS has no live-region
    // support, so the composed sentence is announced imperatively.
    const announcement = useMemo(
        () => buildAnnouncement(heading, description),
        [heading, description]
    )
    useLiveRegionAnnounce(announcement, announce)

    const hasText = Boolean(heading || description)

    return (
        <Block
            ref={ref}
            testID={testID}
            // NOTE: `accessible` is deliberately NOT set here.
            //
            // In RN, marking a View as an accessibility element "groups its
            // children into a single selectable component" — which on iOS makes
            // the action links and the close button individually unreachable by
            // VoiceOver. Web has no such problem: `role="alert"` does not affect
            // whether nested buttons can be focused.
            //
            // `accessibilityRole="alert"` conveys the semantic without
            // collapsing the subtree, and each child keeps its own label.
            accessibilityRole="alert"
            accessibilityLabel={accessibilityLabel}
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
            {/* `ALERT_FLEX_BOX` sets flexShrink explicitly — Yoga defaults it
                to 0 where CSS defaults it to 1, so without it these boxes size
                to their content and a long description clips instead of
                wrapping. */}
            <Block
                {...ALERT_FLEX_BOX}
                flexDirection="row"
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
                    {...ALERT_FLEX_BOX}
                    flexDirection={layout.contentDirection}
                    justifyContent={layout.contentJustify}
                    alignItems={layout.contentAlign}
                    gap={tokens.mainContainer.content.gap[position]}
                >
                    <AlertText
                        heading={heading}
                        description={description}
                        type={type}
                        tokens={tokens.mainContainer.content.textContainer}
                    />
                    <AlertActions
                        actions={actions}
                        type={type}
                        tokens={tokens.mainContainer.content.actionContainer}
                        testID={testID}
                    />
                </Block>
            </Block>

            {showSeparator ? (
                <Separator
                    testID={testID ? `${testID}-separator` : undefined}
                />
            ) : null}

            {closeShown ? (
                <AlertClose
                    closeButton={closeButton}
                    color={String(tokens.mainContainer.closeButton.color[type])}
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
