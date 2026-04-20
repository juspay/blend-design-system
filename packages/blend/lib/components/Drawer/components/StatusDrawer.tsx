'use client'

import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from './DrawerBase'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Button, ButtonSize } from '../../Button'
import { FOUNDATION_THEME } from '../../../tokens'
import type { StatusDrawerProps } from '../types'

export const StatusDrawer = ({
    open,
    onOpenChange,
    heading,
    description,
    primaryButtonProps,
    secondaryButtonProps,
    slot,
    direction = 'bottom',
    modal = true,
    dismissible = true,
    mobileOffset,
    className,
    style,
}: StatusDrawerProps) => {
    const statusMobileOffset = {
        top: '60vh',
        bottom: '16px',
        left: '16px',
        right: '16px',
        ...mobileOffset,
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            direction={direction}
            modal={modal}
            dismissible={dismissible}
        >
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction={direction}
                    showHandle={true}
                    mobileOffset={statusMobileOffset}
                    className={className}
                    style={style}
                >
                    <DrawerBody overflowY="visible">
                        <Block
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            textAlign="center"
                            gap={24}
                            paddingTop={FOUNDATION_THEME.unit[8]}
                        >
                            <Block
                                width="56px"
                                height="56px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                            >
                                {slot}
                            </Block>

                            <Block
                                display="flex"
                                flexDirection="column"
                                gap={8}
                                alignItems="center"
                            >
                                <Text
                                    variant="heading.sm"
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                    {heading}
                                </Text>
                                <Text
                                    variant="body.md"
                                    color={FOUNDATION_THEME.colors.gray[500]}
                                    textAlign="center"
                                    style={{ maxWidth: '280px' }}
                                >
                                    {description}
                                </Text>
                            </Block>

                            <Block
                                width="100%"
                                display="flex"
                                gap={16}
                                paddingTop={FOUNDATION_THEME.unit[16]}
                            >
                                {secondaryButtonProps && (
                                    <Button
                                        {...secondaryButtonProps}
                                        fullWidth={true}
                                        size={ButtonSize.LARGE}
                                    />
                                )}

                                <Button
                                    {...primaryButtonProps}
                                    fullWidth={true}
                                />
                            </Block>
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

StatusDrawer.displayName = 'StatusDrawer'
