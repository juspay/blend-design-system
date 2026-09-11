import { Pressable, View } from 'react-native'
import { X } from 'lucide-react-native'
import type { ModalV2TokensType } from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'

/**
 * Title/subtitle block with the header slot and close button. The divider
 * under the header follows `showDivider` (the token's `borderBottom`).
 * `header.maxHeight` is "20vh" on web — a viewport unit the adapters
 * reject by design; the native header sizes to its content instead
 * (grammar-contract exception).
 */
export function ModalHeader({
    title,
    subtitle,
    headerSlot,
    showCloseButton,
    showDivider,
    onClose,
    tokens,
    testID,
}: {
    title?: string
    subtitle?: string
    headerSlot?: React.ReactNode
    showCloseButton: boolean
    showDivider: boolean
    onClose: () => void
    tokens: ModalV2TokensType
    testID?: string
}) {
    const header = tokens.header
    if (!title && !subtitle && !headerSlot && !showCloseButton) return null

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: parseDimension(header.slot.gap as string | number) ?? 8,
                paddingTop: parseDimension(
                    header.paddingTop as string | number
                ),
                paddingBottom: parseDimension(
                    header.paddingBottom as string | number
                ),
                paddingLeft: parseDimension(
                    header.paddingLeft as string | number
                ),
                paddingRight: parseDimension(
                    header.paddingRight as string | number
                ),
                backgroundColor: String(
                    header.backgroundColor ?? 'transparent'
                ),
                ...(showDivider
                    ? parseBorder(String(header.borderBottom ?? 'none'))
                    : null),
                ...(showDivider ? { borderBottomWidth: 1 } : null),
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
            }}
            testID={testID}
        >
            <View style={{ flex: 1, gap: 4 }}>
                {title ? (
                    <Text
                        color={String(header.text.title.color ?? '#2B303B')}
                        fontSize={header.text.title.fontSize as string | number}
                        fontWeight={
                            header.text.title.fontWeight as string | number
                        }
                        lineHeight={
                            header.text.title.lineHeight as string | number
                        }
                        accessibilityRole="header"
                    >
                        {title}
                    </Text>
                ) : null}
                {subtitle ? (
                    <Text
                        color={String(header.text.subtitle.color ?? '#525866')}
                        fontSize={
                            header.text.subtitle.fontSize as string | number
                        }
                        fontWeight={
                            header.text.subtitle.fontWeight as string | number
                        }
                        lineHeight={
                            header.text.subtitle.lineHeight as string | number
                        }
                    >
                        {subtitle}
                    </Text>
                ) : null}
            </View>
            {headerSlot}
            {showCloseButton ? (
                <Pressable
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                    hitSlop={8}
                    testID={testID ? `${testID}-close` : undefined}
                >
                    <X
                        size={18}
                        color={String(tokens.closeButton.color ?? '#717784')}
                    />
                </Pressable>
            ) : null}
        </View>
    )
}

export default ModalHeader
