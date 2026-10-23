import { describe, it, expect } from 'vitest'
import {
    SIDEBAR_TOGGLE_DATA_SET,
    getItemDataSet,
    getItemVisualState,
    getSectionDataSet,
    getSidebarRootDataSet,
    getSidebarStatus,
} from '../src/components/Sidebar/sidebar.utils'

/**
 * The `data-*` attributes Sidebar renders on react-native-web. Each case
 * pins a value web's `Sidebar`/`Directory` produce for the same state, since
 * automation written against the web sidebar reads exactly these.
 */

describe('getSidebarStatus', () => {
    it('reports the pinned state when not previewing', () => {
        expect(getSidebarStatus(true, false)).toBe('expanded')
        expect(getSidebarStatus(false, false)).toBe('collapsed')
    })

    it('reports a preview as intermediate, whatever the pinned state', () => {
        expect(getSidebarStatus(false, true)).toBe('intermediate')
        expect(getSidebarStatus(true, true)).toBe('intermediate')
    })
})

describe('getSidebarRootDataSet', () => {
    it('marks the root as the sidebar with its status', () => {
        expect(getSidebarRootDataSet('collapsed')).toEqual({
            sidebar: 'sidebar',
            status: 'collapsed',
        })
    })
})

describe('SIDEBAR_TOGGLE_DATA_SET', () => {
    it('names the toggle the way web SidebarHeader does', () => {
        expect(SIDEBAR_TOGGLE_DATA_SET).toEqual({ icon: 'sidebar-hamburger' })
    })
})

describe('getSectionDataSet', () => {
    it('describes a labelled section by its label and open state', () => {
        expect(
            getSectionDataSet({
                section: { label: 'Payments', items: [] },
                index: 2,
                isOpen: true,
            })
        ).toEqual({
            element: 'sidebar-section',
            id: 'Payments',
            status: 'expanded',
            state: 'open',
        })
    })

    it('reports a closed section as collapsed', () => {
        expect(
            getSectionDataSet({
                section: { label: 'Payments', items: [] },
                index: 0,
                isOpen: false,
            })
        ).toMatchObject({ status: 'collapsed', state: 'closed' })
    })

    it('names an unlabelled section by its position', () => {
        expect(
            getSectionDataSet({
                section: { items: [] },
                index: 3,
                isOpen: true,
            }).id
        ).toBe('section-3')
    })

    it('keeps consumer attributes but never lets them override its own', () => {
        expect(
            getSectionDataSet({
                section: {
                    label: 'Payments',
                    items: [],
                    dataSet: { sidebarSection: 'Payments', id: 'other' },
                },
                index: 0,
                isOpen: true,
            })
        ).toMatchObject({ sidebarSection: 'Payments', id: 'Payments' })
    })
})

describe('getItemVisualState', () => {
    const base = {
        isSelected: false,
        itemPath: 'reports',
        activeItem: 'reports/daily',
        highlightActivePath: true,
    }

    it('is active when selected', () => {
        expect(getItemVisualState({ ...base, isSelected: true })).toBe('active')
    })

    it('is default with path highlighting off or nothing selected', () => {
        expect(
            getItemVisualState({ ...base, highlightActivePath: false })
        ).toBe('default')
        expect(getItemVisualState({ ...base, activeItem: null })).toBe(
            'default'
        )
    })

    it('is activePath on an ancestor of the selection, muted elsewhere', () => {
        expect(getItemVisualState(base)).toBe('activePath')
        expect(getItemVisualState({ ...base, itemPath: 'home' })).toBe('muted')
    })
})

describe('getItemDataSet', () => {
    const base = {
        item: { id: 'orders', label: 'Orders' },
        isSelected: false,
        visualState: 'default' as const,
        hasChildren: false,
        iconOnlyMode: false,
        isExpanded: false,
    }

    it('describes a row by its own segment and selection', () => {
        expect(getItemDataSet(base)).toEqual({
            element: 'sidebar-sub-section',
            id: 'orders',
            status: 'not selected',
            pathState: 'default',
        })
        expect(
            getItemDataSet({ ...base, isSelected: true, visualState: 'active' })
        ).toMatchObject({ status: 'selected', pathState: 'active' })
    })

    it('falls back to the label for a missing or empty id', () => {
        expect(getItemDataSet({ ...base, item: { label: 'Orders' } }).id).toBe(
            'Orders'
        )
        expect(
            getItemDataSet({ ...base, item: { id: '', label: 'Orders' } }).id
        ).toBe('Orders')
    })

    it('reports sidebar-expanded only on a row whose children can open', () => {
        expect(getItemDataSet(base).sidebarExpanded).toBeUndefined()
        expect(
            getItemDataSet({ ...base, hasChildren: true, isExpanded: true })
                .sidebarExpanded
        ).toBe('true')
        expect(
            getItemDataSet({ ...base, hasChildren: true }).sidebarExpanded
        ).toBe('false')
        expect(
            getItemDataSet({ ...base, hasChildren: true, iconOnlyMode: true })
                .sidebarExpanded
        ).toBeUndefined()
    })

    it('keeps consumer attributes but never lets them override its own', () => {
        expect(
            getItemDataSet({
                ...base,
                item: {
                    id: 'orders',
                    label: 'Orders',
                    dataSet: { sidebarSelected: 'false', status: 'x' },
                },
            })
        ).toMatchObject({ sidebarSelected: 'false', status: 'not selected' })
    })
})
