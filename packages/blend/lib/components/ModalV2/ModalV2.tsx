import { forwardRef, useCallback } from 'react'
import { ModalV2Props } from './modalV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ModalV2TokensType } from './modalV2.tokens.types'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { useModal } from '../Modal/useModal'
import { useId } from 'react'
import Block from '../Primitives/Block/Block'
import MobileModalV2 from './mobileModalV2'
import styled from 'styled-components'
import { modalBackdropAnimationsV2 } from './modalAnimationV2'
import { modalContentAnimationsV2 } from './modalAnimationV2'
import ModalV2Header from './ModalV2Header'
import ModalV2Skeleton from './ModalV2Skeleton'
import ModalV2Footer from './ModalV2Footer'
import { createPortal } from 'react-dom'
import { filterBlockedProps } from '../../utils/prop-helpers'

const AnimatedBackdrop = styled(Block)<{ $isAnimatingIn: boolean }>`
    ${({ $isAnimatingIn }) => modalBackdropAnimationsV2($isAnimatingIn)}
`

const AnimatedModalContent = styled(Block)<{ $isAnimatingIn: boolean }>`
    ${({ $isAnimatingIn }) => modalContentAnimationsV2($isAnimatingIn)}
`

const ModalV2 = forwardRef<HTMLDivElement, ModalV2Props>(
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
            showHeader = true,
            showFooter = true,
            closeOnBackdropClick = true,
            customHeader,
            customFooter,
            headerSlot,
            showDivider = true,
            minWidth = '',
            minHeight = '',
            maxWidth = '90vw',
            maxHeight = '90vh',
            useDrawerOnMobile = true,
            skeleton,
            ...props
        },
        ref
    ) => {
        const filteredRest = filterBlockedProps(props)
        const {
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            'aria-describedby': ariaDescribedBy,
            ...dialogProps
        } = filteredRest
        const modalTokens = useResponsiveTokens<ModalV2TokensType>('MODALV2')
        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < 1024
        const { shouldRender, isAnimatingIn, portalContainer } = useModal(
            isOpen,
            onClose
        )

        const baseId = useId()
        const shouldUseGeneratedHeader = showHeader && !customHeader
        const titleId =
            shouldUseGeneratedHeader && title ? `${baseId}-title` : undefined
        const subtitleId =
            shouldUseGeneratedHeader && subtitle
                ? `${baseId}-subtitle`
                : undefined

        const handleBackdropClick = useCallback(() => {
            if (closeOnBackdropClick) {
                onClose()
            }
        }, [closeOnBackdropClick, onClose])

        if (!shouldRender || !portalContainer) return null

        const shouldShowSkeleton = skeleton?.show
        const skeletonVariant = skeleton?.variant || 'pulse'
        const shouldShowBodySkeleton = Boolean(
            shouldShowSkeleton && skeleton?.bodySkeletonProps?.show
        )
        const hasFooterContent = Boolean(
            customFooter ||
            primaryAction ||
            secondaryAction ||
            shouldShowSkeleton
        )

        const modalContent = (() => {
            if (isMobile && useDrawerOnMobile) {
                return (
                    <MobileModalV2
                        isOpen={isOpen}
                        onClose={onClose}
                        skeleton={skeleton}
                        title={title}
                        subtitle={subtitle}
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        showCloseButton={showCloseButton}
                        showHeader={showHeader}
                        showFooter={showFooter}
                        closeOnBackdropClick={closeOnBackdropClick}
                        customHeader={customHeader}
                        customFooter={customFooter}
                        headerSlot={headerSlot}
                        showDivider={showDivider}
                        ref={ref}
                        {...filteredRest}
                    >
                        {children}
                    </MobileModalV2>
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
                    boxShadow={modalTokens.boxShadow}
                    paddingTop={modalTokens.paddingTop}
                    paddingRight={modalTokens.paddingRight}
                    paddingBottom={modalTokens.paddingBottom}
                    paddingLeft={modalTokens.paddingLeft}
                >
                    <AnimatedBackdrop
                        onClick={handleBackdropClick}
                        position="absolute"
                        inset={0}
                        backgroundColor={modalTokens.overlay.backgroundColor}
                        pointerEvents="auto"
                        role="presentation"
                        aria-hidden="true"
                        zIndex={0}
                        $isAnimatingIn={isAnimatingIn}
                    />

                    <AnimatedModalContent
                        {...dialogProps}
                        data-modal={title ?? 'modal'}
                        ref={ref}
                        display="flex"
                        flexDirection="column"
                        position="relative"
                        backgroundColor={modalTokens.backgroundColor}
                        minWidth={minWidth}
                        minHeight={minHeight}
                        maxWidth={maxWidth}
                        maxHeight={maxHeight}
                        borderRadius={modalTokens.borderRadius}
                        boxShadow={modalTokens.boxShadow}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={
                            ariaLabel ? undefined : (ariaLabelledBy ?? titleId)
                        }
                        aria-label={
                            ariaLabel ??
                            (ariaLabelledBy || titleId
                                ? undefined
                                : title || 'Modal dialog')
                        }
                        aria-describedby={ariaDescribedBy ?? subtitleId}
                        zIndex={1}
                        pointerEvents="auto"
                        $isAnimatingIn={isAnimatingIn}
                    >
                        {showHeader &&
                            (customHeader ?? (
                                <ModalV2Header
                                    title={title}
                                    subtitle={subtitle}
                                    onClose={onClose}
                                    showCloseButton={showCloseButton}
                                    headerSlot={headerSlot}
                                    showDivider={showDivider}
                                    showSkeleton={shouldShowSkeleton}
                                    skeletonVariant={skeletonVariant}
                                    titleId={titleId}
                                    subtitleId={subtitleId}
                                />
                            ))}

                        <Block
                            data-element="body"
                            paddingTop={
                                isCustom ? '0' : modalTokens.body.paddingTop
                            }
                            paddingRight={
                                isCustom ? '0' : modalTokens.body.paddingRight
                            }
                            paddingBottom={
                                isCustom ? '0' : modalTokens.body.paddingBottom
                            }
                            paddingLeft={
                                isCustom ? '0' : modalTokens.body.paddingLeft
                            }
                            overflow="auto"
                            flexShrink={1}
                            minHeight={0}
                            borderRadius={
                                !showFooter || !hasFooterContent
                                    ? `0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`
                                    : undefined
                            }
                        >
                            {shouldShowBodySkeleton ? (
                                <ModalV2Skeleton
                                    modalTokens={modalTokens}
                                    bodySkeleton={{
                                        show: true,
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

                        {showFooter &&
                            (customFooter ?? (
                                <ModalV2Footer
                                    primaryAction={primaryAction}
                                    secondaryAction={secondaryAction}
                                    showDivider={showDivider}
                                    showSkeleton={shouldShowSkeleton}
                                    skeletonVariant={skeletonVariant}
                                />
                            ))}
                    </AnimatedModalContent>
                </Block>
            )
        })()

        return createPortal(modalContent, portalContainer)
    }
)

ModalV2.displayName = 'ModalV2'

export default ModalV2
