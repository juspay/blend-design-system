import { useState } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { SearchInput } from '../../../../packages/blend/lib/main'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'

const SearchInputDemo = () => {
    const [basicSearch, setBasicSearch] = useState('')
    const [searchWithIcon, setSearchWithIcon] = useState('')
    const [searchWithActions, setSearchWithActions] = useState('')
    const [errorSearch, setErrorSearch] = useState('')
    const [disabledSearch, setDisabledSearch] = useState('Disabled input')

    const clearSearch = (setter: (value: string) => void) => {
        setter('')
    }

    return (
        <div
            style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
            }}
        >
            <div>
                <Text
                    variant="heading.lg"
                    fontWeight={700}
                    color={FOUNDATION_THEME.colors.gray[900]}
                >
                    Search Input Demo
                </Text>
                <div style={{ marginTop: '0.5rem' }}>
                    <Text
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.gray[600]}
                    >
                        Demonstrates different states and configurations of the
                        SearchInput component
                    </Text>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                }}
            >
                {/* Basic Search Input */}
                <Block>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.lg"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.gray[800]}
                        >
                            Basic Search Input
                        </Text>
                    </div>
                    <Block width="400px">
                        <SearchInput
                            placeholder="Search..."
                            value={basicSearch}
                            onChange={(e) => setBasicSearch(e.target.value)}
                        />
                    </Block>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[500]}
                        >
                            Default state - hover and focus to see state changes
                        </Text>
                    </div>
                </Block>

                {/* Search Input with Left Icon */}
                <Block>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.lg"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.gray[800]}
                        >
                            Search Input with Left Icon
                        </Text>
                    </div>
                    <Block width="400px">
                        <SearchInput
                            placeholder="Search with icon..."
                            value={searchWithIcon}
                            onChange={(e) => setSearchWithIcon(e.target.value)}
                            leftSlot={<Search />}
                        />
                    </Block>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[500]}
                        >
                            With search icon on the left
                        </Text>
                    </div>
                </Block>

                {/* Search Input with Actions */}
                <Block>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.lg"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.gray[800]}
                        >
                            Search Input with Actions
                        </Text>
                    </div>
                    <Block width="400px">
                        <SearchInput
                            placeholder="Search with actions..."
                            value={searchWithActions}
                            onChange={(e) =>
                                setSearchWithActions(e.target.value)
                            }
                            leftSlot={<Search />}
                            rightSlot={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                    }}
                                >
                                    {searchWithActions && (
                                        <button
                                            onClick={() =>
                                                clearSearch(
                                                    setSearchWithActions
                                                )
                                            }
                                            style={{
                                                padding: '0.25rem',
                                                border: 'none',
                                                background: 'transparent',
                                                borderRadius: '0.25rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            type="button"
                                        >
                                            <X
                                                size={14}
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[400]
                                                }
                                            />
                                        </button>
                                    )}
                                    <button
                                        style={{
                                            padding: '0.25rem',
                                            border: 'none',
                                            background: 'transparent',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        type="button"
                                    >
                                        <Filter
                                            size={14}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                        />
                                    </button>
                                </div>
                            }
                        />
                    </Block>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[500]}
                        >
                            With search icon and action buttons (clear and
                            filter)
                        </Text>
                    </div>
                </Block>

                {/* Error State */}
                <Block>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.lg"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.gray[800]}
                        >
                            Error State
                        </Text>
                    </div>
                    <Block width="400px">
                        <SearchInput
                            placeholder="Search with error..."
                            value={errorSearch}
                            onChange={(e) => setErrorSearch(e.target.value)}
                            error={true}
                            leftSlot={<Search />}
                        />
                    </Block>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.red[600]}
                        >
                            Error state with red border and text color
                        </Text>
                    </div>
                </Block>

                {/* Disabled State */}
                <Block>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.lg"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.gray[800]}
                        >
                            Disabled State
                        </Text>
                    </div>
                    <Block width="400px">
                        <SearchInput
                            placeholder="Disabled search..."
                            value={disabledSearch}
                            onChange={(e) => setDisabledSearch(e.target.value)}
                            disabled={true}
                            leftSlot={<Search />}
                        />
                    </Block>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[400]}
                        >
                            Disabled state with muted colors and no interaction
                        </Text>
                    </div>
                </Block>

                {/* Interactive Demo */}
                <Block>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.lg"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.gray[800]}
                        >
                            Interactive Demo
                        </Text>
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Try typing, hovering, focusing, and interacting with
                            the search input below:
                        </Text>
                    </div>
                    <Block width="400px">
                        <SearchInput
                            placeholder="Try me! Type, hover, focus..."
                            value={searchWithActions}
                            onChange={(e) =>
                                setSearchWithActions(e.target.value)
                            }
                            leftSlot={<Search />}
                            rightSlot={
                                searchWithActions ? (
                                    <button
                                        onClick={() =>
                                            clearSearch(setSearchWithActions)
                                        }
                                        style={{
                                            padding: '0.25rem',
                                            border: 'none',
                                            background: 'transparent',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        type="button"
                                        title="Clear search"
                                    >
                                        <X
                                            size={14}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                        />
                                    </button>
                                ) : (
                                    <span
                                        style={{
                                            fontSize: 12,
                                            color: FOUNDATION_THEME.colors
                                                .gray[300],
                                        }}
                                    >
                                        ⌘ + K
                                    </span>
                                )
                            }
                        />
                    </Block>
                    {searchWithActions && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <Text
                                variant="body.sm"
                                color={FOUNDATION_THEME.colors.gray[600]}
                            >
                                You typed: "{searchWithActions}"
                            </Text>
                        </div>
                    )}
                </Block>
            </div>
        </div>
    )
}

export default SearchInputDemo
