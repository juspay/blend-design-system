import React, { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { ButtonV2, ButtonV2SubType, ButtonV2Type } from '../ButtonV2'
import type { ModalV2Props } from './modalV2.types'
import { type SkeletonVariant } from '../Skeleton'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ModalV2TokensType } from './modalV2.tokens.types'
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
type MobileModalV2Props = ModalV2Props

const formatLineHeight = (value: string | number | undefined) =>
    typeof value === 'number' ? `${value}px` : value

const visuallyHiddenStyle: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
}

const MobileModalV2 = forwardRef<HTMLDivElement, MobileModalV2Props>(
    (
        {
            isOpen,
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
            skeleton,
            showDivider = true,
            ...props
        },
        ref
    ) => {
        const modalTokens = useResponsiveTokens<ModalV2TokensType>('MODALV2')

        const shouldShowSkeleton = skeleton?.show
        const skeletonVariant: SkeletonVariant =
            (skeleton?.variant as SkeletonVariant) || 'pulse'

        const bodySkeletonWidth = skeleton?.bodySkeletonProps?.width || '100%'
        const bodySkeletonHeight = skeleton?.bodySkeletonProps?.height || 200
        const headerPaddingStyle = {
            paddingTop: modalTokens.header.paddingTop,
            paddingRight: modalTokens.header.paddingRight,
            paddingBottom: modalTokens.header.paddingBottom,
            paddingLeft: modalTokens.header.paddingLeft,
        }
        const bodyPaddingStyle = {
            paddingTop: modalTokens.body.paddingTop,
            paddingRight: modalTokens.body.paddingRight,
            paddingBottom: modalTokens.body.paddingBottom,
            paddingLeft: modalTokens.body.paddingLeft,
        }
        const footerPaddingStyle = {
            paddingTop: modalTokens.footer.paddingTop,
            paddingRight: modalTokens.footer.paddingRight,
            paddingBottom: modalTokens.footer.paddingBottom,
            paddingLeft: modalTokens.footer.paddingLeft,
        }
        const contentClassName =
            'fixed z-[1001] outline-none flex flex-col overflow-hidden max-h-[85vh]'
        const contentStyle = {
            left: modalTokens.overlay.offset,
            right: modalTokens.overlay.offset,
            bottom: modalTokens.overlay.offset,
            backgroundColor: modalTokens.backgroundColor,
            boxShadow: modalTokens.boxShadow,
            borderRadius: modalTokens.borderRadius,
            border: `1px solid ${modalTokens.divider.borderColor}`,
            height: 'auto',
        }
        const shouldShowBodySkeleton = Boolean(
            shouldShowSkeleton && skeleton?.bodySkeletonProps?.show
        )
        const hasFooterContent = Boolean(
            customFooter ||
            primaryAction ||
            secondaryAction ||
            shouldShowSkeleton
        )
        const {
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            'aria-describedby': ariaDescribedBy,
            ...contentProps
        } = props
        const shouldUseGeneratedTitle = Boolean(
            showHeader && !customHeader && title
        )
        const effectiveAriaLabel =
            ariaLabel ??
            (ariaLabelledBy || shouldUseGeneratedTitle
                ? undefined
                : title || 'Modal dialog')
        const hiddenTitle = ariaLabel || title || 'Modal dialog'

        return (
            <DrawerV2
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) onClose()
                }}
                direction="bottom"
                modal={true}
                dismissible={closeOnBackdropClick}
            >
                <DrawerV2Portal>
                    <DrawerV2Overlay
                        className={'fixed inset-0 z-[1000]'}
                        style={{
                            backgroundColor:
                                modalTokens.overlay.backgroundColor,
                        }}
                    />
                    <DrawerV2Content
                        {...contentProps}
                        ref={ref}
                        className={contentClassName}
                        style={contentStyle}
                        aria-label={effectiveAriaLabel}
                        aria-labelledby={ariaLabelledBy}
                        aria-describedby={ariaDescribedBy}
                    >
                        {!shouldUseGeneratedTitle && (
                            <DrawerV2Title style={visuallyHiddenStyle}>
                                {hiddenTitle}
                            </DrawerV2Title>
                        )}
                        <Block
                            alignSelf="center"
                            flexShrink={0}
                            width="48px"
                            height="4px"
                            borderRadius="999px"
                            backgroundColor={modalTokens.divider.borderColor}
                            marginTop="8px"
                            marginBottom="4px"
                            aria-hidden="true"
                        />
                        {/* Header */}
                        {showHeader &&
                            (customHeader ??
                                (!shouldShowSkeleton ? (
                                    <DrawerV2Header style={headerPaddingStyle}>
                                        <Block
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Block
                                                display="flex"
                                                flexDirection="column"
                                                gap={
                                                    modalTokens.header.slot.gap
                                                }
                                            >
                                                {(title || headerSlot) && (
                                                    <DrawerV2Title>
                                                        <Block
                                                            display="flex"
                                                            flexDirection="row"
                                                            gap={
                                                                modalTokens
                                                                    .header.slot
                                                                    .gap
                                                            }
                                                            color={
                                                                modalTokens
                                                                    .header.text
                                                                    .title.color
                                                            }
                                                            fontWeight={
                                                                modalTokens
                                                                    .header.text
                                                                    .title
                                                                    .fontWeight
                                                            }
                                                            fontSize={
                                                                modalTokens
                                                                    .header.text
                                                                    .title
                                                                    .fontSize
                                                            }
                                                            lineHeight={formatLineHeight(
                                                                modalTokens
                                                                    .header.text
                                                                    .title
                                                                    .lineHeight
                                                            )}
                                                        >
                                                            {title}
                                                            {headerSlot}
                                                        </Block>
                                                    </DrawerV2Title>
                                                )}
                                                {subtitle && (
                                                    <DrawerV2Description
                                                        style={{
                                                            color: modalTokens
                                                                .header.text
                                                                .subtitle.color,
                                                            fontWeight:
                                                                modalTokens
                                                                    .header.text
                                                                    .subtitle
                                                                    .fontWeight,
                                                            fontSize:
                                                                modalTokens
                                                                    .header.text
                                                                    .subtitle
                                                                    .fontSize,
                                                            lineHeight:
                                                                formatLineHeight(
                                                                    modalTokens
                                                                        .header
                                                                        .text
                                                                        .subtitle
                                                                        .lineHeight
                                                                ),
                                                        }}
                                                    >
                                                        {subtitle}
                                                    </DrawerV2Description>
                                                )}
                                            </Block>
                                            {showCloseButton && (
                                                <DrawerV2Close asChild>
                                                    <ButtonV2
                                                        subType={
                                                            ButtonV2SubType.INLINE
                                                        }
                                                        buttonType={
                                                            ButtonV2Type.SECONDARY
                                                        }
                                                        leftSlot={{
                                                            slot: (
                                                                <XIcon
                                                                    size={
                                                                        modalTokens
                                                                            .closeButton
                                                                            .width
                                                                    }
                                                                    color={
                                                                        modalTokens
                                                                            .closeButton
                                                                            .color
                                                                    }
                                                                    aria-hidden="true"
                                                                />
                                                            ),
                                                            maxHeight:
                                                                modalTokens
                                                                    .closeButton
                                                                    .height,
                                                        }}
                                                        aria-label="Close modal"
                                                    />
                                                </DrawerV2Close>
                                            )}
                                        </Block>
                                    </DrawerV2Header>
                                ) : (
                                    <ModalV2Skeleton
                                        modalTokens={modalTokens}
                                        headerSkeleton={{
                                            show: shouldShowSkeleton || false,
                                            showCloseButton:
                                                showCloseButton || false,
                                            showDivider: showDivider,
                                        }}
                                        skeletonVariant={skeletonVariant}
                                    />
                                )))}
                        {showHeader && showDivider && !shouldShowSkeleton && (
                            <hr
                                style={{
                                    borderColor:
                                        modalTokens.divider.borderColor,
                                }}
                            />
                        )}
                        {/* Body */}
                        {!shouldShowBodySkeleton ? (
                            <DrawerV2Body
                                style={{
                                    ...bodyPaddingStyle,
                                    borderRadius:
                                        !showFooter || !hasFooterContent
                                            ? `0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`
                                            : undefined,
                                    flex: '1 1 auto',
                                    minHeight: 0,
                                    overflowY: 'auto',
                                }}
                            >
                                {children}
                            </DrawerV2Body>
                        ) : (
                            <Block
                                style={{
                                    ...bodyPaddingStyle,
                                    borderRadius:
                                        !showFooter || !hasFooterContent
                                            ? `0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`
                                            : undefined,
                                }}
                            >
                                <ModalV2Skeleton
                                    modalTokens={modalTokens}
                                    bodySkeleton={{
                                        show: true,
                                        width: bodySkeletonWidth,
                                        height: bodySkeletonHeight,
                                    }}
                                    skeletonVariant={skeletonVariant}
                                />
                            </Block>
                        )}
                        {showFooter &&
                            hasFooterContent &&
                            showDivider &&
                            !shouldShowSkeleton && (
                                <hr
                                    style={{
                                        borderColor:
                                            modalTokens.divider.borderColor,
                                    }}
                                />
                            )}
                        {/* Footer */}
                        {showFooter && hasFooterContent && (
                            <DrawerV2Footer>
                                {customFooter ??
                                    (!shouldShowSkeleton ? (
                                        <Block
                                            display="flex"
                                            gap={modalTokens.footer.gap}
                                            justifyContent="flex-end"
                                            style={footerPaddingStyle}
                                        >
                                            {secondaryAction && (
                                                <ButtonV2
                                                    {...secondaryAction}
                                                    buttonType={
                                                        secondaryAction.buttonType ||
                                                        ButtonV2Type.SECONDARY
                                                    }
                                                />
                                            )}
                                            {primaryAction && (
                                                <ButtonV2
                                                    {...primaryAction}
                                                    buttonType={
                                                        primaryAction.buttonType ||
                                                        ButtonV2Type.PRIMARY
                                                    }
                                                />
                                            )}
                                        </Block>
                                    ) : (
                                        <ModalV2Skeleton
                                            modalTokens={modalTokens}
                                            footerSkeleton={{
                                                show:
                                                    shouldShowSkeleton || false,
                                                showDivider: showDivider,
                                            }}
                                            skeletonVariant={skeletonVariant}
                                        />
                                    ))}
                            </DrawerV2Footer>
                        )}
                    </DrawerV2Content>
                </DrawerV2Portal>
            </DrawerV2>
        )
    }
)

MobileModalV2.displayName = 'MobileModalV2'

export default MobileModalV2
