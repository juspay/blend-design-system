import { useState } from 'react'
import { AdvancedFilterProps } from '../../../../packages/blend/lib/components/DataTable/types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import PrimitiveText from '../../../../packages/blend/lib/components/Primitives/PrimitiveText/PrimitiveText'
import PrimitiveInput from '../.../../../../../packages/blend/lib/components/Primitives/PrimitiveInput/PrimitiveInput'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import { Plus, X, Filter } from 'lucide-react'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'

export type FilterRule = {
    id: string
    field: string
    operator: string
    value: string
}

const AdvancedFilterComponent: React.FC<AdvancedFilterProps> = ({
    filters,
    onFiltersChange,
    onClearFilters,
}) => {
    const [localFilters, setLocalFilters] = useState<FilterRule[]>(
        (filters as FilterRule[]) || []
    )

    const fieldOptions = [
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'role', label: 'Role' },
        { value: 'department', label: 'Department' },
        { value: 'status', label: 'Status' },
    ]

    const operatorOptions = [
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'startsWith', label: 'Starts with' },
        { value: 'endsWith', label: 'Ends with' },
    ]

    const addFilter = () => {
        const newFilter: FilterRule = {
            id: Date.now().toString(),
            field: 'name',
            operator: 'contains',
            value: '',
        }
        const updatedFilters = [...localFilters, newFilter]
        setLocalFilters(updatedFilters)
        onFiltersChange(updatedFilters)
    }

    const removeFilter = (id: string) => {
        const updatedFilters = localFilters.filter((filter) => filter.id !== id)
        setLocalFilters(updatedFilters)
        onFiltersChange(updatedFilters)
    }

    const updateFilter = (
        id: string,
        field: keyof FilterRule,
        value: string
    ) => {
        const updatedFilters = localFilters.map((filter) =>
            filter.id === id ? { ...filter, [field]: value } : filter
        )
        setLocalFilters(updatedFilters)
        onFiltersChange(updatedFilters)
    }

    const clearAll = () => {
        setLocalFilters([])
        onClearFilters()
    }

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={FOUNDATION_THEME.unit[16]}
            style={{ minWidth: '400px' }}
        >
            <Block
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Block
                    display="flex"
                    alignItems="center"
                    gap={FOUNDATION_THEME.unit[8]}
                >
                    <Filter
                        size={16}
                        color={FOUNDATION_THEME.colors.primary[600]}
                    />
                    <PrimitiveText
                        fontSize={FOUNDATION_THEME.font.size.body.md.fontSize}
                        fontWeight={FOUNDATION_THEME.font.weight[600]}
                        color={FOUNDATION_THEME.colors.gray[800]}
                    >
                        Advanced Filters
                    </PrimitiveText>
                </Block>
                {localFilters.length > 0 && (
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        onClick={clearAll}
                    >
                        Clear All
                    </Button>
                )}
            </Block>

            <PrimitiveText
                fontSize={FOUNDATION_THEME.font.size.body.sm.fontSize}
                color={FOUNDATION_THEME.colors.gray[600]}
                style={{ lineHeight: '1.5' }}
            >
                Create custom filters for server-side data processing. These
                filters are passed to your API for handling.
            </PrimitiveText>

            {localFilters.length === 0 ? (
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={FOUNDATION_THEME.unit[12]}
                    style={{
                        padding: FOUNDATION_THEME.unit[24],
                        border: `2px dashed ${FOUNDATION_THEME.colors.gray[300]}`,
                        borderRadius: FOUNDATION_THEME.border.radius[8],
                        backgroundColor: FOUNDATION_THEME.colors.gray[25],
                    }}
                >
                    <Filter
                        size={32}
                        color={FOUNDATION_THEME.colors.gray[400]}
                    />
                    <PrimitiveText
                        fontSize={FOUNDATION_THEME.font.size.body.md.fontSize}
                        color={FOUNDATION_THEME.colors.gray[500]}
                        style={{ textAlign: 'center' }}
                    >
                        No advanced filters applied
                    </PrimitiveText>
                    <PrimitiveText
                        fontSize={FOUNDATION_THEME.font.size.body.sm.fontSize}
                        color={FOUNDATION_THEME.colors.gray[400]}
                        style={{ textAlign: 'center' }}
                    >
                        Add your first filter to start narrowing down results
                    </PrimitiveText>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        leadingIcon={<Plus />}
                        size={ButtonSize.MEDIUM}
                        onClick={addFilter}
                    >
                        Add Filter Rule
                    </Button>
                </Block>
            ) : (
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={FOUNDATION_THEME.unit[12]}
                >
                    {localFilters.map((filter, index) => (
                        <Block
                            key={filter.id}
                            style={{
                                padding: FOUNDATION_THEME.unit[16],
                                border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                                borderRadius: FOUNDATION_THEME.border.radius[8],
                                backgroundColor:
                                    FOUNDATION_THEME.colors.gray[0],
                            }}
                        >
                            {/* Filter Rule Header */}
                            <Block
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                marginBottom={FOUNDATION_THEME.unit[12]}
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    gap={FOUNDATION_THEME.unit[8]}
                                >
                                    {index > 0 && (
                                        <Block
                                            style={{
                                                padding: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[8]}`,
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .primary[50],
                                                color: FOUNDATION_THEME.colors
                                                    .primary[700],
                                                borderRadius:
                                                    FOUNDATION_THEME.border
                                                        .radius[4],
                                                fontSize:
                                                    FOUNDATION_THEME.font.size
                                                        .body.xs.fontSize,
                                                fontWeight:
                                                    FOUNDATION_THEME.font
                                                        .weight[600],
                                            }}
                                        >
                                            AND
                                        </Block>
                                    )}
                                    <PrimitiveText
                                        fontSize={
                                            FOUNDATION_THEME.font.size.body.sm
                                                .fontSize
                                        }
                                        fontWeight={
                                            FOUNDATION_THEME.font.weight[500]
                                        }
                                        color={
                                            FOUNDATION_THEME.colors.gray[700]
                                        }
                                    >
                                        Filter Rule {index + 1}
                                    </PrimitiveText>
                                </Block>
                                <Button
                                    buttonType={ButtonType.DANGER}
                                    leadingIcon={<X />}
                                    size={ButtonSize.SMALL}
                                    onClick={() => removeFilter(filter.id)}
                                />
                            </Block>

                            <Block
                                display="grid"
                                style={{
                                    gridTemplateColumns: '1fr 1fr 2fr',
                                    gap: FOUNDATION_THEME.unit[12],
                                    alignItems: 'end',
                                }}
                            >
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={FOUNDATION_THEME.unit[4]}
                                >
                                    <PrimitiveText
                                        fontSize={
                                            FOUNDATION_THEME.font.size.body.xs
                                                .fontSize
                                        }
                                        fontWeight={
                                            FOUNDATION_THEME.font.weight[500]
                                        }
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        Field
                                    </PrimitiveText>
                                    <select
                                        value={filter.field}
                                        onChange={(e) =>
                                            updateFilter(
                                                filter.id,
                                                'field',
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            height: '40px',
                                            border: `1px solid ${FOUNDATION_THEME.colors.gray[300]}`,
                                            borderRadius:
                                                FOUNDATION_THEME.border
                                                    .radius[6],
                                            padding: `0 ${FOUNDATION_THEME.unit[12]}`,
                                            fontSize:
                                                FOUNDATION_THEME.font.size.body
                                                    .sm.fontSize,
                                            backgroundColor:
                                                FOUNDATION_THEME.colors.gray[0],
                                            color: FOUNDATION_THEME.colors
                                                .gray[800],
                                            outline: 'none',
                                            cursor: 'pointer',
                                            width: '100%',
                                        }}
                                    >
                                        {fieldOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </Block>

                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={FOUNDATION_THEME.unit[4]}
                                >
                                    <PrimitiveText
                                        fontSize={
                                            FOUNDATION_THEME.font.size.body.xs
                                                .fontSize
                                        }
                                        fontWeight={
                                            FOUNDATION_THEME.font.weight[500]
                                        }
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        Operator
                                    </PrimitiveText>
                                    <select
                                        value={filter.operator}
                                        onChange={(e) =>
                                            updateFilter(
                                                filter.id,
                                                'operator',
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            height: '40px',
                                            border: `1px solid ${FOUNDATION_THEME.colors.gray[300]}`,
                                            borderRadius:
                                                FOUNDATION_THEME.border
                                                    .radius[6],
                                            padding: `0 ${FOUNDATION_THEME.unit[12]}`,
                                            fontSize:
                                                FOUNDATION_THEME.font.size.body
                                                    .sm.fontSize,
                                            backgroundColor:
                                                FOUNDATION_THEME.colors.gray[0],
                                            color: FOUNDATION_THEME.colors
                                                .gray[800],
                                            outline: 'none',
                                            cursor: 'pointer',
                                            width: '100%',
                                        }}
                                    >
                                        {operatorOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </Block>

                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={FOUNDATION_THEME.unit[4]}
                                >
                                    <PrimitiveText
                                        fontSize={
                                            FOUNDATION_THEME.font.size.body.xs
                                                .fontSize
                                        }
                                        fontWeight={
                                            FOUNDATION_THEME.font.weight[500]
                                        }
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        Value
                                    </PrimitiveText>
                                    <PrimitiveInput
                                        placeholder="Enter filter value..."
                                        value={filter.value}
                                        onChange={(e) =>
                                            updateFilter(
                                                filter.id,
                                                'value',
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            height: '40px',
                                            border: `1px solid ${FOUNDATION_THEME.colors.gray[300]}`,
                                            borderRadius:
                                                FOUNDATION_THEME.border
                                                    .radius[6],
                                            padding: `0 ${FOUNDATION_THEME.unit[12]}`,
                                            fontSize:
                                                FOUNDATION_THEME.font.size.body
                                                    .sm.fontSize,
                                            backgroundColor:
                                                FOUNDATION_THEME.colors.gray[0],
                                            outline: 'none',
                                            width: '100%',
                                        }}
                                    />
                                </Block>
                            </Block>
                        </Block>
                    ))}

                    <Block display="flex" justifyContent="center">
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Plus />}
                            size={ButtonSize.MEDIUM}
                            onClick={addFilter}
                        >
                            Add Another Filter
                        </Button>
                    </Block>
                </Block>
            )}

            {localFilters.length > 0 && (
                <Block
                    style={{
                        padding: FOUNDATION_THEME.unit[12],
                        backgroundColor: FOUNDATION_THEME.colors.primary[25],
                        border: `1px solid ${FOUNDATION_THEME.colors.primary[200]}`,
                        borderRadius: FOUNDATION_THEME.border.radius[6],
                    }}
                >
                    <PrimitiveText
                        fontSize={FOUNDATION_THEME.font.size.body.sm.fontSize}
                        color={FOUNDATION_THEME.colors.primary[800]}
                        style={{ lineHeight: '1.5' }}
                    >
                        <strong>{localFilters.length}</strong> filter rule
                        {localFilters.length !== 1 ? 's' : ''} configured. These
                        will be sent to your server for processing.
                    </PrimitiveText>
                </Block>
            )}
        </Block>
    )
}

export default AdvancedFilterComponent
