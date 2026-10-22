import { Platform } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Sidebar } from '../src/components/Sidebar'
import type {
    SidebarNativeProps,
    SidebarSectionData,
} from '../src/components/Sidebar'

/**
 * The `data-*` attributes Sidebar hands react-native-web through `dataSet`,
 * mirroring web `Sidebar`/`Directory` so web automation and selectors match.
 * Jest's preset reports `Platform.OS === 'ios'`; the web cases switch it to
 * `'web'`, which is all `webDataSet` checks. What's asserted is the `dataSet`
 * prop reaching each host view — react-native-web's own job of turning it
 * into `data-*` attributes is outside this package.
 */

const DATA: SidebarSectionData[] = [
    {
        label: 'Payments',
        dataSet: { sidebarSection: 'Payments' },
        items: [
            {
                id: 'orders',
                label: 'Orders',
                dataSet: { sidebarSubOption: 'Orders' },
            },
            { id: 'refunds', label: 'Refunds' },
            {
                id: 'reports',
                label: 'Reports',
                items: [{ id: 'daily', label: 'Daily' }],
            },
        ],
    },
    { items: [{ id: 'settings', label: 'Settings' }] },
]

type DataSet = Record<string, string>

/** The shape of `screen.toJSON()` this file reads. */
type JsonNode = {
    props: { dataSet?: DataSet }
    children: (JsonNode | string)[] | null
}

/** Every host node's `dataSet`, in render order. */
const dataSets = (): DataSet[] => {
    const found: DataSet[] = []
    const visit = (node: JsonNode | JsonNode[] | null) => {
        if (node === null) return
        if (Array.isArray(node)) {
            node.forEach(visit)
            return
        }
        if (node.props.dataSet) found.push(node.props.dataSet)
        node.children?.forEach((child) => {
            if (typeof child !== 'string') visit(child)
        })
    }
    visit(screen.toJSON() as JsonNode | JsonNode[] | null)
    return found
}

const withElement = (element: string) =>
    dataSets().filter((dataSet) => dataSet.element === element)

const renderSidebar = (props: Partial<SidebarNativeProps> = {}) =>
    render(
        <BlendNativeProvider>
            <Sidebar data={DATA} testID="sidebar" {...props} />
        </BlendNativeProvider>
    )

describe('Sidebar — web data attributes', () => {
    const rn = jest.requireActual('react-native')
    let widthSpy: jest.SpyInstance

    beforeEach(() => {
        jest.replaceProperty(Platform, 'OS', 'web')
        widthSpy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
            width: 1024,
            height: 800,
            scale: 1,
            fontScale: 1,
        })
    })
    afterEach(() => {
        widthSpy.mockRestore()
        jest.restoreAllMocks()
    })

    it('marks the root as the sidebar with its status', () => {
        renderSidebar({ isExpanded: true })
        expect(dataSets()).toContainEqual({
            sidebar: 'sidebar',
            status: 'expanded',
        })
    })

    it('reports collapsed and preview states on the root', () => {
        const { rerender } = renderSidebar({ isExpanded: false })
        expect(dataSets()).toContainEqual({
            sidebar: 'sidebar',
            status: 'collapsed',
        })

        rerender(
            <BlendNativeProvider>
                <Sidebar data={DATA} testID="sidebar" isExpanded isPreviewing />
            </BlendNativeProvider>
        )
        expect(dataSets()).toContainEqual({
            sidebar: 'sidebar',
            status: 'intermediate',
        })
    })

    it('makes the rail a navigation landmark, not a presentation node', () => {
        renderSidebar()
        expect(screen.getByTestId('sidebar').props.role).toBe('navigation')
    })

    it('names the toggle sidebar-hamburger', () => {
        renderSidebar()
        expect(screen.getByLabelText('Collapse sidebar').props.dataSet).toEqual(
            { icon: 'sidebar-hamburger' }
        )
    })

    it('describes each section, consumer attributes included', () => {
        renderSidebar()
        expect(withElement('sidebar-section')).toEqual([
            {
                sidebarSection: 'Payments',
                element: 'sidebar-section',
                id: 'Payments',
                status: 'expanded',
                state: 'open',
            },
            {
                element: 'sidebar-section',
                id: 'section-1',
                status: 'expanded',
                state: 'open',
            },
        ])
    })

    it('shows a section label upper-cased but names it as given', () => {
        renderSidebar()
        expect(screen.getByText('PAYMENTS')).toBeTruthy()
        expect(screen.queryByText('Payments')).toBeNull()
        expect(screen.getByLabelText('Payments, expanded')).toBeTruthy()
        expect(withElement('sidebar-section')[0].id).toBe('Payments')
    })

    it('tracks a section collapsing', () => {
        renderSidebar()
        fireEvent.press(screen.getByLabelText('Payments, expanded'))
        expect(withElement('sidebar-section')[0]).toMatchObject({
            id: 'Payments',
            status: 'collapsed',
            state: 'closed',
        })
    })

    it('describes rows and follows the active item', () => {
        renderSidebar({ activeItem: 'orders' })
        const rows = withElement('sidebar-sub-section')
        expect(rows.find((row) => row.id === 'orders')).toEqual({
            sidebarSubOption: 'Orders',
            element: 'sidebar-sub-section',
            id: 'orders',
            status: 'selected',
            pathState: 'active',
        })
        expect(rows.find((row) => row.id === 'refunds')).toMatchObject({
            status: 'not selected',
            pathState: 'default',
        })
    })

    it('reports whether a parent row is expanded', () => {
        renderSidebar()
        const reports = () =>
            withElement('sidebar-sub-section').find(
                (row) => row.id === 'reports'
            )
        expect(reports()).toMatchObject({ sidebarExpanded: 'false' })
        fireEvent.press(screen.getByLabelText('Reports'))
        expect(reports()).toMatchObject({ sidebarExpanded: 'true' })
    })
})

describe('Sidebar — native platforms', () => {
    it('renders no dataSet on iOS', () => {
        const rn = jest.requireActual('react-native')
        // Desktop width, so the rail (sections, rows, toggle) actually mounts.
        const widthSpy = jest.spyOn(rn, 'useWindowDimensions').mockReturnValue({
            width: 1024,
            height: 800,
            scale: 1,
            fontScale: 1,
        })
        renderSidebar({ activeItem: 'orders' })
        expect(screen.getByText('Orders')).toBeTruthy()
        expect(dataSets()).toEqual([])
        widthSpy.mockRestore()
    })
})
