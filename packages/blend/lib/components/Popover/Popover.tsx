import { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import Block from "../Primitives/Block/Block";
import { PopoverProps, PopoverSize } from "./types";
import PopoverHeader from "./PopoverHeader";
import PopoverFooter from "./PopoverFooter";
import { PopoverTokenType } from "./popover.tokens";
import { useComponentToken } from "../../context/useComponentToken";

const Popover = ({
  heading,
  description,
  trigger,
  children,
  showCloseButton = true,
  onOpenChange,
  open,
  asModal = false,
  primaryAction,
  secondaryAction,
  sideOffset = 8,
  side = "bottom",
  align = "center",
  alignOffset = 0,
  width,
  minWidth = 320,
  maxWidth = 400,
  height,
  minHeight,
  maxHeight,
  zIndex = 1000,
  size = PopoverSize.MEDIUM,
  onClose,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const popoverTokens = useComponentToken("POPOVER") as PopoverTokenType;
  return (
    <RadixPopover.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (onOpenChange) {
          onOpenChange(open);
        }
      }}
      modal={asModal}
    >
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Content
        style={{ zIndex }}
        asChild
        sideOffset={sideOffset}
        side={side}
        align={align}
        alignOffset={alignOffset}
      >
        <Block
          zIndex={popoverTokens.zIndex}
          backgroundColor={popoverTokens.background}
          boxShadow={popoverTokens.shadow}
          borderRadius={popoverTokens.borderRadius}
          border={popoverTokens.border}
          width={width}
          minWidth={minWidth}
          maxWidth={maxWidth}
          height={height}
          minHeight={minHeight}
          maxHeight={maxHeight}
          display="flex"
          flexDirection="column"
          gap={popoverTokens.gap}
        >
          <PopoverHeader
            heading={heading}
            description={description}
            showCloseButton={showCloseButton}
            size={size}
            onClose={() => {
              setIsOpen(false);
              if (onClose) {
                onClose();
              }
            }}
          />
          {children}
          <PopoverFooter
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
          />
        </Block>
      </RadixPopover.Content>
    </RadixPopover.Root>
  );
};

Popover.displayName = "Popover";

export default Popover;
