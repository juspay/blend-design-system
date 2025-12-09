import { forwardRef, useState } from 'react'
import { Filter, Search, ListFilter, X } from 'lucide-react'
import { DataTableHeaderProps } from './types'
import { Button } from '../../../main'
import { ButtonSize, ButtonType } from '../../Button/types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { SearchInput } from '../../Inputs/SearchInput'
import { FOUNDATION_THEME } from '../../../tokens'
import { TableTokenType } from '../dataTable.tokens'
import { Popover } from '../../Popover'
import { PopoverSize } from '../../Popover/types'
import { useMobileDataTable } from '../hooks/useMobileDataTable'
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from '../../Drawer'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'

const SearchCloseButton = ({ onClose }: { onClose: () => void }) => (
    <PrimitiveButton
        onClick={onClose}
        contentCentered
        padding="4px"
        borderRadius="4px"
        backgroundColor="transparent"
        border="none"
        cursor="pointer"
        aria-label="Close search"
        type="button"
        _hover={{
            backgroundColor: FOUNDATION_THEME.colors.gray[100],
        }}
    >
        <X
            size={16}
            color={FOUNDATION_THEME.colors.gray[600]}
            aria-hidden="true"
        />
    </PrimitiveButton>
)

const MobileSearchInput = ({
    searchPlaceholder,
    searchConfig,
    onSearch,
    onClose,
}: {
    searchPlaceholder: string
    searchConfig: { query: string }
    onSearch: (query: string) => void
    onClose: () => void
}) => (
    <Block style={{ minWidth: '150px', maxWidth: '200px' }}>
        <SearchInput
            placeholder={searchPlaceholder}
            value={searchConfig.query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSearch(event.target.value)
            }
            onBlur={() => {
                if (!searchConfig.query.trim()) {
                    onClose()
                }
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Escape') {
                    onClose()
                }
            }}
            rightSlot={<SearchCloseButton onClose={onClose} />}
            autoFocus
        />
    </Block>
)

const DataTableHeader = forwardRef<
    HTMLDivElement,
    DataTableHeaderProps<Record<string, unknown>>
>(
    (
        {
            title,
            description,
            showHeader = true,
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
        const tableToken = useResponsiveTokens<TableTokenType>('TABLE')
        const mobileConfig = useMobileDataTable()

        const [isDrawerOpen, setIsDrawerOpen] = useState(false)
        const [isSearchOpen, setIsSearchOpen] = useState(false)

        // Don't render anything if showHeader is false
        if (!showHeader) {
            return null
        }

        const hasToolbarContent =
            showToolbar &&
            (enableSearch ||
                enableAdvancedFilter ||
                headerSlot1 ||
                headerSlot2 ||
                headerSlot3)

        if (!title && !description && !hasToolbarContent) {
            return null
        }

        if (mobileConfig.isMobile) {
            return (
                <Block
                    ref={ref}
                    display="flex"
                    flexDirection="column"
                    marginBottom={tableToken.header.marginBottom}
                    maxWidth={tableToken.header.maxWidth}
                    overflowX={tableToken.header.overflowX}
                    overflowY="hidden"
                    padding={`0 ${FOUNDATION_THEME.unit[16]}`}
                    style={{ minWidth: 0, height: 'auto' }}
                >
                    <Block
                        display="flex"
                        justifyContent={
                            tableToken.header.titleRow.justifyContent
                        }
                        alignItems={tableToken.header.titleRow.alignItems}
                        gap={tableToken.header.titleRow.gap}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                        style={{ minWidth: 0 }}
                    >
                        {title && (
                            <PrimitiveText
                                as="h2"
                                fontSize={
                                    FOUNDATION_THEME.font.size.heading.md
                                        .fontSize
                                }
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[800]}
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
                                gap={tableToken.header.actionIcons.gap}
                                style={{ flexShrink: 0 }}
                            >
                                {enableSearch && isSearchOpen && (
                                    <MobileSearchInput
                                        searchPlaceholder={searchPlaceholder}
                                        searchConfig={searchConfig}
                                        onSearch={onSearch}
                                        onClose={() => setIsSearchOpen(false)}
                                    />
                                )}

                                {enableSearch && !isSearchOpen && (
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        leadingIcon={
                                            <Search
                                                size={parseInt(
                                                    String(
                                                        tableToken.header
                                                            .actionIcons
                                                            .searchIcon.width
                                                    )
                                                )}
                                                aria-hidden="true"
                                            />
                                        }
                                        aria-label="Open search"
                                        size={ButtonSize.SMALL}
                                        onClick={() => setIsSearchOpen(true)}
                                    />
                                )}

                                {(enableAdvancedFilter ||
                                    headerSlot1 ||
                                    headerSlot2 ||
                                    headerSlot3) && (
                                    <Button
                                        buttonType={
                                            advancedFilters.length > 0
                                                ? ButtonType.PRIMARY
                                                : ButtonType.SECONDARY
                                        }
                                        leadingIcon={
                                            <ListFilter
                                                size={parseInt(
                                                    String(
                                                        tableToken.header
                                                            .actionIcons
                                                            .filterIcon.width
                                                    )
                                                )}
                                                aria-hidden="true"
                                            />
                                        }
                                        aria-label={`Advanced filters${advancedFilters.length > 0 ? ` (${advancedFilters.length} active)` : ''}`}
                                        size={ButtonSize.SMALL}
                                        onClick={() => setIsDrawerOpen(true)}
                                    />
                                )}
                            </Block>
                        )}
                    </Block>

                    {description && (
                        <Block
                            style={{
                                width: '100%',
                                minHeight: 'auto',
                                height: 'auto',
                                overflow: 'visible',
                            }}
                        >
                            <PrimitiveText
                                as="p"
                                fontSize={
                                    FOUNDATION_THEME.font.size.body.md.fontSize
                                }
                                color={FOUNDATION_THEME.colors.gray[500]}
                                style={{
                                    lineHeight: '1.4',
                                    minWidth: 0,
                                    width: '100%',
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    margin: 0,
                                    padding: 0,
                                    height: 'auto',
                                    minHeight: 'auto',
                                    maxHeight: 'none',
                                    overflow: 'visible',
                                    display: 'block',
                                }}
                            >
                                {description}
                            </PrimitiveText>
                        </Block>
                    )}

                    <Drawer
                        open={isDrawerOpen}
                        onOpenChange={setIsDrawerOpen}
                        direction="bottom"
                        modal={true}
                        dismissible={true}
                    >
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent contentDriven={true}>
                                <DrawerBody>
                                    <Block
                                        display="flex"
                                        flexDirection="column"
                                        gap={FOUNDATION_THEME.unit[16]}
                                    >
                                        {enableAdvancedFilter &&
                                            AdvancedFilterComponent && (
                                                <Block>
                                                    <PrimitiveText
                                                        as="h4"
                                                        fontSize={
                                                            FOUNDATION_THEME
                                                                .font.size.body
                                                                .md.fontSize
                                                        }
                                                        fontWeight={
                                                            FOUNDATION_THEME
                                                                .font
                                                                .weight[600]
                                                        }
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[800]
                                                        }
                                                        style={{
                                                            marginBottom:
                                                                FOUNDATION_THEME
                                                                    .unit[8],
                                                        }}
                                                    >
                                                        Advanced Filters
                                                    </PrimitiveText>
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
                                            )}

                                        {(headerSlot1 ||
                                            headerSlot2 ||
                                            headerSlot3) && (
                                            <Block>
                                                <PrimitiveText
                                                    as="h4"
                                                    fontSize={
                                                        FOUNDATION_THEME.font
                                                            .size.body.md
                                                            .fontSize
                                                    }
                                                    fontWeight={
                                                        FOUNDATION_THEME.font
                                                            .weight[600]
                                                    }
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[800]
                                                    }
                                                    style={{
                                                        marginBottom:
                                                            FOUNDATION_THEME
                                                                .unit[8],
                                                    }}
                                                >
                                                    Actions
                                                </PrimitiveText>
                                                <Block
                                                    display="flex"
                                                    flexDirection="column"
                                                    gap={
                                                        FOUNDATION_THEME.unit[8]
                                                    }
                                                >
                                                    {headerSlot1 && (
                                                        <Block>
                                                            {headerSlot1}
                                                        </Block>
                                                    )}
                                                    {headerSlot2 && (
                                                        <Block>
                                                            {headerSlot2}
                                                        </Block>
                                                    )}
                                                    {headerSlot3 && (
                                                        <Block>
                                                            {headerSlot3}
                                                        </Block>
                                                    )}
                                                </Block>
                                            </Block>
                                        )}

                                        {enableAdvancedFilter &&
                                            advancedFilters.length > 0 && (
                                                <Block
                                                    display="flex"
                                                    justifyContent="center"
                                                    marginTop={
                                                        FOUNDATION_THEME
                                                            .unit[16]
                                                    }
                                                >
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                        aria-label="Clear all filters"
                                                        onClick={() => {
                                                            onClearAllFilters()
                                                            setIsDrawerOpen(
                                                                false
                                                            )
                                                        }}
                                                    >
                                                        Clear All
                                                    </Button>
                                                </Block>
                                            )}
                                    </Block>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                </Block>
            )
        }

        const hasTitleOrDescription = Boolean(title || description)

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
                style={{
                    minWidth: 0,
                    height: 'auto',
                    minHeight: hasTitleOrDescription
                        ? FOUNDATION_THEME.unit[48]
                        : 'auto',
                }}
            >
                {hasTitleOrDescription && (
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={FOUNDATION_THEME.unit[10]}
                        style={{
                            minWidth: 0,
                            flexShrink: 1,
                            maxWidth: '40%',
                            minHeight: FOUNDATION_THEME.unit[40],
                        }}
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
                                fontSize={
                                    tableToken.header.description.fontSize
                                }
                                color={tableToken.header.description.color}
                                style={{ lineHeight: '1.4', minWidth: 0 }}
                                truncate
                            >
                                {description}
                            </PrimitiveText>
                        )}
                    </Block>
                )}

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
                                                        data-element="advanced-filter-button"
                                                        buttonType={
                                                            advancedFilters.length >
                                                            0
                                                                ? ButtonType.PRIMARY
                                                                : ButtonType.SECONDARY
                                                        }
                                                        leadingIcon={
                                                            <Filter aria-hidden="true" />
                                                        }
                                                        aria-label={`Advanced filters${advancedFilters.length > 0 ? ` (${advancedFilters.length} active)` : ''}`}
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
                                                    disabled:
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
                                data-element="header-slot-1"
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
                                data-element="header-slot-2"
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
                                data-element="header-slot-3"
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
