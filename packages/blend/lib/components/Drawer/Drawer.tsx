'use client'

// Re-export all components from the modular structure
export {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
} from './components/DrawerBase'

export { StatusDrawer } from './components/StatusDrawer'

export {
    MultiSelectDrawer,
    SingleSelectDrawer,
} from './components/SelectDrawer'

export {
    NestedMultiSelectDrawer,
    NestedSingleSelectDrawer,
} from './components/NestedSelectDrawer'

import { Drawer } from './components/DrawerBase'
export default Drawer
