import { TabsSize, TabsVariant } from './types'
declare const TabsList: import('react').ForwardRefExoticComponent<
    Omit<
        import('@radix-ui/react-tabs').TabsListProps &
            import('react').RefAttributes<HTMLDivElement>,
        'ref'
    > & {
        variant?: TabsVariant
        size?: TabsSize
        expanded?: boolean
        fitContent?: boolean
    } & import('react').RefAttributes<HTMLDivElement>
>
export default TabsList
