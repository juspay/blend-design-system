import React from "react";
import { SectionProps } from "./types";
import { ChevronRight } from "lucide-react";
import NavItem from "./NavItem";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import styled from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";

const ChevronIcon = styled(ChevronRight)<{ $isOpen: boolean }>`
  width: 16px;
  height: 16px;
  transition: transform 150ms;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(-90deg)" : "rotate(0)")};
`;

const Section = ({
  section,
  sectionIndex,
  // totalSections,
  onNavigateBetweenSections,
}: SectionProps) => {
  const [isOpen, setIsOpen] = React.useState(section.defaultOpen !== false);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Array<React.RefObject<HTMLElement | null>>>([]);

  React.useEffect(() => {
    if (section.items) {
      itemRefs.current = section.items.map(() =>
        React.createRef<HTMLElement | null>(),
      );
    }
  }, [section.items]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSection();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const firstItem = sectionRef.current
          ?.querySelector("ul")
          ?.querySelector("button, a");
        if (firstItem) {
          (firstItem as HTMLElement).focus();
        } else {
          onNavigateBetweenSections("down", sectionIndex);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onNavigateBetweenSections("up", sectionIndex);
    }
  };

  const handleItemNavigation = (
    direction: "up" | "down",
    currentIndex: number,
  ) => {
    if (direction === "up") {
      if (currentIndex === 0) {
        headerRef.current?.focus();
      } else {
        const prevItem = sectionRef.current
          ?.querySelector("ul")
          ?.querySelectorAll("button, a")[currentIndex - 1];
        if (prevItem) {
          (prevItem as HTMLElement).focus();
        }
      }
    } else {
      if (currentIndex === (section.items?.length || 0) - 1) {
        onNavigateBetweenSections("down", sectionIndex);
      } else {
        const nextItem = sectionRef.current
          ?.querySelector("ul")
          ?.querySelectorAll("button, a")[currentIndex + 1];
        if (nextItem) {
          (nextItem as HTMLElement).focus();
        }
      }
    }
  };

  const isCollapsible = section.isCollapsible !== false;

  return (
    <Block
      width="100%"
      padding="12px 8px"
      ref={sectionRef}
      data-state={isOpen ? "open" : "closed"}
      key={`section-${sectionIndex}`}
    >
      {section.label && (
        <Block
          height="32px"
          display="flex"
          alignItems="center"
          gap="8px"
          marginBottom="8px"
          padding="0 12px"
          // userSelect="none"
          _focus={{
            backgroundColor: FOUNDATION_THEME.colors.gray[100],
          }}
          cursor={isCollapsible ? "pointer" : undefined}
          ref={headerRef}
          // $isCollapsible={isCollapsible}
          onClick={isCollapsible ? toggleSection : undefined}
          onKeyDown={isCollapsible ? handleKeyDown : undefined}
          role={isCollapsible ? "button" : undefined}
          tabIndex={isCollapsible ? 0 : undefined}
          aria-expanded={isCollapsible ? isOpen : undefined}
          aria-controls={
            isCollapsible ? `section-content-${sectionIndex}` : undefined
          }
        >
          <Text
            variant="body.sm"
            color={FOUNDATION_THEME.colors.gray[400]}
            fontWeight={500}
          >
            {section.label.toUpperCase()}
          </Text>
          {isCollapsible && <ChevronIcon $isOpen={isOpen} aria-hidden="true" />}
        </Block>
      )}

      {section.items && isOpen && (
        <ul
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
          id={`section-content-${sectionIndex}`}
          role="menu"
          aria-label={`${section.label} menu`}
        >
          {section.items.map((item, itemIdx) => (
            <NavItem
              key={itemIdx}
              item={item}
              index={itemIdx}
              onNavigate={handleItemNavigation}
            />
          ))}
        </ul>
      )}
    </Block>
  );
};

export default Section;
