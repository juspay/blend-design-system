import { View } from 'react-native'
import {
    ButtonV2Size,
    ButtonV2Type,
    PopoverV2Size,
} from '@juspay/blend-design-system/node'
import type { PopoverV2TokenType } from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { Button } from '../Button'
import type { PopoverAction } from './popover.types'

/** Secondary/primary action row — the Alert pattern, rendered with Button. */
export function PopoverFooter({
    primaryAction,
    secondaryAction,
    size,
    tokens,
    testID,
}: {
    primaryAction?: PopoverAction
    secondaryAction?: PopoverAction
    size: PopoverV2Size
    tokens: PopoverV2TokenType
    testID?: string
}) {
    if (!primaryAction && !secondaryAction) return null

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap:
                    parseDimension(
                        tokens.bottomContainer.gap[size] as string | number
                    ) ?? 12,
            }}
            testID={testID}
        >
            {secondaryAction ? (
                <Button
                    text={secondaryAction.text}
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.SMALL}
                    onPress={secondaryAction.onPress}
                    disabled={secondaryAction.disabled}
                    loading={secondaryAction.loading}
                    accessibilityLabel={secondaryAction.accessibilityLabel}
                    testID={testID ? `${testID}-secondary` : undefined}
                />
            ) : null}
            {primaryAction ? (
                <Button
                    text={primaryAction.text}
                    buttonType={ButtonV2Type.PRIMARY}
                    size={ButtonV2Size.SMALL}
                    onPress={primaryAction.onPress}
                    disabled={primaryAction.disabled}
                    loading={primaryAction.loading}
                    accessibilityLabel={primaryAction.accessibilityLabel}
                    testID={testID ? `${testID}-primary` : undefined}
                />
            ) : null}
        </View>
    )
}

export default PopoverFooter
