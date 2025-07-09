import { forwardRef } from "react";
import { TabsContentProps } from "./types";
import { StyledTabsContent } from "./StyledTabs";
import { useComponentToken } from "../../context/useComponentToken";
import { TabsTokensType } from "./tabs.token";

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, ...props }, ref) => {
    const tabsToken = useComponentToken("TABS") as TabsTokensType;

    return (
      <StyledTabsContent
        ref={ref}
        className={className}
        $tabsToken={tabsToken}
        {...props}
      >
        {children}
      </StyledTabsContent>
    );
  },
);

TabsContent.displayName = "TabsContent";

export default TabsContent;
