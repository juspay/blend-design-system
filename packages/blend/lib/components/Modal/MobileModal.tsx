import React from 'react'
import {
    Drawer,
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
import type { ModalProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'

type MobileModalProps = ModalProps & {
    useDrawerOnMobile?: boolean
}

const MobileModal: React.FC<MobileModalProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    primaryAction,
    secondaryAction,
    showCloseButton = true,
    closeOnBackdropClick = true,
    headerRightSlot,
}) => {
    return (
        <Drawer
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose()
                }
            }}
            direction="bottom"
            modal={true}
            dismissible={closeOnBackdropClick}
        >
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction="bottom"
                    showHandle={true}
                    contentDriven={true}
                >
                    {(title || subtitle) && (
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
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={FOUNDATION_THEME.unit[8]}
                                    >
                                        {title && (
                                            <DrawerTitle>{title}</DrawerTitle>
                                        )}
                                        {headerRightSlot}
                                    </Block>
                                    {subtitle && (
                                        <DrawerDescription>
                                            {subtitle}
                                        </DrawerDescription>
                                    )}
                                </Block>
                                {showCloseButton && (
                                    <DrawerClose>
                                        <Button
                                            subType={ButtonSubType.INLINE}
                                            buttonType={ButtonType.SECONDARY}
                                            leadingIcon={<X size={16} />}
                                            onClick={onClose}
                                        />
                                    </DrawerClose>
                                )}
                            </Block>
                        </DrawerHeader>
                    )}

                    <DrawerBody
                        hasFooter={!!(primaryAction || secondaryAction)}
                    >
                        {children}
                    </DrawerBody>

                    {(primaryAction || secondaryAction) && (
                        <DrawerFooter>
                            {secondaryAction && (
                                <Button
                                    buttonType={
                                        secondaryAction.buttonType ||
                                        ButtonType.SECONDARY
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
                                    buttonType={
                                        primaryAction.buttonType ||
                                        ButtonType.PRIMARY
                                    }
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
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileModal
