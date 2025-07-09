import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
};

const Tooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 0,
  alignOffset = 0,
}: TooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className="bg-[var(--color-fd-secondary)] text-foreground rounded-md p-2 shadow-md"
        >
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
