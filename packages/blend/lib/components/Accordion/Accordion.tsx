import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";
import { styled } from "styled-components";
import { AccordionProps, AccordionType } from "./types";
import { AccordionTokenType } from "./accordion.tokens";
import { useComponentToken } from "../../context/useComponentToken";

const StyledAccordionRoot = styled(RadixAccordion.Root)<{
  $accordionType: AccordionType;
  $AccordionToken: AccordionTokenType;
}>((props) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: props.$AccordionToken.gap[props.$accordionType],
  borderRadius: props.$AccordionToken.borderRadius[props.$accordionType],
}));

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      accordionType = AccordionType.NO_BORDER,
      defaultValue,
      value,
      isMultiple = false,
      onValueChange,
    },
    ref,
  ) => {
    const accordionToken = useComponentToken("ACCORDION") as AccordionTokenType;
    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const childProps = {
          ...(child.props as object),
          accordionType: accordionType,
        };

        return React.cloneElement(child, childProps);
      });
    };

    const commonProps = {
      ref: ref,
      $accordionType: accordionType,
    };

    return isMultiple ? (
      <StyledAccordionRoot
        type="multiple"
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={onValueChange as ((value: string[]) => void) | undefined}
        $AccordionToken={accordionToken}
        {...commonProps}
      >
        {renderChildren()}
      </StyledAccordionRoot>
    ) : (
      <StyledAccordionRoot
        type="single"
        collapsible={true}
        value={value as string | undefined}
        defaultValue={defaultValue as string | undefined}
        onValueChange={onValueChange as ((value: string) => void) | undefined}
        $AccordionToken={accordionToken}
        {...commonProps}
      >
        {renderChildren()}
      </StyledAccordionRoot>
    );
  },
);

Accordion.displayName = "Accordion";

export default Accordion;
