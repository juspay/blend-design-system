import React, { useId } from 'react'
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
import type { PopoverV2Props } from './popoverV2.types'
import { PopoverV2Size } from './popoverV2.types'
import { FOUNDATION_THEME } from '../../tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { type SkeletonVariant } from '../Skeleton'
import type { PopoverV2TokenType } from './popoverV2.token'
import PopoverV2Skeleton from './PopoverV2Skeleton'

type MobilePopoverV2Props = PopoverV2Props & {
    useDrawerOnMobile?: boolean
}

const MobilePopoverV2: React.FC<MobilePopoverV2Props> = ({
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
    size = PopoverV2Size.MD,
}) => {
    const popoverTokens = useResponsiveTokens<PopoverV2TokenType>('POPOVERV2')

    const shouldShowSkeleton = skeleton?.show
    const skeletonVariant: SkeletonVariant =
        (skeleton?.variant as SkeletonVariant) || 'pulse'

    const bodySkeletonWidth = skeleton?.bodySkeletonProps?.width || '100%'
    const bodySkeletonHeight = skeleton?.bodySkeletonProps?.height || 200
    const baseId = useId()
    const headingId = heading ? `${baseId}-heading` : undefined
    const descriptionId = description ? `${baseId}-description` : undefined
    const ariaDescribedBy = descriptionId || undefined

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
                    aria-labelledby={headingId}
                    aria-label={heading || 'Popover dialog'}
                    aria-describedby={ariaDescribedBy}
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
                                        <PopoverV2Skeleton
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
                                            <DrawerTitle id={headingId}>
                                                {heading}
                                            </DrawerTitle>
                                        )}
                                        {description && (
                                            <DrawerDescription
                                                id={descriptionId}
                                            >
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
                                                leadingIcon={
                                                    <X
                                                        size={16}
                                                        aria-hidden="true"
                                                    />
                                                }
                                                onClick={() => {
                                                    if (onOpenChange) {
                                                        onOpenChange(false)
                                                    }
                                                    if (onClose) {
                                                        onClose()
                                                    }
                                                }}
                                                aria-label="Close popover"
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
                            <PopoverV2Skeleton
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
                                <PopoverV2Skeleton
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

export default MobilePopoverV2
