import type { ReactNode } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { CardV2TokensType } from './cardV2.tokens'
import { CardV2Padding, type CardV2Action } from './cardV2.types'

export const isTextPrimitive = (value: unknown): value is string | number =>
    typeof value === 'string' || typeof value === 'number'

export const toCardV2ActionArray = (
    actions?: CardV2Action | CardV2Action[]
) => {
    if (!actions) return []
    return Array.isArray(actions) ? actions : [actions]
}

export const getCardV2Padding = (
    tokens: CardV2TokensType,
    padding: CardV2Padding
) => {
    const paddingTokens = tokens.padding[padding]
    return `${String(paddingTokens.y)} ${String(paddingTokens.x)}`
}

export const renderCardV2Text = ({
    value,
    id,
    as,
    styles,
    dataElement,
    truncate,
}: {
    value?: ReactNode
    id: string
    as: 'p' | 'h2'
    styles: React.CSSProperties
    dataElement: string
    truncate?: boolean
}) => {
    if (!value) return null
    const resolvedStyles = {
        ...styles,
        margin: 0,
        lineHeight:
            typeof styles.lineHeight === 'number'
                ? `${styles.lineHeight}px`
                : styles.lineHeight,
        ...(truncate
            ? {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
              }
            : {}),
    }

    if (isTextPrimitive(value)) {
        return (
            <Text
                as={as}
                id={id}
                style={resolvedStyles}
                truncate={truncate}
                data-element={dataElement}
            >
                {value}
            </Text>
        )
    }

    return (
        <Block id={id} style={resolvedStyles} data-element={dataElement}>
            {value}
        </Block>
    )
}
