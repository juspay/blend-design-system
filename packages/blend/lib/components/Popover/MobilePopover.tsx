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
import { FOUNDATION_THEME } from '../../tokens'

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
}) => {
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
                    {(heading || description) && (
                        <DrawerHeader>
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
                                            buttonType={ButtonType.SECONDARY}
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
                        </DrawerHeader>
                    )}

                    <DrawerBody>{children}</DrawerBody>

                    {(primaryAction || secondaryAction) && (
                        <DrawerFooter>
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
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobilePopover
