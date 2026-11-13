import type { ReactNode } from 'react'
import type { SidebarV2Props } from '../SidebarV2/types'

/** SidebarV2 navigation with the signed-off dashboard frame. */
export type SidebarV3Props = SidebarV2Props & {
    /** Content of the account strip above the rounded application surface. */
    topStrip: ReactNode
    /** App-owned search trigger, placed after the merchant header and before navigation. */
    sidebarSearch?: ReactNode
}

export type { SidebarV2StateChangeType as SidebarV3StateChangeType } from '../SidebarV2/types'
