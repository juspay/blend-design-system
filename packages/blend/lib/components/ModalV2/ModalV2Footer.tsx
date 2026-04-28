import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ButtonV2, ButtonV2Type } from '../ButtonV2'
import { ModalV2TokensType } from './modalV2.tokens'
import { ModalV2Props } from './modalV2.types'
import { SkeletonVariant } from '../Skeleton'
import ModalV2Skeleton from './ModalV2Skeleton'

const ModalV2Footer = ({
    primaryAction,
    secondaryAction,
    showDivider,
    showSkeleton,
    skeletonVariant,
}: {
    primaryAction?: ModalV2Props['primaryAction']
    secondaryAction?: ModalV2Props['secondaryAction']
    showDivider?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}) => {
    const modalTokens = useResponsiveTokens<ModalV2TokensType>('MODALV2')

    if (showSkeleton) {
        return (
            <ModalV2Skeleton
                modalTokens={modalTokens}
                footerSkeleton={{
                    show: showSkeleton || false,
                    showDivider: showDivider || false,
                }}
                skeletonVariant={
                    skeletonVariant || ('pulse' as SkeletonVariant)
                }
            />
        )
    }

    if (!primaryAction && !secondaryAction) return null

    return (
        <Block
            data-element="footer"
            display="flex"
            backgroundColor={modalTokens.footer.backgroundColor}
            justifyContent="flex-end"
            gap={modalTokens.footer.gap}
            paddingTop={modalTokens.footer.paddingTop}
            paddingRight={modalTokens.footer.paddingRight}
            paddingBottom={modalTokens.footer.paddingBottom}
            paddingLeft={modalTokens.footer.paddingLeft}
            flexShrink={0}
            borderTop={showDivider ? modalTokens.footer.borderTop : undefined}
            borderRadius={`0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`}
        >
            {secondaryAction && (
                <ButtonV2
                    buttonType={
                        secondaryAction.buttonType || ButtonV2Type.SECONDARY
                    }
                    text={secondaryAction.text}
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled}
                    subType={secondaryAction.subType}
                    size={secondaryAction.size}
                    leftSlot={secondaryAction.leftSlot}
                    rightSlot={secondaryAction.rightSlot}
                    loading={secondaryAction.loading}
                />
            )}
            {primaryAction && (
                <ButtonV2
                    buttonType={
                        primaryAction.buttonType || ButtonV2Type.PRIMARY
                    }
                    text={primaryAction.text}
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                    subType={primaryAction.subType}
                    size={primaryAction.size}
                    leftSlot={primaryAction.leftSlot}
                    rightSlot={primaryAction.rightSlot}
                    loading={primaryAction.loading}
                />
            )}
        </Block>
    )
}

export default ModalV2Footer
