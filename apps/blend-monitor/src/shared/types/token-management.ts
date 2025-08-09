// Token Management System Types
// Types for the new granular token management system

export interface FoundationTokenCollection {
    id: string
    name: string
    description?: string
    is_active: boolean
    is_default: boolean
    created_by: string
    created_at: string
    updated_at: string
}

export interface FoundationToken {
    id: string
    collection_id: string
    category: string // 'colors', 'fontSize', 'fontWeight', etc.
    subcategory?: string // 'primary', 'gray', etc. (nullable for flat tokens)
    token_key: string // '500', 'headingLG', '16', etc.
    token_value: string // '#2B7FFF', '24px', '600', etc.
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface ComponentTokenCollection {
    id: string
    name: string
    component_name: string // 'Button', 'Alert', 'Checkbox', etc.
    description?: string
    foundation_collection_id: string
    is_active: boolean
    created_by: string
    created_at: string
    updated_at: string
}

export interface ComponentToken {
    id: string
    collection_id: string
    token_path: string // 'backgroundColor.primary.default.default'
    foundation_token_reference: string // 'colors.primary.500'
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface TokenExport {
    id: string
    export_type: 'json' | 'css' | 'scss' | 'js' | 'dtcg'
    foundation_collection_id: string
    component_collection_ids: string[]
    exported_by: string
    export_data: Record<string, any>
    created_at: string
}

// API Request/Response Types
export interface CreateFoundationCollectionRequest {
    name: string
    description?: string
    is_active?: boolean
}

export interface UpdateFoundationCollectionRequest {
    name?: string
    description?: string
    is_active?: boolean
}

export interface CreateFoundationTokenRequest {
    category: string
    subcategory?: string
    token_key: string
    token_value: string
    is_active?: boolean
}

export interface UpdateFoundationTokenRequest {
    token_value?: string
    is_active?: boolean
}

export interface CreateComponentCollectionRequest {
    name: string
    component_name: string
    description?: string
    foundation_collection_id: string
    is_active?: boolean
}

export interface UpdateComponentCollectionRequest {
    name?: string
    description?: string
    foundation_collection_id?: string
    is_active?: boolean
}

export interface CreateComponentTokenRequest {
    token_path: string
    foundation_token_reference: string
    is_active?: boolean
}

export interface UpdateComponentTokenRequest {
    foundation_token_reference?: string
    is_active?: boolean
}

export interface ExportTokensRequest {
    export_type: 'json' | 'css' | 'scss' | 'js' | 'dtcg'
    foundation_collection_id: string
    component_collection_ids?: string[]
    include_inactive?: boolean
}

// UI Component Types
export interface TokenCategoryData {
    category: string
    tokens: FoundationToken[]
    subcategories?: string[]
}

export interface ComponentTokenData {
    component_name: string
    collections: ComponentTokenCollection[]
    active_collection?: ComponentTokenCollection
}

export interface TokenValidationResult {
    is_valid: boolean
    errors: string[]
    warnings: string[]
}

// Export Format Types
export interface JsonExport {
    foundation: Record<string, any>
    components: Record<string, Record<string, any>>
    metadata: {
        exported_at: string
        foundation_collection: string
        component_collections: string[]
    }
}

export interface CssExport {
    css: string
    metadata: {
        exported_at: string
        foundation_collection: string
        component_collections: string[]
    }
}

export interface ScssExport {
    scss: string
    metadata: {
        exported_at: string
        foundation_collection: string
        component_collections: string[]
    }
}

export interface JsExport {
    js: string
    metadata: {
        exported_at: string
        foundation_collection: string
        component_collections: string[]
    }
}

export interface DtcgExport {
    dtcg: Record<string, any>
    metadata: {
        exported_at: string
        foundation_collection: string
        component_collections: string[]
    }
}

// Dashboard UI Types
export interface TokenDashboardState {
    activeTab: 'foundation' | 'components'
    selectedFoundationCollection?: FoundationTokenCollection
    selectedComponentCollection?: ComponentTokenCollection
    selectedCategory?: string
    isLoading: boolean
    error?: string
}

export interface TokenCollectionStats {
    total_tokens: number
    active_tokens: number
    categories: string[]
    last_updated: string
}

export interface ComponentTokenStats {
    total_tokens: number
    active_tokens: number
    components: string[]
    last_updated: string
}

// Utility Types
export type TokenCategory =
    | 'colors'
    | 'fontSize'
    | 'fontWeight'
    | 'lineHeight'
    | 'spacing'
    | 'borderRadius'
    | 'borderWidth'
    | 'boxShadow'
    | 'opacity'

export type ComponentName =
    | 'Button'
    | 'Alert'
    | 'Checkbox'
    | 'Radio'
    | 'Switch'
    | 'Input'
    | 'Select'
    | 'Modal'
    | 'Tooltip'
    | 'Card'
    | 'Badge'
    | 'Avatar'
    | 'Tabs'
    | 'Accordion'
    | 'DataTable'
    | 'Sidebar'
    | 'Menu'
    | 'Breadcrumb'
    | 'ProgressBar'
    | 'Slider'
    | 'DateRangePicker'

export type ExportFormat = 'json' | 'css' | 'scss' | 'js' | 'dtcg'

// API Response Types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    has_more: boolean
}

export interface FoundationCollectionsResponse
    extends PaginatedResponse<FoundationTokenCollection> {}
export interface FoundationTokensResponse
    extends PaginatedResponse<FoundationToken> {}
export interface ComponentCollectionsResponse
    extends PaginatedResponse<ComponentTokenCollection> {}
export interface ComponentTokensResponse
    extends PaginatedResponse<ComponentToken> {}
