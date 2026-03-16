import React, { useId } from 'react'
import Block from '../Primitives/Block/Block'
import { StatCardV2Variant, type StatCardV2Props } from './statcardV2.types'
import type { StatCardV2TokensType } from './statcardV2.tokens'
import StatCardV2Title from './StatCardV2Title'
import StatCardV2Subtitle from './StatCardV2Subtitle'
import StatCardV2Value from './StatCardV2Value'
import SingleSelect from '../SingleSelect/SingleSelect'
import { SelectMenuSize, SelectMenuVariant } from '../SingleSelect/types'

type StatCardV2NoDataProps = Pick<
    StatCardV2Props,
    | 'title'
    | 'titleIcon'
    | 'helpIconText'
    | 'subtitle'
    | 'dropdownProps'
    | 'maxWidth'
    | 'minWidth'
    | 'width'
    | 'height'
> & {
    tokens: StatCardV2TokensType
    isSmallScreen: boolean
    filteredProps: React.ComponentProps<'div'>
}

const StatCardV2NoData = ({
    title,
    titleIcon,
    helpIconText,
    subtitle,
    dropdownProps,
    maxWidth,
    minWidth,
    width,
    height,
    tokens,
    isSmallScreen,
    filteredProps,
}: StatCardV2NoDataProps) => {
    const titleId = useId()
    const subtitleId = useId()

    return (
        <Block
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            paddingTop={tokens.paddingTop}
            paddingBottom={tokens.paddingBottom}
            paddingLeft={tokens.paddingLeft}
            paddingRight={tokens.paddingRight}
            border={tokens.border}
            borderRadius={tokens.borderRadius}
            backgroundColor={tokens.backgroundColor}
            boxShadow={tokens.boxShadow}
            maxWidth={maxWidth ?? tokens.maxWidth}
            minWidth={minWidth ?? tokens.minWidth}
            width={width ?? tokens.width}
            height={height ?? tokens.height}
            role="region"
            aria-labelledby={titleId}
            aria-describedby={subtitle ? subtitleId : undefined}
            {...filteredProps}
        >
            <Block
                display="flex"
                flexDirection="column"
                height="100%"
                alignItems={isSmallScreen ? 'flex-start' : 'center'}
                justifyContent="center"
                gap={tokens.topContainer.dataContainer.gap}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={tokens.topContainer.dataContainer.titleContainer.gap}
                >
                    {titleIcon && !isSmallScreen && (
                        <Block
                            data-element="title-icon"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                        >
                            {titleIcon}
                        </Block>
                    )}
                    <Block
                        width="100%"
                        display="flex"
                        alignItems="center"
                        gap={
                            tokens.topContainer.dataContainer.titleContainer.gap
                        }
                    >
                        <StatCardV2Title
                            id={titleId}
                            title={title}
                            helpIconText={helpIconText}
                            tokens={tokens}
                        />
                    </Block>
                </Block>

                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={tokens.topContainer.dataContainer.statsContainer.gap}
                >
                    <Block
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent={isSmallScreen ? 'flex-start' : 'center'}
                        gap={
                            tokens.topContainer.dataContainer.statsContainer.gap
                        }
                    >
                        <StatCardV2Value
                            value={undefined}
                            tokens={tokens}
                            variant={StatCardV2Variant.NUMBER}
                        />
                    </Block>

                    {!isSmallScreen && subtitle && (
                        <Block id={subtitleId}>
                            <StatCardV2Subtitle
                                subtitle={subtitle}
                                tokens={tokens}
                            />
                        </Block>
                    )}

                    {isSmallScreen &&
                        dropdownProps?.items &&
                        dropdownProps.items.length > 0 && (
                            <SingleSelect
                                label={dropdownProps.label ?? ''}
                                placeholder={dropdownProps.placeholder ?? ''}
                                items={dropdownProps.items ?? []}
                                selected={dropdownProps.selected ?? ''}
                                onSelect={dropdownProps.onSelect ?? (() => {})}
                                variant={SelectMenuVariant.NO_CONTAINER}
                                size={SelectMenuSize.SMALL}
                                inline={true}
                                minMenuWidth={100}
                            />
                        )}
                </Block>
            </Block>
        </Block>
    )
}

export default StatCardV2NoData
