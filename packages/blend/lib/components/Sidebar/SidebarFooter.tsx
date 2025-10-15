import React from 'react'
import Block from '../Primitives/Block/Block'
import { Avatar, AvatarShape, AvatarSize } from '../Avatar'
import Text from '../Text/Text'
import { FOUNDATION_THEME } from '../../tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'

type SidebarFooterProps = {
    footer?: React.ReactNode
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ footer }) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

    return (
        <Block
            width="100%"
            backgroundColor={tokens.footer.backgroundColor}
            height="64px"
            position="sticky"
            bottom="0"
            zIndex="10"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
            padding={`${tokens.footer.padding.y} ${tokens.footer.padding.x}`}
            borderTop={tokens.footer.borderTop}
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
