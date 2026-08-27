import { Pressable, View } from 'react-native'
import { X } from 'lucide-react-native'
import { PopoverV2Size } from '@juspay/blend-design-system/node'
import type { PopoverV2TokenType } from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'

/**
 * Heading/description block with the optional close button — shared by the
 * sheet and anchored presentations. Renders nothing when there is nothing
 * to show.
 */
export function PopoverHeader({
    heading,
    description,
    showCloseButton,
    onClose,
    size,
    tokens,
    testID,
}: {
    heading?: string
    description?: string
    showCloseButton: boolean
    onClose: () => void
    size: PopoverV2Size
    tokens: PopoverV2TokenType
    testID?: string
}) {
    if (!heading && !description && !showCloseButton) return null
    const top = tokens.TopContainer

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 8,
            }}
            testID={testID}
        >
            <View
                style={{
                    flex: 1,
                    gap: parseDimension(top.gap[size] as string | number) ?? 8,
                }}
            >
                {heading ? (
                    <Text
                        color={String(top.heading.color ?? '#181B25')}
                        fontSize={top.heading.fontSize[size] as string | number}
                        fontWeight={
                            top.heading.fontWeight[size] as string | number
                        }
                        lineHeight={
                            top.heading.lineHeight[size] as string | number
                        }
                        accessibilityRole="header"
                    >
                        {heading}
                    </Text>
                ) : null}
                {description ? (
                    <Text
                        color={String(top.description.color ?? '#717784')}
                        fontSize={
                            top.description.fontSize[size] as string | number
                        }
                        fontWeight={
                            top.description.fontWeight[size] as string | number
                        }
                        lineHeight={
                            top.description.lineHeight[size] as string | number
                        }
                    >
                        {description}
                    </Text>
                ) : null}
            </View>
            {showCloseButton ? (
                <Pressable
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                    hitSlop={8}
                    testID={testID ? `${testID}-close` : undefined}
                >
                    <X
                        size={
                            parseDimension(
                                top.heading.IconSize[size] as string | number
                            ) ?? 18
                        }
                        color={String(top.description.color ?? '#717784')}
                    />
                </Pressable>
            ) : null}
        </View>
    )
}

export default PopoverHeader
