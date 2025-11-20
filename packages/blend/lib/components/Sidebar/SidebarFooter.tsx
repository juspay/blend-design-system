import React from 'react'
import Block from '../Primitives/Block/Block'
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
            {footer}
        </Block>
    )
}

export default SidebarFooter
