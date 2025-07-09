export const handleSectionNavigation = (
  direction: "up" | "down",
  currentIndex: number,
  totalItems: number,
  selector: string = "[data-state]",
  childSelector: string = '[role="button"]',
) => {
  const nextIndex =
    direction === "up"
      ? Math.max(0, currentIndex - 1)
      : Math.min(totalItems - 1, currentIndex + 1);

  if (nextIndex !== currentIndex) {
    const nextSection = document.querySelectorAll(selector)[nextIndex];
    const elementToFocus = nextSection?.querySelector(
      childSelector,
    ) as HTMLElement;

    if (elementToFocus) {
      elementToFocus.focus();
    }
  }

  return nextIndex;
};

export const handleKeyDown = (
  e: React.KeyboardEvent,
  options: {
    hasChildren?: boolean;
    isExpanded?: boolean;
    setIsExpanded?: (value: boolean) => void;
    handleClick?: () => void;
    index?: number;
    onNavigate?: (direction: "up" | "down", index: number) => void;
  },
) => {
  const {
    hasChildren,
    isExpanded,
    setIsExpanded,
    handleClick,
    index,
    onNavigate,
  } = options;

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleClick?.();
  } else if (
    e.key === "ArrowRight" &&
    hasChildren &&
    !isExpanded &&
    setIsExpanded
  ) {
    e.preventDefault();
    setIsExpanded(true);
  } else if (
    e.key === "ArrowLeft" &&
    hasChildren &&
    isExpanded &&
    setIsExpanded
  ) {
    e.preventDefault();
    setIsExpanded(false);
  } else if (e.key === "ArrowDown" && onNavigate && typeof index === "number") {
    e.preventDefault();
    onNavigate("down", index);
  } else if (e.key === "ArrowUp" && onNavigate && typeof index === "number") {
    e.preventDefault();
    onNavigate("up", index);
  }
};
