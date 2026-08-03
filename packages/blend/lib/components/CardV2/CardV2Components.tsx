import { useId } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import ButtonV2 from '../ButtonV2/ButtonV2'
import type { CardV2TokensType } from './cardV2.tokens'
import { useCardV2Context } from './CardV2Context'
import {
    CardV2Orientation,
    type CardV2ActionsProps,
    type CardV2BodyProps,
    type CardV2FooterProps,
    type CardV2HeaderProps,
    type CardV2MediaProps,
    type CardV2MetaProps,
    type CardV2SectionProps,
} from './cardV2.types'
import { renderCardV2Text, toCardV2ActionArray } from './CardV2.utils'

const useCardV2SectionContext = () => {
    const context = useCardV2Context()
    const responsiveTokens = useResponsiveTokens<CardV2TokensType>('CARDV2')
    const fallbackId = useId()

    return {
        tokens: context?.tokens ?? responsiveTokens,
        centered: context?.centered ?? false,
        scrollable: context?.scrollable ?? false,
        ids: context?.ids ?? {
            eyebrow: `${fallbackId}-card-eyebrow`,
            title: `${fallbackId}-card-title`,
            subtitle: `${fallbackId}-card-subtitle`,
            description: `${fallbackId}-card-description`,
        },
    }
}

export const CardV2Meta = ({
    title,
    truncateTitle,
    subtitle,
    eyebrow,
    centered,
}: CardV2MetaProps) => {
    const { tokens, centered: contextCentered, ids } = useCardV2SectionContext()
    const isCentered = centered ?? contextCentered

    if (!eyebrow && !title && !subtitle) return null

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={tokens.header.gap}
            minWidth={0}
            alignItems={isCentered ? 'center' : undefined}
            data-element="card-meta"
        >
            {renderCardV2Text({
                value: eyebrow,
                id: ids.eyebrow,
                as: 'p',
                styles: tokens.header.eyebrow as React.CSSProperties,
                dataElement: 'card-eyebrow',
            })}
            {renderCardV2Text({
                value: title,
                id: ids.title,
                as: 'h2',
                styles: tokens.header.title as React.CSSProperties,
                dataElement: 'card-title',
                truncate: truncateTitle,
            })}
            {renderCardV2Text({
                value: subtitle,
                id: ids.subtitle,
                as: 'p',
                styles: tokens.header.subtitle as React.CSSProperties,
                dataElement: 'card-subtitle',
            })}
        </Block>
    )
}

export const CardV2Header = ({
    title,
    truncateTitle,
    subtitle,
    eyebrow,
    leadingSlot,
    trailingSlot,
    centered,
}: CardV2HeaderProps) => {
    const { tokens, centered: contextCentered, ids } = useCardV2SectionContext()
    const isCentered = centered ?? contextCentered
    const hasHeader = Boolean(
        leadingSlot || eyebrow || title || subtitle || trailingSlot
    )

    if (!hasHeader) return null

    return (
        <Block
            data-element="card-header"
            display="flex"
            flexDirection={isCentered ? 'column' : 'row'}
            alignItems={isCentered ? 'center' : 'flex-start'}
            justifyContent={isCentered ? 'center' : 'space-between'}
            gap={tokens.header.gap}
            width="100%"
            role="group"
            aria-labelledby={title ? ids.title : undefined}
        >
            <Block
                display="flex"
                flexDirection={isCentered ? 'column' : 'row'}
                alignItems={isCentered ? 'center' : 'flex-start'}
                gap={tokens.header.gap}
                minWidth={0}
                flexGrow={1}
                justifyContent={isCentered ? 'center' : undefined}
                alignSelf={isCentered ? 'center' : undefined}
                width={isCentered ? '100%' : undefined}
            >
                {leadingSlot && <Block flexShrink={0}>{leadingSlot}</Block>}
                <CardV2Meta
                    eyebrow={eyebrow}
                    title={title}
                    truncateTitle={truncateTitle}
                    subtitle={subtitle}
                    centered={isCentered}
                />
            </Block>
            {trailingSlot && (
                <Block
                    flexShrink={0}
                    alignSelf={isCentered ? 'center' : undefined}
                >
                    {trailingSlot}
                </Block>
            )}
        </Block>
    )
}

export const CardV2Media = ({
    children,
    orientation,
    width,
    height,
    minHeight,
}: CardV2MediaProps) => {
    const { tokens, centered } = useCardV2SectionContext()
    const isHorizontal = orientation === CardV2Orientation.HORIZONTAL

    if (!children) return null

    return (
        <Block
            data-element="card-media"
            display="flex"
            alignItems="center"
            alignSelf={centered ? 'center' : 'flex-start'}
            justifyContent="center"
            flexShrink={0}
            width={width ?? (isHorizontal ? tokens.media.width : '100%')}
            height={height ?? tokens.media.height}
            minHeight={
                minHeight ?? (isHorizontal ? undefined : tokens.media.minHeight)
            }
            borderRadius={tokens.media.borderRadius}
            backgroundColor={tokens.media.backgroundColor}
            overflow="hidden"
        >
            {children}
        </Block>
    )
}

export const CardV2Actions = ({ actions, centered }: CardV2ActionsProps) => {
    const { tokens, centered: contextCentered } = useCardV2SectionContext()
    const isCentered = centered ?? contextCentered
    const actionItems = toCardV2ActionArray(actions)

    if (actionItems.length === 0) return null

    return (
        <Block
            display="flex"
            flexWrap="wrap"
            justifyContent={isCentered ? 'center' : 'flex-start'}
            gap={tokens.actions.gap}
            data-element="card-actions"
        >
            {actionItems.map((action, index) => (
                <ButtonV2
                    key={`${action.text ?? action['aria-label'] ?? 'action'}-${index}`}
                    {...action}
                />
            ))}
        </Block>
    )
}

export const CardV2Content = ({ children }: CardV2SectionProps) => {
    const { centered } = useCardV2SectionContext()

    if (!children) return null

    return (
        <Block
            data-element="card-content"
            width="100%"
            display={centered ? 'flex' : undefined}
            justifyContent={centered ? 'center' : undefined}
        >
            {children}
        </Block>
    )
}

export const CardV2Body = ({
    description,
    actions,
    centered,
    scrollable,
    children,
}: CardV2BodyProps) => {
    const {
        tokens,
        centered: contextCentered,
        scrollable: contextScrollable,
        ids,
    } = useCardV2SectionContext()
    const isCentered = centered ?? contextCentered
    const isScrollable = scrollable ?? contextScrollable
    const hasBody = Boolean(description || children || actions)

    if (!hasBody) return null

    return (
        <Block
            data-element="card-body"
            display="flex"
            flexDirection="column"
            gap={tokens.body.gap}
            width="100%"
            minHeight={0}
            overflowY={isScrollable ? 'auto' : undefined}
            overflowX={isScrollable ? 'hidden' : undefined}
            alignItems={isCentered ? 'center' : undefined}
            textAlign={isCentered ? 'center' : undefined}
            role="group"
            aria-describedby={description ? ids.description : undefined}
        >
            {renderCardV2Text({
                value: description,
                id: ids.description,
                as: 'p',
                styles: tokens.body.description as React.CSSProperties,
                dataElement: 'card-description',
            })}
            <CardV2Content>{children}</CardV2Content>
            <CardV2Actions actions={actions} centered={isCentered} />
        </Block>
    )
}

export const CardV2Footer = ({
    children,
    actions,
    centered,
    divider = false,
}: CardV2FooterProps) => {
    const { tokens, centered: contextCentered } = useCardV2SectionContext()
    const isCentered = centered ?? contextCentered
    const hasFooter = Boolean(children || actions)

    if (!hasFooter) return null

    return (
        <Block
            data-element="card-footer"
            data-divider={divider || undefined}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent={isCentered ? 'center' : 'space-between'}
            gap={tokens.footer.gap}
            width="100%"
            paddingTop={divider ? tokens.footer.paddingTop : undefined}
            borderTop={divider ? tokens.footer.borderTop : undefined}
        >
            {children && <Block>{children}</Block>}
            <CardV2Actions actions={actions} centered={isCentered} />
        </Block>
    )
}
