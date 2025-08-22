import { forwardRef } from 'react'
import { type TabsProps } from './types'
import { StyledTabs } from './StyledTabs'
import { useTabsTelemetry } from '../../telemetry/componentHooks'

const Tabs = forwardRef<HTMLDivElement, TabsProps>((tabsProps, ref) => {
    const { className, ...props } = tabsProps

    useTabsTelemetry(tabsProps)

    return <StyledTabs {...props} ref={ref} className={className} />
})

Tabs.displayName = 'Tabs'

export default Tabs
