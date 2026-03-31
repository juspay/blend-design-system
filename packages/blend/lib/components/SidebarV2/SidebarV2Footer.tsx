import type { ReactNode } from 'react'
import Block from '../Primitives/Block/Block'
import type { SidebarV2TokensType } from './sidebarV2.tokens'
import type { SidebarV2StateChangeType } from './types'
import { SidebarV2StateChange } from './types'

type SidebarV2FooterProps = {
    footer?: ReactNode
    sidebarState: SidebarV2StateChangeType
    tokens: SidebarV2TokensType
}

const SidebarV2Footer = ({
    footer,
    sidebarState,
    tokens,
}: SidebarV2FooterProps) => {
    if (!footer) return null

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
                sidebarState === SidebarV2StateChange.COLLAPSED
                    ? 'center'
                    : 'space-between'
            }
            gap={tokens.footer.gap}
            padding={`${tokens.footer.paddingTop} ${tokens.footer.paddingRight} ${tokens.footer.paddingBottom} ${tokens.footer.paddingLeft}`}
            borderTop={tokens.footer.borderTop}
        >
            {footer}
        </Block>
    )
}

export default SidebarV2Footer
