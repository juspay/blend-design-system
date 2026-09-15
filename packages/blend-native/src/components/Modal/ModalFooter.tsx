import { View } from 'react-native'
import { ButtonV2Size, ButtonV2Type } from '@juspay/blend-design-system/node'
import type { ModalV2TokensType } from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import { Button } from '../Button'
import type { ModalAction } from './modal.types'

/** Secondary/primary action row; the top divider follows `showDivider`. */
export function ModalFooter({
    primaryAction,
    secondaryAction,
    showDivider,
    tokens,
    testID,
}: {
    primaryAction?: ModalAction
    secondaryAction?: ModalAction
    showDivider: boolean
    tokens: ModalV2TokensType
    testID?: string
}) {
    if (!primaryAction && !secondaryAction) return null
    const footer = tokens.footer

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: parseDimension(footer.gap as string | number) ?? 12,
                paddingTop: parseDimension(
                    footer.paddingTop as string | number
                ),
                paddingBottom: parseDimension(
                    footer.paddingBottom as string | number
                ),
                paddingLeft: parseDimension(
                    footer.paddingLeft as string | number
                ),
                paddingRight: parseDimension(
                    footer.paddingRight as string | number
                ),
                backgroundColor: String(
                    footer.backgroundColor ?? 'transparent'
                ),
                ...(showDivider
                    ? {
                          ...parseBorder(String(footer.borderTop ?? 'none')),
                          borderTopWidth: 1,
                          borderBottomWidth: 0,
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                      }
                    : null),
            }}
            testID={testID}
        >
            {secondaryAction ? (
                <Button
                    text={secondaryAction.text}
                    buttonType={
                        secondaryAction.buttonType ?? ButtonV2Type.SECONDARY
                    }
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
                    buttonType={
                        primaryAction.buttonType ?? ButtonV2Type.PRIMARY
                    }
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

export default ModalFooter
