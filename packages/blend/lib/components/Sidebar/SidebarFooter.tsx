import React from 'react'
import Block from '../Primitives/Block/Block'
import { Avatar, AvatarShape, AvatarSize } from '../Avatar'
import Text from '../Text/Text'
import { FOUNDATION_THEME } from '../../tokens'

type SidebarFooterProps = {
    footer?: React.ReactNode
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ footer }) => {
    return (
        <Block
            width="100%"
            backgroundColor={FOUNDATION_THEME.colors.gray[25]}
            height="64px"
            position="sticky"
            bottom="0"
            zIndex="10"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
            padding="12px 8px"
            borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
        >
            {footer ? (
                footer
            ) : (
                <Block width="100%">
                    <div className="flex items-center gap-2">
                        <Avatar
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            alt="John Doe"
                            size={AvatarSize.SM}
                            shape={AvatarShape.ROUNDED}
                        />
                        <Text
                            variant="body.md"
                            fontWeight={500}
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            indira.sajeev96@gmail.com
                        </Text>
                    </div>
                </Block>
            )}
        </Block>
    )
}

export default SidebarFooter
