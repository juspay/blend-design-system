import { forwardRef } from 'react'
import { PanelsTopLeft, ArrowLeft } from 'lucide-react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { TopbarProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'

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

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: 8px;
    cursor: pointer;
    padding: 8px;
    transition: background-color 0.15s ease;
    min-width: 40px;
    height: 40px;

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
    }

    &:active {
        background-color: ${FOUNDATION_THEME.colors.gray[150]};
    }
`

const Topbar = forwardRef<HTMLDivElement, TopbarProps>(
    (
        {
            children,
            className,
            style,
            isExpanded,
            onToggleExpansion,
            showToggleButton,
            sidebarTopSlot,
            topbar,
            title,
            leftAction,
            rightActions,
            showBackButton = false,
            onBackClick,
        },
        ref
    ) => {
        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < 1024

        if (isMobile) {
            const renderLeftSection = () => {
                if (leftAction) {
                    return leftAction
                }

                if (showBackButton) {
                    return (
                        <ActionButton onClick={onBackClick}>
                            <ArrowLeft
                                color={FOUNDATION_THEME.colors.gray[600]}
                                size={20}
                            />
                        </ActionButton>
                    )
                }

                // Show dropdown on the left side for mobile (provided by parent)
                return sidebarTopSlot || null
            }

            return (
                <Block
                    ref={ref}
                    width="100%"
                    height="56px"
                    position="sticky"
                    top="0"
                    zIndex="10"
                    borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    padding="8px 16px"
                    backgroundColor="hsla(0, 0%, 100%, 0.95)"
                    className={className}
                    style={{
                        backdropFilter: 'blur(10px)',
                        ...style,
                    }}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        width="fit-content"
                        flexShrink={0}
                    >
                        {renderLeftSection()}
                    </Block>

                    <Block
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minWidth={0}
                    >
                        {children ||
                            (title && (
                                <Text
                                    variant="body.lg"
                                    fontWeight={600}
                                    color={FOUNDATION_THEME.colors.gray[800]}
                                    truncate
                                >
                                    {title}
                                </Text>
                            ))}
                    </Block>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap="8px"
                        width="fit-content"
                        flexShrink={0}
                    >
                        {rightActions}
                    </Block>
                </Block>
            )
        }

        return (
            <Block
                ref={ref}
                width="100%"
                height="68px"
                position="sticky"
                top="0"
                zIndex="10"
                borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                display="flex"
                alignItems="center"
                gap="16px"
                padding="16px 32px"
                backgroundColor="hsla(0, 0%, 100%, 0.8)"
                className={className}
                style={{
                    backdropFilter: 'blur(10px)',
                    ...style,
                }}
            >
                {!isExpanded && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap="16px"
                        width="fit-content"
                        flexShrink={0}
                    >
                        {showToggleButton && (
                            <ToggleButton onClick={onToggleExpansion}>
                                <PanelsTopLeft
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                    size={14}
                                />
                            </ToggleButton>
                        )}
                        {sidebarTopSlot}
                    </Block>
                )}
                <Block flexGrow={1}>{topbar || children}</Block>
            </Block>
        )
    }
)

Topbar.displayName = 'Topbar'

export default Topbar
