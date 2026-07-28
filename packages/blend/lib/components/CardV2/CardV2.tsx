import { forwardRef, useId, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../utils/prop-helpers'
import Block from '../Primitives/Block/Block'
import type { CardV2TokensType } from './cardV2.tokens'
import { CardV2Context } from './CardV2Context'
import {
    CardV2Actions,
    CardV2Body,
    CardV2Content,
    CardV2Footer,
    CardV2Header,
    CardV2Media,
    CardV2Meta,
} from './CardV2Components'
import CardV2Skeleton from './CardV2Skeleton'
import {
    CardV2ActionPlacement,
    CardV2Orientation,
    CardV2Padding,
    CardV2Variant,
    type CardV2Props,
} from './cardV2.types'
import {
    getCardV2Padding,
    isTextPrimitive,
    toCardV2ActionArray,
} from './CardV2.utils'

const StyledCard = styled(Block)<{
    $tokens: CardV2TokensType
    $interactive: boolean
    $selected: boolean
}>`
    transition:
        border-color 160ms ease,
        box-shadow 160ms ease,
        transform 160ms ease;

    ${({ $tokens, $interactive }) =>
        $interactive &&
        css`
            cursor: pointer;

            &:hover {
                border: ${$tokens.state.hover.border};
                box-shadow: ${$tokens.state.hover.boxShadow};
            }
        `}

    ${({ $tokens, $selected }) =>
        $selected &&
        css`
            border: ${$tokens.state.selected.border};
            box-shadow: ${$tokens.state.selected.boxShadow};
        `}

    &:focus-visible {
        outline: ${({ $tokens }) => $tokens.state.focus.outline};
        outline-offset: ${({ $tokens }) => $tokens.state.focus.outlineOffset};
    }
`

const CardV2Root = forwardRef<HTMLDivElement, CardV2Props>(
    (
        {
            variant = CardV2Variant.OUTLINED,
            orientation = CardV2Orientation.VERTICAL,
            padding,
            title,
            truncateTitle,
            subtitle,
            description,
            eyebrow,
            media,
            mediaWidth,
            mediaHeight,
            mediaMinHeight,
            leadingSlot,
            trailingSlot,
            footer,
            actions,
            actionPlacement = CardV2ActionPlacement.BODY,
            centered = false,
            interactive = false,
            selected = false,
            skeleton,
            width,
            minWidth,
            maxWidth,
            height,
            minHeight,
            maxHeight,
            scrollable,
            children,
            role,
            tabIndex,
            ...props
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CardV2TokensType>('CARDV2')
        const filteredProps = filterBlockedProps(props)
        const {
            'aria-label': providedAriaLabel,
            ...filteredPropsWithoutAriaLabel
        } = filteredProps
        const actionItems = toCardV2ActionArray(actions)
        const isHorizontal = orientation === CardV2Orientation.HORIZONTAL
        const resolvedPadding =
            padding ??
            (variant === CardV2Variant.GHOST
                ? CardV2Padding.NONE
                : CardV2Padding.COMFORTABLE)
        const resolvedRole = role ?? (interactive ? 'button' : 'region')
        const supportsAriaSelected = [
            'gridcell',
            'option',
            'row',
            'tab',
            'treeitem',
        ].includes(resolvedRole)
        const hasBodyActions =
            actionPlacement === CardV2ActionPlacement.BODY &&
            actionItems.length > 0
        const hasFooterActions =
            actionPlacement === CardV2ActionPlacement.FOOTER &&
            actionItems.length > 0
        const hasHeaderContent = Boolean(
            leadingSlot || eyebrow || title || subtitle || trailingSlot
        )
        const hasBodyContent = Boolean(
            description || children || hasBodyActions
        )
        const hasFooterContent = Boolean(footer || hasFooterActions)
        const hasContentColumn = Boolean(
            hasHeaderContent || hasBodyContent || hasFooterContent
        )
        const shouldShowFooterDivider = Boolean(
            hasFooterActions && (media || hasHeaderContent || hasBodyContent)
        )
        const resolvedScrollable = scrollable ?? Boolean(maxHeight)
        const hasPropComposition = Boolean(
            title ||
            subtitle ||
            description ||
            eyebrow ||
            media ||
            leadingSlot ||
            trailingSlot ||
            footer ||
            actionItems.length > 0
        )
        const baseId = useId()
        const ids = {
            eyebrow: `${baseId}-card-eyebrow`,
            title: `${baseId}-card-title`,
            subtitle: `${baseId}-card-subtitle`,
            description: `${baseId}-card-description`,
        }

        const ariaLabel = useMemo(() => {
            const parts = [title, subtitle, description].filter(isTextPrimitive)
            return parts.length > 0 ? parts.join(' - ') : undefined
        }, [title, subtitle, description])

        return (
            <CardV2Context.Provider
                value={{
                    tokens,
                    centered,
                    scrollable: resolvedScrollable,
                    ids,
                }}
            >
                <StyledCard
                    ref={ref}
                    $tokens={tokens}
                    $interactive={interactive}
                    $selected={selected}
                    display="flex"
                    flexDirection="column"
                    width={width ?? tokens.width}
                    minWidth={minWidth ?? tokens.minWidth}
                    maxWidth={maxWidth ?? tokens.maxWidth}
                    height={height}
                    minHeight={minHeight}
                    maxHeight={maxHeight}
                    padding={getCardV2Padding(tokens, resolvedPadding)}
                    border={tokens.border[variant]}
                    borderRadius={tokens.borderRadius}
                    backgroundColor={tokens.backgroundColor[variant]}
                    boxShadow={tokens.boxShadow[variant]}
                    overflow="hidden"
                    role={resolvedRole}
                    tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
                    aria-label={
                        !title ? (providedAriaLabel ?? ariaLabel) : undefined
                    }
                    aria-labelledby={title ? ids.title : undefined}
                    aria-describedby={
                        description
                            ? ids.description
                            : subtitle
                              ? ids.subtitle
                              : undefined
                    }
                    aria-pressed={
                        selected && resolvedRole === 'button' ? true : undefined
                    }
                    aria-selected={
                        selected && supportsAriaSelected ? true : undefined
                    }
                    data-selected={selected || undefined}
                    data-card-variant={variant}
                    {...filteredPropsWithoutAriaLabel}
                >
                    {skeleton?.show ? (
                        <CardV2Skeleton skeleton={skeleton} />
                    ) : children && !hasPropComposition ? (
                        <Block
                            display="flex"
                            flexDirection={isHorizontal ? 'row' : 'column'}
                            alignItems={centered ? 'center' : 'stretch'}
                            gap={tokens.layout.gap}
                            minHeight={0}
                            textAlign={centered ? 'center' : undefined}
                        >
                            {children}
                        </Block>
                    ) : (
                        <Block
                            display="flex"
                            flexDirection={isHorizontal ? 'row' : 'column'}
                            alignItems={
                                isHorizontal && centered ? 'center' : 'stretch'
                            }
                            gap={
                                media
                                    ? tokens.layout.mediaGap[orientation]
                                    : tokens.layout.gap
                            }
                            minHeight={0}
                            textAlign={centered ? 'center' : undefined}
                            justifyContent={centered ? 'center' : undefined}
                        >
                            <CardV2Media
                                orientation={orientation}
                                width={mediaWidth}
                                height={mediaHeight}
                                minHeight={mediaMinHeight}
                            >
                                {media}
                            </CardV2Media>
                            {hasContentColumn && (
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    minWidth={0}
                                    minHeight={0}
                                    gap={tokens.layout.gap}
                                    textAlign={centered ? 'center' : undefined}
                                    alignItems={centered ? 'center' : undefined}
                                    width="100%"
                                >
                                    <CardV2Header
                                        eyebrow={eyebrow}
                                        title={title}
                                        truncateTitle={truncateTitle}
                                        subtitle={subtitle}
                                        leadingSlot={leadingSlot}
                                        trailingSlot={trailingSlot}
                                    />
                                    <CardV2Body
                                        description={description}
                                        actions={
                                            hasBodyActions
                                                ? actionItems
                                                : undefined
                                        }
                                    >
                                        {children}
                                    </CardV2Body>
                                    <CardV2Footer
                                        divider={shouldShowFooterDivider}
                                        actions={
                                            hasFooterActions
                                                ? actionItems
                                                : undefined
                                        }
                                    >
                                        {footer}
                                    </CardV2Footer>
                                </Block>
                            )}
                        </Block>
                    )}
                </StyledCard>
            </CardV2Context.Provider>
        )
    }
)

CardV2Root.displayName = 'CardV2'

const CardV2: typeof CardV2Root & {
    Header: typeof CardV2Header
    Meta: typeof CardV2Meta
    Media: typeof CardV2Media
    Body: typeof CardV2Body
    Content: typeof CardV2Content
    Actions: typeof CardV2Actions
    Footer: typeof CardV2Footer
    Skeleton: typeof CardV2Skeleton
} = Object.assign(CardV2Root, {
    Header: CardV2Header,
    Meta: CardV2Meta,
    Media: CardV2Media,
    Body: CardV2Body,
    Content: CardV2Content,
    Actions: CardV2Actions,
    Footer: CardV2Footer,
    Skeleton: CardV2Skeleton,
})

export default CardV2
