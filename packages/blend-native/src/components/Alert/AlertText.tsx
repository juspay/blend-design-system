import { memo } from 'react'
import type { AlertV2Type } from '@juspay/blend-design-system/node'
import { Block } from '../../primitives/Block'
import { Text } from '../../primitives/Text'
import type { AlertTextTokens } from './alert.tokens'

/**
 * The heading and description block of an `Alert`.
 *
 * `flexShrink` is explicit because Yoga defaults it to 0 where CSS defaults it
 * to 1 — without it this box sizes to its text and a long description runs off
 * the edge instead of wrapping.
 */

export type AlertTextProps = {
    heading?: string
    description?: string
    type: AlertV2Type
    tokens: AlertTextTokens
}

function AlertTextImpl({ heading, description, type, tokens }: AlertTextProps) {
    if (!heading && !description) return null

    return (
        <Block
            flexGrow={1}
            flexShrink={1}
            flexDirection="column"
            gap={tokens.gap}
        >
            {heading ? (
                <Text
                    accessibilityRole="header"
                    fontSize={tokens.heading.fontSize}
                    fontWeight={tokens.heading.fontWeight}
                    lineHeight={tokens.heading.lineHeight}
                    color={String(tokens.heading.color[type])}
                >
                    {heading}
                </Text>
            ) : null}
            {description ? (
                <Text
                    fontSize={tokens.description.fontSize}
                    fontWeight={tokens.description.fontWeight}
                    lineHeight={tokens.description.lineHeight}
                    color={String(tokens.description.color[type])}
                >
                    {description}
                </Text>
            ) : null}
        </Block>
    )
}

export const AlertText = memo(AlertTextImpl)
AlertText.displayName = 'AlertText'
