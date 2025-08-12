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
    Trash2,
    MoreVertical,
    Check,
    Star,
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
import ExportModal from './components/ExportModal'
import CreateCollectionModal from './components/CreateCollectionModal'
import DeleteCollectionModal from './components/DeleteCollectionModal'
import ErrorModal from './components/ErrorModal'

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

    // Total counts for stats
    const [totalFoundationTokens, setTotalFoundationTokens] = useState(0)

    // Modal state for foundation tokens
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTokens, setModalTokens] = useState<FoundationToken[]>([])
    const [modalLoading, setModalLoading] = useState(false)
    const [selectedCollection, setSelectedCollection] =
        useState<FoundationCollection | null>(null)

    // Modal filters (separate from main page filters)
    const [modalSelectedCategory, setModalSelectedCategory] = useState('')
    const [modalSelectedSubcategory, setModalSelectedSubcategory] = useState('')

    // Export modal state
    const [isExportModalOpen, setIsExportModalOpen] = useState(false)

    // Create collection modal state
    const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] =
        useState(false)

    // Delete collection modal state
    const [isDeleteCollectionModalOpen, setIsDeleteCollectionModalOpen] =
        useState(false)
    const [collectionToDelete, setCollectionToDelete] =
        useState<FoundationCollection | null>(null)

    // Error modal state
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [errorModalTitle, setErrorModalTitle] = useState('')
    const [errorModalMessage, setErrorModalMessage] = useState('')

    // Dropdown menu state
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

    // Mock current user - in real app this would come from auth context
    const currentUser = { id: '550e8400-e29b-41d4-a716-446655440000' } // This should be replaced with actual user from auth context

    useEffect(() => {
        fetchCategories()
        fetchTotalFoundationTokens()
        fetchComponentCollections() // Fetch component collections on page load
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

    // Note: Removed click outside to close functionality to prevent interference with button clicks

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

    const fetchTotalFoundationTokens = async () => {
        try {
            const response = await fetch('/api/foundation-tokens?limit=10000')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setTotalFoundationTokens(data.data.length)
            }
        } catch (error) {
            console.error('Error fetching total foundation tokens:', error)
            setTotalFoundationTokens(0)
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

            // Fetch tokens with the default filters AND collection filter
            const params = new URLSearchParams({
                limit: '1000',
                collection_id: collection.id, // Filter by specific collection
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

            // Always filter by the selected collection
            if (selectedCollection) {
                params.append('collection_id', selectedCollection.id)
            }

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

    const handleCreateCollectionSuccess = () => {
        // Refresh collections list after successful creation
        fetchCollections()
    }

    const handleDeleteCollection = (collection: FoundationCollection) => {
        // Check if this is a default collection - show error modal instead
        if (collection.is_default) {
            setErrorModalTitle('Cannot Delete Default Collection')
            setErrorModalMessage(
                `"${collection.name}" is the default collection and cannot be deleted. Please set another collection as default first.`
            )
            setIsErrorModalOpen(true)
            return
        }

        // Proceed with normal delete flow for non-default collections
        setCollectionToDelete(collection)
        setIsDeleteCollectionModalOpen(true)
    }

    const handleDeleteCollectionSuccess = () => {
        // Refresh collections list after successful deletion
        fetchCollections()
        setCollectionToDelete(null)
    }

    const handleSetActiveCollection = async (
        collection: FoundationCollection
    ) => {
        console.log(
            'handleSetActiveCollection called for:',
            collection.name,
            'current active:',
            collection.is_active
        )
        try {
            const response = await fetch(
                `/api/foundation-collections/${collection.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        is_active: !collection.is_active,
                    }),
                }
            )

            console.log('PATCH response status:', response.status)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log('PATCH response data:', data)

            if (data.success) {
                // Refresh collections list to show updated status
                fetchCollections()
                setOpenDropdownId(null) // Close dropdown
            } else {
                throw new Error(data.error || 'Failed to update collection')
            }
        } catch (error) {
            console.error('Error updating collection active status:', error)
            setErrorModalTitle('Update Failed')
            setErrorModalMessage(
                'Failed to update collection active status. Please try again.'
            )
            setIsErrorModalOpen(true)
        }
    }

    const handleSetDefaultCollection = async (
        collection: FoundationCollection
    ) => {
        try {
            const response = await fetch(
                `/api/foundation-collections/${collection.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        is_default: true,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            if (data.success) {
                // Refresh collections list to show updated status
                fetchCollections()
                setOpenDropdownId(null) // Close dropdown
            } else {
                throw new Error(
                    data.error || 'Failed to set as default collection'
                )
            }
        } catch (error) {
            console.error('Error setting default collection:', error)
            setErrorModalTitle('Update Failed')
            setErrorModalMessage(
                'Failed to set as default collection. Please try again.'
            )
            setIsErrorModalOpen(true)
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
                            {collection.is_active && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Active
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
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text="Delete"
                        leadingIcon={<Trash2 className="w-4 h-4" />}
                        onClick={() => handleDeleteCollection(collection)}
                    />

                    {/* Three-dot menu */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdownId(
                                    openDropdownId === collection.id
                                        ? null
                                        : collection.id
                                )
                            }
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>

                        {openDropdownId === collection.id && (
                            <div
                                className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        console.log(
                                            'Set Active/Inactive clicked for:',
                                            collection.name
                                        )
                                        handleSetActiveCollection(collection)
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    {collection.is_active
                                        ? 'Set Inactive'
                                        : 'Set Active'}
                                </button>

                                {!collection.is_default && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            console.log(
                                                'Set as Default clicked for:',
                                                collection.name
                                            )
                                            handleSetDefaultCollection(
                                                collection
                                            )
                                        }}
                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Star className="w-4 h-4 mr-2" />
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">
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
                            onClick={() => setIsExportModalOpen(true)}
                        />
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            text="Create Collection"
                            leadingIcon={<Plus className="w-4 h-4" />}
                            onClick={() => setIsCreateCollectionModalOpen(true)}
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
                        value={totalFoundationTokens}
                        variant={StatCardVariant.NUMBER}
                        titleIcon={
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Palette className="w-4 h-4 text-green-600" />
                            </div>
                        }
                    />
                    <StatCard
                        title="Component Collections"
                        value={componentCollections.length}
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

            {/* Export Modal */}
            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                collections={collections}
                componentCollections={componentCollections}
                availableCategories={availableCategories}
                availableComponents={Array.from(
                    new Set(
                        componentTokens.map((token) => token.component_name)
                    )
                )}
            />

            {/* Create Collection Modal */}
            <CreateCollectionModal
                isOpen={isCreateCollectionModalOpen}
                onClose={() => setIsCreateCollectionModalOpen(false)}
                onSuccess={handleCreateCollectionSuccess}
                currentUser={currentUser}
                existingCollections={collections}
            />

            {/* Delete Collection Modal */}
            <DeleteCollectionModal
                isOpen={isDeleteCollectionModalOpen}
                onClose={() => setIsDeleteCollectionModalOpen(false)}
                onSuccess={handleDeleteCollectionSuccess}
                collection={collectionToDelete}
            />

            {/* Error Modal */}
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title={errorModalTitle}
                message={errorModalMessage}
            />

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
