import { forwardRef, useId } from 'react'
import { SidebarV2Props } from './sidebarV2.types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SidebarV2TokensType } from './sidebarV2.tokens'
import { SecondarySidebar } from './SecondarySidebar'

const SidebarV2 = forwardRef<HTMLDivElement, SidebarV2Props>(
    ({ secondarySidebar, height }, ref) => {
        const tokens = useResponsiveTokens<SidebarV2TokensType>('SIDEBARV2')

        const baseId = useId()
        const sidebarId = `${baseId}-sidebar`
        const primarySidebarId = `${baseId}-primary-sidebar`
        const secondarySidebarId = `${baseId}-secondary-sidebar`
        return (
            <Block
                as="nav"
                id={sidebarId}
                data-sidebar="sidebar"
                data-status="default"
                role="navigation"
                ref={ref}
                display={'flex'}
                backgroundColor={tokens.backgroundColor}
                height={height || '100dvh'}
                position="relative"
                width={'fit-content'}
            >
                {/* Secondary Sidebar */}
                {
                    <SecondarySidebar
                        id={secondarySidebarId}
                        secondarySidebar={secondarySidebar}
                        tokens={tokens}
                    />
                }

                {/* Primary Sidebar */}
                <Block
                    as="nav"
                    data-element="primary-sidebar"
                    height="100%"
                    display="flex"
                    id={primarySidebarId}
                    width={tokens.primarySidebar.width}
                    borderRight={tokens.primarySidebar.borderRight}
                    paddingTop={tokens.primarySidebar.padding.top}
                    paddingBottom={tokens.primarySidebar.padding.bottom}
                    paddingLeft={tokens.primarySidebar.padding.left}
                    paddingRight={tokens.primarySidebar.padding.right}
                >
                    test
                </Block>
            </Block>
        )
    }
)

export default SidebarV2
