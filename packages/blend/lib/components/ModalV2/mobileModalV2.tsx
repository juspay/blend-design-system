import React from 'react'
import Block from '../Primitives/Block/Block'
import { ButtonV2, ButtonV2Type } from '../ButtonV2'
import type { ModalV2Props } from './modalV2.types'
import { type SkeletonVariant } from '../Skeleton'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ModalV2TokensType } from './modalV2.tokens'
import ModalV2Skeleton from './ModalV2Skeleton'
import {
    DrawerV2,
    DrawerV2Body,
    DrawerV2Close,
    DrawerV2Content,
    DrawerV2Description,
    DrawerV2Footer,
    DrawerV2Header,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
} from '../DrawerV2'
import { XIcon } from '@phosphor-icons/react'
type MobileModalV2Props = ModalV2Props & {
    useDrawerOnMobile?: boolean
}

const MobileModalV2: React.FC<MobileModalV2Props> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    primaryAction,
    secondaryAction,
    showCloseButton = true,
    closeOnBackdropClick = true,
    headerSlot,
    skeleton,
    showDivider = true,
}) => {
    const modalTokens = useResponsiveTokens<ModalV2TokensType>('MODALV2')

    const shouldShowSkeleton = skeleton?.show
    const skeletonVariant: SkeletonVariant =
        (skeleton?.variant as SkeletonVariant) || 'pulse'

    const bodySkeletonWidth = '100%'
    const bodySkeletonHeight = skeleton?.bodySkeletonProps?.height || 200
    const paddingStyle = {
        paddingTop: modalTokens.header.paddingTop,
        paddingRight: modalTokens.header.paddingRight,
        paddingBottom: modalTokens.header.paddingBottom,
        paddingLeft: modalTokens.header.paddingLeft,
    }
    const contentClassName =
        'fixed z-[1001] bg-white shadow-xl outline-none flex flex-col overflow-hidden rounded-2xl border border-gray-200 max-h-[85vh]'
    const contentStyle = {
        left: modalTokens.overlay.offset,
        right: modalTokens.overlay.offset,
        bottom: modalTokens.overlay.offset,
    }

    return (
        <DrawerV2
            open={isOpen}
            onOpenChange={onClose}
            direction="bottom"
            modal={true}
            dismissible={closeOnBackdropClick}
        >
            <DrawerV2Portal>
                <DrawerV2Overlay
                    className={'fixed inset-0 z-[1000]'}
                    style={{
                        backgroundColor: modalTokens.overlay.backgroundColor,
                    }}
                />
                <DrawerV2Content
                    className={contentClassName}
                    style={contentStyle}
                >
                    {/* Header */}
                    {!shouldShowSkeleton ? (
                        <DrawerV2Header style={paddingStyle}>
                            <Block
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <DrawerV2Title>
                                    <Block
                                        display="flex"
                                        flexDirection="row"
                                        gap={modalTokens.header.slot.gap}
                                        color={
                                            modalTokens.header.text.title.color
                                        }
                                        fontWeight={
                                            modalTokens.header.text.title
                                                .fontWeight
                                        }
                                        fontSize={
                                            modalTokens.header.text.title
                                                .fontSize
                                        }
                                    >
                                        {title}
                                        {headerSlot}
                                    </Block>
                                </DrawerV2Title>
                                {showCloseButton && (
                                    <DrawerV2Close asChild>
                                        <XIcon
                                            size={modalTokens.closeButton.width}
                                            weight="bold"
                                            color={
                                                modalTokens.closeButton.color
                                            }
                                        />
                                    </DrawerV2Close>
                                )}
                            </Block>
                            <DrawerV2Description
                                style={{
                                    color: modalTokens.header.text.subtitle
                                        .color,
                                    fontWeight:
                                        modalTokens.header.text.subtitle
                                            .fontWeight,
                                    fontSize:
                                        modalTokens.header.text.subtitle
                                            .fontSize,
                                }}
                            >
                                {subtitle}
                            </DrawerV2Description>
                        </DrawerV2Header>
                    ) : (
                        <ModalV2Skeleton
                            modalTokens={modalTokens}
                            headerSkeleton={{
                                show: shouldShowSkeleton || false,
                                showCloseButton: showCloseButton || false,
                                showDivider: showDivider,
                            }}
                            skeletonVariant={skeletonVariant}
                        />
                    )}
                    {showDivider && !shouldShowSkeleton && (
                        <hr style={{ color: modalTokens.dividerColor }} />
                    )}
                    {/* Body */}
                    {!shouldShowSkeleton ? (
                        <DrawerV2Body
                            style={{ ...paddingStyle, overflowY: 'auto' }}
                        >
                            {children}
                        </DrawerV2Body>
                    ) : (
                        <Block style={paddingStyle}>
                            <ModalV2Skeleton
                                modalTokens={modalTokens}
                                bodySkeleton={{
                                    show: shouldShowSkeleton || false,
                                    width: bodySkeletonWidth,
                                    height: bodySkeletonHeight,
                                }}
                                skeletonVariant={skeletonVariant}
                            />
                        </Block>
                    )}
                    {showDivider && !shouldShowSkeleton && (
                        <hr style={{ color: modalTokens.dividerColor }} />
                    )}
                    {/* Footer */}
                    {(primaryAction || secondaryAction) && (
                        <DrawerV2Footer>
                            {!shouldShowSkeleton ? (
                                <Block
                                    display="flex"
                                    gap={modalTokens.footer.gap}
                                    justifyContent="flex-end"
                                    style={paddingStyle}
                                >
                                    {secondaryAction && (
                                        <ButtonV2
                                            buttonType={
                                                secondaryAction.buttonType ||
                                                ButtonV2Type.SECONDARY
                                            }
                                            text={secondaryAction.text}
                                            onClick={secondaryAction.onClick}
                                            disabled={secondaryAction.disabled}
                                            subType={secondaryAction.subType}
                                            size={secondaryAction.size}
                                            leftSlot={secondaryAction.leftSlot}
                                            rightSlot={
                                                secondaryAction.rightSlot
                                            }
                                            loading={secondaryAction.loading}
                                        />
                                    )}
                                    {primaryAction && (
                                        <ButtonV2
                                            buttonType={
                                                primaryAction.buttonType ||
                                                ButtonV2Type.PRIMARY
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
                            ) : (
                                <ModalV2Skeleton
                                    modalTokens={modalTokens}
                                    footerSkeleton={{
                                        show: shouldShowSkeleton || false,
                                        showDivider: showDivider,
                                    }}
                                    skeletonVariant={skeletonVariant}
                                />
                            )}
                        </DrawerV2Footer>
                    )}
                </DrawerV2Content>
            </DrawerV2Portal>
        </DrawerV2>
    )
}

export default MobileModalV2
