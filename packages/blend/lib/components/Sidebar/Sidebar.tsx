import React, { forwardRef, useState, useEffect } from 'react'
import { PanelsTopLeft, UserIcon } from 'lucide-react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import type { SidebarProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import { SelectMenuVariant } from '../Select/types'
import { SelectMenuSize, SingleSelect } from '../SingleSelect'
import { Avatar, AvatarShape, AvatarSize } from '../Avatar'
import Text from '../Text/Text'
import { Topbar } from '../Topbar'

const DirectoryContainer = styled(Block)`
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const MainContentContainer = styled(Block)`
    width: 100%;
    height: 100%;
    background-color: ${FOUNDATION_THEME.colors.gray[0]};
    position: relative;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const ToggleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    padding: 9px;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
    }
`

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
    (
        {
            children,
            data,
            topbar,
            leftPanel,
            sidebarTopSlot,
            footer,
            sidebarCollapseKey = '/',
        },
        ref
    ) => {
        const [isExpanded, setIsExpanded] = useState<boolean>(true)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)

        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === sidebarCollapseKey) {
                    event.preventDefault()
                    setIsExpanded(!isExpanded)
                }
            }

            document.addEventListener('keydown', handleKeyPress)

            return () => {
                document.removeEventListener('keydown', handleKeyPress)
            }
        }, [isExpanded])

        useEffect(() => {
            if (!isExpanded) {
                const timer = setTimeout(() => {
                    setShowToggleButton(true)
                }, 50)

                return () => clearTimeout(timer)
            } else {
                setShowToggleButton(false)
            }
        }, [isExpanded])

        return (
            <Block
                ref={ref}
                width="100%"
                height="100%"
                display="flex"
                backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                position="relative"
            >
                {!isExpanded && (
                    <Block
                        position="absolute"
                        left="0"
                        top="0"
                        width="20px"
                        height="100%"
                        zIndex="30"
                        onMouseEnter={() => setIsHovering(true)}
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    />
                )}

                <Block
                    backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                    maxWidth={
                        isExpanded || isHovering
                            ? leftPanel
                                ? '300px'
                                : '250px'
                            : '0'
                    }
                    width="100%"
                    borderRight={
                        isExpanded || isHovering
                            ? `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
                            : 'none'
                    }
                    display="flex"
                    position={!isExpanded ? 'absolute' : 'relative'}
                    zIndex={!isExpanded ? '20' : 'auto'}
                    height="100%"
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {(isExpanded || isHovering) && (
                        <>
                            {/* TENANTS SIDE BAR _ SECONDARY SIDE BAR */}
                            {leftPanel &&
                                leftPanel.items &&
                                leftPanel.items.length > 0 && (
                                    <Block
                                        width="fit-content"
                                        height="100%"
                                        borderRight={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                        backgroundColor={
                                            FOUNDATION_THEME.colors.gray[25]
                                        }
                                        display="flex"
                                        flexDirection="column"
                                        gap="16px"
                                        alignItems="center"
                                        padding="10px"
                                    >
                                        {leftPanel.items.map(
                                            (tenant, index) => (
                                                // TODO: Add theme config
                                                <Block
                                                    border="none"
                                                    backgroundColor="transparent"
                                                    width="32px"
                                                    height="32px"
                                                    borderRadius={
                                                        FOUNDATION_THEME.border
                                                            .radius[4]
                                                    }
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    cursor="pointer"
                                                    style={{
                                                        outline: `1px solid ${
                                                            leftPanel.selected ===
                                                            tenant.label
                                                                ? FOUNDATION_THEME
                                                                      .colors
                                                                      .primary[500]
                                                                : FOUNDATION_THEME
                                                                      .colors
                                                                      .gray[150]
                                                        }`,
                                                        transitionDuration:
                                                            '75ms',
                                                    }}
                                                    onClick={() =>
                                                        leftPanel.onSelect(
                                                            tenant.label
                                                        )
                                                    }
                                                    key={index}
                                                >
                                                    {tenant.icon}
                                                </Block>
                                            )
                                        )}
                                    </Block>
                                )}

                            {/* PRIMARY SIDE BAR */}
                            <Block
                                width="100%"
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                position="relative"
                            >
                                {/* MERCHANT SWITCHER  */}
                                <Block
                                    width="100%"
                                    zIndex="10"
                                    backgroundColor={
                                        FOUNDATION_THEME.colors.gray[25]
                                    }
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap="12px"
                                    padding="12px 8px"
                                >
                                    {sidebarTopSlot ? (
                                        sidebarTopSlot
                                    ) : (
                                        <SingleSelect
                                            helpIconText=""
                                            required={false}
                                            placeholder="Select Merchant"
                                            variant={
                                                SelectMenuVariant.NO_CONTAINER
                                            }
                                            size={SelectMenuSize.SMALL}
                                            items={[
                                                {
                                                    items: [
                                                        {
                                                            label: 'zeptomarketplace',
                                                            value: 'zeptomarketplace',
                                                            slot1: (
                                                                <UserIcon
                                                                    style={{
                                                                        width: '16px',
                                                                        height: '16px',
                                                                    }}
                                                                />
                                                            ),
                                                        },
                                                    ],
                                                },
                                            ]}
                                            selected={'zeptomarketplace'}
                                            onSelect={(value) => {
                                                console.log(value)
                                            }}
                                        />
                                    )}
                                    <ToggleButton
                                        onClick={() => {
                                            setIsExpanded(!isExpanded)
                                            setIsHovering(false)
                                        }}
                                    >
                                        <PanelsTopLeft
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            size={14}
                                        />
                                    </ToggleButton>
                                </Block>

                                {/* DIRECTORY */}
                                <DirectoryContainer>
                                    <Directory
                                        directoryData={data}
                                        className="pb-20"
                                    />
                                </DirectoryContainer>

                                <SidebarFooter footer={footer} />
                            </Block>
                        </>
                    )}
                </Block>

                <MainContentContainer>
                    <Topbar
                        isExpanded={isExpanded}
                        onToggleExpansion={() => setIsExpanded(!isExpanded)}
                        showToggleButton={showToggleButton}
                        sidebarTopSlot={sidebarTopSlot}
                        topbar={topbar}
                    />

                    <Block>{children}</Block>
                </MainContentContainer>
            </Block>
        )
    }
)

const SidebarFooter = ({ footer }: { footer: React.ReactNode }) => {
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

Sidebar.displayName = 'Sidebar'

export default Sidebar
