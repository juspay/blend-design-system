import { forwardRef, useMemo } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SidebarV2Core } from '../SidebarV2/SidebarV2'
import type { DirectoryTokenType } from '../Directory/directory.tokens.types'
import { getSidebarV3DirectoryTokens } from './sidebarV3.directory'
import type { SidebarV3Props } from './types'
import type { SidebarV3TokensType } from './sidebarV3.tokens.types'
import type { DirectoryAppearance } from '../Directory/types'

const directoryAppearance: DirectoryAppearance = {
    emphasizeSelectedAncestors: true,
    iconColorMode: 'state',
    chevronColorMode: 'state',
    connectorMode: 'straight',
}

const SidebarV3 = forwardRef<HTMLDivElement, SidebarV3Props>(
    (
        {
            topStrip,
            topStripLabel,
            sidebarSearch,
            height = '100dvh',
            ...sidebarProps
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<SidebarV3TokensType>('SIDEBARV3')
        const directory = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
        const directoryTokens = useMemo(
            () => getSidebarV3DirectoryTokens(directory, tokens),
            [directory, tokens]
        )

        return (
            <Block
                ref={ref}
                data-sidebar-v3
                width="100%"
                height={height}
                display="flex"
                flexDirection="column"
                position="relative"
                overflow="hidden"
                backgroundColor={tokens.frame.stripBackgroundColor}
                color={tokens.frame.stripColor}
            >
                <Block
                    as="header"
                    data-sidebar-v3-strip
                    aria-label={topStripLabel}
                    height={tokens.frame.stripHeight}
                    flexShrink={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingX={tokens.frame.stripPaddingInline}
                >
                    {topStrip}
                </Block>
                <Block
                    data-sidebar-v3-surface
                    flexGrow={1}
                    minHeight={0}
                    overflow="hidden"
                    borderRadius={`${tokens.frame.surfaceRadius} ${tokens.frame.surfaceRadius} 0 0`}
                    backgroundColor={tokens.frame.surfaceBackgroundColor}
                    color={tokens.frame.surfaceColor}
                >
                    <SidebarV2Core
                        {...sidebarProps}
                        height="100%"
                        resolvedTokens={tokens}
                        directoryTokens={directoryTokens}
                        directoryAppearance={directoryAppearance}
                        sidebarSearch={
                            sidebarSearch ? (
                                <Block padding={tokens.search.padding}>
                                    {sidebarSearch}
                                </Block>
                            ) : undefined
                        }
                        searchTransition={`grid-template-rows ${tokens.navigation.feedbackDuration} ${tokens.navigation.feedbackEasing}, opacity ${tokens.navigation.motionDuration} ${tokens.navigation.feedbackEasing}`}
                        disclosureMotion={{
                            duration: String(tokens.navigation.motionDuration),
                            fadeDuration: String(
                                tokens.navigation.motionDuration
                            ),
                            easing: String(tokens.navigation.feedbackEasing),
                        }}
                    />
                </Block>
            </Block>
        )
    }
)

SidebarV3.displayName = 'SidebarV3'

export default SidebarV3
