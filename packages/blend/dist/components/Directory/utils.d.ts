export declare const handleSectionNavigation: (direction: "up" | "down", currentIndex: number, totalItems: number, selector?: string, childSelector?: string) => number;
export declare const handleKeyDown: (e: React.KeyboardEvent, options: {
    hasChildren?: boolean;
    isExpanded?: boolean;
    setIsExpanded?: (value: boolean) => void;
    handleClick?: () => void;
    index?: number;
    onNavigate?: (direction: "up" | "down", index: number) => void;
}) => void;
