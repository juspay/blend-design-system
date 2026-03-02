import { figma } from '@figma/code-connect'
import { SearchInput } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SEARCHINPUT COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - rightSlot → rightSlot
 *    - leftSlot → leftSlot
 *
 * 2. SPECIAL MAPPINGS:
 *    - placeholder (Figma) → value (Code) - Placeholder text in Figma maps to value prop
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Other interaction states (hover, focus, etc.) are handled automatically
 *    - showRightSlot - Right slot is shown automatically when rightSlot prop is provided
 *    - showLeftSlot - Left slot is shown automatically when leftSlot prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - onChange: Callback function for handling input changes
 *    - All standard HTML input attributes (except size, style, className)
 */

// Base connection
figma.connect(
    SearchInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516575&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Placeholder maps to value in code
            value: figma.string('placeholder'),

            // Slot mappings
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),

            // State to error mapping
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            // Note: The following Figma props are not mapped:
            // - state: Other states handled automatically by component interactions
            // - showLeftSlot: Determined by presence of leftSlot
            // - showRightSlot: Determined by presence of rightSlot
        },

        example: ({ value, leftSlot, rightSlot, error }) => (
            <SearchInput
                value={value}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                onChange={() => {}}
            />
        ),

        imports: ["import { SearchInput } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/SearchInput',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-searchinput--docs',
            },
        ],
    }
)

// Variant: With left slot
figma.connect(
    SearchInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516575&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLeftSlot: true },
        props: {
            value: figma.string('placeholder'),
            leftSlot: figma.instance('leftSlot'),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ value, leftSlot, rightSlot, error }) => (
            <SearchInput
                value={value}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: With right slot
figma.connect(
    SearchInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516575&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showRightSlot: true },
        props: {
            value: figma.string('placeholder'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.instance('rightSlot'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ value, leftSlot, rightSlot, error }) => (
            <SearchInput
                value={value}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: With both slots
figma.connect(
    SearchInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516575&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLeftSlot: true, showRightSlot: true },
        props: {
            value: figma.string('placeholder'),
            leftSlot: figma.instance('leftSlot'),
            rightSlot: figma.instance('rightSlot'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ value, leftSlot, rightSlot, error }) => (
            <SearchInput
                value={value}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Error state
figma.connect(
    SearchInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516575&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { state: 'error' },
        props: {
            value: figma.string('placeholder'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
        },
        example: ({ value, leftSlot, rightSlot }) => (
            <SearchInput
                value={value}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={true}
                onChange={() => {}}
            />
        ),
    }
)

/**
 * Example of SearchInput usage in code:
 *
 * // Basic usage
 * import { Search } from 'lucide-react';
 *
 * const [searchQuery, setSearchQuery] = useState('');
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   placeholder="Search..."
 *   leftSlot={<Search size={18} />}
 * />
 *
 * // With clear button
 * import { Search, X } from 'lucide-react';
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   placeholder="Search products..."
 *   leftSlot={<Search size={18} />}
 *   rightSlot={
 *     searchQuery && (
 *       <button onClick={() => setSearchQuery('')}>
 *         <X size={18} />
 *       </button>
 *     )
 *   }
 * />
 *
 * // With error state
 * <SearchInput
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   placeholder="Search..."
 *   leftSlot={<Search size={18} />}
 *   error={true}
 * />
 *
 * // With custom action button
 * import { Search, Filter } from 'lucide-react';
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   placeholder="Search and filter..."
 *   leftSlot={<Search size={18} />}
 *   rightSlot={
 *     <button onClick={openFilterModal}>
 *       <Filter size={18} />
 *     </button>
 *   }
 * />
 *
 * // With loading state
 * import { Search, Loader } from 'lucide-react';
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   placeholder="Searching..."
 *   leftSlot={<Search size={18} />}
 *   rightSlot={
 *     isSearching && (
 *       <Loader size={18} className="animate-spin" />
 *     )
 *   }
 * />
 *
 * // Complete search implementation
 * const [searchQuery, setSearchQuery] = useState('');
 * const [searchResults, setSearchResults] = useState([]);
 * const [isSearching, setIsSearching] = useState(false);
 * const [error, setError] = useState(false);
 *
 * const handleSearch = async (query: string) => {
 *   setSearchQuery(query);
 *   setError(false);
 *
 *   if (query.length < 3) {
 *     setSearchResults([]);
 *     return;
 *   }
 *
 *   setIsSearching(true);
 *   try {
 *     const results = await searchAPI(query);
 *     setSearchResults(results);
 *   } catch (err) {
 *     setError(true);
 *   } finally {
 *     setIsSearching(false);
 *   }
 * };
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={(e) => handleSearch(e.target.value)}
 *   placeholder="Search products, categories..."
 *   leftSlot={<Search size={18} />}
 *   rightSlot={
 *     searchQuery && (
 *       <button onClick={() => {
 *         setSearchQuery('');
 *         setSearchResults([]);
 *       }}>
 *         <X size={18} />
 *       </button>
 *     )
 *   }
 *   error={error}
 * />
 */
