import React from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
    DrawerOverlay,
    DrawerPortal,
} from '../Drawer'
import { X } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import { ButtonSubType, ButtonType, Button } from '../Button'
import type { PopoverProps } from './types'
import { PopoverSize } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { type SkeletonVariant } from '../Skeleton'
import type { PopoverTokenType } from './popover.tokens'
import PopoverSkeleton from './PopoverSkeleton'

type MobilePopoverProps = PopoverProps & {
    useDrawerOnMobile?: boolean
}

const MobilePopover: React.FC<MobilePopoverProps> = ({
    open,
    onOpenChange,
    heading,
    description,
    children,
    primaryAction,
    secondaryAction,
    showCloseButton = true,
    onClose,
    trigger,
    skeleton,
    size = PopoverSize.MEDIUM,
}) => {
    const popoverTokens = useResponsiveTokens<PopoverTokenType>('POPOVER')

    const shouldShowSkeleton = skeleton?.show
    const skeletonVariant: SkeletonVariant =
        (skeleton?.variant as SkeletonVariant) || 'pulse'

    const bodySkeletonWidth = skeleton?.bodySkeletonProps?.width || '100%'
    const bodySkeletonHeight = skeleton?.bodySkeletonProps?.height || 200

    return (
        <Drawer
            open={open}
            onOpenChange={(isOpen) => {
                if (onOpenChange) {
                    onOpenChange(isOpen)
                }
                if (!isOpen && onClose) {
                    onClose()
                }
            }}
            direction="bottom"
            modal={true}
            dismissible={true}
        >
            <DrawerTrigger>{trigger}</DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction="bottom"
                    showHandle={true}
                    contentDriven={true}
                >
                    {(heading || description || shouldShowSkeleton) && (
                        <DrawerHeader>
                            {shouldShowSkeleton ? (
                                <Block
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                    gap={FOUNDATION_THEME.unit[16]}
                                >
                                    <Block
                                        display="flex"
                                        flexDirection="column"
                                        flexGrow={1}
                                        gap={FOUNDATION_THEME.unit[4]}
                                    >
                                        <PopoverSkeleton
                                            popoverTokens={popoverTokens}
                                            size={size}
                                            headerSkeleton={{
                                                show:
                                                    shouldShowSkeleton || false,
                                                showCloseButton:
                                                    showCloseButton || false,
                                            }}
                                            skeletonVariant={skeletonVariant}
                                        />
                                    </Block>
                                </Block>
                            ) : (
                                <Block
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                    gap={FOUNDATION_THEME.unit[16]}
                                >
                                    <Block
                                        display="flex"
                                        flexDirection="column"
                                        flexGrow={1}
                                        gap={FOUNDATION_THEME.unit[4]}
                                    >
                                        {heading && (
                                            <DrawerTitle>{heading}</DrawerTitle>
                                        )}
                                        {description && (
                                            <DrawerDescription>
                                                {description}
                                            </DrawerDescription>
                                        )}
                                    </Block>
                                    {showCloseButton && (
                                        <DrawerClose>
                                            <Button
                                                subType={ButtonSubType.INLINE}
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                leadingIcon={<X size={16} />}
                                                onClick={() => {
                                                    if (onOpenChange) {
                                                        onOpenChange(false)
                                                    }
                                                    if (onClose) {
                                                        onClose()
                                                    }
                                                }}
                                            />
                                        </DrawerClose>
                                    )}
                                </Block>
                            )}
                        </DrawerHeader>
                    )}

                    <DrawerBody>
                        {shouldShowSkeleton &&
                        skeleton?.bodySkeletonProps?.show ? (
                            <PopoverSkeleton
                                popoverTokens={popoverTokens}
                                size={size}
                                bodySkeleton={{
                                    show:
                                        skeleton?.bodySkeletonProps?.show ||
                                        false,
                                    width: bodySkeletonWidth,
                                    height: bodySkeletonHeight,
                                }}
                                skeletonVariant={skeletonVariant}
                            />
                        ) : (
                            children
                        )}
                    </DrawerBody>

                    {(primaryAction || secondaryAction) && (
                        <DrawerFooter>
                            {shouldShowSkeleton ? (
                                <PopoverSkeleton
                                    popoverTokens={popoverTokens}
                                    size={size}
                                    footerSkeleton={{
                                        show: shouldShowSkeleton || false,
                                    }}
                                    skeletonVariant={skeletonVariant}
                                />
                            ) : (
                                <>
                                    {secondaryAction && (
                                        <Button
                                            {...secondaryAction}
                                            subType={ButtonSubType.INLINE}
                                        />
                                    )}
                                    {primaryAction && (
                                        <Button
                                            {...primaryAction}
                                            subType={ButtonSubType.INLINE}
                                        />
                                    )}
                                </>
                            )}
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobilePopover
