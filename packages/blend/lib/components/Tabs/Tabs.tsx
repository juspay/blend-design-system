import { forwardRef } from "react";
import { TabsProps } from "./types";
import { StyledTabs } from "./StyledTabs";

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => (
    <StyledTabs {...props} ref={ref} className={className} />
  ),
);

Tabs.displayName = "Tabs";

export default Tabs;
