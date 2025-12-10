import { forwardRef, useCallback, useId } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import useScrollLock from '../../hooks/useScrollLock'
import type { ModalProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import type { ModalTokensType } from './modal.tokens'
import Text from '../Text/Text'
import { ButtonSubType, ButtonType, Button } from '../Button'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import MobileModal from './MobileModal'
import {
    modalBackdropAnimations,
    modalContentAnimations,
} from './modal.animations'
import { useModal } from './useModal'
import { type SkeletonVariant } from '../Skeleton'
import ModalSkeleton from './ModalSkeleton'

const AnimatedBackdrop = styled(Block)<{ $isAnimatingIn: boolean }>`
    ${({ $isAnimatingIn }) => modalBackdropAnimations($isAnimatingIn)}
`

const AnimatedModalContent = styled(Block)<{ $isAnimatingIn: boolean }>`
    ${({ $isAnimatingIn }) => modalContentAnimations($isAnimatingIn)}
`

const ModalHeader = ({
    title,
    subtitle,
    onClose,
    showCloseButton,
    headerRightSlot,
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
    headerRightSlot?: React.ReactNode
    showDivider?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    titleId?: string
    subtitleId?: string
}) => {
    const modalTokens = useResponsiveTokens<ModalTokensType>('MODAL')

    if (showSkeleton) {
        return (
            <ModalSkeleton
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
                modalTokens.header.padding.x +
                ' ' +
                modalTokens.header.padding.y
            }
            flexShrink={0}
            overflow="auto"
            maxHeight="20vh"
            gap={FOUNDATION_THEME.unit[16]}
            borderBottom={
                showDivider ? modalTokens.header.borderBottom : undefined
            }
        >
            <Block
                display="flex"
                flexDirection="column"
                flexGrow={1}
                gap={FOUNDATION_THEME.unit[4]}
            >
                <Block
                    display="flex"
                    alignItems="center"
                    gap={FOUNDATION_THEME.unit[8]}
                >
                    {title && (
                        <Text
                            id={titleId}
                            data-element="header"
                            data-id={title ?? ''}
                            variant="heading.sm"
                            as="span"
                            fontWeight={600}
                            color={modalTokens.header.text.title.color}
                        >
                            {title}
                        </Text>
                    )}
                    {headerRightSlot}
                </Block>
                {subtitle && (
                    <Text
                        id={subtitleId}
                        data-element="header-subtitle"
                        data-id={subtitle}
                        variant="code.lg"
                        color={modalTokens.header.text.subtitle.color}
                        fontWeight={400}
                    >
                        {subtitle}
                    </Text>
                )}
            </Block>
            {showCloseButton && (
                <Button
                    subType={ButtonSubType.INLINE}
                    buttonType={ButtonType.SECONDARY}
                    leadingIcon={<X size={16} aria-hidden="true" />}
                    onClick={onClose}
                    aria-label="Close modal"
                />
            )}
        </Block>
    )
}

const ModalFooter = ({
    primaryAction,
    secondaryAction,
    showDivider,
    showSkeleton,
    skeletonVariant,
}: {
    primaryAction?: ModalProps['primaryAction']
    secondaryAction?: ModalProps['secondaryAction']
    showDivider?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}) => {
    const modalTokens = useResponsiveTokens<ModalTokensType>('MODAL')

    if (showSkeleton) {
        return (
            <ModalSkeleton
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
            padding={modalTokens.footer.padding}
            flexShrink={0}
            borderTop={showDivider ? modalTokens.footer.borderTop : undefined}
            borderRadius={`0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`}
        >
            {secondaryAction && (
                <Button
                    buttonType={
                        secondaryAction.buttonType || ButtonType.SECONDARY
                    }
                    text={secondaryAction.text}
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled}
                    subType={secondaryAction.subType}
                    size={secondaryAction.size}
                    leadingIcon={secondaryAction.leadingIcon}
                    trailingIcon={secondaryAction.trailingIcon}
                    loading={secondaryAction.loading}
                />
            )}
            {primaryAction && (
                <Button
                    buttonType={primaryAction.buttonType || ButtonType.PRIMARY}
                    text={primaryAction.text}
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                    subType={primaryAction.subType}
                    size={primaryAction.size}
                    leadingIcon={primaryAction.leadingIcon}
                    trailingIcon={primaryAction.trailingIcon}
                    loading={primaryAction.loading}
                />
            )}
        </Block>
    )
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            isOpen,
            isCustom = false,
            onClose,
            title,
            subtitle,
            children,
            primaryAction,
            secondaryAction,
            showCloseButton = true,
            closeOnBackdropClick = true,
            headerRightSlot,
            showDivider = true,
            minWidth = '500px',
            maxWidth = 'calc(100vw - 156px)',
            useDrawerOnMobile = true,
            skeleton,
            ...props
        },
        ref
    ) => {
        const modalTokens = useResponsiveTokens<ModalTokensType>('MODAL')
        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < 1024
        const { shouldRender, isAnimatingIn, portalContainer } = useModal(
            isOpen,
            onClose
        )

        const baseId = useId()
        const titleId = title ? `${baseId}-title` : undefined
        const subtitleId = subtitle ? `${baseId}-subtitle` : undefined

        const ariaDescribedBy = subtitleId || undefined

        useScrollLock(isOpen)

        const handleBackdropClick = useCallback(() => {
            if (closeOnBackdropClick) {
                onClose()
            }
        }, [closeOnBackdropClick, onClose])

        if (!shouldRender || !portalContainer) return null

        const shouldShowSkeleton = skeleton?.show
        const skeletonVariant = skeleton?.variant || 'pulse'

        const modalContent = (() => {
            if (isMobile && useDrawerOnMobile) {
                return (
                    <MobileModal
                        isOpen={isOpen}
                        onClose={onClose}
                        skeleton={skeleton}
                        title={title}
                        subtitle={subtitle}
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        showCloseButton={showCloseButton}
                        closeOnBackdropClick={closeOnBackdropClick}
                        headerRightSlot={headerRightSlot}
                        showDivider={showDivider}
                    >
                        {children}
                    </MobileModal>
                )
            }

            return (
                <Block
                    position="fixed"
                    inset={0}
                    zIndex={99}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="auto"
                    padding={FOUNDATION_THEME.unit[16]}
                    boxShadow={modalTokens.boxShadow}
                    {...props}
                >
                    <AnimatedBackdrop
                        onClick={handleBackdropClick}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="fixed"
                        inset={0}
                        backgroundColor={FOUNDATION_THEME.colors.gray[700]}
                        pointerEvents="auto"
                        role="presentation"
                        aria-hidden="true"
                        $isAnimatingIn={isAnimatingIn}
                    />

                    <AnimatedModalContent
                        data-modal={title ?? 'modal'}
                        ref={ref}
                        display="flex"
                        flexDirection="column"
                        position="relative"
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                        maxHeight={'calc(100vh - 156px)'}
                        borderRadius={FOUNDATION_THEME.border.radius[12]}
                        boxShadow={FOUNDATION_THEME.shadows.xs}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        aria-label={title || 'Modal dialog'}
                        aria-describedby={ariaDescribedBy}
                        $isAnimatingIn={isAnimatingIn}
                    >
                        <ModalHeader
                            title={title}
                            subtitle={subtitle}
                            onClose={onClose}
                            showCloseButton={showCloseButton}
                            headerRightSlot={headerRightSlot}
                            showDivider={showDivider}
                            showSkeleton={shouldShowSkeleton}
                            skeletonVariant={skeletonVariant}
                            titleId={titleId}
                            subtitleId={subtitleId}
                        />

                        <Block
                            data-element="body"
                            padding={isCustom ? '0' : modalTokens.body.padding}
                            overflow="auto"
                            flexGrow={1}
                            borderRadius={
                                !primaryAction && !secondaryAction
                                    ? `0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`
                                    : undefined
                            }
                        >
                            {shouldShowSkeleton &&
                            skeleton?.bodySkeletonProps?.show ? (
                                <ModalSkeleton
                                    modalTokens={modalTokens}
                                    bodySkeleton={{
                                        show:
                                            skeleton?.bodySkeletonProps?.show ||
                                            false,
                                        width:
                                            skeleton?.bodySkeletonProps
                                                ?.width || '100%',
                                        height:
                                            skeleton?.bodySkeletonProps
                                                ?.height || 300,
                                    }}
                                    skeletonVariant={skeletonVariant}
                                />
                            ) : (
                                children
                            )}
                        </Block>

                        <ModalFooter
                            primaryAction={primaryAction}
                            secondaryAction={secondaryAction}
                            showDivider={showDivider}
                            showSkeleton={shouldShowSkeleton}
                            skeletonVariant={skeletonVariant}
                        />
                    </AnimatedModalContent>
                </Block>
            )
        })()

        return createPortal(modalContent, portalContainer)
    }
)

Modal.displayName = 'Modal'

export default Modal
