import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ButtonV2, ButtonV2Type } from '../ButtonV2'
import type { ModalV2TokensType } from './modalV2.tokens.types'
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
                    {...secondaryAction}
                    buttonType={
                        secondaryAction.buttonType || ButtonV2Type.SECONDARY
                    }
                />
            )}
            {primaryAction && (
                <ButtonV2
                    {...primaryAction}
                    buttonType={
                        primaryAction.buttonType || ButtonV2Type.PRIMARY
                    }
                />
            )}
        </Block>
    )
}

export default ModalV2Footer
