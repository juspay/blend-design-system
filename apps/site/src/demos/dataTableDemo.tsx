import { useState, useEffect } from 'react'
import {
    ColumnDefinition,
    SortDirection,
    SearchConfig,
    ColumnFilter,
    ColumnType,
    AvatarColumnProps,
    TagColumnProps,
    DropdownColumnProps,
    DateColumnProps,
} from '../../../../packages/blend/lib/components/DataTable/types'
import DataTable from '../../../../packages/blend/lib/components/DataTable/DataTable'
import { Avatar } from '../../../../packages/blend/lib/components/Avatar'
import Tag from '../../../../packages/blend/lib/components/Tags/Tags'
import {
    TagColor,
    TagVariant,
    TagSize,
} from '../../../../packages/blend/lib/components/Tags/types'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import {
    RefreshCw,
    CircleX,
    Server,
    Database,
    Zap,
    Calendar,
    Package,
    Laptop,
    Monitor,
    Tablet,
    Smartphone,
    Watch,
} from 'lucide-react'
import AdvancedFilterComponent, { FilterRule } from './AdvancedFilterComponent'

const SimpleDataTableExample = () => {
    type ProductRow = {
        id: number
        name: string
        category: DropdownColumnProps
        price: number
        launchDate: DateColumnProps
        status: TagColumnProps
        inStock: boolean
        manager: AvatarColumnProps
        rating: number
        tags: {
            values: string[]
            labels: string[]
        }
    }
    const productData: ProductRow[] = [
        {
            id: 1,
            name: 'MacBook Pro',
            category: {
                options: [
                    {
                        id: 'laptop',
                        label: 'Laptop',
                        value: 'laptop',
                        icon: <Laptop size={16} />,
                    },
                    {
                        id: 'desktop',
                        label: 'Desktop',
                        value: 'desktop',
                        icon: <Monitor size={16} />,
                    },
                    {
                        id: 'tablet',
                        label: 'Tablet',
                        value: 'tablet',
                        icon: <Tablet size={16} />,
                    },
                    {
                        id: 'smartphone',
                        label: 'Smartphone',
                        value: 'smartphone',
                        icon: <Smartphone size={16} />,
                    },
                ],
                selectedValue: 'laptop',
                placeholder: 'Select category...',
            },
            price: 2499.99,
            launchDate: {
                date: '2023-10-30',
                format: 'MMM dd, yyyy',
            },
            status: {
                text: 'Active',
                variant: 'subtle' as const,
                color: 'success' as const,
                size: 'sm' as const,
            },
            inStock: true,
            manager: {
                label: 'Tim Cook',
                sublabel: 'CEO',
                imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            rating: 4.8,
            tags: {
                values: ['premium', 'professional'],
                labels: ['Premium', 'Professional'],
            },
        },
        {
            id: 2,
            name: 'iPhone 15 Pro',
            category: {
                options: [
                    {
                        id: 'laptop',
                        label: 'Laptop',
                        value: 'laptop',
                        icon: <Laptop size={16} />,
                    },
                    {
                        id: 'desktop',
                        label: 'Desktop',
                        value: 'desktop',
                        icon: <Monitor size={16} />,
                    },
                    {
                        id: 'tablet',
                        label: 'Tablet',
                        value: 'tablet',
                        icon: <Tablet size={16} />,
                    },
                    {
                        id: 'smartphone',
                        label: 'Smartphone',
                        value: 'smartphone',
                        icon: <Smartphone size={16} />,
                    },
                ],
                selectedValue: 'smartphone',
                placeholder: 'Select category...',
            },
            price: 1199.99,
            launchDate: {
                date: '2023-09-22',
                format: 'MMM dd, yyyy',
            },
            status: {
                text: 'Active',
                variant: 'subtle' as const,
                color: 'success' as const,
                size: 'sm' as const,
            },
            inStock: true,
            manager: {
                label: 'Craig Federighi',
                sublabel: 'SVP Software Engineering',
                imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
            rating: 4.9,
            tags: {
                values: ['flagship', 'mobile'],
                labels: ['Flagship', 'Mobile'],
            },
        },
        {
            id: 3,
            name: 'iPad Air',
            category: {
                options: [
                    {
                        id: 'laptop',
                        label: 'Laptop',
                        value: 'laptop',
                        icon: <Laptop size={16} />,
                    },
                    {
                        id: 'desktop',
                        label: 'Desktop',
                        value: 'desktop',
                        icon: <Monitor size={16} />,
                    },
                    {
                        id: 'tablet',
                        label: 'Tablet',
                        value: 'tablet',
                        icon: <Tablet size={16} />,
                    },
                    {
                        id: 'smartphone',
                        label: 'Smartphone',
                        value: 'smartphone',
                        icon: <Smartphone size={16} />,
                    },
                ],
                selectedValue: 'tablet',
                placeholder: 'Select category...',
            },
            price: 799.99,
            launchDate: {
                date: '2023-08-15',
                format: 'MMM dd, yyyy',
            },
            status: {
                text: 'Discontinued',
                variant: 'subtle' as const,
                color: 'error' as const,
                size: 'sm' as const,
            },
            inStock: false,
            manager: {
                label: 'John Ternus',
                sublabel: 'SVP Hardware Engineering',
                imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            },
            rating: 4.3,
            tags: {
                values: ['tablet', 'creative'],
                labels: ['Tablet', 'Creative'],
            },
        },
        {
            id: 4,
            name: 'Mac Studio',
            category: {
                options: [
                    {
                        id: 'laptop',
                        label: 'Laptop',
                        value: 'laptop',
                        icon: <Laptop size={16} />,
                    },
                    {
                        id: 'desktop',
                        label: 'Desktop',
                        value: 'desktop',
                        icon: <Monitor size={16} />,
                    },
                    {
                        id: 'tablet',
                        label: 'Tablet',
                        value: 'tablet',
                        icon: <Tablet size={16} />,
                    },
                    {
                        id: 'smartphone',
                        label: 'Smartphone',
                        value: 'smartphone',
                        icon: <Smartphone size={16} />,
                    },
                ],
                selectedValue: 'desktop',
                placeholder: 'Select category...',
            },
            price: 3999.99,
            launchDate: {
                date: '2023-06-05',
                format: 'MMM dd, yyyy',
            },
            status: {
                text: 'Active',
                variant: 'subtle' as const,
                color: 'success' as const,
                size: 'sm' as const,
            },
            inStock: true,
            manager: {
                label: 'Johny Srouji',
                sublabel: 'SVP Hardware Technologies',
                imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            },
            rating: 4.7,
            tags: {
                values: ['professional', 'desktop', 'powerful'],
                labels: ['Professional', 'Desktop', 'Powerful'],
            },
        },
        {
            id: 5,
            name: 'Apple Watch Series 9 Ultra Pro Max with Extended Battery Life and Advanced Health Monitoring Features',
            category: {
                options: [
                    {
                        id: 'laptop',
                        label: 'Laptop',
                        value: 'laptop',
                        icon: <Laptop size={16} />,
                    },
                    {
                        id: 'desktop',
                        label: 'Desktop',
                        value: 'desktop',
                        icon: <Monitor size={16} />,
                    },
                    {
                        id: 'tablet',
                        label: 'Tablet',
                        value: 'tablet',
                        icon: <Tablet size={16} />,
                    },
                    {
                        id: 'smartphone',
                        label: 'Smartphone',
                        value: 'smartphone',
                        icon: <Smartphone size={16} />,
                    },
                    {
                        id: 'wearable',
                        label: 'Wearable',
                        value: 'wearable',
                        icon: <Watch size={16} />,
                    },
                ],
                selectedValue: 'wearable',
                placeholder: 'Select category...',
            },
            price: 599.99,
            launchDate: {
                date: '2023-09-22',
                format: 'MMM dd, yyyy',
            },
            status: {
                text: 'Active',
                variant: 'subtle' as const,
                color: 'success' as const,
                size: 'sm' as const,
            },
            inStock: true,
            manager: {
                label: 'Kevin Lynch',
                sublabel: 'VP Technology and Advanced Wearable Development',
                imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
            },
            rating: 4.6,
            tags: {
                values: ['wearable', 'health', 'fitness'],
                labels: ['Wearable', 'Health', 'Fitness'],
            },
        },
        {
            id: 6,
            name: 'MacBook Air M3 with Revolutionary Performance and All-Day Battery Life',
            category: {
                options: [
                    {
                        id: 'laptop',
                        label: 'Laptop',
                        value: 'laptop',
                        icon: <Laptop size={16} />,
                    },
                    {
                        id: 'desktop',
                        label: 'Desktop',
                        value: 'desktop',
                        icon: <Monitor size={16} />,
                    },
                    {
                        id: 'tablet',
                        label: 'Tablet',
                        value: 'tablet',
                        icon: <Tablet size={16} />,
                    },
                    {
                        id: 'smartphone',
                        label: 'Smartphone',
                        value: 'smartphone',
                        icon: <Smartphone size={16} />,
                    },
                ],
                selectedValue: 'laptop',
                placeholder: 'Select category...',
            },
            price: 1299.99,
            launchDate: {
                date: '2024-03-15',
                format: 'MMM dd, yyyy',
            },
            status: {
                text: 'Active',
                variant: 'subtle' as const,
                color: 'success' as const,
                size: 'sm' as const,
            },
            inStock: true,
            manager: {
                label: 'John Ternus',
                sublabel: 'SVP Hardware Engineering',
                imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
            },
            rating: 4.9,
            tags: {
                values: ['premium', 'portable', 'efficient'],
                labels: ['Premium', 'Portable', 'Efficient'],
            },
        },
    ]

    const productColumns: ColumnDefinition<ProductRow>[] = [
        {
            field: 'name',
            header: 'Product Name',
            type: ColumnType.TEXT,
            isSortable: true,
            isEditable: true,
            minWidth: '120px',
            maxWidth: '150px',
        },
        {
            field: 'price',
            header: 'Price',
            type: ColumnType.NUMBER,
            isSortable: true,
            isEditable: true,
            renderCell: (value: number) => (
                <span
                    style={{
                        fontWeight: 500,
                        color:
                            value > 2000
                                ? '#dc2626'
                                : value > 1000
                                  ? '#d97706'
                                  : '#16a34a',
                    }}
                >
                    ${value.toLocaleString()}
                </span>
            ),
            minWidth: '150px',
            maxWidth: '250px',
        },
        {
            field: 'launchDate',
            header: 'Launch Date',
            headerSubtext: 'Product Launch',
            type: ColumnType.DATE,
            isSortable: true,
            isEditable: false,
            renderCell: (value: unknown): React.ReactNode => {
                const dateValue = value as DateColumnProps
                const date = new Date(dateValue.date)
                return (
                    <span>
                        {date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                )
            },
            minWidth: '140px',
            maxWidth: '180px',
        },
        {
            field: 'status',
            header: 'Status',
            type: ColumnType.TAG,
            isSortable: true,
            isEditable: false,
            renderCell: (value: TagColumnProps) => (
                <Tag
                    text={value.text}
                    variant={TagVariant.SUBTLE}
                    color={
                        value.color === 'success'
                            ? TagColor.SUCCESS
                            : value.color === 'error'
                              ? TagColor.ERROR
                              : value.color === 'warning'
                                ? TagColor.WARNING
                                : TagColor.NEUTRAL
                    }
                    size={TagSize.SM}
                />
            ),
            minWidth: '100px',
            maxWidth: '140px',
        },
        {
            field: 'category',
            header: 'Category',
            headerSubtext: 'Product Category',
            type: ColumnType.DROPDOWN,
            isSortable: true,
            isEditable: false,
            renderCell: (value: unknown): React.ReactNode => {
                const dropdownValue = value as DropdownColumnProps
                const selectedOption = dropdownValue.options.find(
                    (opt) => opt.value === dropdownValue.selectedValue
                )
                return selectedOption ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        {selectedOption.icon}
                        <span>{selectedOption.label}</span>
                    </div>
                ) : (
                    // @ts-expect-error
                    <span>{dropdownValue.selectedValue}</span>
                )
            },
            minWidth: '150px',
            maxWidth: '200px',
        },
        {
            field: 'manager',
            header: 'Product Manager',
            headerSubtext: 'Responsible Person',
            type: ColumnType.AVATAR,
            isSortable: true,
            isEditable: false,
            renderCell: (value: AvatarColumnProps) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Avatar src={value.imageUrl} alt={value.label} />
                    <div>
                        <div style={{ fontWeight: 500, fontSize: '14px' }}>
                            {value.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {value.sublabel}
                        </div>
                    </div>
                </div>
            ),
            minWidth: '140px',
            maxWidth: '180px',
        },
        {
            field: 'rating',
            header: 'Rating',
            type: ColumnType.NUMBER,
            isSortable: true,
            isEditable: false,
            renderCell: (value: unknown) => {
                const numValue =
                    typeof value === 'number'
                        ? value
                        : parseFloat(String(value)) || 0
                return (
                    <span
                        style={{
                            fontWeight: 500,
                            color:
                                numValue >= 4.5
                                    ? '#16a34a'
                                    : numValue >= 4.0
                                      ? '#d97706'
                                      : '#dc2626',
                        }}
                    >
                        ⭐ {numValue.toFixed(1)}
                    </span>
                )
            },
            minWidth: '80px',
            maxWidth: '120px',
        },
        {
            field: 'tags',
            header: 'Product Tags',
            headerSubtext: 'Categories & Features',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown) => {
                const tagsData = value as {
                    values: string[]
                    labels: string[]
                }
                const getTagColor = (tag: string): TagColor => {
                    switch (tag.toLowerCase()) {
                        case 'premium':
                        case 'flagship':
                            return TagColor.SUCCESS
                        case 'professional':
                        case 'powerful':
                            return TagColor.WARNING
                        case 'creative':
                        case 'health':
                            return TagColor.NEUTRAL
                        default:
                            return TagColor.NEUTRAL
                    }
                }

                return (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: '4px',
                            overflow: 'auto',
                            whiteSpace: 'nowrap',
                            minWidth: '150px',
                            maxWidth: '100%',
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {tagsData.values.map((tag, index) => (
                            <Tag
                                key={index}
                                text={tagsData.labels?.[index] || tag}
                                variant={TagVariant.SUBTLE}
                                color={getTagColor(tag)}
                                size={TagSize.SM}
                            />
                        ))}
                    </div>
                )
            },
            minWidth: '150px',
            maxWidth: '250px',
        },
        {
            field: 'inStock',
            header: 'In Stock',
            type: ColumnType.TEXT,
            isSortable: true,
            isEditable: true,
            minWidth: '100px',
            maxWidth: '120px',
        },
    ]

    const [productTableData, setProductTableData] = useState(productData)

    const handleProductSave = (
        rowId: unknown,
        updatedRow: Record<string, unknown>
    ) => {
        console.log('🔄 handleProductSave called:', { rowId, updatedRow })

        setProductTableData((prevData) =>
            prevData.map((row) => {
                if (row.id === rowId) {
                    // Handle dropdown data updates properly
                    const updated = { ...row } as Record<string, unknown>
                    Object.keys(updatedRow).forEach((key) => {
                        if (
                            key === 'category' &&
                            typeof updatedRow[key] === 'object'
                        ) {
                            // For dropdown columns, update the entire dropdown data object
                            updated[key] = updatedRow[
                                key
                            ] as DropdownColumnProps
                            console.log(
                                '📝 Updated dropdown data:',
                                updated[key]
                            )
                        } else {
                            updated[key] = updatedRow[key]
                        }
                    })
                    return updated as ProductRow
                }
                return row
            })
        )

        console.log('✅ Product saved successfully:', { rowId, updatedRow })
    }

    const handleProductCancel = (rowId: unknown) => {
        console.log('Product edit cancelled:', rowId)
    }

    const handleFieldChange = (
        rowId: unknown,
        fieldName: string,
        value: unknown
    ) => {
        console.log('🔄 Field change:', { rowId, fieldName, value })

        // Update data immediately when inline editing is disabled
        setProductTableData((prevData) =>
            prevData.map((row) => {
                if (row.id === rowId) {
                    const updated = { ...row }
                    if (fieldName === 'category' && typeof value === 'object') {
                        updated.category = value as DropdownColumnProps
                    } else {
                        ;(updated as Record<string, unknown>)[fieldName] = value
                    }
                    return updated
                }
                return row
            })
        )
    }

    return (
        <div style={{ marginTop: '40px' }}>
            <div
                style={{
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0',
                }}
            >
                <h3
                    style={{
                        margin: '0 0 8px 0',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#15803d',
                    }}
                >
                    📦 Product Inventory - Simple DataTable Example
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#166534' }}>
                    🎯 <strong>NEW COLUMN TYPES DEMO:</strong> This table
                    showcases <strong>DROPDOWN</strong> and{' '}
                    <strong>DATE</strong> column types! The Category column is a
                    dropdown menu using the SingleSelect component with{' '}
                    <strong>icons</strong> - click on any category to see the
                    dropdown options with category icons. The Launch Date column
                    displays formatted dates. Both columns support sorting and
                    can be used for filtering. Try editing the rows to see how
                    dropdown selections work in edit mode. This is a simpler
                    example focused on the new column types without the
                    complexity of the main user management table above.
                </p>
            </div>

            <DataTable
                data={productTableData}
                columns={
                    productColumns as unknown as ColumnDefinition<
                        Record<string, unknown>
                    >[]
                }
                columnManagerPrimaryAction={{
                    text: 'Applied',
                    onClick: (selectedColumns) => {
                        console.log(
                            'Applied with selected columns:',
                            selectedColumns
                        )
                        alert(
                            `Applied column changes!\n\nSelected columns: ${selectedColumns.join(', ')}`
                        )
                    },
                }}
                columnManagerSecondaryAction={{
                    text: 'Reset',
                    onClick: () => {
                        console.log('Reset')
                    },
                }}
                idField="id"
                title="Product Inventory (Mobile: 2 Columns + Overflow)"
                description="Simple product management table demonstrating DROPDOWN and DATE column types with smart row actions. On desktop, actions appear in a fixed 200px column with overflow menu when needed. On mobile, actions appear in the overflow drawer footer for better UX."
                enableSearch={true}
                enableFiltering={true}
                enableAdvancedFilter={false}
                enableInlineEdit={false}
                enableRowExpansion={false}
                enableRowSelection={true}
                enableColumnManager={true}
                showSettings={true}
                columnFreeze={0}
                mobileColumnsToShow={2}
                pagination={{
                    currentPage: 1,
                    pageSize: 10,
                    totalRows: productTableData.length,
                    pageSizeOptions: [5, 10, 20],
                }}
                onRowSave={handleProductSave}
                onRowCancel={handleProductCancel}
                onFieldChange={handleFieldChange}
                rowActions={{
                    showEditAction: false,
                    slot1: {
                        id: 'view-details',
                        text: 'View Details',
                        buttonType: ButtonType.SECONDARY,
                        size: ButtonSize.SMALL,
                        leadingIcon: <Package size={16} />,
                        onClick: (row, _index) => {
                            const product = row as ProductRow
                            alert(
                                `Viewing details for: ${product.name} (Price: ${product.price})`
                            )
                        },
                    },
                    slot2: {
                        id: 'favorite',
                        text: 'Add to Favorites',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                        leadingIcon: <Calendar size={16} />,
                        hidden: (row) => {
                            const product = row as ProductRow
                            const statusText = (
                                product.status as TagColumnProps
                            ).text
                            return statusText === 'Discontinued'
                        },
                        onClick: (row, _index) => {
                            const product = row as ProductRow
                            alert(`Added ${product.name} to favorites!`)
                        },
                    },
                }}
                headerSlot1={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Package />}
                        size={ButtonSize.SMALL}
                        onClick={() => console.log('Product action clicked')}
                    >
                        Manage Products
                    </Button>
                }
                headerSlot2={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Calendar />}
                        size={ButtonSize.SMALL}
                        onClick={() => console.log('Calendar action clicked')}
                    >
                        Schedule
                    </Button>
                }
            />

            <div style={{ marginTop: '40px' }}>
                <div
                    style={{
                        marginBottom: '20px',
                        padding: '16px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '8px',
                        border: '1px solid #bfdbfe',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#1e40af',
                        }}
                    >
                        📱 Mobile: All Columns (No Overflow)
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#1e3a8a',
                        }}
                    >
                        🎯 <strong>MOBILE SCROLLING DEMO:</strong> This table
                        shows all columns on mobile with horizontal scrolling.
                        No overflow drawer is used - users can scroll
                        horizontally to see all columns. This is achieved by not
                        setting <code>mobileColumnsToShow</code> or setting it
                        to <code>undefined</code>.
                    </p>
                </div>

                <DataTable
                    data={productTableData}
                    columns={
                        productColumns as unknown as ColumnDefinition<
                            Record<string, unknown>
                        >[]
                    }
                    idField="id"
                    title="Product Inventory (Mobile: All Columns)"
                    description="Same table but on mobile shows all columns with horizontal scrolling instead of using the overflow drawer."
                    enableSearch={true}
                    enableFiltering={true}
                    enableAdvancedFilter={false}
                    enableInlineEdit={false}
                    enableRowExpansion={false}
                    enableRowSelection={true}
                    enableColumnManager={false}
                    showSettings={false}
                    columnFreeze={0}
                    // mobileColumnsToShow is not set, so all columns are shown on mobile
                    pagination={{
                        currentPage: 1,
                        pageSize: 10,
                        totalRows: productTableData.length,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    onRowSave={handleProductSave}
                    onRowCancel={handleProductCancel}
                    onFieldChange={handleFieldChange}
                    headerSlot1={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Package />}
                            size={ButtonSize.SMALL}
                            onClick={() =>
                                console.log('Product action clicked')
                            }
                        >
                            Manage Products
                        </Button>
                    }
                    headerSlot2={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Calendar />}
                            size={ButtonSize.SMALL}
                            onClick={() =>
                                console.log('Calendar action clicked')
                            }
                        >
                            Schedule
                        </Button>
                    }
                />
            </div>

            <div style={{ marginTop: '40px' }}>
                <div
                    style={{
                        marginBottom: '20px',
                        padding: '16px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '8px',
                        border: '1px solid #f59e0b',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#92400e',
                        }}
                    >
                        🔄 Column Sorting Control Demo
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#92400e',
                        }}
                    >
                        🎯 <strong>NEW FEATURE:</strong> This table demonstrates
                        the new <code>isSortable</code> property that allows you
                        to enable/disable sorting at the column level. Notice
                        that the <strong>Product Tags</strong> column (React
                        elements) is not sortable, and the{' '}
                        <strong>Launch Date</strong> column has been explicitly
                        disabled for sorting. Try clicking on column headers -
                        you'll see that some columns don't show sort options in
                        the filter dropdown, and clicking the header won't
                        trigger sorting for disabled columns.
                    </p>
                </div>

                <DataTable
                    data={productTableData.map((product) => ({
                        ...product,
                        specialNote: `Product #${product.id} - Sorting demo`,
                    }))}
                    columns={
                        [
                            {
                                field: 'name',
                                header: 'Product Name',
                                type: ColumnType.TEXT,
                                isSortable: true,
                                isEditable: false,
                                minWidth: '120px',
                                maxWidth: '150px',
                            },
                            {
                                field: 'price',
                                header: 'Price (Sortable)',
                                type: ColumnType.NUMBER,
                                isSortable: true,
                                isEditable: false,
                                renderCell: (value: number) => (
                                    <span
                                        style={{
                                            fontWeight: 500,
                                            color:
                                                value > 2000
                                                    ? '#dc2626'
                                                    : value > 1000
                                                      ? '#d97706'
                                                      : '#16a34a',
                                        }}
                                    >
                                        ${value.toLocaleString()}
                                    </span>
                                ),
                                minWidth: '150px',
                                maxWidth: '200px',
                            },
                            {
                                field: 'launchDate',
                                header: 'Launch Date (NOT Sortable)',
                                headerSubtext:
                                    'Sorting disabled for this column',
                                type: ColumnType.DATE,
                                isSortable: false,
                                isEditable: false,
                                renderCell: (
                                    value: unknown
                                ): React.ReactNode => {
                                    const dateValue = value as DateColumnProps
                                    const date = new Date(dateValue.date)
                                    return (
                                        <span style={{ color: '#6b7280' }}>
                                            {date.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                            <br />
                                            <small style={{ fontSize: '11px' }}>
                                                (No sorting)
                                            </small>
                                        </span>
                                    )
                                },
                                minWidth: '140px',
                                maxWidth: '180px',
                            },
                            {
                                field: 'status',
                                header: 'Status (Sortable)',
                                type: ColumnType.TAG,
                                isSortable: true,
                                isEditable: false,
                                renderCell: (value: TagColumnProps) => (
                                    <Tag
                                        text={value.text}
                                        variant={TagVariant.SUBTLE}
                                        color={
                                            value.color === 'success'
                                                ? TagColor.SUCCESS
                                                : value.color === 'error'
                                                  ? TagColor.ERROR
                                                  : value.color === 'warning'
                                                    ? TagColor.WARNING
                                                    : TagColor.NEUTRAL
                                        }
                                        size={TagSize.SM}
                                    />
                                ),
                                minWidth: '100px',
                                maxWidth: '140px',
                            },
                            {
                                field: 'rating',
                                header: 'Rating (NOT Sortable)',
                                headerSubtext: 'Sorting disabled',
                                type: ColumnType.NUMBER,
                                isSortable: false,
                                isEditable: false,
                                renderCell: (value: unknown) => {
                                    const numValue =
                                        typeof value === 'number'
                                            ? value
                                            : parseFloat(String(value)) || 0
                                    return (
                                        <span
                                            style={{
                                                fontWeight: 500,
                                                color: '#6b7280',
                                            }}
                                        >
                                            ⭐ {numValue.toFixed(1)}
                                            <br />
                                            <small style={{ fontSize: '11px' }}>
                                                (No sorting)
                                            </small>
                                        </span>
                                    )
                                },
                                minWidth: '120px',
                                maxWidth: '150px',
                            },
                            {
                                field: 'tags',
                                header: 'Product Tags (React Elements)',
                                headerSubtext:
                                    'Cannot be sorted (React elements)',
                                type: ColumnType.REACT_ELEMENT,
                                isSortable: false,
                                renderCell: (value: unknown) => {
                                    const tagsData = value as {
                                        values: string[]
                                        labels: string[]
                                    }
                                    const getTagColor = (
                                        tag: string
                                    ): TagColor => {
                                        switch (tag.toLowerCase()) {
                                            case 'premium':
                                            case 'flagship':
                                                return TagColor.SUCCESS
                                            case 'professional':
                                            case 'powerful':
                                                return TagColor.WARNING
                                            case 'creative':
                                            case 'health':
                                                return TagColor.NEUTRAL
                                            default:
                                                return TagColor.NEUTRAL
                                        }
                                    }

                                    return (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'nowrap',
                                                gap: '4px',
                                                overflow: 'auto',
                                                whiteSpace: 'nowrap',
                                                minWidth: '150px',
                                                maxWidth: '100%',
                                                scrollbarWidth: 'thin',
                                            }}
                                        >
                                            {tagsData.values.map(
                                                (tag, index) => (
                                                    <Tag
                                                        key={index}
                                                        text={
                                                            tagsData.labels?.[
                                                                index
                                                            ] || tag
                                                        }
                                                        variant={
                                                            TagVariant.SUBTLE
                                                        }
                                                        color={getTagColor(tag)}
                                                        size={TagSize.SM}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )
                                },
                                minWidth: '150px',
                                maxWidth: '250px',
                            },
                            {
                                field: 'specialNote',
                                header: 'Special Note (Sortable)',
                                type: ColumnType.TEXT,
                                isSortable: true,
                                isEditable: false,
                                renderCell: (value: unknown) => (
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#059669',
                                        }}
                                    >
                                        {String(value)}
                                    </span>
                                ),
                                minWidth: '180px',
                                maxWidth: '220px',
                            },
                        ] as unknown as ColumnDefinition<
                            Record<string, unknown>
                        >[]
                    }
                    idField="id"
                    title="Column Sorting Control Demo"
                    description="This table demonstrates the isSortable property. Some columns can be sorted (click headers or use filter dropdown), while others cannot. Notice the visual indicators and disabled sorting behavior."
                    enableSearch={true}
                    enableFiltering={true}
                    enableAdvancedFilter={false}
                    enableInlineEdit={false}
                    enableRowExpansion={false}
                    enableRowSelection={false}
                    enableColumnManager={true}
                    showSettings={false}
                    columnFreeze={0}
                    pagination={{
                        currentPage: 1,
                        pageSize: 10,
                        totalRows: productTableData.length,
                        pageSizeOptions: [5, 10, 20],
                    }}
                    headerSlot1={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Package />}
                            size={ButtonSize.SMALL}
                            onClick={() =>
                                alert(
                                    'This demo shows how isSortable works:\n\n' +
                                        '✅ Sortable columns: Product Name, Price, Status, Special Note\n' +
                                        '❌ Non-sortable columns: Launch Date, Rating, Product Tags\n\n' +
                                        'Try clicking on column headers or using the filter dropdown to see the difference!'
                                )
                            }
                        >
                            Sorting Info
                        </Button>
                    }
                />
            </div>
        </div>
    )
}

const DataTableDemo = () => {
    // Demo mode toggle
    const [isServerSideMode, setIsServerSideMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [autoSwitchToApi, setAutoSwitchToApi] = useState(true)
    const [columnFreeze, setColumnFreeze] = useState(2)
    const [enableRowSelection, setEnableRowSelection] = useState(false)
    const [enableColumnManager, setEnableColumnManager] = useState(true)
    const [showSettings, setShowSettings] = useState(true)

    // Define strict user row type matching column requirements
    type UserRow = {
        id: number
        name: AvatarColumnProps
        joinDate: string
        email: string
        role: string
        number: string
        gateway: string
        contact: string
        status: TagColumnProps
        department: string
        permissions: {
            values: string[]
            labels: string[]
        }
        revenue: string
        revenueAmount: number // New field for slider filtering
        growthRate: string
    }

    // Generate larger dataset for server-side demo
    const generateLargeDataset = (count: number): UserRow[] => {
        const names = [
            'Jesse Leos',
            'Jane Smith',
            'Robert Johnson',
            'Lisa Brown',
            'David Miller',
            'Emma Wilson',
            'Michael Clark',
            'Sarah Davis',
            'James Taylor',
            'Anna White',
            'John Doe',
            'Mary Johnson',
            'Chris Wilson',
            'Patricia Brown',
            'Daniel Garcia',
            'Jennifer Martinez',
            'Matthew Anderson',
            'Linda Taylor',
            'Anthony Thomas',
            'Barbara Jackson',
        ]

        const statuses = ['Active', 'Inactive', 'Pending', 'Suspended']

        return Array.from({ length: count }, (_, index) => {
            const userName = names[index % names.length]
            const userStatus = statuses[index % statuses.length]

            return {
                id: index + 1,
                name: {
                    label: userName,
                    sublabel: [
                        'August 2014',
                        'September 2015',
                        'March 2016',
                        'November 2017',
                        'July 2018',
                        'January 2019',
                        'April 2020',
                        'June 2021',
                        'October 2022',
                        'February 2023',
                        'May 2020',
                        'December 2021',
                        'March 2022',
                        'August 2023',
                        'November 2019',
                    ][index % 15],
                    imageUrl: `https://randomuser.me/api/portraits/${index % 2 ? 'men' : 'women'}/${index % 70}.jpg`,
                } as AvatarColumnProps,
                joinDate: [
                    'August 2014',
                    'September 2015',
                    'March 2016',
                    'November 2017',
                    'July 2018',
                    'January 2019',
                    'April 2020',
                    'June 2021',
                    'October 2022',
                    'February 2023',
                    'May 2020',
                    'December 2021',
                    'March 2022',
                    'August 2023',
                    'November 2019',
                ][index % 15],
                number: `${300 + index}`,
                gateway: [
                    'Gateway A',
                    'Gateway B',
                    'Gateway C',
                    'Gateway D',
                    'Gateway E',
                ][index % 5],
                contact: [
                    'Samantha Smith',
                    'John Doe',
                    'Emily White',
                    'Michael Green',
                    'Sarah Johnson',
                    'Peter Brown',
                    'Lucy Chen',
                    'Mark Wilson',
                    'Rachel Lee',
                    'Tom Anderson',
                    'Alice Cooper',
                    'Bob Dylan',
                    'Carol King',
                    'Dave Matthews',
                    'Eva Green',
                ][index % 15],
                status: {
                    text: userStatus,
                    variant: 'subtle' as const,
                    color:
                        userStatus === 'Active'
                            ? ('success' as const)
                            : userStatus === 'Inactive'
                              ? ('error' as const)
                              : userStatus === 'Pending'
                                ? ('warning' as const)
                                : ('neutral' as const),
                    size: 'sm' as const,
                } as TagColumnProps,
                email: [
                    'jesse@example.com',
                    'jane@example.com',
                    'robert@example.com',
                    'lisa@example.com',
                    'david@example.com',
                    'emma@example.com',
                    'michael@example.com',
                    'sarah@example.com',
                    'james@example.com',
                    'anna@example.com',
                    'john@example.com',
                    'mary@example.com',
                ][index % 12],
                role: [
                    'Admin',
                    'User',
                    'Manager',
                    'Editor',
                    'Viewer',
                    'Moderator',
                ][index % 6],
                department: [
                    'Engineering',
                    'Marketing',
                    'Sales',
                    'HR',
                    'Finance',
                    'Operations',
                ][index % 6],
                permissions: {
                    values: [
                        ['read', 'write'],
                        ['read', 'write', 'delete'],
                        ['read'],
                        ['read', 'write', 'admin'],
                        ['read', 'write'],
                        ['read'],
                        ['read', 'write', 'delete', 'admin'],
                        ['read', 'write'],
                        ['read', 'write', 'delete'],
                        ['read'],
                        ['read', 'write'],
                        ['read', 'write', 'admin'],
                    ][index % 12],
                    labels: [
                        ['Read', 'Write'],
                        ['Read', 'Write', 'Delete'],
                        ['Read'],
                        ['Read', 'Write', 'Admin'],
                        ['Read', 'Write'],
                        ['Read'],
                        ['Read', 'Write', 'Delete', 'Admin'],
                        ['Read', 'Write'],
                        ['Read', 'Write', 'Delete'],
                        ['Read'],
                        ['Read', 'Write'],
                        ['Read', 'Write', 'Admin'],
                    ][index % 12],
                },
                revenue: [
                    '$12,500.00',
                    '€8,750.50',
                    '£15,200.75',
                    '$22,100.25',
                    '₹350,000.00',
                    '$9,800.99',
                    '€14,600.33',
                    '£7,450.80',
                    '$31,200.00',
                    '₹275,500.75',
                    '$18,900.15',
                    '€11,300.90',
                    '£25,750.60',
                    '$6,850.45',
                    '₹425,000.25',
                ][index % 15],
                revenueAmount: [
                    12500, 8750.5, 15200.75, 22100.25, 350000, 9800.99,
                    14600.33, 7450.8, 31200, 275500.75, 18900.15, 11300.9,
                    25750.6, 6850.45, 425000.25,
                ][index % 15],
                growthRate: [
                    '12.5%',
                    '8.7%',
                    '15.2%',
                    '22.1%',
                    '5.8%',
                    '9.3%',
                    '14.6%',
                    '7.4%',
                    '31.2%',
                    '18.9%',
                    '11.3%',
                    '25.7%',
                    '6.8%',
                    '19.5%',
                    '13.4%',
                ][index % 15],
            }
        })
    }

    // Simulate full dataset (3000 records)
    const [fullDataset] = useState(() => generateLargeDataset(3000))

    // Current displayed data (100 records for server-side, 50 for local)
    const [data, setData] = useState(() =>
        isServerSideMode ? generateLargeDataset(100) : generateLargeDataset(50)
    )

    // Server-side state
    const [serverState, setServerState] = useState({
        searchQuery: '',
        filters: [] as FilterRule[],
        currentPage: 1,
        pageSize: 10,
        totalRecords: 3000,
    })

    const columns: ColumnDefinition<UserRow>[] = [
        {
            field: 'name',
            header: 'User Profile Information and Account Details',
            headerSubtext: 'Complete Name, Avatar & Join Date Information',
            type: ColumnType.AVATAR,
            renderCell: (value: AvatarColumnProps) => (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        gap: '12px',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={value.imageUrl} alt={value.label} />
                    <div>
                        <div style={{ fontWeight: 500, fontSize: '14px' }}>
                            {value.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            Joined in {value.sublabel}
                        </div>
                    </div>
                </div>
            ),
            isSortable: true,
            minWidth: '220px',
            maxWidth: '320px',
        },
        {
            field: 'email',
            header: 'Primary Contact Information and Communication Details',
            headerSubtext: 'Email Address for Business Communications',
            type: ColumnType.TEXT,
            isSortable: true,
            isEditable: true,
            minWidth: '150px',
            maxWidth: '250px',
        },
        {
            field: 'role',
            header: 'System Access Level and Authorization Status',
            headerSubtext: 'User Role, Permissions & Security Clearance Level',
            type: ColumnType.SELECT,
            isSortable: true,
            isEditable: true,
            minWidth: '120px',
            maxWidth: '160px',
        },
        {
            field: 'department',
            header: 'Organizational Department and Business Unit Assignment',
            type: ColumnType.MULTISELECT,
            isSortable: true,
            isEditable: true,
            minWidth: '130px',
            maxWidth: '180px',
        },
        {
            field: 'gateway',
            header: 'Network Gateway and Connection Point',
            type: ColumnType.SELECT,
            isSortable: true,
            isEditable: true,
            minWidth: '120px',
            maxWidth: '160px',
        },
        {
            field: 'status',
            header: 'Current Account Status and Activity State',
            headerSubtext: 'Real-time Account Status and Operational State',
            type: ColumnType.TAG,
            renderCell: (value: TagColumnProps) => (
                <Tag
                    text={value.text}
                    variant={TagVariant.SUBTLE}
                    color={
                        value.color === 'success'
                            ? TagColor.SUCCESS
                            : value.color === 'error'
                              ? TagColor.ERROR
                              : value.color === 'warning'
                                ? TagColor.WARNING
                                : TagColor.NEUTRAL
                    }
                    size={TagSize.SM}
                />
            ),
            isSortable: true,
            minWidth: '100px',
            maxWidth: '140px',
        },
        {
            field: 'permissions',
            header: 'Detailed User Permissions and Access Rights Matrix',
            headerSubtext:
                'Comprehensive Access Rights and Security Permissions',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown) => {
                const permissionsData = value as {
                    values: string[]
                    labels: string[]
                }
                const getPermissionColor = (permission: string): TagColor => {
                    switch (permission.toLowerCase()) {
                        case 'admin':
                            return TagColor.ERROR
                        case 'write':
                            return TagColor.WARNING
                        case 'delete':
                            return TagColor.ERROR
                        case 'read':
                            return TagColor.SUCCESS
                        default:
                            return TagColor.NEUTRAL
                    }
                }

                return (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: '4px',
                            overflow: 'auto',
                            whiteSpace: 'nowrap',
                            minWidth: '200px',
                            maxWidth: '100%',
                            scrollbarWidth: 'thin',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {permissionsData.values.map((permission, index) => (
                            <Tag
                                key={index}
                                text={
                                    permissionsData.labels?.[index] ||
                                    permission
                                }
                                variant={TagVariant.SUBTLE}
                                color={getPermissionColor(permission)}
                                size={TagSize.SM}
                            />
                        ))}
                    </div>
                )
            },

            minWidth: '200px',
            maxWidth: '350px',
        },
        {
            field: 'revenue',
            header: 'Monthly Revenue Performance and Financial Metrics',
            headerSubtext: 'Detailed Monthly Revenue Display and Analytics',
            type: ColumnType.TEXT,
            isSortable: true,
            isEditable: false,
            minWidth: '120px',
            maxWidth: '160px',
        },
        {
            field: 'growthRate',
            header: 'Business Growth Rate and Performance Indicators',
            headerSubtext: 'Monthly Growth Percentage and Trend Analysis',
            type: ColumnType.NUMBER,
            isSortable: true,
            isEditable: true,
            minWidth: '120px',
            maxWidth: '160px',
        },
        {
            field: 'revenueAmount',
            header: 'Advanced Revenue Filter and Range Selection Tool',
            headerSubtext:
                'Interactive Slider Range Filter for Revenue Analysis',
            type: ColumnType.SLIDER,
            isSortable: true,
            isEditable: false,
            sliderConfig: {
                min: 0,
                max: 500000,
                step: 1000,
                valueType: 'number',
                prefix: '$',
                suffix: '',
                decimalPlaces: 0,
            },
            minWidth: '140px',
            maxWidth: '180px',
        },
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sortConfig, setSortConfig] = useState({
        field: '',
        direction: SortDirection.NONE,
    })

    // Simulate server-side API call
    const fetchServerData = async (
        searchQuery: string,
        filters: FilterRule[],
        page: number,
        size: number
    ) => {
        setIsLoading(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        let filteredData = [...fullDataset]

        // Apply server-side search
        if (searchQuery.trim()) {
            filteredData = filteredData.filter((row) =>
                Object.values(row).some((value) =>
                    String(value)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            )
        }

        filters.forEach((filter) => {
            if (filter.value && filter.value.trim()) {
                filteredData = filteredData.filter((row) => {
                    let cellValue = (row as Record<string, unknown>)[
                        filter.field as string
                    ]

                    if (
                        filter.field === 'name' &&
                        cellValue &&
                        typeof cellValue === 'object'
                    ) {
                        cellValue = (cellValue as AvatarColumnProps).label
                    } else if (
                        filter.field === 'status' &&
                        cellValue &&
                        typeof cellValue === 'object'
                    ) {
                        cellValue = (cellValue as TagColumnProps).text
                    }

                    const cellValueStr = String(cellValue).toLowerCase()
                    const filterValueStr = filter.value.toLowerCase()

                    switch (filter.operator) {
                        case 'equals':
                            return cellValueStr === filterValueStr
                        case 'contains':
                            return cellValueStr.includes(filterValueStr)
                        case 'startsWith':
                            return cellValueStr.startsWith(filterValueStr)
                        case 'endsWith':
                            return cellValueStr.endsWith(filterValueStr)
                        default:
                            return cellValueStr.includes(filterValueStr)
                    }
                })
            }
        })

        // Apply server-side pagination
        const startIndex = (page - 1) * size
        const paginatedData = filteredData.slice(startIndex, startIndex + size)

        setData(paginatedData)
        setServerState((prev) => ({
            ...prev,
            searchQuery,
            filters,
            currentPage: page,
            pageSize: size,
            totalRecords: filteredData.length,
        }))

        setIsLoading(false)

        console.log('🚀 Server API Call:', {
            searchQuery,
            filters,
            page,
            size,
            totalResults: filteredData.length,
            returnedRecords: paginatedData.length,
        })
    }

    const autoSwitchToServerMode = () => {
        if (!isServerSideMode && autoSwitchToApi) {
            console.log(
                '🔄 Auto-switching to server-side mode for advanced filtering...'
            )
            setIsServerSideMode(true)
            return true
        }
        return false
    }

    // Handle search change (both local and server-side)
    const handleSearchChange = (searchConfig: SearchConfig) => {
        console.log('🔍 Search changed:', searchConfig)

        if (isServerSideMode) {
            // Server-side: Make API call
            fetchServerData(
                searchConfig.query,
                serverState.filters,
                1,
                pageSize
            )
        } else {
            // Local: Let DataTable handle it internally
            console.log('Local search will be handled by DataTable component')
        }
    }

    // Handle local column filter change
    const handleFilterChange = (filters: ColumnFilter[]) => {
        console.log('🔧 Local Column Filters changed:', filters)
        // Local filters are handled automatically by the DataTable component
    }

    // Handle advanced filter change (both local and server-side)
    const handleAdvancedFiltersChange = (filters: unknown[]) => {
        const typedFilters = filters as FilterRule[]
        console.log('🔧 Advanced Filters changed:', typedFilters)

        // Auto-switch to server-side if filters are applied and auto-switch is enabled
        const switched = autoSwitchToServerMode()

        if (isServerSideMode || switched) {
            // Server-side: Make API call (either already in server mode or just switched)
            fetchServerData(serverState.searchQuery, typedFilters, 1, pageSize)
        } else {
            // Local: Just update the server state for consistency
            setServerState((prev) => ({ ...prev, filters: typedFilters }))
            console.log(
                'Local advanced filtering will be handled by DataTable component'
            )
        }
    }

    // Handle pagination change (server-side only)
    const handlePageChange = (page: number) => {
        console.log('🔄 Page change requested:', { page, isServerSideMode })
        setCurrentPage(page)

        if (isServerSideMode) {
            // For server-side mode, fetch new data for the requested page
            console.log('📡 Fetching server data for page:', page)
            fetchServerData(
                serverState.searchQuery,
                serverState.filters,
                page,
                pageSize
            )
        } else {
            console.log('💻 Local pagination - no server call needed')
        }
    }

    const handlePageSizeChange = (size: number) => {
        console.log('🔄 Page size change requested:', {
            size,
            isServerSideMode,
        })
        setPageSize(size)
        setCurrentPage(1)

        if (isServerSideMode) {
            // For server-side mode, fetch new data with new page size
            console.log('📡 Fetching server data with new page size:', size)
            fetchServerData(
                serverState.searchQuery,
                serverState.filters,
                1,
                size
            )
        } else {
            console.log('💻 Local pagination - no server call needed')
        }
    }

    // Toggle between local and server-side modes
    const toggleMode = () => {
        const newMode = !isServerSideMode
        console.log('🔀 Switching mode:', {
            from: isServerSideMode ? 'server' : 'local',
            to: newMode ? 'server' : 'local',
        })
        setIsServerSideMode(newMode)

        // Reset pagination state when switching modes
        setCurrentPage(1)

        if (newMode) {
            // Switching to server-side: Load initial server data
            console.log('📡 Loading initial server data...')
            fetchServerData('', [], 1, pageSize)
        } else {
            // Switching to local: Load smaller local dataset
            console.log('💻 Loading local dataset...')
            setData(generateLargeDataset(50))
            // Reset server state when switching to local
            setServerState({
                searchQuery: '',
                filters: [],
                currentPage: 1,
                pageSize: 10,
                totalRecords: 3000,
            })
        }
    }

    // Toggle auto-switch feature
    const toggleAutoSwitch = () => {
        setAutoSwitchToApi(!autoSwitchToApi)
        console.log(
            '🔧 Auto-switch to API:',
            !autoSwitchToApi ? 'enabled' : 'disabled'
        )
    }

    // Initialize server data on mount if in server mode
    useEffect(() => {
        if (isServerSideMode) {
            fetchServerData('', [], 1, pageSize)
        }
    }, [])

    // Handle row save
    const handleRowSave = (
        rowId: unknown,
        updatedRow: Record<string, unknown>
    ) => {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === rowId ? { ...row, ...updatedRow } : row
            )
        )
        console.log('Row saved:', { rowId, updatedRow })
    }

    // Handle row cancel
    const handleRowCancel = (rowId: unknown) => {
        console.log('Edit cancelled for row:', rowId)
    }

    // Handle row expansion
    const handleRowExpansionChange = (
        rowId: unknown,
        isExpanded: boolean,
        rowData: Record<string, unknown>
    ) => {
        const userData = rowData as UserRow
        console.log('Row expansion changed:', { rowId, isExpanded, userData })
    }

    const isRowExpandable = (row: Record<string, unknown>) => {
        const userRow = row as UserRow
        const statusText = (userRow.status as TagColumnProps).text
        return statusText === 'Active' || userRow.role === 'Admin'
    }

    const renderExpandedRow = ({
        row,
        index,
        toggleExpansion,
    }: {
        row: Record<string, unknown>
        index: number
        isExpanded: boolean
        toggleExpansion: () => void
    }) => {
        const userRow = row as UserRow

        const getActivityData = (user: UserRow) => {
            const statusText = (user.status as TagColumnProps).text
            const activities = [
                `Last login: ${statusText === 'Active' ? '2 hours ago' : '1 week ago'}`,
                `Profile updated: ${user.role === 'Admin' ? '1 day ago' : '3 days ago'}`,
                `Password changed: ${user.gateway === 'Gateway A' ? '1 week ago' : '2 weeks ago'}`,
                `Role assigned: ${user.joinDate}`,
            ]
            return activities
        }

        const getSystemMetrics = (user: UserRow) => {
            return {
                loginCount: user.id * 12 + Math.floor(Math.random() * 50),
                lastIP: `192.168.1.${user.id % 255}`,
                sessionDuration: `${Math.floor(user.id / 10) + 1}h ${user.id % 60}m`,
                dataUsage: `${(user.id * 0.5).toFixed(1)} GB`,
            }
        }

        const activities = getActivityData(userRow)
        const metrics = getSystemMetrics(userRow)

        return (
            <div
                style={{
                    padding: '20px',
                    backgroundColor:
                        (userRow.status as TagColumnProps).text === 'Active'
                            ? '#f0f9ff'
                            : '#fef2f2',
                    borderRadius: '8px',
                    margin: '8px 0',
                    border: `1px solid ${(userRow.status as TagColumnProps).text === 'Active' ? '#bfdbfe' : '#fecaca'}`,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                    }}
                >
                    <h4
                        style={{
                            margin: '0',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#1f2937',
                        }}
                    >
                        Detailed Profile:{' '}
                        {(userRow.name as AvatarColumnProps).label} (Row #
                        {index + 1})
                    </h4>
                    <button
                        onClick={toggleExpansion}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                        }}
                    >
                        Collapse
                    </button>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                        }}
                    >
                        <strong
                            style={{
                                color: '#6b7280',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                            }}
                        >
                            User Information
                        </strong>
                        <div style={{ fontSize: '14px', marginTop: '8px' }}>
                            <div>
                                <strong>ID:</strong> #
                                {userRow.id.toString().padStart(4, '0')}
                            </div>
                            <div>
                                <strong>Email:</strong> {userRow.email}
                            </div>
                            <div>
                                <strong>Contact:</strong> {userRow.contact}
                            </div>
                            <div>
                                <strong>Department:</strong>{' '}
                                {userRow.department}
                            </div>
                            <div>
                                <strong>Status:</strong>
                                <span
                                    style={{
                                        color:
                                            (userRow.status as TagColumnProps)
                                                .text === 'Active'
                                                ? '#059669'
                                                : '#dc2626',
                                        fontWeight: 'bold',
                                        marginLeft: '4px',
                                    }}
                                >
                                    {(userRow.status as TagColumnProps).text}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                        }}
                    >
                        <strong
                            style={{
                                color: '#6b7280',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                            }}
                        >
                            System Access
                        </strong>
                        <div style={{ fontSize: '14px', marginTop: '8px' }}>
                            <div>
                                <strong>Role:</strong> {userRow.role}
                            </div>
                            <div>
                                <strong>Gateway:</strong> {userRow.gateway}
                            </div>
                            <div>
                                <strong>User Number:</strong> {userRow.number}
                            </div>
                            <div>
                                <strong>Member Since:</strong>{' '}
                                {userRow.joinDate}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                        }}
                    >
                        <strong
                            style={{
                                color: '#6b7280',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Usage Metrics
                        </strong>
                        <div style={{ fontSize: '14px', marginTop: '8px' }}>
                            <div>
                                <strong>Login Count:</strong>{' '}
                                {metrics.loginCount}
                            </div>
                            <div>
                                <strong>Last IP:</strong> {metrics.lastIP}
                            </div>
                            <div>
                                <strong>Session Duration:</strong>{' '}
                                {metrics.sessionDuration}
                            </div>
                            <div>
                                <strong>Data Usage:</strong> {metrics.dataUsage}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <strong
                        style={{
                            color: '#6b7280',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Recent Activity Timeline
                    </strong>
                    <div style={{ fontSize: '14px', marginTop: '12px' }}>
                        {activities.map((activity, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '8px 0',
                                    borderBottom:
                                        idx < activities.length - 1
                                            ? '1px solid #f3f4f6'
                                            : 'none',
                                    color: '#4b5563',
                                }}
                            >
                                • {activity}
                            </div>
                        ))}
                    </div>
                </div>

                {userRow.role === 'Admin' && (
                    <div
                        style={{
                            marginTop: '16px',
                            padding: '12px',
                            backgroundColor: '#fef3c7',
                            borderRadius: '6px',
                            border: '1px solid #f59e0b',
                        }}
                    >
                        <strong
                            style={{
                                color: '#92400e',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Admin Privileges
                        </strong>
                        <div
                            style={{
                                fontSize: '14px',
                                marginTop: '8px',
                                color: '#92400e',
                            }}
                        >
                            This user has administrative access to system
                            settings, user management, and security
                            configurations.
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const handleRefreshData = () => {
        if (isServerSideMode) {
            fetchServerData(
                serverState.searchQuery,
                serverState.filters,
                currentPage,
                pageSize
            )
        } else {
            setData(generateLargeDataset(50))
        }
        console.log('Data refreshed')
    }

    // Example: How to apply row colors based on data conditions (delta values)
    // Users can implement their own logic here based on any row data
    const getRowStyle = (
        row: Record<string, unknown>,
        index: number
    ): React.CSSProperties => {
        const userData = row as UserRow
        const statusText = (userData.status as TagColumnProps).text

        // Priority 1: Critical status - Suspended users (highest priority)
        if (statusText === 'Suspended') {
            return {
                backgroundColor: '#fef2f2', // Light red background
                borderLeft: '4px solid #dc2626', // Red left border for emphasis
                color: '#7f1d1d', // Darker red text for better contrast
            }
        }

        // Priority 2: Administrative roles - Admin users
        if (userData.role === 'Admin') {
            return {
                backgroundColor: '#f0f9ff', // Light blue background
                borderLeft: '4px solid #2563eb', // Blue left border
                fontWeight: '500', // Slightly bolder text for admins
            }
        }

        // Priority 3: Recently joined users - New members (2023+)
        const joinYear = parseInt(userData.joinDate.split(' ')[1] || '2020')
        if (joinYear >= 2023) {
            return {
                backgroundColor: '#f0fdf4', // Light green background
                borderLeft: '4px solid #16a34a', // Green left border
            }
        }

        // Priority 4: Alternating row colors for better readability
        if (index % 2 === 0) {
            return {
                backgroundColor: '#fafafa', // Very light gray for even rows
            }
        }

        // Default: No special styling
        return {}
    }

    // Handle row click
    const handleRowClick = (row: Record<string, unknown>, index: number) => {
        const userData = row as UserRow
        const userName = (userData.name as AvatarColumnProps).label
        console.log(`🖱️ Row clicked:`, {
            user: userName,
            email: userData.email,
            role: userData.role,
            index,
        })

        // Example: Show an alert or navigate to user profile
        alert(
            `Clicked on user: ${userName}\nEmail: ${userData.email}\nRole: ${userData.role}\n\nYou can implement navigation or other actions here.`
        )
    }

    return (
        <div>
            {/* Mode Toggle and Controls */}
            <div
                style={{
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        overflow: 'scroll',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                margin: '0 0 8px 0',
                                fontSize: '16px',
                                fontWeight: 600,
                            }}
                        >
                            Demo Mode:{' '}
                            {isServerSideMode ? 'Server-Side' : 'Local'} Search
                            & Filtering
                        </h3>
                        <p
                            style={{
                                margin: 0,
                                fontSize: '14px',
                                color: '#6b7280',
                            }}
                        >
                            {isServerSideMode
                                ? `🚀 Server-side mode: Simulating 3,000 records with API calls for search/filter. Currently showing ${data.length} records.`
                                : `💻 Local mode: All operations handled client-side with ${data.length} records. Both column filters and advanced filters work locally.`}
                            <span style={{ marginLeft: '8px' }}>
                                {columnFreeze > 0 ? (
                                    <>
                                        📌 Currently freezing the first{' '}
                                        {columnFreeze} data column
                                        {columnFreeze !== 1 ? 's' : ''} +
                                        checkbox/expansion columns.
                                    </>
                                ) : (
                                    <>
                                        🔄 All columns are scrollable (no
                                        columns frozen).
                                    </>
                                )}
                            </span>
                            <br />
                            <strong>🎯 TOOLTIP DEMO:</strong> Both column
                            headers and text-based cell content with long names
                            are automatically truncated and show tooltips on
                            hover. Try hovering over the column headers and text
                            cells (like email addresses, revenue, growth rate)
                            to see the full text in a tooltip! Visual elements
                            like avatars and tags don't show tooltips as they're
                            not text-based content.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '14px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <label htmlFor="column-freeze">
                                    Freeze Columns:
                                </label>
                                <select
                                    id="column-freeze"
                                    value={columnFreeze}
                                    onChange={(e) =>
                                        setColumnFreeze(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        border: '1px solid #d1d5db',
                                        fontSize: '14px',
                                    }}
                                >
                                    <option value={0}>None</option>
                                    <option value={1}>First 1</option>
                                    <option value={2}>First 2</option>
                                    <option value={3}>First 3</option>
                                    <option value={4}>First 4</option>
                                    <option value={5}>First 5</option>
                                </select>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={enableRowSelection}
                                        onChange={(e) =>
                                            setEnableRowSelection(
                                                e.target.checked
                                            )
                                        }
                                        style={{ marginRight: '4px' }}
                                    />
                                    Row Selection
                                </label>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={enableColumnManager}
                                        onChange={(e) =>
                                            setEnableColumnManager(
                                                e.target.checked
                                            )
                                        }
                                        style={{ marginRight: '4px' }}
                                    />
                                    Column Manager
                                </label>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={showSettings}
                                        onChange={(e) =>
                                            setShowSettings(e.target.checked)
                                        }
                                        style={{ marginRight: '4px' }}
                                    />
                                    Show Settings
                                </label>
                            </div>
                        </div>
                        <Button
                            buttonType={
                                autoSwitchToApi
                                    ? ButtonType.PRIMARY
                                    : ButtonType.SECONDARY
                            }
                            leadingIcon={<Zap size={16} />}
                            size={ButtonSize.SMALL}
                            onClick={toggleAutoSwitch}
                            disabled={isServerSideMode}
                        >
                            Auto API Switch: {autoSwitchToApi ? 'ON' : 'OFF'}
                        </Button>
                        <Button
                            buttonType={
                                isServerSideMode
                                    ? ButtonType.PRIMARY
                                    : ButtonType.SECONDARY
                            }
                            leadingIcon={
                                isServerSideMode ? (
                                    <Server size={16} />
                                ) : (
                                    <Database size={16} />
                                )
                            }
                            size={ButtonSize.SMALL}
                            onClick={toggleMode}
                            disabled={isLoading}
                        >
                            Switch to{' '}
                            {isServerSideMode ? 'Local' : 'Server-Side'}
                        </Button>
                    </div>
                </div>

                {/* Auto-switch explanation */}
                {!isServerSideMode && (
                    <div
                        style={{
                            marginTop: '12px',
                            padding: '12px',
                            backgroundColor: autoSwitchToApi
                                ? '#e0f2fe'
                                : '#fef3c7',
                            borderRadius: '6px',
                            fontSize: '12px',
                        }}
                    >
                        <strong>🔧 Auto API Switch:</strong>{' '}
                        {autoSwitchToApi
                            ? 'When you use Advanced Filters, the table will automatically switch to server-side mode to handle API calls.'
                            : 'Advanced Filters will work locally only. Toggle this to enable automatic API switching.'}
                    </div>
                )}

                {isServerSideMode && (
                    <div
                        style={{
                            marginTop: '12px',
                            padding: '12px',
                            backgroundColor: '#e0f2fe',
                            borderRadius: '6px',
                            fontSize: '12px',
                        }}
                    >
                        <strong>Server State:</strong> Query: "
                        {serverState.searchQuery || 'none'}", Filters:{' '}
                        {serverState.filters.length}, Page:{' '}
                        {serverState.currentPage}, Total:{' '}
                        {serverState.totalRecords} records
                        {isLoading && (
                            <span
                                style={{ color: '#0369a1', marginLeft: '8px' }}
                            >
                                ⏳ Loading...
                            </span>
                        )}
                    </div>
                )}
            </div>

            <DataTable
                data={data}
                columns={
                    columns as unknown as ColumnDefinition<
                        Record<string, unknown>
                    >[]
                }
                idField="id"
                title="User Management"
                columnManagerPrimaryAction={{
                    text: 'Applied',
                    onClick: (selectedColumns) => {
                        console.log(
                            'Applied with selected columns:',
                            selectedColumns
                        )
                        alert(
                            `Applied column changes!\n\nSelected columns: ${selectedColumns.join(', ')}`
                        )
                    },
                }}
                columnManagerSecondaryAction={{
                    text: 'Reset',
                    onClick: () => {
                        console.log('Reset')
                    },
                }}
                description={`Complete overview of system users with ${isServerSideMode ? 'server-side' : 'local'} search, filtering, inline editing, expandable rows, clickable rows, dynamic row styling, and intelligent row actions with overflow menu.`}
                isHoverable
                enableSearch
                searchPlaceholder={`Search users... ${isServerSideMode ? '(server-side)' : '(local)'}`}
                enableFiltering={true}
                enableAdvancedFilter
                advancedFilterComponent={AdvancedFilterComponent}
                advancedFilters={serverState.filters}
                columnFreeze={columnFreeze}
                enableInlineEdit
                enableRowExpansion
                enableRowSelection={enableRowSelection}
                enableColumnManager={enableColumnManager}
                columnManagerMaxSelections={5}
                columnManagerAlwaysSelected={['name', 'email']}
                showSettings={showSettings}
                renderExpandedRow={renderExpandedRow}
                isRowExpandable={isRowExpandable}
                serverSideSearch={isServerSideMode}
                serverSideFiltering={isServerSideMode}
                serverSidePagination={isServerSideMode}
                isLoading={isLoading}
                pagination={{
                    currentPage,
                    pageSize,
                    totalRows: isServerSideMode
                        ? serverState.totalRecords
                        : data.length,
                    pageSizeOptions: [5, 10, 25, 50],
                }}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                defaultSort={sortConfig}
                onSortChange={(newSortConfig) => setSortConfig(newSortConfig)}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onAdvancedFiltersChange={handleAdvancedFiltersChange}
                onRowSave={handleRowSave}
                onRowCancel={handleRowCancel}
                onRowExpansionChange={handleRowExpansionChange}
                onRowClick={handleRowClick}
                headerSlot1={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<RefreshCw size={16} />}
                        size={ButtonSize.SMALL}
                        onClick={handleRefreshData}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Refresh'}
                    </Button>
                }
                headerSlot2={
                    <Button
                        buttonType={ButtonType.DANGER}
                        leadingIcon={<CircleX size={16} />}
                        size={ButtonSize.SMALL}
                        onClick={handleRefreshData}
                    >
                        Action
                    </Button>
                }
                rowActions={{
                    showEditAction: true, // Show edit actions alongside custom actions
                    slot1: {
                        id: 'view-profile',
                        text: 'View Profile',
                        buttonType: ButtonType.SECONDARY,
                        size: ButtonSize.SMALL,
                        leadingIcon: <Monitor size={16} />,
                        onClick: (row, index) => {
                            const userData = row as UserRow
                            const userName = (
                                userData.name as AvatarColumnProps
                            ).label
                            alert(
                                `Viewing profile for: ${userName} (Row ${index + 1})`
                            )
                        },
                    },
                    slot2: {
                        id: 'delete-user',
                        text: 'Delete User',
                        buttonType: ButtonType.DANGER,
                        size: ButtonSize.SMALL,
                        leadingIcon: <CircleX size={16} />,
                        disabled: (row) => {
                            const userData = row as UserRow
                            return userData.role === 'Admin' // Don't allow deleting admins
                        },
                        onClick: (row, index) => {
                            const userData = row as UserRow
                            const userName = (
                                userData.name as AvatarColumnProps
                            ).label
                            if (
                                confirm(
                                    `Are you sure you want to delete ${userName}?`
                                )
                            ) {
                                alert(
                                    `Deleted user: ${userName} (Row ${index + 1})`
                                )
                            }
                        },
                    },
                }}
                getRowStyle={getRowStyle}
            />

            <SimpleDataTableExample />
        </div>
    )
}

export default DataTableDemo
