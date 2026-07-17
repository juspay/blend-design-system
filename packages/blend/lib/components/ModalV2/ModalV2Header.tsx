import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ReactNode } from 'react'
import { SkeletonVariant } from '../Skeleton'
import type { ModalV2TokensType } from './modalV2.tokens.types'
import ModalV2Skeleton from './ModalV2Skeleton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ButtonV2, ButtonV2Type, ButtonV2SubType } from '../ButtonV2'
import { XIcon } from '@phosphor-icons/react'

const formatLineHeight = (value: string | number | undefined) =>
    typeof value === 'number' ? `${value}px` : value

const ModalV2Header = ({
    title,
    subtitle,
    onClose,
    showCloseButton,
    headerSlot,
    showDivider,
    showSkeleton,
    skeletonVariant,
    titleId,
    subtitleId,
}: {
    title?: string
    subtitle?: string
    onClose: () => void
    showCloseButton?: boolean
    headerSlot?: ReactNode
    showDivider?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    titleId?: string
    subtitleId?: string
}) => {
    const modalTokens = useResponsiveTokens<ModalV2TokensType>('MODALV2')

    if (showSkeleton) {
        return (
            <ModalV2Skeleton
                modalTokens={modalTokens}
                headerSkeleton={{
                    show: showSkeleton || false,
                    showDivider: showDivider || false,
                    showCloseButton: showCloseButton || false,
                }}
                skeletonVariant={
                    skeletonVariant || ('pulse' as SkeletonVariant)
                }
            />
        )
    }

    if (!title && !subtitle && !headerSlot && !showCloseButton) return null

    return (
        <Block
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            paddingTop={modalTokens.header.paddingTop}
            paddingRight={modalTokens.header.paddingRight}
            paddingBottom={modalTokens.header.paddingBottom}
            paddingLeft={modalTokens.header.paddingLeft}
            flexShrink={0}
            overflow="auto"
            maxHeight="20vh"
            gap={modalTokens.header.gap}
            backgroundColor={modalTokens.header.backgroundColor}
            borderTopLeftRadius={modalTokens.header.borderTopLeftRadius}
            borderTopRightRadius={modalTokens.header.borderTopRightRadius}
            borderBottom={
                showDivider ? modalTokens.header.borderBottom : undefined
            }
        >
            <Block display="flex" flexDirection="column">
                <Block
                    display="flex"
                    flexDirection="row"
                    gap={modalTokens.header.slot.gap}
                    alignItems="center"
                >
                    {title && (
                        <Text
                            id={titleId}
                            data-element="header"
                            data-id={title ?? ''}
                            as="span"
                            fontSize={modalTokens.header.text.title.fontSize}
                            fontWeight={
                                modalTokens.header.text.title.fontWeight
                            }
                            lineHeight={formatLineHeight(
                                modalTokens.header.text.title.lineHeight
                            )}
                            color={modalTokens.header.text.title.color}
                        >
                            {title}
                        </Text>
                    )}
                    {headerSlot}
                </Block>

                {subtitle && (
                    <Text
                        id={subtitleId}
                        data-element="header-subtitle"
                        data-id={subtitle}
                        as="span"
                        fontSize={modalTokens.header.text.subtitle.fontSize}
                        color={modalTokens.header.text.subtitle.color}
                        fontWeight={modalTokens.header.text.subtitle.fontWeight}
                        lineHeight={formatLineHeight(
                            modalTokens.header.text.subtitle.lineHeight
                        )}
                    >
                        {subtitle}
                    </Text>
                )}
            </Block>
            {showCloseButton && (
                <ButtonV2
                    subType={ButtonV2SubType.INLINE}
                    buttonType={ButtonV2Type.SECONDARY}
                    leftSlot={{
                        slot: (
                            <XIcon
                                size={modalTokens.closeButton.width}
                                color={modalTokens.closeButton.color}
                                aria-hidden="true"
                            />
                        ),
                        maxHeight: modalTokens.closeButton.height,
                    }}
                    onClick={onClose}
                    aria-label="Close modal"
                />
            )}
        </Block>
    )
}

export default ModalV2Header
