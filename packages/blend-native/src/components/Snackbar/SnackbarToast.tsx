import { View, Pressable as RNPressable } from 'react-native'
import {
    CircleAlert,
    CircleCheckBig,
    Info,
    TriangleAlert,
    X,
} from 'lucide-react-native'
import { SnackbarV2Variant } from '@juspay/blend-design-system/node'
import type { SnackbarV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import {
    parseBorderRadius,
    parseBoxShadow,
    parseDimension,
} from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import Slot from '../../primitives/Slot'
import type { SnackbarOptions } from './snackbar.types'

const VARIANT_ICON = {
    [SnackbarV2Variant.INFO]: Info,
    [SnackbarV2Variant.SUCCESS]: CircleCheckBig,
    [SnackbarV2Variant.WARNING]: TriangleAlert,
    [SnackbarV2Variant.ERROR]: CircleAlert,
} as const

/**
 * The styled toast body `addSnackbar` mounts through the host — web's
 * `StyledToast`, from the same SNACKBARV2 tokens. Rendered inside the
 * provider's toast outlet, so `useNativeTokens` resolves normally.
 */
export function SnackbarToast({
    options,
    dismiss,
}: {
    options: SnackbarOptions
    dismiss: () => void
}) {
    const tokens = useNativeTokens<SnackbarV2TokensType>('SNACKBARV2')
    const variant = options.variant ?? SnackbarV2Variant.INFO
    const Icon = VARIANT_ICON[variant]

    const text = tokens.mainContainer.content.textContainer
    const action = tokens.mainContainer.content.actionContainer.primaryAction
    const iconSize = parseDimension(tokens.slot.width as string | number) ?? 16
    const radius = parseBorderRadius(tokens.borderRadius as string | number)

    const handleClose = () => {
        dismiss()
        options.onClose?.()
    }

    const handleAction = () => {
        options.actionButton?.onPress()
        if (options.actionButton?.autoDismiss !== false) dismiss()
    }

    return (
        <View
            testID={options.testID ?? 'blend-snackbar'}
            style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                backgroundColor: String(tokens.backgroundColor),
                padding:
                    parseDimension(tokens.padding as string | number) ?? 16,
                gap: parseDimension(tokens.gap as string | number) ?? 8,
                ...(typeof radius === 'number'
                    ? { borderRadius: radius }
                    : (radius ?? {})),
                ...(parseBoxShadow(String(tokens.boxShadow)) ?? {}),
            }}
        >
            <Slot maxHeight={iconSize}>
                {options.slot ?? (
                    <Icon
                        size={iconSize}
                        color={String(tokens.slot.color[variant])}
                    />
                )}
            </Slot>
            <View
                style={{
                    flexShrink: 1,
                    flexGrow: 1,
                    gap:
                        parseDimension(
                            tokens.mainContainer.content.gap as string | number
                        ) ?? 4,
                }}
            >
                <Text
                    fontSize={text.header.fontSize as string | number}
                    fontWeight={text.header.fontWeight as string | number}
                    lineHeight={text.header.lineHeight as string | number}
                    color={String(text.header.color[variant])}
                >
                    {options.header}
                </Text>
                {options.description ? (
                    <Text
                        fontSize={text.description.fontSize as string | number}
                        fontWeight={
                            text.description.fontWeight as string | number
                        }
                        lineHeight={
                            text.description.lineHeight as string | number
                        }
                        color={String(text.description.color[variant])}
                    >
                        {options.description}
                    </Text>
                ) : null}
                {options.actionButton ? (
                    <RNPressable
                        onPress={handleAction}
                        accessibilityRole="button"
                        accessibilityLabel={options.actionButton.label}
                        hitSlop={8}
                        style={{ alignSelf: 'flex-start' }}
                        testID={`${options.testID ?? 'blend-snackbar'}-action`}
                    >
                        <Text
                            fontSize={action.fontSize as string | number}
                            fontWeight={action.fontWeight as string | number}
                            color={String(action.color[variant])}
                        >
                            {options.actionButton.label}
                        </Text>
                    </RNPressable>
                ) : null}
            </View>
            <RNPressable
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel="Dismiss notification"
                hitSlop={8}
                testID={`${options.testID ?? 'blend-snackbar'}-close`}
            >
                <X
                    size={
                        parseDimension(
                            tokens.mainContainer.closeButton.height as
                                | string
                                | number
                        ) ?? 16
                    }
                    color={String(
                        tokens.mainContainer.closeButton.color[variant]
                    )}
                />
            </RNPressable>
        </View>
    )
}

SnackbarToast.displayName = 'SnackbarToast'
