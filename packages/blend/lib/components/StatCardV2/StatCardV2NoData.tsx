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
    filteredProps: Record<string, unknown>
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
}: StatCardV2NoDataProps) => (
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
                gap={16}
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
                    gap={tokens.topContainer.dataContainer.titleContainer.gap}
                >
                    <StatCardV2Title
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
                gap={8}
            >
                <Block
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent={isSmallScreen ? 'flex-start' : 'center'}
                    gap={tokens.topContainer.dataContainer.statsContainer.gap}
                >
                    <StatCardV2Value
                        value={undefined}
                        tokens={tokens}
                        variant={StatCardV2Variant.NUMBER}
                    />
                </Block>

                {!isSmallScreen && (
                    <StatCardV2Subtitle subtitle={subtitle} tokens={tokens} />
                )}

                {isSmallScreen &&
                    dropdownProps?.items &&
                    dropdownProps.items.length > 0 && (
                        <SingleSelect
                            label={dropdownProps.label || ''}
                            placeholder={dropdownProps.placeholder || ''}
                            items={dropdownProps.items || []}
                            selected={dropdownProps.selected || ''}
                            onSelect={dropdownProps.onSelect || (() => {})}
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

export default StatCardV2NoData
