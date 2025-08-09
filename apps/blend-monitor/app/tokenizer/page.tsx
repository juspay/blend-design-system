'use client'

import React, { useState, useEffect } from 'react'
import {
    Plus,
    Download,
    Upload,
    Eye,
    Edit,
    Palette,
    Database,
    Zap,
} from 'lucide-react'
import {
    Button,
    SingleSelect,
    ButtonType,
    ButtonSize,
    Modal,
    StatCard,
    StatCardVariant,
    DataTable,
    ColumnType,
    FilterType,
    Tag,
    TagVariant,
    TagColor,
    TagSize,
} from 'blend-v1'

interface FoundationCollection {
    id: string
    name: string
    description: string
    is_active: boolean
    is_default: boolean
    token_count: string
    created_at: string
}

interface FoundationToken {
    id: string
    category: string
    subcategory: string | null
    token_key: string
    token_value: string
    collection_name: string
}

interface ComponentCollection {
    id: string
    component_name: string
    collection_name: string
    description: string
    is_active: boolean
    created_at: string
    updated_at: string
    token_count: string
}

interface ComponentToken {
    id: string
    collection_id: string
    token_path: string
    foundation_token_reference: string
    breakpoint: string
    is_active: boolean
    component_name: string
    collection_name: string
    created_at: string
    updated_at: string
    [key: string]: any
}

export default function TokenizerDashboard() {
    const [activeTab, setActiveTab] = useState('foundation')
    const [collections, setCollections] = useState<FoundationCollection[]>([])
    const [tokens, setTokens] = useState<FoundationToken[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubcategory, setSelectedSubcategory] = useState('')

    // Dynamic categories and subcategories from database
    const [availableCategories, setAvailableCategories] = useState<string[]>([])
    const [subcategoriesByCategory, setSubcategoriesByCategory] = useState<
        Record<string, string[]>
    >({})
    const [categoriesLoading, setCategoriesLoading] = useState(true)

    // Component tokens state
    const [componentCollections, setComponentCollections] = useState<
        ComponentCollection[]
    >([])
    const [componentTokens, setComponentTokens] = useState<ComponentToken[]>([])
    const [componentLoading, setComponentLoading] = useState(true)
    const [selectedComponent, setSelectedComponent] = useState('')

    // Modal state for foundation tokens
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTokens, setModalTokens] = useState<FoundationToken[]>([])
    const [modalLoading, setModalLoading] = useState(false)
    const [selectedCollection, setSelectedCollection] =
        useState<FoundationCollection | null>(null)

    // Modal filters (separate from main page filters)
    const [modalSelectedCategory, setModalSelectedCategory] = useState('')
    const [modalSelectedSubcategory, setModalSelectedSubcategory] = useState('')

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchCollections()
        if (selectedCategory) {
            fetchTokens()
        }
    }, [selectedCategory, selectedSubcategory])

    useEffect(() => {
        if (activeTab === 'components') {
            fetchComponentCollections()
            fetchComponentTokens()
        }
    }, [activeTab, selectedComponent])

    // Reset subcategory when category changes and set default category
    useEffect(() => {
        if (selectedCategory && subcategoriesByCategory[selectedCategory]) {
            if (!selectedSubcategory) {
                setSelectedSubcategory(
                    subcategoriesByCategory[selectedCategory][0] || ''
                )
            }
        } else {
            setSelectedSubcategory('')
        }
    }, [selectedCategory, subcategoriesByCategory])

    // Set default category when categories are loaded
    useEffect(() => {
        if (availableCategories.length > 0 && !selectedCategory) {
            setSelectedCategory(availableCategories[0])
        }
    }, [availableCategories])

    // Modal filters effect
    useEffect(() => {
        if (isModalOpen && modalSelectedCategory) {
            fetchModalTokens()
        }
    }, [modalSelectedCategory, modalSelectedSubcategory])

    // Set default modal category when modal opens
    useEffect(() => {
        if (
            isModalOpen &&
            availableCategories.length > 0 &&
            !modalSelectedCategory
        ) {
            setModalSelectedCategory(availableCategories[0])
        }
    }, [isModalOpen, availableCategories])

    // Reset modal subcategory when modal category changes
    useEffect(() => {
        if (
            modalSelectedCategory &&
            subcategoriesByCategory[modalSelectedCategory]
        ) {
            if (!modalSelectedSubcategory) {
                setModalSelectedSubcategory(
                    subcategoriesByCategory[modalSelectedCategory][0] || ''
                )
            }
        } else {
            setModalSelectedSubcategory('')
        }
    }, [modalSelectedCategory, subcategoriesByCategory])

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true)
            const response = await fetch('/api/foundation-tokens/categories')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setAvailableCategories(data.data.categories)
                setSubcategoriesByCategory(data.data.subcategoriesByCategory)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            setAvailableCategories([])
            setSubcategoriesByCategory({})
        } finally {
            setCategoriesLoading(false)
        }
    }

    const fetchCollections = async () => {
        try {
            const response = await fetch('/api/foundation-collections')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setCollections(data.data)
            }
        } catch (error) {
            console.error('Error fetching collections:', error)
            setCollections([])
        }
    }

    const fetchTokens = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams({
                category: selectedCategory,
                limit: '50',
            })

            if (selectedCategory === 'colors' && selectedSubcategory) {
                params.append('subcategory', selectedSubcategory)
            }

            const response = await fetch(`/api/foundation-tokens?${params}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setTokens(data.data)
            }
        } catch (error) {
            console.error('Error fetching tokens:', error)
            setTokens([])
        } finally {
            setLoading(false)
        }
    }

    const fetchComponentCollections = async () => {
        try {
            const params = new URLSearchParams({
                limit: '50',
            })

            if (selectedComponent) {
                params.append('component', selectedComponent)
            }

            const response = await fetch(`/api/component-collections?${params}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setComponentCollections(data.data)
            }
        } catch (error) {
            console.error('Error fetching component collections:', error)
            setComponentCollections([])
        }
    }

    const fetchComponentTokens = async () => {
        try {
            setComponentLoading(true)
            const params = new URLSearchParams({
                limit: '10000', // Increased limit to show all tokens
            })

            if (selectedComponent) {
                params.append('component', selectedComponent)
            }

            const response = await fetch(`/api/component-tokens?${params}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setComponentTokens(data.data)
            }
        } catch (error) {
            console.error('Error fetching component tokens:', error)
            setComponentTokens([])
        } finally {
            setComponentLoading(false)
        }
    }

    const fetchAllTokensForCollection = async (
        collection: FoundationCollection
    ) => {
        try {
            setModalLoading(true)
            setSelectedCollection(collection)
            setIsModalOpen(true)

            // Set default modal filters to current page filters
            const defaultCategory = availableCategories[0] || ''
            const defaultSubcategory =
                defaultCategory && subcategoriesByCategory[defaultCategory]
                    ? subcategoriesByCategory[defaultCategory][0] || ''
                    : ''

            setModalSelectedCategory(defaultCategory)
            setModalSelectedSubcategory(defaultSubcategory)

            // Fetch tokens with the default filters
            const params = new URLSearchParams({
                limit: '1000',
            })

            if (defaultCategory) {
                params.append('category', defaultCategory)
            }

            if (defaultCategory === 'colors' && defaultSubcategory) {
                params.append('subcategory', defaultSubcategory)
            }

            const response = await fetch(`/api/foundation-tokens?${params}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setModalTokens(data.data)
            }
        } catch (error) {
            console.error('Error fetching all tokens:', error)
            setModalTokens([])
        } finally {
            setModalLoading(false)
        }
    }

    const fetchModalTokens = async () => {
        try {
            setModalLoading(true)
            const params = new URLSearchParams({
                limit: '1000',
            })

            if (modalSelectedCategory) {
                params.append('category', modalSelectedCategory)
            }

            if (
                modalSelectedCategory === 'colors' &&
                modalSelectedSubcategory
            ) {
                params.append('subcategory', modalSelectedSubcategory)
            }

            const response = await fetch(`/api/foundation-tokens?${params}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setModalTokens(data.data)
            }
        } catch (error) {
            console.error('Error fetching modal tokens:', error)
            setModalTokens([])
        } finally {
            setModalLoading(false)
        }
    }

    // Dynamic category items from database
    const categoryItems = [
        {
            groupLabel: 'Token Categories',
            items: availableCategories.map((category) => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                value: category,
            })),
        },
    ]

    // Dynamic subcategory items from database
    const subcategoryItems =
        selectedCategory && subcategoriesByCategory[selectedCategory]
            ? [
                  {
                      groupLabel: 'Subcategories',
                      items: subcategoriesByCategory[selectedCategory].map(
                          (subcategory) => ({
                              label:
                                  subcategory.charAt(0).toUpperCase() +
                                  subcategory.slice(1),
                              value: subcategory,
                          })
                      ),
                  },
              ]
            : []

    const ColorSwatch = ({ token }: { token: FoundationToken }) => {
        if (token.category !== 'colors') return null

        return (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
                        style={{ backgroundColor: token.token_value }}
                    />
                    <div>
                        <div className="font-medium text-gray-900">
                            {token.subcategory}.{token.token_key}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">
                            {token.token_value}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const TokenDisplay = ({ token }: { token: FoundationToken }) => {
        if (token.category === 'colors') {
            return <ColorSwatch token={token} />
        }

        return (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium text-gray-900">
                            {token.subcategory
                                ? `${token.subcategory}.${token.token_key}`
                                : token.token_key}
                        </div>
                        <div className="text-sm text-gray-500">
                            {token.category}
                        </div>
                    </div>
                    <div className="text-sm font-mono text-gray-700">
                        {token.token_value}
                    </div>
                </div>
            </div>
        )
    }

    const CollectionCard = ({
        collection,
    }: {
        collection: FoundationCollection
    }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">
                                {collection.name}
                            </h3>
                            {collection.is_default && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    Default
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            {collection.token_count} tokens
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text="View"
                        leadingIcon={<Eye className="w-4 h-4" />}
                        onClick={() => fetchAllTokensForCollection(collection)}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Blend Tokenizer
                    </h1>
                    <div className="flex items-center space-x-3">
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            text="Import"
                            leadingIcon={<Upload className="w-4 h-4" />}
                            onClick={() => console.log('Import clicked')}
                        />
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            text="Export All"
                            leadingIcon={<Download className="w-4 h-4" />}
                            onClick={() => console.log('Export All clicked')}
                        />
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            text="Create Collection"
                            leadingIcon={<Plus className="w-4 h-4" />}
                            onClick={() =>
                                console.log('Create Collection clicked')
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 pb-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Foundation Collections"
                        value={collections.length}
                        variant={StatCardVariant.NUMBER}
                        titleIcon={
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Database className="w-4 h-4 text-blue-600" />
                            </div>
                        }
                    />
                    <StatCard
                        title="Foundation Tokens"
                        value={177}
                        variant={StatCardVariant.NUMBER}
                        titleIcon={
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Palette className="w-4 h-4 text-green-600" />
                            </div>
                        }
                    />
                    <StatCard
                        title="Component Collections"
                        value={25}
                        variant={StatCardVariant.NUMBER}
                        titleIcon={
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-purple-600" />
                            </div>
                        }
                    />
                </div>

                {/* Tabs */}
                <div className="space-y-6">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('foundation')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'foundation'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Foundation Tokens
                            </button>
                            <button
                                onClick={() => setActiveTab('components')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'components'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Component Tokens
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {/* Foundation Tokens Tab */}
                        {activeTab === 'foundation' && (
                            <div className="space-y-4">
                                {loading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                        <div className="text-gray-500 mt-3">
                                            Loading collections...
                                        </div>
                                    </div>
                                ) : collections.length > 0 ? (
                                    collections.map((collection) => (
                                        <CollectionCard
                                            key={collection.id}
                                            collection={collection}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-500">
                                            No foundation collections found.
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Component Tokens Tab */}
                        {activeTab === 'components' && (
                            <>
                                {componentLoading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                        <div className="text-gray-500 mt-3">
                                            Loading component tokens...
                                        </div>
                                    </div>
                                ) : componentTokens.length > 0 ? (
                                    <DataTable
                                        data={componentTokens.map(
                                            (token, index) => ({
                                                ...token,
                                                serial_number: index + 1,
                                            })
                                        )}
                                        columns={[
                                            {
                                                field: 'serial_number',
                                                header: '#',
                                                type: ColumnType.NUMBER,
                                                isSortable: false,
                                                minWidth: '30px',
                                                maxWidth: '50px',
                                                renderCell: (value: number) => (
                                                    <span className="text-sm font-medium text-gray-600">
                                                        {value}
                                                    </span>
                                                ),
                                            },
                                            {
                                                field: 'component_name',
                                                header: 'Component',
                                                type: ColumnType.TAG,
                                                isSortable: true,
                                                filterType: FilterType.SELECT,
                                                filterOptions: Array.from(
                                                    new Set(
                                                        componentTokens.map(
                                                            (token) =>
                                                                token.component_name
                                                        )
                                                    )
                                                ).map((name) => ({
                                                    id: name,
                                                    label: name,
                                                    value: name,
                                                })),
                                                minWidth: '60px',
                                                maxWidth: '80px',
                                            },
                                            {
                                                field: 'collection_name',
                                                header: 'Collection',
                                                type: ColumnType.TEXT,
                                                isSortable: true,
                                                filterType: FilterType.TEXT,
                                                minWidth: '60px',
                                                maxWidth: '80px',
                                            },
                                            {
                                                field: 'breakpoint',
                                                header: 'Breakpoint',
                                                type: ColumnType.TAG,
                                                isSortable: true,
                                                filterType: FilterType.SELECT,
                                                filterOptions: Array.from(
                                                    new Set(
                                                        componentTokens.map(
                                                            (token) =>
                                                                token.breakpoint ||
                                                                'default'
                                                        )
                                                    )
                                                ).map((breakpoint) => ({
                                                    id: breakpoint,
                                                    label: breakpoint,
                                                    value: breakpoint,
                                                })),
                                                minWidth: '60px',
                                                maxWidth: '80px',
                                            },
                                            {
                                                field: 'token_path',
                                                header: 'Token Path',
                                                type: ColumnType.TEXT,
                                                isSortable: true,
                                                filterType: FilterType.TEXT,
                                                minWidth: '80x',
                                                maxWidth: '120px',
                                                renderCell: (value: string) => (
                                                    <Tag
                                                        text={value}
                                                        variant={
                                                            TagVariant.SUBTLE
                                                        }
                                                        color={TagColor.NEUTRAL}
                                                        size={TagSize.SM}
                                                    />
                                                ),
                                            },
                                            {
                                                field: 'foundation_token_reference',
                                                header: 'Foundation Reference',
                                                type: ColumnType.TEXT,
                                                isSortable: true,
                                                filterType: FilterType.TEXT,
                                                minWidth: '80px',
                                                maxWidth: '120px',
                                                renderCell: (value: string) => (
                                                    <Tag
                                                        text={value}
                                                        variant={
                                                            TagVariant.SUBTLE
                                                        }
                                                        color={TagColor.PRIMARY}
                                                        size={TagSize.SM}
                                                    />
                                                ),
                                            },
                                        ]}
                                        idField="id"
                                        title="Component Tokens"
                                        enableSearch={true}
                                        searchPlaceholder="Search tokens"
                                        enableFiltering={true}
                                        isHoverable={true}
                                        enableColumnManager={false}
                                        enableRowSelection={false}
                                        showToolbar={true}
                                        getRowStyle={() => ({
                                            backgroundColor: '#ffffff',
                                        })}
                                        pagination={{
                                            currentPage: 1,
                                            pageSize: 100,
                                            totalRows: componentTokens.length,
                                            pageSizeOptions: [
                                                25,
                                                50,
                                                100,
                                                500,
                                                componentTokens.length,
                                            ],
                                        }}
                                        className="bg-white rounded-xl border border-gray-200 shadow-sm"
                                    />
                                ) : (
                                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12">
                                        <div className="text-center">
                                            <div className="text-gray-500">
                                                No component tokens found.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Foundation Tokens Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Foundation Tokens - ${selectedCollection?.name || ''}`}
                showCloseButton={true}
                showHeader={true}
                showFooter={false}
                closeOnBackdropClick={true}
                className="w-[1152px] h-[700px] overflow-hidden"
            >
                <div className="flex flex-col h-[600px] overflow-hidden">
                    {/* Modal Filters - Fixed at top */}
                    <div className="flex-shrink-0 flex space-x-6 pb-6 border-b border-gray-200">
                        <div className="w-48">
                            {!categoriesLoading &&
                            categoryItems.length > 0 &&
                            categoryItems[0].items.length > 0 ? (
                                <SingleSelect
                                    label="Category"
                                    placeholder="Select category"
                                    items={categoryItems}
                                    selected={modalSelectedCategory}
                                    onSelect={(value) =>
                                        setModalSelectedCategory(value)
                                    }
                                />
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <div className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 text-sm">
                                        Loading...
                                    </div>
                                </div>
                            )}
                        </div>

                        {modalSelectedCategory &&
                            subcategoriesByCategory[modalSelectedCategory] && (
                                <div className="w-48">
                                    <SingleSelect
                                        label="Subcategory"
                                        placeholder="Select subcategory"
                                        items={[
                                            {
                                                groupLabel: 'Subcategories',
                                                items: subcategoriesByCategory[
                                                    modalSelectedCategory
                                                ].map((subcategory) => ({
                                                    label:
                                                        subcategory
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        subcategory.slice(1),
                                                    value: subcategory,
                                                })),
                                            },
                                        ]}
                                        selected={modalSelectedSubcategory}
                                        onSelect={(value) =>
                                            setModalSelectedSubcategory(value)
                                        }
                                    />
                                </div>
                            )}
                    </div>

                    {/* Modal Content - Scrollable with consistent dimensions */}
                    <div
                        className="flex-1 overflow-y-auto scrollbar-hide pt-4 min-h-[500px]"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        <div className="min-h-[500px] flex flex-col">
                            {modalLoading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                        <div className="text-gray-500 mt-3">
                                            Loading tokens...
                                        </div>
                                    </div>
                                </div>
                            ) : modalTokens.length > 0 ? (
                                <div className="space-y-4 pb-4 flex-1">
                                    {modalSelectedCategory === 'colors' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {modalTokens.map((token) => (
                                                <div
                                                    key={token.id}
                                                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
                                                >
                                                    <div
                                                        className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm"
                                                        style={{
                                                            backgroundColor:
                                                                token.token_value,
                                                        }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-gray-900 truncate">
                                                            {token.subcategory}.
                                                            {token.token_key}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-mono">
                                                            {token.token_value}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {modalTokens.map((token) => (
                                                <div
                                                    key={token.id}
                                                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
                                                >
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {token.subcategory
                                                            ? `${token.subcategory}.${token.token_key}`
                                                            : token.token_key}
                                                    </div>
                                                    <div className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                                        {token.token_value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-gray-500">
                                            {modalSelectedCategory
                                                ? `No ${modalSelectedCategory} tokens found${modalSelectedSubcategory ? ` in ${modalSelectedSubcategory} subcategory` : ''}.`
                                                : 'Select a category to view tokens.'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
