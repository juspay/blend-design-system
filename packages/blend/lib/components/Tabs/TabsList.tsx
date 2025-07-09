import { forwardRef } from "react";
import { TabsListProps, TabsSize, TabsVariant } from "./types";
import { StyledTabsList } from "./StyledTabs";
import { useComponentToken } from "../../context/useComponentToken";
import { TabsTokensType } from "./tabs.token";

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  (
    {
      className,
      variant = TabsVariant.UNDERLINE,
      size = TabsSize.MD,
      expanded = false,
      fitContent = false,
      ...props
    },
    ref,
  ) => {
    const tabsToken = useComponentToken("TABS") as TabsTokensType;

    return (
      <StyledTabsList
        ref={ref}
        className={className}
        $variant={variant}
        $size={size}
        $expanded={expanded}
        $fitContent={fitContent}
        $tabsToken={tabsToken}
        {...props}
      />
    );
  },
);

TabsList.displayName = "TabsList";

export default TabsList;
