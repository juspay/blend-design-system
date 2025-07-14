import { TabsVariant, TabsSize } from './types';
import { TabsTokensType } from './tabs.token';
import * as TabsPrimitive from '@radix-ui/react-tabs';
export declare const StyledTabs: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components').FastOmit<TabsPrimitive.TabsProps & import('react').RefAttributes<HTMLDivElement>, never>> & string & Omit<import('react').ForwardRefExoticComponent<TabsPrimitive.TabsProps & import('react').RefAttributes<HTMLDivElement>>, keyof import('react').Component<any, {}, any>>;
export declare const StyledTabsContent: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<TabsPrimitive.TabsContentProps & import('react').RefAttributes<HTMLDivElement>, {
    $tabsToken: TabsTokensType;
}>> & string & Omit<import('react').ForwardRefExoticComponent<TabsPrimitive.TabsContentProps & import('react').RefAttributes<HTMLDivElement>>, keyof import('react').Component<any, {}, any>>;
export declare const StyledTabsList: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<TabsPrimitive.TabsListProps & import('react').RefAttributes<HTMLDivElement>, {
    $variant: TabsVariant;
    $size: TabsSize;
    $expanded: boolean;
    $fitContent: boolean;
    $tabsToken: TabsTokensType;
}>> & string & Omit<import('react').ForwardRefExoticComponent<TabsPrimitive.TabsListProps & import('react').RefAttributes<HTMLDivElement>>, keyof import('react').Component<any, {}, any>>;
export declare const StyledTabsTrigger: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<TabsPrimitive.TabsTriggerProps & import('react').RefAttributes<HTMLButtonElement>, {
    $variant: TabsVariant;
    $size: TabsSize;
    $tabsToken: TabsTokensType;
}>> & string & Omit<import('react').ForwardRefExoticComponent<TabsPrimitive.TabsTriggerProps & import('react').RefAttributes<HTMLButtonElement>>, keyof import('react').Component<any, {}, any>>;
export declare const IconContainer: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {
    $tabsToken: TabsTokensType;
}>> & string;
