import { useEffect, useRef, useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Tooltip } from '../Tooltip'
import type { StatCardV2TitleProps } from './statcardV2.types'
import type { StatCardV2TokensType } from './statcardV2.tokens'

type StatCardV2TitleTextProps = {
    title: string
    id?: string
    tokens: StatCardV2TokensType
    isSmallScreen: boolean
}

const StatCardV2TitleText = ({
    title,
    id,
    tokens,
    isSmallScreen,
}: StatCardV2TitleTextProps) => {
    const [forceTooltipOpen, setForceTooltipOpen] = useState(false)
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isSmallScreen || !forceTooltipOpen) return

        const handlePointerDown = (event: PointerEvent) => {
            if (titleRef.current?.contains(event.target as Node)) return
            setForceTooltipOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () =>
            document.removeEventListener('pointerdown', handlePointerDown)
    }, [isSmallScreen, forceTooltipOpen])

    const titleText = (
        <Text
            id={id}
            fontSize={
                tokens.topContainer.dataContainer.titleContainer.title.fontSize
            }
            fontWeight={
                tokens.topContainer.dataContainer.titleContainer.title
                    .fontWeight
            }
            lineHeight={addPxToValue(
                tokens.topContainer.dataContainer.titleContainer.title
                    .lineHeight
            )}
            color={tokens.topContainer.dataContainer.titleContainer.title.color}
            style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
            }}
            data-element="statcard-header"
            data-id={title || 'statcard-header'}
        >
            {title}
        </Text>
    )

    if (!isSmallScreen) {
        return <Tooltip content={title}>{titleText}</Tooltip>
    }

    return (
        <Block
            ref={titleRef}
            minWidth={0}
            flexGrow={1}
            onClick={() => {
                setForceTooltipOpen(!forceTooltipOpen)
            }}
            style={{ cursor: 'pointer' }}
        >
            <Tooltip open={forceTooltipOpen} content={title}>
                {titleText}
            </Tooltip>
        </Block>
    )
}

type StatCardV2HelpIconProps = {
    helpIconText: string
    title: string
    tokens: StatCardV2TokensType
    isSmallScreen: boolean
}

const StatCardV2HelpIcon = ({
    helpIconText,
    title,
    tokens,
    isSmallScreen,
}: StatCardV2HelpIconProps) => {
    const [forceTooltipOpen, setForceTooltipOpen] = useState(false)
    const helpIconRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isSmallScreen || !forceTooltipOpen) return

        const handlePointerDown = (event: PointerEvent) => {
            if (helpIconRef.current?.contains(event.target as Node)) return
            setForceTooltipOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () =>
            document.removeEventListener('pointerdown', handlePointerDown)
    }, [isSmallScreen, forceTooltipOpen])

    const helpIconTrigger = (
        <Block
            as="span"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            role="button"
            tabIndex={0}
            aria-label={helpIconText || `Help for ${title}`}
        >
            <CircleHelp
                width={
                    tokens.topContainer.dataContainer.titleContainer.helpIcon
                        .width
                }
                height={
                    tokens.topContainer.dataContainer.titleContainer.helpIcon
                        .height
                }
                color={
                    tokens.topContainer.dataContainer.titleContainer.helpIcon
                        .color.default
                }
                aria-hidden="true"
            />
        </Block>
    )

    if (!isSmallScreen) {
        return (
            <Block
                data-element="help-icon"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
            >
                <Tooltip content={helpIconText}>{helpIconTrigger}</Tooltip>
            </Block>
        )
    }

    return (
        <Block
            ref={helpIconRef}
            data-element="help-icon"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            onClick={() => {
                setForceTooltipOpen(!forceTooltipOpen)
            }}
        >
            <Tooltip open={forceTooltipOpen} content={helpIconText}>
                {helpIconTrigger}
            </Tooltip>
        </Block>
    )
}

const StatCardV2Title = ({
    title,
    helpIconText,
    tokens,
    id,
    isSmallScreen = false,
}: StatCardV2TitleProps) => {
    if (!title) return null

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={tokens.topContainer.dataContainer.titleContainer.gap}
        >
            <StatCardV2TitleText
                title={title}
                id={id}
                tokens={tokens}
                isSmallScreen={isSmallScreen}
            />
            {helpIconText && (
                <StatCardV2HelpIcon
                    helpIconText={helpIconText}
                    title={title}
                    tokens={tokens}
                    isSmallScreen={isSmallScreen}
                />
            )}
        </Block>
    )
}

export default StatCardV2Title
