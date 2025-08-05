import { forwardRef } from 'react'
import { Filter } from 'lucide-react'
import { DataTableHeaderProps } from './types'
import { Button } from '../../../main'
import { ButtonSize, ButtonType } from '../../Button/types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { SearchInput } from '../../Inputs/SearchInput'
import { FOUNDATION_THEME } from '../../../tokens'
import { TableTokenType } from '../dataTable.tokens'
import { Popover } from '../../Popover'
import { PopoverSize } from '../../Popover/types'
import { useComponentToken } from '../../../context/useComponentToken'
import { useMobileDataTable } from '../hooks/useMobileDataTable'

const DataTableHeader = forwardRef<
    HTMLDivElement,
    DataTableHeaderProps<Record<string, unknown>>
>(
    (
        {
            title,
            description,
            showToolbar = true,
            enableSearch = false,
            searchPlaceholder = 'Search...',
            searchConfig,
            enableAdvancedFilter = false,
            advancedFilterComponent: AdvancedFilterComponent,
            advancedFilters = [],
            onSearch,
            onAdvancedFiltersChange,
            onClearAllFilters,
            headerSlot1,
            headerSlot2,
            headerSlot3,
        },
        ref
    ) => {
        const tableToken = useComponentToken('TABLE') as TableTokenType
        const mobileConfig = useMobileDataTable()

        if (!title && !description && !showToolbar) {
            return null
        }

        if (mobileConfig.isMobile) {
            return (
                <Block
                    ref={ref}
                    display="flex"
                    flexDirection="column"
                    marginBottom={tableToken.header.marginBottom}
                    gap={FOUNDATION_THEME.unit[8]}
                    maxWidth={tableToken.header.maxWidth}
                    overflowX={tableToken.header.overflowX}
                    overflowY="hidden"
                    style={{ minWidth: 0, height: 'auto' }}
                >
                    {/* Title and Filters Row */}
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[8]}
                        style={{ minWidth: 0 }}
                    >
                        {title && (
                            <PrimitiveText
                                as="h2"
                                fontSize={tableToken.header.title.fontSize}
                                fontWeight={tableToken.header.title.fontWeight}
                                color={tableToken.header.title.color}
                                style={{
                                    minWidth: 0,
                                    lineHeight: '1.2',
                                    flex: 1,
                                }}
                                truncate
                            >
                                {title}
                            </PrimitiveText>
                        )}

                        {showToolbar && (
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={FOUNDATION_THEME.unit[8]}
                                style={{ flexShrink: 0 }}
                            >
                                {(enableSearch || enableAdvancedFilter) && (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={FOUNDATION_THEME.unit[8]}
                                    >
                                        {enableSearch && (
                                            <Block
                                                display="flex"
                                                alignItems="center"
                                                style={{
                                                    minWidth: '120px',
                                                    maxWidth: '150px',
                                                }}
                                            >
                                                <SearchInput
                                                    placeholder={
                                                        searchPlaceholder
                                                    }
                                                    value={searchConfig.query}
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLInputElement>
                                                    ) =>
                                                        onSearch(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Block>
                                        )}

                                        {enableAdvancedFilter &&
                                            AdvancedFilterComponent && (
                                                <Block
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <Popover
                                                        trigger={
                                                            <Button
                                                                buttonType={
                                                                    advancedFilters.length >
                                                                    0
                                                                        ? ButtonType.PRIMARY
                                                                        : ButtonType.SECONDARY
                                                                }
                                                                leadingIcon={
                                                                    <Filter />
                                                                }
                                                                size={
                                                                    ButtonSize.SMALL
                                                                }
                                                            >
                                                                {advancedFilters.length >
                                                                    0 &&
                                                                    `(${advancedFilters.length})`}
                                                            </Button>
                                                        }
                                                        size={
                                                            PopoverSize.MEDIUM
                                                        }
                                                        align="end"
                                                        alignOffset={-20}
                                                        secondaryAction={{
                                                            onClick:
                                                                onClearAllFilters,
                                                            isDisabled:
                                                                !searchConfig.query.trim() &&
                                                                advancedFilters.length ===
                                                                    0,
                                                        }}
                                                    >
                                                        <Block
                                                            display="flex"
                                                            flexDirection="column"
                                                            gap={
                                                                FOUNDATION_THEME
                                                                    .unit[8]
                                                            }
                                                            style={{
                                                                maxHeight:
                                                                    '400px',
                                                                overflowY:
                                                                    'auto',
                                                                minWidth:
                                                                    '300px',
                                                            }}
                                                        >
                                                            <AdvancedFilterComponent
                                                                filters={
                                                                    advancedFilters
                                                                }
                                                                onFiltersChange={
                                                                    onAdvancedFiltersChange ||
                                                                    (() => {})
                                                                }
                                                                onClearFilters={
                                                                    onClearAllFilters
                                                                }
                                                            />
                                                        </Block>
                                                    </Popover>
                                                </Block>
                                            )}
                                    </Block>
                                )}

                                {headerSlot1 && (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        maxHeight={
                                            tableToken.header.headerSlot1
                                                .maxHeight
                                        }
                                        flexShrink={0}
                                    >
                                        {headerSlot1}
                                    </Block>
                                )}

                                {headerSlot2 && (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        maxHeight={
                                            tableToken.header.headerSlot2
                                                .maxHeight
                                        }
                                        flexShrink={0}
                                    >
                                        {headerSlot2}
                                    </Block>
                                )}

                                {headerSlot3 && (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        maxHeight={
                                            tableToken.header.headerSlot3
                                                .maxHeight
                                        }
                                        flexShrink={0}
                                    >
                                        {headerSlot3}
                                    </Block>
                                )}
                            </Block>
                        )}
                    </Block>

                    {description && (
                        <PrimitiveText
                            as="p"
                            fontSize={tableToken.header.description.fontSize}
                            color={tableToken.header.description.color}
                            style={{
                                lineHeight: '1.4',
                                minWidth: 0,
                                width: '100%',
                            }}
                        >
                            {description}
                        </PrimitiveText>
                    )}
                </Block>
            )
        }

        return (
            <Block
                ref={ref}
                display={tableToken.header.display}
                justifyContent={tableToken.header.justifyContent}
                alignItems="center"
                marginBottom={tableToken.header.marginBottom}
                gap={tableToken.header.gap}
                maxWidth={tableToken.header.maxWidth}
                overflowX={tableToken.header.overflowX}
                overflowY="hidden"
                style={{ minWidth: 0, height: 'auto' }}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={FOUNDATION_THEME.unit[10]}
                    style={{ minWidth: 0, flexShrink: 1, maxWidth: '40%' }}
                >
                    {title && (
                        <PrimitiveText
                            as="h2"
                            fontSize={tableToken.header.title.fontSize}
                            fontWeight={tableToken.header.title.fontWeight}
                            color={tableToken.header.title.color}
                            style={{ minWidth: 0, lineHeight: '1.2' }}
                            truncate
                        >
                            {title}
                        </PrimitiveText>
                    )}
                    {description && (
                        <PrimitiveText
                            as="p"
                            fontSize={tableToken.header.description.fontSize}
                            color={tableToken.header.description.color}
                            style={{ lineHeight: '1.4', minWidth: 0 }}
                            truncate
                        >
                            {description}
                        </PrimitiveText>
                    )}
                </Block>

                {showToolbar && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[8]}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            justifyContent: 'flex-end',
                        }}
                    >
                        {(enableSearch || enableAdvancedFilter) && (
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={FOUNDATION_THEME.unit[8]}
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                {enableSearch && (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={FOUNDATION_THEME.unit[8]}
                                        style={{
                                            minWidth: '150px',
                                            maxWidth: '250px',
                                            flex: 1,
                                        }}
                                    >
                                        <SearchInput
                                            placeholder={searchPlaceholder}
                                            value={searchConfig.query}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => onSearch(event.target.value)}
                                        />
                                    </Block>
                                )}

                                {enableAdvancedFilter &&
                                    AdvancedFilterComponent && (
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={FOUNDATION_THEME.unit[8]}
                                            style={{ flexShrink: 0 }}
                                        >
                                            <Popover
                                                trigger={
                                                    <Button
                                                        buttonType={
                                                            advancedFilters.length >
                                                            0
                                                                ? ButtonType.PRIMARY
                                                                : ButtonType.SECONDARY
                                                        }
                                                        leadingIcon={<Filter />}
                                                        size={ButtonSize.SMALL}
                                                    >
                                                        Advanced Filters{' '}
                                                        {advancedFilters.length >
                                                            0 &&
                                                            `(${advancedFilters.length})`}
                                                    </Button>
                                                }
                                                size={PopoverSize.MEDIUM}
                                                align="end"
                                                alignOffset={-20}
                                                secondaryAction={{
                                                    onClick: onClearAllFilters,
                                                    isDisabled:
                                                        !searchConfig.query.trim() &&
                                                        advancedFilters.length ===
                                                            0,
                                                }}
                                            >
                                                <Block
                                                    display="flex"
                                                    flexDirection="column"
                                                    gap={
                                                        FOUNDATION_THEME.unit[8]
                                                    }
                                                    style={{
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        minWidth: '300px',
                                                    }}
                                                >
                                                    <AdvancedFilterComponent
                                                        filters={
                                                            advancedFilters
                                                        }
                                                        onFiltersChange={
                                                            onAdvancedFiltersChange ||
                                                            (() => {})
                                                        }
                                                        onClearFilters={
                                                            onClearAllFilters
                                                        }
                                                    />
                                                </Block>
                                            </Popover>
                                        </Block>
                                    )}
                            </Block>
                        )}

                        {headerSlot1 && (
                            <Block
                                display="flex"
                                alignItems="center"
                                maxHeight={
                                    tableToken.header.headerSlot1.maxHeight
                                }
                                flexShrink={0}
                                style={{ minWidth: 0 }}
                            >
                                {headerSlot1}
                            </Block>
                        )}

                        {headerSlot2 && (
                            <Block
                                display="flex"
                                alignItems="center"
                                maxHeight={
                                    tableToken.header.headerSlot2.maxHeight
                                }
                                flexShrink={0}
                                style={{ minWidth: 0 }}
                            >
                                {headerSlot2}
                            </Block>
                        )}

                        {headerSlot3 && (
                            <Block
                                display="flex"
                                alignItems="center"
                                maxHeight={
                                    tableToken.header.headerSlot3.maxHeight
                                }
                                flexShrink={0}
                                style={{ minWidth: 0 }}
                            >
                                {headerSlot3}
                            </Block>
                        )}
                    </Block>
                )}
            </Block>
        )
    }
)

DataTableHeader.displayName = 'DataTableHeader'

export default DataTableHeader
