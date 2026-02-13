import React from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'
import { SidebarStateChangeType } from './types'

type SidebarFooterProps = {
    footer?: React.ReactNode
    sidebarState: SidebarStateChangeType
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
    footer,
    sidebarState,
}) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

    // Don't render footer if no content provided
    if (!footer) {
        return null
    }

    return (
        <Block
            as="footer"
            width="100%"
            backgroundColor={tokens.footer.backgroundColor}
            height="auto"
            position="sticky"
            bottom="0"
            zIndex="10"
            display="flex"
            alignItems="center"
            justifyContent={
                sidebarState === 'collapsed' ? 'center' : 'space-between'
            }
            gap="12px"
            padding={`${tokens.footer.padding.y} ${tokens.footer.padding.x}`}
            borderTop={tokens.footer.borderTop}
        >
            {footer}
        </Block>
    )
}

export default SidebarFooter
