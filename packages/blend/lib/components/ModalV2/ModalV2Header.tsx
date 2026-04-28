import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SkeletonVariant } from '../Skeleton'
import { ModalV2TokensType } from './modalV2.tokens'
import ModalV2Skeleton from './ModalV2Skeleton'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ButtonV2, ButtonV2Type, ButtonV2SubType } from '../ButtonV2'
import { XIcon } from '@phosphor-icons/react'

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
    headerSlot?: React.ReactNode
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

    if (!title && !subtitle) return null

    return (
        <Block
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            padding={
                modalTokens.header.paddingTop +
                ' ' +
                modalTokens.header.paddingBottom
            }
            flexShrink={0}
            overflow="auto"
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
                            variant="heading.sm"
                            as="span"
                            fontWeight={
                                modalTokens.header.text.title.fontWeight
                            }
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
                        variant="code.lg"
                        color={modalTokens.header.text.subtitle.color}
                        fontWeight={modalTokens.header.text.subtitle.fontWeight}
                    >
                        {subtitle}
                    </Text>
                )}
            </Block>
            {showCloseButton && (
                <ButtonV2
                    subType={ButtonV2SubType.INLINE}
                    buttonType={ButtonV2Type.SECONDARY}
                    leftSlot={{ slot: <XIcon size={16} aria-hidden="true" /> }}
                    onClick={onClose}
                    aria-label="Close modal"
                />
            )}
        </Block>
    )
}

export default ModalV2Header
